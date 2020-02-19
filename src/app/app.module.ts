import {MatInputModule,MatPaginatorModule,MatProgressSpinnerModule,MatSortModule,MatTableModule,MatIconModule,MatButtonModule,MatCardModule,MatFormFieldModule, MatBadgeModule, MatGridListModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatTooltipModule } from "@angular/material";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemandeursComponent } from './demandeur/demandeurs/demandeurs.component';
import { DemandeurAddComponent } from './demandeur/demandeur-add/demandeur-add.component';
import { DemandeurDetailComponent } from './demandeur/demandeur-detail/demandeur-detail.component';
import { DemandeurEditComponent } from './demandeur/demandeur-edit/demandeur-edit.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { LogoutComponent } from './logout/logout.component';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorService } from './login/http-interceptor-service.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormationAddComponent } from './formation/formation-add/formation-add.component';
import { FormationComponent } from './formation/formation/formation/formation.component';
@NgModule({
  declarations: [
    AppComponent,
    DemandeursComponent,
    DemandeurAddComponent,
    DemandeurDetailComponent,
    DemandeurEditComponent,
    LogoutComponent,  
    LoginComponent, SidenavComponent, FormationAddComponent, FormationComponent
  ],
  imports: [ 
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      LayoutModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule, 
      MatBadgeModule,
      MatSidenavModule,
      MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule, 
      CommonModule, 
      MatTabsModule, 
      MatStepperModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
