const test = require('tap').test;

const numbers = require('./numbers');

test('epsilon comparison', function(t) {
	t.ok(numbers.equal(1.000004, 1.000005));
	t.ok(numbers.equal(-1.000004, -1.000005));
	t.ok(!numbers.equal(1.00004, 1.00005));
	t.ok(!numbers.equal(-1.00004, -1.00005));

	t.end();
});
