import { Directive, EventEmitter, ElementRef, Input, Output } from '@angular/core';
import { createInvisibleFileInputWrap, isFileInput, detectSwipe } from "./doc-event-help.functions"
import { FileUploader } from './FileUploader.class';

@Directive({selector: '[ngf]'})
export class ngf {
  fileElm:any
  @Input() fileDropDisabled=false
  @Input() selectable = false
  @Input('ngf') ref:any
  @Output('ngfChange') refChange:EventEmitter<ngf> = new EventEmitter()  
  @Input() uploader:FileUploader = new FileUploader({});
  
  @Input() fileUrl:string//last file uploaded url
  @Output() fileUrlChange:EventEmitter<string> = new EventEmitter()
  
  @Input() file:File//last file uploaded
  @Output() fileChange:EventEmitter<File> = new EventEmitter()

  @Input() files:File[]
  @Output() filesChange:EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor(public element:ElementRef){}

  ngOnInit(){
    if(this.selectable)this.enableSelecting()
    //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(()=>this.refChange.emit(this), 0)
  }

  enableSelecting(){
    let elm = this.element.nativeElement
    const isFile = isFileInput(elm)
    let fileElm = isFile ? elm : createInvisibleFileInputWrap()

    fileElm.addEventListener('change', this.changeFn.bind(this));

    if(!isFile){
      this.fileElm = fileElm
      this.element.nativeElement.appendChild( fileElm )
    }
    const bindedHandler = this.clickHandler.bind(this)
    elm.addEventListener('click', bindedHandler)
    elm.addEventListener('touchstart', bindedHandler)
    elm.addEventListener('touchend', bindedHandler)
  }

  getOptions():any {
    return this.uploader.options;
  }

  getFilters():any {
    return {};
  }

  handleFiles(files:File[]){
    this.uploader.addToQueue(files);
    this.filesChange.emit( this.files=files );
    
    if(files.length){
      this.fileChange.emit( this.file=files[0] )

      if(this.fileUrlChange.observers.length){
        this.uploader.dataUrl( files[0] )
        .then( (url:any)=>this.fileUrlChange.emit(url) )
      }
    }

    if (this.isEmptyAfterSelection()) {
      this.element.nativeElement.value = '';
    }
  }

  changeFn(event:any) {
    var fileList = event.__files_ || (event.target && event.target.files), files = [];

    if (!fileList) return;

    this._preventAndStop(event);
    this.handleFiles(fileList)
  }

  clickHandler(evt:any){
    const elm = this.element.nativeElement
    if (elm.getAttribute('disabled') || this.fileDropDisabled) return false;
    
    var r = detectSwipe(evt);
    // prevent the click if it is a swipe
    if (r != null) return r;

    this.fileElm.click();

    return false;
  }

  isEmptyAfterSelection():boolean {
    return !!this.element.nativeElement.attributes.multiple;
  }

  protected _getTransfer(event:any):any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
  }

  protected _preventAndStop(event:any):any {
    event.preventDefault();
    event.stopPropagation();
  }

  protected _haveFiles(types:any):any {
    if (!types) {
      return false;
    }

    if (types.indexOf) {
      return types.indexOf('Files') !== -1;
    } else if (types.contains) {
      return types.contains('Files');
    } else {
      return false;
    }
  }
}