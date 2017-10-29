import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { DatabaseService } from '../database-service/database.service';
import { AuthService } from '../auth-service/auth.service';

import { Medium, MediumID, Officer, OfficerID } from '../models';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

	Media: AngularFirestoreCollection<Medium>;
	Media$: Observable<MediumID[]>;

	Board: AngularFirestoreCollection<Officer>;
	Board$: Observable<OfficerID[]>;

	year: string;

	newMedia: Medium;

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.Media = this.db.getSocialMedia();
		this.Media$ = this.db.getSnapshot(this.Media);

		this.Board = this.db.getOfficerBoard();
		this.Board$ = this.db.getSnapshot(this.Board);

		this.year = this.db.getSchoolYear();

		this.resetNewMedia();
	}

	addMedia() {
		if(this.newMedia.Name !== '' && this.newMedia.Text !== '' && this.newMedia.URL !== '') {
			this.Media.add(this.newMedia);
			this.resetNewMedia();
		}
	}

	saveMedia(Medium: MediumID) {
		const k = this.Media.doc(Medium.id)
		delete Medium.id;
		k.update(Medium);
	}

	removeMedia(id: string) {
		this.Media.doc(id).delete();
	}

	saveOfficer(Officer: OfficerID) {
		const k = this.Board.doc(Officer.id)
		delete Officer.id;
		k.update(Officer);
	}

	resetNewMedia() {
		this.newMedia = {
			Name: '',
			Text: '',
			URL: ''
		}
	}

}
