import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoardIndexComponent } from './board-index/board-index.component';
import { ViewForumComponent } from './view-forum/view-forum.component';
import { ViewTopicComponent } from './view-topic/view-topic.component';
import { PostingComponent } from './posting/posting.component';

export const router: Routes = [
    { path: '', redirectTo: 'board-index', pathMatch: 'full' },
    { path: 'board-index', component: BoardIndexComponent },
    { path: 'view-forum/:id', component: ViewForumComponent },
    { path: 'view-topic/:id', component: ViewTopicComponent },
    { path: 'reply/:parentTopicId', component: PostingComponent },
    { path: 'create-topic/:parentForumId', component: PostingComponent },
    { path: '**', redirectTo: 'board-index' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot( router );
