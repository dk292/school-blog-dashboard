import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {

  parmalink: string = ''

  onTitleChange($evt: any){

    const title = $evt.target.value;
    this.parmalink = title.replace(/\s/g, '-');
    
  }
}
