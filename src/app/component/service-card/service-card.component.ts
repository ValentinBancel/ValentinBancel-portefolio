import { Component, Input } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { Service } from '../../models';

@Component({
    selector: 'app-service-card',
    imports: [NgFor, NgIf, CurrencyPipe],
    templateUrl: './service-card.component.html'
})
export class ServiceCardComponent {
  @Input() service!: Service;
}
