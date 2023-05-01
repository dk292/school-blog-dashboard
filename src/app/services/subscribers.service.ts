import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private fireStore: Firestore, private toastr: ToastrService) { }

  loadData(): Observable<any> {

    const collectionInstance = collection(this.fireStore, 'subscribers')

    return  collectionData(collectionInstance, {idField: 'id'})
  }
  deleteData(id: string){
    const docInstance = doc(this.fireStore, 'subscribers', id)

    deleteDoc(docInstance)
    .then(() => this.toastr.success("Data Deleted...!"))
    .catch((err) => console.log(err))
  }
}
