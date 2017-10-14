import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { DatabaseService } from '../../database-service/database.service';
import { AuthService } from '../../auth-service/auth.service';

import { Person, PersonID } from '../../models';

@Component({
	selector: 'app-people',
	templateUrl: './people.component.html',
	styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

	PeopleCollection: AngularFirestoreCollection<Person>;
	People: Observable<PersonID[]>;

	newPerson: Person;

	constructor(private db: DatabaseService, public auth: AuthService) {
	}

	ngOnInit() {
		this.PeopleCollection = this.db.getPeople();
		this.People = this.db.getSnapshot(this.PeopleCollection);

		this.resetNewPerson();
	}

	add() {
		this.PeopleCollection.add(this.newPerson);
		this.resetNewPerson();
	}

	save(Person: PersonID) {
		const person = this.PeopleCollection.doc(Person.id);
		delete Person.id;
		person.update(Person);
	}

	remove(id: string) {
		this.PeopleCollection.doc(id).delete();
	}

	resetNewPerson() {
		this.newPerson = {
			Name: '',
			ImageURL: '',
			Quote: ''
		};
	}

}
