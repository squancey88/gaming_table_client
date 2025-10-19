import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { TableModule } from '../table/table.module';
import { AicModule } from '../aic/aic.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatGridListModule, MatCardModule, TableModule, AicModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
