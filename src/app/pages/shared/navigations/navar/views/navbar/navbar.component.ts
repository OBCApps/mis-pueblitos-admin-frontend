import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { McRedesSocialesComponent } from '../../../../global-components/modals/mc-redes-sociales/redes-sociales.component';
import { SelectorServicesNegocioComponent } from '../../../../global-components/modals/selector-serviceNegocio/selector-services-negocio.component';
import { CommonModule } from '@angular/common';

export class SidebarItem {
  title: string;
  icon: string;
  link?: string;
  expanded?: boolean;
  children?: SidebarItem[];

  constructor(title: string, icon: string, link?: string, expanded?: boolean, children?: SidebarItem[]) {
    this.title = title;
    this.icon = icon;
    this.link = link;
    this.expanded = expanded ?? false; // Set default value to false
    this.children = children ?? [];
  }
}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, SelectorServicesNegocioComponent, McRedesSocialesComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isSidebarOpen = false;

  sidebarItems: SidebarItem[] = [
    new SidebarItem('Hospedajes', 'path/to/icon1.svg', null, false, [
      new SidebarItem('Listado de Hoteles', 'path/to/icon2.svg', '/admin/hoteles/list'),      
      new SidebarItem('Listado de Habitaciones', 'path/to/icon4.svg', '/admin/habitaciones/list'),      
    ]),
    new SidebarItem('Restaurantes', 'path/to/icon6.svg', null, false, [
      new SidebarItem('Listado de Restaurantes', 'path/to/icon7.svg', '/admin/restaurantes/list'),      
      new SidebarItem('Listado de Menús', 'path/to/icon9.svg', '/admin/menus/list'),    
    ]),
    new SidebarItem('Tours y Experiencias', 'path/to/icon6.svg', null, false, [
      new SidebarItem('Listado de Agencias', 'path/to/icon7.svg', '/admin/agencias/list'),      
      new SidebarItem('Listado de Tours', 'path/to/icon9.svg', '/admin/tours/list'),    
    ]),
    // Agrega más elementos según sea necesario
  ];
  

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleItem(item: SidebarItem) {
    item.expanded = !item.expanded;
  }
}
