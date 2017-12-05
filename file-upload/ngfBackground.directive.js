"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FileUploader_class_1 = require("./FileUploader.class");
var ngfBackground = /** @class */ (function () {
    function ngfBackground(ElementRef) {
        this.ElementRef = ElementRef;
    }
    ngfBackground.prototype.ngOnChanges = function (changes) {
        var _this = this;
        new FileUploader_class_1.FileUploader().dataUrl(this.file)
            .then(function (src) { return _this.ElementRef.nativeElement.style.backgroundImage = 'url(\'' + (src || '') + '\')'; });
    };
    return ngfBackground;
}());
exports.ngfBackground = ngfBackground;
