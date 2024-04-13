import { Component } from '@angular/core';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';

@Component({
  selector: 'app-administrate-habitaciones',
  standalone: true,
  imports: [],
  templateUrl: './administrate-habitaciones.component.html',
  styleUrl: './administrate-habitaciones.component.scss'
})
export class AdministrateHabitacionesComponent  extends BaseComponents{
    constructor(){
      super()
    }
}
