import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'landing-component',
    templateUrl: 'landing.component.html',
    styleUrls: ['landing.component.scss']
})
export class LandingComponent implements OnDestroy {

    prefix = "url('./images/";
    suffix = "')";

    firstBackgroundVisible = true;

    firstBackgroundImageUrl;
    secondBackgroundImageUrl;

    backgroundImageNames = ['bg0.jpg', 'bg1.jpg', 'bg2.jpg', 'bg3.jpg'];
    backgroundIndex = 1;

    private _backgroundSwitchInterval;

    constructor() {

        this.firstBackgroundImageUrl = this.buildBackgroundUrl(0);
        this.secondBackgroundImageUrl = this.buildBackgroundUrl(1);

        this._backgroundSwitchInterval = window.setInterval(() => {
            this.firstBackgroundVisible = !this.firstBackgroundVisible;
            this.switchBackgroundImage();

        }, 20000);
    }

    ngOnDestroy() {
        window.clearInterval(this._backgroundSwitchInterval);
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

            console.log(this.secondBackgroundImageUrl, this.firstBackgroundImageUrl);

        }, 4000);
    }

    private buildBackgroundUrl(index: number) {
        return this.prefix + this.backgroundImageNames[index] + this.suffix;
    }
}
