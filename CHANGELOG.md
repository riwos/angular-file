# angular-file - Change Log
All notable changes to this project will be documented here.

## [0.3.3] - 2017-10-02
- fixed IE11 dragdrop issue

## [0.3.0] - 2017-10-02
### Breaking Changes
- [(files)] is now a default blank array . May cause issues if you have *ngIf="files" instead of *ngIf="files.length"
- removed useNgHttp from ngfUploader and no longer depend on angular/http
- ngf, ngfSelect, and ngfDrop no longer reset the [(files)]. They always append new files
### Added
- ngfUploadStatus

## [0.2.0] - 2017-10-02
### Breaking Changes
- FileUploader isHtml5Mode has been removed
### Added
- ngfUploader

## [0.1.0] - 2017-08-31
### Breaking Changes
- fileUrl is now lastBaseUrl

## [0.0.0] - 2017-08-31
### Overhauled by Acker
- Taken from an outdated barely usable package to an up-to-date slimmed down easier to develop version
## Added
- uploader.getFormData()

