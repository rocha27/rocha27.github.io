import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {LivroService} from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LivroModel} from "../livro-read-all/livro.model";

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  titulo = new FormControl('', [Validators.minLength(3)])
  nome_autor = new FormControl('', [Validators.minLength(3)])
  texto = new FormControl('', [Validators.minLength(10)])
  id_cat: String = ''
  livro: LivroModel = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  constructor(private livroService: LivroService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
  }

  create(): void {
    this.livroService.create(this.livro, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.livroService.mensagem('Livro criado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.livroService.mensagem('Erro ao criar novo livro! Tente mais tarde')

    })
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage() {
    if(this.titulo.invalid) {
      return 'O campo título deve conter entre 3 e 100 caracteres'
    }
    if(this.nome_autor.invalid) {
      return 'O campo nome do autor deve conter entre 3 e 100 caracteres'
    }
    if(this.texto.invalid) {
      return 'O campo texto deve conter entre 10 e 2000000 caracteres'
    }
    return false;
  }

}
