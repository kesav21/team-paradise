export class Announcement {
	Title: string;
	Text: string;
}

export class Report {
	Title: string;
	Text: Array<{
		Name: string;
	}>;
	Timestamp: Date;
}

export class AnnouncementID extends Announcement {
	id: string;
}

export class ReportID extends Report {
	id: string;
}
