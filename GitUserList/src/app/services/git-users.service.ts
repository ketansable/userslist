import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GitUsers } from '../models/git-users';
import { GitApiService } from "./git-api.service";

@Injectable({
  	providedIn: 'root'
})
export class GitUsersService {

	constructor(private api: GitApiService) { }

	getUsers(login?: string): Observable<GitUsers[]> { 
		let endPoint = '/users';
		if(login) {
			return this.api.get(endPoint+'/'+login+'/repos');
		}
		else {
			return this.api.get(endPoint);
		}
	}
	
	search(q: string): Observable<any> {
        let endPoint = '/search/users?q=' + q;
        return this.api.get(endPoint);

    }
}