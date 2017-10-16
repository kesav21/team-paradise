import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';

import { Newsletter, NewsletterID, NewsletterObj } from '../../models';

@Component({
  selector: 'app-newsletters',
  templateUrl: './newsletters.component.html',
  styleUrls: ['./newsletters.component.css']
})
export class NewslettersComponent implements OnInit {

	Newsletters: AngularFirestoreCollection<Newsletter>;
	Newsletters$: Observable<NewsletterID[]>;

	newNewsletter: NewsletterObj;

	constructor(public auth: AuthService, private db: DatabaseService) {}

	ngOnInit() {
		this.Newsletters = this.db.getNewslettersCol();
		this.Newsletters$ = this.db.getSnapshot(this.Newsletters);
		this.newNewsletter = new NewsletterObj();
	}

	add(): void {
		this.Newsletters.add(this.newNewsletter.getObj());
		this.newNewsletter.reset();
	}

	save(Newsletter: NewsletterID): void {
		const newsletter = new NewsletterObj(Newsletter);
		this.Newsletters.doc(newsletter.id).update(newsletter.getObj());
	}

	remove(id: string): void {
		this.Newsletters.doc(id).delete();
	}

}
