import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FilterRestauranteDto } from '../../models/Filters/FilterRestauranteDto';
import { FormsModule } from '@angular/forms';
import { DtoHabitacion } from '../../../hoteles/models/Dtos/DtoHabitacion';
import { RestauranteService } from '../../services/RestauranteService';

@Component({
  selector: 'app-list-restaurantes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-restaurantes.component.html',
  styleUrl: './list-restaurantes.component.scss',
})
export class ListRestaurantesComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private restauranteService: RestauranteService
  ) {
    super();
  }

  ngOnInit() {
    this.loads_storage();
    this.filterSearch = new FilterRestauranteDto();
    this.coreSearch();
  }

  filterSearch: FilterRestauranteDto = new FilterRestauranteDto();
  valueInputDisponible: string;
  coreSearch() {
    this.filterSearch.pagination = {
      totalRegistros: 10,
      inicio: 1,
    };

    console.log('this.filterSearch', this.filterSearch);
    this.restauranteService.get_list_filter(this.filterSearch).subscribe(
      (response) => {
        console.log('response', response);
        this.filterSearch.resultado = response.resultado;
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
      ['admin', 'restaurantes', 'administrate'],
      //{ skipLocationChange: true }
    );
  }

  coreDelete(item) {
    this.restauranteService.delete(item).subscribe(
      response => {
        this.filterSearch.resultado=this.filterSearch.resultado.filter(x => x.id != item.id)
      }, err => {

      }
    )
  }
  coreNew() {
    const data = {
      option: 'CREATE',
      data: new DtoHabitacion()
    }
    localStorage.setItem('dtoSelected', JSON.stringify(data));


    this.router.navigate(
      ['admin', 'restaurantes', 'administrate'],
      //{ skipLocationChange: true }
    );
  }
}
