import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit{

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduation'
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      package: '',
      experience: ''

    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data)
      {
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
  
            alert('Employee Updated');
            console.log("this is what the  updated val is", val);
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);
  
          },
        });


      }
      else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
  
            alert('Employee added succesfully');
            console.log("this is what the val is", val);
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);
  
          },
        });

      }
    }

  }

  closeit() {
    this._dialogRef.close();
  }


}
