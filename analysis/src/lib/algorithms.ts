type T = number | string | object;

export function isUnique(arr: Array<T>, val: T) {
	for(let i of arr) if(i == val) return false;
	return true;
}