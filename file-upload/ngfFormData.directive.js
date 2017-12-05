"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FileUploader_class_1 = require("./FileUploader.class");
var FileItem_class_1 = require("./FileItem.class");
var ngfFormData = /** @class */ (function () {
    function ngfFormData(IterableDiffers) {
        this.differ = IterableDiffers.find([]).create(null);
    }
    ngfFormData.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.files);
        if (changes) {
            setTimeout(function () { return _this.buildFormData(); }, 0);
        }
    };
    ngfFormData.prototype.buildFormData = function () {
        var _this = this;
        var isArray = typeof (this.files) === 'object' && this.files.constructor === Array;
        if (isArray) {
            this.FormData = new FormData();
            this.files.forEach(function (file) { return _this.FormData.append(_this.postName, file, _this.fileName || file.name); });
            this.FormDataChange.emit(this.FormData);
        }
        else {
            delete this.FormData;
        }
    };
    return ngfFormData;
}());
exports.ngfFormData = ngfFormData;
