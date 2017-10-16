import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';

import { Competition, CompetitionID } from '../../models';

@Component({
	selector: 'app-competition-list',
	templateUrl: './competition-list.component.html',
	styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {

	CompetitionsCollection: AngularFirestoreCollection<Competition>;
	Competitions: Observable<CompetitionID[]>;

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.CompetitionsCollection = this.db.getCompetitions();
		this.Competitions = this.db.getSnapshot(this.CompetitionsCollection);
	}

	removeCompetition(id: string) {
		this.CompetitionsCollection.doc(id).delete();
	}

}
