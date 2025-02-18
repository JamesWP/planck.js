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

import options from '../../util/options';
import Settings from '../../Settings';
import Math from '../../common/Math';
import Vec2 from '../../common/Vec2';
import Rot from '../../common/Rot';
import Joint from '../Joint';
import { JointOpt, JointDef } from '../Joint';
import Body from '../Body';

/**
 * Distance joint definition. This requires defining an anchor point on both
 * bodies and the non-zero length of the distance joint. The definition uses
 * local anchor points so that the initial configuration can violate the
 * constraint slightly. This helps when saving and loading a game. Warning: Do
 * not use a zero or short length.
 */
export interface DistanceJointOpt extends JointOpt {
  /**
   * The mass-spring-damper frequency in Hertz. A value of 0 disables softness.
   */
  frequencyHz?: number;
  /**
   * The damping ratio. 0 = no damping, 1 = critical damping.
   */
  dampingRatio?: number;
  /**
   * Distance length.
   */
  length?: number;
}
/**
 * Distance joint definition. This requires defining an anchor point on both
 * bodies and the non-zero length of the distance joint. The definition uses
 * local anchor points so that the initial configuration can violate the
 * constraint slightly. This helps when saving and loading a game. Warning: Do
 * not use a zero or short length.
 */
export interface DistanceJointDef extends JointDef, DistanceJointOpt {
  /**
   * The local anchor point relative to bodyA's origin.
   */
  localAnchorA: Vec2;
  /**
   * The local anchor point relative to bodyB's origin.
   */
  localAnchorB: Vec2;
}

const DEFAULTS = {
  frequencyHz : 0.0,
  dampingRatio : 0.0
};

/**
 * A distance joint constrains two points on two bodies to remain at a fixed
 * distance from each other. You can view this as a massless, rigid rod.
 *
 * @param anchorA Anchor A in global coordination.
 * @param anchorB Anchor B in global coordination.
 */
export default class DistanceJoint extends Joint {
  static TYPE = 'distance-joint' as 'distance-joint';

  // Solver shared
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_length: number;
  /** @internal */ m_frequencyHz: number;
  /** @internal */ m_dampingRatio: number;
  /** @internal */ m_impulse: number;
  /** @internal */ m_gamma: number;
  /** @internal */ m_bias: number;

  // Solver temp
  /** @internal */ m_u; // Vec2
  /** @internal */ m_rA; // Vec2
  /** @internal */ m_rB; // Vec2
  /** @internal */ m_localCenterA; // Vec2
  /** @internal */ m_localCenterB; // Vec2
  /** @internal */ m_invMassA;
  /** @internal */ m_invMassB;
  /** @internal */ m_invIA;
  /** @internal */ m_invIB;
  /** @internal */ m_mass;

