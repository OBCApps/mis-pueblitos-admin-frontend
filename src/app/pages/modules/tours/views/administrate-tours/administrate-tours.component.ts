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
    this.tourService.create(this.TourForm).subscribe(
      (_) => {
        alert('Se registró correctamente');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  coreUpdate() {
    this.tourService.update(this.TourForm).subscribe(
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
      this.TourForm.fotos.gallery.push(event.url);
    }
  }

  addFotoNegocio() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
        id: this.TourForm.id,
        foto: true,
      },
    };
    this.selectorFotoNegocio.activateModal(data);
  }

  coreRemove(item: any) {
    /*this.tourService
      .remove_service(this.TourForm.id, item)
      .subscribe(
        (_) => {
          this.TourForm.mc_servicios_rest =
            this.TourForm.mc_servicios_rest.filter(
              (service) => service.id !== item.id
            );
        },
        (err) => {
          console.log(err);
        }
      );*/
  }

  addInfoAdicional() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'REST',
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
        type: 'REST',
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

  handleInfoAdicional(event) {
    this.TourForm.infoAdicional = event;
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

  // ---------------- dto HOTELES VALUE ----------- \\
  TourForm: DtoTours = new DtoTours();
}
