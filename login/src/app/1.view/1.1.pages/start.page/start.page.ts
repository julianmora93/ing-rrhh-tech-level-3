import { Component, Inject } from '@angular/core';
import { RootPage } from '../root.page/root.page';

@Component({
    standalone: true,
    imports: [
        RootPage
    ],
    templateUrl: './start.page.html',
    styleUrl: './start.page.scss'
})
export default class StartPage {

    constructor(@Inject(RootPage) _rootPage: RootPage){
        _rootPage.rootTitle = 'Main';
        _rootPage.setMenuById(0);
    }

}