  constructor(def: DistanceJointDef);
  constructor(def: DistanceJointOpt, bodyA: Body, bodyB: Body, anchorA: Vec2, anchorB: Vec2);
  constructor(def: DistanceJointDef, bodyA?: Body, bodyB?: Body, anchorA?: Vec2, anchorB?: Vec2) {
    // @ts-ignore
    if (!(this instanceof DistanceJoint)) {
      return new DistanceJoint(def, bodyA, bodyB, anchorA, anchorB);
    }

    // order of constructor arguments is changed in v0.2
    if (bodyB && anchorA && ('m_type' in anchorA) && ('x' in bodyB) && ('y' in bodyB)) {
      const temp = bodyB;
      bodyB = anchorA;
      anchorA = temp;
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = DistanceJoint.TYPE;

    // Solver shared
    this.m_localAnchorA = Vec2.clone(anchorA ? bodyA.getLocalPoint(anchorA) : def.localAnchorA || Vec2.zero());
    this.m_localAnchorB = Vec2.clone(anchorB ? bodyB.getLocalPoint(anchorB) : def.localAnchorB || Vec2.zero());
    this.m_length = Math.isFinite(def.length) ? def.length :
      Vec2.distance(bodyA.getWorldPoint(this.m_localAnchorA), bodyB.getWorldPoint(this.m_localAnchorB));
    this.m_frequencyHz = def.frequencyHz;
    this.m_dampingRatio = def.dampingRatio;
    this.m_impulse = 0.0;
    this.m_gamma = 0.0;
    this.m_bias = 0.0;

    // Solver temp
    this.m_u; // Vec2
    this.m_rA; // Vec2
    this.m_rB; // Vec2
    this.m_localCenterA; // Vec2
    this.m_localCenterB; // Vec2
    this.m_invMassA;
    this.m_invMassB;
    this.m_invIA;
    this.m_invIB;
    this.m_mass;

    // 1-D constrained system
    // m (v2 - v1) = lambda
    // v2 + (beta/h) * x1 + gamma * lambda = 0, gamma has units of inverse mass.
    // x2 = x1 + h * v2

    // 1-D mass-damper-spring system
    // m (v2 - v1) + h * d * v2 + h * k *

    // C = norm(p2 - p1) - L
    // u = (p2 - p1) / norm(p2 - p1)
    // Cdot = dot(u, v2 + cross(w2, r2) - v1 - cross(w1, r1))
    // J = [-u -cross(r1, u) u cross(r2, u)]
    // K = J * invM * JT
    // = invMass1 + invI1 * cross(r1, u)^2 + invMass2 + invI2 * cross(r2, u)^2
  }

  /** @internal */
  _serialize() {
    return {
      type: this.m_type,
      bodyA: this.m_bodyA,
      bodyB: this.m_bodyB,
      collideConnected: this.m_collideConnected,

      frequencyHz: this.m_frequencyHz,
      dampingRatio: this.m_dampingRatio,

      localAnchorA: this.m_localAnchorA,
      localAnchorB: this.m_localAnchorB,
      length: this.m_length,

      impulse: this.m_impulse,
      gamma: this.m_gamma,
      bias: this.m_bias,
    };
  }

  /** @internal */
  static _deserialize(data, world, restore) {
    data = {...data};
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new DistanceJoint(data);
    return joint;
  }

  /** @internal */
  _setAnchors(def) {
    if (def.anchorA) {
      this.m_localAnchorA.set(this.m_bodyA.getLocalPoint(def.anchorA));
    } else if (def.localAnchorA) {
      this.m_localAnchorA.set(def.localAnchorA);
    }

    if (def.anchorB) {
      this.m_localAnchorB.set(this.m_bodyB.getLocalPoint(def.anchorB));
    } else if (def.localAnchorB) {
      this.m_localAnchorB.set(def.localAnchorB);
    }

    if (def.length > 0) {
      this.m_length = +def.length;
    } else if (def.length < 0) { // don't change length
    } else if (def.anchorA || def.anchorA || def.anchorA || def.anchorA) {
      this.m_length = Vec2.distance(
          this.m_bodyA.getWorldPoint(this.m_localAnchorA),
          this.m_bodyB.getWorldPoint(this.m_localAnchorB)
      );
    }
  }

  /**
   * The local anchor point relative to bodyA's origin.
   */
  getLocalAnchorA() {
    return this.m_localAnchorA;
  }

  /**
   * The local anchor point relative to bodyB's origin.
   */
  getLocalAnchorB() {
    return this.m_localAnchorB;
  }

  /**
   * Set the natural length. Manipulating the length can lead to non-physical
   * behavior when the frequency is zero.
   */
  setLength(length: number) {
    this.m_length = length;
  }

  /**
   * Get the natural length.
   */
  getLength() {
    return this.m_length;
  }

  setFrequency(hz: number) {
    this.m_frequencyHz = hz;
  }

  getFrequency() {
    return this.m_frequencyHz;
  }

  setDampingRatio(ratio: number) {
    this.m_dampingRatio = ratio;
  }

  getDampingRatio() {
    return this.m_dampingRatio;
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
  getReactionForce(inv_dt: number) {
    return Vec2.mul(this.m_impulse, this.m_u).mul(inv_dt);
  }

  /**
   * Get the reaction torque on bodyB in N*m.
   */
  getReactionTorque(inv_dt: number) {
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
    this.m_u = Vec2.sub(Vec2.add(cB, this.m_rB), Vec2.add(cA, this.m_rA));

    // Handle singularity.
    const length = this.m_u.length();
    if (length > Settings.linearSlop) {
      this.m_u.mul(1.0 / length);
    } else {
      this.m_u.set(0.0, 0.0);
    }

    const crAu = Vec2.cross(this.m_rA, this.m_u);
    const crBu = Vec2.cross(this.m_rB, this.m_u);
    let invMass = this.m_invMassA + this.m_invIA * crAu * crAu + this.m_invMassB
        + this.m_invIB * crBu * crBu;

    // Compute the effective mass matrix.
    this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;

    if (this.m_frequencyHz > 0.0) {
      const C = length - this.m_length;

      // Frequency
      const omega = 2.0 * Math.PI * this.m_frequencyHz;

      // Damping coefficient
      const d = 2.0 * this.m_mass * this.m_dampingRatio * omega;

      // Spring stiffness
      const k = this.m_mass * omega * omega;

      // magic formulas
      const h = step.dt;
      this.m_gamma = h * (d + h * k);
      this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
      this.m_bias = C * h * k * this.m_gamma;

      invMass += this.m_gamma;
      this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
    } else {
      this.m_gamma = 0.0;
      this.m_bias = 0.0;
    }

    if (step.warmStarting) {
      // Scale the impulse to support a variable time step.
      this.m_impulse *= step.dtRatio;

      const P = Vec2.mul(this.m_impulse, this.m_u);

      vA.subMul(this.m_invMassA, P);
      wA -= this.m_invIA * Vec2.cross(this.m_rA, P);

      vB.addMul(this.m_invMassB, P);
      wB += this.m_invIB * Vec2.cross(this.m_rB, P);

    } else {
      this.m_impulse = 0.0;
    }

    this.m_bodyA.c_velocity.v.set(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.set(vB);
    this.m_bodyB.c_velocity.w = wB;
  }

  solveVelocityConstraints(step) {
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    // Cdot = dot(u, v + cross(w, r))
    const vpA = Vec2.add(vA, Vec2.cross(wA, this.m_rA));
    const vpB = Vec2.add(vB, Vec2.cross(wB, this.m_rB));
    const Cdot = Vec2.dot(this.m_u, vpB) - Vec2.dot(this.m_u, vpA);

    const impulse = -this.m_mass
        * (Cdot + this.m_bias + this.m_gamma * this.m_impulse);
    this.m_impulse += impulse;

    const P = Vec2.mul(impulse, this.m_u);
    vA.subMul(this.m_invMassA, P);
    wA -= this.m_invIA * Vec2.cross(this.m_rA, P);
    vB.addMul(this.m_invMassB, P);
    wB += this.m_invIB * Vec2.cross(this.m_rB, P);

    this.m_bodyA.c_velocity.v.set(vA);
    this.m_bodyA.c_velocity.w = wA;
    this.m_bodyB.c_velocity.v.set(vB);
    this.m_bodyB.c_velocity.w = wB;
  }

  /**
   * This returns true if the position errors are within tolerance.
   */
  solvePositionConstraints(step) {
    if (this.m_frequencyHz > 0.0) {
      // There is no position correction for soft distance constraints.
      return true;
    }

    const cA = this.m_bodyA.c_position.c;
    let aA = this.m_bodyA.c_position.a;
    const cB = this.m_bodyB.c_position.c;
    let aB = this.m_bodyB.c_position.a;

    const qA = Rot.neo(aA);
    const qB = Rot.neo(aB);

    const rA = Rot.mulSub(qA, this.m_localAnchorA, this.m_localCenterA);
    const rB = Rot.mulSub(qB, this.m_localAnchorB, this.m_localCenterB);
    const u = Vec2.sub(Vec2.add(cB, rB), Vec2.add(cA, rA));

    const length = u.normalize();
    let C = length - this.m_length;
    C = Math
        .clamp(C, -Settings.maxLinearCorrection, Settings.maxLinearCorrection);

    const impulse = -this.m_mass * C;
    const P = Vec2.mul(impulse, u);

    cA.subMul(this.m_invMassA, P);
    aA -= this.m_invIA * Vec2.cross(rA, P);
    cB.addMul(this.m_invMassB, P);
    aB += this.m_invIB * Vec2.cross(rB, P);

    this.m_bodyA.c_position.c.set(cA);
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c.set(cB);
    this.m_bodyB.c_position.a = aB;

    return Math.abs(C) < Settings.linearSlop;
  }

}

Joint.TYPES[DistanceJoint.TYPE] = DistanceJoint;
