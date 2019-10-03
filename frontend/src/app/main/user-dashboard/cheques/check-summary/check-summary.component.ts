import { Component, OnInit } from '@angular/core';
import { UserCheckService } from 'src/app/_services/user-check.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ConfigService } from 'src/app/_services/config-datatable';
declare var $;
@Component({
  selector: 'app-check-summary',
  templateUrl: './check-summary.component.html',
  styleUrls: ['./check-summary.component.css']
})
export class CheckSummaryComponent implements OnInit {

  checkSummary: any[] = [];
  sentChecks: any[] = [];
  recievedChecks: any[] = [];

  checkDetails: any = {};
  configuration = ConfigService.config;
  columns = [
    {
      key: 'statusColor',
      title: '',
    },

    {
      key: 'checknumber',
      title: 'Check Number',
    },

    {
      key: 'amount',
      title: 'Amount'
    },

    {
      key: 'checkdate',
      title: 'Check Date'
    },

    {
      key: 'status',
      title: 'Check Status'
    },

    {
      key: 'type',
      title: 'Type'
    },

    {
      key: 'actions', title: ''
    }
  ];

  constructor(
    private checkService: UserCheckService,
    private toastr: ToastrService,
    private ngxModalService: NgxSmartModalService
  ) {}

  ngOnInit() {

    this.getSentChecks();
    this.getRecieveChecks();

    setTimeout(() => {
      this.getTotalSummary();
    }, 1500);

  $('.toltip').tooltip('show');

  }


  getTotalSummary() {



    this.checkSummary = this.checkSummary.concat(this.sentChecks, this.recievedChecks);
       console.log(this.checkSummary);

    this.checkSummary.sort( (a, b) => {
      return Number(new Date(b.createdDate)) - Number(new Date(a.createdDate));
    });

    console.log('checkSummary ', this.checkSummary);

  }

  getRecieveChecks() {
    this.checkService.getAllRecievedChecks().subscribe(
      result => {
        this.recievedChecks = result.data;
        this.recievedChecks.map(check => {
          check.type = 'recieved';

        });

      },
      err => console.log(err)
    );
  }
  getSentChecks() {
    this.checkService.getAllSentChecks().subscribe(
      result => {
        this.sentChecks = result.data;
        console.log(this.sentChecks);

        this.sentChecks.map(check => {
          check.type = 'sent';
          // amount += Number(check.amount); // check.amount will come as string  typecasting
          });
      },
      err => console.log(err)
    );

  }

  viewCheckDetails(id) {
   this.checkDetails = this.checkSummary.find(x => x.checkId == id);
   console.log(this.checkDetails);

   this.ngxModalService.open('checkModal');
  }

}
