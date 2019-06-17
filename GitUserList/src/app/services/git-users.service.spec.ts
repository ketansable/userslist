import { TestBed } from '@angular/core/testing';

import { GitUsersService } from './git-users.service';

describe('GitUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GitUsersService = TestBed.get(GitUsersService);
    expect(service).toBeTruthy();
  });
});
