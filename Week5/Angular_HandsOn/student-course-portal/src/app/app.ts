import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { LoadingService } from './services/loading';

@Component({
  selector:'app-root',
  standalone:true,
  imports:[
    CommonModule,
    RouterOutlet,
    Header
  ],
  templateUrl:'./app.html',
  styleUrl:'./app.css'
})

export class AppComponent{
  constructor(public loadingService: LoadingService) {}
}
