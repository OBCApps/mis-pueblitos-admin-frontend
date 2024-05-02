import { Component, Renderer2 } from '@angular/core';
import { ToastService } from '../toast.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-alerts-toast',
  standalone: true,
  imports: [NgFor],
  templateUrl: './alerts-toast.component.html',
  styleUrl: './alerts-toast.component.scss'
})
export class AlertsToastComponent {

  constructor(private toastService: ToastService) { }

  // Funciones para agregar y eliminar toasts usando el servicio ToastService
  deleteToast(index: number) {
    console.log("deñete", index);
    
    this.toastService.deleteToast(index);
  }

  addToast(data: any) {
    console.log("add");
    
    this.toastService.addToast(data);   
    

  }
  // Esta función puede ser útil para obtener la lista de mensajes de toasts
  getListMessages() {
    return this.toastService.getListMessages();
  }
}
