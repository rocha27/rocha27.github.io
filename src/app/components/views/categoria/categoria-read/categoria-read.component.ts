import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../categoria.service";
import {CategoriaModel} from "../categoria.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-categoria-read',
    templateUrl: './categoria-read.component.html',
    styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

    categorias: CategoriaModel[] = [];

    displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];

    constructor(private service: CategoriaService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.findAll();
    }

    findAll() {
        this.service.findAll().subscribe(resposta => {
            this.categorias = resposta;
        })
    }

    navegarParaCategoriaCreate() {
        this.router.navigate(["categorias/create"])
    }


}
