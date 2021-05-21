import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GalleryPageComponent, SingleGalleryComponent, GalleryCategoriesPageComponent } from './pages';

const routes: Routes = [
    {
        path: 'galerie',
        children: [
            { path: ':category', component: GalleryCategoriesPageComponent, data: { animationState: 'Category'}  },
            { path: ':category/:name', component: SingleGalleryComponent, data: { animationState: 'SingleGallery'} },
            { path: '', component: GalleryPageComponent, data: { animationState: 'GalleriesList'} }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {}
