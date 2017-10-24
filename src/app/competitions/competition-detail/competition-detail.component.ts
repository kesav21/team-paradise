import { Component, OnInit } from '@angular/core';

import { AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import {
	Competition, CompetitionID, CompetitionObj,
	Ability, AbilityID, AbilityObj,
	Fact, FactID, FactObj,
	Regional, RegionalID, RegionalObj
} from '../../models';

@Component({
	selector: 'app-competition-detail',
	templateUrl: './competition-detail.component.html',
	styleUrls: ['./competition-detail.component.css']
})
export class CompetitionDetailComponent implements OnInit {

	new: boolean;

	newCompetition: CompetitionObj;

	newFacts: FactObj[] = [];
	newAbilities: AbilityObj[] = [];
	newRegionals: RegionalObj[] = [];


	CompetitionDoc: AngularFirestoreDocument<Competition>;
	CompetitionVar: Observable<CompetitionID>;

	AbilitiesCollection: AngularFirestoreCollection<Ability>;
	Abilities: Observable<AbilityID>;

	FactsCollection: AngularFirestoreCollection<Fact>;
	Facts: Observable<FactID>;

	RegionalsCollection: AngularFirestoreCollection<Regional>;
	Regionals: Observable<RegionalID>;

	newFact: FactObj;
	newAbility: AbilityObj;
	newRegional: RegionalObj;

	constructor(
		public auth: AuthService,
		private db: DatabaseService,
		private route: ActivatedRoute,
		private location: Location) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			if(params['year'] === 'new') {
				this.new = true;

				this.newCompetition = new CompetitionObj();

				this.newFacts.push(new FactObj('', ''));
				this.newAbilities.push(new AbilityObj(''));
				this.newRegionals.push(new RegionalObj('', ''));

			} else {
				this.new = false;

				this.CompetitionDoc = this.db.getCompetition(params['year']);

				this.AbilitiesCollection = this.CompetitionDoc.collection('Abilities', (ref) => ref.orderBy('Timestamp'));
				this.FactsCollection = this.CompetitionDoc.collection('Facts', (ref) => ref.orderBy('Timestamp'));
				this.RegionalsCollection = this.CompetitionDoc.collection('Regionals', (ref) => ref.orderBy('Timestamp'));

				this.CompetitionVar = this.CompetitionDoc.valueChanges();

				this.Abilities = this.db.getSnapshot(this.AbilitiesCollection);
				this.Facts = this.db.getSnapshot(this.FactsCollection);
				this.Regionals = this.db.getSnapshot(this.RegionalsCollection);

				this.newFact = new FactObj('', '', null);
				this.newAbility = new AbilityObj('', null);
				this.newRegional = new RegionalObj('', '', null);

			}
		});
	}

	removeCompetition() {
		this.CompetitionDoc.delete();
	}

	saveCompetition(year: number, gameName: string, gameReveal: string, gameDescription: string, robotImage: string, robotName: string, robotReport: string, robotReveal: string): void {
		let competition = new CompetitionObj(year, gameName, gameReveal, gameDescription, robotImage, robotName, robotReport, robotReveal);

		if(competition.isNull()) {
			console.error('One of the Game of Robot properties is null.')
		} else {
			this.CompetitionDoc.update(competition.getObj());
		}
	}

	addFact(): void {
		this.newFact.updateTime();
		this.FactsCollection.add(this.newFact.getObj());
		this.newFact = new FactObj('', '', null);
	}

	saveFact(Fact: FactID) {
		const doc = this.FactsCollection.doc(Fact.id);
		delete Fact.id;
		doc.update(Fact);
	}

	// saveFact(FactID: FactID) {
	// 	this.FactsCollection.doc(FactID.id).update(FactID.getObj());
	// }

	removeFact(key: string): void {
		this.FactsCollection.doc(key).delete();
	}

	addAbility(): void {
		this.newAbility.updateTime();
		this.AbilitiesCollection.add(this.newAbility.getObj());
		this.newAbility = new AbilityObj('', null);
	}

	saveAbility(Ability: AbilityID) {
		const doc = this.AbilitiesCollection.doc(Ability.id);
		delete Ability.id;
		doc.update(Ability);
	}

	removeAbility(key: string): void {
		this.AbilitiesCollection.doc(key).delete();
	}

	addRegional(): void {
		this.newRegional.updateTime();
		this.RegionalsCollection.add(this.newRegional.getObj());
		this.newRegional = new RegionalObj('', '', null);
	}

	saveRegional(Regional: RegionalID) {
		const doc = this.RegionalsCollection.doc(Regional.id);
		delete Regional.id;
		doc.update(Regional);
	}

	removeRegional(key: string): void {
		this.RegionalsCollection.doc(key).delete();
	}

	addCompetition() {
		this.db.getCompetitions().add(this.newCompetition.getObj()).then((doc) => {
			let abilities = doc.collection('Abilities');
			let facts = doc.collection('Facts');
			let regionals = doc.collection('Regionals');

			this.newAbilities.forEach((Ability: AbilityObj) => abilities.add(Ability.getObj()));
			this.newFacts.forEach((Fact: FactObj) => facts.add(Fact.getObj()));
			this.newRegionals.forEach((Regional: RegionalObj) => regionals.add(Regional.getObj()));
		});

	}

	addNewFact(newFact: FactObj) {
		this.newFacts.splice(this.newFacts.indexOf(newFact) + 1, 0, new FactObj('', ''));
	}

	removeNewFact(newFact: FactObj) {
		this.newFacts.splice(this.newFacts.indexOf(newFact), 1);
	}

	addNewAbility(newAbility: AbilityObj) {
		this.newAbilities.splice(this.newAbilities.indexOf(newAbility) + 1, 0, new AbilityObj(''));
	}

	removeNewAbility(newAbility: AbilityObj) {
		this.newAbilities.splice(this.newAbilities.indexOf(newAbility), 1);
	}

	addNewRegional(newRegional: RegionalObj) {
		this.newRegionals.splice(this.newRegionals.indexOf(newRegional) + 1, 0, new RegionalObj('', ''));
	}

	removeNewRegional(newRegional: RegionalObj) {
		this.newRegionals.splice(this.newRegionals.indexOf(newRegional), 1);
	}
}
