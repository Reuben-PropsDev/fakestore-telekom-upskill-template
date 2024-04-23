import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { MasterService } from '../master/master.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.develop';
import { APIConstant } from 'src/app/core/constants/APIConstant';

describe('UsersService', () => {
  let service: UsersService;
  let masterService: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, MasterService]
    });
    service = TestBed.inject(UsersService);
    masterService = TestBed.inject(MasterService);
  });

  it('should get users', () => {
    const getCategoriesSpy = spyOn(masterService, 'getCategories').and.callThrough();
    service.getUsers();
    expect(getCategoriesSpy).toHaveBeenCalledWith(`${environment.apiBaseUrl}${APIConstant.users.getAllUsers}`);
  });
});
