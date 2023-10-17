import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employeeList : Employee[] = [];
  currentPage : number = 0;
  totalPages : number = 0;
  currentEmployee : Employee = {};
  isNewEmployee : boolean = true;

  constructor(
    private employeeService : EmployeeService
  ) {}

  ngOnInit(): void {
      this.refreshPage();
  }

  refreshPage() : void {
    this.currentPage = 0;
    this.totalPages = 0;
    this.employeeList = [];
    this.loadEmployeePage(this.currentPage);
  }

  loadEmployeePage(page : number) : void {
    this.employeeService.getEmployeePage(page).subscribe(res => {
      this.totalPages = res.totalPages;
      this.employeeList = res.content;
      this.currentEmployee = {};
    },err => {
      console.log(err);
    });
  }

  loadEmployeeDetails(id : number) : void {
    this.isNewEmployee = false;
    this.employeeService.getEmployeeDetails(id).subscribe(res => {
      this.currentEmployee = res;
    }, err => {
      console.log(err);
    });
  }

  initiateAddEmployee() : void {
    this.isNewEmployee = true;
    this.currentEmployee = new Employee();
  }

  saveEmployee(data : Employee) : void {
    if(this.isNewEmployee) {
      this.addEmployee(data);
    } else {
      this.updateEmployee(data);
    }
  }

  reset() : void {
     const employeeId = this.currentEmployee.id || 0;    
     if(employeeId) {
      this.loadEmployeeDetails(employeeId);
    } else {
      this.currentEmployee = {};
    }
  }

  addEmployee(data : Employee) : void {
    this.employeeService.addEmployee(data).subscribe(res => {
      this.refreshPage();
    }, err => {
      console.log(err);
    });
  }

  updateEmployee(data : Employee) : void {
    const employeeId = this.currentEmployee?.id || 0;
    this.employeeService.updateEmployee(employeeId, data).subscribe(res => {
      this.refreshPage();
    }, err => {
      console.log(err);
    });
  }

  deleteEmployee(id : number) : void {
    const employeeId = this.currentEmployee?.id || 0;
    this.employeeService.deleteEmployee(employeeId).subscribe(res => {
      this.refreshPage();
    }, err => {
      console.log(err);
    });
  }
}
