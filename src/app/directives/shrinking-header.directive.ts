import { Directive, Input, ElementRef, Renderer2, OnInit } from "@angular/core";
import { DomController } from "@ionic/angular";

@Directive({
  	selector: '[shrinkingHeader]'
})
export class ShrinkingHeaderDirective implements OnInit {
 	@Input("shrinkingHeader") scrollArea;
	newHeaderHeight: any;
	minHeaderHeight: number = 100;
	headerShow: boolean = true;
	headerHeight: number = 350;

	constructor(
		private element: ElementRef,
		private renderer: Renderer2,
		private domCtrl: DomController
	) { }

	ngOnInit() {
		this.initStyles();
	}

	initStyles() {
		this.domCtrl.write(() => {
			this.renderer.setStyle(
				this.element.nativeElement,
				"transition",
				"0.2s linear"
			);
			this.renderer.setStyle(this.element.nativeElement, "height", this.headerHeight + "px");
		});

		this.scrollArea.ionScroll.subscribe(scrollEvent => {
			this.resizeHeader(scrollEvent);
		});
	}

	resizeHeader(scrollEvent) {
		this.domCtrl.write(() => {
			// Calculate suitable header height
			this.newHeaderHeight = this.headerHeight - scrollEvent.detail.scrollTop;

			// Avoid scolling up to the top, set second nav header to have 100px height
			if (this.newHeaderHeight < this.minHeaderHeight) {
				this.newHeaderHeight = this.minHeaderHeight;
			}
			console.log('newHeaderHeight', this.newHeaderHeight);

			// Resize header height
			this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');

			// Keep track of the header height to determine opacity transition speed
			let headerChangeProgress = (this.newHeaderHeight-this.minHeaderHeight) / (this.headerHeight-this.minHeaderHeight);

			// Do transitioning animation to show/hide header content
			this.changeHeaderContent(headerChangeProgress, 1-headerChangeProgress);
		})
	}


	// Change header content on scroll
	changeHeaderContent(bgOpacityPercent, navOpacityPercent) {
		// Apply styles to header elements
		for(let headerElement of this.element.nativeElement.children){
			switch(headerElement.className) {
				// Background img from bg header hide on shrink, show on expand
				case 'bg-img':
					this.renderer.setStyle(headerElement, 'opacity', bgOpacityPercent);
					break;
				// Background img from nav header show on shrink, hide on expand
				case 'nav-img':
				case 'nav-layer':
					this.renderer.setStyle(headerElement, 'opacity', navOpacityPercent);
					break;
				// Control header content element vibility
				// case 'bg-content':
				// 	let totalHeight = headerElement.offsetTop + headerElement.clientHeight;
				// 	let navContentElement = this.element.nativeElement.querySelector('.nav-content');

				// 	if(totalHeight > this.newHeaderHeight && !headerElement.isHidden){
				// 		headerElement.isHidden = true;
				// 		this.events.publish('header:expanded', false);
				// 		this.renderer.setElementStyle(headerElement, 'opacity', '0');
				// 		this.renderer.setElementStyle(navContentElement, 'opacity', '1');
				// 	} else if (totalHeight <= this.newHeaderHeight && headerElement.isHidden) {
				// 		headerElement.isHidden = false;
				// 		this.events.publish('header:expanded', true);
				// 		this.renderer.setElementStyle(headerElement, 'opacity', '1');
				// 		this.renderer.setElementStyle(navContentElement, 'opacity', '0');
				// 	}
				// 	break;
			}
		}
	}
}
