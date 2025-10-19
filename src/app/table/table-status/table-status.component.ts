import { Component } from '@angular/core';
import { TableInterfaceService } from '../table-interface.service';
import { TableStatus } from '../table.interface';

@Component({
  selector: 'app-table-status',
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
