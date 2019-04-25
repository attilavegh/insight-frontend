import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'insight-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagingComponent implements OnInit {

  @Input() numberOfPages;
  @Output() changePage = new EventEmitter<number>();

  selectedPage = 1;

  constructor() {}

  ngOnInit() {
  }

  onNextPage() {
    this.selectedPage++;
    this.changePage.emit(this.selectedPage);
  }

  get hasNext() {
    return this.numberOfPages && this.selectedPage !== this.numberOfPages;
  }
}
