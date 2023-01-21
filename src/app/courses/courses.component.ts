import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Courses } from '../common/models/courses';
import { DbServiceService } from '../common/services/db/db-service.service';

const emptyCourse: Courses = {
  _id: 0,
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
  courses: Courses[] = [];

  selectedCourse = emptyCourse;

  constructor(private db: DbServiceService) {}

  ngOnInit(): void {
    this.getAllCourses();
    this.reset();
  }

  addCourse(course: Courses) {
    this.db.addCourse(course).subscribe((course: Courses) => {
      course.id = this.courses.length + 1;
      this.courses = [...this.courses, course];
    });
  }

  getAllCourses() {
    this.db.getAllCourses().subscribe((courses: Courses[]) => {
      this.courses = courses;
    });
  }

  saveCourse(course: Courses) {
    if (course.id) {
      this.updateCourse(course);
    } else {
      this.addCourse(course);
    }
  }

  updateCourse(course: Courses) {
    this.db
      .updateCourse(course)
      .pipe(
        tap(() => {
          this.getAllCourses();
        })
      )
      .subscribe(
        () => {},
        (error) => this.handleError(error)
      );
  }

  deleteCourse(_id: number) {
    this.db.deleteCourse(_id).subscribe(() => {
      this.courses = this.courses.filter((c) => c._id !== _id);
    });
  }

  selectCourse(course: Courses) {
    this.selectedCourse = { ...course };
    console.log(this.selectedCourse);
  }

  reset() {
    this.selectedCourse = { ...emptyCourse };
  }

  handleError(error: any) {
    console.log(error);
  }
}

// import { Component, OnInit } from '@angular/core';
// import { tap } from 'rxjs';
// import { Courses } from '../common/models/courses';
// import { DbServiceService } from '../common/services/db/db-service.service';
// import { finalize } from 'rxjs/operators';

// const emptyCourse: Courses = {
//   id: 0,
//   title: '',
//   description: '',
//   percentComplete: 0,
//   favorite: false,
// };

// @Component({
//   selector: 'app-courses',
//   templateUrl: './courses.component.html',
//   styleUrls: ['./courses.component.scss'],
// })
// export class CoursesComponent implements OnInit {
//   courses: Courses[] = [];

//   selectedCourse = emptyCourse;

//   loading = false;

//   constructor(private db: DbServiceService) {}

//   ngOnInit(): void {
//     this.getAllCourses();
//     this.reset();
//   }

//   addCourse(course: Courses) {
//     this.loading = true;
//     this.db
//       .addCourse(course)
//       .pipe(finalize(() => (this.loading = false)))
//       .subscribe(
//         (course: Courses) => {
//           this.courses = [...this.courses, course];
//         },
//         (error) => this.handleError(error)
//       );
//   }

//   getAllCourses() {
//     this.loading = true;
//     this.db
//       .getAllCourses()
//       .pipe(finalize(() => (this.loading = false)))
//       .subscribe(
//         (courses: Courses[]) => {
//           this.courses = courses;
//         },
//         (error) => this.handleError(error)
//       );
//   }

//   saveCourse(course: Courses) {
//     if (course.id) {
//       this.updateCourse(course);
//     } else {
//       this.addCourse(course);
//     }
//   }

//   updateCourse(course: Courses) {
//     this.loading = true;
//     this.db
//       .updateCourse(course)
//       .pipe(
//         finalize(() => (this.loading = false)),
//         tap(() => {
//           this.getAllCourses();
//         })
//       )
//       .subscribe(
//         () => {},
//         (error) => this.handleError(error)
//       );
//   }

//   deleteCourse(course: Courses) {
//     this.loading = true;
//     this.db
//       .deleteCourse(course.id)
//       .pipe(finalize(() => (this.loading = false)))
//       .subscribe(
//         () => {
//           this.courses = this.courses.filter((c) => c.id !== course.id);
//         },
//         (error) => this.handleError(error)
//       );
//   }

//   selectCourse(course: Courses) {
//     this.selectedCourse = { ...course };
//   }

//   reset() {
//     this.selectedCourse = { ...emptyCourse };
//   }

//   handleError(error: any) {
//     console.error(error);
//   }
// }
