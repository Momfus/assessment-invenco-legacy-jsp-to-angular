import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "../../shared/pageNotFound/pageNotFound.component";
import { UserLayoutComponent } from "./layouts/user-layout/user-layout.component";
import { UserPageComponent } from "./pages/user-page/user-page.component";


export const userCoreRoutes: Routes = [
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: UserPageComponent
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
