import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './modules/user/user.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './store/effects/auth.effects';
import { StoreModule } from '@ngrx/store';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIYVVpR2Nbe05xdV9GZFZVQ2YuP1ZhSXxQd0djXn5fcXZXQWReVUw=');
@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    UserModule,
    AppRoutingModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot([AuthEffect]),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    })
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule {}
