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
import { RedesSocialesService } from '../../services/RedesSocialesService';
import { DtoRedesSociales } from '../../models/Dtos/DtoHotelesDetalle';
import { response } from 'express';
import { abort } from 'process';
import { McInfoAdicionalComponent } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.component';
import { McInfoAdicionalService } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.service';
import { HotelDetailService } from '../../services/HotelDetailService';
import { InfoAdicionalService } from '../../services/InfoAdicionalService';

@Component({
  selector: 'app-administrate-hoteles',
  standalone: true,
  imports: [
    FormsModule,
    LowerCasePipe,
    SelectorFotoNegocioComponent,
    McRedesSocialesComponent,
    McContactosNegociosComponent,
    McInfoAdicionalComponent,
  ],
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
    private mcContactosNegociosService: McContactosNegociosService,
    private redesSocialesService: RedesSocialesService,
    private mcInfoAdicionalService: McInfoAdicionalService,
    private hotelDetailService: HotelDetailService,
    private infoAdicionalService: InfoAdicionalService
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

  handleResponseRedesSociales(event) {
    if (event['action-model'] == 'update') {
      this.getRedesSociales();
    } else {
      this.redesSociales.push(event);
    }
  }

  handleResponseInfoAd(event) {
    console.log('event', event, typeof event);
    if (typeof event == 'object') {
      this.getInfoAdicional();
    } else {
      this.list_infoAdicional = event.mc_info_adicional;
    }
  }

  coreSearchById(data: any) {
    this.hotelesService.get_by_id(data.id).subscribe(
      (response) => {
        console.log('response', response);
        this.HospedajeForm = response;
        this.getRedesSociales();
        this.getInfoAdicional();
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
    const data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        id: this.HospedajeForm.hotelDetalle.id,
        foto: true,
      },
    };
    this.selectorFotoNegocio.activateModal(data);
  }
  coreUploadFoto(event: any) {}

  // ---------------- UPDATES ---------------- \\
  create_nameRoute(item: any) {
    const nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
    this.HospedajeForm.name_route = nameRouteWithoutSpaces;
  }

  // -------------- MODAL SERVICIOS ---------\\
  addServiceNegocio() {
    const data = {
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
    const data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        method: 'CREATE',
        dataNegocio: this.HospedajeForm,
        data: null,
      },
    };
    this.mcRedesSocialesService.activateModal(data);
  }

  editRedesSociales(item: any) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        method: 'UPDATE',
        dataNegocio: this.HospedajeForm,
        data: item,
      },
    };
    this.mcRedesSocialesService.activateModal(data);
  }
  deleteRedesSociales(item: DtoRedesSociales) {
    this.redesSocialesService.delete(item).subscribe(
      (response) => {
        this.getRedesSociales();
      },
      (err) => {
        alert('Error' + err);
      }
    );
  }
  addContactosNegocios() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        method: 'CREATE',
        dataNegocio: this.HospedajeForm,
        data: { tipo: '', valor: '' },
        tipo: '',
        valor: '',
      },
    };
    this.mcContactosNegociosService.activateModal(data);
  }
  editContactosNegocios(tipo: string) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        method: 'UPDATE',
        dataNegocio: this.HospedajeForm,
        tipo: tipo,
        valor:
          tipo == 'celular'
            ? this.HospedajeForm.celular
            : tipo == 'direccion'
            ? this.HospedajeForm.direccion
            : this.HospedajeForm.correo,
        data:
          tipo == 'celular'
            ? { tipo, valor: this.HospedajeForm.celular }
            : tipo == 'direccion'
            ? { tipo, valor: this.HospedajeForm.direccion }
            : { tipo, valor: this.HospedajeForm.correo },
      },
    };
    this.mcContactosNegociosService.activateModal(data);
  }

  addInfoAdicional() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        method: 'CREATE',
        dataNegocio: this.HospedajeForm,
        data: null,
      },
    };
    this.mcInfoAdicionalService.activateModal(data);
  }

  editInfoAdicional(item) {
    const data = {
      option: 'open',
      valueInput: {
        type: 'HOSP',
        method: 'UPDATE',
        dataNegocio: this.HospedajeForm,
        data: item,
      },
    };
    console.log(data);
    this.mcInfoAdicionalService.activateModal(data);
  }

  deleteContactosNegocios(type: string) {
    if (type == 'celular') {
      this.HospedajeForm.celular = '';
    } else if (type == 'direccion') {
      this.HospedajeForm.direccion = '';
    } else {
      this.HospedajeForm.correo = '';
    }
    this.hotelesService.update(this.HospedajeForm).subscribe(
      (response) => {
        this.HospedajeForm = response;
      },
      (err) => {
        alert('Error' + err);
      }
    );
  }

  redesSociales: DtoRedesSociales[] = [];
  getRedesSociales() {
    this.redesSocialesService
      .get_by_hotel_detail_id(this.HospedajeForm.hotelDetalle.id)
      .subscribe(
        (response) => {
          this.redesSociales = response;
        },
        (err) => {
          alert('Error' + err);
        }
      );
  }
  list_infoAdicional = [];
  getInfoAdicional() {
    this.hotelDetailService
      .get_info_adicional_by_id(this.HospedajeForm.hotelDetalle.id)
      .subscribe(
        (response) => {
          console.log('response', response);
          this.list_infoAdicional = response;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteInfoAdicional(item: any) {
    this.infoAdicionalService.delete(item).subscribe(
      (response) => {
        this.getInfoAdicional();
      },
      (err) => {
        alert('Error' + err);
      }
    );
  }
}
