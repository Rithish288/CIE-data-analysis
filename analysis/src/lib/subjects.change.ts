import { Subject } from "rxjs";

const subjects = ["Accounting","Afrikaans","Arabic","Art and Design","Biology","Business","Chemistry","Chinese","Classical Studies","Computer Science","Design and Technology","Digital Media and Design","Divinity","Drama","Economics","English Language","Food Studies","French","Further Mathematics","Geography","Global Perspectives & Research","Hindi","Hinduism","History","Information Technology","Islamic Studies","Law","Literature in English","Marine Science","Mathematics","Media Studies","Music","Physical Education","Physics","Portuguese","Psychology","Sociology","Spanish","Tamil","Thinking Skills","Travel and Tourism","Urdu"]
let seasons: string[] = [];
let i = 20;
const year = (new Date()).getFullYear() - 2000 - 1;
for(i = 15; i <= 19; i++) seasons.push("s" + i, "w" + i);
for(i = 20; i <= year; i++) seasons.push("m" + i, "s" + i, "w" + i);

export const seasonSelection$ = new Subject<Array<string>>();
export const currentSubject$ = new Subject<string>();
export const currentSeason$ = new Subject<string>();

export {seasons, subjects};