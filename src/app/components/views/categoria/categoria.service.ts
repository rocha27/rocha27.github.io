import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CategoriaModel} from "./categoria.model";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) { }
  
  findAll():Observable<CategoriaModel[]> {
    const url = `${this.baseUrl}/categorias`
    return this.http.get<CategoriaModel[]>(url);
  }

  findById(id: String):Observable<CategoriaModel> {
    const url = `${this.baseUrl}/categorias/${id}`
    return this.http.get<CategoriaModel>(url)
  }

  create(categoria: CategoriaModel): Observable<CategoriaModel>{
    const url = `${this.baseUrl}/categorias`
    return this.http.post<CategoriaModel>(url, categoria);
  }

  update(categoria: CategoriaModel):Observable<void> {
    const url = `${this.baseUrl}/categorias/${categoria.id}`
    return this.http.put<void>(url, categoria)
  }

  delete(id: String): Observable<void> {
    const url = `${this.baseUrl}/categorias/${id}`
    return this.http.delete<void>(url)
  }

  mensagem(str: String): void {
    this.snackBar.open(`${str}`, 'OK', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }


}
