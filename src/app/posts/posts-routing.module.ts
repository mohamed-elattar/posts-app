import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostEditorComponent } from './posts-editor/posts-editor.component';
import { AuthGuard } from '../auth/auth.guard';
import { PostsListComponent } from './posts-list/posts-list.component';
import { EditablePostResolverService } from './posts-editor/editable-post-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent
  },
  {
    path: 'editor',
    component: PostEditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:postId',
    component: PostEditorComponent,
    canActivate: [AuthGuard],
    resolve: { post: EditablePostResolverService }
  }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class PostsRoutingModule {}
