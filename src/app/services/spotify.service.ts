import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService implements OnInit{

  url: string = 'http://localhost:3000/spotify/02cc28d7d1c943ebb57d2a3665fc7eca/f7c9ea1478ce4258b1c65d8953cc1cd2';

  token: string = 'BQC6GUKArE73zpcClprSo_mQO5C5xFUg0C9nre6eg97yTSeUIDqD-A5KVXNWvmVrrGPVmv2NLZzi9fmQ2ic';
  
  constructor( private http: HttpClient ) {
  
    console.log("Este es el constructor de SpotifyService");

      this.http.get(this.url).subscribe((data: any) => {
            this.token = data.access_token;
           
      });
       
   }
   
   getToken() {
    
      return this.http.get(this.url);
   }

   setToken( tokenComp: string ){
     this.token = tokenComp;
   }

   getQuery( query: string ){
           
        
        const url = `https://api.spotify.com/v1/${ query }`;

        const headers = new HttpHeaders({
          'Authorization': 'Bearer '+ this.token
        });

        return this.http.get(url, { headers });
   }

   getNewReleases(){
      
       return this.getQuery('browse/new-releases?limit=20')
                  .pipe( map( data => data['albums'].items));

       
    }

    getArtistas( termino: string ){

      return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                 .pipe( map( (data: any) => {
                          return data.artists.items;
                  }));

    }

    getArtista( id: string ){

      return this.getQuery( `artists/${ id }`);
                // .pipe( map( (data: any) => data['artists'].items));

    }

    getTopTracks( id: string ){

      return this.getQuery(`artists/${id}/top-tracks?country=us`)
                 .pipe( map( (data: any) => data['tracks']));

    }

    ngOnInit() {
   

   }

  }
