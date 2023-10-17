import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {

  @Input()
  isNew? : boolean;

  @Input()
  employee! : Employee;

  @Output()
  save : EventEmitter<Employee> = new EventEmitter();

  @Output()
  reset : EventEmitter<any> = new EventEmitter();

  clearForm() : void {
    this.reset.emit();
  }

  saveEmployee() : void {
    this.save.emit(this.employee);
  }
}
