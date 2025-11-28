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

	constructor(private formBuilder: FormBuilder) {
		this.checkoutFormGroup = this.formBuilder.group({
			customer: this.formBuilder.group({
				firstName: [""],
				lastName: [""],
				email: [""],
			}),
		});
	}
}
