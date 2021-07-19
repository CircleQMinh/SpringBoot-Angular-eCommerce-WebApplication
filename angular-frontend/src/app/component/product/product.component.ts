import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  images = ['https://fruitguys.com/wp-content/uploads/2020/08/Homepage_Banner_SummerFruit-web-2000.jpg',
  'https://tours.allthingstreasurecoast.com/190419/header/berry_fresh_cafe.jpg'];

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
