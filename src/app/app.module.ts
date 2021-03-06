import { isPlatformBrowser } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { BrowserModule, Meta, Title } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import {
  AngularFireAnalyticsModule,
  COLLECTION_ENABLED,
  CONFIG,
  DEBUG_MODE,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  ServiceWorkerModule,
  SwRegistrationOptions,
} from '@angular/service-worker';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from '@tumi/environments/environment';
import {
  EmailLoginDialogComponent,
  LoginOptionsDialogComponent,
  NavigationComponent,
} from '@tumi/components';
import { SharedModule } from '@tumi/modules/shared';
import { MoveUrlDialogComponent } from './components/move-url-dialog/move-url-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginOptionsDialogComponent,
    EmailLoginDialogComponent,
    MoveUrlDialogComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    AngularFireFunctionsModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: true,
        },
      },
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js'),
    SharedModule,
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    Meta,
    Title,
    {
      provide: CONFIG,
      useValue: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        anonymize_ip: true,
      },
    },
    {
      provide: DEBUG_MODE,
      useFactory: (platform: any) =>
        isPlatformBrowser(platform) &&
        JSON.parse(localStorage.getItem('@@debug') ?? 'false'),
      deps: [PLATFORM_ID],
    },
    {
      provide: COLLECTION_ENABLED,
      useFactory: (platform: any) =>
        isPlatformBrowser(platform) &&
        !JSON.parse(localStorage.getItem('disableAnalytics') ?? 'false'),
      deps: [PLATFORM_ID],
    },
    {
      provide: SwRegistrationOptions,
      useFactory: (platform: any) => ({
        enabled:
          isPlatformBrowser(platform) && location.host.includes('esn.world'),
      }),
      deps: [PLATFORM_ID],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
