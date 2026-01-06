import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  // *INFO: CONSTRUCTOR __________________________________________________
  constructor(
    private formBuilder: FormBuilder,
    private luv2ShopFormService: Luv2ShopFormService,
  ) {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // INFO: populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log('startMonth: ' + startMonth);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe((data: number[]) => {
      console.log('🪚 Retrieved credit card months:', JSON.stringify(data));
      // console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    // INFO: populate credit card years
    this.luv2ShopFormService.getCreditCardYears().subscribe((data: number[]) => {
      console.log('Retrieved credit card years: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    // INFO: populate countries
    this.luv2ShopFormService.getCountries().subscribe((data) => {
      console.log('Retrieved countries' + JSON.stringify(data));
      this.countries = data;
    });
  }

  // ______________________________________________________________________
  copyShippingAddressToBillingAddress(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target?.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value,
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  // ______________________________________________________________________
  onSubmit() {
    console.log('Handling ths submit group');
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

  // ______________________________________________________________________
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if (currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe((data: number[]) => {
      console.log('Retrieved credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  // ______________________________________________________________________
  getStates(FormGroupName: string) {
    const FormGroup = this.checkoutFormGroup.get(FormGroupName);

    const countryCode = FormGroup?.value.country.code;
    const countryName = FormGroup?.value.country.name;

    console.log(`{FormGroupName} country code : ${countryCode}`);
    console.log(`{FormGroupName} country name: ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe((data) => {
      if (FormGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      // select first item by default
      FormGroup?.get('state')?.setValue(data[0]);
    });
  }
}
