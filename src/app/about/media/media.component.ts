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

	MediaCollection: AngularFirestoreCollection<Folder>;
	Media: Observable<FolderID[]>;

	collections: string[];

	constructor(private db: DatabaseService, public auth: AuthService) { }

	ngOnInit() {
		this.MediaCollection = this.db.getMedia();
		this.Media = this.db.getSnapshot(this.MediaCollection);

		this.getCollections().then((collections) => this.collections = collections);

	}

	getCollections(): Promise<string[]> {
		return new Promise((resolve, reject) => {
			this.Media.subscribe((Media: Folder[]) => {
				Media.forEach((Folder: Folder) => {
					resolve(Folder.Collections);
				})
			});
		})
	}

	nameToString(folder: string): string {
		return folder.split(' ').join('-');
	}

}
