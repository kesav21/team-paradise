import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { DatabaseService } from '../database-service/database.service';
import { AuthService } from '../auth-service/auth.service';

import { Announcement, AnnouncementID, Report, ReportID } from '../models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	Announcements: AngularFirestoreCollection<Announcement>;
	Announcements$: Observable<Announcement[]>;

	Reports: AngularFirestoreCollection<Report>;
	Reports$: Observable<Report[]>;

	newReport: Report;

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.Announcements = this.db.getAnnouncements();
		this.Reports = this.db.getReports();

		this.Announcements$ = this.db.getSnapshot(this.Announcements);
		this.Reports$ = this.db.getSnapshot(this.Reports);

		this.resetNewAnnouncement();
	}

	saveAnnouncement(Announcement: AnnouncementID): void {
		const k = this.Announcements.doc(Announcement.id);
		delete Announcement.id;
		k.update(Announcement);
	}

	saveReport(Report: ReportID): void {
		const k = this.Reports.doc(Report.id);
		delete Report.id;
		k.update(Report);
	}

	addReport(): void {
		this.newReport.Timestamp = new Date();
		this.Reports.add(this.newReport);
		this.resetNewAnnouncement();
	}

	removeReport(key: string): void {
		this.Reports.doc(key).delete();
	}

	addAnnc(Text: any[], Annc: any): void {
		Text.splice(Text.indexOf(Annc) + 1, 0, {
			Name: ''
		});
	}

	removeAnnc(Text: any[], Annc: any): void {
		Text.splice(Text.indexOf(Annc), 1);
	}

	trackReport(index: number, report: string): number {
		return index;
	}

	resetNewAnnouncement(): void {
		this.newReport = {
			Title: '',
			Text: [{
				Name: ''
			}],
			Timestamp: null
		};
	}

}
