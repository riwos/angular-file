import { EventEmitter } from '@angular/core';
import { ngf } from "./ngf.directive";
export declare class ngfDrop extends ngf {
    ref: ngfDrop;
    refChange: EventEmitter<ngfDrop>;
    fileOver: EventEmitter<any>;
    onDrop(event: any): void;
    handleFiles(files: File[]): void;
    onDragOver(event: any): void;
    onDragLeave(event: any): any;
}
