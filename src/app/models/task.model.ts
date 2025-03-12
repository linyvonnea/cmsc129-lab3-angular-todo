export interface Task {
  id: number;
  name: string;
  dueDate: string;
  dueTime: string; 
  priority: 'High' | 'Mid' | 'Low';
  dateCreated: string;
  completed: boolean;
}
