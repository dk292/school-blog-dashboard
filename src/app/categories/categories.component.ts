import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  userData?: Observable<any>
  formCategory?: string
  formStatus: string = 'Add'
  categoryId!: string

  constructor(private categoryService: CategoriesService){}

  ngOnInit(): void {
    this.userData =  this.categoryService.loadData()
  }

  onSubmit(formData: any){

    const categoryData: Category = {
      category: formData.value.category
    }

    if(this.formStatus == 'Add'){
      this.categoryService.saveData(categoryData)
      formData.reset()
    }else if(this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData)
      formData.reset()
      this.formStatus = 'Add'
    }
  }

  onEdit(category: any, id: string)
  {
    this.formCategory =  category
    this.formStatus = 'Edit'
    this.categoryId = id
  }

  onDelete(id: string){
    this.categoryService.deleteData(id)
  }
}
