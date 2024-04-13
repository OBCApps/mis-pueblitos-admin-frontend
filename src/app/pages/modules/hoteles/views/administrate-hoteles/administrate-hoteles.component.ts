import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HotelesService } from '../../services/HotelesService';
import { isPlatformBrowser } from '@angular/common';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';

@Component({
  selector: 'app-administrate-hoteles',
  standalone: true,
  imports: [],
  templateUrl: './administrate-hoteles.component.html',
  styleUrl: './administrate-hoteles.component.scss'
})
export class AdministrateHotelesComponent extends BaseComponents {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private hotelesService: HotelesService
  ) {
    super()
  }

  ngOnInit() {
    this.general_loads();

    /* if(this.dtoSelected.option == 'EDIT') {

    } else if(this.dtoSelected.option == 'CREATE'){
      
    } */
  }

  general_loads() {
    this.loads_storage()
  }
  
  


  // ------------- LOADS ------------- \\
  dtoSelected: any;
  dtoUserSession: any;
  loads_storage() {
    if (isPlatformBrowser(this.platformId)) {
      this.dtoSelected = JSON.parse(localStorage.getItem('dtoSelected'))
      this.dtoSelected = JSON.parse(sessionStorage.getItem('AuthenticationMisPueblitosAdmin'))
    }
  }
}
