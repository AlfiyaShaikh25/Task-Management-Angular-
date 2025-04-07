import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Task } from '../interfaces/Task';
import { FormBuilder, FormGroup,  FormsModule,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { title } from 'process';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-tasks',
  standalone: true, 
  imports: [NgFor,NgClass,FormsModule,NgIf,ReactiveFormsModule,RouterLink,NavBarComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  projectTitle: string|null=''
  editingTaskIndex: number | null = null;
  projectId: string | null = null;
  addTask: FormGroup;
  
  confirmDelete=''
  tasks: any[] = [];
  newTask: any = {
    title: '',
    assignedTo: '',
    status: 'Pending',
    assignedUser: '',
    estimate: '',
    timeSpent: ''
  };
  constructor(private route: ActivatedRoute,private fb: FormBuilder) {
    this.addTask = this.fb.group({
      title: ['', Validators.required],
      assignedTo: ['', Validators.required],
      status: ['', Validators.required],
      assignedUser: ['', Validators.required],
      estimate: ['', Validators.required],
      timeSpent: ['', Validators.required],



     
    });

  }

  ngOnInit() {
    this.projectTitle = this.route.snapshot.paramMap.get("title");
    const storedUser = localStorage.getItem("loggedInUser");
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const projectsKey = `projects_${user.username}`;
      const projects = JSON.parse(localStorage.getItem(projectsKey) || "[]");
  
      const project = projects.find((p: any) => p.title === this.projectTitle);
  
      if (project && project.tasks) {
        this.tasks = project.tasks;
      } else {
        this.tasks = [];
        console.error("No tasks found for this project!");
      }
    }
  }
  


  closeTaskForm() {
    const modal = document.getElementById('taskModal');
    if (modal) {
      (modal as any).classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  }
  
  editTask(index: number) {
    console.log('Edit clicked, index:', index); 
    this.editingTaskIndex = index;
    const taskToEdit = this.tasks[index];
  
    // Patch the form with the task's values
    this.addTask.patchValue({
      title: taskToEdit.title,
      assignedTo: taskToEdit.assignedTo,
      status: taskToEdit.status,
      assignedUser: taskToEdit.assignedUser,
      estimate: taskToEdit.estimate,
      timeSpent: taskToEdit.timeSpent
    });
  
    // Show the modal
    const modal = document.getElementById('taskModal');
    if (modal) {
      (modal as any).classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }
  
  
  addOrUpdateTask() {
    if (this.addTask.valid) {
      const taskData = this.addTask.value;
  
      if (this.editingTaskIndex !== null) {
        this.tasks[this.editingTaskIndex] = { ...taskData };
      } else {
        this.tasks.push({ ...taskData });
      }
  
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const projectsKey = `projects_${user.username}`;
        const projects = JSON.parse(localStorage.getItem(projectsKey) || '[]');
        const project = projects.find((p: any) => p.title === this.projectTitle);
        if (project) {
          project.tasks = this.tasks;
          localStorage.setItem(projectsKey, JSON.stringify(projects));
        }
      }
       alert('task updated')
      this.addTask.reset();
      this.editingTaskIndex = null;
      this.closeTaskForm();
    } else {
      this.addTask.markAllAsTouched();
    }
  }
  
  
  
  
  
  
  openTaskForm(index: number) {
    this.editingTaskIndex = index;
    this.addTask.reset({
      title: '',
      assignedTo: '',
      status: 'In Progress',
      assignedUser: '',
      estimate: '',
      timeSpent: ''
    });
  
    const modal = document.getElementById('taskModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }
  
  deleteTask(index: number) {
    if (confirm("Are you sure you want to delete this task?")) {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const projectsKey = `projects_${user.username}`;
        const projects = JSON.parse(localStorage.getItem(projectsKey) || "[]");
        const project = projects.find((p: any) => p.title === this.projectTitle);
  
        if (project && project.tasks) {
          project.tasks.splice(index, 1);
          this.tasks.splice(index, 1);
          localStorage.setItem(projectsKey, JSON.stringify(projects));
        }
      }
    }
  }
  
  
  searchTerm: string = '';

  get filteredProjects() {
    return this.tasks.filter(project =>
      project.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  
  
  }
  
