const EPSILON = 0.00001;

function equal(a, b) {
	return Math.abs(a - b) < EPSILON;
}

module.exports = {
	equal,
};
