[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [SeparationFunction](separationfunction.md)

# Class: SeparationFunction

## Hierarchy

* **SeparationFunction**

## Index

### Properties

* [indexA](separationfunction.md#indexa)
* [indexB](separationfunction.md#indexb)
* [m_axis](separationfunction.md#m_axis)
* [m_localPoint](separationfunction.md#m_localpoint)
* [m_proxyA](separationfunction.md#m_proxya)
* [m_proxyB](separationfunction.md#m_proxyb)
* [m_sweepA](separationfunction.md#m_sweepa)
* [m_sweepB](separationfunction.md#m_sweepb)
* [m_type](separationfunction.md#m_type)

### Methods

* [compute](separationfunction.md#compute)
* [evaluate](separationfunction.md#evaluate)
* [findMinSeparation](separationfunction.md#findminseparation)
* [initialize](separationfunction.md#initialize)

## Properties

###  indexA

• **indexA**: *number*

*Defined in [src/collision/TimeOfImpact.ts:316](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L316)*

___

###  indexB

• **indexB**: *number*

*Defined in [src/collision/TimeOfImpact.ts:317](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L317)*

___

###  m_axis

• **m_axis**: *Vec2‹›* = Vec2.zero()

*Defined in [src/collision/TimeOfImpact.ts:320](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L320)*

___

###  m_localPoint

• **m_localPoint**: *Vec2‹›* = Vec2.zero()

*Defined in [src/collision/TimeOfImpact.ts:319](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L319)*

___

###  m_proxyA

• **m_proxyA**: *DistanceProxy‹›* = new DistanceProxy()

*Defined in [src/collision/TimeOfImpact.ts:312](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L312)*

___

###  m_proxyB

• **m_proxyB**: *DistanceProxy‹›* = new DistanceProxy()

*Defined in [src/collision/TimeOfImpact.ts:313](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L313)*

___

###  m_sweepA

• **m_sweepA**: *Sweep*

*Defined in [src/collision/TimeOfImpact.ts:314](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L314)*

___

###  m_sweepB

• **m_sweepB**: *Sweep*

*Defined in [src/collision/TimeOfImpact.ts:315](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L315)*

___

###  m_type

• **m_type**: *[SeparationFunctionType](../enums/separationfunctiontype.md)*

*Defined in [src/collision/TimeOfImpact.ts:318](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L318)*

## Methods

###  compute

▸ **compute**(`find`: any, `t`: any): *number*

*Defined in [src/collision/TimeOfImpact.ts:396](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L396)*

**Parameters:**

Name | Type |
------ | ------ |
`find` | any |
`t` | any |

**Returns:** *number*

___

###  evaluate

▸ **evaluate**(`t`: any): *number*

*Defined in [src/collision/TimeOfImpact.ts:473](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L473)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | any |

**Returns:** *number*

___

###  findMinSeparation

▸ **findMinSeparation**(`t`: any): *number*

*Defined in [src/collision/TimeOfImpact.ts:469](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L469)*

**Parameters:**

Name | Type |
------ | ------ |
`t` | any |

**Returns:** *number*

___

###  initialize

▸ **initialize**(`cache`: SimplexCache, `proxyA`: DistanceProxy, `sweepA`: Sweep, `proxyB`: DistanceProxy, `sweepB`: Sweep, `t1`: number): *number*

*Defined in [src/collision/TimeOfImpact.ts:324](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/TimeOfImpact.ts#L324)*

**Parameters:**

Name | Type |
------ | ------ |
`cache` | SimplexCache |
`proxyA` | DistanceProxy |
`sweepA` | Sweep |
`proxyB` | DistanceProxy |
`sweepB` | Sweep |
`t1` | number |

**Returns:** *number*
