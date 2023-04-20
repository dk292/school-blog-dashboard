import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  parmalink: string = ''
  imgSrc: any = './assets/PlaceHolder.png'
  selectedImg?: any
  categories?: Array<any>

  constructor(private categoryService: CategoriesService){}

  ngOnInit(): void {
      this.categoryService.loadData().subscribe(val => {
        this.categories = val
      })
  }

  onTitleChange($evt: any){

    const title = $evt.target.value;
    this.parmalink = title.replace(/\s/g, '-');

  }

  showPreview($evt: any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }

    reader.readAsDataURL($evt.target.files[0])

    this.selectedImg = $evt.target.files[0]
  }
}
