import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) { }

  public save(data) {
    return this.http.post<any>(environment.URL_SERVICE.concat('storage'), data)
        .pipe(map(data => {
          return data;
    }));
  }
}
