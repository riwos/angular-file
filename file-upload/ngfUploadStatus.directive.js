"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FileUploader_class_1 = require("./FileUploader.class");
var FileItem_class_1 = require("./FileItem.class");
var ngfUploadStatus = /** @class */ (function () {
    function ngfUploadStatus() {
    }
    ngfUploadStatus.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.httpEvent && changes.httpEvent.currentValue) {
            var event_1 = changes.httpEvent.currentValue;
            if (event_1.loaded && event_1.total) {
                setTimeout(function () {
                    _this.percent = Math.round(100 * event_1.loaded / event_1.total);
                    _this.percentChange.emit(_this.percent);
                }, 0);
            }
        }
    };
    return ngfUploadStatus;
}());
exports.ngfUploadStatus = ngfUploadStatus;
