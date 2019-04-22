import { Component, OnInit } from '@angular/core';
import { UserCheckService } from 'src/app/_services/user-check.service';

@Component({
  selector: 'app-reciever-signatory',
  templateUrl: './reciever-signatory.component.html',
  styleUrls: ['./reciever-signatory.component.css']
})
export class RecieverSignatoryComponent implements OnInit {

  checkImages: any[] = [];
  constructor(private checkService: UserCheckService) { }

  ngOnInit() {
    this.getUnreadChecks();
  }
  getUnreadChecks() {
    this.checkService.getRecieverCheckSignatureRequests().subscribe(
      result => {
        console.log(result);
        this.checkImages = result.data;
      },
      err => console.log(err)
    );

  }
}
