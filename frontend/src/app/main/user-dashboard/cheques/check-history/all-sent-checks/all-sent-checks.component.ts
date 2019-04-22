import { Component, OnInit } from '@angular/core';
import { UserCheckService } from 'src/app/_services/user-check.service';

@Component({
  selector: 'app-all-sent-checks',
  templateUrl: './all-sent-checks.component.html',
  styleUrls: ['./all-sent-checks.component.css']
})
export class AllSentChecksComponent implements OnInit {

  checksImages: any[] = [];
  constructor(private checkService: UserCheckService) { }

  ngOnInit() {
    this.getSentChecks();
  }

  getSentChecks() {
    this.checkService.getAllSentChecks().subscribe(
      result => {
        console.log(result);
        this.checksImages = result.data;
      },
      err => console.log(err)
    );

  }


}
