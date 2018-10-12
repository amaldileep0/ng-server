import { TestBed, inject } from '@angular/core/testing';

import { ConfirmationDialogeService } from './confirmation-dialoge.service';

describe('ConfirmationDialogeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmationDialogeService]
    });
  });

  it('should be created', inject([ConfirmationDialogeService], (service: ConfirmationDialogeService) => {
    expect(service).toBeTruthy();
  }));
});
