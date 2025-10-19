import { Component } from '@angular/core';
import { TableInterfaceService } from '../table-interface.service';
import { TableStatus } from '../table.interface';

@Component({
  selector: 'table-status-card',
  templateUrl: './table-status-card.component.html',
  styleUrl: './table-status-card.component.scss'
})
export class TableStatusCardComponent {

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
