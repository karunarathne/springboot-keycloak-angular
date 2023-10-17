import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeePage(pageNo : number) : Observable<any> {
    const url = `${this.getBaseUrl()}?page=${pageNo}&size=10`;
    return this.http.get<any>(url, this.getOptions());
  }

  getEmployeeDetails(id : number) : Observable<Employee> {
    const url = `${this.getBaseUrl()}/${id}`;
    return this.http.get<any>(url, this.getOptions());
  }

  addEmployee(employee : Employee) : Observable<any> {
    const url = `${this.getBaseUrl()}`;
    return this.http.post<Employee>(url, employee, this.getOptions());
  }

  updateEmployee(id : number, employee : Employee) : Observable<any> {
    const url = `${this.getBaseUrl()}/${id}`;
    return this.http.put<Employee>(url, employee, this.getOptions());
  }

  deleteEmployee(id : number) : Observable<any> {
    const url = `${this.getBaseUrl()}/${id}`;
    return this.http.delete<Employee>(url, this.getOptions());
  }

  private getBaseUrl() : string {
    return "http://localhost:8081/employees";
  }

  private getOptions() {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
  }
}
