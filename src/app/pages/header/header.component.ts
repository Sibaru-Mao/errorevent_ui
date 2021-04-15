import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  // goHome(){
  //   this.router.navigate(['/home'])
  // }


  goToMaintain(){
    this.router.navigate(['home/maintain'])
    console.log('111111111111111111');
  }
}
