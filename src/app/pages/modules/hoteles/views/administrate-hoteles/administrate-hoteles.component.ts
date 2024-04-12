import { Component } from '@angular/core';

@Component({
  selector: 'app-administrate-hoteles',
  standalone: true,
  imports: [],
  templateUrl: './administrate-hoteles.component.html',
  styleUrl: './administrate-hoteles.component.scss'
})
export class AdministrateHotelesComponent {

  
  // --------- FUNCIONALIDAD TABS------------- \\
  tab_selected: any = 'profile';
  DesignTabClassSelected: any = 'inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group cursor-default'
  DesignIconClassSelected: any = 'w-4 h-4 me-2 text-blue-600 dark:text-blue-500 cursor-default	'
  DesignTabClassNotSelected: any = 'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group cursor-pointer'
  DesignIconClassNotSelected: any = 'w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300 cursor-pointer'

  change_tabs(type: any) {
    this.tab_selected = type;
  }

  showSelectedTab(value: any, tabSelected: any) {
    if (tabSelected == value) {
      return [this.DesignTabClassSelected, this.DesignIconClassSelected]
    } else {
      return [this.DesignTabClassNotSelected, this.DesignIconClassNotSelected]
    }
  }
}
