import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-pop-archivo',
  templateUrl: './pop-archivo.component.html',
  styleUrls: ['./pop-archivo.component.css']
})
export class PopArchivoComponent implements OnInit {

  constructor(private dialogo:MatDialogRef<PopArchivoComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
}
