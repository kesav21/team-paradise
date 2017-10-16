
export class TierObj implements TierID {
	Name: string;
	Benefits: string[];
	Bounds: {
		Lower: number;
		Upper: number;
	};
	id: string;

	constructor(Tier?: TierID) {
		if(Tier) {
			this.Name = Tier.Name;
			this.Benefits = Tier.Benefits;
			this.Bounds = {
				Upper: Tier.Bounds.Upper,
				Lower: Tier.Bounds.Lower
			};

			if(Tier.id) {
				this.id = Tier.id;
			}
		} else {
			this.reset();
		}
	}

	reset(): void {
		this.Name = '';
		this.Benefits = [''];
		this.Bounds = {
			Upper: 0,
			Lower: 0
		};
	}

	isNull(): boolean {
		return this.Name == null || this.Benefits == null || this.Bounds == null || this.Bounds.Lower == null || this.Bounds.Upper == null;
	}

	getObj(): Tier {
		return {
			Name: this.Name,
			Benefits: this.Benefits,
			Bounds: {
				Upper: this.Bounds.Upper,
				Lower: this.Bounds.Lower
			}
		};
	}
}

export interface Tier {
	Name: string;
	Benefits: string[];
	Bounds: {
		Lower: number;
		Upper: number;
	};
}

export interface TierID extends Tier {
	id: string;
}

export class SponsorObj implements SponsorID {
	Name: string;
	Image: string;
	Description: string;
	id: string;

	constructor(Sponsor?: SponsorID) {
		if(Sponsor) {
			this.Name = Sponsor.Name;
			this.Image = Sponsor.Image;
			this.Description = Sponsor.Description;

			if(Sponsor.id) {
				this.id = Sponsor.id;
			}
		} else {
			this.reset();
		}
	}

	reset(): void {
		this.Name = '';
		this.Image = '';
		this.Description = '';
	}

	isNull(): boolean {
		return this.Name == null || this.Image == null || this.Description == null;
	}

	getObj(): Sponsor {
		return {
			Name: this.Name,
			Image: this.Image,
			Description: this.Description
		};
	}
}

export interface Sponsor {
	Name: string;
	Image: string;
	Description: string;
}

export interface SponsorID extends Sponsor {
	id: string;
}
