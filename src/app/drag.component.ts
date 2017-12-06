import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';

const draggableHeight = 50;
const draggableWidth = 100;

@Component({
  selector: 'my-app',//two classes are designed in the template container box,and draggable box 
  template: `
    <h1>Drag 'n Drop</h1>
    <div #container
         class="container"
         (mousemove)="onMouseMove($event)">
      <div #draggable
           class="draggable"
           (mousedown)="onMouseButton($event)"
           (mouseup)="onMouseButton($event)">
      </div>
    </div>`,// to create html draggable element,on mousemove event is fired when a pointer is moved over an element,mousedown event is fired when a pointing device is pressed on an element,mouseup element is fired when a pointer is released over an element
  styles: [`
    .container {
      height: 300px;
      width: 300px;
      background-color: brown;
    }
    .draggable {
      height: 50px;
      width: 100px;
      background-color: black;
      position: absolute;
      cursor: move;
    }
  `]
})

export class AppComponent {

 @ViewChild('container') private containerElement: ElementRef;//@ViewChild() is used to reference the child component from the parent one, decorator can be used to get the first element or the directive matching the selector from the view DOM,In a parent component we can use @ViewChild() for components, directives and template reference variable with ElementRef or TemplateRef
  @ViewChild('draggable') private draggableElement: ElementRef;//To use @ViewChild() we need to pass child component name or directive name or template variable as an argument. 
//container element holds other elements,to select an element in component element or DOM element we use ElementRef 
  boundary: any = {};
  draggable: any;
  isMouseDown = false;

  constructor(private renderer: Renderer2) {//renderer  means provide,both renderer and elementbyRef both are used for DOM manipulation,we often use renderer2 in custom directives 
  }

  ngOnInit() {//ngOninit is called once the component is initialized
    this.draggable = this.draggableElement.nativeElement;

    const container = this.containerElement.nativeElement;
    this.boundary = {//this is used to refer instance of the class,this is also used in method invocation and function invocation , method invocation(Object.Method() this used inside a method refers to obnject) 
      left: container.offsetLeft + (draggableWidth / 2),
      right: container.clientWidth + container.offsetLeft - (draggableWidth / 2),
      top: container.offsetTop + (draggableHeight / 2),
      bottom: container.clientWidth + container.offsetTop - (draggableHeight / 2),
    };
  }

  onMouseButton(event: MouseEvent): void {
    this.isMouseDown = event.buttons === 1;
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isMouseDown && this.isInsideBoundary(event)) {
      this.renderer.setStyle(this.draggable, 'left', event.clientX - (draggableWidth / 2) + 'px');
      this.renderer.setStyle(this.draggable, 'top', event.clientY - (draggableHeight / 2) + 'px');
    }
  }

  isInsideBoundary(event: MouseEvent) {
    return event.clientX > this.boundary.left &&
      event.clientX < this.boundary.right &&
      event.clientY > this.boundary.top &&
      event.clientY < this.boundary.bottom;
  }
}
