import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { createInvisibleFileInputWrap, isFileInput, detectSwipe } from "./doc-event-help.functions"
import { FileUploader } from './FileUploader.class';
import { ngf } from "./ngf.directive"

@Directive({selector: '[ngfDrop]'})
export class ngfDrop extends ngf {
  @Input('ngfDrop') ref:ngfDrop
  @Output('ngfDropChange') refChange:EventEmitter<ngfDrop> = new EventEmitter()  
  @Output() fileOver:EventEmitter<any> = new EventEmitter();

  @HostListener('drop', ['$event'])
  onDrop(event:any):void {
    let transfer = this._getTransfer(event);
    if (!transfer) {
      return;
    }

    this._preventAndStop(event);
    this.handleFiles(transfer.files)
  }

  handleFiles(files:File[]){
    this.fileOver.emit(false);
    super.handleFiles(files)
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event:any):void {
    let transfer = this._getTransfer(event);
    if (!this._haveFiles(transfer.types)) {
      return;
    }

    transfer.dropEffect = 'copy';
    this._preventAndStop(event);
    this.fileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event:any):any {
    if ((this as any).element) {
      if (event.currentTarget === (this as any).element[0]) {
        return;
      }
    }

    this._preventAndStop(event);
    this.fileOver.emit(false);
  }
}