import { EventEmitter } from '@angular/core';
import { ngf } from "./ngf.directive";
export declare class ngfDrop extends ngf {
    ref: ngfDrop;
    refChange: EventEmitter<ngfDrop>;
    fileOver: EventEmitter<any>;
    validDrag: boolean;
    validDragChange: EventEmitter<boolean>;
    invalidDrag: boolean;
    invalidDragChange: EventEmitter<boolean>;
    dragFiles: File[];
    dragFilesChange: EventEmitter<File[]>;
    onDrop(event: Event): void;
    handleFiles(files: File[]): void;
    onDragOver(event: Event): void;
    /** browsers try hard to conceal data about file drags, this tends to undo that */
    filesToWriteableObject(files: File[]): any[];
    closeDrags(): void;
    onDragLeave(event: Event): any;
}
