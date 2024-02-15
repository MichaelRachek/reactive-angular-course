import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../model/course';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';

@Component({
  selector: 'course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css'],
  providers: [
    LoadingService,
    MessagesService
  ]
})
export class CourseDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public course: Course,
    private coursesStore: CoursesStore) {
  }

  ngOnInit() {
    this.createForm();
  }

  save() {
    const changes = this.form.value;
    this.coursesStore.saveCourse(this.course.id, changes)
      .subscribe();
    this.dialogRef.close(changes);
  }

  close() {
    this.dialogRef.close();
  }

  private createForm(): void {
    this.form = this.fb.group({
      description: [this.course.description, Validators.required],
      category: [this.course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [this.course.longDescription, Validators.required]
    });
  }
}
