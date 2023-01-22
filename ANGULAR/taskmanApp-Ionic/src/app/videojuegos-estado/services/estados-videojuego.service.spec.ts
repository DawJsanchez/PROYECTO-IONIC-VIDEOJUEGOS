import { TestBed } from '@angular/core/testing';

import { EstadosVideojuegoService } from './estados-videojuego.service';

describe('EstadosVideojuegoService', () => {
  let service: EstadosVideojuegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosVideojuegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
