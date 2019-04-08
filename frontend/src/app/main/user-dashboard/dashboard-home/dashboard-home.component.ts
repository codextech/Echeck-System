import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {

  constructor(public authService: UserAuthService) { }

  ngOnInit() {

  }

}
