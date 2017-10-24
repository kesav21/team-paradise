import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { DatabaseService } from '../../../database-service/database.service';
import { AuthService } from '../../../auth-service/auth.service';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Folder, Image, FolderID, ImageID } from '../../../models';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

	FolderCollection: AngularFirestoreCollection<Image>;
	Folder: Observable<ImageID[]>;

	folder: string;

	// images: string[] = [
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBYi0zNzczMTNzSE0&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBRWFjSkhIaXN3WWc&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBczRCd3g3bzJBZnM&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBdTk5eHBjYmtNSDA&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBdFc1UTk1X2J0Yk0&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBQkhzcE54NlU4ZnM&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBNzJsQXJNMnVuM0U&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBeFRSSXhpQ1dsRFU&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBRmFmSEJvYW45VXc&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBOHNGWFNncER0MDQ&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBeXRzYnk2ZXJMTGs&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBZXR2TFFWWE5aUjg&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBRnEyZkRkUkRSbjA&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBdVF5NDFLR3FGM1U&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBcndXcm1qWTRkbmc&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBUWI1WGwtTExQSTQ&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBRnM1ZWRBMzhNUUk&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBQU9vOXRQakpWZ28&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBOEFCVExmci0yXzA&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBMEthNDJFLVVVMUE&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBNnphSTdKeUZLQXM&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBNVEtc2Rib2dlYzQ&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBcXR4SDBpLW1Wa2M&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBUi0xei1xdkl3cE0&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBQ0kzcVp1QkhsMmc&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBQXV4Qjl2TUdZTEk&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBblFvSVMza1FUdm8&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBS2F5RVdiWWF5S28&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBRWNLZjZidGQ3Q3M&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBN1YydFpLcnFPY1k&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBTXlOUmdpTU5DQTg&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBZllDZjZ5cFdoUUk&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBT2QzejhfYk1rT1E&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBdGJoZDVRSzdCWEE&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBbjBYaXRLQ0Q0SlU&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBYjBuSHFBYmZ0T0k&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBeVJMdjg0WTEzX28&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBeHpxdm5GRzhaUFE&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBeEc4ZlJFM1U2T0k&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBTlJOUC16ZzlXRVE&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBUTNQWE85bGM1Sjg&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBSWFQNFRnZ0cyUFk&export=view',
	// 	'https://drive.google.com/uc?id=0B67XEk2kI6cBN0tfUXhjMTcyUjA&export=view'
	// ];

	constructor(
		public auth: AuthService,
		private db: DatabaseService,
		private route: ActivatedRoute,
		private location: Location) { }

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.FolderCollection = this.db.getFolder(params.year, this.stringToName(params.folder));
			this.Folder = this.db.getSnapshot(this.FolderCollection);

			this.folder = this.stringToName(params.folder);

			// this.images.forEach((url: string) => {
			// 	this.FolderCollection.add({
			// 		URL: url,
			// 		Timestamp: new Date()
			// 	});
			// });
		})
	}

	stringToName(folder: string): string {
		return folder.split('-').join(' ');
	}

}
