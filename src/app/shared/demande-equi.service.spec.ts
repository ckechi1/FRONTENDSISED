import { TestBed } from '@angular/core/testing';

import { DemandeEquiService } from './demande-equi.service';

describe('DemandeEquiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemandeEquiService = TestBed.get(DemandeEquiService);
    expect(service).toBeTruthy();
  });
});
