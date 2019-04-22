import { Component, OnInit } from '@angular/core';
import { UserCheckService } from 'src/app/_services/user-check.service';

@Component({
  selector: 'app-sender-signatory',
  templateUrl: './sender-signatory.component.html',
  styleUrls: ['./sender-signatory.component.css']
})
export class SenderSignatoryComponent implements OnInit {

  checkImages: any[] = [];
  constructor(private checkService: UserCheckService) { }

  ngOnInit() {
    this.getUnreadChecks();
  }
  getUnreadChecks() {
    this.checkService.getCheckSignatureRequests().subscribe(
      result => {
        console.log(result);
        this.checkImages = result.data;
      },
      err => console.log(err)
    );

  }

}
