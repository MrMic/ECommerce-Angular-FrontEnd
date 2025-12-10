import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Luv2ShopFormService {
  // ______________________________________________________________________
  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    //INFO:             ╭──────────────────────────────────────────────────╮
    //INFO:             │     Build an array for "Month" dropdown list     │
    //INFO:             │ - start at the current month and loop until Dec. │
    //INFO:             ╰──────────────────────────────────────────────────╯
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  // ______________________________________________________________________
  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];

    //INFO:          ╭────────────────────────────────────────────────────────╮
    //INFO:          │        Build an array for "Year" dropdown list         │
    //INFO:          │ - Start at the current year and loop for next 10 years │
    //INFO:          ╰────────────────────────────────────────────────────────╯

    let startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
