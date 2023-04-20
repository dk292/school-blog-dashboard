import { Injectable } from '@angular/core';
import { Firestore, collection ,addDoc, collectionData, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {


  constructor(private fireStore: Firestore, private toastr: ToastrService) { }

  saveData(data: any) {
    const collectionInstance = collection(this.fireStore, 'categories')
    addDoc(collectionInstance, data).then((ref) => {
      
      this.toastr.success('Data Insert Successfully...!')

    }).catch(err => console.log(err))
  }

  loadData(): Observable<any> {

    const collectionInstance = collection(this.fireStore, 'categories')

    return  collectionData(collectionInstance, {idField: 'id'})
  }

  updateData(id: string, editData: any){
    const docInstance = doc(this.fireStore, 'categories', id)

    updateDoc(docInstance, editData).then(() => this.toastr.success("Data Updated Successfully...!")).catch(err => console.log(err))
  }

  deleteData(id: string){
    const docInstance = doc(this.fireStore, 'categories', id)

    deleteDoc(docInstance)
    .then(() => this.toastr.success("Data Deleted...!"))
    .catch((err) => console.log(err))
  }
}
