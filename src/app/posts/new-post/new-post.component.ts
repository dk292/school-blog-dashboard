import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permalink: string = ''
  imgSrc: any = './assets/PlaceHolder.png'
  selectedImg?: any
  categories?: Array<any>

  postForm: any

  constructor(private categoryService: CategoriesService, private fb: FormBuilder){

    this.postForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      permalink: ['' , Validators.required],
      excerpt: ['', [
        Validators.required,
        Validators.minLength(50)
      ]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required]
    })

  }

  ngOnInit(): void {
      this.categoryService.loadData().subscribe(val => {
        this.categories = val
      })

  }

  get fc() {
    return this.postForm.controls
  }

  onTitleChange($evt: any){    
    const title = $evt.target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($evt: any){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result
    }

    reader.readAsDataURL($evt.target.files[0])

    this.selectedImg = $evt.target.files[0]
  }

  onSubmit(){

    let splitted = this.postForm.value.category.split('-');
    
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }
    console.log(postData);
    
  }
}
