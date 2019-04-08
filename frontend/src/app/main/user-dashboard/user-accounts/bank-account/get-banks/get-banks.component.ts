import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/_services/config-datatable';
import { UserAccountService } from 'src/app/_services/user-account.service';

@Component({
  selector: 'app-get-banks',
  templateUrl: './get-banks.component.html',
  styleUrls: ['./get-banks.component.css']
})
export class GetBanksComponent implements OnInit {

  configuration = ConfigService.config;
  columns = [
    {
      key: 'bank',
      title: 'Bank Name',
    },

    {
      key: 'routNumber',
      title: 'Routing Number'
    },
    {
      key: 'city',
      title: 'City'
    },

    {
      key: 'telephone',
      title: 'Bank Phone'
    },

    {
      key: 'actions', title: 'Actions'
    }
  ];

  banks: any[] = [];
  constructor(private accountService: UserAccountService) {
   }

  ngOnInit() {
    this.getBanks();
  }

/* params userId
get banks By userId*/
  getBanks() {

    this.accountService.getBankByUserId().subscribe(result => {

      console.log(result);
      this.banks = result.data;

    }, err => {

    });
  }
}
