import { Component, OnInit } from '@angular/core';

import { GitUsers } from "./models/git-users";
import { GitUsersService } from "./services/git-users.service";

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html',
  	styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'GitUserList';
 	gitUsers: GitUsers[];

	constructor(private gitUsersService: GitUsersService) {

	}

	ngOnInit() {
		this.gitUsersService.getUsers().subscribe(res => {
			this.gitUsers = res;
		}, error => {
            console.log(error);
        });
	}
}
