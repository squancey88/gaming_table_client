import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TableInterfaceService } from '../table-interface.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TableStatus } from '../table.interface';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table-status',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule, MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './table-status.component.html',
  styleUrl: './table-status.component.scss'
})
export class TableStatusComponent {

  connected = false;
  currentStatus?: TableStatus;

  constructor(
    private tableService: TableInterfaceService
  ) {
    this.tableService.connected.subscribe((value) => {
      this.connected = value
      this.currentStatus = this.tableService.currentStatus;
    });

  }

}
