import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Persona } from '../model/persona';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  miUrl: string = "http://localhost:9000/api/v1/persona/";

  constructor(private http:HttpClient) { }

  getAll(): Observable<Persona[]>{
   return this.http.get<Persona[]>(this.miUrl);
  }

  getOne(id: number): Observable<Persona>{
   return this.http.get<Persona>(this.miUrl+id);
  }

  post(persona: Persona):Observable<Persona>{
  return  this.http.post<Persona>(this.miUrl,persona);
  }

  put(id: number , persona : Persona):Observable<Persona>{
  return  this.http.put<Persona>(this.miUrl+id,persona)
  }

  delete(id:number):Observable<any>{
   return this.http.delete(this.miUrl+id);
  }

}
