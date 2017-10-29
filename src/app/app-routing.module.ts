import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutTeamComponent } from './about/about-team/about-team.component';
// import { GoalsComponent } from './about/goals/goals.component';
import { HistoryComponent } from './about/history/history.component';
import { PeopleComponent } from './about/people/people.component';
import { MediaComponent } from './about/media/media.component';
import { FolderComponent } from './about/media/folder/folder.component';

import { CompetitionDetailComponent } from './competitions/competition-detail/competition-detail.component';
import { CompetitionListComponent } from './competitions/competition-list/competition-list.component';

import { ContactUsComponent } from './contact-us/contact-us.component';

import { HomeComponent } from './home/home.component';

import { CalendarComponent } from './member/calendar/calendar.component';
import { NewslettersComponent } from './member/newsletters/newsletters.component';

import { ProjectsComponent } from './outreach/projects/projects.component';
import { SponsorshipsComponent } from './outreach/sponsorships/sponsorships.component';

const routes: Routes = [{
	path: '',
	redirectTo: '/home',
	pathMatch: 'full'
}, {
	path: 'home',
	component: HomeComponent
}, {
	path: 'about/team',
	component: AboutTeamComponent
}, {
	path: 'about/history',
	component: HistoryComponent
// }, {
// 	path: 'about/goals',
// 	component: GoalsComponent
}, {
	path: 'about/media',
	component: MediaComponent
}, {
	path: 'about/media/:year/:folder',
	component: FolderComponent
}, {
// 	path: 'about/media/:year/folder/:folder',
// 	component: FolderComponent
// }, {
// 	path: 'about/media/:year/folder/:folder/image/:image',
// 	component: ImageComponent
// }, {
	path: 'about/people',
	component: PeopleComponent
}, {
	path: 'member/calendar',
	component: CalendarComponent
}, {
	path: 'member/newsletters',
	component: NewslettersComponent
}, {
	path: 'outreach/projects',
	component: ProjectsComponent
}, {
	path: 'outreach/sponsorships',
	component: SponsorshipsComponent
}, {
	path: 'contact-us',
	component: ContactUsComponent
}, {
	path: 'competitions',
	component: CompetitionListComponent
}, {
	path: 'competitions/:year',
	component: CompetitionDetailComponent
}];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
