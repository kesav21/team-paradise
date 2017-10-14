import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database-deprecated';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';

import { Newsletter } from '../../models';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.css']
})
export class NewslettersComponent implements OnInit {

	Newsletters: FirebaseListObservable<Newsletter[]>;

	newNewsletter: Newsletter;

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.Newsletters = this.db.getNewsletters();

		this.resetNewNewsletter();
	}

	save(Newsletter: any): void {
		this.Newsletters.update(Newsletter.$key, Newsletter);
	}

	addNewsletter(): void {
		this.Newsletters.update(this.newNewsletter.Date, {
			Text: this.newNewsletter.Text,
			URL: this.newNewsletter.URL
		});
	}

	remove(key: string): void {
		key?
			this.Newsletters.remove(key):
			console.log('Newsletter key is null.');
	}

	resetNewNewsletter() {
		this.newNewsletter = {
			Date: '',
			URL: '',
			Text: ''
		};
	}

}
