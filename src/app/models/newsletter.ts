
export class NewsletterObj implements Newsletter {
	URL: string;
	Text: string;
	Timestamp: string;

	id: string;

	constructor(Newsletter?: NewsletterID) {
		if(Newsletter) {
			this.URL = Newsletter.URL;
			this.Text = Newsletter.Text;
			this.Timestamp = Newsletter.Timestamp;

			if(Newsletter.id) {
				this.id = Newsletter.id;
			}
		} else {
			this.URL = '';
			this.Text = '';
			this.Timestamp = '';
		}
	}

	reset(): void {
		this.URL = '';
		this.Text = '';
		this.Timestamp = '';
	}

	isNull(): boolean {
		return this.URL == null || this.Text == null || this.Timestamp == null;
	}

	getObj(): Newsletter {
		return {
			URL: this.URL,
			Text: this.Text,
			Timestamp: this.Timestamp
		};
	}
}

export interface Newsletter {
	URL: string;
	Text: string;
	Timestamp: string;
}

export interface NewsletterID extends Newsletter {
	id: string;
}
