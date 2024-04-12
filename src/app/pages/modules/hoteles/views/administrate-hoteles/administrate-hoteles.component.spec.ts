import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrateHotelesComponent } from './administrate-hoteles.component';

describe('AdministrateHotelesComponent', () => {
  let component: AdministrateHotelesComponent;
  let fixture: ComponentFixture<AdministrateHotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrateHotelesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministrateHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
