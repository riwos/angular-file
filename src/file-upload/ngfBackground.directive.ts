import { Directive, ElementRef, Input } from '@angular/core';
import { FileUploader } from './FileUploader.class';

@Directive({selector: '[ngfBackground]'})
export class ngfBackground {
  @Input('ngfBackground') file:any

  constructor(public ElementRef:ElementRef){}

  ngOnChanges(changes:any){
    new FileUploader().dataUrl(this.file)
    .then( (src:any)=>this.ElementRef.nativeElement.style.backgroundImage = 'url(\'' + (src || '') + '\')' )
  }
}
