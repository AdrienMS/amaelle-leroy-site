import { Pipe, PipeTransform } from '@angular/core';
import { Params } from '@angular/router';

import { Page } from '../../core';

@Pipe({
  name: 'singlePage'
})
export class SinglePagePipe implements PipeTransform {

  transform(pages: Array<Page>, path: Params = null): Page {
    let toReturn = pages[1];
    if (path.hasOwnProperty('nameSubPage')) {
      pages.forEach(page => {
        if (page.name === path.namePage && page.hasSubPages !== undefined && page.hasSubPages !== null) {
          page.hasSubPages.forEach(subPage => {
            if (pages[subPage].name === path.nameSubPage) {
              toReturn = pages[subPage];
            }
          });
        }
      });
    } else {
      pages.forEach(page => {
        if (page.name === path.namePage && (page.isSubPage === undefined || page.isSubPage === null)) {
          toReturn = page;
        }
      });
    }
    if (!path.hasOwnProperty('namePage')) {
      toReturn = pages[0];
    }
    return toReturn;
  }

}
