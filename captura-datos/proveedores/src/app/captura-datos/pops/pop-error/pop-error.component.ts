import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";


@Component({
  selector: 'app-pop-error',
  templateUrl: './pop-error.component.html',
  styleUrls: ['./pop-error.component.css']
})
export class PopErrorComponent implements OnInit {
  constructor(private dialogo:MatDialogRef<PopErrorComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
