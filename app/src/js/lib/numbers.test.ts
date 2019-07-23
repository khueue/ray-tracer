import * as test from 'tape';

import * as numbers from './numbers';

test('epsilon comparison', function(t) {
	t.ok(numbers.equal(1.000004, 1.000005));
	t.ok(numbers.equal(-1.000004, -1.000005));
	t.ok(!numbers.equal(1.00004, 1.00005));
	t.ok(!numbers.equal(-1.00004, -1.00005));

	t.end();
});

test('random int inclusive', function(t) {
	const x = numbers.randomIntInclusive(1, 1);
	t.ok(x === 1);

	t.end();
});
