



import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule, 
    TodoItemComponent,  
    MatButtonModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    FormsModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  sortOption: string = 'dateCreated';
  priorityFilter: string = 'All';

  constructor(private todoService: TodoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.todoService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFiltersAndSorting();
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.dateCreated = new Date().toISOString().split('T')[0];
        result.completed = false;
        this.todoService.addTask(result);
        this.tasks.push(result);
        this.applyFiltersAndSorting();
      }
    });
  }

  applyFiltersAndSorting(): void {
    let filtered = this.tasks;

    if (this.priorityFilter !== 'All') {
      filtered = filtered.filter(task => task.priority === this.priorityFilter);
    }

    filtered = filtered.sort((a, b) => {
      if (this.sortOption === 'dateCreated') {
        return new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
      } else if (this.sortOption === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (this.sortOption === 'priority') {
        const priorityOrder = { 'High': 1, 'Mid': 2, 'Low': 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

    this.filteredTasks = filtered;
  }

  sortTasks(): void {
    this.applyFiltersAndSorting();
  }

  filterTasks(): void {
    this.applyFiltersAndSorting();
  }
}