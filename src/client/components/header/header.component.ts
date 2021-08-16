import {Component} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.template.html',
  styleUrls: ['./header.style.scss']
})
export class HeaderComponent {
  constructor(private readonly apiService: ApiService) {
  }
  public onFetch(): void {
    const url = 'https://statapp-functions2.azurewebsites.net/api';
    this.apiService.get(`${url}/births`).subscribe(v => console.log(v));
  }
}
