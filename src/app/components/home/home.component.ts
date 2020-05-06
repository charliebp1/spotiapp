import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit{
  
  token: string;

  loading: boolean;
  nuevasCanciones: any[] = [];

  error: boolean;
  mensajeError: string;
  
  constructor(  private spotify: SpotifyService ) { 

    this.loading = true;
    this.error = false;

    
  
    this.spotify.getNewReleases()
                .subscribe( (data: any) => {
                    this.nuevasCanciones = data;
                    this.loading = false;
                }, (errorServicio) => {
                    this.loading = false;
                    this.error = true;
                    console.log(errorServicio);
                    this.mensajeError = errorServicio.error.error.message;
                });
    
  }
  
  setToken(){
    this.spotify.getToken().subscribe( (data: any) => {
      this.token = data.access_token;
      //console.log(this.token);
      this.spotify.setToken(this.token);
    });
    
  }

  ngOnInit(){
  
    this.setToken();
  }
  
}
