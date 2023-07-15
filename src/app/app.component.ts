import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-reactive-imperative';
  programming:string = 'Imperative';

  handleClick(e:string){
    this.programming = e;
  }
}
