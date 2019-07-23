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
	for (let i = 0; i < 100; ++i) {
		const x = numbers.randomIntInclusive(0, i);
		t.ok(0 <= x && x <= i);
	}

	t.end();
});
