import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tweet-stream',
  templateUrl: './tweet-stream.component.html',
  styleUrls: ['./tweet-stream.component.scss']
})
export class TweetStreamComponent implements OnInit {
  emojiCode: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const blub = this.route.params.subscribe(params => {
      this.emojiCode = params['emojicode']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
  }
}
