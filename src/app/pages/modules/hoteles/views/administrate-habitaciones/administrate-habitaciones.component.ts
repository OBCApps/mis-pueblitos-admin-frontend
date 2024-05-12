import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HabitacionService } from '../../services/HabitacionService';
import { DtoHabitacion } from '../../models/Dtos/DtoHabitacion';
import { SelectorServicesNegocioComponent } from '../../../../shared/global-components/modals/selector-serviceNegocio/selector-services-negocio.component';
import { SelectorServicesNegocio } from '../../../../shared/global-components/modals/selector-serviceNegocio/selector-services-negocio.service';
import { SelectorFotoNegocioComponent } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.component';
import { SelectorFotoNegocioService } from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.service';
import { HotelesService } from '../../services/HotelesService';
import { FilterHotelesDto } from '../../models/Filters/FilterHotelesDto';
import { McInfoAdicionalComponent } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.component';
import { McInfoAdicionalService } from '../../../../shared/global-components/modals/mc-info-adicional/mc-info-adicional.service';

@Component({
  selector: 'app-administrate-habitaciones',
  standalone: true,
  imports: [
    FormsModule,
    LowerCasePipe,
    SelectorServicesNegocioComponent,
    SelectorFotoNegocioComponent,
    McInfoAdicionalComponent,
  ],
  templateUrl: './administrate-habitaciones.component.html',
  styleUrl: './administrate-habitaciones.component.scss',
})
export class AdministrateHabitacionesComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private habitacionService: HabitacionService,
    private hotelesService: HotelesService,
    private selectorInfoAdicional: McInfoAdicionalService,
    private selectorServicesNegocio: SelectorServicesNegocio,
    private selectorFotoNegocio: SelectorFotoNegocioService
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
        this.HabitacionForm = new DtoHabitacion();
      }
    }
  }

  getKeys(obj: any) {
    return Object.keys(obj);
  }

  coreSearchById(data: any) {
    this.habitacionService.get_by_id(data.id).subscribe(
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
    this.habitacionService.create(this.HabitacionForm).subscribe(
      (_) => {
        alert('Se registró correctamente');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  coreUpdate() {
    this.habitacionService.update(this.HabitacionForm).subscribe(
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

  addFotoNegocio() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'HAB',
        id: this.HabitacionForm.id,
        foto: true,
      },
    };
    this.selectorFotoNegocio.activateModal(data);
  }

  coreRemove(item: any) {
    this.habitacionService
      .remove_service(this.HabitacionForm.id, item)
      .subscribe(
        (_) => {
          this.HabitacionForm.mc_servicios_negocios =
            this.HabitacionForm.mc_servicios_negocios.filter(
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

  handleInfoAdicional(event) {
    this.HabitacionForm.infoAdicional = event;
  }

  addInfoAdicional() {
    const data = {
      option: 'open',
      valueInput: {
        type: 'HAB',
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
        type: 'HAB',
        method: 'UPDATE',
        dataNegocio: this.HabitacionForm,
        data: { id: '', nombre, descripcion, beforeNombre: nombre },
      },
    };
    this.selectorInfoAdicional.activateModal(data);
  }

  eliminarInfoAdicional(item) {
    const temp = this.HabitacionForm.infoAdicional;
    this.getKeys(this.HabitacionForm.infoAdicional).map((key) => {
      if (key === item) {
        delete this.HabitacionForm.infoAdicional[key];
      }
    });
    this.habitacionService.update(this.HabitacionForm).subscribe(
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

  handleServiceNegocio(event: any) {
    console.log('evento', event.selected);
    if (this.existService(event.selected.id)) {
      alert('El servicio ya se encuentra agregado');
      return;
    }

    this.habitacionService
      .add_service(this.HabitacionForm.id, event.selected)
      .subscribe(
        (_) => {
          this.HabitacionForm.mc_servicios_negocios.push(event.selected);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  existService(id: string): boolean {
    // Busca el servicio en la lista de servicios de la habitación
    const service = this.HabitacionForm.mc_servicios_negocios.find(
      (item) => item.id === id
    );

    // Si el servicio se encuentra, devuelve true; de lo contrario, devuelve false
    return !!service;
  }

  // ---------------- dto HOTELES VALUE ----------- \\
  HabitacionForm: DtoHabitacion = new DtoHabitacion();
}
