import { Component, OnInit } from '@angular/core';
import { UserCheckService } from 'src/app/_services/user-check.service';

@Component({
  selector: 'app-all-recieved-checks',
  templateUrl: './all-recieved-checks.component.html',
  styleUrls: ['./all-recieved-checks.component.css']
})
export class AllRecievedChecksComponent implements OnInit {

  checksImages: any[] = [];
  p = 1;
  constructor(private checkService: UserCheckService) { }

  ngOnInit() {
    this.getRecievedChecks();
  }

  getRecievedChecks() {
    this.checkService.getAllRecievedChecks().subscribe(
      result => {
        console.log(result);
        this.checksImages = result.data;
      },
      err => console.log(err)
    );

  }

}
