import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface Tasks {
  id: number;
  text: string;
  status: boolean;
}

export interface DialogData {
  task: string;
}

//const ELEMENT_DATA: Tasks[] = JSON.parse(localStorage.getItem('tasks'));
const storage = JSON.parse(localStorage.getItem('tasks') || '{}');
const ELEMENT_DATA: Tasks[] = storage;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {

  displayedColumns: string[] = ['status', 'text', 'add'];
  dataSource = new MatTableDataSource<Tasks>(ELEMENT_DATA);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  addTask() {
    const dialogRef = this.dialog.open(DialogTodo, {
      width: '350px',
      data: { task: '' }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      let data: Array<Tasks> = this.dataSource.data;
      const value: Tasks =  {id: data.length>0 ? data[data.length-1].id+1 : 1, text: result, status: false} ;
      (data.length);
      if(data.length<=0 || data.length == undefined){
        data = [value];
      } else {
        data.push(value);
      }
      this.dataSource.data = data;
      this.saveTask();
    });    
  }

  delTask(element:any){
    let data = this.dataSource.data.filter(item => {
      return item != element
    });
    this.dataSource.data = data;
    this.saveTask();
  }

  saveTask(){
    localStorage.setItem('tasks',JSON.stringify(this.dataSource.data));
  }

}



@Component({
  selector: 'dialog-todo',
  templateUrl: 'dialog.todo.html',
})
export class DialogTodo {

  constructor(public dialogRef: MatDialogRef<DialogTodo>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  cancel(): void {
    this.dialogRef.close();
  }

}