import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MovieService } from '../movie.service';
import { Movie } from '../shared/interfaces';

interface Card {
  cols: number,
  rows: number
}

interface MovieCard extends Card {
  id: number,
  title: string,
  poster: string
}

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  cards: MovieCard[] = []

  constructor(private breakpointObserver: BreakpointObserver, private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getPopularMovies()
      .subscribe(res => {
        this.cards = res.results.map(this.makeMovieCard)
      })
  }

  private makeMovieCard(movie: Movie) {
    return {
      id: movie.id,
      title: movie.title,
      poster: `http://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      cols: 1,
      rows: 1
    }
  }
}
