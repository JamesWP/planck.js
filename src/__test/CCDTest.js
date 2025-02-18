import { expect } from 'chai';

import Vec2 from '../common/Vec2';
import Transform from '../common/Transform';
import Sweep from '../common/Sweep';
import Circle from '../collision/shape/CircleShape';

import TimeOfImpact from '../collision/TimeOfImpact';
var TOIInput = TimeOfImpact.Input;
var TOIOutput = TimeOfImpact.Output;

import Distance from '../collision/Distance';
var DistanceInput = Distance.Input;
var DistanceOutput = Distance.Output;
var SimplexCache = Distance.Cache;

describe('CCD', function() {

  it('Distance', function() {
    var c1 = Circle(1);

    var input = new DistanceInput();
    input.proxyA.set(c1, 0);
    input.proxyB.set(c1, 0);
    input.transformA = new Transform(Vec2(0, 0), 0);
    input.transformB = new Transform(Vec2(1.9, 0), 0);
    input.useRadii = true;
    var cache = new SimplexCache();
    var output = new DistanceOutput();
    Distance(output, cache, input);

    expect(output.distance).equal(0);
    console.log(output);

    var input = new DistanceInput();
    input.proxyA.set(c1, 0);
    input.proxyB.set(c1, 0);
    input.transformA = new Transform(Vec2(0, 0), 0);
    input.transformB = new Transform(Vec2(2.1, 0), 0);
    input.useRadii = true;
    var cache = new SimplexCache();
    var output = new DistanceOutput();
    Distance(output, cache, input);

    expect(output.distance).closeTo(0.1, 1e-12)
    console.log(output);
  });

  it('TimeOfImpact', function() {
    var c1 = Circle(1);

    var input = new TOIInput();
    input.proxyA.set(c1, 0);
    input.proxyB.set(c1, 0);

    input.sweepA = new Sweep();
    input.sweepA = new Sweep();

    input.sweepA.setTransform(new Transform(Vec2(0, 0), 0));
    input.sweepB.setTransform(new Transform(Vec2(1.9, 0), 0));

    input.tMax = 1.0;

    var output = new TOIOutput();

    TimeOfImpact(output, input);
    console.log(output.t, output.state);

    input.sweepB.setTransform(new Transform(Vec2(2, 0), 0));

    TimeOfImpact(output, input);
    console.log(output.t, output.state);

    input.sweepB.setTransform(new Transform(Vec2(2.1, 0), 0));

    TimeOfImpact(output, input);
    console.log(output.t, output.state);
  });
});
