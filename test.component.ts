import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit,AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const carouselElement = this.elementRef.nativeElement.querySelector('#carouselExample');

    $(carouselElement).on('slide.bs.carousel', (e: Event) => {
      const relatedTarget = (e as any).relatedTarget;
      const $e = $(relatedTarget);
      const idx = $e.index();
      const itemsPerSlide = 4;
      const totalItems = $('.carousel-item').length;

      if (idx >= totalItems - (itemsPerSlide - 1)) {
        const it = itemsPerSlide - (totalItems - idx);
        for (let i = 0; i < it; i++) {
          // append slides to end
          if ((e as any).direction == 'left') {
            $('.carousel-item').eq(i).appendTo('.carousel-inner');
          } else {
            $('.carousel-item').eq(0).appendTo('.carousel-inner');
          }
        }
      }
    });

    $(carouselElement).carousel({
      interval: 2000
    });
  }


}
