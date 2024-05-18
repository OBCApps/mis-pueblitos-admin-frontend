import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SelectorFotoNegocioComponent } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.component';
import { SelectorFotoNegocioService } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.service';
import {
  DtoEvento,
  DtoEventos,
  DtoSubEvento,
  Proveedor,
} from '../../models/DtoEventos';
import { EventoService } from '../../services/eventosService';
import { ProveedoresService } from '../../services/proveedoresService';
import { SubEventosService } from '../../services/subEventosService';
import { MCSubEventoDetalleService } from '../../../../shared/global-components/modals/mc-sub-evento-detalle/mc-sub-evento-detalle.service';
import { MCSubEventoDetalleComponent } from '../../../../shared/global-components/modals/mc-sub-evento-detalle/mc-sub-evento-detalle.component';

@Component({
  selector: 'app-administrate-restaurantes',
  standalone: true,
  imports: [
    FormsModule,
    LowerCasePipe,
    SelectorFotoNegocioComponent,
    MCSubEventoDetalleComponent
  ],
  templateUrl: './administrate-sub-eventos.component.html',
})
export class AdministrateSubEventosComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private subEventosService: SubEventosService,
    private selectorFotoNegocio: SelectorFotoNegocioService,
    private proveedorService: ProveedoresService,
    private eventoService: EventoService,
    private mcSubEventosService: MCSubEventoDetalleService,
  ) {
    super();
  }

  ngOnInit() {
    this.general_loads();
  }

  general_loads() {
    this.loads_storage();
    this.getAllProveedores();
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
        this.EventoForm = new DtoSubEvento();
      }
    }
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

  coreSearchById(data: any) {
    this.subEventosService.get_subEvento(data.id).subscribe(
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
    this.subEventosService.create_subEvento(this.EventoForm).subscribe(
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
    this.subEventosService
      .update_subEvento(this.EventoForm.id, this.EventoForm)
      .subscribe(
        (_) => {
          alert('Se actualizó correctamente');
        },
        (err) => {
          console.log(err);
        }
      );
  }

  handleResponseModal(event: any) {
    console.log('event', event);
    if (event) {
      this.EventoForm.foto.url = event.url;
    }
  }

  addFotoNegocio() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'EVENTO',
        id: this.EventoForm.id,
        foto: true,
        infoImage: {
          url: '',
          titulo: '',
          lugar: '',
          proveedorId: '',
        },
      },
    };
    this.selectorFotoNegocio.activateModal(data);
  }

  editDetalle(item) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'SUBEVENTO',
        method: 'UPDATE',
        dataNegocio: this.EventoForm,
        data: item,
      },
    };
    this.mcSubEventosService.activateModal(data);
  }

  removeDetalle(item) {}

  list_proveedores: Proveedor[] = [];
  getAllProveedores() {
    this.proveedorService.get_listado_proveedores().subscribe(
      (response) => {
        this.list_proveedores = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  list_eventos: DtoEventos[] = [];
  getAllEventos() {
    this.eventoService.get_listado_eventos().subscribe(
      (response) => {
        this.list_eventos = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // ---------------- dto HOTELES VALUE ----------- \\
  EventoForm: DtoSubEvento = new DtoSubEvento();
}
