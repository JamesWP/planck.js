[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [FixtureDef](fixturedef.md)

# Interface: FixtureDef

## Hierarchy

* [FixtureOpt](fixtureopt.md)

* FixtureOpt

  ↳ **FixtureDef**

## Index

### Properties

* [density](fixturedef.md#optional-density)
* [filterCategoryBits](fixturedef.md#optional-filtercategorybits)
* [filterGroupIndex](fixturedef.md#optional-filtergroupindex)
* [filterMaskBits](fixturedef.md#optional-filtermaskbits)
* [friction](fixturedef.md#optional-friction)
* [isSensor](fixturedef.md#optional-issensor)
* [restitution](fixturedef.md#optional-restitution)
* [shape](fixturedef.md#shape)
* [userData](fixturedef.md#optional-userdata)

## Properties

### `Optional` density

• **density**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[density](fixtureopt.md#optional-density)*

*Overrides void*

*Defined in [dist/planck.d.ts:721](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L721)*

The density, usually in kg/m^2

___

### `Optional` filterCategoryBits

• **filterCategoryBits**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[filterCategoryBits](fixtureopt.md#optional-filtercategorybits)*

*Overrides void*

*Defined in [dist/planck.d.ts:735](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L735)*

Collision category bit or bits that this fixture belongs to.
If groupIndex is zero or not matching, then at least one bit in this fixture categoryBits should match other fixture maskBits and vice versa.

___

### `Optional` filterGroupIndex

• **filterGroupIndex**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[filterGroupIndex](fixtureopt.md#optional-filtergroupindex)*

*Overrides void*

*Defined in [dist/planck.d.ts:730](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L730)*

Zero, positive or negative collision group.
Fixtures with same positive groupIndex always collide and fixtures with same negative groupIndex never collide.

___

### `Optional` filterMaskBits

• **filterMaskBits**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[filterMaskBits](fixtureopt.md#optional-filtermaskbits)*

*Overrides void*

*Defined in [dist/planck.d.ts:739](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L739)*

Collision category bit or bits that this fixture accept for collision.

___

### `Optional` friction

• **friction**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[friction](fixtureopt.md#optional-friction)*

*Overrides void*

*Defined in [dist/planck.d.ts:713](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L713)*

The friction coefficient, usually in the range [0,1]

___

### `Optional` isSensor

• **isSensor**? : *boolean*

*Inherited from [FixtureOpt](fixtureopt.md).[isSensor](fixtureopt.md#optional-issensor)*

*Overrides void*

*Defined in [dist/planck.d.ts:725](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L725)*

A sensor shape collects contact information but never generates a collision response.

___

### `Optional` restitution

• **restitution**? : *number*

*Inherited from [FixtureOpt](fixtureopt.md).[restitution](fixtureopt.md#optional-restitution)*

*Overrides void*

*Defined in [dist/planck.d.ts:717](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L717)*

The restitution (elasticity) usually in the range [0,1]

___

###  shape

• **shape**: *Shape*

*Defined in [dist/planck.d.ts:742](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L742)*

*Defined in [src/dynamics/Fixture.ts:78](https://github.com/shakiba/planck.js/blob/3ede11b/src/dynamics/Fixture.ts#L78)*

___

### `Optional` userData

• **userData**? : *unknown*

*Inherited from [FixtureOpt](fixtureopt.md).[userData](fixtureopt.md#optional-userdata)*

*Overrides void*

*Defined in [dist/planck.d.ts:709](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L709)*
