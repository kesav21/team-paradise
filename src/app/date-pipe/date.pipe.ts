import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'date'
})
export class DatePipe implements PipeTransform {

	transform(date: string): string {
		if(date) {
			let values: string[] = date.split(' ');

			let year: string = values[0];
			let month: string = this.convertMonth(parseInt(values[1]));
			let day: number = parseInt(values[2]);

			return month + ' ' + day + ', ' + year;
		}
	}


	convertMonth(month: number): string {
		switch(month) {
			case 1: return 'January';
			case 2: return 'February';
			case 3: return 'March';
			case 4: return 'April';
			case 5: return 'May';
			case 6: return 'June';
			case 7: return 'July';
			case 8: return 'August';
			case 9: return 'September';
			case 10: return 'October';
			case 11: return 'November';
			case 12: return 'December';
			default: return;
		}
	}

}
