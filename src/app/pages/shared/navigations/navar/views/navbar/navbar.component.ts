import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  routes: any[] = [
    {
      module_name: 'Dashboard',
      icon: 'A',
      routerLink: 'admin',
      children: []
    },
    {
      module_name: 'Hospedajes',
      icon: 'B',      
      children: [
        {
          module_name: 'Hoteles',
          icon: null,
          routerLink: 'admin',
          children: []
        },
        {
          module_name: 'Habitaciones',
          icon: null,
          routerLink: 'admin',
          children: []
        }
      ]
    },
  ]
}
