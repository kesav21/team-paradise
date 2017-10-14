
export class Competition {
	Game: Game;
	Robot: Robot;
}

export class CompetitionID extends Competition {
	id: string;
}

export class Game {
	Description: string;
	Name: string;
	Reveal: string;
}

export class Robot {
	Image: string;
	Name: string;
	Report: string;
	Reveal: string;
}

export class Ability {
	Name: string;
}
export class Fact {
	Key: string;
	Value: string;
}

export class Regional {
	Location: string;
	Awards: string;
}

export class AbilityID extends Ability {
	id: string;
}
export class FactID extends Fact {
	id: string;
}

export class RegionalID extends Regional {
	id: string;
}
