import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database-deprecated';

import { AuthService } from '../auth-service/auth.service';
import { DatabaseService } from '../database-service/database.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

	SocialMedia: FirebaseListObservable<any[]>;
	OfficerBoard: FirebaseListObservable<any[]>;

	year: number;

	newMedia: {
		Name: string;
		URL: string;
		Text: string;
	};

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.SocialMedia = this.db.getSocialMedia();
		this.OfficerBoard = this.db.getOfficerBoard();

		this.year = new Date().getFullYear();

		this.resetNewMedia();
	}


	addMedia() {
		if(this.newMedia.Name !== '' && this.newMedia.Text !== '' && this.newMedia.URL !== '') {
			this.SocialMedia.update(this.newMedia.Name, {
				Text: this.newMedia.Text,
				URL: this.newMedia.URL
			});
		}
	}

	saveMedia(Media: any) {
		this.SocialMedia.update(Media.$key, Media);
	}

	removeMedia(key: any) {
		key?
			this.SocialMedia.remove(key):
			console.log('Media key is null.');
	}

	saveOfficer(Officer: any) {
		this.OfficerBoard.update(Officer.$key, Officer);
	}

	resetNewMedia() {
		this.newMedia = {
			Name: '',
			Text: '',
			URL: ''
		}
	}

}
