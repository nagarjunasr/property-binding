import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h2>A small gui based on property binding,we have 2 buttons one for the flower and other for a desert by clicking any of two buttons you see the respective thing</h2>
    <h1 [textContent]="'Type: ' + person.Type"></h1>

    <button (click)="person = male" [disabled]="person.sex=='m'">Desert</button>
    <button (click)="person = female" [disabled]="person.sex=='f'">Flower</button>

    <p><img [src]="person.photo" [alt]="person.name" [title]="person.name"></p>
    <p [hidden]="!person.rating">
      Rating: <span [innerHTML]="'&#10032;'.repeat(person.rating)"></span>
    </p>`
})
export class AppComponent {
  female = {
    Type: 'Flower',
    sex: 'f',
    rating: 4,
    photo: 'images/leela.jpg'
  };
  male = {
    Type: 'Desert',
    sex: 'm',
    photo: 'images/fry.jpg'
  };
  person: any = this.female;
}

