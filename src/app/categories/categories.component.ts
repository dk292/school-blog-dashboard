import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private fireStore: Firestore){}

  onSubmit(formData: any){

    const categoryData = {
      category: formData.value.category
    }

    const collectionInstance = collection(this.fireStore, 'categories')
    addDoc(collectionInstance, categoryData).then((ref) => console.log("Data saved successfully", ref.id))
    .catch((err) => console.log(err))
      
  }
}
