import { LowerCasePipe, NgFor, isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { Modal, ModalOptions } from 'flowbite';

import { FiltroComunUbigeo } from './structures/FiltroComunNegocioServicio';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SelectorServicesNegocio } from './selector-services-negocio.service';

@Component({
  selector: 'app-selector-services-negocio-component',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgFor, LowerCasePipe],
  providers: [],
  templateUrl: './selector-services-negocio.component.html',
  styleUrl: './selector-services-negocio.component.scss',
})
export class SelectorServicesNegocioComponent {
  @Output() ubigeoSelected = new EventEmitter<any>();

  Modal: any;
  show: any;

  valueInput: any;
  constructor(
    private modalService: SelectorServicesNegocio,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.modalService.modalState$.subscribe((option) => {
      this.activate_modal(option.option);
      this.valueInput = option.valueInput;
    });
  }

  // ------------ SEARCH LOCATIONS ------------- \\
  filtro: FiltroComunUbigeo = new FiltroComunUbigeo();
  loadingSearch: boolean = false;
  search_all() {
    this.loadingSearch = true;
    this.filtro.paginacion.paginacionListaResultado = [];
    this.modalService.list_by_filter(this.filtro).subscribe((pg) => {
      this.filtro.paginacion = pg;
      this.loadingSearch = false;
    });
  }

  // ---------------- SEND LOCATION SELECTED -------------- \\
  selectItem(item: any) {
    const data = {
      selected: item,
      valueInput: this.valueInput,
    };
    this.ubigeoSelected.emit(data);
    this.Modal.hide();
  }

  // -------------- CREACION DEL MODAL -------------- \\
  create_modal() {
    if (isPlatformBrowser(this.platformId)) {
      const $targetEl = document.getElementById('selectorNegocio-modal');

      const options: ModalOptions = {
        placement: 'bottom-right',
        backdrop: 'dynamic',

        closable: true,
        onHide: () => {
          console.log('modal is hidden');
        },
        onShow: () => {
          console.log('modal is shown');
        },
        onToggle: () => {
          console.log('modal has been toggled');
        },
      };

      const instanceOptions = {
        id: 'ubigeo-modal',
        override: true,
      };

      this.Modal = new Modal($targetEl, options, instanceOptions);
      this.Modal.show();
    }
  }

  activate_modal(option: any) {
    if (option == 'close') {
      this.Modal.hide();
      this.filtro = new FiltroComunUbigeo();
    } else if (option == 'open') {
      this.create_modal();
      this.filtro.paginacion.paginacionRegistroInicio = 0;
      this.filtro.paginacion.paginacionRegistrosPorPagina = 5;
      this.search_all();
    }
  }

  option_pagination(value: any) {
    const total = this.filtro.paginacion.paginacionRegistrosEncontrados;
    if (value == 'next') {
      if (
        this.filtro.paginacion.paginacionRegistroInicio +
          this.filtro.paginacion.paginacionRegistrosPorPagina <
        total
      ) {
        this.filtro.paginacion.paginacionRegistroInicio =
          this.filtro.paginacion.paginacionRegistroInicio +
          this.filtro.paginacion.paginacionRegistrosPorPagina;
        this.search_all();
      }
    } else if (value == 'prev') {
      if (
        this.filtro.paginacion.paginacionRegistroInicio -
          this.filtro.paginacion.paginacionRegistrosPorPagina >=
        0
      ) {
        this.filtro.paginacion.paginacionRegistroInicio =
          this.filtro.paginacion.paginacionRegistroInicio -
          this.filtro.paginacion.paginacionRegistrosPorPagina;
        this.search_all();
      }
    }
  }
}
