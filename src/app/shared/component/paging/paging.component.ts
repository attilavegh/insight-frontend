import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'insight-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements OnInit {

  @Input() numberOfPages = 3;
  @Output() changePage = new EventEmitter<number>();
  selectedPage = 1;

  constructor() {
  }

  ngOnInit() {
  }

  onNextPage() {
    this.selectedPage++;
    this.changePage.emit(this.selectedPage);
  }

  get hasNext() {
    return this.selectedPage !== this.numberOfPages;
  }
}
