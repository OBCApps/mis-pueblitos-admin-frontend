import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SelectorServicesNegocioComponent } from '../../../../shared/global-components/modals/selector-serviceNegocio/selector-services-negocio.component';
import { SelectorServicesNegocio } from '../../../../shared/global-components/modals/selector-serviceNegocio/selector-services-negocio.service';
import { SelectorFotoNegocioComponent } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.component';
import { SelectorFotoNegocioService } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.service';
import { HotelesService } from '../../../hoteles/services/HotelesService';
import { FilterHotelesDto } from '../../../hoteles/models/Filters/FilterHotelesDto';
import { DtoRestaurante } from '../../models/Dtos/DtoRestaurante';
import { RestauranteService } from '../../services/RestauranteService';
import { McHoraAtencionComponent } from '../../../../shared/global-components/modals/mc-hora-atencion/mc-hora-atencion.component';
import { McHoraAtencionService } from '../../../../shared/global-components/modals/mc-hora-atencion/mc-hora-atencion.service';
import { McInfoAdicionalComponent } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.component';
import { McInfoAdicionalService } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.service';
import { McRedesSocialesComponent } from '../../../../shared/global-components/modals/mc-redes-sociales/redes-sociales.component';
import { McRedesSocialesService } from '../../../../shared/global-components/modals/mc-redes-sociales/redes-sociales.service';
import { RedesSocialesService } from '../../../hoteles/services/RedesSocialesService';

