import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/_services/config-datatable';
import { HomeService } from 'src/app/_services/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-request',
  templateUrl: './contact-request.component.html',
  styleUrls: ['./contact-request.component.css']
})
export class ContactRequestComponent implements OnInit {

  contacts: any[] = [];
  configuration = ConfigService.config;
  columns = [

    {
      key: '',
      title: '',
    },
    {
      key: 'name',
      title: 'Name',
    },

    {
      key: 'email',
      title: 'Email'
    },
    {
      key: 'phone',
      title: 'Phone'
    },

    {
      key: 'message',
      title: 'Message'
    },

    {
      key: 'action',
      title: 'Action'
    },

  ];

  constructor(private homeService: HomeService, private toastr: ToastrService) { }


  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.homeService.getUnReadRequests().subscribe( res => {
      this.contacts = res.data;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  markAsRead(id) {
    console.log(id);

    this.homeService.requestRead(id).subscribe( res => {
      this.toastr.success('Done');
      location.reload();
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
