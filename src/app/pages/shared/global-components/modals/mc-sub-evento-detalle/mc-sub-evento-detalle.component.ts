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
import { MCSubEventoDetalleService } from './mc-sub-evento-detalle.service';
import { DtoHotelesDetalle } from '../../../../modules/hoteles/models/Dtos/DtoHotelesDetalle';
import { DtoSubEvento, DtoSubEventoDetalle } from '../../../../modules/eventos/models/DtoEventos';

class DtoModal {
  type: string;
  method: string;
  dataNegocio: DtoSubEvento = new DtoSubEvento();
  data: DtoSubEventoDetalle;
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

@Component({
  selector: 'app-sub-evento-detalle-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgFor],
  templateUrl: './mc-sub-evento-detalle.component.html',
  styleUrl: './mc-sub-evento-detalle.component.scss',
})
export class MCSubEventoDetalleComponent {
  @Output() responseModal = new EventEmitter<any>();
  Modal: DrawerInterface;
  valueInput: DtoModal = new DtoModal();

  constructor(
    private modalService: MCSubEventoDetalleService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.modalService.modalState$.subscribe((option) => {
      this.valueInput = option.valueInput;
      console.log('this.valueInput', this.valueInput);
      if (this.valueInput.data) {
        this.dtoValue = { ...this.valueInput.data };
      } else {
        this.dtoValue = new DtoSubEventoDetalle();
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
  dtoValue: DtoSubEventoDetalle =
    new DtoSubEventoDetalle();

  // ----------- PARA CREAR ESTOS MODELOS YA TENEMOS LOS DATOS DEL NEGOCIO Y LOS DATOS A AGREGAR
  // ----------- IMPLEMENTAR EL API
  coreRegister() {
    this.modalService.addSubEventoDetalle(this.dtoValue).subscribe(
        (response) => {
          console.log('response', response);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  coreUpdate() {
    console.log('this.valueInput.dataNegocio', Object.keys(this.valueInput.data));
    this.modalService
        .updateSubEventoDetalle(this.valueInput.dataNegocio.id, this.valueInput.data)
        .subscribe(
          (response) => {
            console.log('response', response);
          },
          (err) => {
            console.log(err);
          }
        );
  }

  // ------------------- FUNCIONALIDAD CREAR MODAL -------------------- \\
  create_modal() {
    if (isPlatformBrowser(this.platformId)) {
      const $targetEl = document.getElementById('mc-sub-evento-detalle');
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
        id: 'mc-sub-evento-detalle',
        override: true,
      };

      this.Modal = new Drawer($targetEl, options, instanceOptions);
      this.Modal.show();
    }
  }
}
