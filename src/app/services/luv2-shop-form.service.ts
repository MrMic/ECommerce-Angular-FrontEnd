import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class Luv2ShopFormService {
  private countriesUrl = `http://localhost:8080/api/countries`;
  private statesUrl = `http://localhost:8080/api/states`;

  // ── INFO: CONSTRUCTOR ───────────────────────────────────────────────
  constructor(private httpClient: HttpClient) {}

  // ______________________________________________________________________
  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((response) => response._embedded.countries));
  }

  // ______________________________________________________________________
  getStates(theCountryCode: string): Observable<State[]> {
    const searchStateUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient
      .get<GetResponseStates>(searchStateUrl)
      .pipe(map((response) => response._embedded.states));
  }

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

// ── INFO: INTERFACES ─────────────────────────────────────────────────
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  };
}
