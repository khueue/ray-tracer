const numbers = require('./numbers');

function Matrix22(m) {
	// Note that this will not create new objects.
	return m;
}

function Matrix33(m) {
	// Note that this will not create new objects.
	return m;
}

function Matrix44(m) {
	// Note that this will not create new objects.
	return m;
}

function equal(a, b) {
	if (a.length !== b.length) {
		return false;
	} else {
		for (let row = 0; row < a.length; ++row) {
			for (let col = 0; col < a[row].length; ++col) {
				if (!numbers.equal(a[row][col], b[row][col])) {
					return false;
				}
			}
		}
		return true;
	}
}

function valueAt(m, row, col) {
	return m[row][col];
}

module.exports = {
	Matrix22,
	Matrix33,
	Matrix44,
	equal,
	valueAt,
};
