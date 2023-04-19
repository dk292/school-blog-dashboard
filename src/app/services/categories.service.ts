import { Injectable } from '@angular/core';
import { Firestore, collection ,addDoc, collectionData } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  userData?: Observable<any>

  constructor(private fireStore: Firestore, private toastr: ToastrService) { }

  saveData(data: any) {
    const collectionInstance = collection(this.fireStore, 'categories')
    addDoc(collectionInstance, data).then((ref) => {
      
      this.toastr.success('Data Insert Successfully...!')

    }).catch(err => console.log(err))
  }

  loadData() {

    const collectionInstance = collection(this.fireStore, 'categories')
    collectionData(collectionInstance, {idField: 'id'}).subscribe(val => console.log(val))

    this.userData = collectionData(collectionInstance, {idField: 'id'})
  }
}
