import { DepartamentosService } from '../../services/departamentos.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DtoDepartamento } from '../../models/Dtos/DtoDepartamento';
import { BaseComponents } from '../../../../shared/global-components/BaseComponents';

@Component({
  selector: 'app-edit-departamento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-departamento.component.html',
  styleUrls: ['./edit-departamento.component.scss'],
})
export class AdministrateDepartamentoComponent extends BaseComponents {
  selectedFile: File;

  // --------------- Diseño Formulario --------------- \\
  input_class: any =
    'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer';
  label_class: any =
    'peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6';

  addValueForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departamentosService: DepartamentosService,
  ) {
    super();
  }

  ngOnInit() {
    this.loadLocalStorageData();
    this.bool_search_api = true;
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
  }

  // --------------- Loads Values --------------- \\
  general_loads() {}

  bool_search_api: boolean = false;

  ngOnDestroy() {
    localStorage.removeItem('itemSelected');
  }

  dataLocalStorage: any;

  loadLocalStorageData() {
    this.dataLocalStorage = JSON.parse(localStorage.getItem('itemSelected'));
    console.log('this.dataLocalStorage', this.dataLocalStorage);
    if (this.dataLocalStorage.option == 'EDIT') {
      this.bool_search_api = true;
      this.dataLocalStorage.data.foto_input = null;
      this.addValueForm.patchValue(this.dataLocalStorage.data);
    } else if (this.dataLocalStorage.option == 'CREATE') {
      this.bool_search_api = true;
      this.addValueForm.patchValue({});
    }
  }

  // --------- FUNCIONALIDAD TABS------------- \\
  async nextPage() {
    var departamento: DtoDepartamento = this.addValueForm.value;

    if (this.dataLocalStorage.option == 'CREATE') {
      delete departamento.id;
      this.departamentosService.create_departamento(departamento).subscribe(
        (response: any) => {
          console.log('response', response);
          const data = {
            option: 'EDIT',
            data: response,
          };
          localStorage.setItem('itemSelected', JSON.stringify(data));
          this.loadLocalStorageData();

        },
        (err) => {
          console.log('err', err);
        }
      );
    } else if (this.dataLocalStorage.option == 'EDIT') {
      this.departamentosService
        .update_departamento(departamento.id, departamento)
        .subscribe(
          (response: any) => {
            const data = {
              option: 'EDIT',
              data: response,
            };
            localStorage.setItem('itemSelected', JSON.stringify(data));
            this.loadLocalStorageData();

          },
          (err) => {
            console.log('err', err);
          }
        );
    }
  }
}
