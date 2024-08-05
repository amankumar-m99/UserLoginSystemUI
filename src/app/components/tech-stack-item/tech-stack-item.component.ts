import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tech-stack-item',
  templateUrl: './tech-stack-item.component.html',
  styleUrls: ['./tech-stack-item.component.css']
})
export class TechStackItemComponent {

  @Input() technology:string = "";
  @Input() version:string = "";
  @Input() src:string = "";
  @Input() width:number = 125;
  @Input() height:number = 125;
  
}
