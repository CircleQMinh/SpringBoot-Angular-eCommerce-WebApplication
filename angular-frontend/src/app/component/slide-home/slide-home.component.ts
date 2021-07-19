import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slide-home',
  templateUrl: './slide-home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./slide-home.component.css']
})
export class SlideHomeComponent implements OnInit {
  images = ['https://previews.123rf.com/images/incomible/incomible1703/incomible170300174/75163577-banner-with-exotic-tropical-fruits-illustration-of-asian-plants.jpg',
    'https://scontent-sin6-1.xx.fbcdn.net/v/t31.18172-8/10712406_353052334874117_9161867578075286282_o.jpg?_nc_cat=107&ccb=1-3&_nc_sid=e3f864&_nc_ohc=0B6C_ItzrJIAX-AQSij&_nc_ht=scontent-sin6-1.xx&oh=1713a2764757da6d310b7a1eedb81da9&oe=60FA403E',
  'https://www.oishi.com.ph/wp-content/uploads/2020/12/Always-On-WEBSITE-BANNER-DESKTOP-FA-01-resize.jpg',
'https://thucphamduchanh.com/wp-content/uploads/2020/04/banner-website-.jpg'];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  constructor() { }

  ngOnInit(): void {
  }
  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  
  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;
  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
