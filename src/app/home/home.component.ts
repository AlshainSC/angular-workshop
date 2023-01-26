import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Courses } from '../common/models/courses';
import { DbServiceService } from '../common/services/db/db-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  courses$!: Observable<Courses[]>;

  constructor(private db: DbServiceService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courses$ = this.db.getAllCourses();
  }
}
