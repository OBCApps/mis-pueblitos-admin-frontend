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
} from 'flowbite';
import { McHoraAtencionService } from './mc-hora-atencion.service';
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
  dia: string;
  rangoHoras: string;
  beforeDia: string;
}

@Component({
  selector: 'app-hora-atencion-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgFor],
  templateUrl: './mc-hora-atencion.component.html',
  styleUrl: './mc-hora-atencion.component.scss',
})
export class McHoraAtencionComponent {
  @Output() responseModal = new EventEmitter<any>();
  Modal: DrawerInterface;
  valueInput: DtoModal = new DtoModal();

  constructor(
    private modalService: McHoraAtencionService,
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

  }

  coreUpdate() {
    this.modalService.updateHoraAtencion(this.valueInput.dataNegocio.id, this.dtoValue).subscribe((response) => {
      console.log('response', response);
      this.responseModal.emit(response.horaAtencion);
        this.Modal.hide();
    }, (error) => {
      console.log('error', error);
      alert('Error al actualizar la hora de atención');
    }
    );
  }

  // ------------------- FUNCIONALIDAD CREAR MODAL -------------------- \\
  create_modal() {
    if (isPlatformBrowser(this.platformId)) {
      const $targetEl = document.getElementById('mc-hora-atencion');
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
        id: 'mc-hora-atencion',
        override: true,
      };

      this.Modal = new Drawer($targetEl, options, instanceOptions);
      this.Modal.show();
    }
  }
}
