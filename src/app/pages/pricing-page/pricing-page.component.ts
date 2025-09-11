import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({name: 'description', content: 'esta es mi pricing page'});
    this.meta.updateTag({name: 'Og: title', content: ' pricing page'});
    this.meta.updateTag({name: 'KeyWords', content: 'angularPro, curso, ssr, aprender, avanzado'});
  }
}
