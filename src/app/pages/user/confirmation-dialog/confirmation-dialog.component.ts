
import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup} from "@angular/forms";
import { UserGroup} from '../../../model/user-group';

export interface DialogData {
  id: string;
  msg: string;
};

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})

export class ConfirmationDialogComponent implements OnInit {
    id: string;
    msg: string;
    constructor(
        private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
		) {
      
    }

    ngOnInit() {
    }
    save() {
        this.dialogRef.close();
    }
    close() {
        this.dialogRef.close();
    }

}
