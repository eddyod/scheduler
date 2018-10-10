import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Page } from '../models/page';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent {
  @Input() page: Page<any>;
  @Output() pageChange = new EventEmitter<string>();
}
