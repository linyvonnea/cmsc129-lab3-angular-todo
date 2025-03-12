


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private taskUrl = 'http://localhost:3000/tasks';
  private tasks = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) { 
    this.loadTasks();
  }

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable(); 
  }

  loadTasks(): void {
    this.http.get<Task[]>(this.taskUrl).subscribe(tasks => {
      this.tasks.next(tasks);
    });
  }



  addTask(task: Task): void {
    this.http.post<Task>(this.taskUrl, task).subscribe(() => {
        this.loadTasks();
    });
  }

  

  deleteTask(id: number): void {
    this.http.delete(`${this.taskUrl}/${id}`).subscribe(() => {
        this.loadTasks(); 
    });
  }
  
  updateTask(task: Task): void {
    this.http.put<Task>(`${this.taskUrl}/${task.id}`, task).subscribe(() => {
        this.loadTasks(); 
    });
  }


  undoDelete(task: Task): void {
    this.addTask(task);  
  }
}