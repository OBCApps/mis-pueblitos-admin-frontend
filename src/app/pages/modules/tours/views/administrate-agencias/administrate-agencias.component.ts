import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SelectorFotoNegocioComponent } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.component';
import { SelectorFotoNegocioService } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.service';
import { FilterAgenciaDto } from '../../models/Filters/FilterMenuDto';
import { Agencia } from '../../models/Dtos/DtoTours';
import { AgenciaService } from '../../services/AgenciaService';
import { McRedesSocialesComponent } from '../../../../shared/global-components/modals/mc-redes-sociales/redes-sociales.component';
import { McRedesSocialesService } from '../../../../shared/global-components/modals/mc-redes-sociales/redes-sociales.service';
import { RedesSocialesService } from '../../../hoteles/services/RedesSocialesService';
import { McInfoAdicionalComponent } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.component';
import { McInfoAdicionalService } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.service';

@Component({
  selector: 'app-administrate-agencias',
  standalone: true,
  imports: [
    FormsModule,
    LowerCasePipe,
    SelectorFotoNegocioComponent,
    McInfoAdicionalComponent,
    McRedesSocialesComponent,
  ],
  templateUrl: './administrate-agencias.component.html',
  styleUrl: './administrate-agencias.component.scss',
})
export class AdministrateAgenciasComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private agenciaService: AgenciaService,
    private selectorFotoNegocio: SelectorFotoNegocioService,
    private mcRedesSocialesService: McRedesSocialesService,
    private selectorInfoAdicional: McInfoAdicionalService,
    private redesSocialesService: RedesSocialesService
  ) {
    super();
  }

  ngOnInit() {
    this.general_loads();
  }

  general_loads() {
    this.loads_storage();
  }
  // ---------------- dto HOTELES VALUE ----------- \\
  MenuForm: Agencia = new Agencia();

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
        this.MenuForm = new Agencia();
      }
    }
  }

  coreSearchById(data: any) {
    this.agenciaService.get_by_id(data.id).subscribe(
      (response) => {
        console.log('response', response);
        this.MenuForm = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

  addRedesSociales() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'AGENCIA',
        method: 'CREATE',
        dataNegocio: {
          nombre: this.MenuForm.nombre,
          id: this.MenuForm.id,
          hotelDetalleId: null,
          restauranteId: null,
          agenciaId: this.MenuForm.id,
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
        type: 'AGENCIA',
        method: 'UPDATE',
        dataNegocio: {
          nombre: this.MenuForm.nombre,
          id: this.MenuForm.id,
          hotelDetalleId: null,
          restauranteId: null,
          agenciaId: this.MenuForm.id,
        },
        data: item,
      },
    };
    this.mcRedesSocialesService.activateModal(data);
  }
  deleteRedesSociales(item: any) {
    this.redesSocialesService.delete(item).subscribe(
      (_) => {
        this.MenuForm.mc_redes_sociales = this.MenuForm.mc_redes_sociales.filter(
          (contact) => contact.id !== item.id
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
      this.MenuForm.mc_redes_sociales =
        this.MenuForm.mc_redes_sociales.map((item) => {
          if (item.id === event.id) {
            return event;
          }
          return item;
        });
    } else {
      this.MenuForm.mc_redes_sociales.push(event);
    }
  }

  create_nameRoute(item: any) {
    const nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
    this.MenuForm.name_route = nameRouteWithoutSpaces;
  }

  coreRegister() {
    this.MenuForm.fotos = {
      gallery: [],
      principal: '',
    };
    this.MenuForm.contactos = {};
    this.MenuForm.infoAdicional = [];

    this.agenciaService.create(this.MenuForm).subscribe(
      (response) => {
        alert('Se registró correctamente');
        this.MenuForm = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  coreUpdate() {
    console.log('menu', this.MenuForm);
    this.agenciaService.update(this.MenuForm).subscribe(
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
      this.MenuForm.fotos = event.url;
    }
  }

  addInfoAdicional() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'AGENCIA',
        method: 'CREATE',
        dataNegocio: this.MenuForm,
        data: null,
      },
    };
    this.selectorInfoAdicional.activateModal(data);
  }

  editInfoAdicional(nombre: string, descripcion: string) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'AGENCIA',
        method: 'UPDATE',
        dataNegocio: this.MenuForm,
        data: { id: '', nombre, descripcion, beforeNombre: nombre },
      },
    };
    console.log('data', data);
    this.selectorInfoAdicional.activateModal(data);
  }

  eliminarInfoAdicional(item) {
    const temp = this.MenuForm.infoAdicional;
    this.getKeys(this.MenuForm.infoAdicional).map((key) => {
      if (key === item) {
        delete this.MenuForm.infoAdicional[key];
      }
    });
    this.agenciaService.update(this.MenuForm).subscribe(
      (response) => {
        alert('Se eliminó correctamente');
        this.MenuForm.infoAdicional = response.infoAdicional;
      },
      (err) => {
        console.log(err);
        alert('Error al eliminar, vuelva a intentarlo');
        this.MenuForm.infoAdicional = temp;
      }
    );
  }

  handleInfoAdicional(event) {
    this.MenuForm.infoAdicional = event;
  }

  addFotoNegocio() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'PLATO',
        id: this.MenuForm.id,
        foto: true,
      },
    };
    this.selectorFotoNegocio.activateModal(data);
  }
}
