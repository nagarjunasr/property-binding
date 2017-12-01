import {Component} from '@angular/core';
@Component({
    moduleId:module.id,
    selector:'my-app',
    template:`
  <div class="container">
     <input [(ngModel)]='name' />
      <br/>
      <h1>{{name}}</h1>
  </div>
  `
})
export class AppComponent{
