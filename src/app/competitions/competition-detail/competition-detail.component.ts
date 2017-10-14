import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';


import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Competition, Ability, Fact, Regional, CompetitionID, AbilityID, FactID, RegionalID } from '../../models';

@Component({
	selector: 'app-competition-detail',
	templateUrl: './competition-detail.component.html',
	styleUrls: ['./competition-detail.component.css']
})
export class CompetitionDetailComponent implements OnInit {

	newCompetition: Competition;

	CompetitionDoc: AngularFirestoreDocument<Competition>;
	CompetitionVar: Observable<CompetitionID>;

	AbilitiesCollection: AngularFirestoreCollection<Ability>;
	Abilities: Observable<AbilityID>;

	FactsCollection: AngularFirestoreCollection<Fact>;
	Facts: Observable<FactID>;

	RegionalsCollection: AngularFirestoreCollection<Regional>;
	Regionals: Observable<RegionalID>;

	new: boolean;

	constructor(
		public auth: AuthService,
		private db: DatabaseService,
		private route: ActivatedRoute,
		private location: Location,
		private sanitizer: DomSanitizer
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			if(params['year'] === 'new') {
				this.new = true;
				this.resetNewCompetition();
			} else {
				this.new = false;

				this.CompetitionDoc = this.db.getCompetition(params['year']);

				this.AbilitiesCollection = this.CompetitionDoc.collection('Abilities');
				this.FactsCollection = this.CompetitionDoc.collection('Facts');
				this.RegionalsCollection = this.CompetitionDoc.collection('Regionals');

				this.CompetitionVar = this.CompetitionDoc.valueChanges();

				this.Abilities = this.db.getSnapshot(this.AbilitiesCollection);
				this.Facts = this.db.getSnapshot(this.FactsCollection);
				this.Regionals = this.db.getSnapshot(this.RegionalsCollection);

			}
		});
	}

	removeCompetition() {
		this.CompetitionDoc.delete();
	}

	saveCompetition(gameName: string, gameReveal: string, gameDescription: string, robotImage: string, robotName: string, robotReport: string, robotReveal: string): void {
		if (gameName &&  gameReveal &&  gameDescription &&  robotImage &&  robotName &&  robotReport &&  robotReveal) {
			this.CompetitionDoc.update({
				Game: {
					Name: gameName,
					Description: gameDescription,
					Reveal: gameReveal
				},
				Robot: {
					Image: robotImage,
					Name: robotName,
					Report: robotReport,
					Reveal: robotReveal
				},
			});
		}
	}

	addFact(key: string, value: string): void {
		this.FactsCollection.add({
			Key: key,
			Value: value
		})
		key = '';
		value = '';
	}

	saveFact(Fact: FactID) {
		const doc = this.FactsCollection.doc(Fact.id);
		delete Fact.id;
		doc.update(Fact);
	}

	removeFact(key: string): void {
		this.FactsCollection.doc(key).delete();
	}

	addAbility(ability: string): void {
		this.AbilitiesCollection.add({
			Name: ability
		})
	}

	saveAbility(Ability: AbilityID) {
		const doc = this.AbilitiesCollection.doc(Ability.id);
		delete Ability.id;
		console.log(Ability);
		doc.update(Ability);
	}

	removeAbility(key: string): void {
		this.AbilitiesCollection.doc(key).delete();
	}

	addRegional(key: string, value: string): void {
		this.RegionalsCollection.add({
			Location: key,
			Awards: value
		})
	}

	saveRegional(Regional: RegionalID) {
		const doc = this.RegionalsCollection.doc(Regional.id);
		delete Regional.id;
		doc.update(Regional);
	}

	removeRegional(key: string): void {
		this.RegionalsCollection.doc(key).delete();
	}

	resetNewCompetition() {
		this.newCompetition = {
			Game: {
				Description: '',
				Name: '',
				Reveal: '',
			},
			Robot: {
				Image: '',
				Name: '',
				Report: '',
				Reveal: '',
			}
		};
	}
}
