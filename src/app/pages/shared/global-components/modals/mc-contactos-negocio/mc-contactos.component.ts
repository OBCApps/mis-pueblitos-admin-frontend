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
import { McContactosNegociosService } from './mc-contactos.service';
import { DtoContactosNegocioMantenimiento } from './models/DtoContactosNegocioMantenimiento';
import { DtoHotelesDetalle } from '../../../../modules/hoteles/models/Dtos/DtoHotelesDetalle';

class DtoModal {
  type: string;
  method: string;
  dataNegocio: DataNegocio = new DataNegocio();
  tipo: string;
  valor: string;
  data: DtoContactosNegocioMantenimiento;
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
      console.log('this.valueInput', this.valueInput);
      this.value = this.valueInput.data.valor;
      this.list_contactos = this.valueInput.dataNegocio.hotelDetalle.datos;
      if (this.valueInput.data) {
        this.dtoValue = { ...this.valueInput.data };
      } else {
        this.dtoValue = new DtoContactosNegocioMantenimiento();
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
  dtoValue: DtoContactosNegocioMantenimiento =
    new DtoContactosNegocioMantenimiento();
  value: string = '';
  list_contactos: any[] = [];
  selectTipo: any[] = [
    {
      value: null,
      desc: '-- Todos --',
    },
    {
      value: 'celular',
      desc: 'Celular',
    },
    {
      value: 'correo',
      desc: 'Correo',
    },
    {
      value: 'nroWhattsap',
      desc: 'N° Whattsapp',
    },
    {
      value: 'direccion',
      desc: 'Dirección',
    },
  ];

  // ----------- PARA CREAR ESTOS MODELOS YA TENEMOS LOS DATOS DEL NEGOCIO Y LOS DATOS A AGREGAR
  // ----------- IMPLEMENTAR EL API
  coreRegister() {
    /*this.modalService.uploadFoto(this.valueInput.dataNegocio.hotelDetalleId, this.list_contactos).subscribe(
        (response) => {
          console.log('response', response);
        },
        (err) => {
          console.log(err);
        }
      );*/
  }
  containType(){
    return Object.keys(this.valueInput.data).includes('type');
  }
  coreUpdate() {
    console.log('this.valueInput.dataNegocio', Object.keys(this.valueInput.data));
    if (this.containType()) {
      if (this.valueInput.data.tipo == 'celular') {
        this.valueInput.dataNegocio.celular = this.valueInput.valor;
      }

      if (this.valueInput.data.tipo == 'direccion') {
        this.valueInput.dataNegocio.direccion = this.valueInput.valor;
      }

      if (this.valueInput.data.tipo == 'correo') {
        this.valueInput.dataNegocio.correo = this.valueInput.valor;
      }

      this.modalService
        .uploadFoto(this.valueInput.dataNegocio.id, this.valueInput.dataNegocio)
        .subscribe(
          (response) => {
            console.log('response', response);
          },
          (err) => {
            console.log(err);
          }
        );
    }
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
        override: true,
      };

      this.Modal = new Drawer($targetEl, options, instanceOptions);
      this.Modal.show();
    }
  }
}
