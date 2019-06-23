import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  constructor(public authService: UserAuthService,
    private router: Router,
    public toaster: ToastrService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.decodedtoken = null;
    this.authService.usertoken = null;
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
    this.toaster.success('Logged out');
  }


}
