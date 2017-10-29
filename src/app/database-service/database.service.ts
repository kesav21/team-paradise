import { Injectable } from '@angular/core';

import {
	AngularFireDatabase,
	FirebaseListObservable,
	FirebaseObjectObservable
} from 'angularfire2/database-deprecated';

import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument
} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
	Announcement,
	Event,
	Officer,
	Medium,
	Competition,
	Goal,
	Newsletter,
	Project,
	Sponsor,
	Tier,
	Person,
	Folder,
	Image
} from '../models';

@Injectable()
export class DatabaseService {

	constructor(private db: AngularFireDatabase, private fs: AngularFirestore, private http: HttpClient) {
	}

	//////////////////////////////// REALTIME DATABASE FUNCTIONS //////////////////////////////////

	getGoals(): FirebaseListObservable<Goal[]> {
		return this.db.list('/Goals/');
	}

	getProjects(): FirebaseListObservable<Project[]> {
		return this.db.list('/Projects/');
	}

	//////////////////////////////// FIRESTORE FUNCTIONS //////////////////////////////////

	getPeople(): AngularFirestoreCollection<Person> {
		return this.fs.collection<Person>('People')
	}

	getCompetitions(): AngularFirestoreCollection<Competition> {
		return this.fs.collection<Competition>('Competitions', (ref) => ref.orderBy('Year'));
	}

	getCompetition(year: string): AngularFirestoreDocument<Competition> {
		return this.fs.doc<Competition>('Competitions/' + year);
	}

	getHistory(): AngularFirestoreCollection<Event> {
		return this.fs.collection<Event>('History', (ref) => ref.orderBy('Timestamp'));
	}

	getNewsletters(): AngularFirestoreCollection<Newsletter> {
		return this.fs.collection<Newsletter>('Newsletters', (ref) => ref.orderBy('Timestamp'));
	}

	getSponsors(): AngularFirestoreCollection<Sponsor> {
		return this.fs.collection<Sponsor>('Sponsors');
	}

	getTiers(): AngularFirestoreCollection<Tier> {
		return this.fs.collection<Tier>('Tiers', (ref) => ref.orderBy('Bounds.Upper'));
	}

	getMedia(): AngularFirestoreCollection<Folder> {
		return this.fs.collection<Folder>('Media');
	}

	getFolder(year: string, folder: string): AngularFirestoreCollection<Image> {
		return this.fs.collection<Image>('Media/'+year+'/'+folder);
	}

	getSocialMedia(): AngularFirestoreCollection<Medium> {
		return this.fs.collection<Medium>('Social Media');
	}

	getOfficerBoard(): AngularFirestoreCollection<Officer> {
		return this.fs.collection<Officer>('Officer Board', (ref) => ref.orderBy('Position'));
	}

	getAnnouncements(): AngularFirestoreCollection<Announcement> {
		return this.fs.collection<Announcement>('Announcements');
	}

	getSnapshot(collection) {
		return collection.snapshotChanges().map((actions) => {
			return actions.map((action) => {
				const data = action.payload.doc.data();
				const id: string = action.payload.doc.id;
				return { id, ...data };
			});
		});
	}

	getSchoolYear(): string {
		let date: Date = new Date();

		let year: number = date.getFullYear();
		let month: number = date.getMonth() + 1;

		// if(month >= 9 && month <= 12) {
		// 	return year;
		// } if(month >= 1 && month <= 5) {
		// 	return year - 1;
		// }

		if(month >= 9 && month <= 12) {
			return year + '-' + (year + 1);
		} if(month >= 1 && month <= 5) {
			return (year - 1) + '-' + year;
		}

	}

	// getSnapshot2(collection: AngularFirestoreCollection<any>): Observable<any> {
	// 	return collection.snapshotChanges().map((actions) => {
	// 		return actions.map((action) => {
	// 			const data = action.payload.doc.data();
	// 			const id: string = action.payload.doc.id;
	// 			return { id, ...data };
	// 		});
	// 	});
	// }

	// getSnapshot<T extends Object, M extends T>(collection: AngularFirestoreCollection<T>): Observable<M[]> {
	// 	return collection.snapshotChanges().map((actions) => {
	// 		return actions.map((action) => {
	// 			const data = action.payload.doc.data();
	// 			const id: string = action.payload.doc.id;
	// 			return { id, ...data };
	// 		});
	// 	});
	// }

}
