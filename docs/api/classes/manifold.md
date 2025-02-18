[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [Manifold](manifold.md)

# Class: Manifold

A manifold for two touching convex shapes. Manifolds are created in `evaluate`
method of Contact subclasses.
A manifold for two touching convex shapes. Manifolds are created in `evaluate`
method of Contact subclasses.

Supported manifold types are e_faceA or e_faceB for clip point versus plane
with radius and e_circles point versus point with radius.

We store contacts in this way so that position correction can account for
movement, which is critical for continuous physics. All contact scenarios
must be expressed in one of these types. This structure is stored across time
steps, so we keep it small.

Supported manifold types are e_faceA or e_faceB for clip point versus plane
with radius and e_circles point versus point with radius.

We store contacts in this way so that position correction can account for
movement, which is critical for continuous physics. All contact scenarios
must be expressed in one of these types. This structure is stored across time
steps, so we keep it small.

**`prop`** type e_circle, e_faceA, e_faceB

**`prop`** localPoint Usage depends on manifold type:<br>
      e_circles: the local center of circleA <br>
      e_faceA: the center of faceA <br>
      e_faceB: the center of faceB

**`prop`** localNormal Usage depends on manifold type:<br>
      e_circles: not used <br>
      e_faceA: the normal on polygonA <br>
      e_faceB: the normal on polygonB

**`prop`** points The points of contact {ManifoldPoint[]}

**`prop`** pointCount The number of manifold points

**`prop`** type e_circle, e_faceA, e_faceB

**`prop`** localPoint Usage depends on manifold type:<br>
      e_circles: the local center of circleA <br>
      e_faceA: the center of faceA <br>
      e_faceB: the center of faceB

**`prop`** localNormal Usage depends on manifold type:<br>
      e_circles: not used <br>
      e_faceA: the normal on polygonA <br>
      e_faceB: the normal on polygonB

**`prop`** points The points of contact {ManifoldPoint[]}

**`prop`** pointCount The number of manifold points

## Hierarchy

* **Manifold**

## Index

### Properties

* [localNormal](manifold.md#localnormal)
* [localPoint](manifold.md#localpoint)
* [pointCount](manifold.md#pointcount)
* [points](manifold.md#points)
* [type](manifold.md#type)

### Methods

* [getWorldManifold](manifold.md#getworldmanifold)

## Properties

###  localNormal

• **localNormal**: *Vec2* = Vec2.zero()

*Defined in [dist/planck.d.ts:1053](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1053)*

*Defined in [src/collision/Manifold.ts:67](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Manifold.ts#L67)*

___

###  localPoint

• **localPoint**: *Vec2* = Vec2.zero()

*Defined in [dist/planck.d.ts:1054](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1054)*

*Defined in [src/collision/Manifold.ts:68](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Manifold.ts#L68)*

___

###  pointCount

• **pointCount**: *number* = 0

*Defined in [dist/planck.d.ts:1056](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1056)*

*Defined in [src/collision/Manifold.ts:70](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Manifold.ts#L70)*

___

###  points

• **points**: *ManifoldPoint[]* = [ new ManifoldPoint(), new ManifoldPoint() ]

*Defined in [dist/planck.d.ts:1055](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1055)*

*Defined in [src/collision/Manifold.ts:69](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Manifold.ts#L69)*

___

###  type

• **type**: *ManifoldType*

*Defined in [dist/planck.d.ts:1052](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1052)*

*Defined in [src/collision/Manifold.ts:66](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Manifold.ts#L66)*

## Methods

###  getWorldManifold

▸ **getWorldManifold**(`wm`: [WorldManifold](worldmanifold.md) | undefined, `xfA`: [Transform](transform.md), `radiusA`: number, `xfB`: [Transform](transform.md), `radiusB`: number): *[WorldManifold](worldmanifold.md)*

*Defined in [dist/planck.d.ts:1062](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L1062)*

Evaluate the manifold with supplied transforms. This assumes modest motion
from the original state. This does not change the point count, impulses, etc.
The radii must come from the shapes that generated the manifold.

**Parameters:**

Name | Type |
------ | ------ |
`wm` | [WorldManifold](worldmanifold.md) &#124; undefined |
`xfA` | [Transform](transform.md) |
`radiusA` | number |
`xfB` | [Transform](transform.md) |
`radiusB` | number |

**Returns:** *[WorldManifold](worldmanifold.md)*
