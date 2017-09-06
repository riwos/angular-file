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
var ngf_directive_1 = require("./ngf.directive");
var ngfDrop = /** @class */ (function (_super) {
    __extends(ngfDrop, _super);
    function ngfDrop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.refChange = new core_1.EventEmitter();
        _this.fileOver = new core_1.EventEmitter();
        return _this;
    }
    ngfDrop.prototype.onDrop = function (event) {
        var transfer = this._getTransfer(event);
        if (!transfer) {
            return;
        }
        this._preventAndStop(event);
        this.handleFiles(transfer.files);
    };
    ngfDrop.prototype.handleFiles = function (files) {
        this.fileOver.emit(false);
        _super.prototype.handleFiles.call(this, files);
    };
    ngfDrop.prototype.onDragOver = function (event) {
        var transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
            return;
        }
        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        this.fileOver.emit(true);
    };
    ngfDrop.prototype.onDragLeave = function (event) {
        if (this.element) {
            if (event.currentTarget === this.element[0]) {
                return;
            }
        }
        this._preventAndStop(event);
        this.fileOver.emit(false);
    };
    ngfDrop.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngfDrop]' },] },
    ];
    /** @nocollapse */
    ngfDrop.ctorParameters = function () { return []; };
    ngfDrop.propDecorators = {
        'ref': [{ type: core_1.Input, args: ['ngfDrop',] },],
        'refChange': [{ type: core_1.Output, args: ['ngfDropChange',] },],
        'fileOver': [{ type: core_1.Output },],
        'onDrop': [{ type: core_1.HostListener, args: ['drop', ['$event'],] },],
        'onDragOver': [{ type: core_1.HostListener, args: ['dragover', ['$event'],] },],
        'onDragLeave': [{ type: core_1.HostListener, args: ['dragleave', ['$event'],] },],
    };
    return ngfDrop;
}(ngf_directive_1.ngf));
exports.ngfDrop = ngfDrop;
