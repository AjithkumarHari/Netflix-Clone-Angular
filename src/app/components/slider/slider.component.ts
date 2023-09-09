import {Component, Input} from '@angular/core';
import {Movies} from '../../models/movies';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  
  @Input() sliderConfig : any;
  @Input() movies !: Movies;
  @Input() title !: string;

}