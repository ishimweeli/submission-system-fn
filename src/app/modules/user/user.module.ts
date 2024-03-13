import { NgModule } from '@angular/core';
import { CoreModule } from '../core.module';
import { LoginComponent } from 'src/app/components/login/login.component';
import { UserRoutesModule } from './user-routing-module';
import { ErrorComponent } from 'src/app/components/error/error.component';

@NgModule({
  declarations: [LoginComponent, ErrorComponent],
  imports: [CoreModule, UserRoutesModule]
})
export class UserModule {}
