import { Component, OnInit } from '@angular/core';
import { UserCheckService } from 'src/app/_services/user-check.service';

@Component({
  selector: 'app-recieved-checks',
  templateUrl: './recieved-checks.component.html',
  styleUrls: ['./recieved-checks.component.css']
})
export class RecievedChecksComponent implements OnInit {

  constructor(private checkService: UserCheckService) { }

  checksImages: any[] = [];
  ngOnInit() {
    this.getUnreadChecks();
  }
  getUnreadChecks() {
    this.checkService.getUnreadRecieveChecks().subscribe(
      result => {
        console.log(result);
        this.checksImages = result.data;
      },
      err => console.log(err)
    );

  }
}
