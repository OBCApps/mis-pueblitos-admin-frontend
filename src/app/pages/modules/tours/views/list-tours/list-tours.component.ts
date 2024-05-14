import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FilterTourDto } from '../../models/Filters/FilterTourDto';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../services/TourService';
import { DtoTours } from '../../models/Dtos/DtoTours';

@Component({
  selector: 'app-list-tours',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-tours.component.html',
  styleUrl: './list-tours.component.scss',
})
export class ListToursComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private tourService: TourService
  ) {
    super();
  }

  ngOnInit() {
    this.loads_storage();
    this.filterSearch = new FilterTourDto();
    this.coreSearch();
  }

  filterSearch: FilterTourDto = new FilterTourDto();
  coreSearch() {
    this.filterSearch.pagination = {
      totalRegistros: 10,
      inicio: 1,
    };

    console.log('this.filterSearch', this.filterSearch);
    //_filter(this.filterSearch)
    this.tourService.get_list().subscribe(
      (response) => {
        console.log('response', response);
        this.filterSearch.resultado = response;
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
      data: item,
    };
    console.log('data', data);
    localStorage.setItem('dtoSelected', JSON.stringify(data));

    this.router.navigate(
      ['admin', 'tours', 'administrate']
      //{ skipLocationChange: true }
    );
  }

  coreDelete(item) {
    this.tourService.delete(item).subscribe(
      (response) => {
        this.filterSearch.resultado = this.filterSearch.resultado.filter(
          (x) => x.id != item.id
        );
      },
      (err) => {
        alert('Error al eliminar');
      }
    );
  }
  coreNew() {
    const data = {
      option: 'CREATE',
      data: new DtoTours(),
    };
    localStorage.setItem('dtoSelected', JSON.stringify(data));

    this.router.navigate(
      ['admin', 'tours', 'administrate']
      //{ skipLocationChange: true }
    );
  }
}
