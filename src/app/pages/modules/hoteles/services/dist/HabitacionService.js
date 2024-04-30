"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HabitacionService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var environment_prod_1 = require("../../../../../environments/environment.prod");
var HabitacionService = /** @class */ (function () {
    function HabitacionService(http) {
        this.http = http;
        this.SERVER_HABITACION = environment_prod_1.API_SERVICE_ADMIN + '/habitacion';
    }
    /* get_list(): Observable<any> {
          return this.http.get<any>(this.SERVER_HABITACION + '/list').pipe(
              map((response) => { return response })
          );
      } */
    HabitacionService.prototype.get_by_id = function (id) {
        return this.http.get(this.SERVER_HABITACION + '/' + id).pipe(rxjs_1.map(function (response) {
            return response;
        }));
    };
    HabitacionService.prototype.add_service = function (id, data) {
        return this.http.post(this.SERVER_HABITACION + '/addService/' + id, data).pipe(rxjs_1.map(function (response) {
            return response;
        }));
    };
    HabitacionService.prototype.remove_service = function (id, data) {
        return this.http.post(this.SERVER_HABITACION + '/removeService/' + id, data).pipe(rxjs_1.map(function (response) {
            return response;
        }));
    };
    HabitacionService.prototype.get_list_filter = function (filter) {
        return this.http
            .post(this.SERVER_HABITACION + '/list-filter', filter)
            .pipe(rxjs_1.map(function (response) {
            return response;
        }));
    };
    HabitacionService.prototype.get_info_adicional_by_id = function (id) {
        return this.http
            .get(this.SERVER_HABITACION + '/infoAdicional/' + id)
            .pipe(rxjs_1.map(function (response) {
            return response;
        }));
    };
    HabitacionService.prototype.create = function (data) {
        return this.http
            .post(this.SERVER_HABITACION + '/register', data)
            .pipe(rxjs_1.map(function (response) {
            return response;
        }));
    };
    HabitacionService.prototype.uploadFoto = function (id, data) {
        return this.http
            .post(this.SERVER_HABITACION + '/upload-foto/' + id, data)
            .pipe(rxjs_1.map(function (response) {
            return response;
        }));
    };
    HabitacionService.prototype.update = function (data) {
        return this.http
            .patch(this.SERVER_HABITACION + '/update/' + data.id, data)
            .pipe(rxjs_1.map(function (response) {
            return response;
        }));
    };
    HabitacionService.prototype["delete"] = function (data) {
        return this.http["delete"](this.SERVER_HABITACION + '/delete/' + data.id)
            .pipe(rxjs_1.map(function (response) {
            return response;
        }));
    };
    HabitacionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], HabitacionService);
    return HabitacionService;
}());
exports.HabitacionService = HabitacionService;
