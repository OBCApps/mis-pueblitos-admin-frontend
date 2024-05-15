import { EventoService } from './../../services/eventosService';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { DtoEvento, DtoEventos } from '../../models/DtoEventos';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';

@Component({
  selector: 'app-list-eventos-representantes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-eventos.component.html',
  styleUrls: ['./list-eventos.component.scss'],
})
export class ListEventosComponent extends BaseComponents {
  // --------------- Diseño Formulario --------------- \\
  input_class: any =
    'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer';
  label_class: any =
    'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public router: Router,
    private eventoService: EventoService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.search_representante({});
    this.general_loads();

    this.transferedDataToNavar({ title: 'Listado de Firmantes' });
  }
  // ---------- CHANGE NAVAR ---------- \\
  transferedDataToNavar(value: any): void {
    console.log('CAMBIO');
  }

  // ---------- LOADS FILTERS EN LIST ---------- \\
  general_loads() {
    //this.load_empresas();
    //this.load_entidades();
    //this.load_tipo_firmantes();
    //this.load_poder();
    //this.load_estado_poder();
  }

  // ---------- SEARCH ---------- \\
  search_representante(form: any) {
    console.log(form);
    this.list_representantes = [];
    this.eventoService.get_listado_eventos().subscribe(
      (response: any) => {
        this.list_representantes = response;
        console.log(this.list_representantes);
        if (this.list_representantes.length == 0) {
          this.continuePagination('preview');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // ----------- ACTIONS EDIT AND DELETE ------- \\

  goToEdit(item: any) {
    const data = {
      option: 'EDIT',
      data: item,
    };
    console.log('data', data);
    localStorage.setItem('dtoSelected', JSON.stringify(data));

    this.router.navigate(
      ['admin', 'eventos', 'administrate']
      //{ skipLocationChange: true }
    );
  }

  goToCreate() {
    const data = {
      option: 'CREATE',
      data: new DtoEvento(),
    };
    localStorage.setItem('dtoSelected', JSON.stringify(data));

    this.router.navigate(
      ['admin', 'eventos', 'administrate']
      //{ skipLocationChange: true }
    );
  }
  cleanAll() {
    /*const { page, pageSize } = this.searchValueForm.value;
    this.searchValueForm.reset({
      paisEmpresa: null,
      banco: null,
      empresa: null,
      poder: null,
      tipoFirmante: null,
      estadoPoder: null,
      page,
      pageSize,
    });*/
    this.search_representante({});
  }
  deleteItem(item: any) {
    /*const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
        cancelButton:
          'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro?',
        text: 'Se borrarán los datos de este elemento.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.loadingService.show();
          this.representantesService.delete_representante(item.documentoIdentidad).subscribe(
          (response: any) => {
            swalWithBootstrapButtons.fire({
              title: "Borrado!",
              text: "El representante se elimino correctamente.",
              icon: "success"
            });


            this.search_representante(this.searchValueForm.value)
            this.loadingService.hide();
          },
          (err) => {
            Swal.fire({
              title: '¡Error!',
              text: 'Error al eliminar',
              icon: 'error'
            });

            this.loadingService.hide();
          }
        );
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });*/
  }

  // --------------- PAGINATION IMPLEMENTATION ------------- \\
  continuePagination(value: any) {
    /*if (value == 'preview') {
      const current = this.searchValueForm.get('page').value;
      if (current > 0) {
        this.searchValueForm.get('page').setValue(current - 1);
        this.search_representante(this.searchValueForm.value);
      }
    } else if (value == 'next') {
      const current = this.searchValueForm.get('page').value;

      this.searchValueForm.get('page').setValue(current + 1);
      this.search_representante(this.searchValueForm.value);
    }*/
  }

  // ----------- CALL LOADS ------ \\
  list_representantes: DtoEventos[] = [];
  load_list_representantes() {
    this.list_representantes = [];
    this.eventoService.get_listado_eventos().subscribe(
      (response: DtoEventos[]) => {
        this.list_representantes = response;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
