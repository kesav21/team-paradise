import { Injectable } from '@angular/core';

@Injectable()
export class ColorsService {

	colors: string[] = [
		'bg-primary',
		'bg-secondary',
		'bg-success',
		'bg-danger',
		'bg-warning',
		'bg-info',
		'bg-dark'
	];

	public get getCardColor(): string {
		return this.colors[Math.floor(Math.random() * this.colors.length)];
	}

}
