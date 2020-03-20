import { Component, OnInit } from '@angular/core';
import { ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SideNavService } from '../shared/side-nav.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isloggedin=true;
  token?:string;
  opened = true;
  @ViewChild('sidenav', { static: true }) sidenav: MatSidenav;

   constructor(private sidenavService : SideNavService){ }

  ngOnInit() {

    this.sidenavService.sidenavToggleBsubject.subscribe(() => { this.sidenav.toggle(); });

    // console.log(window.innerWidth)
    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.opened = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }


}


