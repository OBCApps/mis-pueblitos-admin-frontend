import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AlertsToastComponent } from './pages/shared/global-components/toast/alerts-toast/alerts-toast.component';
import { LoadingsComponent } from './pages/shared/global-components/loadings/loading-lds-face/loadings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AlertsToastComponent, LoadingsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mis-pueblitos-admin-frontend';

  ngOnInit(): void {

  }
}
