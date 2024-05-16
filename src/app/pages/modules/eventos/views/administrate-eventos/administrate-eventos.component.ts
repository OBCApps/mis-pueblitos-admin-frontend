import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SelectorServicesNegocioComponent } from '../../../../shared/global-components/modals/selector-serviceNegocio/selector-services-negocio.component';
import { SelectorFotoNegocioComponent } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.component';
import { SelectorFotoNegocioService } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.service';
import { DtoEvento, Proveedor } from '../../models/DtoEventos';
import { EventoService } from '../../services/eventosService';
import { McHoraAtencionComponent } from '../../../../shared/global-components/modals/mc-hora-atencion/mc-hora-atencion.component';
import { McInfoAdicionalComponent } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.component';
import { McRedesSocialesComponent } from '../../../../shared/global-components/modals/mc-redes-sociales/redes-sociales.component';
import {ProveedoresService} from '../../services/proveedoresService';
import { url } from 'inspector';

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
    private restauranteService: EventoService,
    private selectorFotoNegocio: SelectorFotoNegocioService,
    private proveedorService: ProveedoresService,
  ) {
    super();
  }

  ngOnInit() {
    this.general_loads();
  }

  general_loads() {
    this.loads_storage();
    this.getAllProveedores()
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
          url: "",
          titulo: "",
          lugar: "",
          proveedorId:"",
        }
      },
    };
    this.selectorFotoNegocio.activateModal(data);
  }

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

  // ---------------- dto HOTELES VALUE ----------- \\
  EventoForm: DtoEvento = new DtoEvento();
}
