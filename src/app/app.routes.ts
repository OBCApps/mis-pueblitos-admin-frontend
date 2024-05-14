import { Routes } from '@angular/router';
import { LoginComponent } from './pages/shared/navigations/auths/login/views/login/login.component';
import { NavbarComponent } from './pages/shared/navigations/navar/views/navbar/navbar.component';
import { ListHotelesComponent } from './pages/modules/hoteles/views/list-hoteles/list-hoteles.component';
import path from 'path';
import { AdministrateHotelesComponent } from './pages/modules/hoteles/views/administrate-hoteles/administrate-hoteles.component';
import { ListHabitacionesComponent } from './pages/modules/hoteles/views/list-habitaciones/list-habitaciones.component';
import { AdministrateHabitacionesComponent } from './pages/modules/hoteles/views/administrate-habitaciones/administrate-habitaciones.component';
import { ListRestaurantesComponent } from './pages/modules/restaurantes/views/list-restaurantes/list-restaurantes.component';
import { AdministrateRestaurantesComponent } from './pages/modules/restaurantes/views/administrate-restaurantes/administrate-restaurantes.component';
import { ListDepartamentoComponent } from './pages/modules/departamento/views/list-departamentos/departamento.component';
import { AdministrateDepartamentoComponent } from './pages/modules/departamento/views/administrate-departamentos/edit-departamento.component';
import { ListEventosComponent } from './pages/modules/eventos/views/list-eventos/list-eventos.component';
import { ListSubEventosComponent } from './pages/modules/eventos/views/list-sub-eventos/list-sub-eventos.component';
import { ListMenusComponent } from './pages/modules/restaurantes/views/list-menus/list-menus.component';
import { AdministrateMenusComponent } from './pages/modules/restaurantes/views/administrate-menus/administrate-menus.component';
import { ListAgenciasComponent } from './pages/modules/tours/views/list-agencias/list-agencias.component';
import { AdministrateAgenciasComponent } from './pages/modules/tours/views/administrate-agencias/administrate-agencias.component';
import { ListToursComponent } from './pages/modules/tours/views/list-tours/list-tours.component';
import { AdministrateToursComponent } from './pages/modules/tours/views/administrate-tours/administrate-tours.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: NavbarComponent,
    children: [
      {
        path: 'hoteles',
        children: [
          { path: 'list', component: ListHotelesComponent },
          { path: 'administrate', component: AdministrateHotelesComponent },
        ],
      },
      {
        path: 'habitaciones',
        children: [
          { path: 'list', component: ListHabitacionesComponent },
          {
            path: 'administrate',
            component: AdministrateHabitacionesComponent,
          },
        ],
      },
      {
        path: 'restaurantes',
        children: [
          { path: 'list', component: ListRestaurantesComponent },
          {
            path: 'administrate',
            component: AdministrateRestaurantesComponent,
          },
        ],
      },
      {
        path: 'menus',
        children: [
          { path: 'list', component: ListMenusComponent },
          { path: 'administrate', component: AdministrateMenusComponent },
        ],
      },
      {
        path: 'agencias',
        children: [
          { path: 'list', component: ListAgenciasComponent },
          { path: 'administrate', component: AdministrateAgenciasComponent },
        ],
      },
      {
        path: 'tours',
        children: [
          { path: 'list', component: ListToursComponent },
          { path: 'administrate', component: AdministrateToursComponent },
        ],
      },
      {
        path: 'departamentos',
        children: [
          { path: 'list', component: ListDepartamentoComponent },
          {
            path: 'administrate',
            component: AdministrateDepartamentoComponent,
          },
        ],
      },
      {
        path: 'eventos',
        children: [
          { path: 'list', component: ListEventosComponent },
          {
            path: 'administrate',
            component: AdministrateDepartamentoComponent,
          },
        ],
      },
      {
        path: 'subeventos',
        children: [
          { path: 'list', component: ListSubEventosComponent },
          {
            path: 'administrate',
            component: AdministrateDepartamentoComponent,
          },
        ],
      },
    ],
  },
];
