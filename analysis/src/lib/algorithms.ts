export function sortSeasons(seasons: string[]): string[] {
	const arr = seasons;
	let an: string;
	let bn: string;
	arr.sort((a, b) => {
		an = a.slice(1, 3);
		bn = b.slice(1, 3);
		if(an > bn) return 1;
		if(an < bn) return -1;
		return 0;
	});
	return arr;
}

export function cumulativeToDistr(array: number[]): number[] {
	const result = [array[0]];
	for(let i = array.length - 1; i > 0; i--) result[i] = array[i] - array[i-1];
	return result;
}

export function clamp(value: number, min: number, max: number): number {
	return value > max ? max : value < min ? min : value; 
}