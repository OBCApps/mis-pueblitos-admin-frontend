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
import { DtoTours } from '../../models/Dtos/DtoTours';
import { TourService } from '../../services/TourService';
import { McHoraAtencionComponent } from '../../../../shared/global-components/modals/mc-hora-atencion/mc-hora-atencion.component';
import { McHoraAtencionService } from '../../../../shared/global-components/modals/mc-hora-atencion/mc-hora-atencion.service';
import { McInfoAdicionalComponent } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.component';
import { McInfoAdicionalService } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.service';
import { McRedesSocialesComponent } from '../../../../shared/global-components/modals/mc-redes-sociales/redes-sociales.component';
import { McRedesSocialesService } from '../../../../shared/global-components/modals/mc-redes-sociales/redes-sociales.service';
import { RedesSocialesService } from '../../../hoteles/services/RedesSocialesService';
import { AgenciaService } from '../../services/AgenciaService';
import { McDestinosComponent } from '../../../../shared/global-components/modals/mc-destinos/mc-destinos.component';
import { McDestinosService } from '../../../../shared/global-components/modals/mc-destinos/mc-destinos.service';
import { McIncluyeComponent } from '../../../../shared/global-components/modals/mc-incluye-no-incluye/mc-incluye.component';
import { McIncluyeService } from '../../../../shared/global-components/modals/mc-incluye-no-incluye/mc-incluye.service';
import { McRecomendacionesComponent } from '../../../../shared/global-components/modals/mc-recomendaciones/mc-recomendaciones.component';
import { McRecomendacionesService } from '../../../../shared/global-components/modals/mc-recomendaciones/mc-recomendaciones.service';
import { McItinerarioComponent } from '../../../../shared/global-components/modals/mc-itinerario/mc-itinerario.component';
import { McItinerarioService } from '../../../../shared/global-components/modals/mc-itinerario/mc-itinerario.service';
import { ItinerarioService } from '../../services/ItinearioService';

