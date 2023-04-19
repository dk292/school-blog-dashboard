import { Injectable } from '@angular/core';
import { Firestore, collection ,addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private fireStore: Firestore) { }

  saveData(data: any) {
    const collectionInstance = collection(this.fireStore, 'categories')
    addDoc(collectionInstance, data).then((ref) => {
      console.log("First Data added successfully")

    }).catch(err => console.log(err))
  }
}
