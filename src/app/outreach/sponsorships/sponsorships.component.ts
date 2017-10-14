import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2/database-deprecated';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';

import { Level, Sponsor } from '../../models';

@Component({
	selector: 'app-sponsorships',
	templateUrl: './sponsorships.component.html',
	styleUrls: ['./sponsorships.component.css']
})
export class SponsorshipsComponent implements OnInit {

	SponsorshipLevels: FirebaseListObservable<Level[]>;
	Sponsors: FirebaseListObservable<Sponsor[]>;

	newLevel: Level;
	newSponsor: Sponsor;

	constructor(public auth: AuthService, private db: DatabaseService) {
	}

	ngOnInit() {
		this.SponsorshipLevels = this.db.getSponsorships();
		this.Sponsors = this.db.getSponsors();

		this.resetNewLevel();
		this.resetNewSponsor();
	}

	saveLevel(Level: any): void {
		this.SponsorshipLevels.update(Level.$key, Level);
	}

	addLevel(): void {
		this.SponsorshipLevels.push({
			Name: 'Sponsorship Level',
			Perks: [{
				Name: 'Perk of Level'
			}]
		});
	}

	removeLevel(key: string): void {
		key?
			this.SponsorshipLevels.remove(key):
			console.log('Level key is null.');
	}

	addPerk(Perks: any[], Perk: any): void {
		Perks.splice(Perks.indexOf(Perk) + 1, 0, {
			Text: ''
		});
	}

	removePerk(Perks: any[], Perk: any): void {
		Perks.splice(Perks.indexOf(Perk), 1);
	}


	saveSponsor(Sponsor: any): void {
		this.Sponsors.update(Sponsor.$key, Sponsor);
	}

	addSponsor(): void {
		this.Sponsors.update(this.newSponsor.Name, this.newSponsor.ImageURL);
	}

	removeSponsor(key: string): void {
		key?
			this.Sponsors.remove(key):
			console.log('Level key is null.');
	}

	resetNewLevel() {
		this.newLevel = {
			Name: '',
			Level: {
				Description: '',
				Perks: [{
					Text: ''
				}]
			}
		};
	}

	resetNewSponsor() {
		this.newSponsor = {
			Name: '',
			ImageURL: ''
		};
	}
}

// Bronze: #A67D3D
// Gold: #CD7F32
// Silver: #E6E8FA
