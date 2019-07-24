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
	const min = -100;
	const max = +100;
	for (let i = min; i <= max; ++i) {
		const x = numbers.randomIntInclusive(min, i);
		t.ok(min <= x && x <= i);
	}

	t.end();
});
