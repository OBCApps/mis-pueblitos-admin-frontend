import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HotelesService } from '../../services/HotelesService';
import { isPlatformBrowser } from '@angular/common';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { DtoHoteles } from '../../models/Dtos/DtoHoteles';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrate-hoteles',
  standalone: true,
  imports: [FormsModule],
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
      this.dtoUserSession = JSON.parse(sessionStorage.getItem('AuthenticationMisPueblitosAdmin'))

      if (this.dtoSelected.option == 'EDIT') {
        this.HospedajeForm = this.dtoSelected.data;
      } else if (this.dtoSelected.option == 'CREATE') {
        this.HospedajeForm = new DtoHoteles()
      }
    }
  }

  // ---------------- dto HOTELES VALUE ----------- \\
  HospedajeForm: DtoHoteles = new DtoHoteles()
  coreRegister() {
    this.hotelesService.create(this.HospedajeForm).subscribe(
      response => {
        
      }, err => {

      }
    )
  }

}
