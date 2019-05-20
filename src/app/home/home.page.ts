import { Component } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	public selectedSegment: string = 'about';

	segmentChanged(event: any) {
		console.log('Segment changed', event);
	}

}

