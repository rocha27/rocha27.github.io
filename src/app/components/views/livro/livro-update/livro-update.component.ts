import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {LivroModel} from "../livro-read-all/livro.model";
import {LivroService} from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

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
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  findById(): void {
    this.livroService.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta;
    })
  }

  update(): void {
    this.livroService.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.livroService.mensagem('Livro atualizado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.livroService.mensagem('Falha ao atualizar livro! Tente mais tarde.')
    })
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
