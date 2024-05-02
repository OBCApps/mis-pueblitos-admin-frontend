import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { FilterHotelesDto } from '../../models/Filters/FilterHotelesDto';
import { HotelesService } from '../../services/HotelesService';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { DtoHoteles } from '../../models/Dtos/DtoHoteles';

@Component({
  selector: 'app-list-hoteles',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-hoteles.component.html',
  styleUrl: './list-hoteles.component.scss'
})
export class ListHotelesComponent extends BaseComponents {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private hotelesService: HotelesService
  ) {
    super()
  }
  ngOnInit() {
    this.general_loads();

    this.filterSearch = new FilterHotelesDto()
    this.coreSearch()
  }


  general_loads() {
    this.loads_storage()
  }
  // --------- CREATE NEW ------------- \\
  coreNew() {
    const data = {
      option: 'CREATE',
      data: new DtoHoteles()
    }
    
    localStorage.setItem('dtoSelected', JSON.stringify(data));
    this.router.navigate(['admin', 'hoteles', 'administrate']);


  }

  // --------- EDIT ELEMENT ------------- \\
  coreEdit(item: any) {
    const data = {
      option: 'EDIT',
      data: item
    }

    localStorage.setItem('dtoSelected', JSON.stringify(data));
    this.router.navigate(['admin', 'hoteles', 'administrate'],);
  }

  // --------- FUNCTION SEARCH ------------- \\
  filterSearch: FilterHotelesDto = new FilterHotelesDto()
  list_result: any[] = []
  coreSearch() {
    this.filterSearch.pagination = {
      totalRegistros: 10,
      inicio: 1
    }

    this.hotelesService.get_list_filter(this.filterSearch).subscribe(
      response => {

        this.filterSearch.pagination = response.pagination;
        this.filterSearch.resultado = response.resultado;
        this.list_result = response.resultado;
        
      }, err => {
        console.log(err);
      }
    )
  }

  // --------- DELETE ELEMENT ------------- \\
  coreDelete(item: any) {
    this.hotelesService.delete(item).subscribe(
      response => {
        this.coreSearch()
      }, err => {

      }
    )
  }




  // ------------- LOADS ------------- \\
  dtoSelected: any;
  dtoUserSession: any;
  loads_storage() {
    if (isPlatformBrowser(this.platformId)) {
      this.dtoSelected = JSON.parse(sessionStorage.getItem('AuthenticationMisPueblitosAdmin'))
      this.filterSearch.user = 1;      

    }
  }
}
