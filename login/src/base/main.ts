import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../app/0.common/0.1.angular/app.config';
import { RootPage } from '../app/1.view/1.1.pages/root.page/root.page';

bootstrapApplication(RootPage, appConfig)
  .catch((err) => console.error(err));
