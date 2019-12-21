import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
declare var $;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public authService: UserAuthService) { }

  ngOnInit() {
  }



  onClickKYC() {
    setTimeout(() => {
    $('#kyc-tab').trigger('click');
    }, 500);
  }
}
