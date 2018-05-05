import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit, OnDestroy {
  track = true;
  emojiCode: string;
  routeSubject: Subscription;

  constructor(private route: ActivatedRoute, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.routeSubject = this.route.params.subscribe(params => {
      this.emojiCode = params['emojicode'];
      this.ref.detectChanges(); // TODO check why this is necessary
    });
  }

  ngOnDestroy() {
    if (this.routeSubject) {
      this.routeSubject.unsubscribe();
    }
  }
}