@Component({
  selector: 'app-administrate-restaurantes',
  standalone: true,
  imports: [
    FormsModule,
    LowerCasePipe,
    SelectorServicesNegocioComponent,
    SelectorFotoNegocioComponent,
    McHoraAtencionComponent,
    McInfoAdicionalComponent,
    McRedesSocialesComponent,
  ],
  templateUrl: './administrate-restaurantes.component.html',
  styleUrl: './administrate-restaurantes.component.scss',
})
export class AdministrateRestaurantesComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private hotelesService: HotelesService,
    private restauranteService: RestauranteService,
    private selectorServicesNegocio: SelectorServicesNegocio,
    private selectorHoraAtencion: McHoraAtencionService,
    private selectorFotoNegocio: SelectorFotoNegocioService,
    private selectorInfoAdicional: McInfoAdicionalService,
    private mcRedesSocialesService: McRedesSocialesService,
    private redesSocialesService: RedesSocialesService
  ) {
    super();
  }

  ngOnInit() {
    this.general_loads();
  }

  general_loads() {
    this.loads_storage();
    this.getAllHoteles();
  }

  // ------------- LOADS ------------- \\
  dtoSelected: any;
  dtoUserSession: any;
  loads_storage() {
    if (isPlatformBrowser(this.platformId)) {
      this.dtoSelected = JSON.parse(localStorage.getItem('dtoSelected'));
      this.dtoUserSession = JSON.parse(
        sessionStorage.getItem('AuthenticationMisPueblitosAdmin')
      );

      if (this.dtoSelected.option == 'EDIT') {
        this.coreSearchById(this.dtoSelected.data);
      } else if (this.dtoSelected.option == 'CREATE') {
        this.HabitacionForm = new DtoRestaurante();
      }
    }
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

  coreSearchById(data: any) {
    this.restauranteService.get_by_id(data.id).subscribe(
      (response) => {
        console.log('response', response);
        this.HabitacionForm = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  create_nameRoute(item: any) {
    const nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
    this.HabitacionForm.name_route = nameRouteWithoutSpaces;
  }

  coreRegister() {
    this.restauranteService.create(this.HabitacionForm).subscribe(
      (_) => {
        alert('Se registró correctamente');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  coreUpdate() {
    this.restauranteService.update(this.HabitacionForm).subscribe(
      (_) => {
        alert('Se actualizó correctamente');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleResponseModal(event) {
    console.log('event', event);
    if (event) {
      this.HabitacionForm.fotos.gallery.push(event.url);
    }
  }

  addRedesSociales() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        method: 'CREATE',
        dataNegocio: {
          nombre: this.HabitacionForm.nombre,
          id: this.HabitacionForm.id,
          hotelDetalleId: null,
          restauranteId: this.HabitacionForm.id,
        },
        data: null,
      },
    };
    this.mcRedesSocialesService.activateModal(data);
  }

  editRedesSociales(item: any) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        method: 'UPDATE',
        dataNegocio: {
          nombre: this.HabitacionForm.nombre,
          id: this.HabitacionForm.id,
          hotelDetalleId: null,
          restauranteId: this.HabitacionForm.id,
        },
        data: item,
      },
    };
    this.mcRedesSocialesService.activateModal(data);
  }
  deleteRedesSociales(item: any) {
    this.redesSocialesService.delete(item).subscribe(
      (_) => {
        this.HabitacionForm.mc_redes_sociales =
          this.HabitacionForm.mc_redes_sociales.filter(
            (red) => red.id !== item.id
          );
      },
      (err) => {
        alert('Error' + err);
      }
    );
  }

  handleResponseRedesSociales(event) {
    console.log('event', event);
    if (event['action-model'] == 'update') {
      this.HabitacionForm.mc_redes_sociales =
        this.HabitacionForm.mc_redes_sociales.map((item) => {
          if (item.id === event.id) {
            return event;
          }
          return item;
        });
    } else {
      this.HabitacionForm.mc_redes_sociales.push(event);
    }
  }

  addFotoNegocio() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        id: this.HabitacionForm.id,
        foto: true,
      },
    };
    this.selectorFotoNegocio.activateModal(data);
  }

  coreRemove(item: any) {
    this.restauranteService
      .remove_service(this.HabitacionForm.id, item)
      .subscribe(
        (_) => {
          this.HabitacionForm.mc_servicios_rest =
            this.HabitacionForm.mc_servicios_rest.filter(
              (service) => service.id !== item.id
            );
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addServiceNegocio() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        foto: true,
      },
    };
    this.selectorServicesNegocio.activateModal(data);
  }

  addHoraAtencionNegocio() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        method: 'CREATE',
        dataNegocio: this.HabitacionForm,
        data: null,
      },
    };
    this.selectorHoraAtencion.activateModal(data);
  }
  addInfoAdicional() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        method: 'CREATE',
        dataNegocio: this.HabitacionForm,
        data: null,
      },
    };
    this.selectorInfoAdicional.activateModal(data);
  }

  editInfoAdicional(nombre: string, descripcion: string) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        method: 'UPDATE',
        dataNegocio: this.HabitacionForm,
        data: { id: '', nombre, descripcion, beforeNombre: nombre },
      },
    };
    console.log('data', data);
    this.selectorInfoAdicional.activateModal(data);
  }

  eliminarInfoAdicional(item) {
    const temp = this.HabitacionForm.infoAdicional;
    this.getKeys(this.HabitacionForm.infoAdicional).map((key) => {
      if (key === item) {
        delete this.HabitacionForm.infoAdicional[key];
      }
    });
    this.restauranteService.update(this.HabitacionForm).subscribe(
      (response) => {
        alert('Se eliminó correctamente');
        this.HabitacionForm.infoAdicional = response.infoAdicional;
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar, vuelva a intentarlo');
        this.HabitacionForm.infoAdicional = temp;
      }
    );
  }

  handleInfoAdicional(event) {
    this.HabitacionForm.infoAdicional = event;
  }

  editHoraAtencionNegocio(dia: string, rangoHoras: string) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        method: 'UPDATE',
        dataNegocio: this.HabitacionForm,
        data: { id: '', dia, rangoHoras, beforeDia: dia},
      },
    };
    this.selectorHoraAtencion.activateModal(data);
  }

  eliminarHoraAtencionNegocio(dia: string) {
    const temp = this.HabitacionForm.horaAtencion[dia];
    this.getKeys(this.HabitacionForm.horaAtencion).map((key) => {
      if (key === dia) {
        delete this.HabitacionForm.horaAtencion[key];
      }
    });

    this.restauranteService.update(this.HabitacionForm).subscribe(
      (response) => {
        alert('Se eliminó correctamente');
        this.HabitacionForm.horaAtencion = response.horaAtencion;
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar, vuelva a intentarlo');
        this.HabitacionForm.horaAtencion[dia] = temp;
      }
    );
  }

  list_hoteles: any[] = [];
  getAllHoteles() {
    const temp = new FilterHotelesDto();
    this.hotelesService.get_list().subscribe(
      (response) => {
        console.log('response', response);
        this.list_hoteles = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  handleHoraAtencion(event: any) {
    this.HabitacionForm.horaAtencion = event;
  }
  handleServiceNegocio(event: any) {
    console.log('evento', event.selected);
    if (this.existService(event.selected.id)) {
      alert('El servicio ya se encuentra agregado');
      return;
    }

    this.restauranteService
      .add_service(this.HabitacionForm.id, event.selected)
      .subscribe(
        (_) => {
          this.HabitacionForm.mc_servicios_rest.push(event.selected);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  existService(id: string): boolean {
    // Busca el servicio en la lista de servicios de la habitación
    const service = this.HabitacionForm.mc_servicios_rest.find(
      (item) => item.id === id
    );

    // Si el servicio se encuentra, devuelve true; de lo contrario, devuelve false
    return !!service;
  }

  // ---------------- dto HOTELES VALUE ----------- \\
  HabitacionForm: DtoRestaurante = new DtoRestaurante();
}
