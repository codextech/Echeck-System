import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { RecieverService } from 'src/app/_services/reciever.service';
import { UserCheckService } from 'src/app/_services/user-check.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashBoardComponent implements OnInit {

  title = 'Echeck';
  recievers: any[] = [];
  sentChecks: any[] = [];
  recievedChecks: any[] = [];
  bankAccounts: any[] = [];
  checkSummary: any[] = [];

  amountSent: number;
  amountRecieved: number;


  constructor(public authService: UserAuthService,
              private accountService: UserAccountService,
              private recieverService: RecieverService,
              private checkService: UserCheckService,
              ) {
  }

  ngOnInit() {

    this.getBillers();
    this.getSentChecks();
    this.getRecieveChecks();
    this.getBankAccounts();

    setTimeout(() => {
    this.getTotalSummary(); // check sent recieve , local method
    }, 1500);

  }
  getTotalSummary() {


    this.checkSummary = this.checkSummary.concat(this.sentChecks, this.recievedChecks);
        this.checkSummary.sort( (a, b) => {
      return Number(new Date(b.createdDate)) - Number(new Date(a.createdDate));
    }).slice(0, 11);

  }

  getRecieveChecks() {
    let amount = 0;
    this.checkService.getAllRecievedChecks().subscribe(
      result => {
        console.log(result);
        this.recievedChecks = result.data;
        this.recievedChecks.map(check => {
          amount +=  Number(check.amount);
        });
        this.amountRecieved = amount;
      },
      err => console.log(err)
    );
  }
  getSentChecks() {
    let amount = 0;
    this.checkService.getAllSentChecks().subscribe(
      result => {
        this.sentChecks = result.data;
        this.sentChecks.map(check => {
          amount += Number(check.amount); // check.amount will come as string  typecasting
          });
          this.amountSent = amount;
      },
      err => console.log(err)
    );

  }
  getBillers() {
    this.recieverService.getRecievers().subscribe(
      result => {
        this.recievers = result.data;
      },
      err => {
        console.log(err);
      }
    );
  }
  getBankAccounts() {
    this.accountService.getBankAccounts().subscribe(result => {
      this.bankAccounts = result.data;
    }, err => {

    });
  }
}
