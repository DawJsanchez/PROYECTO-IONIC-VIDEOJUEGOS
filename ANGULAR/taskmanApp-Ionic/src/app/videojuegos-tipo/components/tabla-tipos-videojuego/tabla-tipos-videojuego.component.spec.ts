import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablaTiposVideojuegoComponent } from './tabla-tipos-videojuego.component';

describe('TablaTiposVideojuegoComponent', () => {
  let component: TablaTiposVideojuegoComponent;
  let fixture: ComponentFixture<TablaTiposVideojuegoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaTiposVideojuegoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablaTiposVideojuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
