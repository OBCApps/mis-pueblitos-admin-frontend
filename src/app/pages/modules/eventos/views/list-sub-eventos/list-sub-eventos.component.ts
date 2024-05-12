import { SubEventoService } from '../../services/subEventosService';
import { EventoService } from '../../../eventos/services/eventosService';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DtoSubEvento, DtoSubEventoDetalle } from '../../models/DtoEventos';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';

@Component({
  selector: 'app-add-representante',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-sub-eventos.component.html',
  styleUrls: ['./list-sub-eventos.component.scss'],
})
export class ListSubEventosComponent extends BaseComponents {
  selectedFile: File;
  // --------------- Diseño Formulario --------------- \\
  addValueForm: FormGroup;
  addValueSubEvento: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private fb: FormBuilder,
    private eventoService: EventoService,
    private subEventoService: SubEventoService
  ) {
    super();
    this.addValueForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      nombre: [{ value: null, disabled: false }],
      descripcion: [{ value: null, disabled: false }],
      foto: [{ value: null, disabled: false }],
      ubicacionExacta: [{ value: null, disabled: false }],
      fechaInicio: [{ value: null, disabled: false }],
      fechaFin: [{ value: null, disabled: false }],
      lugarId: [{ value: null, disabled: false }],
    });

    this.addValueSubEvento = this.fb.group({
      id: [{ value: null, disabled: false }],
      nombre: [{ value: null, disabled: false }],
      descripcion: [{ value: null, disabled: false }],
      foto: [{ value: null, disabled: false }],
      dia: [{ value: null, disabled: false }],
      horaInicio: [{ value: null, disabled: false }],
      horaFin: [{ value: null, disabled: false }],
      eventoId: [{ value: null, disabled: false }],
    });
  }

  ngOnInit() {
    //this.loadLocalStorageData();
    this.general_loads();
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
  }

  // --------------- Loads Values --------------- \\
  general_loads() {
    this.load_lugares();
    this.get_listado_subeventos();
  }

  bool_search_api: boolean = true;

  ngOnDestroy() {
    //localStorage.removeItem('itemSelected');
  }
  filterSearch:any;

  dataLocalStorage: any;
  loadLocalStorageData() {
    this.dataLocalStorage = JSON.parse(localStorage.getItem('itemSelected'));
    console.log('this.dataLocalStorage', this.dataLocalStorage);
    if (this.dataLocalStorage.option == 'EDIT') {
      this.addValueForm.patchValue(this.dataLocalStorage.data);
      console.log('this.addValueForm', this.addValueForm.value);
      this.bool_search_api = true;
    } else if (this.dataLocalStorage.option == 'CREATE') {
      this.addValueForm.patchValue({});
    }
  }

  // --------- FUNCIONALIDAD TABS------------- \\

  Listado_subeventos: DtoSubEvento[] = [];
  Listado_subEventoDetalles: DtoSubEventoDetalle[] = [];
  get_listado_subeventos() {
    this.Listado_subeventos = [];
    const id = this.addValueForm.value.id;
    this.subEventoService.get_listado_subEventos().subscribe(
      (response: any) => {
        this.Listado_subeventos = response;
        this.Listado_subeventos.map((subevento) => {
          this.Listado_subEventoDetalles.push(...subevento.subEventoDetalles);
        });
        console.log(
          'this.Listado_subEventoDetalles',
          this.Listado_subEventoDetalles
        );
      },
      (err) => {}
    );
  }

  // --------- FUNCIONALIDAD MODAL RELACION - PODER------------- \\
  boolRelacionPoder: boolean = false;
  sentMOdal: any;
  activateRelacionPoder(value: any) {
    if (value.action == true) {
      this.sentMOdal.type = value.option;
      value.obj.eventoId = this.addValueForm.value.id;
      this.sentMOdal.data = value.obj;
      this.boolRelacionPoder = true;
    } else {
      this.boolRelacionPoder = false;
      //this.loadLocalStorageData();
      /* if (value.data) {
        console.log("this.sentMOdal.data", value);

        this.Listado_poderes.push(value.data)
      } */
    }
  }

  quitarEspacios(texto: string): string {
    return texto.replace(/\s/g, '-');
  }

  quitarTildes(texto: string): string {
    const mapaDeTildes: { [key: string]: string } = {
      á: 'a',
      é: 'e',
      í: 'i',
      ó: 'o',
      ú: 'u',
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ó: 'O',
      Ú: 'U',
      ü: 'u',
      Ü: 'U',
      ñ: 'n',
      Ñ: 'N',
    };

    return texto.replace(
      /[áéíóúÁÉÍÓÚüÜñÑ]/g,
      (letra) => mapaDeTildes[letra] || letra
    );
  }

  async nextPage() {
    var evento = this.addValueForm.value;
    var temp_lugar = this.list_lugares.find((x) => x.id == evento.lugarId);
    console.log('temp_lugar', temp_lugar);
    var departamentoNombre = temp_lugar.departamento.nombre;

    /*try {
      if (this.selectedFile) {
        this.s3Service.setDirName(
          `departamento/${this.quitarTildes(departamentoNombre)}/${
            temp_lugar.nombre
          }/eventos/${this.quitarEspacios(evento.nombre)}`
        );
        const file = this.selectedFile;
        evento.foto = await this.s3Service.uploadImage(file);
      }
    } catch (error) {
      Swal.fire({
        title: '¡Error!',
        text: 'Error al agregar',
        icon: 'error',
      });
      this.loadingService.hide();
    }*/

    if (this.dataLocalStorage.option == 'CREATE') {
      delete evento.id;
      this.eventoService.create_evento(evento).subscribe(
        (response: any) => {
          /*Swal.fire({
            title: '¡Creado!',
            text: 'Se creó exitosamente',
            icon: 'success',
          });*/
          const data = {
            option: 'EDIT',
            data: response,
          };
          //localStorage.setItem('itemSelected', JSON.stringify(data));
          this.loadLocalStorageData();
          this.change_tabs('Poderes');
        },
        (err) => {
          /*Swal.fire({
            title: '¡Error!',
            text: 'Error al actualizar',
            icon: 'error',
          });*/
        }
      );
    } else if (this.dataLocalStorage.option == 'EDIT') {
      this.eventoService.update_evento(evento.id, evento).subscribe(
        (response: any) => {
          /*Swal.fire({
            title: '¡Actualizado!',
            text: 'Se actualizó exitosamente',
            icon: 'success',
          });*/
          this.loadLocalStorageData();
        },
        (err) => {
          /*Swal.fire({
            title: '¡Error!',
            text: 'Error al actualizar',
            icon: 'error',
          });*/
        }
      );
    }
  }

  deleteSubEventoDetalle(value: any) {}

  deleteSubEvento(value: any) {
    this.subEventoService.delete_subEvento(value.id).subscribe(
      (response: any) => {
        /*Swal.fire({
          title: '¡Borrado!',
          text: 'Se eliminó exitosamente',
          icon: 'success',
        });*/

        this.loadLocalStorageData();
      },
      (err) => {
        /*Swal.fire({
          title: '¡Error!',
          text: 'Error al eliminar',
          icon: 'error',
        });*/
      }
    );
  }

  save_representante(value: any) {
    console.log(this.addValueForm.value);

    if (this.dataLocalStorage.option == 'CREATE') {
      console.log('agregamos');
    } else {
      console.log('actualizamos');
    }
  }

  show_error(obj: any) {
    /*Swal.fire({
      title: obj.title,
      text: obj.message,
      icon: obj.icon,
    });*/
  }

  // ------------- CALL LOADS --------- \\

  list_lugares: any[] = [];
  load_lugares() {
    this.list_lugares = [];
    /*this.lugarService.get_listado_lugares().subscribe(
      (response: any) => {
        this.list_lugares = response;

      },
      (err) => {

      }
    );*/
  }
}
