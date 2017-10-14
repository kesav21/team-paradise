import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'objectToString'
})
export class ObjectToStringPipe implements PipeTransform {

	/*
	* fixes problem with ngModel and AngularFire2 that ngModel cannot bind to an array of strings
	*/
	transform(values: string[]): string[] {
		if(values) {
			return values;
		}
	}

}
