import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {BaseComponents} from '../../../../shared/global-components/BaseComponents';
import {FormsModule} from '@angular/forms';
import {LowerCasePipe, isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';
import {SelectorFotoNegocioComponent} from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.component';
import {SelectorFotoNegocioService} from '../../../../shared/global-components/modals/selector-foto-negocio/selector-foto-negocio.service';
import {FilterHotelesDto} from '../../../hoteles/models/Filters/FilterHotelesDto';
import {DtoMenu} from '../../models/Dtos/DtoMenu';
import {MenuService} from '../../services/MenuService';
import {RestauranteService} from '../../services/RestauranteService';

@Component({
  selector: 'app-administrate-restaurantes',
  standalone: true,
  imports: [
    FormsModule,
    LowerCasePipe,
    SelectorFotoNegocioComponent,
  ],
  templateUrl: './administrate-menus.component.html',
  styleUrl: './administrate-menus.component.scss',
})
export class AdministrateMenusComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private restaurantesService: RestauranteService,
    private selectorFotoNegocio: SelectorFotoNegocioService,
    private menuService: MenuService,
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
  // ---------------- dto HOTELES VALUE ----------- \\
  MenuForm: DtoMenu = new DtoMenu();

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
        this.MenuForm = new DtoMenu();
      }
    }
  }

  coreSearchById(data: any) {
    this.menuService.get_by_id(data.id).subscribe(
      (response) => {
        console.log('response', response);
        this.MenuForm = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  create_nameRoute(item: any) {
    const nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
    this.MenuForm.name_route = nameRouteWithoutSpaces;
  }

  coreRegister() {
    this.MenuForm.fotos="";
    this.menuService.create(this.MenuForm).subscribe(
      (_) => {
        alert('Se registró correctamente');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  coreUpdate() {
    console.log("menu",this.MenuForm);
    this.menuService.update(this.MenuForm).subscribe(
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

  list_restaurantes: any[] = [];
  getAllHoteles() {
    const temp = new FilterHotelesDto();
    this.restaurantesService.get_list().subscribe(
      (response) => {
        console.log('response', response);
        this.list_restaurantes = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
