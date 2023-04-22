import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage: Storage, private fireStore: Firestore, private toastr: ToastrService,private router: Router) { }

  uploadFile(file: any, filePath: string, postData: any){
    if (!file) return

    const storageRef = ref(this.storage, `${filePath}/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.toastr.info("Data Upload is " + progress + "% done")
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        postData.postImgPath = downloadURL;
        console.log(postData);
        
        this.saveData(postData)
      })
    })
  }

  saveData(postData: any){
    const collectionInstance = collection(this.fireStore, 'posts')
    addDoc(collectionInstance, postData).then(()=> {
      this.toastr.success("Data Inserted Successfully...!")
      this.router.navigate(['/posts'])
    }).catch(err => console.log(err))
  }

  loadData(): Observable<any> {

    const collectionInstance = collection(this.fireStore, 'posts')

    return  collectionData(collectionInstance, {idField: 'id'})
  }
}