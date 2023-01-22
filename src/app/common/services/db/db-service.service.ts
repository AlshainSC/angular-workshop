import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Courses } from '../../models/courses';

const BASE_URL = 'http://localhost:3002';

@Injectable({
  providedIn: 'root',
})
export class DbServiceService {
  model = 'courses';

  //static properties
  static getAllCourses: Courses[];
  static getCourseById: Courses;
  static addCourse: Courses;
  static updateCourse: Courses;
  static deleteCourse: Courses;

  constructor(private http: HttpClient) {}

  private getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  //find all courses in database
  getAllCourses(): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.getUrl());
  }

  //find course by id
  //TODO: implement search utility
  getCourseById(_id: number): Observable<Courses> {
    return this.http.get<Courses>(`http://localhost:3002/courses/${_id}`);
  }

  //add course to database
  addCourse(course: Courses): Observable<Courses> {
    return this.http.post<Courses>('http://localhost:3002/courses', course);
  }

  //update course in database
  updateCourse(course: Courses): Observable<Courses> {
    return this.http.put<Courses>(
      `http://localhost:3002/courses/${course._id}`,
      course,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  //delete course from database
  deleteCourse(course: Courses): Observable<Courses> {
    console.log('service delete method id: ', course._id);
    return this.http.delete<Courses>(
      `http://localhost:3002/courses/${course._id}`
    );
  }
}
