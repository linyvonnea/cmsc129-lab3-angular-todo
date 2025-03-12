import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatDialogModule, MatTimepickerModule, MatIconModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
  priorities = ['High', 'Mid', 'Low'];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

 
  saveTask(): void {
    console.log('Before saving:', this.data);
  
    if (this.data.dueDate instanceof Date) {
      this.data.dueDate = this.data.dueDate.toISOString().split('T')[0];  // Format YYYY-MM-DD
    }
  
    if (this.data.dueTime instanceof Date) {
      console.log('Fixing dueTime before saving');
      const hours = this.data.dueTime.getHours().toString().padStart(2, '0');
      const minutes = this.data.dueTime.getMinutes().toString().padStart(2, '0');
      this.data.dueTime = `${hours}:${minutes}`;
    } else {
      console.log('dueTime is already formatted:', this.data.dueTime);
    }
  
    console.log('After saving:', this.data);
    this.dialogRef.close(this.data);
  }
}