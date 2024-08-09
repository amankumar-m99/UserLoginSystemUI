import { Component } from '@angular/core';
import { TechStackItemsModel } from 'src/app/model/teck-stack/tech-stack-items.model';

@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.css']
})
export class TechStackComponent {
  techStackItems!:TechStackItemsModel[];
  constructor(){
    this.techStackItems = [
      new TechStackItemsModel("Java", "17", "../../../assets/images/techstack/java.png"),
      new TechStackItemsModel("Spring Boot", "3", "../../../assets/images/techstack/springboot.png"),
      new TechStackItemsModel("Angular", "14", "../../../assets/images/techstack/angular.png"),
      new TechStackItemsModel("MySQL", "8", "../../../assets/images/techstack/mysql.png")
    ];
  }
}
