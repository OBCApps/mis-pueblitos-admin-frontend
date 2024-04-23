import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HotelesService } from '../../services/HotelesService';
import { LowerCasePipe, isPlatformBrowser } from '@angular/common';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { DtoHoteles } from '../../models/Dtos/DtoHoteles';
import { FormsModule } from '@angular/forms';

import { SelectorFotoNegocioService } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.service';
import { SelectorFotoNegocioComponent } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.component';
import { McRedesSocialesService } from '../../../../shared/global-components/modals/mc-redes-sociales/redes-sociales.service';
import { SelectorServicesNegocio } from '../../../../shared/global-components/modals/selector-serviceNegocio/selector-services-negocio.service';
import { McRedesSocialesComponent } from '../../../../shared/global-components/modals/mc-redes-sociales/redes-sociales.component';
import { McContactosNegociosService } from '../../../../shared/global-components/modals/mc-contactos-negocio/mc-contactos.service';
import { McContactosNegociosComponent } from '../../../../shared/global-components/modals/mc-contactos-negocio/mc-contactos.component';


@Component({
  selector: 'app-administrate-hoteles',
  standalone: true,
  imports: [FormsModule, LowerCasePipe, SelectorFotoNegocioComponent, McRedesSocialesComponent, McContactosNegociosComponent],
  templateUrl: './administrate-hoteles.component.html',
  styleUrl: './administrate-hoteles.component.scss',
})
export class AdministrateHotelesComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private hotelesService: HotelesService,
    private selectorServicioNegocio: SelectorServicesNegocio,
    private selectorFotoNegocio: SelectorFotoNegocioService,
    private mcRedesSocialesService: McRedesSocialesService,
    private mcContactosNegociosService: McContactosNegociosService
  ) {
    super();
  }

  ngOnInit() {
    this.general_loads();
  }

  general_loads() {
    this.loads_storage();
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
        this.HospedajeForm = new DtoHoteles();
      }
    }
  }

  handleResponseModal(event) {
    console.log('event', event);
    this.HospedajeForm.hotelDetalle.fotos.gallery.push(event.url);
  }

  coreSearchById(data: any) {
    this.hotelesService.get_by_id(data.id).subscribe(
      (response) => {
        console.log('response', response);
        this.HospedajeForm = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // ---------------- dto HOTELES VALUE ----------- \\
  HospedajeForm: DtoHoteles = new DtoHoteles();
  coreRegister() {
    this.hotelesService.create(this.HospedajeForm).subscribe(
      (response) => {
        alert('Registrado');
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  coreUpdate() {
    this.hotelesService.update(this.HospedajeForm).subscribe(
      (response) => {
        alert('Actualizado');
      },
      (err) => {
        alert('Error' + err);
      }
    );
  }
  addFotoNegocio() {
    var data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        id: this.HospedajeForm.hotelDetalle.id,
        foto: true,
      },
    };
    this.selectorFotoNegocio.activateModal(data);
  }
  coreUploadFoto(event: any) { }

  // ---------------- UPDATES ---------------- \\
  create_nameRoute(item: any) {
    const nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
    this.HospedajeForm.name_route = nameRouteWithoutSpaces;
  }

  // -------------- MODAL SERVICIOS ---------\\
  addServiceNegocio() {
    var data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        id: null,
        foto: false,
      },
    };
    this.selectorServicioNegocio.activateModal(data);
  }


  addRedesSociales() {
    var data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        method: 'CREATE',
        dataNegocio: this.HospedajeForm,
        data: null
      },
    };
    this.mcRedesSocialesService.activateModal(data);
  }

  editRedesSociales(item: any) {
    var data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        method: 'UPDATE',
        dataNegocio: this.HospedajeForm,
        data: item
      },
    };
    this.mcRedesSocialesService.activateModal(data);
  }
  deleteRedesSociales(item: any) {

  }
  addContactosNegocios() {
    var data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        method: 'CREATE',
        dataNegocio: this.HospedajeForm,
        data: null
      },
    };
    this.mcContactosNegociosService.activateModal(data);
  }
  editContactosNegocios(item: any) {
    var data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        method: 'UPDATE',
        dataNegocio: this.HospedajeForm,
        data: item
      },
    };
    this.mcContactosNegociosService.activateModal(data);
  }
}
