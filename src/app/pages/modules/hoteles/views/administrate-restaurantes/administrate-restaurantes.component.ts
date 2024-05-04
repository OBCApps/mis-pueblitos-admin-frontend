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
import { DtoRestaurante } from '../../models/Dtos/DtoRestaurante';
import { RestauranteService } from '../../services/RestauranteService';

@Component({
  selector: 'app-administrate-restaurantes',
  standalone: true,
  imports: [
    FormsModule,
    LowerCasePipe,
    SelectorServicesNegocioComponent,
    SelectorFotoNegocioComponent,
  ],
  templateUrl: './administrate-restaurantes.component.html',
  styleUrl: './administrate-restaurantes.component.scss',
})
export class AdministrateRestaurantesComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private habitacionService: HabitacionService,
    private hotelesService: HotelesService,
    private restauranteService: RestauranteService,
    private selectorServicesNegocio: SelectorServicesNegocio,
    private selectorFotoNegocio: SelectorFotoNegocioService,
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
      this.dtoUserSession = JSON.parse(sessionStorage.getItem('AuthenticationMisPueblitosAdmin'));

      if (this.dtoSelected.option == 'EDIT') {
        this.coreSearchById(this.dtoSelected.data);
      } else if (this.dtoSelected.option == 'CREATE') {
        this.HabitacionForm = new DtoRestaurante();
      }
    }
  }

  coreSearchById(data: any) {
    this.restauranteService.get_by_id(data.id).subscribe(
      (response) => {
        console.log('response', response);
        this.HabitacionForm = response;
        //this.getRedesSociales();
        //this.getInfoAdicional();
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
  list_hoteles: any[] = [];
  getAllHoteles(){
    const temp=new FilterHotelesDto();
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
