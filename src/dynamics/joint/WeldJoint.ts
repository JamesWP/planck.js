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
import Vec3 from '../../common/Vec3';
import Mat33 from '../../common/Mat33';
import Rot from '../../common/Rot';
import Joint from '../Joint';
import { JointOpt, JointDef } from '../Joint';
import Body from '../Body';


/**
 * Weld joint definition. You need to specify local anchor points where they are
 * attached and the relative body angle. The position of the anchor points is
 * important for computing the reaction torque.
 *
 * @prop {float} frequencyHz
 * @prop {float} dampingRatio
 *
 * @prop {Vec2} localAnchorA
 * @prop {Vec2} localAnchorB
 * @prop {float} referenceAngle
 */
export interface WeldJointOpt extends JointOpt {
  /**
   * The mass-spring-damper frequency in Hertz. Rotation only. Disable softness
   * with a value of 0.
   */
  frequencyHz?: number;
  /**
   * The damping ratio. 0 = no damping, 1 = critical damping.
   */
  dampingRatio?: number;
  /**
   * The bodyB angle minus bodyA angle in the reference state (radians).
   */
  referenceAngle?: number;
}
/**
 * Weld joint definition. You need to specify local anchor points where they are
 * attached and the relative body angle. The position of the anchor points is
 * important for computing the reaction torque.
 */
export interface WeldJointDef extends JointDef, WeldJointOpt {
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
  dampingRatio : 0.0,
};

/**
 * A weld joint essentially glues two bodies together. A weld joint may distort
 * somewhat because the island constraint solver is approximate.
 */
export default class WeldJoint extends Joint {
  static TYPE = 'weld-joint' as 'weld-joint';

  /** @internal */ m_type: 'weld-joint';
  /** @internal */ m_localAnchorA: Vec2;
  /** @internal */ m_localAnchorB: Vec2;
  /** @internal */ m_referenceAngle: number;

  /** @internal */ m_frequencyHz: number;
  /** @internal */ m_dampingRatio: number;

  /** @internal */ m_impulse: Vec3;

  /** @internal */ m_bias: number;
  /** @internal */ m_gamma: number;

  // Solver temp
  /** @internal */ m_rA; // Vec2
  /** @internal */ m_rB; // Vec2
  /** @internal */ m_localCenterA; // Vec2
  /** @internal */ m_localCenterB; // Vec2
  /** @internal */ m_invMassA; // float
  /** @internal */ m_invMassB; // float
  /** @internal */ m_invIA; // float
  /** @internal */ m_invIB; // float
  /** @internal */ m_mass: Mat33;

