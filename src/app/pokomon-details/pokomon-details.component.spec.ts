import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokomonDetailsComponent } from './pokomon-details.component';

describe('PokomonDetailsComponent', () => {
  let component: PokomonDetailsComponent;
  let fixture: ComponentFixture<PokomonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokomonDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokomonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
