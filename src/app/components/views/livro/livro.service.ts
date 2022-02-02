import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LivroModel} from "./livro-read-all/livro.model";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.baseUrl

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar ) { }

  findAllByCategoria(id_cat: String): Observable<LivroModel[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.get<LivroModel[]>(url)
  }

  findById(id: String): Observable<LivroModel> {
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.get<LivroModel>(url);
  }

  update(livroModel: LivroModel): Observable<LivroModel> {
    const url = `${this.baseUrl}/livros/${livroModel.id}`
    return this.http.put<LivroModel>(url, livroModel);
  }

  create(livro: LivroModel, id_cat: String): Observable<LivroModel> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.post<LivroModel>(url, livro)
  }

  delete(id: String): Observable<void> {
    const url = `${this.baseUrl}/livros/${id}`
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
