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
  public filteredClients$: any;
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
    this.filteredClients$ = combineLatest(
      [
        // <<<< The mentioned overload expects an array not Observables as params.
        this.clientService.getClients(),
        this.searchField.valueChanges.pipe(startWith(this.searchField.value)),
      ], // <<<<
      (clients: any, searchTerm: string):Observable<Client[]> => {
        return (clients.filter(
          (client: any) =>
            searchTerm === '' ||
            client.firstName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      }
    );
  }
  changeClients() {
    this.clientService.updateClients({
      firstName: 'aryadna',
      lastName: 'dsasd',
    });
  }
}
