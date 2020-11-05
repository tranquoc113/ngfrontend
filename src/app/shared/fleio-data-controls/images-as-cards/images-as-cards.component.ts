import { Component, Input, OnInit } from '@angular/core';
import { IImageModel } from '../../fleio-api/openstack/model/image.model';

@Component({
  selector: 'app-images-as-cards',
  templateUrl: './images-as-cards.component.html',
  styleUrls: ['./images-as-cards.component.scss']
})
export class ImagesAsCardsComponent implements OnInit {
  @Input() images: IImageModel[];
  selectedImage: IImageModel | null;

  constructor() { }

  ngOnInit() {
    this.selectedImage = null;
  }

}
