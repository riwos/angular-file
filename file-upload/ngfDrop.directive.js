"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var doc_event_help_functions_1 = require("./doc-event-help.functions");
var FileUploader_class_1 = require("./FileUploader.class");
var ngf_directive_1 = require("./ngf.directive");
var ngfDrop = /** @class */ (function (_super) {
    __extends(ngfDrop, _super);
    function ngfDrop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ngfDrop.prototype.onDrop = function (event) {
        this.closeDrags();
        var files = this.eventToFiles(event);
        if (!files.length)
            return;
        this.stopEvent(event);
        this.handleFiles(files);
    };
    ngfDrop.prototype.handleFiles = function (files) {
        this.fileOver.emit(false); //turn-off dragover
        _super.prototype.handleFiles.call(this, files);
    };
    ngfDrop.prototype.onDragOver = function (event) {
        var transfer = this.eventToTransfer(event);
        var hasFiles = this.transferHasFiles(transfer);
        var files = this.eventToFiles(event);
        //IE11 does NOT tell you about dragged files. Always 0 files
        //if(!files.length)return
        this.validDrag = this.uploader.isFilesValid(files);
        this.validDragChange.emit(this.validDrag);
        this.invalidDrag = !this.validDrag;
        this.invalidDragChange.emit(this.invalidDrag);
        this.eventToTransfer(event).dropEffect = 'copy';
        this.stopEvent(event);
        this.fileOver.emit(true);
    };
    ngfDrop.prototype.closeDrags = function () {
        this.validDrag = false;
        this.validDragChange.emit(this.validDrag);
        this.invalidDrag = false;
        this.invalidDragChange.emit(this.invalidDrag);
    };
    ngfDrop.prototype.onDragLeave = function (event) {
        this.closeDrags();
        if (this.element) {
            if (event.currentTarget === this.element[0]) {
                return;
            }
        }
        this.stopEvent(event);
        this.fileOver.emit(false);
    };
    return ngfDrop;
}(ngf_directive_1.ngf));
exports.ngfDrop = ngfDrop;
