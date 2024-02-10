import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

class Employee{
  eid?:number;
  employeename?:string;
  salary?:string;
  designation?:string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  public employees : any;
  eid:number = 0;
  employeename:string = '';
  designation:string = '';
  salary:string = '';
  isEdit:boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.getEmployeeList()
  }

   public getEmployeeList()  {
      return this.http.get('http://localhost:7000/showemployee').subscribe( (data) =>{
      console.log(data);
      this.employees = data;
    });
   }

  OnSave(){
    const tempModal = new Employee();
    tempModal.employeename = this.employeename;
    tempModal.designation = this.designation;
    tempModal.salary = this.salary;

    return this.http.post('http://localhost:7000/addemployee', tempModal).subscribe((res:any) => {
      this.getEmployeeList();
      this.clearItems();
    })
  }

  OnClickEdit(row:any){
    this.isEdit = true;
    this.eid = row.eid;
    this.employeename = row.employeename;
    this.designation = row.designation;
    this.salary = row.salary;
  }

  OnEdit(){
    const tempModal = new Employee();
    tempModal.eid = this.eid;
    tempModal.employeename = this.employeename;
    tempModal.designation = this.designation;
    tempModal.salary = this.salary;

    return this.http.put('http://localhost:7000/updateemployee/'+this.eid, tempModal).subscribe((res:any) => {
      this.getEmployeeList();
      this.clearItems();
    })
  }

  OnDelete(id:number){
    return this.http.delete('http://localhost:7000/deleteemployee/'+id).subscribe((res:any) => {
      this.getEmployeeList();
    })
  }

  clearItems(){
    this.employeename='';
    this.designation='';
    this.salary = '';
    this.isEdit=false;
  }

}




