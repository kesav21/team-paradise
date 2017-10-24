
export class MediumObj implements Medium {
	Text: string;
	URL: string;
	Name: string;

	constructor(Text: string = '', URL: string = '', Name: string = '') {
		this.Text = Text;
		this.URL = URL;
		this.Name = Name;
	}

	getObj() {
		return {
			Text: this.Text,
			URL: this.URL,
			Name: this.Name
		}
	}
}

export interface Medium {
	Text: string;
	URL: string;
	Name: string;
}

export interface Officer {
	Email: string;
	Name: string;
	Position: number;
	Title: string;
}

export interface MediumID extends Medium {
	id: string;
}

export interface OfficerID extends Officer {
	id: string;
}
