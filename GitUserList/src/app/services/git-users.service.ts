import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GitUsers } from '../models/git-users';
import { GitApiService } from "./git-api.service";

@Injectable({
  	providedIn: 'root'
})
export class GitUsersService {

	constructor(private api: GitApiService) { }

	getUsers(): Observable<GitUsers[]> { 
		let endPoint = '/users';
		return this.api.get(endPoint);
	}
}