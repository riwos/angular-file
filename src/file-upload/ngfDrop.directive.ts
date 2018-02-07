import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { createInvisibleFileInputWrap, isFileInput, detectSwipe } from "./doc-event-help.functions"
import { ngf } from "./ngf.directive"

@Directive({selector: '[ngfDrop]'})
export class ngfDrop extends ngf {
  @Input('ngfDrop') ref:ngfDrop
  @Output('ngfDropChange') refChange:EventEmitter<ngfDrop> = new EventEmitter()  
  @Output() fileOver:EventEmitter<any> = new EventEmitter();

  @Input() validDrag:boolean = false
  @Output() validDragChange:EventEmitter<boolean> = new EventEmitter()

  @Input() invalidDrag = false
  @Output() invalidDragChange:EventEmitter<boolean> = new EventEmitter()

  @Input() dragFiles:File[]
  @Output() dragFilesChange:EventEmitter<File[]> = new EventEmitter()

  @HostListener('drop', ['$event'])
  onDrop(event:Event):void {
    this.closeDrags()
    let files = this.eventToFiles(event)

    if(!files.length)return

    this.stopEvent(event);
    this.handleFiles(files)
  }

  handleFiles(files:File[]){
    this.fileOver.emit(false)//turn-off dragover
    super.handleFiles(files)
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event:Event):void {
    const transfer = this.eventToTransfer(event)
    const hasFiles = this.transferHasFiles(transfer)

    let files = this.eventToFiles(event)

    let jsonFiles = this.filesToWriteableObject(files)
    this.dragFilesChange.emit(this.dragFiles=jsonFiles)

    if( files.length ){
      this.validDrag = this.isFilesValid(files)
    }else{
      //Safari, IE11 & some browsers do NOT tell you about dragged files until dropped. Always consider a valid drag
      this.validDrag = true
    }

    this.validDragChange.emit(this.validDrag)

    this.invalidDrag = !this.validDrag
    this.invalidDragChange.emit(this.invalidDrag)

    transfer.dropEffect = 'copy'//change cursor and such
    this.stopEvent(event)
    this.fileOver.emit(true)
  }

  /** browsers try hard to conceal data about file drags, this tends to undo that */
  filesToWriteableObject( files:File[] ){
    const jsonFiles = []
    for(let x=0; x < files.length; ++x){
      jsonFiles.push({
        type:files[x].type,
        kind:files[x]["kind"]
      })
    }
    return jsonFiles
  }

  closeDrags(){
    this.validDrag = null
    this.validDragChange.emit(this.validDrag)
    this.invalidDrag = false
    this.invalidDragChange.emit(this.invalidDrag)
    this.dragFilesChange.emit(this.dragFiles=null)
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event:Event):any {
    this.closeDrags()

    if ((this as any).element) {
      if (event.currentTarget === (this as any).element[0]) {
        return;
      }
    }

    this.stopEvent(event);
    this.fileOver.emit(false);
  }
}