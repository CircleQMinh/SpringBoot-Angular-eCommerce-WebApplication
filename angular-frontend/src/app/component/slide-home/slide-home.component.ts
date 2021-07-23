import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slide-home',
  templateUrl: './slide-home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./slide-home.component.css']
})
export class SlideHomeComponent implements OnInit {
  images = ['https://res.cloudinary.com/dkmk9tdwx/image/upload/v1627026204/Dozen-reasons_header_xwmgkc.jpg',
    'https://res.cloudinary.com/dkmk9tdwx/image/upload/v1627026203/freshfel1-1_klukey.jpg',
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
