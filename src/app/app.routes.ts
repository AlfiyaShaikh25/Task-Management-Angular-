import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { TasksComponent } from './tasks/tasks.component';

export const routes: Routes = [
   { path: '', component: MainComponent }, 
    {path:'login',component:LoginComponent},
    {path:'registration',component:RegistrationComponent},
    { path: 'dashboard', component: DashboardComponent }, // ✅ Allow '/dashboard'
    { path: 'dashboard/:id', component: DashboardComponent } ,// ✅ Allow '/dashboard/:id'
    {path:'profile-setting',component:ProfileSettingComponent},
    {path:'view-projects',component:ViewProjectsComponent},
    { path: 'tasks/:title', component: TasksComponent },
    {path:'add-project',component:AddProjectComponent}
    
];
