export function prettifySeconds(seconds) {
	if (seconds !== 0 && !seconds) {
		return "";
	}
	const d = Math.floor(seconds / (3600 * 24));
	const h = Math.floor((seconds % (3600 * 24)) / 3600);
	const m = Math.floor((seconds % 3600) / 60);
	const s = Math.floor((seconds - 24 * 3600 * d - h * 3600 - m * 60));
	const dDisplay = d > 0 ? (d >= 10 ? d : "0" + d) : "00";
	const hDisplay = h > 0 ? (h >= 10 ? h : "0" + h) : "00";
	const mDisplay = m > 0 ? (m >= 10 ? m : "0" + m) : "00";
	const sDisplay = s > 0 ? (s >= 10 ? s : "0" + s) : "00";
	let result = { day: dDisplay, hour: hDisplay, minutes: mDisplay, seconds: sDisplay };
	if (seconds <= 0) {
		return { day: 0, hour: 0, minutes: 0, seconds: 0 };
	}
	return result;
}