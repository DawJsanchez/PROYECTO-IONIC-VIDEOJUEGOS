import { TestBed } from '@angular/core/testing';

import { TiposVideojuegoService } from './tipos-videojuego.service';

describe('TiposVideojuegoService', () => {
  let service: TiposVideojuegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposVideojuegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
