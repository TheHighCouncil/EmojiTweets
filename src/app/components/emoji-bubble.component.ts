import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-emoji-bubble',
  templateUrl: './emoji-bubble.component.html',
  styleUrls: ['./emoji-bubble.component.scss']
})
export class EmojiBubbleComponent {
  @Input() emojiData;

  constructor() {}
}
