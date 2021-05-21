import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about-and-contact',
  templateUrl: './about-and-contact.component.html',
  styleUrls: ['./about-and-contact.component.scss']
})
export class AboutAndContactPageComponent implements OnInit {
  private title = 'Amaëlle Leroy - Photographe - À propos / Contact';

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaService.addTags([
      {name: 'description', content: 'Amaëlle Leroy - Photographe : Vous voulez en savoir plus sur moi ou me contacter ? Vous êtes sur la bonne page'},
    ]);
  }

}
