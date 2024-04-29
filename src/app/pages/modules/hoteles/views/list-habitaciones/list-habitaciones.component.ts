import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { Router } from '@angular/router';
import { HabitacionService } from '../../services/HabitacionService';
import { isPlatformBrowser } from '@angular/common';
import { FilterHabitacionDto } from '../../models/Filters/FilterHabitacionDto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-habitaciones',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-habitaciones.component.html',
  styleUrl: './list-habitaciones.component.scss',
})
export class ListHabitacionesComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private habitacionService: HabitacionService
  ) {
    super();
  }

  ngOnInit() {
    this.loads_storage();
    this.filterSearch = new FilterHabitacionDto();
    this.coreSearch();
  }

  filterSearch: FilterHabitacionDto = new FilterHabitacionDto();
  valueInputDisponible: string;
  coreSearch() {
    this.filterSearch.pagination = {
      totalRegistros: 10,
      inicio: 1,
    };

    this.filterSearch.disponible =
      this.valueInputDisponible == 'true' ? true : this.valueInputDisponible=='false' ? false : null;
    console.log('this.filterSearch', this.filterSearch);
    this.habitacionService.get_list_filter(this.filterSearch).subscribe(
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
      ['admin', 'habitaciones', 'administrate'],
      //{ skipLocationChange: true }
    );
  }

  coreDelete(item) {
    this.habitacionService.delete(item).subscribe(
      response => {
        this.filterSearch.resultado=this.filterSearch.resultado.filter(x => x.id != item.id)
      }, err => {

      }
    )
  }
  coreNew() {}
}
