import { Routes } from '@angular/router';
import { LoginComponent } from './pages/shared/navigations/auths/login/views/login/login.component';
import { NavbarComponent } from './pages/shared/navigations/navar/views/navbar/navbar.component';
import { ListHotelesComponent } from './pages/modules/hoteles/views/list-hoteles/list-hoteles.component';
import path from 'path';
import { AdministrateHotelesComponent } from './pages/modules/hoteles/views/administrate-hoteles/administrate-hoteles.component';
import { ListHabitacionesComponent } from './pages/modules/hoteles/views/list-habitaciones/list-habitaciones.component';
import { AdministrateHabitacionesComponent } from './pages/modules/hoteles/views/administrate-habitaciones/administrate-habitaciones.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: NavbarComponent,
        children: [
            {
                path: 'hoteles',
                children: [
                    { path: 'list', component: ListHotelesComponent },
                    { path: 'administrate', component: AdministrateHotelesComponent }
                ]
            },
            {
                path: 'habitaciones',
                children: [
                    { path: 'list', component: ListHabitacionesComponent },
                    { path: 'administrate', component: AdministrateHabitacionesComponent }
                ]
            }
        ]
    },
];
