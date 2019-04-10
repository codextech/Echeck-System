import { Component, OnInit } from '@angular/core';
import { UserAccountService } from 'src/app/_services/user-account.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {

  constructor(private accountService: UserAccountService,
              private toastr: ToastrService,
              private ngxModalService: NgxSmartModalService ) { }

  bankModel: any = {};
  messageAlert = false;

  ngOnInit() {
    // setTimeout(() => this.messageAlert = true, 6000); // after 6 seconds bootsrap laert message close
  }

  getBankDetails(id) {

      console.log(id);

      this.accountService.findBankByRoutingId(id).subscribe(result => {

        console.log(result);
        if (result.status === 202) {
          this.getBankByLiveApi(id); // look by Live api.
        } else {
          const data =  result.data as any;
          this.bankModel = {
            address: data.address,
            telephone: data.telephone,
            city: data.city,
            bankName: data.bankName,
            routingNumber : data.routingNumber
          };
        }

        this.messageAlert = true;

      });

  }

  /* params Routing number, get details form 3rd paty APi */
  getBankByLiveApi(id) {

    this.accountService.getBankByRoutingId(id).subscribe(result => {
      // Fill form from Api Data
      const data  = result as any;
       this.bankModel = {
         address: data.address,
         telephone: data.telephone,
         city: data.city,
         bankName: data.customer_name,
         routingNumber : data.routing_number
       };

     }, err => console.log(err));

  }

  addBank() {
    this.accountService.addBank(this.bankModel).subscribe(result => {
      console.log(result);
      this.ngxModalService.open('bankaddModal');

    }, err => {
      this.toastr.error(err.message);
    });

  }
}
