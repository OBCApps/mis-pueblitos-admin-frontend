import { SubEventosService } from '../../services/subEventosService';
import {
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DtoSubEvento } from '../../models/DtoEventos';
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
    private subEventoService: SubEventosService
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
    this.general_loads();
  }

  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
  }

  // --------------- Loads Values --------------- \\
  general_loads() {
    this.get_listado_subeventos();
  }

  bool_search_api: boolean = true;

  ngOnDestroy() {
    //localStorage.removeItem('itemSelected');
  }
  filterSearch: any;

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
  get_listado_subeventos() {
    this.Listado_subeventos = [];
    this.subEventoService.get_listado_subEventos().subscribe(
      (response: any) => {
        this.Listado_subeventos = response;
        console.log('this.Listado_subEventos', this.Listado_subeventos);
      },
      (err) => {
        console.log('err', err);
        alert('Error al cargar los subeventos');
      }
    );
  }

  coreNew() {
    const data = {
      option: 'CREATE',
      data: new DtoSubEvento()
    }
    localStorage.setItem('dtoSelected', JSON.stringify(data));

    this.router.navigate(
      ['admin', 'subeventos', 'administrate'],
      //{ skipLocationChange: true }
    );
  }

  coreEdit(item: any) {
    const data = {
      option: 'EDIT',
      data: item
    }
    console.log("data", data);
    localStorage.setItem('dtoSelected', JSON.stringify(data));

    this.router.navigate(
      ['admin', 'subeventos', 'administrate'],
      //{ skipLocationChange: true }
    );
  }

  deleteSubEvento(value: any) {
    this.subEventoService.delete_subEvento(value.id).subscribe(
      (response: any) => {
        this.loadLocalStorageData();
      },
      (err) => {
        console.log('err', err);
        alert('Error al eliminar el subevento');
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

}
