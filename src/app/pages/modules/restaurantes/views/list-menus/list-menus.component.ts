import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DtoHabitacion } from '../../../hoteles/models/Dtos/DtoHabitacion';
import { DtoMenu } from '../../models/Dtos/DtoMenu'
import { RestauranteService } from '../../services/RestauranteService';
import {MenuService} from '../../services/MenuService';
import {FilterMenuDto} from '../../models/Filters/FilterMenuDto';

@Component({
  selector: 'app-list-menus',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-menus.component.html',
  styleUrl: './list-menus.component.scss',
})
export class ListMenusComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private restauranteService: RestauranteService,
    private menuService: MenuService,
  ) {
    super();
  }

  ngOnInit() {
    this.loads_storage();
    this.filterSearch = new FilterMenuDto();
    this.coreSearch();
  }

  filterSearch: FilterMenuDto = new FilterMenuDto();
  valueInputDisponible: string;
  coreSearch() {
    this.filterSearch.pagination = {
      totalRegistros: 10,
      inicio: 1,
    };

    console.log('this.filterSearch', this.filterSearch);
    // get_list_filter(this.filterSearch)
    this.menuService.get_list().subscribe(
      (response) => {
        this.filterSearch.resultado = response;
        console.log('response', response, this.filterSearch);
      },
      (error) => console.error(error)
    );
  }

  // ------------- LOADS ------------- \\
  dtoSelected: any;
  dtoUserSession: any;
  loads_storage() {
    if (isPlatformBrowser(this.platformId)) {
      //this.dtoSelected = JSON.parse(localStorage.getItem('dtoSelected'))
      this.dtoSelected = JSON.parse(
        sessionStorage.getItem('AuthenticationMisPueblitosAdmin')
      );
      this.filterSearch.user = 1;
      console.log('this.dtoSelected', this.dtoSelected);
    }
  }

  coreEdit(item: any) {
    const data = {
      option: 'EDIT',
      data: item
    }
    console.log("data", data);
    localStorage.setItem('dtoSelected', JSON.stringify(data));

    this.router.navigate(
      ['admin', 'menus', 'administrate'],
      //{ skipLocationChange: true }
    );
  }

  coreDelete(item: any) {
    this.restauranteService.delete(item).subscribe(
      _ => {
        this.filterSearch.resultado=this.filterSearch.resultado.filter(x => x.id != item.id)
      }, err => {

      }
    )
  }
  coreNew() {
    const data = {
      option: 'CREATE',
      data: new DtoMenu()
    }
    localStorage.setItem('dtoSelected', JSON.stringify(data));


    this.router.navigate(
      ['admin', 'restaurantes', 'administrate'],
      //{ skipLocationChange: true }
    );
  }
}
