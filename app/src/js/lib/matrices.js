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

function valueAt(m, row, col) {
	return m[row][col];
}

module.exports = {
	Matrix22,
	Matrix33,
	Matrix44,
	valueAt,
};
