"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var doc_event_help_functions_1 = require("./doc-event-help.functions");
var FileUploader_class_1 = require("./FileUploader.class");
var ngf = /** @class */ (function () {
    function ngf(element) {
        this.element = element;
        this.fileDropDisabled = false;
        this.selectable = false;
        this.refChange = new core_1.EventEmitter();
        this.uploader = new FileUploader_class_1.FileUploader({});
        this.lastInvalids = [];
        this.lastInvalidsChange = new core_1.EventEmitter();
        this.fileUrlChange = new core_1.EventEmitter();
        this.fileChange = new core_1.EventEmitter();
        this.filesChange = new core_1.EventEmitter();
    }
    ngf.prototype.ngOnInit = function () {
        var _this = this;
        if (this.selectable) {
            this.enableSelecting();
        }
        if (this.accept) {
            this.uploader.options.accept = this.accept;
            this.paramFileElm().setAttribute('accept', this.accept);
        }
        if (this.maxSize) {
            this.uploader.options.maxFileSize = this.maxSize;
        }
        if (this.forceFilename) {
            this.uploader.options.forceFilename = this.forceFilename;
        }
        //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(function () { return _this.refChange.emit(_this); }, 0);
    };
    ngf.prototype.paramFileElm = function () {
        if (this.fileElm)
            return this.fileElm; //already defined
        //elm is a file input
        var isFile = doc_event_help_functions_1.isFileInput(this.element.nativeElement);
        if (isFile)
            return this.fileElm = this.element.nativeElement;
        //create foo file input
        var label = doc_event_help_functions_1.createInvisibleFileInputWrap();
        this.fileElm = label.getElementsByTagName('input')[0];
        this.fileElm.addEventListener('change', this.changeFn.bind(this));
        this.element.nativeElement.appendChild(label);
        return this.fileElm;
    };
    ngf.prototype.enableSelecting = function () {
        var elm = this.element.nativeElement;
        var bindedHandler = this.clickHandler.bind(this);
        elm.addEventListener('click', bindedHandler);
        elm.addEventListener('touchstart', bindedHandler);
        elm.addEventListener('touchend', bindedHandler);
    };
    ngf.prototype.getOptions = function () {
        return this.uploader.options;
    };
    ngf.prototype.getFilters = function () {
        return {};
    };
    ngf.prototype.handleFiles = function (files) {
        var _this = this;
        var valids = this.uploader.getValidFiles(files);
        if (files.length != valids.length) {
            this.lastInvalids = this.uploader.getInvalidFiles(files);
            this.lastInvalidsChange.emit(this.lastInvalids);
        }
        else {
            this.lastInvalids = null;
        }
        if (valids.length) {
            this.uploader.addToQueue(valids);
            this.filesChange.emit(this.files = valids);
            if (valids.length) {
                this.fileChange.emit(this.file = valids[0]);
                if (this.fileUrlChange.observers.length) {
                    this.uploader.dataUrl(valids[0])
                        .then(function (url) { return _this.fileUrlChange.emit(url); });
                }
            }
        }
        if (this.isEmptyAfterSelection()) {
            this.element.nativeElement.value = '';
        }
    };
    ngf.prototype.changeFn = function (event) {
        var fileList = event.__files_ || (event.target && event.target.files), files = [];
        if (!fileList)
            return;
        this.stopEvent(event);
        this.handleFiles(fileList);
    };
    ngf.prototype.clickHandler = function (evt) {
        var elm = this.element.nativeElement;
        if (elm.getAttribute('disabled') || this.fileDropDisabled)
            return false;
        var r = doc_event_help_functions_1.detectSwipe(evt);
        // prevent the click if it is a swipe
        if (r != null)
            return r;
        this.fileElm.click();
        return false;
    };
    ngf.prototype.isEmptyAfterSelection = function () {
        return !!this.element.nativeElement.attributes.multiple;
    };
    ngf.prototype.eventToTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    };
    ngf.prototype.stopEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    ngf.prototype.transferHasFiles = function (transfer) {
        if (!transfer.types) {
            return false;
        }
        if (transfer.types.indexOf) {
            return transfer.types.indexOf('Files') !== -1;
        }
        else if (transfer.types.contains) {
            return transfer.types.contains('Files');
        }
        else {
            return false;
        }
    };
    ngf.prototype.eventToFiles = function (event) {
        var transfer = this.eventToTransfer(event);
        if (transfer.files && transfer.files.length)
            return transfer.files;
        if (transfer.items && transfer.items.length)
            return transfer.items;
        return [];
    };
    ngf.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngf]' },] },
    ];
    /** @nocollapse */
    ngf.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    ngf.propDecorators = {
        'accept': [{ type: core_1.Input },],
        'maxSize': [{ type: core_1.Input },],
        'forceFilename': [{ type: core_1.Input },],
        'fileDropDisabled': [{ type: core_1.Input },],
        'selectable': [{ type: core_1.Input },],
        'ref': [{ type: core_1.Input, args: ['ngf',] },],
        'refChange': [{ type: core_1.Output, args: ['ngfChange',] },],
        'uploader': [{ type: core_1.Input },],
        'lastInvalids': [{ type: core_1.Input },],
        'lastInvalidsChange': [{ type: core_1.Output },],
        'fileUrl': [{ type: core_1.Input },],
        'fileUrlChange': [{ type: core_1.Output },],
        'file': [{ type: core_1.Input },],
        'fileChange': [{ type: core_1.Output },],
        'files': [{ type: core_1.Input },],
        'filesChange': [{ type: core_1.Output },],
    };
    return ngf;
}());
exports.ngf = ngf;
