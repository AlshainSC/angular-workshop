import { Component, OnInit } from '@angular/core';
import { Courses } from '../common/models/courses';

const emptyCourse: Courses = {
  id: 0,
  title: '',
  description: '',
  percentComplete: 0,
  favorite: false,
};

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses = [
    {
      id: 1,
      title: 'Angular 13 Fundamentals',
      description: 'Learn the fundamentals of Angular 13',
      percentComplete: 26,
      favorite: false,
    },
    {
      id: 2,
      title: 'RxJS In-Depth',
      description: 'Learn the fundamentals of RxJS',
      percentComplete: 40,
      favorite: false,
    },
    {
      id: 3,
      title: 'Svelte',
      description: 'Because you need another framework',
      percentComplete: 0,
      favorite: true,
    },
  ];

  selectedCourse = emptyCourse;

  constructor() {}

  ngOnInit(): void {}

  selectCourse(course: Courses) {
    this.selectedCourse = { ...course };
    console.log(this.selectedCourse);
  }

  deleteCourse(course: Courses) {
    this.selectCourse({ ...emptyCourse });
    console.log('delete', course);
  }
}
