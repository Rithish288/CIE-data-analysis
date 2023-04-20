import { Subject, BehaviorSubject, Subscription } from "rxjs";

export const subjects = ["Accounting","Afrikaans","Arabic","Art and Design","Biology","Business","Chemistry","Chinese","Classical Studies","Computer Science","Design and Technology","Digital Media and Design","Divinity","Drama","Economics","English Language","Food Studies","French","Further Mathematics","Geography","Global Perspectives & Research","Hindi","Hinduism","History","Information Technology","Islamic Studies","Law","Literature in English","Marine Science","Mathematics","Media Studies","Music","Physical Education","Physics","Portuguese","Psychology","Sociology","Spanish","Tamil","Thinking Skills","Travel and Tourism","Urdu"]
export const cacheObject = subjects.reduce((o, key) => ({ ...o, [key]: {}}), {})
export const subjectSeasons$ = new BehaviorSubject<Array<string>>([]);
export const subscriptions$ = new Subscription();
export const seasonSelection$ = new Subject<Array<string>>();
export const currentSubject$ = new BehaviorSubject<string>(subjects[0]);

