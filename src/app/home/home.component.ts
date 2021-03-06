import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { DatabaseService } from '../database-service/database.service';
import { AuthService } from '../auth-service/auth.service';

import { Announcement, AnnouncementID } from '../models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	Announcements: AngularFirestoreCollection<Announcement>;
	Announcements$: Observable<Announcement[]>;

	// Robots: AngularFirestoreCollection<Competition>;
	// Robots$: Observable<Competition[]>;

	robots: Array<{
		name: string;
		url: string;
	}>;

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.Announcements = this.db.getAnnouncements();
		// this.Robots = this.db.getCompetitions();

		this.Announcements$ = this.db.getSnapshot(this.Announcements);
		// this.Robots$ = this.Robots.valueChanges();

		// this.Robots$.subscribe(console.log);

		// this.robots = [{
		// 	name: 'Misfire',
		// 	url: "https://media.team254.com/2017/03/8fcb07ae-misfire-400.jpg",
		// }, {
		// 	name: 'Dropshot',
		// 	url: "https://media.team254.com/2016/03/947007bd-dropshot1.jpg",
		// }, {
		// 	name: 'Deadlift',
		// 	url: "https://media.team254.com/2017/03/8f6907b3-deadlift.jpg",
		// }, {
		// 	name: 'Barrage',
		// 	url: "https://media.team254.com/2016/03/966107e0-barrage.jpg",
		// }, {
		// 	name: 'Overkill',
		// 	url: "https://media.team254.com/web/overkill1.jpg",
		// }, {
		// 	name: 'Skyfire',
		// 	url: "https://media.team254.com/web/skyfire.jpg",
		// }, {
		// 	name: 'Slipstream',
		// 	url: "https://media.team254.com/web/slipstream.jpg",
		// }, {
		// 	name: 'Shockwave',
		// 	url: "https://media.team254.com/web/shockwave1.jpg"
		// }];

	}

	saveAnnouncement(Announcement: AnnouncementID): void {
		const announcement = this.Announcements.doc(Announcement.id);
		delete Announcement.id;
		announcement.update(Announcement);
	}

}
