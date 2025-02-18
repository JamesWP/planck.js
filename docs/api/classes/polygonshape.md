[Planck.js API Doc](../README.md) › [Globals](../globals.md) › [PolygonShape](polygonshape.md)

# Class: PolygonShape

A convex polygon. It is assumed that the interior of the polygon is to the
left of each edge. Polygons have a maximum number of vertices equal to
Settings.maxPolygonVertices. In most cases you should not need many vertices
for a convex polygon. extends Shape
A convex polygon. It is assumed that the interior of the polygon is to the
left of each edge. Polygons have a maximum number of vertices equal to
Settings.maxPolygonVertices. In most cases you should not need many vertices
for a convex polygon. extends Shape

## Hierarchy

* any

* Shape

  ↳ **PolygonShape**

## Callable

▸ **PolygonShape**(`vertices?`: [Vec2](vec2.md)[]): *[PolygonShape](polygonshape.md)*

*Defined in [dist/planck.d.ts:2155](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2155)*

A convex polygon. It is assumed that the interior of the polygon is to the
left of each edge. Polygons have a maximum number of vertices equal to
Settings.maxPolygonVertices. In most cases you should not need many vertices
for a convex polygon. extends Shape
A convex polygon. It is assumed that the interior of the polygon is to the
left of each edge. Polygons have a maximum number of vertices equal to
Settings.maxPolygonVertices. In most cases you should not need many vertices
for a convex polygon. extends Shape

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2](vec2.md)[] |

**Returns:** *[PolygonShape](polygonshape.md)*

## Index

### Constructors

