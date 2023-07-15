import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Client } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients.service';
@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent {
  public searchField: FormControl;
  public filteredClients$: Observable<Client[]>;
  constructor(private clientService: ClientsService) {
    this.searchField = new FormControl('');
  }
  ngOnInit() {
    // Get a stream of our client data
    const clients$ = this.clientService.getClients();
    // Get a stream of our search term
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );
    // Combine the latest values from both streams into one stream
    this.filteredClients$ = combineLatest([clients$, searchTerm$]).pipe(
      map(([clients, searchTerm]) =>
        clients.filter(
          (client) =>
            searchTerm === '' ||
            client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
  changeClients(){
    this.clientService.updateClients({firstName:'aryadna', lastName:'dsasd'});
  }
}
