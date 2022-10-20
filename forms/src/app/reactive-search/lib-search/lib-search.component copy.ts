import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.css'],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any> | undefined;
  total: number | undefined;
  FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges
    .pipe(
      // tira espaços do que é digitado no input
      map(value => value.trim()),
      // filtra a partir da qtde de carateres abaixo
      filter(value => value.length > 3),
      // tap(value => console.log(value)),
      // aguarda 200ms a cada letra digitada antes de fazer nova busca
      debounceTime(200),
      // caso apague e digite o mesmo valor não fará nova busca
      distinctUntilChanged(),
      // faz a requisição
      switchMap(value => this.http.get(this.SEARCH_URL, {
        params: {
          search: value,
          fields: this.FIELDS
        }
      })),
      // atribui o valor do total a variável this.total
      tap((res: any) => this.total = res.total),
      // pega do json os valores que estão no Observable this.results$
      map((res: any) => res.results)
    );
  }

  onSearch() {

    let value = this.queryField.value;

    if (value && (value = value.trim()) !== '') {

      // Uma forma de passar os parâmetros
      const params_ = {
        search: value,
        fields: this.FIELDS
      }

      // Melhor forma de passar os parâmetros
      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', this.FIELDS);


      this.results$ = this.http
        // Podemos substituir esse get passando os parâmetros
        // .get(`${this.SEARCH_URL}?fields=${fields}&search=${value}`)
        .get(this.SEARCH_URL, {params})
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }
}
