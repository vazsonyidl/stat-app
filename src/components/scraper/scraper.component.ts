import {Component} from "@angular/core";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-scraper',
  templateUrl: './scraper.template.html'
})
export class ScraperComponent {

  constructor(private readonly apiService: ApiService) {
  }

}
