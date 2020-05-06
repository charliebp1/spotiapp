import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitFilter',
  pure: false
})
export class LimitFilterPipe implements PipeTransform {

  transform(items: any[], callback: (item: any) => boolean): any {
    if(!items || !callback){
          return items;
    }

    return items.filter(item => callback(item));
    
  }

}
