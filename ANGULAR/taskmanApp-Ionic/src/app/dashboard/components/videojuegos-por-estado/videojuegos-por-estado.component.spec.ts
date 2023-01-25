import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideojuegosPorEstadoComponent } from './videojuegos-por-estado.component';

describe('VideojuegosPorEstadoComponent', () => {
  let component: VideojuegosPorEstadoComponent;
  let fixture: ComponentFixture<VideojuegosPorEstadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideojuegosPorEstadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideojuegosPorEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
