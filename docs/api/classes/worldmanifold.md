[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WorldManifold](worldmanifold.md)

# Class: WorldManifold

This is used to compute the current state of a contact manifold.
This is used to compute the current state of a contact manifold.

## Hierarchy

* **WorldManifold**

## Index

### Properties

* [normal](worldmanifold.md#normal)
* [points](worldmanifold.md#points)
* [separations](worldmanifold.md#separations)

## Properties

###  normal

• **normal**: *Vec2*

*Defined in [dist/planck.d.ts:1134](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1134)*

*Defined in [src/collision/Manifold.ts:235](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Manifold.ts#L235)*

World vector pointing from A to B
World vector pointing from A to B

___

###  points

• **points**: *Vec2[]* = []

*Defined in [dist/planck.d.ts:1138](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1138)*

*Defined in [src/collision/Manifold.ts:239](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Manifold.ts#L239)*

World contact point (point of intersection)
World contact point (point of intersection)

___

###  separations

• **separations**: *number[]* = []

*Defined in [dist/planck.d.ts:1142](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1142)*

*Defined in [src/collision/Manifold.ts:243](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Manifold.ts#L243)*

A negative value indicates overlap, in meters
A negative value indicates overlap, in meters
