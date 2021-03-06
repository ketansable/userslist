import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


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
	gitUserDetails: any = {};
	search: Subject<string> = new Subject<string>();
	cache = {
        gitUsers: []
	};
	p: Number = 1;
  	count: Number = 3;

	constructor(private gitUsersService: GitUsersService) {
		this.search.pipe(debounceTime(500), distinctUntilChanged()).subscribe((searchTerm) => {
            this.gitUsersService.search(searchTerm).subscribe(res => {
				this.gitUsers = res.items as GitUsers[];
			});
        });
	}

	ngOnInit() {
		this.gitUsersService.getUsers().subscribe(res => {
			this.cache.gitUsers = res;
			this.gitUsers = res;
			this.sortUsersList('login');
		}, error => {
            console.log(error);
        });
	}

	getUserDetails(login) { 
		this.gitUsersService.getUsers(login).subscribe(res => {
			this.gitUserDetails[login] = res;
		}, error => {
            console.log(error);
        });
	}

	onSearch(q: string) {
		if (q !== "") {
            this.search.next(q);
        } else {
            //if empty search box we restore first users
            this.gitUsers = this.cache.gitUsers;
        }
	}

	sortUsers(val: any) {
		this.sortUsersList(val);
	}

	sortUsersList(value: any) {
		if(value === 'login') {
			this.gitUsers.sort((prev,next) => prev.login.localeCompare(next.login));
		}		
		else if(value === 'rank') {
			this.gitUsers.sort((prev,next) => { return parseInt(prev.id) - parseInt(next.id)});
		}			
	}
}
