/**
 * @author Oliver Zell <https://github.com/zOadT>
 */

export as namespace planck;

export * from "./collision";
export * from "./common";
export * from "./dynmics";
export * from "../testbed";

/**
 * Tuning constants based on meters-kilograms-seconds (MKS) units.
 */
export class Settings {
  // Collision
  /**
   * The maximum number of contact points between two convex shapes. Do not change
   * this value.
   */
  maxManifoldPoints: number;

  /**
   * The maximum number of vertices on a convex polygon. You cannot increase this
   * too much because BlockAllocator has a maximum object size.
   */
  maxPolygonVertices: number;

  /**
   * This is used to fatten AABBs in the dynamic tree. This allows proxies to move
   * by a small amount without triggering a tree adjustment. This is in meters.
   */
  aabbExtension: number;

  /**
   * This is used to fatten AABBs in the dynamic tree. This is used to predict the
   * future position based on the current displacement. This is a dimensionless
   * multiplier.
   */
  aabbMultiplier: number;

  /**
   * A small length used as a collision and constraint tolerance. Usually it is
   * chosen to be numerically significant, but visually insignificant.
   */
  linearSlop: number;
  linearSlopSquared: number;

  /**
   * A small angle used as a collision and constraint tolerance. Usually it is
   * chosen to be numerically significant, but visually insignificant.
   */
  angularSlop: number;

  /**
   * The radius of the polygon/edge shape skin. This should not be modified.
   * Making this smaller means polygons will have an insufficient buffer for
   * continuous collision. Making it larger may create artifacts for vertex
   * collision.
   */
  polygonRadius: number;

  /**
   * Maximum number of sub-steps per contact in continuous physics simulation.
   */
  maxSubSteps: number;

  // Dynamics

  /**
   * Maximum number of contacts to be handled to solve a TOI impact.
   */
  maxTOIContacts: number;

  /**
   * Maximum iterations to solve a TOI.
   */
  maxTOIIterations: number;

  /**
   * Maximum iterations to find Distance.
   */
  maxDistnceIterations: number;

  /**
   * A velocity threshold for elastic collisions. Any collision with a relative
   * linear velocity below this threshold will be treated as inelastic.
   */
  velocityThreshold: number;

  /**
   * The maximum linear position correction used when solving constraints. This
   * helps to prevent overshoot.
   */
  maxLinearCorrection: number;

  /**
   * The maximum angular position correction used when solving constraints. This
   * helps to prevent overshoot.
   */
  maxAngularCorrection: number;

  /**
   * The maximum linear velocity of a body. This limit is very large and is used
   * to prevent numerical problems. You shouldn't need to adjust this.
   */
  maxTranslation: number;
  maxTranslationSquared: number;

  /**
   * The maximum angular velocity of a body. This limit is very large and is used
   * to prevent numerical problems. You shouldn't need to adjust this.
   */
  maxRotation: number;
  maxRotationSquared: number;

  /**
   * This scale factor controls how fast overlap is resolved. Ideally this would
   * be 1 so that overlap is removed in one time step. However using values close
   * to 1 often lead to overshoot.
   */
  baumgarte: number;
  toiBaugarte: number;

  // Sleep

  /**
   * The time that a body must be still before it will go to sleep.
   */
  timeToSleep: number;

  /**
   * A body cannot sleep if its linear velocity is above this tolerance.
   */
  linearSleepTolerance: number;
  linearSleepToleranceSqr: number;

  /**
   * A body cannot sleep if its angular velocity is above this tolerance.
   */
  angularSleepTolerance: number;
  angularSleepToleranceSqr: number;
}
