import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature-section',
  templateUrl: './feature-section.component.html',
  styleUrls: ['./feature-section.component.scss'],
})
export class FeatureSectionComponent implements OnInit, OnChanges {
  @Input()
  listBooks: any[] = [];

  ngOnInit(): void {
    console.log('listBooks', this.listBooks);
  }

  ngOnChanges(){
    console.log('listBooks', this.listBooks);
  }
}
