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
exports.AdministrateHabitacionesComponent = void 0;
var core_1 = require("@angular/core");
var BaseComponents_1 = require("../../../../shared/global-components/BaseComponents");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var DtoHabitacion_1 = require("../../models/Dtos/DtoHabitacion");
var selector_services_negocio_component_1 = require("../../../../shared/global-components/modals/selector-serviceNegocio/selector-services-negocio.component");
var selector_foto_negocio_component_1 = require("../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.component");
var AdministrateHabitacionesComponent = /** @class */ (function (_super) {
    __extends(AdministrateHabitacionesComponent, _super);
    function AdministrateHabitacionesComponent(platformId, router, habitacionService, selectorServicesNegocio, selectorFotoNegocio) {
        var _this = _super.call(this) || this;
        _this.platformId = platformId;
        _this.router = router;
        _this.habitacionService = habitacionService;
        _this.selectorServicesNegocio = selectorServicesNegocio;
        _this.selectorFotoNegocio = selectorFotoNegocio;
        // ---------------- dto HOTELES VALUE ----------- \\
        _this.HabitacionForm = new DtoHabitacion_1.DtoHabitacion();
        return _this;
    }
    AdministrateHabitacionesComponent.prototype.ngOnInit = function () {
        this.general_loads();
    };
    AdministrateHabitacionesComponent.prototype.general_loads = function () {
        this.loads_storage();
    };
    AdministrateHabitacionesComponent.prototype.loads_storage = function () {
        if (common_1.isPlatformBrowser(this.platformId)) {
            this.dtoSelected = JSON.parse(localStorage.getItem('dtoSelected'));
            this.dtoUserSession = JSON.parse(sessionStorage.getItem('AuthenticationMisPueblitosAdmin'));
            if (this.dtoSelected.option == 'EDIT') {
                this.coreSearchById(this.dtoSelected.data);
            }
            else if (this.dtoSelected.option == 'CREATE') {
                this.HabitacionForm = new DtoHabitacion_1.DtoHabitacion();
            }
        }
    };
    AdministrateHabitacionesComponent.prototype.coreSearchById = function (data) {
        var _this = this;
        this.habitacionService.get_by_id(data.id).subscribe(function (response) {
            console.log('response', response);
            _this.HabitacionForm = response;
            //this.getRedesSociales();
            //this.getInfoAdicional();
        }, function (err) {
            console.log(err);
        });
    };
    AdministrateHabitacionesComponent.prototype.create_nameRoute = function (item) {
        var nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
        this.HabitacionForm.name_route = nameRouteWithoutSpaces;
    };
    AdministrateHabitacionesComponent.prototype.coreRegister = function () {
        this.habitacionService.create(this.HabitacionForm).subscribe(function (_) {
            alert('Se registró correctamente');
        }, function (err) {
            console.log(err);
        });
    };
    AdministrateHabitacionesComponent.prototype.coreUpdate = function () {
        this.habitacionService.update(this.HabitacionForm).subscribe(function (_) {
            alert('Se actualizó correctamente');
        }, function (err) {
            console.log(err);
        });
    };
    AdministrateHabitacionesComponent.prototype.handleResponseModal = function (event) {
        console.log('event', event);
        if (event) {
            this.HabitacionForm.fotos.gallery.push(event.url);
        }
    };
    AdministrateHabitacionesComponent.prototype.addFotoNegocio = function () {
        var data = {
            option: 'open',
            valueInput: {
                type: 'HAB',
                id: this.HabitacionForm.id,
                foto: true
            }
        };
        this.selectorFotoNegocio.activateModal(data);
    };
    AdministrateHabitacionesComponent.prototype.coreRemove = function (item) {
        var _this = this;
        this.habitacionService
            .remove_service(this.HabitacionForm.id, item)
            .subscribe(function (_) {
            _this.HabitacionForm.mc_servicios_negocios =
                _this.HabitacionForm.mc_servicios_negocios.filter(function (service) { return service.id !== item.id; });
        }, function (err) {
            console.log(err);
        });
    };
    AdministrateHabitacionesComponent.prototype.addServiceNegocio = function () {
        var data = {
            option: 'open',
            valueInput: {
                type: 'HOSP',
                foto: true
            }
        };
        this.selectorServicesNegocio.activateModal(data);
    };
    AdministrateHabitacionesComponent.prototype.handleServiceNegocio = function (event) {
        var _this = this;
        console.log('evento', event.selected);
        if (this.existService(event.selected.id)) {
            alert('El servicio ya se encuentra agregado');
            return;
        }
        this.habitacionService
            .add_service(this.HabitacionForm.id, event.selected)
            .subscribe(function (_) {
            _this.HabitacionForm.mc_servicios_negocios.push(event.selected);
        }, function (err) {
            console.log(err);
        });
    };
    AdministrateHabitacionesComponent.prototype.existService = function (id) {
        // Busca el servicio en la lista de servicios de la habitación
        var service = this.HabitacionForm.mc_servicios_negocios.find(function (item) { return item.id === id; });
        // Si el servicio se encuentra, devuelve true; de lo contrario, devuelve false
        return !!service;
    };
    AdministrateHabitacionesComponent = __decorate([
        core_1.Component({
            selector: 'app-administrate-habitaciones',
            standalone: true,
            imports: [
                forms_1.FormsModule,
                common_1.LowerCasePipe,
                selector_services_negocio_component_1.SelectorServicesNegocioComponent,
                selector_foto_negocio_component_1.SelectorFotoNegocioComponent,
            ],
            templateUrl: './administrate-habitaciones.component.html',
            styleUrl: './administrate-habitaciones.component.scss'
        }),
        __param(0, core_1.Inject(core_1.PLATFORM_ID))
    ], AdministrateHabitacionesComponent);
    return AdministrateHabitacionesComponent;
}(BaseComponents_1.BaseComponents));
exports.AdministrateHabitacionesComponent = AdministrateHabitacionesComponent;
