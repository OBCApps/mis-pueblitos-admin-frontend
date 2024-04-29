import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';
import { FormsModule } from '@angular/forms';
import { LowerCasePipe, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HabitacionService } from '../../services/HabitacionService';
import { DtoHabitacion } from '../../models/Dtos/DtoHabitacion';

@Component({
  selector: 'app-administrate-habitaciones',
  standalone: true,
  imports: [FormsModule, LowerCasePipe],
  templateUrl: './administrate-habitaciones.component.html',
  styleUrl: './administrate-habitaciones.component.scss',
})
export class AdministrateHabitacionesComponent extends BaseComponents {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private habitacionService: HabitacionService
  ) {
    super();
  }

  ngOnInit() {
    this.general_loads();
  }

  general_loads() {
    this.loads_storage();
  }

  // ------------- LOADS ------------- \\
  dtoSelected: any;
  dtoUserSession: any;
  loads_storage() {
    if (isPlatformBrowser(this.platformId)) {
      this.dtoSelected = JSON.parse(localStorage.getItem('dtoSelected'));
      this.dtoUserSession = JSON.parse(
        sessionStorage.getItem('AuthenticationMisPueblitosAdmin')
      );

      if (this.dtoSelected.option == 'EDIT') {
        this.coreSearchById(this.dtoSelected.data);
      } else if (this.dtoSelected.option == 'CREATE') {
        this.HabitacionForm = new DtoHabitacion();
      }
    }
  }

  coreSearchById(data: any) {
    this.habitacionService.get_by_id(data.id).subscribe(
      (response) => {
        console.log('response', response);
        this.HabitacionForm = response;
        //this.getRedesSociales();
        //this.getInfoAdicional();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  create_nameRoute(item: any) {
    const nameRouteWithoutSpaces = item.replace(/\s/g, '-').toLowerCase();
    this.HabitacionForm.name_route = nameRouteWithoutSpaces;
  }

  coreRegister() {}
  coreUpdate() {}
  addServiceNegocio() {}

  // ---------------- dto HOTELES VALUE ----------- \\
  HabitacionForm: DtoHabitacion = new DtoHabitacion();
}
