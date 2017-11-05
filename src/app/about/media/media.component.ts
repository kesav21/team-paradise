import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { DatabaseService } from '../../database-service/database.service';
import { AuthService } from '../../auth-service/auth.service';

import { Folder, Image, FolderID, ImageID } from '../../models';

@Component({
	selector: 'app-media',
	templateUrl: './media.component.html',
	styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

	Media: AngularFirestoreCollection<Folder>;
	Media$: Observable<FolderID[]>;

	newFolder: Folder;
	newCollection: string;

	constructor(private db: DatabaseService, public auth: AuthService) { }

	ngOnInit() {
		this.Media = this.db.getMedia();
		this.Media$ = this.db.getSnapshot(this.Media);

		this.newFolder = {
			Year: '',
			Game: '',
			Collections: ['']
		}
	}

	removeFolder(id: string) {
		this.Media.doc(id).delete();
	}

	addCollection(Folder: FolderID, collection: string) {
		this.Media.doc(Folder.id).collection(collection).add({
			URL: 'https://drive.google.com/uc?id=0B67XEk2kI6cBdTk5eHBjYmtNSDA&export=view',
			Timestamp: new Date()
		}).then(() => {
			Folder.Collections.push(collection);

			const k = this.Media.doc(Folder.id);
			delete Folder.id;
			k.update(Folder);
		});
	}

	saveFolder(Folder: FolderID) {
		const id = Folder.id;
		delete Folder.id;
		this.Media.doc(id).update(Folder);
	}

	addFolder() {
		const doc = this.Media.doc(this.newFolder.Year);
		doc.set(this.newFolder)
		this.newFolder.Collections.forEach((collection: string) => {
			doc.collection(collection).add({
				URL: 'https://drive.google.com/uc?id=0B67XEk2kI6cBdTk5eHBjYmtNSDA&export=view',
				Timestamp: new Date()
			});
		});
	}

	addNewCollection(Collection: string): void {
		this.newFolder.Collections.splice(this.newFolder.Collections.indexOf(Collection) + 1, 0, '');
	}

	removeNewCollection(Collection: string): void {
		this.newFolder.Collections.splice(this.newFolder.Collections.indexOf(Collection), 1);
	}

	track(index: number, item: any): number {
		return index;
	}

	toRoute(folder: string): string {
		return folder.split(' ').join('-');
	}

}
