import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  Inject,
  Output,
  PLATFORM_ID,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgFor, isPlatformBrowser } from '@angular/common';
import {
  Drawer,
  DrawerInterface,
  DrawerOptions,
  InstanceOptions,
  Modal,
  ModalOptions,
} from 'flowbite';
import { McInfoAdicionalService } from './mc-info-adicional.service';
import { DtoContactosNegocioMantenimiento } from './models/DtoContactosNegocioMantenimiento';
import { DtoHotelesDetalle } from '../../../../modules/hoteles/models/Dtos/DtoHotelesDetalle';

class DtoModal {
  type: string;
  method: string;
  dataNegocio: DataNegocio = new DataNegocio();
  data: any;
}

class DataNegocio {
  nombre?: string;
  id: string;
  hotelDetalleId: string;
  hotelDetalle: DtoHotelesDetalle;
  celular: string;
  direccion: string;
  correo: string;
}

class DataInfo {
  id: string;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-info-adicional-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgFor],
  templateUrl: './mc-info-adicional.component.html',
  styleUrl: './mc-info-adicional.component.scss',
})
export class McInfoAdicionalComponent {
  @Output() responseModal = new EventEmitter<any>();
  Modal: DrawerInterface;
  valueInput: DtoModal = new DtoModal();

  constructor(
    private modalService: McInfoAdicionalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.modalService.modalState$.subscribe((option) => {
      this.valueInput = option.valueInput;
      console.log('this.valueInput', this.valueInput,this.valueInput.dataNegocio.nombre);
      if (this.valueInput.data) {
        this.dtoValue = { ...this.valueInput.data };
        console.log('this.dtoValue', this.dtoValue);
      } else {
        this.dtoValue = new DataInfo();
      }
      this.activate_modal(option.option);
    });
  }

  activate_modal(option: any) {
    // Entrada y respuesta del modal
    if (option == 'close') {
      this.Modal.hide();
    } else if (option == 'open') {
      this.create_modal();
    }
  }

  // ----------------- FUNCIONALIDAD COMPLETA ------------------------ \\
  dtoValue: DataInfo = new DataInfo();

  list_contactos: any[] = [];
  // ----------- PARA CREAR ESTOS MODELOS YA TENEMOS LOS DATOS DEL NEGOCIO Y LOS DATOS A AGREGAR
  // ----------- IMPLEMENTAR EL API
  coreRegister() {
    console.log("dto",this.dtoValue);
    this.modalService.addInfoAdicional(this.dtoValue).subscribe(
      (response) => {
        this.modalService.addInfoAdicionalHotel(this.valueInput.dataNegocio.hotelDetalleId, response).subscribe(
          (response) => {
            this.responseModal.emit(response);
            this.Modal.hide();
          },
          (err) => {
            console.log(err);
          }
        );

      },
      (err) => {
        console.log(err);
      }
    );
    /*this.modalService.uploadFoto(this.valueInput.dataNegocio.hotelDetalleId, this.list_contactos).subscribe(
        (response) => {
          console.log('response', response);
        },
        (err) => {
          console.log(err);
        }
      );*/
  }

  coreUpdate() {
    this.modalService.updateInfoAdicional(this.dtoValue).subscribe(
      (response) => {
        console.log('response', response);
        this.responseModal.emit(response);
        this.Modal.hide();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // ------------------- FUNCIONALIDAD CREAR MODAL -------------------- \\
  create_modal() {
    if (isPlatformBrowser(this.platformId)) {
      const $targetEl = document.getElementById('mc-info-adicional');
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
        id: 'mc-info-adicional',
        override: true,
      };

      this.Modal = new Drawer($targetEl, options, instanceOptions);
      this.Modal.show();
    }
  }
}
