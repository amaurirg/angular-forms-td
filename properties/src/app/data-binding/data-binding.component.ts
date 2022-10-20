import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  passa: string = 'Angular';

  constructor() { }

  ngOnInit(): void {
  }

  onMudouValor(evento: any) {
    console.log(evento.novoValor);
  }
}

// form-field.component.ts
