export class BaseComponents {
    // ---------- ESTYLES INPUTS SEARCHS ----------- \\
    LabelInputsSearchs: any = 'block text-sm font-medium text-gray-900 dark:text-white';
    ValueInputsSearchs: any = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200 focus:border-blue-200 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';


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