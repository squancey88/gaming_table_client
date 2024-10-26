import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { TableStatusComponent } from "./table-status/table-status.component";
import { GameRunnerGuard } from './guards/game-runner-guard';
import { AicModule } from './aic/aic.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink,
    MatButtonModule, MatIconModule, MatToolbarModule, MatMenuModule,
    TableStatusComponent, AicModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gaming_table_client';
}
