import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, Output, PLATFORM_ID, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgFor, isPlatformBrowser } from '@angular/common';
import { Drawer, DrawerInterface, DrawerOptions, InstanceOptions, Modal, ModalOptions } from 'flowbite';
import { McRedesSocialesService } from './redes-sociales.service';
import { DtoRedesSocialesMantenimiento } from './models/DtoRedesSociales';
import { DtoRedesSociales } from '../../../../modules/hoteles/models/Dtos/DtoHotelesDetalle';

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
    selector: 'app-redes-sociales-component',
    standalone: true,
    imports: [FormsModule, HttpClientModule, NgFor],
    templateUrl: './redes-sociales.component.html',
    styleUrl: './redes-sociales.component.scss',
})
export class McRedesSocialesComponent {
    @Output() responseModal = new EventEmitter<any>();
    Modal: DrawerInterface;
    valueInput: DtoModal = new DtoModal();

    constructor(
        private modalService: McRedesSocialesService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.modalService.modalState$.subscribe((option) => {
            this.valueInput = option.valueInput;
            if (this.valueInput.data) {
                this.dtoValue = { ...this.valueInput.data };
            } else {
                this.dtoValue = new DtoRedesSociales()
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
    dtoValue: DtoRedesSociales = new DtoRedesSociales()

    selectTipo: any[] = [
        {
            value: null,
            desc: '-- Todos --'
        },
        {
            value: 'instagram',
            desc: 'Instagram'
        },
        {
            value: 'facebook',
            desc: 'Facebook'
        },
        {
            value: 'twitter',
            desc: 'Twitter'
        },
    ]

    // ----------- PARA CREAR ESTOS MODELOS YA TENEMOS LOS DATOS DEL NEGOCIO Y LOS DATOS A AGREGAR
    // ----------- IMPLEMENTAR EL API
    coreRegister() {
      this.dtoValue.hotelDetalleId = this.valueInput.dataNegocio.hotelDetalleId;
      this.modalService.uploadFoto(this.dtoValue).subscribe(
        (response) => {
          console.log('response', response);
          response["action-model"]="create";
          this.responseModal.emit(response);
          this.Modal.hide();
        },
        (error) => {
          console.log('error', error);
          this.responseModal.emit(null);
          this.Modal.hide();
        }
      );
    }

    coreUpdate() {
      this.dtoValue.hotelDetalleId = this.valueInput.dataNegocio.hotelDetalleId;
      this.modalService.updateRedSocial(this.dtoValue.id, this.dtoValue).subscribe(
        (response) => {
          console.log('response', response);
          response["action-model"]="update";
          this.responseModal.emit(response);
          this.Modal.hide();
        },
        (error) => {
          console.log('error', error);
          this.responseModal.emit(null);
          this.Modal.hide();
        }
      );
    }















    // ------------------- FUNCIONALIDAD CREAR MODAL -------------------- \\
    create_modal() {
        if (isPlatformBrowser(this.platformId)) {


            const $targetEl = document.getElementById('mc-redes-sociales');
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
                id: 'mc-redes-sociales',
                override: true
            };

            this.Modal = new Drawer($targetEl, options, instanceOptions);
            this.Modal.show();
        }
    }



}
