import { EventEmitter, ElementRef } from '@angular/core';
import { FileUploader } from './FileUploader.class';
export declare class ngf {
    element: ElementRef;
    fileElm: any;
    fileDropDisabled: boolean;
    selectable: boolean;
    ref: any;
    refChange: EventEmitter<ngf>;
    uploader: FileUploader;
    fileUrl: string;
    fileUrlChange: EventEmitter<string>;
    file: File;
    fileChange: EventEmitter<File>;
    files: File[];
    filesChange: EventEmitter<File[]>;
    constructor(element: ElementRef);
    ngOnInit(): void;
    enableSelecting(): void;
    getOptions(): any;
    getFilters(): any;
    handleFiles(files: File[]): void;
    changeFn(event: any): void;
    clickHandler(evt: any): boolean;
    isEmptyAfterSelection(): boolean;
    protected _getTransfer(event: any): any;
    protected _preventAndStop(event: any): any;
    protected _haveFiles(types: any): any;
}
