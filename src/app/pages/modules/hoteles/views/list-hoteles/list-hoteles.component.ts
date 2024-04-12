import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FilterHotelesDto } from '../../models/Filters/FilterHotelesDto';
import { HotelesService } from '../../services/HotelesService';

@Component({
  selector: 'app-list-hoteles',
  standalone: true,
  imports: [],
  templateUrl: './list-hoteles.component.html',
  styleUrl: './list-hoteles.component.scss'
})
export class ListHotelesComponent {

  constructor(
    private router: Router,
    private hotelesService: HotelesService
  ) {

  }
  // --------- CREATE NEW ------------- \\
  coreNew() {
    this.router.navigate(
      ['admin', 'hoteles', 'administrate'],
      //{ skipLocationChange: true }
    );
  }

  // --------- EDIT ELEMENT ------------- \\
  coreEdit(item: any) {
    this.router.navigate(
      ['admin', 'hoteles', 'administrate'],
      //{ skipLocationChange: true }
    );
  }

  // --------- FUNCTION SEARCH ------------- \\
  filterSearch: FilterHotelesDto = new FilterHotelesDto()
  list_result: any[] = []
  coreSearch() {
    this.hotelesService.get_list_filter(this.filterSearch).subscribe(
      response => {
        this.list_result = response.result
      }, err => {

      }
    )
  }

}
