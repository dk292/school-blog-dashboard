import { Injectable, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage: Storage, 
    private fireStore: Firestore, 
    private toastr: ToastrService,
    private router: Router,
    private zone: NgZone
    ) { }

  uploadFile(file: any, filePath: string, postData: any, formStatus: string, id: any){
    if (!file) return

    const storageRef = ref(this.storage, `${filePath}/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.toastr.info("Data Upload is " + Math.floor(progress) + "% done")
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        postData.postImgPath = downloadURL;
        
        if(formStatus == "Edit"){

          this.updateData(id, postData)

        } else {

          this.saveData(postData)

        }

      })
    })
  }

  saveData(postData: any){
    const collectionInstance = collection(this.fireStore, 'posts')
    addDoc(collectionInstance, postData).then(()=> {
      this.toastr.success("Data Inserted Successfully...!")
      this.zone.run(() => this.router.navigate(['/posts']))
    }).catch(err => console.log(err))
  }

  loadData(): Observable<any> {

    const collectionInstance = collection(this.fireStore, 'posts')

    return  collectionData(collectionInstance, {idField: 'id'})
  }

  loadOneData(id: any){
    const docInstance = doc(this.fireStore, "posts", id)
    return docData(docInstance)
  }

  updateData(id: string, editData: any){
    const docInstance = doc(this.fireStore, 'posts', id)

    updateDoc(docInstance, editData).then(() => {
      this.toastr.success("Data Updated Successfully...!")
      this.zone.run(() => this.router.navigate(['/posts']))
    }).catch(err => console.log(err))
  }

  deleteImage(postImgPath: any, id: any){
    const storageRef = ref(this.storage, postImgPath)
    deleteObject(storageRef).then(() => {
      this.deleteData(id);
    })
  }

  deleteData(id: any){
    const docInstance = doc(this.fireStore, 'posts', id)

    deleteDoc(docInstance)
    .then(() => this.toastr.warning("Data Deleted...!"))
    .catch((err) => console.log(err))
  }

  
  markFeatured(id: any, featuredData: any){
    const docInstance = doc(this.fireStore, 'posts', id)

    updateDoc(docInstance, featuredData).then(() => {
      this.toastr.info("Featured Status Updated Successfully...!")
    }).catch(err => console.log(err))
  }
}