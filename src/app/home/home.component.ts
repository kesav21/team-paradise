import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database-deprecated';

import { AuthService } from '../auth-service/auth.service';
import { DatabaseService } from '../database-service/database.service';

import { MainAnnc, OtherAnnc } from '../models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	Main: FirebaseListObservable<MainAnnc[]>;
	Others: FirebaseListObservable<OtherAnnc[]>;

	newAnnouncement: OtherAnnc;

	colors: string[] = [
		'bg-primary',
		'bg-secondary',
		'bg-success',
		'bg-danger',
		'bg-warning',
		'bg-info',
		'bg-dark'
	];

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.Main = this.db.getMainAnnouncements();
		this.Others = this.db.getOtherAnnouncements();

		this.resetNewAnnouncement();
		this.colors = this.shuffleColors(this.colors);
	}

	saveMain(Announcement: any): void {
		// this.Main.update(Announcement.$key, Announcement);
	}

	saveOther(Announcement: any): void {
		// this.Others.update(Announcement.$key, Announcement);
	}

	addAnnouncement(): void {
		// this.Others.push({
		// 	Title: this.newAnnouncement.Title,
		// 	Text: this.newAnnouncement.Text
		// });
		this.resetNewAnnouncement();
	}

	removeAnnouncement(key): void {
		// key?
		// 	this.Others.remove(key):
		// 	console.log('Announcement key is null.')
	}

	/**
	 * Randomize array element order in-place.
	 * Using Durstenfeld shuffle algorithm.
	 */
	shuffleColors(array: string[]): string[] {
	    for (let i: number = array.length - 1; i > 0; i--) {
	        let j: number = Math.floor(Math.random() * (i + 1));
	        let temp: string = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

	getCardColor(index: number): string {
		return this.colors[index % this.colors.length];
	}

	addAnnc(Text: any[], Annc: any): void {
		Text.splice(Text.indexOf(Annc) + 1, 0, {
			Text: ''
		});
	}

	removeAnnc(Text: any[], Annc: any): void {
		Text.splice(Text.indexOf(Annc), 1);
	}

	resetNewAnnouncement(): void {
		this.newAnnouncement = {
			Title: '',
			Text: [{
				Text: ''
			}, {
				Text: ''
			}]
		};
	}

}
