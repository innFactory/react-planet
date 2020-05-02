export function scale(size?: number, min?: number, max?: number) {
	const w = window.innerWidth;
	const h = window.innerHeight;
	const zw = w / 1200;
	const zh = h / 900;

	const scaleFactor = zw <= zh ? zw : zh;

	if (!size) {
		return scaleFactor;
	}

	const s = size * scaleFactor;

	if (min && min > s) {
		return min;
	}
	if (max && max < s) {
		return max;
	}

	return s;
}
