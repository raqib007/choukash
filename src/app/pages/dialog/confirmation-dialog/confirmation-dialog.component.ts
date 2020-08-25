
import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.scss']
})

export class ConfirmationDialogComponent implements OnInit {
    id: string;
    msg: string;
    title: string;
    btn1: string = "CANCEL";
    btn2: string = "YES";
    bothBtn: boolean = true;
    constructor(
        private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
		) {
        if(data.title == undefined){
            this.title = "Confirmation Alert";
        }else{
            this.title = data.title;
        }
        if(data.btn1 != undefined){
            this.btn1 = data.btn1;
        }
        if(data.btn2 != undefined){
            this.btn2 = data.btn2;
        }
        if(data.bothBtn != undefined){
            this.bothBtn = data.bothBtn;
        }
    }

    ngOnInit() {
    }
}
