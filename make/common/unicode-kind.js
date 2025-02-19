"use strict";

exports.isIdeograph = function (c) {
	return (
		(c >= 0x2e80 && c <= 0x2fff) || // CJK radicals
		(c >= 0x3192 && c <= 0x319f) || // Ideographic annotation
		(c >= 0x31c0 && c <= 0x31ef) || // CJK strokes
		(c >= 0x3400 && c <= 0x4dbf) || // ExtA
		(c >= 0x4e00 && c <= 0x9fff) || // URO
		(c >= 0xf900 && c <= 0xfa6f) || // CJK compatibility ideographs
		(c >= 0x20000 && c <= 0x3ffff) /// SIP, TIP
	);
};

exports.isWestern = c => (c < 0x2000 && c != 0x00a9) || (c >= 0x2070 && c <= 0x218f);

exports.isKorean = c =>
	(c >= 0x1100 && c <= 0x11ff) ||
	(c >= 0x3130 && c <= 0x318f) ||
	(c >= 0x3200 && c <= 0x321e) ||
	(c >= 0x3260 && c <= 0x327f) ||
	(c >= 0xa960 && c <= 0xa97f) ||
	(c >= 0xac00 && c <= 0xd7af) ||
	(c >= 0xd7b0 && c <= 0xd7ff) ||
	(c >= 0xffa1 && c <= 0xffdc);

exports.isWesternSymbol = function (c) {
	return (
		(c >= 0x2000 && c <= 0x200f) || (c >= 0x20a0 && c < 0x2e3a) || (c > 0x2e3b && c <= 0x3000)
	);
};

exports.isLongDash = function (c, isTerm) {
	return isTerm ? c === 0x2e3a || c === 0x2e3b : false;
};

exports.filterUnicodeRange = function (a, fn) {
	for (let c in a.cmap) {
		if (!fn(c - 0)) a.cmap[c] = null;
	}
	if (a.cmap_uvs) {
		for (const c in a.cmap_uvs) {
			const [su, ss] = c.split(" ");
			if (!fn(su - 0)) a.cmap_uvs[c] = null;
		}
	}
};
