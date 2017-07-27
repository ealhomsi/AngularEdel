import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from './app.router';

import { AppComponent } from './app.component';
import { BoardIndexComponent } from './board-index/board-index.component';
import { ViewForumComponent } from './view-forum/view-forum.component';
import { ViewTopicComponent } from './view-topic/view-topic.component';
import { PostingComponent } from './posting/posting.component';

@NgModule( {
  declarations: [
    AppComponent,
    BoardIndexComponent,
    ViewForumComponent,
    ViewTopicComponent,
    PostingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
