import { Component, OnInit } from '@angular/core';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../auth-service/auth.service';
import { DatabaseService } from '../../database-service/database.service';

import {
	Tier, TierID, TierObj,
	Sponsor, SponsorID, SponsorObj
} from '../../models';

import { CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-sponsorships',
	templateUrl: './sponsorships.component.html',
	styleUrls: ['./sponsorships.component.css']
})
export class SponsorshipsComponent implements OnInit {

	Tiers: AngularFirestoreCollection<Tier>;
	Sponsors: AngularFirestoreCollection<Sponsor>;

	Tiers$: Observable<TierID[]>;
	Sponsors$: Observable<SponsorID[]>;

	newTier: TierObj;
	newSponsor: SponsorObj;

	constructor(public auth: AuthService, private db: DatabaseService) {}

	ngOnInit() {
		this.Tiers = this.db.getTiers();
		this.Sponsors = this.db.getSponsorsCol();

		this.Tiers$ = this.db.getSnapshot(this.Tiers);
		this.Sponsors$ = this.db.getSnapshot(this.Sponsors);

		this.newTier = new TierObj();
		this.newSponsor = new SponsorObj();
	}

	addTier(): void {
		this.Tiers.add(this.newTier.getObj());
		this.newTier.reset();
	}

	saveTier(Tier: TierID): void {
		const tier = new TierObj(Tier);
		this.Tiers.doc(tier.id).update(tier.getObj());
	}

	removeTier(id: string): void {
		this.Tiers.doc(id).delete();
	}

	addBenefit(Benefits: string[], Benefit: string): void {
		Benefits.splice(Benefits.indexOf(Benefit) + 1, 0, '');
	}

	removeBenefit(Benefits: string[], Benefit: string): void {
		Benefits.splice(Benefits.indexOf(Benefit), 1);
	}

	trackTier(index: number, benefit: string) {
		return index;
	}


	addSponsor(): void {
		this.Sponsors.add(this.newSponsor.getObj());
		this.newSponsor.reset();
	}

	saveSponsor(Sponsor: SponsorID): void {
		const sponsor = new SponsorObj(Sponsor);
		this.Sponsors.doc(sponsor.id).update(sponsor.getObj());
	}

	removeSponsor(id: string): void {
		this.Sponsors.doc(id).delete();
	}

}

// Bronze: #A67D3D
// Gold: #CD7F32
// Silver: #E6E8FA
