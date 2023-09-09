import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {Movies} from './models/movies';
import {MovieService} from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  sticky : boolean = false;
  subs: Subscription[] = [];
  trending!: Movies;
  popular!: Movies;
  topRated!: Movies;
  originals!: Movies;
  nowPlaying!: Movies;

  sliderConfig : object = {
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false
  };

  @ViewChild('stickHeader') header!: ElementRef;
  headerBGUrl: string ='';

  constructor(private movie: MovieService) {
  }

  ngOnInit(): void {
    this.subs.push(this.movie.getTrending().subscribe(data => {
      this.trending = data;
      if (this.trending && this.trending.results && this.trending.results[19]) {
        this.headerBGUrl = 'https://image.tmdb.org/t/p/original' + this.trending.results[19].backdrop_path;
      }
      
    }));
    this.subs.push(this.movie.getPopularMovies().subscribe(data => this.popular = data));
    this.subs.push(this.movie.getTopRated().subscribe(data => this.topRated = data));
    this.subs.push(this.movie.getOriginals().subscribe(data => this.originals = data));
    this.subs.push(this.movie.getNowPlaying().subscribe(data => this.nowPlaying = data));

  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])

  handleScroll() {
    if (this.header && this.header.nativeElement) {
      const windowScroll = window.pageYOffset;

      if (windowScroll >= this.header.nativeElement.offsetHeight) {
        this.sticky = true;
      } else {
        this.sticky = false;
      }
    }
  }

}