import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GitUsers } from '../models/git-users';

@Injectable({
  	providedIn: 'root'
})
export class GitApiService {

	private baseUrl: string = "https://api.github.com";
 
	constructor(private HttpClient: HttpClient) { }

	get(endPoint: string) {
		return this.HttpClient.get<GitUsers[]>(this.createUrl(endPoint));
	}

	put() {}
	post() {}
	delete() {}
	patch() {}
	
	createUrl(endPoint): string {
		let url = this.baseUrl + endPoint;
        if (!endPoint.startsWith('/')) {
            url = this.baseUrl + '/' + endPoint;
		}
		return url;
	}
}
