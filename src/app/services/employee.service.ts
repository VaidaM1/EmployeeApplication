import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
   }

  public getEmployee() : Observable<Employee[]>{
    return this.http.get<Employee[]>("https://localhost:44349/Employee");
  }

  public getEmployeeById(id: number) : Observable<Employee>{
    return this.http.get<Employee>(`https://localhost:44349/Employee/${id}`);
  }

  public addEmployee(employee: Employee) : Observable<number>{
    return this.http.post<number>("https://localhost:44349/Employee", employee);
  }

  public deleteEmployee(id: number) : Observable<Employee>{
    return this.http.delete<Employee>(`https://localhost:44349/Employee/${id}`);
  }
  
  public updateEmployee(employee: Employee) : Observable<Employee>{
    return this.http.put<Employee>("https://localhost:44349/Employee", employee);
  }
}
