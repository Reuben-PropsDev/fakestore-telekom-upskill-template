import { Injectable } from '@angular/core';
import { MasterService } from '../master/master.service';
import { APIConstant } from 'src/app/core/constants/APIConstant';
import { environment } from 'src/environments/environment.develop';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public constructor(private master: MasterService) { }

  public getUsers() {
    return this.master.getCategories(`${environment.apiBaseUrl}${APIConstant.users.getAllUsers}`);
  }
}
