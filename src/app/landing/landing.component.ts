import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'landing-component',
  templateUrl: 'landing.component.html',
  styleUrls: ['landing.component.css']
})
export class LandingComponent {

  prefix = "url('./images/";
  suffix = "')";

  firstBackgroundVisible = true;

  firstBackgroundImageUrl;
  secondBackgroundImageUrl;

  backgroundImageNames = ['bg0.jpg','bg1.jpg','bg2.jpg','bg3.jpg'];
  backgroundIndex = 1;

  constructor() {

    this.firstBackgroundImageUrl = this.buildBackgroundUrl(0);
    this.secondBackgroundImageUrl = this.buildBackgroundUrl(1);

    window.setInterval(() => {
      this.firstBackgroundVisible = !this.firstBackgroundVisible;
      this.switchBackgroundImage();

    },20000);
  }

  private switchBackgroundImage() {
    window.setTimeout(() => {
      this.backgroundIndex = (this.backgroundIndex + 1) % this.backgroundImageNames.length;

      if (this.firstBackgroundVisible) {
        this.secondBackgroundImageUrl = this.buildBackgroundUrl(this.backgroundIndex);
      }
      else {
        this.firstBackgroundImageUrl = this.buildBackgroundUrl(this.backgroundIndex);
      }

      console.log(this.secondBackgroundImageUrl,this.firstBackgroundImageUrl);

    }, 4000);
  }

  private buildBackgroundUrl(index: number) {
    return this.prefix + this.backgroundImageNames[index] + this.suffix;
  }

}
