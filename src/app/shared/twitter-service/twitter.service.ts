import { Injectable } from '@angular/core';

@Injectable()
export class TwitterService {

  constructor() { }

  showModal(text : string, hashtags :  string[], via : string) {
    window.open(`https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags.join(',')}&via=${via}`,'_blank',"height=250,width=500");
  }

}
