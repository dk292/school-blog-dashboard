import { Component } from '@angular/core';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private fireStore: Firestore, ){}

  onSubmit(formData: any){

    const categoryData = {
      category: formData.value.category
    }

    let subCategoryData = {
      subCategory: 'subCategory1'
    }
    let secondSubCategoryData = {
      subCategory: 'This is the subCategory Two'
    }

    const collectionInstance = collection(this.fireStore, 'categories')
    addDoc(collectionInstance, categoryData).then((ref) => {
      console.log("First Data added successfully")
      const subCollection = collection(this.fireStore, `categories/${ref.id}/subcategories`)
      addDoc(subCollection, subCategoryData).then(subRef=>{
        console.log("Sub Data added successfully")
        const secondCollection = collection(this.fireStore, `categories/${ref.id}/subcategories/${subRef.id}/third collection`)
        addDoc(secondCollection, secondSubCategoryData).then(tRef => {
          console.log("Third Data added successfully");
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    }).catch(err => console.log(err))
    
      // this.db.collection('categories').doc('')
  }
}
