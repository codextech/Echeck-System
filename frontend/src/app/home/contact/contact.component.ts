import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/_services/home.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactModel: any = {};
  constructor(private homeService: HomeService, private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  addMessage() {
    this.homeService.addContact(this.contactModel).subscribe(
      result => {
        this.toastr.success('Thank you!, we will contact you soon');
        this.router.navigate(['/']);

      },
      err => {
        console.log(err);
      }
    );
  }


}
