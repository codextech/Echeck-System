import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/_services/config-datatable';
import { HomeService } from 'src/app/_services/home.service';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements OnInit {


  scubscribers: any[] = [];
  configuration = ConfigService.config;
  columns = [
    {
      key: 'email',
      title: 'Email'
    },

  ];

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.getSubscribers();
  }

  getSubscribers() {
    this.homeService.getSubscribers().subscribe( res => {
      this.scubscribers = res.data;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
