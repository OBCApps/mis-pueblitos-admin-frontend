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
import { DtoTours } from '../../../../modules/tours/models/Dtos/DtoTours';
import { McIncluyeService } from './mc-incluye.service';

class DtoModal {
  type: string;
  incluye: boolean;
  method: string;
  dataNegocio: DtoTours = new DtoTours();
  data: any;
}

class DataInfo {
  valor: string;
  beforeValor: string;
}

@Component({
  selector: 'app-incluye-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgFor],
  templateUrl: './mc-incluye.component.html',
  styleUrl: './mc-incluye.component.scss',
})
export class McIncluyeComponent {
  @Output() responseModal = new EventEmitter<any>();
  Modal: DrawerInterface;
  valueInput: DtoModal = new DtoModal();

  constructor(
    private modalService: McIncluyeService,
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
    if (this.valueInput.incluye) {
      this.valueInput.dataNegocio.incluye.push(this.dtoValue.valor);
    } else {
      this.valueInput.dataNegocio.noIncluye.push(this.dtoValue.valor);
    }

    this.modalService
      .uploadFoto(this.valueInput.dataNegocio.id, this.valueInput.dataNegocio)
      .subscribe(
        (response) => {
          this.responseModal.emit({
            incluye: this.valueInput.incluye,
            response: this.valueInput.incluye
              ? response.incluye
              : response.noIncluye,
          });
          this.Modal.hide();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  coreUpdate() {
    if (this.valueInput.incluye) {
      this.valueInput.dataNegocio.incluye =
        this.valueInput.dataNegocio.incluye.map((incluye) => {
          if (incluye == this.dtoValue.beforeValor) {
            return this.dtoValue.valor;
          } else {
            return incluye;
          }
        });
    } else {
      this.valueInput.dataNegocio.noIncluye =
        this.valueInput.dataNegocio.noIncluye.map((noIncluye) => {
          if (noIncluye == this.dtoValue.beforeValor) {
            return this.dtoValue.valor;
          } else {
            return noIncluye;
          }
        });
    }

    this.modalService
      .uploadFoto(this.valueInput.dataNegocio.id, this.valueInput.dataNegocio)
      .subscribe(
        (response) => {
          console.log('response', response, response.destinos);
          this.responseModal.emit({
            incluye: this.valueInput.incluye,
            response: this.valueInput.incluye
              ? response.incluye
              : response.noIncluye,
          });
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
      const $targetEl = document.getElementById('mc-incluye');
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
        id: 'mc-incluye',
        override: true,
      };

      this.Modal = new Drawer($targetEl, options, instanceOptions);
      this.Modal.show();
    }
  }
}
