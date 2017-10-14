import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database-deprecated';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';

import { Goal } from '../../models'

@Component({
	selector: 'app-goals',
	templateUrl: './goals.component.html',
	styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

	Goals: FirebaseListObservable<any[]>;

	newGoal: Goal;

	colors: string[] = [
		'bg-primary',
		'bg-secondary',
		'bg-success',
		'bg-danger',
		'bg-warning',
		'bg-info',
		'bg-dark'
	];

	year: number;

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.Goals = this.db.getGoals();

		this.resetNewGoal();
		this.colors = this.shuffleColors(this.colors);

		this.year = new Date().getFullYear();
	}

	save(Year: any): void {
		this.Goals.update(Year.$key, Year);
	}

	add(): void {
		this.Goals.update(this.newGoal.Term, this.newGoal.Goals);

		this.resetNewGoal();
	}

	remove(key: any): void {
		key? this.Goals.remove(key): console.log('Year key is null.');
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

	addGoal(Goals: any[], Goal: any): void {
		Goals.splice(Goals.indexOf(Goal) + 1, 0, {
			Text: '',
			SubGoals: [{
				Text: ''
			}]
		});
	}

	removeGoal(Goals: any[], Goal: any): void {
		Goals.splice(Goals.indexOf(Goal), 1);
	}

	addSubGoal(SubGoals: any[], SubGoal: any): void {
		SubGoals.splice(SubGoals.indexOf(SubGoal) + 1, 0, {
			Text: ''
		});
	}

	removeSubGoal(SubGoals: any[], SubGoal: any): void {
		SubGoals.splice(SubGoals.indexOf(SubGoal), 1);
	}

	resetNewGoal() {
		this.newGoal = {
			Term: '',
			Goals: [{
				Text: '',
				SubGoals: [{
					Text: ''
				}]
			}]
		};
	}
}
