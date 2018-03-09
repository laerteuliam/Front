import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
  }
  constructor(private router: Router, private activeRoute: ActivatedRoute) {

  }
}
