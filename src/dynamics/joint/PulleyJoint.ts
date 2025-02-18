/*
 * Planck.js
 * The MIT License
 * Copyright (c) 2021 Erin Catto, Ali Shakiba
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import common from '../../util/common';
import options from '../../util/options';
import Settings from '../../Settings';
import Math from '../../common/Math';
import Vec2 from '../../common/Vec2';
import Rot from '../../common/Rot';
import Joint from '../Joint';
import { JointOpt, JointDef } from '../Joint';
import Body from '../Body';


const _ASSERT = typeof ASSERT === 'undefined' ? false : ASSERT;


/**
 * Pulley joint definition. This requires two ground anchors, two dynamic body
 * anchor points, and a pulley ratio.
 */
export interface PulleyJointOpt extends JointOpt {
}
/**
 * Pulley joint definition. This requires two ground anchors, two dynamic body
 * anchor points, and a pulley ratio.
 */
export interface PulleyJointDef extends JointDef, PulleyJointOpt {
  /**
   * The first ground anchor in world coordinates. This point never moves.
   */
  groundAnchorA: Vec2;
  /**
   * The second ground anchor in world coordinates. This point never moves.
   */
  groundAnchorB: Vec2;
  /**
   * The local anchor point relative to bodyA's origin.
   */
  localAnchorA: Vec2;
  /**
   * The local anchor point relative to bodyB's origin.
   */
  localAnchorB: Vec2;
  /**
   * The reference length for the segment attached to bodyA.
   */
  lengthA: number;
  /**
   * The reference length for the segment attached to bodyB.
   */
  lengthB: number;
  /**
   * The pulley ratio, used to simulate a block-and-tackle.
   */
  ratio: number;
}

const DEFAULTS = {
  collideConnected : true
};

/**
 * The pulley joint is connected to two bodies and two fixed ground points. The
 * pulley supports a ratio such that: length1 + ratio * length2 <= constant
 *
 * Yes, the force transmitted is scaled by the ratio.
 *
 * Warning: the pulley joint can get a bit squirrelly by itself. They often work
 * better when combined with prismatic joints. You should also cover the the
 * anchor points with static shapes to prevent one side from going to zero
 * length.
 */
export default class PulleyJoint extends Joint {
  static TYPE = 'pulley-joint' as 'pulley-joint';
  static MIN_PULLEY_LENGTH = 2.0; // minPulleyLength

  /** @internal */ m_type: 'pulley-joint';
  /** @internal */ m_groundAnchorA: Vec2;
  /** @internal */ m_groundAnchorB: Vec2;
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_lengthA: number;
  /** @internal */ m_lengthB: number;
  /** @internal */ m_ratio: number;
  /** @internal */ m_constant: number;
  /** @internal */ m_impulse: number;
  // Solver temp
  /** @internal */ m_uA; // Vec2
  /** @internal */ m_uB; // Vec2
  /** @internal */ m_rA; // Vec2
  /** @internal */ m_rB; // Vec2
  /** @internal */ m_localCenterA; // Vec2
  /** @internal */ m_localCenterB; // Vec2
  /** @internal */ m_invMassA; // float
  /** @internal */ m_invMassB; // float
  /** @internal */ m_invIA; // float
  /** @internal */ m_invIB; // float
  /** @internal */ m_mass; // float

