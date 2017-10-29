import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth-service/auth.service';

export interface Button {
	url: string;
	name: string;
}

export interface Dropdown {
	title: string;
	list: Button[];
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	menu: Dropdown[] = [{
		title: 'About',
		list: [{
			url: '/about/team',
			name: 'About the Team'
		}, {
			url: '/about/history',
			name: 'History'
		// }, {
		// 	url: '/about/goals',
		// 	name: 'Our Goals'
		}, {
			url: '/about/media',
			name: 'Media'
		}, {
			url: '/about/people',
			name: 'People of Paradise'
		}]
	}, {
		title: 'Member',
		list: [{
			url: '/member/newsletters',
			name: 'Newsletters'
		}, {
			url: '/member/calendar',
			name: 'Calendar'
		}]
	}, {
		title: 'Outreach',
		list: [{
			url: '/outreach/projects',
			name: 'Projects'
		}, {
			url: '/outreach/sponsorships',
			name: 'Sponsorships'
		}]
	}];

	buttons: Button[] = [{
		url: '/competitions',
		name: 'Competitions'
	}, {
		url: '/contact-us',
		name: 'Contact us'
	}];

	constructor(public auth: AuthService) {
	}

	ngOnInit(): void {
	}

	login(): void {
		this.auth.login();
	}

	logout(): void {
		this.auth.logout();
	}

}
