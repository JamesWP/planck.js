[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [WeldJoint](weldjoint.md)

# Class: WeldJoint

A weld joint essentially glues two bodies together. A weld joint may distort
somewhat because the island constraint solver is approximate.
A weld joint essentially glues two bodies together. A weld joint may distort
somewhat because the island constraint solver is approximate.

## Hierarchy

* any

* Joint

  ↳ **WeldJoint**

## Callable

▸ **WeldJoint**(`def`: [WeldJointDef](../interfaces/weldjointdef.md)): *[WeldJoint](weldjoint.md)*

*Defined in [dist/planck.d.ts:3409](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3409)*

A weld joint essentially glues two bodies together. A weld joint may distort
somewhat because the island constraint solver is approximate.
A weld joint essentially glues two bodies together. A weld joint may distort
somewhat because the island constraint solver is approximate.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointDef](../interfaces/weldjointdef.md) |

**Returns:** *[WeldJoint](weldjoint.md)*

▸ **WeldJoint**(`def`: [WeldJointOpt](../interfaces/weldjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[WeldJoint](weldjoint.md)*

*Defined in [dist/planck.d.ts:3410](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3410)*

A weld joint essentially glues two bodies together. A weld joint may distort
somewhat because the island constraint solver is approximate.
A weld joint essentially glues two bodies together. A weld joint may distort
somewhat because the island constraint solver is approximate.

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointOpt](../interfaces/weldjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[WeldJoint](weldjoint.md)*

## Index

### Constructors

* [constructor](weldjoint.md#constructor)

### Properties

* [TYPE](weldjoint.md#static-type)
* [TYPES](weldjoint.md#static-types)

### Methods

* [getAnchorA](weldjoint.md#getanchora)
* [getAnchorB](weldjoint.md#getanchorb)
* [getBodyA](weldjoint.md#getbodya)
* [getBodyB](weldjoint.md#getbodyb)
* [getCollideConnected](weldjoint.md#getcollideconnected)
* [getDampingRatio](weldjoint.md#getdampingratio)
* [getFrequency](weldjoint.md#getfrequency)
* [getLocalAnchorA](weldjoint.md#getlocalanchora)
* [getLocalAnchorB](weldjoint.md#getlocalanchorb)
* [getNext](weldjoint.md#getnext)
* [getReactionForce](weldjoint.md#getreactionforce)
* [getReactionTorque](weldjoint.md#getreactiontorque)
* [getReferenceAngle](weldjoint.md#getreferenceangle)
* [getType](weldjoint.md#gettype)
* [getUserData](weldjoint.md#getuserdata)
* [initVelocityConstraints](weldjoint.md#initvelocityconstraints)
* [isActive](weldjoint.md#isactive)
* [setDampingRatio](weldjoint.md#setdampingratio)
* [setFrequency](weldjoint.md#setfrequency)
* [setUserData](weldjoint.md#setuserdata)
* [shiftOrigin](weldjoint.md#shiftorigin)
* [solvePositionConstraints](weldjoint.md#solvepositionconstraints)
* [solveVelocityConstraints](weldjoint.md#solvevelocityconstraints)

## Constructors

###  constructor

\+ **new WeldJoint**(`def`: [WeldJointDef](../interfaces/weldjointdef.md)): *[WeldJoint](weldjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3416](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3416)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointDef](../interfaces/weldjointdef.md) |

**Returns:** *[WeldJoint](weldjoint.md)*

\+ **new WeldJoint**(`def`: [WeldJointOpt](../interfaces/weldjointopt.md), `bodyA`: [Body](body.md), `bodyB`: [Body](body.md), `anchor`: [Vec2](vec2.md)): *[WeldJoint](weldjoint.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3417](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3417)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | [WeldJointOpt](../interfaces/weldjointopt.md) |
`bodyA` | [Body](body.md) |
`bodyB` | [Body](body.md) |
`anchor` | [Vec2](vec2.md) |

**Returns:** *[WeldJoint](weldjoint.md)*

\+ **new WeldJoint**(`def`: WeldJointDef): *[WeldJoint](weldjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/WeldJoint.ts:114](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/WeldJoint.ts#L114)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | WeldJointDef |

**Returns:** *[WeldJoint](weldjoint.md)*

\+ **new WeldJoint**(`def`: WeldJointOpt, `bodyA`: Body, `bodyB`: Body, `anchor`: Vec2): *[WeldJoint](weldjoint.md)*

*Overrides void*

*Defined in [src/dynamics/joint/WeldJoint.ts:116](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/WeldJoint.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`def` | WeldJointOpt |
`bodyA` | Body |
`bodyB` | Body |
`anchor` | Vec2 |

**Returns:** *[WeldJoint](weldjoint.md)*

## Properties

### `Static` TYPE

▪ **TYPE**: *"weld-joint"* = 'weld-joint' as 'weld-joint'

*Defined in [dist/planck.d.ts:3416](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3416)*

*Defined in [src/dynamics/joint/WeldJoint.ts:90](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/joint/WeldJoint.ts#L90)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [DistanceJoint](distancejoint.md).[TYPES](distancejoint.md#static-types)*

*Defined in [src/dynamics/Joint.ts:128](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L128)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  getAnchorA

▸ **getAnchorA**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3450](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3450)*

Get the anchor point on bodyA in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getAnchorB

▸ **getAnchorB**(): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3454](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3454)*

Get the anchor point on bodyB in world coordinates.

**Returns:** *[Vec2](vec2.md)*

___

###  getBodyA

▸ **getBodyA**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyA](distancejoint.md#getbodya)*

*Defined in [src/dynamics/Joint.ts:156](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L156)*

Get the first body attached to this joint.

**Returns:** *Body‹›*

___

###  getBodyB

▸ **getBodyB**(): *Body‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getBodyB](distancejoint.md#getbodyb)*

*Defined in [src/dynamics/Joint.ts:163](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L163)*

Get the second body attached to this joint.

**Returns:** *Body‹›*

___

###  getCollideConnected

▸ **getCollideConnected**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[getCollideConnected](distancejoint.md#getcollideconnected)*

*Defined in [src/dynamics/Joint.ts:187](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L187)*

Get collide connected. Note: modifying the collide connect flag won't work
correctly because the flag is only checked when fixture AABBs begin to
overlap.

**Returns:** *boolean*

___

###  getDampingRatio

▸ **getDampingRatio**(): *number*

*Defined in [dist/planck.d.ts:3446](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3446)*

Get damping ratio.

**Returns:** *number*

___

###  getFrequency

▸ **getFrequency**(): *number*

*Defined in [dist/planck.d.ts:3438](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3438)*

Get frequency in Hz.

**Returns:** *number*

___

###  getLocalAnchorA

▸ **getLocalAnchorA**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:3422](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3422)*

The local anchor point relative to bodyA's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getLocalAnchorB

▸ **getLocalAnchorB**(): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:3426](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3426)*

The local anchor point relative to bodyB's origin.

**Returns:** *[Vec2](vec2.md)*

___

###  getNext

▸ **getNext**(): *Joint‹›*

*Inherited from [DistanceJoint](distancejoint.md).[getNext](distancejoint.md#getnext)*

*Defined in [src/dynamics/Joint.ts:170](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L170)*

Get the next joint the world joint list.

**Returns:** *Joint‹›*

___

###  getReactionForce

▸ **getReactionForce**(`inv_dt`: number): *[Vec2](vec2.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:3458](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3458)*

Get the reaction force on bodyB at the joint anchor in Newtons.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  getReactionTorque

▸ **getReactionTorque**(`inv_dt`: number): *number*

*Overrides void*

*Defined in [dist/planck.d.ts:3462](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3462)*

Get the reaction torque on bodyB in N*m.

**Parameters:**

Name | Type |
------ | ------ |
`inv_dt` | number |

**Returns:** *number*

___

###  getReferenceAngle

▸ **getReferenceAngle**(): *number*

*Defined in [dist/planck.d.ts:3430](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3430)*

Get the reference angle.

**Returns:** *number*

___

###  getType

▸ **getType**(): *string*

*Inherited from [DistanceJoint](distancejoint.md).[getType](distancejoint.md#gettype)*

*Defined in [src/dynamics/Joint.ts:149](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L149)*

Get the type of the concrete joint.

**Returns:** *string*

___

###  getUserData

▸ **getUserData**(): *unknown*

*Inherited from [DistanceJoint](distancejoint.md).[getUserData](distancejoint.md#getuserdata)*

*Defined in [src/dynamics/Joint.ts:174](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L174)*

**Returns:** *unknown*

___

###  initVelocityConstraints

▸ **initVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:3463](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3463)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*

___

###  isActive

▸ **isActive**(): *boolean*

*Inherited from [DistanceJoint](distancejoint.md).[isActive](distancejoint.md#isactive)*

*Defined in [src/dynamics/Joint.ts:142](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L142)*

Short-cut function to determine if either body is inactive.

**Returns:** *boolean*

___

###  setDampingRatio

▸ **setDampingRatio**(`ratio`: number): *void*

*Defined in [dist/planck.d.ts:3442](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3442)*

Set damping ratio.

**Parameters:**

Name | Type |
------ | ------ |
`ratio` | number |

**Returns:** *void*

___

###  setFrequency

▸ **setFrequency**(`hz`: number): *void*

*Defined in [dist/planck.d.ts:3434](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3434)*

Set frequency in Hz.

**Parameters:**

Name | Type |
------ | ------ |
`hz` | number |

**Returns:** *void*

___

###  setUserData

▸ **setUserData**(`data`: unknown): *void*

*Inherited from [DistanceJoint](distancejoint.md).[setUserData](distancejoint.md#setuserdata)*

*Defined in [src/dynamics/Joint.ts:178](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L178)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | unknown |

**Returns:** *void*

___

###  shiftOrigin

▸ **shiftOrigin**(`newOrigin`: Vec2): *void*

*Inherited from [DistanceJoint](distancejoint.md).[shiftOrigin](distancejoint.md#shiftorigin)*

*Defined in [src/dynamics/Joint.ts:214](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Joint.ts#L214)*

Shift the origin for any points stored in world coordinates.

**Parameters:**

Name | Type |
------ | ------ |
`newOrigin` | Vec2 |

**Returns:** *void*

___

###  solvePositionConstraints

▸ **solvePositionConstraints**(`step`: any): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:3468](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3468)*

This returns true if the position errors are within tolerance.

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *boolean*

___

###  solveVelocityConstraints

▸ **solveVelocityConstraints**(`step`: any): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:3464](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L3464)*

**Parameters:**

Name | Type |
------ | ------ |
`step` | any |

**Returns:** *void*