  constructor(def: PulleyJointDef);
  constructor(def: PulleyJointOpt, bodyA: Body, bodyB: Body, groundA: Vec2, groundB: Vec2, anchorA: Vec2, anchorB: Vec2, ratio: number);
  constructor(def: PulleyJointDef, bodyA?: Body, bodyB?: Body, groundA?: Vec2, groundB?: Vec2, anchorA?: Vec2, anchorB?: Vec2, ratio?: number) {
    // @ts-ignore
    if (!(this instanceof PulleyJoint)) {
      return new PulleyJoint(def, bodyA, bodyB, groundA, groundB, anchorA, anchorB, ratio);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = PulleyJoint.TYPE;
    this.m_groundAnchorA = groundA ? groundA : def.groundAnchorA || Vec2.neo(-1.0, 1.0);
    this.m_groundAnchorB = groundB ? groundB : def.groundAnchorB || Vec2.neo(1.0, 1.0);
    this.m_localAnchorA = anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.neo(-1.0, 0.0);
    this.m_localAnchorB = anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.neo(1.0, 0.0);
    this.m_lengthA = Math.isFinite(def.lengthA) ? def.lengthA : Vec2.distance(anchorA, groundA);
    this.m_lengthB = Math.isFinite(def.lengthB) ? def.lengthB : Vec2.distance(anchorB, groundB);
    this.m_ratio = Math.isFinite(ratio) ? ratio : def.ratio;

    _ASSERT && common.assert(ratio > Math.EPSILON);

    this.m_constant = this.m_lengthA + this.m_ratio * this.m_lengthB;

    this.m_impulse = 0.0;

    // Solver temp
    this.m_uA; // Vec2
    this.m_uB; // Vec2
    this.m_rA; // Vec2
    this.m_rB; // Vec2
    this.m_localCenterA; // Vec2
    this.m_localCenterB; // Vec2
    this.m_invMassA; // float
    this.m_invMassB; // float
    this.m_invIA; // float
    this.m_invIB; // float
    this.m_mass; // float

    // Pulley:
    // length1 = norm(p1 - s1)
    // length2 = norm(p2 - s2)
    // C0 = (length1 + ratio * length2)_initial
    // C = C0 - (length1 + ratio * length2)
    // u1 = (p1 - s1) / norm(p1 - s1)
    // u2 = (p2 - s2) / norm(p2 - s2)
    // Cdot = -dot(u1, v1 + cross(w1, r1)) - ratio * dot(u2, v2 + cross(w2, r2))
    // J = -[u1 cross(r1, u1) ratio * u2 ratio * cross(r2, u2)]
    // K = J * invM * JT
    // = invMass1 + invI1 * cross(r1, u1)^2 + ratio^2 * (invMass2 + invI2 *
    // cross(r2, u2)^2)
  }

  _serialize() {
    return {
      type: this.m_type,
      bodyA: this.m_bodyA,
      bodyB: this.m_bodyB,
      collideConnected: this.m_collideConnected,

      groundAnchorA: this.m_groundAnchorA,
      groundAnchorB: this.m_groundAnchorB,
      localAnchorA: this.m_localAnchorA,
      localAnchorB: this.m_localAnchorB,
      lengthA: this.m_lengthA,
      lengthB: this.m_lengthB,
      ratio: this.m_ratio,
    };
  }

  static _deserialize(data, world, restore) {
    data = {...data};
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new PulleyJoint(data);
    return joint;
  }

  /**
   * Get the first ground anchor.
   */
  getGroundAnchorA() {
    return this.m_groundAnchorA;
  }

  /**
   * Get the second ground anchor.
   */
  getGroundAnchorB() {
    return this.m_groundAnchorB;
  }

  /**
   * Get the current length of the segment attached to bodyA.
   */
  getLengthA() {
    return this.m_lengthA;
  }

  /**
   * Get the current length of the segment attached to bodyB.
   */
  getLengthB() {
    return this.m_lengthB;
  }

  /**
   * Get the pulley ratio.
   */
  getRatio() {
    return this.m_ratio;
  }

  /**
   * Get the current length of the segment attached to bodyA.
   */
  getCurrentLengthA() {
    const p = this.m_bodyA.getWorldPoint(this.m_localAnchorA);
    const s = this.m_groundAnchorA;
    return Vec2.distance(p, s);
  }

  /**
   * Get the current length of the segment attached to bodyB.
   */
  getCurrentLengthB() {
    const p = this.m_bodyB.getWorldPoint(this.m_localAnchorB);
    const s = this.m_groundAnchorB;
    return Vec2.distance(p, s);
  }

  /**
   * Shift the origin for any points stored in world coordinates.
   *
   * @param newOrigin
   */
  shiftOrigin(newOrigin) {
    this.m_groundAnchorA.sub(newOrigin);
    this.m_groundAnchorB.sub(newOrigin);
  }

  /**
   * Get the anchor point on bodyA in world coordinates.
*/
  getAnchorA() {
    return this.m_bodyA.getWorldPoint(this.m_localAnchorA);
  }

  /**
   * Get the anchor point on bodyB in world coordinates.
*/
  getAnchorB() {
    return this.m_bodyB.getWorldPoint(this.m_localAnchorB);
  }

  /**
   * Get the reaction force on bodyB at the joint anchor in Newtons.
*/
  getReactionForce(inv_dt) {
    return Vec2.mul(this.m_impulse, this.m_uB).mul(inv_dt);
  }

  /**
   * Get the reaction torque on bodyB in N*m.
*/
  getReactionTorque(inv_dt) {
    return 0.0;
  }

  initVelocityConstraints(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;

    const cA = this.m_bodyA.c_position.c;
    const aA = this.m_bodyA.c_position.a;
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;

    const cB = this.m_bodyB.c_position.c;
    const aB = this.m_bodyB.c_position.a;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    const qA = Rot.neo(aA);
    const qB = Rot.neo(aB);

    this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

    // Get the pulley axes.
    this.m_uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
    this.m_uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);

    const lengthA = this.m_uA.length();
    const lengthB = this.m_uB.length();

    if (lengthA > 10.0 * Settings.linearSlop) {
      this.m_uA.mul(1.0 / lengthA);
    } else {
      this.m_uA.setZero();
    }

    if (lengthB > 10.0 * Settings.linearSlop) {
      this.m_uB.mul(1.0 / lengthB);
    } else {
      this.m_uB.setZero();
    }

    // Compute effective mass.
    const ruA = Vec2.cross(this.m_rA, this.m_uA); // float
    const ruB = Vec2.cross(this.m_rB, this.m_uB); // float

    const mA = this.m_invMassA + this.m_invIA * ruA * ruA; // float
    const mB = this.m_invMassB + this.m_invIB * ruB * ruB; // float

    this.m_mass = mA + this.m_ratio * this.m_ratio * mB;

    if (this.m_mass > 0.0) {
      this.m_mass = 1.0 / this.m_mass;
    }

    if (step.warmStarting) {
      // Scale impulses to support variable time steps.
      this.m_impulse *= step.dtRatio;

      // Warm starting.
      const PA = Vec2.mul(-this.m_impulse, this.m_uA);
      const PB = Vec2.mul(-this.m_ratio * this.m_impulse, this.m_uB);

      vA.addMul(this.m_invMassA, PA);
      wA += this.m_invIA * Vec2.cross(this.m_rA, PA);

      vB.addMul(this.m_invMassB, PB);
      wB += this.m_invIB * Vec2.cross(this.m_rB, PB);

    } else {
      this.m_impulse = 0.0;
    }

    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
  }

