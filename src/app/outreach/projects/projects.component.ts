import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database-deprecated';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';

import { Project } from '../../models';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

	Projects: FirebaseListObservable<Project[]>;

	newYear: Project;

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
		this.Projects = this.db.getProjects();

		this.resetNewYear();
		this.colors = this.shuffleColors(this.colors);

		this.year = new Date().getFullYear();
	}

	save(Project: any): void {
		this.Projects.update(Project.$key, Project);
	}

	add(): void {
		this.Projects.update(this.newYear.Term, this.newYear.Projects);
		this.resetNewYear();
	}

	remove(key: string): void {
		key?
			this.Projects.remove(key):
			console.log('Project key is null.');
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

	addProject(Projects: any[], Project: any): void {
		Projects.splice(Projects.indexOf(Project) + 1, 0, {
			Text: '',
			SubProjects: [{
				Text: ''
			}]
		});
	}

	removeProject(Projects: any[], Project: any): void {
		Projects.splice(Projects.indexOf(Project), 1);
	}

	addSubProject(SubProjects: any[], SubProject: any): void {
		SubProjects.splice(SubProjects.indexOf(SubProject) + 1, 0, {
			Text: ''
		});
	}

	removeSubProject(SubProjects: any[], SubProject: any): void {
		SubProjects.splice(SubProjects.indexOf(SubProject), 1);
	}

	resetNewYear() {
		this.newYear = {
			Term: '',
			Projects: [{
				Text: '',
				SubProjects: [{
					Text: ''
				}]
			}]
		};
	}

}
