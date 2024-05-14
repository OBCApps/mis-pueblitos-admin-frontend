import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DtoHabitacion } from '../../../hoteles/models/Dtos/DtoHabitacion';
import { Agencia } from '../../models/Dtos/DtoTours';
import { AgenciaService } from '../../services/AgenciaService';
import {FilterAgenciaDto} from '../../models/Filters/FilterMenuDto';

@Component({
  selector: 'app-list-agencias',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-agencias.component.html',
  styleUrl: './list-agencias.component.scss',
})
export class ListAgenciasComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private agenciaService: AgenciaService,
  ) {
    super();
  }

  ngOnInit() {
    this.loads_storage();
    this.filterSearch = new FilterAgenciaDto();
    this.coreSearch();
  }

  filterSearch: FilterAgenciaDto = new FilterAgenciaDto();
  valueInputDisponible: string;
  coreSearch() {
    this.filterSearch.pagination = {
      totalRegistros: 10,
      inicio: 1,
    };

    console.log('this.filterSearch', this.filterSearch);
    // get_list_filter(this.filterSearch)
    this.agenciaService.get_list().subscribe(
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
      ['admin', 'agencias', 'administrate'],
      //{ skipLocationChange: true }
    );
  }

  coreDelete(item: any) {
    this.agenciaService.delete(item).subscribe(
      _ => {
        this.filterSearch.resultado=this.filterSearch.resultado.filter(x => x.id != item.id)
      }, err => {

      }
    )
  }
  coreNew() {
    const data = {
      option: 'CREATE',
      data: new Agencia()
    }
    localStorage.setItem('dtoSelected', JSON.stringify(data));


    this.router.navigate(
      ['admin', 'agencias', 'administrate'],
      //{ skipLocationChange: true }
    );
  }
}
