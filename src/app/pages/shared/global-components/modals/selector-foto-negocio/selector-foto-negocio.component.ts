import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  Inject,
  Output,
  PLATFORM_ID,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectorFotoNegocioService } from './selector-foto-negocio.service';
import { isPlatformBrowser } from '@angular/common';
import { Modal, ModalOptions } from 'flowbite';

@Component({
  selector: 'app-selector-foto-negocio',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './selector-foto-negocio.component.html',
  styleUrl: './selector-foto-negocio.component.scss',
})
export class SelectorFotoNegocioComponent {
  @Output() responseModal = new EventEmitter<any>();
  Modal: any;
  show: any;
  file: File;
  valueInput: any;
  constructor(
    private modalService: SelectorFotoNegocioService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.modalService.modalState$.subscribe((option) => {
      console.log('option option foto', option);
      this.activate_modal(option.option);
      this.valueInput = option.valueInput;
    });
  }

  activate_modal(option: any) {
    if (option == 'close') {
      this.Modal.hide();
    } else if (option == 'open') {
      this.create_modal();
    }
  }

  create_modal() {
    if (isPlatformBrowser(this.platformId)) {
      const $targetEl = document.getElementById('selectorFoto-modal');

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
        id: 'selectorFoto-modal',
        override: true,
      };

      this.Modal = new Modal($targetEl, options, instanceOptions);
      this.Modal.show();
    }
  }
  handleFileSelect(event) {
    this.file = event.target.files[0];
    console.log('file', this.file);
  }
  upload_file() {
    console.log('valueInput', this.valueInput.id);
    this.modalService.uploadFoto(this.valueInput.id, this.file,this.valueInput.type).subscribe(
      (response) => {
        console.log('response', response);
        this.responseModal.emit(response);
        this.Modal.hide();
      },
      (error) => {
        console.log('error', error.error.message);
        if(error.error.message=="No se pueden subir más fotos"){
          alert('Excedió el límite de fotos permitidas');
        }else{
          alert('Error al subir la foto');
        }
        this.responseModal.emit(null);
        this.Modal.hide();
      }
    );
  }
}
