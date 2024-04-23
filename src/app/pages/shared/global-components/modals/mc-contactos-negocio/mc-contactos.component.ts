import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, Output, PLATFORM_ID, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgFor, isPlatformBrowser } from '@angular/common';
import { Drawer, DrawerInterface, DrawerOptions, InstanceOptions, Modal, ModalOptions } from 'flowbite';
import { McContactosNegociosService } from './mc-contactos.service';
import { DtoContactosNegocioMantenimiento } from './models/DtoContactosNegocioMantenimiento';


class DtoModal {
    type: string
    method: string;
    dataNegocio: DataNegocio = new DataNegocio();
    data: any;
}

class DataNegocio {
    nombre?: string
    id: string
    hotelDetalleId: string
}

@Component({
    selector: 'app-contactos-negocios-component',
    standalone: true,
    imports: [FormsModule, HttpClientModule, NgFor],
    templateUrl: './mc-contactos.component.html',
    styleUrl: './mc-contactos.component.scss',
})
export class McContactosNegociosComponent {
    @Output() responseModal = new EventEmitter<any>();
    Modal: DrawerInterface;
    valueInput: DtoModal = new DtoModal();

    constructor(
        private modalService: McContactosNegociosService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.modalService.modalState$.subscribe((option) => {
            this.valueInput = option.valueInput;
            if (this.valueInput.data) {
                this.dtoValue = { ...this.valueInput.data };
            } else {
                this.dtoValue = new DtoContactosNegocioMantenimiento()
            }


            this.activate_modal(option.option);
        });
    }

    activate_modal(option: any) { // Entrada y respuesta del modal
        if (option == 'close') {
            this.Modal.hide();
        } else if (option == 'open') {
            this.create_modal();
        }
    }

    // ----------------- FUNCIONALIDAD COMPLETA ------------------------ \\
    dtoValue: DtoContactosNegocioMantenimiento = new DtoContactosNegocioMantenimiento()

    selectTipo: any[] = [
        {
            value: null,
            desc: '-- Todos --'
        },
        {
            value: 'celular',
            desc: 'Celular'
        },
        {
            value: 'correo',
            desc: 'Correo'
        },
        {
            value: 'nroWhattsap',
            desc: 'N° Whattsapp'
        },
        {
            value: 'direccion',
            desc: 'Dirección'
        },
    ]

    // ----------- PARA CREAR ESTOS MODELOS YA TENEMOS LOS DATOS DEL NEGOCIO Y LOS DATOS A AGREGAR
    // ----------- IMPLEMENTAR EL API
    coreRegister() {

    }

    coreUpdate() {

    }















    // ------------------- FUNCIONALIDAD CREAR MODAL -------------------- \\
    create_modal() {
        if (isPlatformBrowser(this.platformId)) {


            const $targetEl = document.getElementById('mc-contactos-negocio');
            $targetEl.removeAttribute('hidden');

            const options: DrawerOptions = {
                placement: 'right',
                backdrop: true,
                bodyScrolling: false,
                edge: false,
                edgeOffset: '',
                backdropClasses:
                    'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-20',
                onHide: () => {
                    console.log('drawer is hidden');
                },
                onShow: () => {
                    console.log('drawer is shown');
                },
                onToggle: () => {
                    console.log('drawer has been toggled');
                },
            };

            const instanceOptions: InstanceOptions = {
                id: 'mc-contactos-negocio',
                override: true
            };

            this.Modal = new Drawer($targetEl, options, instanceOptions);
            this.Modal.show();
        }
    }



}
