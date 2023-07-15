import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-imperative',
  templateUrl: './imperative.component.html',
  styleUrls: ['./imperative.component.css']
})
export class ImperativeComponent {
  public searchField: FormControl;
  public clients: Client[]=[];
  public filteredClients: Client[]=[];
  // Trigger this to unsubscribe observables
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private clientService: ClientsService) {
    this.searchField = new FormControl('');
  }
  ngOnInit() {
    // Get our client data
    this.clientService
      .getClients()
      .pipe(takeUntil(this.destroy$))
      .subscribe((clients) => {
        this.clients = clients;
        // Set list to all clients by default
        this.filteredClients = clients;
      });
      
    // React to changes in the search term
    this.searchField.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.filteredClients = this.clients.filter(
          (client) =>
            searchTerm === '' ||
            client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  changeClients(){
    this.clientService.updateClients({firstName:'aryadna', lastName:'dsasd'});
  }

}
