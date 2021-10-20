import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public firstName: string = "";
  public lastName: string = "";
  public id: number;
  public sex: string;

  public employees: Employee[] = [
    //{firstName: aa, lastName: aaa},
    //{firstName: bb, lastName: bbb},
    //{firstName: cc, lastName: ccc}
  ];
  
  public editMode: boolean = false;

  public title: string = "Epmloyees:";
  private employeeService: EmployeeService;

  constructor(employeeService: EmployeeService) { 
  
  this.employeeService = employeeService;
  }
    

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe((employeesFromApi) =>{
      this.employees = employeesFromApi;
      this.employees.sort((a, b) => a.firstName.localeCompare(b.firstName))
    })
  }

  public addEmployee() : void{
    var newEmployee: Employee = {
      firstName: this.firstName,
      lastName: this.lastName,
      id: this.id,
      sex: this.sex
    }
  
    this.employeeService.addEmployee(newEmployee).subscribe((employeeId) => {
      newEmployee.id = employeeId;
      this.employees.push(newEmployee);
    }); 
  }

  public deleteEmployee(id: number) : void{
  //console.log(id);
      this.employeeService.deleteEmployee(id).subscribe(() =>{
        this.employees = this.employees.filter(e => e.id != id)
      });
  }

  public updateEmployee(employee: Employee) : void{

    this.editMode = true;

    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.id = employee.id;
    this.sex = employee.sex;
    };

    sendUpdateEmployee(){
      var updatedEmployee: Employee = {
        firstName: this.firstName,
        lastName: this.lastName,
        id: this.id,
        sex: this.sex
      }
      this.employeeService.updateEmployee(updatedEmployee).subscribe(() => {
          // for (let i = 0; i < this.employees.length; i++){
          //   const emp = this.employees[i];
          //   if(emp.id == updatedEmployee.id){
          //     emp.firstName = updatedEmployee.firstName;
          //     emp.lastName = updatedEmployee.lastName;
          //     emp.sex = updatedEmployee.sex;
          //     console.log("labuka :)");     
          //     return;
          //   }
          // }
          //=====================
          let index = this.employees.map(e => e.id).indexOf(this.id);
           this.employees[index] = updatedEmployee;
        }); 
  }
}

