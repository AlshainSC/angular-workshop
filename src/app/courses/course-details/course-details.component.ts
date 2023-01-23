import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Courses } from 'src/app/common/models/courses';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  @Input() set selectedCourse(value: Courses) {
    if (value?.title) {
      this.originalTitle = value.title;
    }
    this.currentCourse = Object.assign({}, value);
  }

  @Output() saveCourse = new EventEmitter<Courses>();
  @Output() deleteCourse = new EventEmitter<Courses>();
  @Output() updateCourse = new EventEmitter<Courses>();
  @Output() resetCourse = new EventEmitter();

  originalTitle: string | undefined;
  currentCourse!: Courses;

  constructor() {}

  ngOnInit(): void {}

  add(course: Courses) {
    // this.db.addCourse(course).subscribe((course: Courses) => {
    //   course.id = this.courses.length + 1;
    //   this.courses = [...this.courses, course];
    // });
    this.saveCourse.emit(course);
  }

  remove(course: Courses) {
    this.deleteCourse.emit(course);
  }

  update(course: Courses) {
    this.updateCourse.emit(course);
  }

  reset() {
    this.resetCourse.emit();
    console.log('reset function called');
  }
}
