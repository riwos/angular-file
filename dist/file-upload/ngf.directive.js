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
        this.fileUrlChange = new core_1.EventEmitter();
        this.fileChange = new core_1.EventEmitter();
        this.filesChange = new core_1.EventEmitter();
    }
    ngf.prototype.ngOnInit = function () {
        var _this = this;
        if (this.selectable)
            this.enableSelecting();
        //create reference to this class with one cycle delay to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(function () { return _this.refChange.emit(_this); }, 0);
    };
    ngf.prototype.enableSelecting = function () {
        var elm = this.element.nativeElement;
        var isFile = doc_event_help_functions_1.isFileInput(elm);
        var fileElm = isFile ? elm : doc_event_help_functions_1.createInvisibleFileInputWrap();
        fileElm.addEventListener('change', this.changeFn.bind(this));
        if (!isFile) {
            this.fileElm = fileElm;
            this.element.nativeElement.appendChild(fileElm);
        }
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
        this.uploader.addToQueue(files);
        this.filesChange.emit(this.files = files);
        if (files.length) {
            this.fileChange.emit(this.file = files[0]);
            if (this.fileUrlChange.observers.length) {
                this.uploader.dataUrl(files[0])
                    .then(function (url) { return _this.fileUrlChange.emit(url); });
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
        this._preventAndStop(event);
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
    ngf.prototype._getTransfer = function (event) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer; // jQuery fix;
    };
    ngf.prototype._preventAndStop = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    ngf.prototype._haveFiles = function (types) {
        if (!types) {
            return false;
        }
        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        }
        else if (types.contains) {
            return types.contains('Files');
        }
        else {
            return false;
        }
    };
    ngf.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngf]' },] },
    ];
    /** @nocollapse */
    ngf.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    ngf.propDecorators = {
        'fileDropDisabled': [{ type: core_1.Input },],
        'selectable': [{ type: core_1.Input },],
        'ref': [{ type: core_1.Input },],
        'refChange': [{ type: core_1.Output },],
        'uploader': [{ type: core_1.Input },],
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
