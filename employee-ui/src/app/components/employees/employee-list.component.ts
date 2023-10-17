import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
 
  @Input()
  employeeList : Employee[] = [];

  @Input()
  totalPages : number = 0;

  @Input()
  currentPage : number = 0;

  selectedEmployee? : Employee;
  
  @Output()
  pageChange : EventEmitter<number>  = new EventEmitter();

  @Output()
  delete : EventEmitter<number> = new EventEmitter();

  @Output()
  add : EventEmitter<number> = new EventEmitter();

  @Output()
  select : EventEmitter<number> = new EventEmitter();

  getPageRange() : number[] {
    return [...Array(this.totalPages).keys()];
  }

  gotoPage(page : number) : void {
    if(page < 0 || page >= this.totalPages) {
      return;
    }
    
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  addEmployee() : void {
    this.add.emit();
    this.selectedEmployee = undefined;
  }

  selectEmployee(employee : Employee) : void {
    this.selectedEmployee = employee;
    this.select.emit(this.selectedEmployee?.id);
  }

  deleteEmployee() : void {
    if(this.selectedEmployee) {
      this.delete.emit(this.selectedEmployee?.id);
    }
  }
}
