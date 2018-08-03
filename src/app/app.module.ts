import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HiComponent } from './hi/hi.component';
import { BlogComponent } from './blog/blog.component';
import { ExplicitSynopticsComponent } from './explicit-synoptics/explicit-synoptics.component';
import { SexploreComponent } from './sexplore/sexplore.component';
import { ShopComponent } from './shop/shop.component';
import { ExplicitComponent } from './explicit/explicit.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { MembersComponent } from './members/members.component';
import { MailingListComponent } from './mailing-list/mailing-list.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MessagingComponent } from './messaging/messaging.component';
import {OrderPipe} from '../assets/services/orderby';
import { ForumComponent } from './forum/forum.component';
import { GeneralSubmissionComponent } from './general-submission/general-submission.component';
import { MemberActivityComponent } from './member-activity/member-activity.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RatingsComponent } from './ratings/ratings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HiComponent,
    BlogComponent,
    ExplicitSynopticsComponent,
    SexploreComponent,
    ShopComponent,
    ExplicitComponent,
    AddCommentComponent,
    MembersComponent,
    MailingListComponent,
    ContactUsComponent,
    MessagingComponent,
    OrderPipe,
    ForumComponent,
    GeneralSubmissionComponent,
    MemberActivityComponent,
    RatingsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
     {path: "", component: HomeComponent}
   /*    {path: "product", component: ProductComponent},
      {path: "updateProduct/:id", component: UpdateProductComponent} */
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
