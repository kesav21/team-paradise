import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DatePipe } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';

import { AboutTeamComponent } from './about/about-team/about-team.component';
import { GoalsComponent } from './about/goals/goals.component';
import { HistoryComponent } from './about/history/history.component';
import { PeopleComponent } from './about/people/people.component';

import { CompetitionListComponent } from './competitions/competition-list/competition-list.component';
import { CompetitionDetailComponent } from './competitions/competition-detail/competition-detail.component';

import { ContactUsComponent } from './contact-us/contact-us.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home/home.component';

import { CalendarComponent } from './member/calendar/calendar.component';
import { NewslettersComponent } from './member/newsletters/newsletters.component';

import { ProjectsComponent } from './outreach/projects/projects.component';
import { SponsorshipsComponent } from './outreach/sponsorships/sponsorships.component';

import { DatabaseService } from './database-service/database.service';
import { AuthService } from './auth-service/auth.service';

import { ReversePipe } from './reverse-pipe/reverse.pipe';
import { ObjectToStringPipe } from './object-to-string/object-to-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AboutTeamComponent,
    GoalsComponent,
    HistoryComponent,
    ContactUsComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CalendarComponent,
    NewslettersComponent,
    ProjectsComponent,
    SponsorshipsComponent,
    ReversePipe,
    CompetitionDetailComponent,
    CompetitionListComponent,
    PeopleComponent,
    ObjectToStringPipe
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpModule,
	AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
	AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
	  DatabaseService,
	  AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
