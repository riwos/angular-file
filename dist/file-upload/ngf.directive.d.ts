import { EventEmitter, ElementRef } from '@angular/core';
import { FileUploader } from './FileUploader.class';
export declare class ngf {
    element: ElementRef;
    fileElm: any;
    accept: string;
    maxSize: number;
    forceFilename: string;
    forcePostname: string;
    fileDropDisabled: boolean;
    selectable: boolean;
    ref: ngf;
    refChange: EventEmitter<ngf>;
    uploader: FileUploader;
    lastInvalids: {
        file: File;
        type: string;
    }[];
    lastInvalidsChange: EventEmitter<{
        file: File;
        type: string;
    }[]>;
    fileUrl: string;
    fileUrlChange: EventEmitter<string>;
    file: File;
    fileChange: EventEmitter<File>;
    files: File[];
    filesChange: EventEmitter<File[]>;
    constructor(element: ElementRef);
    ngOnDestroy(): void;
    ngOnInit(): void;
    paramFileElm(): any;
    enableSelecting(): void;
    getOptions(): any;
    getFilters(): any;
    handleFiles(files: File[]): void;
    changeFn(event: any): void;
    clickHandler(evt: any): boolean;
    isEmptyAfterSelection(): boolean;
    eventToTransfer(event: any): any;
    stopEvent(event: any): any;
    transferHasFiles(transfer: any): any;
    eventToFiles(event: Event): any;
}
