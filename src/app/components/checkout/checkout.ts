import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./checkout.html",
  styleUrl: "./checkout.css",
})
export class Checkout {
  checkoutFormGroup: FormGroup;

  // * INFO: CONSTRUCTOR __________________________________________________
  constructor(private formBuilder: FormBuilder) {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [""],
        lastName: [""],
        email: [""],
      }),
      shippingAddress: this.formBuilder.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipCode: [""],
      }),
      billingAddress: this.formBuilder.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipCode: [""],
      }),
      creditCard: this.formBuilder.group({
        cardType: [""],
        nameOnCard: [""],
        cardNumber: [""],
        securityCode: [""],
        expirationMonth: [""],
        expirationYear: [""],
      }),
    });
  }

  // ______________________________________________________________________
  copyShippingAddressToBillingAddress(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target?.checked) {
      this.checkoutFormGroup.controls["billingAddress"].setValue(
        this.checkoutFormGroup.controls["shippingAddress"].value);
    } else {
      this.checkoutFormGroup.controls["billingAddress"].reset();
    }
  }

  // ______________________________________________________________________
  onSubmit() {
    console.log("Handling ths submit group");
    console.log(this.checkoutFormGroup.get("customer")?.value);
  }
}
