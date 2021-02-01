import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {HangoutResolverService} from './resolver/hangout-resolver.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
    },
    {
        path: 'folder/:id',
        loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
            },
            {
                path: 'hangout-detail/:id',
                resolve: {
                    special: HangoutResolverService
                },
                children: [
                    {
                        path: '',
                        loadChildren: () => import('./pages/hangout-detail/hangout-detail.module').then(m => m.HangoutDetailPageModule),
                    },
                    {
                        path: 'restaurant-service/:id',
                        resolve: {
                            special: HangoutResolverService
                        },
                        loadChildren:
                            () => import('./pages/restaurant-service/restaurant-service.module').then(m => m.RestaurantServicePageModule),
                        // canActivate: [AuthGuard]
                    },
                    {
                        path: 'bar-service/:id',
                        resolve: {
                            special: HangoutResolverService
                        },
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('./pages/bar-service/bar-service.module').then(m => m.BarServicePageModule),
                            },
                            {
                                path: 'drink-add/:id',
                                resolve: {
                                    special: HangoutResolverService
                                },
                                loadChildren: () => import('./pages/drink-add/drink-add.module').then( m => m.DrinkAddPageModule),
                                // canActivate: [AuthGuard]
                            }
                        ],
                        // canActivate: [AuthGuard]
                    },
                    {
                        path: 'takeaway-service/:id',
                        resolve: {
                            special: HangoutResolverService
                        },
                        loadChildren: () => import('./pages/takeaway-service/takeaway-service.module').then( m => m.TakeawayServicePageModule)
                    },
                    {
                        path: 'admin/:id',
                        loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
                    },
                    {
                        path: 'tickets/:id',
                        loadChildren: () => import('./pages/tickets/tickets.module').then( m => m.TicketsPageModule)
                    },
                    {
                        path: 'media/:id',
                        loadChildren: () => import('./pages/media/media.module').then( m => m.MediaPageModule)
                    }
                ],
                // canActivate: [AuthGuard]
            },
        ],
        // canActivate: [AuthGuard]
    },
    {
        path: 'hangout-edit',
        loadChildren: () => import('./pages/hangout-edit/hangout-edit.module').then(m => m.HangoutEditPageModule),
        // canActivate: [AuthGuard]
    },
    {
        path: 'hangout-add',
        loadChildren: () => import('./pages/hangout-add/hangout-add.module').then(m => m.HangoutAddPageModule),
        // canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
    },
    {
        path: 'landing',
        loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingPageModule)
    },
    {
        path: 'hangout-image-modal',
        loadChildren: () => import('./pages/hangout-image-modal/hangout-image-modal.module').then(m => m.HangoutImageModalPageModule)
    },
    {
        path: 'theme',
        loadChildren: () => import('./pages/theme/theme.module').then(m => m.ThemePageModule)
    },
    {
        path: 'theme-edit',
        loadChildren: () => import('./pages/theme-edit/theme-edit.module').then(m => m.ThemeEditPageModule)
    },
    {
        path: 'hangout-service-creation',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./pages/hangout-service-creation/hangout-service-creation.module').then(m => m.HangoutServiceCreationPageModule)
    },
    // {
    //     path: 'restaurant-service',
    //     loadChildren: () => import('./pages/restaurant-service/restaurant-service.module').then(m => m.RestaurantServicePageModule),
    //     canActivate: [AuthGuard]
    // },
    // {
    //     path: 'bar-service',
    //     loadChildren: () => import('./pages/bar-service/bar-service.module').then(m => m.BarServicePageModule),
    //     canActivate: [AuthGuard]
    // },
    {
        path: 'hotel-service',
        loadChildren: () => import('./pages/hotel-service/hotel-service.module').then(m => m.HotelServicePageModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'menu-add',
        loadChildren: () => import('./pages/menu-add/menu-add.module').then( m => m.MenuAddPageModule)
    },
    {
        path: 'menu-edit',
        loadChildren: () => import('./pages/menu-edit/menu-edit.module').then( m => m.MenuEditPageModule)
    },
    {
        path: 'menu-detail',
        loadChildren: () => import('./pages/menu-detail/menu-detail.module').then( m => m.MenuDetailPageModule)
    },
    {
        path: 'menu-image-modal',
        loadChildren: () => import('./pages/menu-image-modal/menu-image-modal.module').then( m => m.MenuImageModalPageModule)
    },
    {
        path: 'order-detail',
        loadChildren: () => import('./pages/order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
    },
    {
        path: 'admin-add',
        loadChildren: () => import('./pages/admin-add/admin-add.module').then( m => m.AdminAddPageModule)
    },
    {
        path: 'tickets-add',
        loadChildren: () => import('./pages/tickets-add/tickets-add.module').then( m => m.TicketsAddPageModule)
    },
    {
        path: 'tickets-edit',
        loadChildren: () => import('./pages/tickets-edit/tickets-edit.module').then( m => m.TicketsEditPageModule)
    },
    {
        path: 'tickets-detail',
        loadChildren: () => import('./pages/tickets-detail/tickets-detail.module').then( m => m.TicketsDetailPageModule)
    },
    {
        path: 'image-cropper',
        loadChildren: () => import('./pages/image-cropper/image-cropper.module').then( m => m.ImageCropperPageModule)
    },
    {
        path: 'image-preview',
        loadChildren: () => import('./pages/image-preview/image-preview.module').then( m => m.ImagePreviewPageModule)
    },
    {
        path: 'video-player',
        loadChildren: () => import('./pages/video-player/video-player.module').then( m => m.VideoPlayerPageModule)
    },
    {
        path: 'drink-detail',
        loadChildren: () => import('./pages/drink-detail/drink-detail.module').then( m => m.DrinkDetailPageModule)
    },
    {
        path: 'drink-opt-modal',
        loadChildren: () => import('./pages/drink-opt-modal/drink-opt-modal.module').then( m => m.DrinkOptModalPageModule)
    }
    // {
    //   path: 'drink-add',
    //   loadChildren: () => import('./pages/drink-add/drink-add.module').then( m => m.DrinkAddPageModule)
    // }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
