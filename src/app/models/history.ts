
export class EventObj implements EventID {
	Description: string;
	Game: string;
	GameURL: string;
	Robot: string;
	Timestamp: string;

	id: string;

	constructor(event?: EventID) {
		if(event) {
			this.Description = event.Description;
			this.Game = event.Game;
			this.GameURL = event.GameURL;
			this.Robot = event.Robot;
			this.Timestamp = event.Timestamp;

			if(event.id) {
				this.id = event.id;
			}
		} else {
			this.Description = '';
			this.Game = '';
			this.GameURL = '';
			this.Robot = '';
			this.Timestamp = '';
		}
	}

	reset(): void {
		this.Description = '';
		this.Game = '';
		this.GameURL = '';
		this.Robot = '';
		this.Timestamp = '';
	}

	isNull(): boolean {
		return this.Description == null || this.Game == null || this.GameURL == null || this.Robot == null || this.Timestamp == null;
	}

	getObj(): Event {
		return {
			Description: this.Description,
			Game: this.Game,
			GameURL: this.GameURL,
			Robot: this.Robot,
			Timestamp: this.Timestamp
		};
	}
}


export interface Event {
	Description: string;
	Game: string;
	GameURL: string;
	Robot: string;
	Timestamp: string;
}

export interface EventID extends Event {
	id: string;
}
