"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.ListHabitacionesComponent = void 0;
var core_1 = require("@angular/core");
var BaseComponents_1 = require("../../../../shared/global-components/BaseComponents");
var common_1 = require("@angular/common");
var FilterHabitacionDto_1 = require("../../models/Filters/FilterHabitacionDto");
var forms_1 = require("@angular/forms");
var DtoHabitacion_1 = require("../../models/Dtos/DtoHabitacion");
var ListHabitacionesComponent = /** @class */ (function (_super) {
    __extends(ListHabitacionesComponent, _super);
    function ListHabitacionesComponent(platformId, router, habitacionService) {
        var _this = _super.call(this) || this;
        _this.platformId = platformId;
        _this.router = router;
        _this.habitacionService = habitacionService;
        _this.filterSearch = new FilterHabitacionDto_1.FilterHabitacionDto();
        return _this;
    }
    ListHabitacionesComponent.prototype.ngOnInit = function () {
        this.loads_storage();
        this.filterSearch = new FilterHabitacionDto_1.FilterHabitacionDto();
        this.coreSearch();
    };
    ListHabitacionesComponent.prototype.coreSearch = function () {
        var _this = this;
        this.filterSearch.pagination = {
            totalRegistros: 10,
            inicio: 1
        };
        this.filterSearch.disponible =
            this.valueInputDisponible == 'true' ? true : this.valueInputDisponible == 'false' ? false : null;
        console.log('this.filterSearch', this.filterSearch);
        this.habitacionService.get_list_filter(this.filterSearch).subscribe(function (response) {
            console.log('response', response);
            _this.filterSearch.resultado = response.resultado;
        }, function (error) { return console.error(error); });
    };
    ListHabitacionesComponent.prototype.loads_storage = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            //this.dtoSelected = JSON.parse(localStorage.getItem('dtoSelected'))
            this.dtoSelected = JSON.parse(sessionStorage.getItem('AuthenticationMisPueblitosAdmin'));
            this.filterSearch.user = 1;
            console.log('this.dtoSelected', this.dtoSelected);
        }
    };
    ListHabitacionesComponent.prototype.coreEdit = function (item) {
        var data = {
            option: 'EDIT',
            data: item
        };
        console.log("data", data);
        localStorage.setItem('dtoSelected', JSON.stringify(data));
        this.router.navigate(['admin', 'habitaciones', 'administrate']);
    };
    ListHabitacionesComponent.prototype.coreDelete = function (item) {
        var _this = this;
        this.habitacionService["delete"](item).subscribe(function (response) {
            _this.filterSearch.resultado = _this.filterSearch.resultado.filter(function (x) { return x.id != item.id; });
        }, function (err) {
        });
    };
    ListHabitacionesComponent.prototype.coreNew = function () {
        var data = {
            option: 'CREATE',
            data: new DtoHabitacion_1.DtoHabitacion()
        };
        localStorage.setItem('dtoSelected', JSON.stringify(data));
        this.router.navigate(['admin', 'hoteles', 'administrate']);
    };
    ListHabitacionesComponent = __decorate([
        core_1.Component({
            selector: 'app-list-habitaciones',
            standalone: true,
            imports: [forms_1.FormsModule],
            templateUrl: './list-habitaciones.component.html',
            styleUrl: './list-habitaciones.component.scss'
        }),
        __param(0, core_1.Inject(core_1.PLATFORM_ID))
    ], ListHabitacionesComponent);
    return ListHabitacionesComponent;
}(BaseComponents_1.BaseComponents));
exports.ListHabitacionesComponent = ListHabitacionesComponent;
