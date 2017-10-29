import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';

import { ReversePipe } from '../../reverse-pipe/reverse.pipe';

import { Event, EventID, EventObj } from '../../models';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

	History: AngularFirestoreCollection<Event>;
	History$: Observable<EventID[]>;

	newEvent: EventObj;

	constructor(public auth: AuthService, private db: DatabaseService) {}

	ngOnInit() {
		this.History = this.db.getHistory();
		this.History$ = this.db.getSnapshot(this.History);
		this.newEvent = new EventObj();
	}

	add(): void {
		this.History.add(this.newEvent.getObj());
		this.newEvent.reset();
	}

	save(Event: EventID): void {
		const event = new EventObj(Event);
		this.History.doc(event.id).update(event.getObj());
	}

	remove(id: string): void {
		this.History.doc(id).delete();
	}

}
