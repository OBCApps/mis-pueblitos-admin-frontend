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
  styleUrl: './list-habitaciones.component.scss'
})
export class ListHabitacionesComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private habitacionService: HabitacionService
  ) {
    super()
  }

  ngOnInit() {
    this.loads_storage();
    this.filterSearch = new FilterHabitacionDto();
    this.coreSearch();
  }

  filterSearch: FilterHabitacionDto = new FilterHabitacionDto();

  coreSearch() {
    this.filterSearch.pagination = {
      totalRegistros: 10,
      inicio: 1
    };
    this.habitacionService.get_list_filter(this.filterSearch).subscribe(
      (response) => {
      console.log("response", response);
      this.filterSearch.resultado = response.resultado;
      },(error) => console.error(error)
    );
  }

  // ------------- LOADS ------------- \\
  dtoSelected: any;
  dtoUserSession: any;
  loads_storage() {
    if (isPlatformBrowser(this.platformId)) {
      //this.dtoSelected = JSON.parse(localStorage.getItem('dtoSelected'))
      this.dtoSelected = JSON.parse(sessionStorage.getItem('AuthenticationMisPueblitosAdmin'))
      this.filterSearch.user = 1;
      console.log("this.dtoSelected", this.dtoSelected);

    }
  }
}
