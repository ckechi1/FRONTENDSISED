import { Component } from '@angular/core';
import { SideNavService } from '../app/shared/side-nav.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title : " SISED" ;

  ngOnInit() {
  }

  constructor(private sidenavService : SideNavService){}

  public clickMenu(){
    this.sidenavService.toggle();
  }

}

