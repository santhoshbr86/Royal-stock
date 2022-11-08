import { Directive, ElementRef, HostListener, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

   @HostListener('mouseover') onHover() {
    // console.log('hover on tool!!');
    
    this.renderer.setStyle(this.el.nativeElement,'color', 'red');
  }
  @HostListener('mouseleave') onLeave() {
    // console.log('hover on tool!!');
    this.el.nativeElement.style.color = "white";
  }
}
