import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieDetail, PaginatedRespones } from './shared/interfaces';


@Injectable({
  providedIn: 'root'
})
export class MovieService {


  private apiUrl: string = 'https://api.themoviedb.org/3';
  private apiKey: string = 'de60d82e7c7cfbc6d1629ffec9692e35';

  private options = new HttpParams().set('api_key', this.apiKey)

  constructor(private http: HttpClient) { }

  getMovieById(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.apiUrl}/movie/${id}`, { params: this.options })
  }

  getPopularMovies() : Observable<PaginatedRespones<Movie>> {
    return this.http.get<PaginatedRespones<Movie>>(`${this.apiUrl}/movie/popular`, { params: this.options })
  }

}
