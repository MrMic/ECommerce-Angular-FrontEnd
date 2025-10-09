import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductList } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductList, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('angular-ecommerce');
}
