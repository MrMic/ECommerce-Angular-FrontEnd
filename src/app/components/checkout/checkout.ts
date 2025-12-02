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
        cardType: [""],
        nameOnCard: [""],
        cardNumber: [""],
        securityCode: [""],
        expirationMonth: [""],
        expirationYear: [""],
      }),
      creditCard: this.formBuilder.group({
        street: [""],
        city: [""],
        state: [""],
        country: [""],
        zipCode: [""],
      })
    });
  }

  // ______________________________________________________________________
  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get("customer")?.value);
    console.log("Email is: " + this.checkoutFormGroup.get("customer")?.value.email);
  }
}