  constructor(def: WeldJointDef);
  constructor(def: WeldJointOpt, bodyA: Body, bodyB: Body, anchor: Vec2);
  constructor(def: WeldJointDef, bodyA?: Body, bodyB?: Body, anchor?: Vec2) {
    // @ts-ignore
    if (!(this instanceof WeldJoint)) {
      return new WeldJoint(def, bodyA, bodyB, anchor);
    }

    def = options(def, DEFAULTS);
    super(def, bodyA, bodyB);
    bodyA = this.m_bodyA;
    bodyB = this.m_bodyB;

    this.m_type = WeldJoint.TYPE;

    this.m_localAnchorA = Vec2.clone(anchor ? bodyA.getLocalPoint(anchor) : def.localAnchorA || Vec2.zero());
    this.m_localAnchorB = Vec2.clone(anchor ? bodyB.getLocalPoint(anchor) : def.localAnchorB || Vec2.zero());
    this.m_referenceAngle = Math.isFinite(def.referenceAngle) ? def.referenceAngle : bodyB.getAngle() - bodyA.getAngle();

    this.m_frequencyHz = def.frequencyHz;
    this.m_dampingRatio = def.dampingRatio;

    this.m_impulse = new Vec3();

    this.m_bias = 0.0;
    this.m_gamma = 0.0;

    // Solver temp
    this.m_rA; // Vec2
    this.m_rB; // Vec2
    this.m_localCenterA; // Vec2
    this.m_localCenterB; // Vec2
    this.m_invMassA; // float
    this.m_invMassB; // float
    this.m_invIA; // float
    this.m_invIB; // float
    this.m_mass = new Mat33();

    // Point-to-point constraint
    // C = p2 - p1
    // Cdot = v2 - v1
    // / = v2 + cross(w2, r2) - v1 - cross(w1, r1)
    // J = [-I -r1_skew I r2_skew ]
    // Identity used:
    // w k % (rx i + ry j) = w * (-ry i + rx j)

    // Angle constraint
    // C = angle2 - angle1 - referenceAngle
    // Cdot = w2 - w1
    // J = [0 0 -1 0 0 1]
    // K = invI1 + invI2
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
      referenceAngle: this.m_referenceAngle,
    };
  }

  /** @internal */
  static _deserialize(data, world, restore) {
    data = {...data};
    data.bodyA = restore(Body, data.bodyA, world);
    data.bodyB = restore(Body, data.bodyB, world);
    const joint = new WeldJoint(data);
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
   * Get the reference angle.
   */
  getReferenceAngle() {
    return this.m_referenceAngle;
  }

  /**
   * Set frequency in Hz.
   */
  setFrequency(hz: number) {
    this.m_frequencyHz = hz;
  }

  /**
   * Get frequency in Hz.
   */
  getFrequency() {
    return this.m_frequencyHz;
  }

  /**
   * Set damping ratio.
   */
  setDampingRatio(ratio: number) {
    this.m_dampingRatio = ratio;
  }

  /**
   * Get damping ratio.
   */
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
    return Vec2.neo(this.m_impulse.x, this.m_impulse.y).mul(inv_dt);
  }

  /**
   * Get the reaction torque on bodyB in N*m.
*/
  getReactionTorque(inv_dt: number) {
    return inv_dt * this.m_impulse.z;
  }

  initVelocityConstraints(step) {
    this.m_localCenterA = this.m_bodyA.m_sweep.localCenter;
    this.m_localCenterB = this.m_bodyB.m_sweep.localCenter;
    this.m_invMassA = this.m_bodyA.m_invMass;
    this.m_invMassB = this.m_bodyB.m_invMass;
    this.m_invIA = this.m_bodyA.m_invI;
    this.m_invIB = this.m_bodyB.m_invI;

    const aA = this.m_bodyA.c_position.a;
    const vA = this.m_bodyA.c_velocity.v;
    let wA = this.m_bodyA.c_velocity.w;

    const aB = this.m_bodyB.c_position.a;
    const vB = this.m_bodyB.c_velocity.v;
    let wB = this.m_bodyB.c_velocity.w;

    const qA = Rot.neo(aA), qB = Rot.neo(aB);

    this.m_rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    this.m_rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

    // J = [-I -r1_skew I r2_skew]
    // [ 0 -1 0 1]
    // r_skew = [-ry; rx]

    // Matlab
    // K = [ mA+r1y^2*iA+mB+r2y^2*iB, -r1y*iA*r1x-r2y*iB*r2x, -r1y*iA-r2y*iB]
    // [ -r1y*iA*r1x-r2y*iB*r2x, mA+r1x^2*iA+mB+r2x^2*iB, r1x*iA+r2x*iB]
    // [ -r1y*iA-r2y*iB, r1x*iA+r2x*iB, iA+iB]

    const mA = this.m_invMassA;
    const mB = this.m_invMassB; // float
    const iA = this.m_invIA;
    const iB = this.m_invIB; // float

    const K = new Mat33();
    K.ex.x = mA + mB + this.m_rA.y * this.m_rA.y * iA + this.m_rB.y * this.m_rB.y
        * iB;
    K.ey.x = -this.m_rA.y * this.m_rA.x * iA - this.m_rB.y * this.m_rB.x * iB;
    K.ez.x = -this.m_rA.y * iA - this.m_rB.y * iB;
    K.ex.y = K.ey.x;
    K.ey.y = mA + mB + this.m_rA.x * this.m_rA.x * iA + this.m_rB.x * this.m_rB.x
        * iB;
    K.ez.y = this.m_rA.x * iA + this.m_rB.x * iB;
    K.ex.z = K.ez.x;
    K.ey.z = K.ez.y;
    K.ez.z = iA + iB;

    if (this.m_frequencyHz > 0.0) {
      K.getInverse22(this.m_mass);

      let invM = iA + iB; // float
      const m = invM > 0.0 ? 1.0 / invM : 0.0; // float

      const C = aB - aA - this.m_referenceAngle; // float

      // Frequency
      const omega = 2.0 * Math.PI * this.m_frequencyHz; // float

      // Damping coefficient
      const d = 2.0 * m * this.m_dampingRatio * omega; // float

      // Spring stiffness
      const k = m * omega * omega; // float

      // magic formulas
      const h = step.dt; // float
      this.m_gamma = h * (d + h * k);
      this.m_gamma = this.m_gamma != 0.0 ? 1.0 / this.m_gamma : 0.0;
      this.m_bias = C * h * k * this.m_gamma;

      invM += this.m_gamma;
      this.m_mass.ez.z = invM != 0.0 ? 1.0 / invM : 0.0;
    } else if (K.ez.z == 0.0) {
      K.getInverse22(this.m_mass);
      this.m_gamma = 0.0;
      this.m_bias = 0.0;
    } else {
      K.getSymInverse33(this.m_mass);
      this.m_gamma = 0.0;
      this.m_bias = 0.0;
    }

    if (step.warmStarting) {
      // Scale impulses to support a variable time step.
      this.m_impulse.mul(step.dtRatio);

      const P = Vec2.neo(this.m_impulse.x, this.m_impulse.y);

      vA.subMul(mA, P);
      wA -= iA * (Vec2.cross(this.m_rA, P) + this.m_impulse.z);

      vB.addMul(mB, P);
      wB += iB * (Vec2.cross(this.m_rB, P) + this.m_impulse.z);

    } else {
      this.m_impulse.setZero();
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

    const mA = this.m_invMassA;
    const mB = this.m_invMassB; // float
    const iA = this.m_invIA;
    const iB = this.m_invIB; // float

    if (this.m_frequencyHz > 0.0) {
      const Cdot2 = wB - wA; // float

      const impulse2 = -this.m_mass.ez.z
          * (Cdot2 + this.m_bias + this.m_gamma * this.m_impulse.z); // float
      this.m_impulse.z += impulse2;

      wA -= iA * impulse2;
      wB += iB * impulse2;

      const Cdot1 = Vec2.zero();
      Cdot1.addCombine(1, vB, 1, Vec2.cross(wB, this.m_rB));
      Cdot1.subCombine(1, vA, 1, Vec2.cross(wA, this.m_rA)); // Vec2

      const impulse1 = Vec2.neg(Mat33.mulVec2(this.m_mass, Cdot1)); // Vec2
      this.m_impulse.x += impulse1.x;
      this.m_impulse.y += impulse1.y;

      const P = Vec2.clone(impulse1); // Vec2

      vA.subMul(mA, P);
      wA -= iA * Vec2.cross(this.m_rA, P);

      vB.addMul(mB, P);
      wB += iB * Vec2.cross(this.m_rB, P);
    } else {
      const Cdot1 = Vec2.zero();
      Cdot1.addCombine(1, vB, 1, Vec2.cross(wB, this.m_rB));
      Cdot1.subCombine(1, vA, 1, Vec2.cross(wA, this.m_rA)); // Vec2
      const Cdot2 = wB - wA; // float
      const Cdot = new Vec3(Cdot1.x, Cdot1.y, Cdot2); // Vec3

      const impulse = Vec3.neg(Mat33.mulVec3(this.m_mass, Cdot)); // Vec3
      this.m_impulse.add(impulse);

      const P = Vec2.neo(impulse.x, impulse.y);

      vA.subMul(mA, P);
      wA -= iA * (Vec2.cross(this.m_rA, P) + impulse.z);

      vB.addMul(mB, P);
      wB += iB * (Vec2.cross(this.m_rB, P) + impulse.z);
    }

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

    const mA = this.m_invMassA, mB = this.m_invMassB; // float
    const iA = this.m_invIA, iB = this.m_invIB; // float

    const rA = Rot.mulVec2(qA, Vec2.sub(this.m_localAnchorA, this.m_localCenterA));
    const rB = Rot.mulVec2(qB, Vec2.sub(this.m_localAnchorB, this.m_localCenterB));

    let positionError, angularError; // float

    const K = new Mat33();
    K.ex.x = mA + mB + rA.y * rA.y * iA + rB.y * rB.y * iB;
    K.ey.x = -rA.y * rA.x * iA - rB.y * rB.x * iB;
    K.ez.x = -rA.y * iA - rB.y * iB;
    K.ex.y = K.ey.x;
    K.ey.y = mA + mB + rA.x * rA.x * iA + rB.x * rB.x * iB;
    K.ez.y = rA.x * iA + rB.x * iB;
    K.ex.z = K.ez.x;
    K.ey.z = K.ez.y;
    K.ez.z = iA + iB;

    if (this.m_frequencyHz > 0.0) {
      const C1 = Vec2.zero();
      C1.addCombine(1, cB, 1, rB);
      C1.subCombine(1, cA, 1, rA); // Vec2

      positionError = C1.length();
      angularError = 0.0;

      const P = Vec2.neg(K.solve22(C1)); // Vec2

      cA.subMul(mA, P);
      aA -= iA * Vec2.cross(rA, P);

      cB.addMul(mB, P);
      aB += iB * Vec2.cross(rB, P);
    } else {
      const C1 = Vec2.zero();
      C1.addCombine(1, cB, 1, rB);
      C1.subCombine(1, cA, 1, rA);

      const C2 = aB - aA - this.m_referenceAngle; // float

      positionError = C1.length();
      angularError = Math.abs(C2);

      const C = new Vec3(C1.x, C1.y, C2);

      let impulse = new Vec3();
      if (K.ez.z > 0.0) {
        impulse = Vec3.neg(K.solve33(C));
      } else {
        const impulse2 = Vec2.neg(K.solve22(C1));
        impulse.set(impulse2.x, impulse2.y, 0.0);
      }

      const P = Vec2.neo(impulse.x, impulse.y);

      cA.subMul(mA, P);
      aA -= iA * (Vec2.cross(rA, P) + impulse.z);

      cB.addMul(mB, P);
      aB += iB * (Vec2.cross(rB, P) + impulse.z);
    }

    this.m_bodyA.c_position.c = cA;
    this.m_bodyA.c_position.a = aA;
    this.m_bodyB.c_position.c = cB;
    this.m_bodyB.c_position.a = aB;

    return positionError <= Settings.linearSlop
        && angularError <= Settings.angularSlop;
  }

}

Joint.TYPES[WeldJoint.TYPE] = WeldJoint;
