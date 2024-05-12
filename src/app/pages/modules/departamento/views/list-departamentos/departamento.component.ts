import { DepartamentosService } from '../../services/departamentos.service';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DtoDepartamento } from '../../models/Dtos/DtoDepartamento';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';

@Component({
  selector: 'list-app-departamento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss'],
})
export class ListDepartamentoComponent extends BaseComponents {
  // --------------- Diseño Formulario --------------- \\
  input_class: any =
    'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer';
  label_class: any =
    'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public router: Router,
    private departamentosService: DepartamentosService,
  ) {
    super();
  }

  ngOnInit() {

    this.search_entidad({});
    //this.general_loads();
  }

  // ---------- LOADS FILTERS EN LIST ---------- \\
  general_loads() {}

  // ---------- SEARCH ---------- \\

  list_representantes: DtoDepartamento[] = [];
  search_entidad(form: any) {
    this.list_representantes = [];
    this.departamentosService.get_listado_departamentos().subscribe(
      (response: any) => {
        this.list_representantes = response;
        console.log(this.list_representantes);
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
    localStorage.setItem('itemSelected', JSON.stringify(data));
    this.router.navigate(['/admin/departamentos/administrate']);
  }

  goToCreate() {
    const data = {
      option: 'CREATE',
      data: {},
    };
    localStorage.setItem('itemSelected', JSON.stringify(data));
    this.router.navigate(['/home/add-departament']);
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
          this.departamentosService.delete_departamento(item.id).subscribe(
            (response: any) => {
              swalWithBootstrapButtons.fire({
                title: 'Borrado!',
                text: 'Se se elimino la empresa correctamente.',
                icon: 'success',
              });

              this.search_entidad(this.searchValueForm.value);
              this.loadingService.hide();
            },
            (err) => {
              Swal.fire({
                title: '¡Error!',
                text: 'Error al eliminar',
                icon: 'error',
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
        this.search_entidad(this.searchValueForm.value);
      }
    } else if (value == 'next') {
      const current = this.searchValueForm.get('page').value;

      this.searchValueForm.get('page').setValue(current + 1);
      this.search_entidad(this.searchValueForm.value);
    }*/
  }

  list_paises: any[] = [];
}
