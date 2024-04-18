import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HotelesService } from '../../services/HotelesService';
import { LowerCasePipe, isPlatformBrowser } from '@angular/common';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { DtoHoteles } from '../../models/Dtos/DtoHoteles';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrate-hoteles',
  standalone: true,
  imports: [FormsModule, LowerCasePipe],
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

        this.coreSearchById(this.dtoSelected.data)
      } else if (this.dtoSelected.option == 'CREATE') {

        this.HospedajeForm = new DtoHoteles()
      }
    }
  }

  coreSearchById(data: any) {
    this.hotelesService.get_by_id(data.id).subscribe(
      response => {
        this.HospedajeForm = response;
      }, err => {
        console.log(err)
      }
    )

  }

  // ---------------- dto HOTELES VALUE ----------- \\
  HospedajeForm: DtoHoteles = new DtoHoteles()
  coreRegister() {
    const temp = this.HospedajeForm
    delete temp.id
    console.log(temp)
    this.hotelesService.create(this.HospedajeForm).subscribe(
      response => {
        alert('Registrado')
        console.log(response)
      }, err => {
        console.log(err)
      }
    )
  }

  coreUpdate() {
    this.hotelesService.update(this.HospedajeForm).subscribe(
      response => {
        alert('Actualizado')
      }, err => {
        alert('Error' + err)
      }
    )
  }

  // ---------------- UPDATES ---------------- \\
  create_nameRoute(item: any) {
    const nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
    this.HospedajeForm.name_route = nameRouteWithoutSpaces;
  }
}
