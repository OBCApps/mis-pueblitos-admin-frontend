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
import { McDestinosService } from './mc-destinos.service';
import { DtoHotelesDetalle } from '../../../../modules/hoteles/models/Dtos/DtoHotelesDetalle';
import { DtoTours } from '../../../../modules/tours/models/Dtos/DtoTours';

class DtoModal {
  type: string;
  method: string;
  dataNegocio: DtoTours = new DtoTours();
  data: any;
}

class DataInfo {
  valor: string;
  beforeValor: string;
}

@Component({
  selector: 'app-destinos-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgFor],
  templateUrl: './mc-destinos.component.html',
  styleUrl: './mc-destinos.component.scss',
})
export class McDestinosComponent {
  @Output() responseModal = new EventEmitter<any>();
  Modal: DrawerInterface;
  valueInput: DtoModal = new DtoModal();

  constructor(
    private modalService: McDestinosService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.modalService.modalState$.subscribe((option) => {
      this.valueInput = option.valueInput;
      console.log(
        'this.valueInput',
        this.valueInput,
        this.valueInput.dataNegocio.nombre
      );
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
    this.valueInput.dataNegocio.destinos.push(this.dtoValue.valor);

    this.modalService
      .uploadFoto(this.valueInput.dataNegocio.id, this.valueInput.dataNegocio)
      .subscribe(
        (response) => {
          this.responseModal.emit(response.destinos);
          this.Modal.hide();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  coreUpdate() {
    this.valueInput.dataNegocio.destinos = this.valueInput.dataNegocio.destinos.map(
      (destino) => {
        if (destino == this.dtoValue.beforeValor) {
          return this.dtoValue.valor;
        } else {
          return destino;
        }
      }
    );

    this.modalService
      .uploadFoto(this.valueInput.dataNegocio.id, this.valueInput.dataNegocio)
      .subscribe(
        (response) => {
          console.log('response', response,response.destinos);
          this.responseModal.emit(response.destinos);
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
      const $targetEl = document.getElementById('mc-destinos');
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
        id: 'mc-destinos',
        override: true,
      };

      this.Modal = new Drawer($targetEl, options, instanceOptions);
      this.Modal.show();
    }
  }
}
