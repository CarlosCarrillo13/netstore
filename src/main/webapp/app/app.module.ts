import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { NetstoreSharedModule } from 'app/shared/shared.module';
import { NetstoreCoreModule } from 'app/core/core.module';
import { NetstoreAppRoutingModule } from './app-routing.module';
import { NetstoreHomeModule } from './home/home.module';
import { NetstoreEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    NetstoreSharedModule,
    NetstoreCoreModule,
    NetstoreHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    NetstoreEntityModule,
    NetstoreAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class NetstoreAppModule {}
