import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit{
  subscribers!: any

  constructor(private subService: SubscribersService){}

  ngOnInit(): void {
      this.subService.loadData().subscribe(val => {
        this.subscribers = val
      })
  }

  onDelete(id: string){
    this.subService.deleteData(id)
  }
}
