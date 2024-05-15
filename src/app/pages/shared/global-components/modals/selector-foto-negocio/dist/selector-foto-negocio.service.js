"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SelectorFotoNegocioService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_prod_1 = require("../../../../../../environments/environment.prod");
var SelectorFotoNegocioService = /** @class */ (function () {
    function SelectorFotoNegocioService(http) {
        this.http = http;
        this.modalFotoService = new rxjs_1.Subject();
        this.modalState$ = this.modalFotoService.asObservable();
        this.API_SERVER_ADMIN_FOTO = environment_prod_1.API_SERVICE_ADMIN + '/hotel-detalle';
        this.API_SERVER_ADMIN_FOTO_HAB = environment_prod_1.API_SERVICE_ADMIN + '/habitacion';
        this.API_SERVER_ADMIN_FOTO_REST = environment_prod_1.API_SERVICE_ADMIN + '/restaurante';
        this.API_SERVER_ADMIN_FOTO_PLATO = environment_prod_1.API_SERVICE_ADMIN + '/platos';
        this.API_SERVER_ADMIN_FOTO_TOUR = environment_prod_1.API_SERVICE_ADMIN + '/tour';
        this.API_SERVER_ADMIN_FOTO_AGENCIA = environment_prod_1.API_SERVICE_ADMIN + '/agencia';
    }
    SelectorFotoNegocioService.prototype.activateModal = function (option) {
        console.log('option foto', option);
        this.modalFotoService.next(option);
    };
    SelectorFotoNegocioService.prototype.uploadFoto = function (id, data, tipo) {
        var formData = new FormData();
        formData.append('file', data);
        var base_url = tipo == 'HAB'
            ? this.API_SERVER_ADMIN_FOTO_HAB
            : tipo == 'REST'
                ? this.API_SERVER_ADMIN_FOTO_REST
                : tipo == 'PLATO'
                    ? this.API_SERVER_ADMIN_FOTO_PLATO
                    : tipo == 'TOUR'
                        ? this.API_SERVER_ADMIN_FOTO_TOUR
                        : tipo == 'AGENCIA'
                            ? this.API_SERVER_ADMIN_FOTO_AGENCIA
                            : this.API_SERVER_ADMIN_FOTO;
        return this.http
            .post(base_url + '/register-file/' + id, formData)
            .pipe(rxjs_1.map(function (response) {
            return response;
        }));
    };
    SelectorFotoNegocioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SelectorFotoNegocioService);
    return SelectorFotoNegocioService;
}());
exports.SelectorFotoNegocioService = SelectorFotoNegocioService;
