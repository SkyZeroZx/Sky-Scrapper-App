import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPriceComponent } from './history-price.component';

describe('HistoryPriceComponent', () => {
  let component: HistoryPriceComponent;
  let fixture: ComponentFixture<HistoryPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
