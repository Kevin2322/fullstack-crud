import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  public employees : any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.employeeList()
  }

   public employeeList()  {
      return this.http.get('http://localhost:7000/showemployee').subscribe( (data) =>{
      console.log(data);
      this.employees = data;
    });
    // console.log(api);

  }

  trackByFn(index: any,employee: any): any {
    return employee.eid;
  }

}




