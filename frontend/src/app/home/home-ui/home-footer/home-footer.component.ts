import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from 'src/app/_services/home.service';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.css']
})
export class HomeFooterComponent implements OnInit {

  subscriberModel: any = {}
  constructor(private toastr: ToastrService, private homeService: HomeService) { }

  ngOnInit() {
  }

  addSubscribe() {
    this.homeService.addsubscriber(this.subscriberModel).subscribe(
      result => {
        this.toastr.info('Thank you for Subscribe !');
        this.subscriberModel = {};
      },
      err => {
        console.log(err);
      }
    );
  return null;
  }
}
