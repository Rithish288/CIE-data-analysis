export function sortSeasons(seasons: string[]): void {
	let an: string;
	let bn: string;
	seasons.sort((a, b) => {
		an = a.slice(1, 3);
		bn = b.slice(1, 3);
		if(an > bn) return 1;
		if(an < bn) return -1;
		return 0;
	})
}

export function cumulativeToDistr(array: number[]): number[] {
	for(let i = array.length - 1; i > 0; i--) array[i] -= array[i-1];
	return array;
}