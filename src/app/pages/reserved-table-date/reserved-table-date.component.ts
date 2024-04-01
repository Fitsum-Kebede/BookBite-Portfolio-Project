import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReservationData, ReservedTableDate } from 'src/app/reservation';
import { ReservationService } from 'src/app/reservation.service';

@Component({
  selector: 'app-reserved-table-date',
  templateUrl: './reserved-table-date.component.html',
  styleUrls: ['./reserved-table-date.component.css'],
})
export class ReservedTableDateComponent {
  editCache: { [key: string]: { edit: boolean; data: ReservedTableDate } } = {};
  reservedTabelDate: ReservedTableDate[] = [];
  constructor(
    private reservationService: ReservationService,
    private message: NzMessageService
  ) {}
  ngOnInit(): void {
    this.reservationService
      .getNumberOfReservedTables()
      .subscribe((response) => {
        this.reservedTabelDate = response.reverse();
        this.updateEditCache();
      });
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.reservedTabelDate.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.reservedTabelDate[index] },
      edit: false,
    };
  }

  saveEdit(id: number): void {
    const index = this.reservedTabelDate.findIndex((item) => item.id === id);
    Object.assign(this.reservedTabelDate[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    var editData = {
      id: id,
      date: this.reservedTabelDate[index].date,
      numberOfTableReserved: this.reservedTabelDate[index].numberOfTableReserved,
    };
    this.reservationService
      .updateNumberOfReservedTable(editData, editData.id)
      .subscribe((res) => {
        console.log(res);
        console.log(editData);
        this.message.success('Update successful!', { nzDuration: 3000 });
      });
  }

  updateEditCache(): void {
    this.reservedTabelDate.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  deleteData(id: number) {
    this.reservationService.deleteReservedTableData(id).subscribe((res) => {
      this.message.success('Delete successful!', { nzDuration: 3000 });
      location.reload();
    });
  }
}
