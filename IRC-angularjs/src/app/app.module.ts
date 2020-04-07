import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChannelsComponent } from './channels/channels.component';
import { ChannelComponent } from './channel/channel.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyChannelComponent } from './my-channel/my-channel.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChannelsComponent,
    ChannelComponent,
    CreateAccountComponent,
    MyAccountComponent,
    MyChannelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
