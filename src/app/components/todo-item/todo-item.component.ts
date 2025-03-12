import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TodoService } from '../../services/todo.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatCheckboxModule, 
    MatIconModule, 
    FormsModule
  ],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() task!: Task;

  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  toggleCompletion(): void {
    this.task.completed = !this.task.completed; 
    this.task = { ...this.task };
    this.todoService.updateTask(this.task); 
  }

  
  editTask(event?: Event): void {
    if (event) {
      event.stopPropagation(); 
    }
    
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
      data: { ...this.task }
    });
  
    dialogRef.afterClosed().subscribe(updatedTask => {
      if (updatedTask) {
        updatedTask.id = this.task.id;
        this.todoService.updateTask(updatedTask);
      }
    });
  }
  

  deleteTask(event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      const deletedTask = { ...this.task };  
      this.todoService.deleteTask(this.task.id);
      
      const snackBarRef = this.snackBar.open('Task deleted', 'Undo', { duration: 3000 });
      snackBarRef.onAction().subscribe(() => {
        this.todoService.undoDelete(deletedTask);
      });
    }
  }
  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High': return 'high-priority';
      case 'Mid': return 'mid-priority';
      case 'Low': return 'low-priority';
      default: return '';
    }
  }
}