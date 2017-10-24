export interface Folder {
	Game: string;
	Year: string;
	Collections: string[];
}

export interface Image {
	URL: string;
	Timestamp: Date;
}

export interface FolderID extends Folder {
	id: string;
}

export interface ImageID extends Image {
	id: string;
}
