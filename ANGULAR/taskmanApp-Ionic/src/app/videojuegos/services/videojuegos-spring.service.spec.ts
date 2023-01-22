import { TestBed } from '@angular/core/testing';

import { VideojuegosSpringService } from './videojuegos-spring.service';

describe('VideojuegosSpringService', () => {
  let service: VideojuegosSpringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideojuegosSpringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