* [constructor](polygonshape.md#constructor)

### Properties

* [m_centroid](polygonshape.md#m_centroid)
* [m_count](polygonshape.md#m_count)
* [m_normals](polygonshape.md#m_normals)
* [m_radius](polygonshape.md#m_radius)
* [m_type](polygonshape.md#m_type)
* [m_vertices](polygonshape.md#m_vertices)
* [TYPE](polygonshape.md#static-type)
* [TYPES](polygonshape.md#static-types)

### Methods

* [_clone](polygonshape.md#_clone)
* [_reset](polygonshape.md#_reset)
* [_setAsBox](polygonshape.md#_setasbox)
* [computeAABB](polygonshape.md#computeaabb)
* [computeDistanceProxy](polygonshape.md#computedistanceproxy)
* [computeMass](polygonshape.md#computemass)
* [getChildCount](polygonshape.md#getchildcount)
* [getRadius](polygonshape.md#getradius)
* [getType](polygonshape.md#gettype)
* [getVertex](polygonshape.md#getvertex)
* [rayCast](polygonshape.md#raycast)
* [testPoint](polygonshape.md#testpoint)
* [validate](polygonshape.md#validate)
* [isValid](polygonshape.md#static-isvalid)

## Constructors

###  constructor

\+ **new PolygonShape**(`vertices?`: [Vec2](vec2.md)[]): *[PolygonShape](polygonshape.md)*

*Defined in [dist/planck.d.ts:2167](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2167)*

**Parameters:**

Name | Type |
------ | ------ |
`vertices?` | [Vec2](vec2.md)[] |

**Returns:** *[PolygonShape](polygonshape.md)*

## Properties

###  m_centroid

• **m_centroid**: *Vec2*

*Defined in [dist/planck.d.ts:2164](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2164)*

*Defined in [src/collision/shape/PolygonShape.ts:49](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/shape/PolygonShape.ts#L49)*

___

###  m_count

• **m_count**: *number*

*Defined in [dist/planck.d.ts:2167](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2167)*

*Defined in [src/collision/shape/PolygonShape.ts:52](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/shape/PolygonShape.ts#L52)*

___

###  m_normals

• **m_normals**: *Vec2[]*

*Defined in [dist/planck.d.ts:2166](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2166)*

*Defined in [src/collision/shape/PolygonShape.ts:51](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/shape/PolygonShape.ts#L51)*

___

###  m_radius

• **m_radius**: *number*

*Inherited from [CircleShape](circleshape.md).[m_radius](circleshape.md#m_radius)*

*Defined in [src/collision/Shape.ts:39](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Shape.ts#L39)*

___

###  m_type

• **m_type**: *[ShapeType](../globals.md#shapetype)*

*Inherited from [CircleShape](circleshape.md).[m_type](circleshape.md#m_type)*

*Defined in [src/collision/Shape.ts:38](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Shape.ts#L38)*

___

###  m_vertices

• **m_vertices**: *Vec2[]*

*Defined in [dist/planck.d.ts:2165](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2165)*

*Defined in [src/collision/shape/PolygonShape.ts:50](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/shape/PolygonShape.ts#L50)*

___

### `Static` TYPE

▪ **TYPE**: *"polygon"* = 'polygon' as 'polygon'

*Defined in [dist/planck.d.ts:2163](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2163)*

*Defined in [src/collision/shape/PolygonShape.ts:47](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/shape/PolygonShape.ts#L47)*

___

### `Static` TYPES

▪ **TYPES**: *object*

*Inherited from [CircleShape](circleshape.md).[TYPES](circleshape.md#static-types)*

*Defined in [src/collision/Shape.ts:47](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Shape.ts#L47)*

#### Type declaration:

* \[ **id**: *string*\]: object

## Methods

###  _clone

▸ **_clone**(): *[PolygonShape](polygonshape.md)*

*Overrides void*

*Defined in [dist/planck.d.ts:2176](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2176)*

**`deprecated`** Shapes should be treated as immutable.

clone the concrete shape.

**Returns:** *[PolygonShape](polygonshape.md)*

___

###  _reset

▸ **_reset**(): *void*

*Overrides [CircleShape](circleshape.md).[_reset](circleshape.md#_reset)*

*Defined in [dist/planck.d.ts:2181](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2181)*

**Returns:** *void*

___

###  _setAsBox

▸ **_setAsBox**(`hx`: number, `hy`: number): *void*

*Defined in [dist/planck.d.ts:2182](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2182)*

**Parameters:**

Name | Type |
------ | ------ |
`hx` | number |
`hy` | number |

**Returns:** *void*

▸ **_setAsBox**(`hx`: number, `hy`: number): *void*

*Defined in [src/collision/shape/PolygonShape.ts:261](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/shape/PolygonShape.ts#L261)*

**Parameters:**

Name | Type |
------ | ------ |
`hx` | number |
`hy` | number |

**Returns:** *void*

___

###  computeAABB

▸ **computeAABB**(`aabb`: [AABB](aabb.md), `xf`: [Transform](transform.md), `childIndex`: number): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2208](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2208)*

Given a transform, compute the associated axis aligned bounding box for a
child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`aabb` | [AABB](aabb.md) | Returns the axis aligned box. |
`xf` | [Transform](transform.md) | The world transform of the shape. |
`childIndex` | number | The child shape  |

**Returns:** *void*

___

###  computeDistanceProxy

▸ **computeDistanceProxy**(`proxy`: [DistanceProxy](distanceproxy.md)): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2222](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2222)*

**Parameters:**

Name | Type |
------ | ------ |
`proxy` | [DistanceProxy](distanceproxy.md) |

**Returns:** *void*

___

###  computeMass

▸ **computeMass**(`massData`: [MassData](massdata.md), `density`: number): *void*

*Overrides void*

*Defined in [dist/planck.d.ts:2216](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2216)*

Compute the mass properties of this shape using its dimensions and density.
The inertia tensor is computed about the local origin.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`massData` | [MassData](massdata.md) | Returns the mass data for this shape. |
`density` | number | The density in kilograms per meter squared.  |

**Returns:** *void*

___

###  getChildCount

▸ **getChildCount**(): *1*

*Overrides void*

*Defined in [dist/planck.d.ts:2180](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2180)*

Get the number of child primitives.

**Returns:** *1*

___

###  getRadius

▸ **getRadius**(): *number*

*Inherited from [EdgeShape](edgeshape.md).[getRadius](edgeshape.md#getradius)*

*Defined in [src/collision/Shape.ts:59](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Shape.ts#L59)*

**Returns:** *number*

___

###  getType

▸ **getType**(): *[ShapeType](../globals.md#shapetype)*

*Inherited from [CircleShape](circleshape.md).[getType](circleshape.md#gettype)*

*Defined in [src/collision/Shape.ts:69](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Shape.ts#L69)*

Get the type of this shape. You can use this to down cast to the concrete
shape.

**Returns:** *[ShapeType](../globals.md#shapetype)*

the shape type.

___

###  getVertex

▸ **getVertex**(`index`: number): *[Vec2](vec2.md)*

*Defined in [dist/planck.d.ts:2170](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2170)*

**Parameters:**

Name | Type |
------ | ------ |
`index` | number |

**Returns:** *[Vec2](vec2.md)*

___

###  rayCast

▸ **rayCast**(`output`: [RayCastOutput](../interfaces/raycastoutput.md), `input`: [RayCastInput](../interfaces/raycastinput.md), `xf`: [Transform](transform.md), `childIndex`: number): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:2199](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2199)*

Cast a ray against a child shape.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`output` | [RayCastOutput](../interfaces/raycastoutput.md) | The ray-cast results. |
`input` | [RayCastInput](../interfaces/raycastinput.md) | The ray-cast input parameters. |
`xf` | [Transform](transform.md) | The transform to be applied to the shape. |
`childIndex` | number | The child shape index  |

**Returns:** *boolean*

___

###  testPoint

▸ **testPoint**(`xf`: [Transform](transform.md), `p`: [Vec2](vec2.md)): *boolean*

*Overrides void*

*Defined in [dist/planck.d.ts:2190](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2190)*

Test a point for containment in this shape. This only works for convex
shapes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`xf` | [Transform](transform.md) | The shape world transform. |
`p` | [Vec2](vec2.md) | A point in world coordinates.  |

**Returns:** *boolean*

___

###  validate

▸ **validate**(): *boolean*

*Defined in [dist/planck.d.ts:2221](https://github.com/shakiba/planck.js/blob/3ede11b/dist/planck.d.ts#L2221)*

Validate convexity. This is a very time consuming operation.

**Returns:** *boolean*

true if valid

___

### `Static` isValid

▸ **isValid**(`shape`: Shape | null | undefined): *shape is Shape*

*Inherited from [CircleShape](circleshape.md).[isValid](circleshape.md#static-isvalid)*

*Defined in [src/collision/Shape.ts:55](https://github.com/shakiba/planck.js/blob/3ede11b/src/collision/Shape.ts#L55)*

**Parameters:**

Name | Type |
------ | ------ |
`shape` | Shape &#124; null &#124; undefined |

**Returns:** *shape is Shape*
