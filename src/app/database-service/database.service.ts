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

import {
	MainAnnc,
	OtherAnnc,
	Event,
	Officer,
	Medium,
	Competition,
	Goal,
	Newsletter,
	Project,
	Sponsor,
	Level,
	Person,
} from '../models';

@Injectable()
export class DatabaseService {

	constructor(private db: AngularFireDatabase, private fs: AngularFirestore) {
	}

	getMainAnnouncements(): FirebaseListObservable<MainAnnc[]> {
		return this.db.list('/Announcements/Main');
	}

	getOtherAnnouncements(): FirebaseListObservable<OtherAnnc[]> {
		return this.db.list('/Announcements/Others');
	}


	getOfficerBoard(): FirebaseListObservable<Officer[]> {
		return this.db.list('/Contact/Officer Board');;
	}

	getSocialMedia(): FirebaseListObservable<Medium[]> {
		return this.db.list('/Contact/Social Media');
	}


	// getCompetitions(): FirebaseListObservable<Competition[]> {
	// 	return this.db.list('/Competitions');
	// }
	//
	// getCompetition(year: string): FirebaseObjectObservable<Competition> {
	// 	return this.db.object('/Competitions/' + year);
	// }
	//
	// getCompetitionGame(year: string): FirebaseObjectObservable<any[]> {
	// 	return this.db.object('/Competitions/' + year + '/Game');
	// }
	//
	// getCompetitionRobot(year: string): FirebaseObjectObservable<any[]> {
	// 	return this.db.object('/Competitions/' + year + '/Robot');
	// }
	//
	// getCompetitionFacts(year: string): FirebaseListObservable<any[]> {
	// 	return this.db.list('/Competitions/' + year + '/Robot/Facts');
	// }
	//
	// getCompetitionAbilities(year: string): FirebaseListObservable<any[]> {
	// 	return this.db.list('/Competitions/' + year + '/Robot/Abilities');
	// }
	//
	// getCompetitionRegionals(year: string): FirebaseListObservable<any[]> {
	// 	return this.db.list('/Competitions/' + year + '/Robot/Regionals');
	// }

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

	getSponsorships(): FirebaseListObservable<Level[]> {
		return this.db.list('/Sponsorships/Sponsorship Levels/');
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


	getSnapshot(collection) {
		return collection.snapshotChanges().map((actions) => {
			return actions.map((action) => {
				const data = action.payload.doc.data();
				const id: string = action.payload.doc.id;
				return { id, ...data };
			});
		});
	}

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
