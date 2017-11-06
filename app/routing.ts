import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Page Components
import { HomePageComp } from './page/home/';
import { DetailsPageComp } from './page/details/';

/*

Routing
=======

default state redirect to main state
main state has outlet as details
which is weather Details Page Component will be open there

*/
const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main',
    children: [
      { path: '', component: HomePageComp },
      { path: 'city/:cityID', component: HomePageComp,
        children: [
          { path: '', component: DetailsPageComp, outlet: 'details' },
        ]
      },
    ]
  },
  { path: '**', redirectTo: 'main' }
]

let routerOptions = (process.env.NODE_ENV === 'development') ? { useHash: true } : {};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions),
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {}

export const RoutingComp = [
  HomePageComp,
  DetailsPageComp,
];
