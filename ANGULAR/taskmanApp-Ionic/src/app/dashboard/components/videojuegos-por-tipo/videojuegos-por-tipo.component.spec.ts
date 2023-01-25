import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideojuegosPorTipoComponent } from './videojuegos-por-tipo.component';

describe('VideojuegosPorTipoComponent', () => {
  let component: VideojuegosPorTipoComponent;
  let fixture: ComponentFixture<VideojuegosPorTipoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VideojuegosPorTipoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideojuegosPorTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
