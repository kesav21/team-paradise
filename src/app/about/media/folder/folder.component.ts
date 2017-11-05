import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { DatabaseService } from '../../../database-service/database.service';
import { AuthService } from '../../../auth-service/auth.service';

import { ActivatedRoute, Params } from '@angular/router';

import { Folder, Image, FolderID, ImageID } from '../../../models';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

	Folder: AngularFirestoreCollection<Image>;
	Folder$: Observable<ImageID[]>;

	year: string;
	folder: string;

	newImage: string = '';
	newImages: string = '';

	constructor(public auth: AuthService, private db: DatabaseService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.Folder = this.db.getFolder(params.id, this.toName(params.folder));
			this.Folder$ = this.db.getSnapshot(this.Folder);

			this.year = params.id;
			this.folder = this.toName(params.folder);
		});
	}

	// getID(Image: ImageID): string {
	// 	const k = Image.id;
	// 	delete Image.id;
	// 	return k;
	// }

	saveImage(Image: ImageID) {
		const id = Image.id;
		delete Image.id;
		this.Folder.doc(id).update(Image);
	}

	removeImage(Image: ImageID) {
		this.Folder.doc(Image.id).delete();
	}

	addImage() {
		this.Folder.add({
			URL: this.newImage,
			Timestamp: new Date()
		});
		this.newImage = '';
	}

	addImages() {
		let images = this.newImages.split('\n');
		images.forEach((image: string) => {
			// image = image.split(' ')[1].replace('download', 'view');
			this.Folder.add({
				URL: image,
				Timestamp: new Date()
			});
		});
		this.newImages = '';
	}

	toName(folder: string): string {
		return folder.split('-').join(' ');
	}

}
