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
import { DtoEvento } from '../../models/DtoEventos';
import { EventoService } from '../../services/eventosService';
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
  templateUrl: './administrate-eventos.component.html',
})
export class AdministrateEventosComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private hotelesService: HotelesService,
    private restauranteService: EventoService,
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
    //this.getAllHoteles();
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
        this.EventoForm = new DtoEvento();
      }
    }
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

  coreSearchById(data: any) {
    this.restauranteService.get_evento(data.id).subscribe(
      (response) => {
        console.log('response', response);
        this.EventoForm = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  create_nameRoute(item: any) {
    const nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
    //this.EventoForm.name_route = nameRouteWithoutSpaces;
  }

  coreRegister() {
    this.restauranteService.create(this.EventoForm).subscribe(
      (response) => {
        this.EventoForm = response;
        alert('Se registró correctamente');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  coreUpdate() {
    this.restauranteService.update(this.EventoForm).subscribe(
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
      this.EventoForm.foto.gallery.push(event.url);
    }
  }

  addRedesSociales() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        method: 'CREATE',
        dataNegocio: {
          nombre: this.EventoForm.nombre,
          id: this.EventoForm.id,
          hotelDetalleId: null,
          restauranteId: this.EventoForm.id,
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
          nombre: this.EventoForm.nombre,
          id: this.EventoForm.id,
          hotelDetalleId: null,
          restauranteId: this.EventoForm.id,
        },
        data: item,
      },
    };
    this.mcRedesSocialesService.activateModal(data);
  }
  deleteRedesSociales(item: any) {
    /*this.redesSocialesService.delete(item).subscribe(
      (_) => {
        this.EventoForm.mc_redes_sociales =
          this.EventoForm.mc_redes_sociales.filter(
            (red) => red.id !== item.id
          );
      },
      (err) => {
        alert('Error' + err);
      }
    );*/
  }

  handleResponseRedesSociales(event) {
    /*console.log('event', event);
    if (event['action-model'] == 'update') {
      this.EventoForm.mc_redes_sociales =
        this.EventoForm.mc_redes_sociales.map((item) => {
          if (item.id === event.id) {
            return event;
          }
          return item;
        });
    } else {
      this.EventoForm.mc_redes_sociales.push(event);
    }*/
  }

  addFotoNegocio() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        id: this.EventoForm.id,
        foto: true,
      },
    };
    this.selectorFotoNegocio.activateModal(data);
  }

  coreRemove(item: any) {
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
        dataNegocio: this.EventoForm,
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
        dataNegocio: this.EventoForm,
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
        dataNegocio: this.EventoForm,
        data: { id: '', nombre, descripcion, beforeNombre: nombre },
      },
    };
    console.log('data', data);
    this.selectorInfoAdicional.activateModal(data);
  }

  eliminarInfoAdicional(item) {
  }

  handleInfoAdicional(event) {
    //this.EventoForm.infoAdicional = event;
  }

  editHoraAtencionNegocio(dia: string, rangoHoras: string) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        method: 'UPDATE',
        dataNegocio: this.EventoForm,
        data: { id: '', dia, rangoHoras, beforeDia: dia},
      },
    };
    this.selectorHoraAtencion.activateModal(data);
  }

  eliminarHoraAtencionNegocio(dia: string) {
  }


  // ---------------- dto HOTELES VALUE ----------- \\
  EventoForm: DtoEvento = new DtoEvento();
}
