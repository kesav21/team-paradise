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
	Report,
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

	getMainAnnouncements(): FirebaseListObservable<any[]> {
		return this.db.list('/Announcements/Main');
	}

	getOtherAnnouncements(): FirebaseListObservable<any[]> {
		return this.db.list('/Announcements/Others');
	}


	getOfficerBoard(): FirebaseListObservable<Officer[]> {
		return this.db.list('/Contact/Officer Board');;
	}

	getSocialMedia(): FirebaseListObservable<Medium[]> {
		return this.db.list('/Contact/Social Media');
	}

	getGoals(): FirebaseListObservable<Goal[]> {
		return this.db.list('/Goals 2/');
	}

	getHistory(): FirebaseListObservable<Event[]> {
		return this.db.list('/History/');
	}

	getImages(): FirebaseListObservable<any[]> {
		return this.db.list('/Images 2/');
	}

	getNewsletters(): FirebaseListObservable<Newsletter[]> {
		return this.db.list('/Newsletters 2/');
	}

	getProjects(): FirebaseListObservable<Project[]> {
		return this.db.list('/Projects 2/');
	}


	getSponsors(): FirebaseListObservable<Sponsor[]> {
		return this.db.list('/Sponsorships/Sponsors 2/');
	}

	getSponsorships(): FirebaseListObservable<Tier[]> {
		return this.db.list('/Sponsorships/Sponsorship Tiers/');
	}


	//////////////////////////////// FIRESTORE FUNCTIONS //////////////////////////////////


	getOfficerBoardFirestore(): AngularFirestoreCollection<Officer> {
		return this.fs.collection<Officer>('Officer Board');
	}

	getPeople(): AngularFirestoreCollection<Person> {
		return this.fs.collection<Person>('People')
	}

	getCompetitions(): AngularFirestoreCollection<Competition> {
		return this.fs.collection<Competition>('Competitions');
	}

	getCompetition(year: string): AngularFirestoreDocument<Competition> {
		return this.fs.doc<Competition>('Competitions/' + year);
	}

	getHistoryCol(): AngularFirestoreCollection<Event> {
		return this.fs.collection<Event>('History', (ref) => ref.orderBy('Timestamp'));
	}

	getNewslettersCol(): AngularFirestoreCollection<Newsletter> {
		return this.fs.collection<Newsletter>('Newsletters', (ref) => ref.orderBy('Timestamp'));
	}

	getSponsorsCol(): AngularFirestoreCollection<Sponsor> {
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

	getSocialMediaCol(): AngularFirestoreCollection<Medium> {
		return this.fs.collection<Medium>('Social Media');
	}

	getOfficerBoardCol(): AngularFirestoreCollection<Officer> {
		return this.fs.collection<Officer>('Officer Board', (ref) => ref.orderBy('Position'));
	}

	getAnnouncements(): AngularFirestoreCollection<Announcement> {
		return this.fs.collection<Announcement>('Announcements');
	}

	getReports(): AngularFirestoreCollection<Report> {
		return this.fs.collection<Report>('Reports', (ref) => ref.orderBy('Timestamp'));
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
