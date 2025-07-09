import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "../../shared/pageNotFound/pageNotFound.component";
import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";
import { UserListComponent } from "./pages/user-list/user-list.component";


export const userCoreRoutes: Routes = [
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: '**' ,
        component: PageNotFoundComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'user',
    pathMatch: 'full'
  }
];

export default userCoreRoutes;
