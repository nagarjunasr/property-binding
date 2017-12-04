import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';

const draggableHeight = 50;
const draggableWidth = 100;

@Component({
  selector: 'app-drag-drop',
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
    </div>`,
  styles: [`
    .container {
      height: 320px;
      width: 320px;
      background-color: LightGray;
    }
    .draggable {
      height: 50px;
      width: 100px;
      background-color: Green;
      position: absolute;
      cursor: move;
    }
  `]
})

export class DragDropComponent implements OnInit {

  @ViewChild('container') private containerElement: ElementRef;
  @ViewChild('draggable') private draggableElement: ElementRef;

  boundary: any = {};
  draggable: any;
  isMouseDown = false;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.draggable = this.draggableElement.nativeElement;

    const container = this.containerElement.nativeElement;
    this.boundary = {
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
