"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var ngfBackground_directive_1 = require("./ngfBackground.directive");
var ngfDrop_directive_1 = require("./ngfDrop.directive");
var ngf_directive_1 = require("./ngf.directive");
var ngfSelect_directive_1 = require("./ngfSelect.directive");
var ngfUploader_directive_1 = require("./ngfUploader.directive");
var ngfUploadStatus_directive_1 = require("./ngfUploadStatus.directive");
var ngfFormData_directive_1 = require("./ngfFormData.directive");
//import{ HttpModule } from '@angular/http';
var declarations = [
    ngfDrop_directive_1.ngfDrop,
    ngfSelect_directive_1.ngfSelect,
    ngfBackground_directive_1.ngfBackground,
    ngfUploader_directive_1.ngfUploader,
    ngfUploadStatus_directive_1.ngfUploadStatus,
    ngfFormData_directive_1.ngfFormData,
    ngf_directive_1.ngf
];
var ngfModule = /** @class */ (function () {
    function ngfModule() {
    }
    return ngfModule;
}());
exports.ngfModule = ngfModule;
