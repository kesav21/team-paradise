import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database-deprecated';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';

import { ReversePipe } from '../../reverse-pipe/reverse.pipe';

import { History } from '../../models'

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

	History: FirebaseListObservable<History[]>;

	newEvent: History;

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.History = this.db.getHistory();
		this.resetNewEvent();
	}

	save(Event: any): void {
		this.History.update(Event.$key, Event);
	}

	add(): void {
		this.History.push(this.newEvent);
		this.resetNewEvent()
	}

	remove(key: string): void {
		key?
			this.History.remove(key):
			console.log('Event key is null.');
	}

	resetNewEvent(): void {
		this.newEvent = {
			Achievements: '',
			Game: '',
			GameURL: '',
			Robot: '',
			Year: ''
		};
	}

}
