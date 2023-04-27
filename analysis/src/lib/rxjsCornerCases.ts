import { distinctUntilChanged } from "rxjs";

function compareArray<T>(first: T[], second: T[], comparator : (a: T, b: T) => boolean): boolean {
	return (first.length === 0 && second.length === 0) || 
		(first.length === second.length && first.every(
			(val, i) => comparator?
				 	comparator(val, second[i]) : JSON.stringify(val) === JSON.stringify(second[i])
				)
			);
}

export function distinctUntilChangedArray<T>(comparator: (prev: T, curr: T) => boolean) {
	return distinctUntilChanged((prev: T[], curr: T[]) => {
		return compareArray(prev, curr, comparator);
	});
}