import { Component, OnInit } from '@angular/core';
import {CategoriaService} from "../categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriaModel} from "../categoria.model";

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: CategoriaModel = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private categoriaService: CategoriaService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void {
    this.categoriaService.findById(this.categoria.id!).subscribe((resposta) => {
      this.categoria.nome = resposta.nome
      this.categoria.descricao= resposta.descricao
    })
  }

  delete(): void{
    this.categoriaService.delete(this.categoria.id!).subscribe((resposta) => {
      this.router.navigate(['categorias'])
      this.categoriaService.mensagem('Categoria deletada com sucesso!')
    }, err => {
      this.categoriaService.mensagem(err.error.error)
    })
  }

}
