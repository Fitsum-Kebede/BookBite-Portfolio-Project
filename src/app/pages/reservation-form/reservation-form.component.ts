import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReservationData, ReservedTableDate } from 'src/app/reservation';
import { ReservationService } from 'src/app/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
})
export class ReservationFormComponent {
  reservationForm!: FormGroup;
  totalNumberOfSitsAvailable: number = 40;
  numberOfReservedTable: number = 40;
  filteredReservedTable: ReservedTableDate[] = [];
  currentDate!: string;
  selectedDate!: string;
  submitted: boolean = false;

  carosilData = [
    {
      id: 1,
      title: 'Reservation One',
      description: 'Apptizer',
      uri: '../../../assets/images01.jpg',
    },
    {
      id: 2,
      title: 'Reservation Two',
      description: 'Main Course',
      uri: '../../../assets/images02.jpg',
    },
    {
      id: 3,
      title: 'Reservation Three',
      description: 'Desserts',
      uri: '../../../assets/images03.jpg',
    },
  ];

  constructor(
    // private fb: FormBuilder,
    private reservationService: ReservationService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.reservationFormValidation();
    this.getTotalSits();
    this.getReservedTableDate();
  }

  reservationFormValidation() {
    this.reservationForm = new FormGroup({
      fullName: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('[a-zA-Z ]*'),
        ])
      ),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/
        ),
      ]),
      email: new FormControl('', Validators.email),
      date: new FormControl('', Validators.required),
      time: new FormControl(
        '',
        Validators.compose([Validators.required, this.timeRangeValidator])
      ),
      occasion: new FormControl('', Validators.required),
      message: new FormControl(''),
      status: new FormControl('Pending'),
      numberOfPeople: new FormControl(
        2,
        Validators.compose([
          Validators.required,
          Validators.min(2),
          Validators.max(this.numberOfReservedTable),
        ])
      ),
    });
  }

  async getTotalSits(): Promise<number> {
    this.reservationService.getTotalNumberOfSits().subscribe((response) => {
      if (response.length) {
        for (let index = 0; index < response.length; index++) {
          this.totalNumberOfSitsAvailable =
            response[index].totalNumberOfSitsAvailable;
        }
      }
    });
    return this.totalNumberOfSitsAvailable;
  }

  async getReservedTableDate(): Promise<number> {
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];

    this.reservationService
      .getNumberOfReservedTables()
      .subscribe((response: ReservedTableDate[]) => {
        var currentReservedTable = response.filter(
          (reservedTabeleData: { date: String }) =>
            reservedTabeleData.date == this.currentDate.toString()
        );
        if (currentReservedTable.length) {
          for (let index = 0; index < currentReservedTable.length; index++) {
            this.numberOfReservedTable =
              this.totalNumberOfSitsAvailable -
              currentReservedTable[index].numberOfTableReserved;
          }
        } else {
          this.numberOfReservedTable = this.totalNumberOfSitsAvailable;
        }
      });
    return this.numberOfReservedTable;
  }

  get controls() {
    return this.reservationForm.controls;
  }

  private timeRangeValidator(control: { value: any }) {
    const inputTime = control.value;
    const isValid = inputTime >= '11:00' && inputTime <= '23:30';
    return isValid ? null : { invalidTime: true };
  }

  calculateDateOfReservedTable() {
    this.selectedDate = this.reservationForm.value.date;
    this.reservationService
      .getNumberOfReservedTables()
      .subscribe((response: ReservedTableDate[]) => {
        this.filteredReservedTable = response.filter(
          (reservedTabeleData: { date: any }) =>
            reservedTabeleData.date == this.selectedDate.toString()
        );
        if (this.filteredReservedTable.length) {
          for (
            let index = 0;
            index < this.filteredReservedTable.length;
            index++
          ) {
            this.numberOfReservedTable =
              this.totalNumberOfSitsAvailable -
              this.filteredReservedTable[index].numberOfTableReserved;
          }
        } else {
          this.numberOfReservedTable = this.totalNumberOfSitsAvailable;
        }
      });
  }

  updateReservedTable() {
    var id, date;
    var numberOfTableReserved = 0;
    for (let index = 0; index < this.filteredReservedTable.length; index++) {
      id = this.filteredReservedTable[index].id;
      date = this.filteredReservedTable[index].date;
      numberOfTableReserved =
        this.filteredReservedTable[index].numberOfTableReserved;
    }
    var reserveDateTable = {
      id: id,
      date: date,
      numberOfTableReserved: numberOfTableReserved + 1,
    };
    this.reservationService
      .updateNumberOfReservedTable(reserveDateTable, id)
      .subscribe((response: ReservedTableDate) => {
        console.log(response);
        this.numberOfReservedTable =
          this.totalNumberOfSitsAvailable - response.numberOfTableReserved;
        console.log('Reserved table was updated!');
      });
  }

  createNewTableDate() {
    var reserveDateTable = {
      date: this.reservationForm.value.date,
      numberOfTableReserved: 1,
    };
    this.reservationService
      .createNewTable(reserveDateTable)
      .subscribe((response: ReservedTableDate) => {
        console.log(response);
        this.numberOfReservedTable =
          this.totalNumberOfSitsAvailable - response.numberOfTableReserved;
        console.log('New Reservation table with Date was added');
      });
  }

  submitForm() {
    this.submitted = true;
    if (this.reservationForm.invalid) {
      return;
    }
    this.reservationService
      .createReservation(this.reservationForm.value)
      .subscribe((response) => {
        if (response) {
          if (this.numberOfReservedTable == this.totalNumberOfSitsAvailable) {
            this.createNewTableDate();
          } else {
            this.updateReservedTable();
          }
          alert('Reservation successful!');
          this.reservationForm.reset();
          this.submitted = false;
        } else {
          alert('Something went wrong!');
        }
      });
  }
}
