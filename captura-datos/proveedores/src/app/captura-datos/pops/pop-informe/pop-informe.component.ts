import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-pop-informe',
  templateUrl: './pop-informe.component.html',
  styleUrls: ['./pop-informe.component.css']
})
export class PopInformeComponent implements OnInit {

  constructor(private dialogo:MatDialogRef<PopInformeComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
