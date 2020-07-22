import { Component, OnInit } from '@angular/core';
//This component is used to create a navigation bar in our home page

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  appTitle: string ="F1";

  constructor() { }

  ngOnInit(): void {
  }

}
