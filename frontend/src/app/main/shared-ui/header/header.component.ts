import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: UserAuthService,
              private router: Router,
              private toaster: ToastrService ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.decodedtoken = null;
    this.authService.usertoken = null;
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
    this.toaster.success('Logged out');
  }

}
