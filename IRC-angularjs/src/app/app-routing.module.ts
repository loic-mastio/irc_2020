import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChannelComponent } from "./channel/channel.component";
import { ChannelsComponent } from "./channels/channels.component";
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyChannelComponent } from './my-channel/my-channel.component';

const routes: Routes = [
  {path: 'channel' , component: ChannelComponent},
  {path: 'channels' , component: ChannelsComponent},
  {path: 'create-account' , component: CreateAccountComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'my-account' , component: MyAccountComponent},
  {path: 'my-channel' , component: MyChannelComponent},
  { path: '',  redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
