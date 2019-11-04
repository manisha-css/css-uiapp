import { BasicUserService } from 'src/app/user/basicuser.service';
import { NGXLogger } from 'ngx-logger';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'givenName', 'userName', 'actions'];
  dataSource = new MatTableDataSource<User>();
  users: User[];
  constructor(public basicUserService: BasicUserService, private userService: UserService, private logger: NGXLogger) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        this.dataSource.data = response;
        this.users = response;
        this.logger.debug('User info retrieved successfully');
      },
      () => {}
    );
  }
  onEdit(user: User) {
    alert(JSON.stringify(user));
  }
}
