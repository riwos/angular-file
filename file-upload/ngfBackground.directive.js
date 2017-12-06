"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FileUploader_class_1 = require("./FileUploader.class");
var ngfBackground = (function () {
    function ngfBackground(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngfBackground.prototype.ngOnChanges = function (changes) {
        var _this = this;
        new FileUploader_class_1.FileUploader().dataUrl(this.file)
            .then(function (src) { return _this.ElementRef.nativeElement.style.backgroundImage = 'url(\'' + (src || '') + '\')'; });
    };
    ngfBackground.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngfBackground]' },] },
    ];
    /** @nocollapse */
    ngfBackground.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    ngfBackground.propDecorators = {
        "file": [{ type: core_1.Input, args: ['ngfBackground',] },],
    };
    return ngfBackground;
}());
exports.ngfBackground = ngfBackground;