@Component({
  selector: 'app-administrate-tours',
  standalone: true,
  imports: [
    FormsModule,
    LowerCasePipe,
    SelectorServicesNegocioComponent,
    SelectorFotoNegocioComponent,
    McHoraAtencionComponent,
    McInfoAdicionalComponent,
    McRedesSocialesComponent,
    McDestinosComponent,
    McIncluyeComponent,
    McRecomendacionesComponent,
    McItinerarioComponent,
  ],
  templateUrl: './administrate-tours.component.html',
  styleUrl: './administrate-tours.component.scss',
})
export class AdministrateToursComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private hotelesService: HotelesService,
    private tourService: TourService,
    private selectorServicesNegocio: SelectorServicesNegocio,
    private selectorHoraAtencion: McHoraAtencionService,
    private selectorFotoNegocio: SelectorFotoNegocioService,
    private selectorInfoAdicional: McInfoAdicionalService,
    private mcRedesSocialesService: McRedesSocialesService,
    private redesSocialesService: RedesSocialesService,
    private agenciasService: AgenciaService,
    private selectorDestinos: McDestinosService,
    private selectorIncluye: McIncluyeService,
    private selectorRecomendaciones: McRecomendacionesService,
    private selectorItinerario: McItinerarioService,
    private itinerarioService: ItinerarioService
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
        this.TourForm = new DtoTours();
      }
    }
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

  coreSearchById(data: any) {
    this.tourService.get_by_id(data.id).subscribe(
      (response) => {
        console.log('response', response);
        this.TourForm = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  create_nameRoute(item: any) {
    const nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
    this.TourForm.name_route = nameRouteWithoutSpaces;
  }

  coreRegister() {
    this.TourForm.fotos = {
      gallery: [],
      principal: '',
    };

    this.TourForm.destinos = [];
    this.TourForm.imagesDestinos = [];
    this.TourForm.incluye = [];
    this.TourForm.noIncluye = [];
    this.TourForm.recomendaciones = [];
    this.TourForm.infoAdicional = {};

    this.tourService.create(this.TourForm).subscribe(
      (response) => {
        alert('Se registró correctamente');
        this.TourForm = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  coreUpdate() {
    this.tourService.update(this.TourForm).subscribe(
      (response) => {
        alert('Se actualizó correctamente');
        this.TourForm = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleResponseModal(event) {
    console.log('event', event);
    if (event) {
      this.TourForm.fotos.gallery.push(event.url);
    }
  }

  handleDestinos(event: any) {
    this.TourForm.destinos = event;
  }

  handleRecomendaciones(event: any) {
    this.TourForm.recomendaciones = event;
  }

  handleItinerario(event: any) {
    if(event.type == "CREATE"){
      this.TourForm.itinerario.push(event.value);
    }else {
      this.TourForm.itinerario = this.TourForm.itinerario.map((itinerario) => {
        if(itinerario.id == event.value.id){
          return event.value;
        }else {
          return itinerario;
        }
      });
    }

  }

  addItinerario() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'ITINERARIO',
        method: 'CREATE',
        nombreNegocio: this.TourForm.nombre,
        dataNegocio: this.TourForm,
        data: null,
      },
    };

    this.selectorItinerario.activateModal(data);
  }

  editItinerario(item: any) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'ITINERARIO',
        method: 'UPDATE',
        nombreNegocio: this.TourForm.nombre,
        dataNegocio: this.TourForm,
        data: item,
      },
    };

    this.selectorItinerario.activateModal(data);
  }

  eliminarItinerario(item: any) {
    this.itinerarioService.delete(item).subscribe(
      (response) => {
        alert('Se eliminó correctamente');
        this.TourForm.itinerario = this.TourForm.itinerario.filter(
          (itinerario) => itinerario !== item
        );
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar, vuelva a intentarlo');
      }
    );
  }

  handleIncluye(event: any) {
    if (event.incluye) {
      this.TourForm.incluye = event.response;
    } else {
      this.TourForm.noIncluye = event.response;
    }
  }

  addIncluye(value: boolean) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'TOUR',
        method: 'CREATE',
        incluye: value,
        dataNegocio: this.TourForm,
        data: null,
      },
    };
    this.selectorIncluye.activateModal(data);
  }

  editIncluye(item: any, value: boolean) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'TOUR',
        method: 'UPDATE',
        incluye: value,
        dataNegocio: this.TourForm,
        data: {
          valor: item,
          beforeValor: item,
        },
      },
    };
    this.selectorIncluye.activateModal(data);
  }

  eliminarIncluye(item: any, value: boolean) {
    const temp = value ? this.TourForm.incluye : this.TourForm.noIncluye;
    if (value) {
      this.TourForm.incluye = this.TourForm.incluye.filter(
        (incluye) => incluye !== item
      );
    } else {
      this.TourForm.noIncluye = this.TourForm.noIncluye.filter(
        (noIncluye) => noIncluye !== item
      );
    }

    this.tourService.update(this.TourForm).subscribe(
      (response) => {
        alert('Se eliminó correctamente');
        if (value) {
          this.TourForm.incluye = response.incluye;
        } else {
          this.TourForm.noIncluye = response.noIncluye;
        }
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar, vuelva a intentarlo');
        if (value) {
          this.TourForm.incluye = temp;
        } else {
          this.TourForm.noIncluye = temp;
        }
      }
    );
  }

  addFotoNegocio() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'TOUR',
        id: this.TourForm.id,
        foto: true,
      },
    };
    this.selectorFotoNegocio.activateModal(data);
  }

  addInfoAdicional() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'TOUR',
        method: 'CREATE',
        dataNegocio: this.TourForm,
        data: null,
      },
    };
    this.selectorInfoAdicional.activateModal(data);
  }

  editInfoAdicional(nombre: string, descripcion: string) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'TOUR',
        method: 'UPDATE',
        dataNegocio: this.TourForm,
        data: { id: '', nombre, descripcion, beforeNombre: nombre },
      },
    };
    console.log('data', data);
    this.selectorInfoAdicional.activateModal(data);
  }

  eliminarInfoAdicional(item) {
    const temp = this.TourForm.infoAdicional;
    this.getKeys(this.TourForm.infoAdicional).map((key) => {
      if (key === item) {
        delete this.TourForm.infoAdicional[key];
      }
    });
    this.tourService.update(this.TourForm).subscribe(
      (response) => {
        alert('Se eliminó correctamente');
        this.TourForm.infoAdicional = response.infoAdicional;
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar, vuelva a intentarlo');
        this.TourForm.infoAdicional = temp;
      }
    );
  }

  addDestinos() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'TOUR',
        method: 'CREATE',
        dataNegocio: this.TourForm,
        data: null,
      },
    };
    this.selectorDestinos.activateModal(data);
  }

  addRecomendacion() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'TOUR',
        method: 'CREATE',
        dataNegocio: this.TourForm,
        data: null,
      },
    };
    this.selectorRecomendaciones.activateModal(data);
  }

  editRecomendacion(value: string) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'TOUR',
        method: 'UPDATE',
        dataNegocio: this.TourForm,
        data: { valor: value, beforeValor: value },
      },
    };
    console.log('data', data);
    this.selectorRecomendaciones.activateModal(data);
  }

  editDestinos(value: string) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'TOUR',
        method: 'UPDATE',
        dataNegocio: this.TourForm,
        data: { valor: value, beforeValor: value },
      },
    };
    console.log('data', data);
    this.selectorDestinos.activateModal(data);
  }

  eliminarDestinos(item) {
    const temp = this.TourForm.destinos;
    this.TourForm.destinos = this.TourForm.destinos.filter(
      (destino) => destino !== item
    );

    this.tourService.update(this.TourForm).subscribe(
      (response) => {
        alert('Se eliminó correctamente');
        this.TourForm.destinos = response.destinos;
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar, vuelva a intentarlo');
        this.TourForm.destinos = temp;
      }
    );
  }

  eliminarRecomendacion(item: any) {
    const temp = this.TourForm.recomendaciones;
    this.TourForm.recomendaciones = this.TourForm.recomendaciones.filter(
      (recomendacion) => recomendacion !== item
    );

    this.tourService.update(this.TourForm).subscribe(
      (response) => {
        alert('Se eliminó correctamente');
        this.TourForm.recomendaciones = response.recomendaciones;
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar, vuelva a intentarlo');
        this.TourForm.recomendaciones = temp;
      }
    );
  }

  handleInfoAdicional(event) {
    this.TourForm.infoAdicional = event;
  }

  list_agencias: any[] = [];
  getAllHoteles() {
    const temp = new FilterHotelesDto();
    this.agenciasService.get_list().subscribe(
      (response) => {
        console.log('response', response);
        this.list_agencias = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // ---------------- dto HOTELES VALUE ----------- \\
  TourForm: DtoTours = new DtoTours();
  protected readonly Object = Object;
}
