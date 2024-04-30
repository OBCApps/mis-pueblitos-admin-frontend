"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.SelectorFotoNegocioComponent = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var flowbite_1 = require("flowbite");
var SelectorFotoNegocioComponent = /** @class */ (function () {
    function SelectorFotoNegocioComponent(modalService, platformId) {
        var _this = this;
        this.modalService = modalService;
        this.platformId = platformId;
        this.responseModal = new core_1.EventEmitter();
        this.modalService.modalState$.subscribe(function (option) {
            console.log('option option foto', option);
            _this.activate_modal(option.option);
            _this.valueInput = option.valueInput;
        });
    }
    SelectorFotoNegocioComponent.prototype.activate_modal = function (option) {
        if (option == 'close') {
            this.Modal.hide();
        }
        else if (option == 'open') {
            this.create_modal();
        }
    };
    SelectorFotoNegocioComponent.prototype.create_modal = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            var $targetEl = document.getElementById('selectorFoto-modal');
            var options = {
                placement: 'bottom-right',
                backdrop: 'dynamic',
                closable: true,
                onHide: function () {
                    console.log('modal is hidden');
                },
                onShow: function () {
                    console.log('modal is shown');
                },
                onToggle: function () {
                    console.log('modal has been toggled');
                }
            };
            var instanceOptions = {
                id: 'selectorFoto-modal',
                override: true
            };
            this.Modal = new flowbite_1.Modal($targetEl, options, instanceOptions);
            this.Modal.show();
        }
    };
    SelectorFotoNegocioComponent.prototype.handleFileSelect = function (event) {
        this.file = event.target.files[0];
        console.log('file', this.file);
    };
    SelectorFotoNegocioComponent.prototype.upload_file = function () {
        var _this = this;
        console.log('valueInput', this.valueInput.id);
        this.modalService.uploadFoto(this.valueInput.id, this.file, this.valueInput.type).subscribe(function (response) {
            console.log('response', response);
            _this.responseModal.emit(response);
            _this.Modal.hide();
        }, function (error) {
            console.log('error', error.error.message);
            if (error.error.message == "No se pueden subir más fotos") {
                alert('Excedió el límite de fotos permitidas');
            }
            else {
                alert('Error al subir la foto');
            }
            _this.responseModal.emit(null);
            _this.Modal.hide();
        });
    };
    __decorate([
        core_1.Output()
    ], SelectorFotoNegocioComponent.prototype, "responseModal");
    SelectorFotoNegocioComponent = __decorate([
        core_1.Component({
            selector: 'app-selector-foto-negocio',
            standalone: true,
            imports: [forms_1.FormsModule, http_1.HttpClientModule],
            templateUrl: './selector-foto-negocio.component.html',
            styleUrl: './selector-foto-negocio.component.scss'
        }),
        __param(1, core_1.Inject(core_1.PLATFORM_ID))
    ], SelectorFotoNegocioComponent);
    return SelectorFotoNegocioComponent;
}());
exports.SelectorFotoNegocioComponent = SelectorFotoNegocioComponent;
