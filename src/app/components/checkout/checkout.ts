import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';
import { Luv2ShopValidators } from '../../validators/luv2-shop-validators';

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
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace,
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace,
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Luv2ShopValidators.notOnlyWhitespace,
        ]),
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

  // INFO: GETTERS ________________________________________________________
  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }
  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }
  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }
  // ______________________________________________________________________
  get shippingAddressStreet() {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity() {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState() {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode() {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry() {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  // ______________________________________________________________________
  copyShippingAddressToBillingAddress(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target?.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value,
      );

      // FIX: Fix for state
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      // FIX: Fix for state
      this.billingAddressStates = [];
    }
  }

  // ______________________________________________________________________
  onSubmit() {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log('Handling ths submit group');
    console.log(this.checkoutFormGroup.get('customer')?.value);

    console.log(
      'The shipping address country is: ' +
        this.checkoutFormGroup.get('shippingAddress')?.value.country.name,
    );
    console.log(
      'The shipping address state is: ' +
        this.checkoutFormGroup.get('shippingAddress')?.value.state.name,
    );
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
