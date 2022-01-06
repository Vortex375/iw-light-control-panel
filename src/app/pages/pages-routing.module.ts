import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DevicesComponent } from './devices/devices.component';
import { ScenesComponent } from './scenes/scenes.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'devices',
      component: DevicesComponent,
    },
    {
      path: 'scenes',
      component: ScenesComponent,
    },
    {
      path: '',
      redirectTo: 'devices',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
