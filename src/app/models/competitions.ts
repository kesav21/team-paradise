
export class CompetitionObj implements Competition {
	Year: number;
	Game: GameObj;
	Robot: RobotObj;

constructor(Year: number = new Date().getFullYear(), GameName: string = '', GameReveal: string = '', GameDescription: string = '', RobotImage: string = '', RobotName: string = '', RobotReport: string = '', RobotReveal: string = '') {
		this.Year = Year;
		this.Game = new GameObj(GameName, GameReveal, GameDescription);
		this.Robot = new RobotObj(RobotImage, RobotName, RobotReport, RobotReveal);
	}

	isNull(): boolean {
		return this.Year == null || this.Game.isNull() || this.Robot.isNull();
	}

	getObject() {
		return {
			Year: this.Year,
			Game: this.Game.getObject(),
			Robot: this.Robot.getObject()
		}
	}
}


export class GameObj implements Game {
	Description: string;
	Name: string;
	Reveal: string;

	constructor(Name: string = '', Reveal: string = '', Description: string = '',) {
		this.Name = Name;
		this.Reveal = Reveal;
		this.Description = Description;
	}

	isNull(): boolean {
		return this.Description == null || this.Name == null || this.Reveal == null;
	}

	getObject() {
		return {
			Description: this.Description,
			Name: this.Name,
			Reveal: this.Reveal
		}
	}
}

export class RobotObj implements Robot {
	Image: string;
	Name: string;
	Report: string;
	Reveal: string;

	constructor(Image: string = '', Name: string = '', Report: string = '', Reveal: string = '') {
		this.Image = Image;
		this.Name = Name;
		this.Report = Report;
		this.Reveal = Reveal;
	}

	isNull(): boolean {
		return this.Image == null || this.Name == null || this.Report == null || this.Reveal == null;
	}

	getObject() {
		return {
			Image: this.Image,
			Name: this.Name,
			Report: this.Report,
			Reveal: this.Reveal
		}
	}
}

export class AbilityObj implements Ability {
	Name: string;
	Timestamp: Date;

	constructor(Name: string, Timestamp: Date = new Date()) {
		this.Name = Name;
		this.Timestamp = Timestamp;
	}

	getObject() {
		return {
			Name: this.Name,
			Timestamp: this.Timestamp
		}
	}

	updateTime() {
		this.Timestamp = new Date();
	}
}

export class FactObj implements Fact {
	Key: string;
	Value: string;
	Timestamp: Date;

	constructor(Key: string, Value: string, Timestamp: Date = new Date()) {
		this.Key = Key;
		this.Value = Value;
		this.Timestamp = Timestamp;
	}

	getObject() {
		return {
			Key: this.Key,
			Value: this.Value,
			Timestamp: this.Timestamp
		}
	}

	updateTime() {
		this.Timestamp = new Date();
	}
}

export class RegionalObj implements Regional {
	Location: string;
	Awards: string;
	Timestamp: Date;

	constructor(location: string, Awards: string, Timestamp: Date = new Date()) {
		this.Location = location;
		this.Awards = Awards;
		this.Timestamp = Timestamp;
	}

	getObject() {
		return {
			Location: this.Location,
			Awards: this.Awards,
			Timestamp: this.Timestamp
		}
	}

	updateTime() {
		this.Timestamp = new Date();
	}
}

export interface Competition {
	Year: number;
	Game: Game;
	Robot: Robot;
}

export interface Game {
	Description: string;
	Name: string;
	Reveal: string;
}

export interface Robot {
	Image: string;
	Name: string;
	Report: string;
	Reveal: string;
}

export interface CompetitionID extends Competition {
	id: string;
}

export interface Ability {
	Name: string;
	Timestamp: Date;
}

export interface Fact {
	Key: string;
	Value: string;
	Timestamp: Date;
}

export interface Regional {
	Location: string;
	Awards: string;
	Timestamp: Date;
}

export interface AbilityID extends Ability {
	id: string;
}
export interface FactID extends Fact {
	id: string;
}

export interface RegionalID extends Regional {
	id: string;
}