  solveVelocityConstraints(step) {
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    const vpA = Vec2.add(vA, Vec2.cross(wA, this.m_rA));
    const vpB = Vec2.add(vB, Vec2.cross(wB, this.m_rB));

    const Cdot = -Vec2.dot(this.m_uA, vpA) - this.m_ratio
        * Vec2.dot(this.m_uB, vpB); // float
    const impulse = -this.m_mass * Cdot; // float
    this.m_impulse += impulse;

    const PA = Vec2.mul(-impulse, this.m_uA); // Vec2
    const PB = Vec2.mul(-this.m_ratio * impulse, this.m_uB); // Vec2
    vA.addMul(this.m_invMassA, PA);
    wA += this.m_invIA * Vec2.cross(this.m_rA, PA);
    vB.addMul(this.m_invMassB, PB);
    wB += this.m_invIB * Vec2.cross(this.m_rB, PB);

    this.m_bodyA.c_velocity.v = vA;
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v = vB;
    this.m_bodyB.c_velocity.w = wB;
  }

  /**
   * This returns true if the position errors are within tolerance.
   */
  solvePositionConstraints(step) {
    const cA = this.m_bodyA.c_position.c;
    let aA = this.m_bodyA.c_position.a;
    const cB = this.m_bodyB.c_position.c;
    let aB = this.m_bodyB.c_position.a;

    const qA = Rot.neo(aA), qB = Rot.neo(aB);

    const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

    // Get the pulley axes.
    const uA = Vec2.sub(Vec2.add(cA, this.m_rA), this.m_groundAnchorA);
    const uB = Vec2.sub(Vec2.add(cB, this.m_rB), this.m_groundAnchorB);

    const lengthA = uA.length();
    const lengthB = uB.length();

    if (lengthA > 10.0 * Settings.linearSlop) {
      uA.mul(1.0 / lengthA);
    } else {
      uA.setZero();
    }

    if (lengthB > 10.0 * Settings.linearSlop) {
      uB.mul(1.0 / lengthB);
    } else {
      uB.setZero();
    }

    // Compute effective mass.
    const ruA = Vec2.cross(rA, uA);
    const ruB = Vec2.cross(rB, uB);

    const mA = this.m_invMassA + this.m_invIA * ruA * ruA; // float
    const mB = this.m_invMassB + this.m_invIB * ruB * ruB; // float

    let mass = mA + this.m_ratio * this.m_ratio * mB; // float

    if (mass > 0.0) {
      mass = 1.0 / mass;
    }

    const C = this.m_constant - lengthA - this.m_ratio * lengthB; // float
    const linearError = Math.abs(C); // float

    const impulse = -mass * C; // float

    const PA = Vec2.mul(-impulse, uA); // Vec2
    const PB = Vec2.mul(-this.m_ratio * impulse, uB); // Vec2

    cA.addMul(this.m_invMassA, PA);
    aA += this.m_invIA * Vec2.cross(rA, PA);
    cB.addMul(this.m_invMassB, PB);
    aB += this.m_invIB * Vec2.cross(rB, PB);

    this.m_bodyA.c_position.c = cA;
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c = cB;
    this.m_bodyB.c_position.a = aB;

    return linearError < Settings.linearSlop;
  }

}

Joint.TYPES[PulleyJoint.TYPE] = PulleyJoint;
