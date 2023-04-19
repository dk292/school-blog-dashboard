import { Injectable } from '@angular/core';
import { Firestore, collection ,addDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private fireStore: Firestore, private toastr: ToastrService) { }

  saveData(data: any) {
    const collectionInstance = collection(this.fireStore, 'categories')
    addDoc(collectionInstance, data).then((ref) => {
      console.log("First Data added successfully")
      this.toastr.success('Data Insert Successfully...!')
    }).catch(err => console.log(err))
  }
}
