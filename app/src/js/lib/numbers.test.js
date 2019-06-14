const test = require('tap').test;

const { equal } = require('./numbers');

test('epsilon comparison', function(t) {
	t.ok(equal(1.000004, 1.000005));
	t.ok(equal(-1.000004, -1.000005));
	t.ok(!equal(1.00004, 1.00005));
	t.ok(!equal(-1.00004, -1.00005));

	t.end();
});
