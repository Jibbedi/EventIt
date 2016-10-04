import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    selector: 'entry',
    templateUrl: 'entry.component.html',
    styleUrls: ['entry.component.scss']
})
export class EntryComponent implements OnInit {

    highlightedSelection : string;

    constructor(private _router : Router,route : ActivatedRoute) {
        route.children[0].url.subscribe(route => this.highlightedSelection = route[0].path);
    }

    ngOnInit() {
    }

    moveTo(moveTo: string) {
        console.log(moveTo);
        this.highlightedSelection = moveTo;
        this._router.navigateByUrl('app/' + moveTo);
    }

}
