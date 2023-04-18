import { Component } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userData?: Observable<any>

  constructor(private fireStore: Firestore){
    this.getData()
  }

  addData(f: any){
    const collectionInstance = collection(this.fireStore, 'users');
    addDoc(collectionInstance, f.value).then(() => {
      console.log("Data saved successfully");
    })
    .catch((err) => console.log(err))
  }

  getData() {
    const collectionInstance = collection(this.fireStore, 'users');
    collectionData(collectionInstance, {idField: 'id'}).subscribe(val => console.log(val))
    this.userData = collectionData(collectionInstance, {idField: 'id'})
  }
}
