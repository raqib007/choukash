
import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface DialogData {
	id: string;
	msg: string;
};

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html'
})

export class DialogComponent implements OnInit {
    ngOnInit() {
    }
}
