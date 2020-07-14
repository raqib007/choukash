import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OwnerInfoCreateFormComponent } from './owner-info-create-form/owner-info-create-form.component';

@Component({
	selector: 'app-owner-information',
	templateUrl: './owner-information.component.html',
	styleUrls: ['./owner-information.component.scss']
})
export class OwnerInformationComponent implements OnInit {
	showAddress = true;
	fileData: File = null;
	previewUrl:any = null;

	constructor(private dialog: MatDialog) {
	}
	
	ngOnInit(): void {
	}
	onSelectFile(event) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (event) => { 
				this.previewUrl = event.target.result;
			}
		  }
	}

  	onSubmit() {

	}
	createContact(){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;
		dialogConfig.maxWidth = '100vw';
		dialogConfig.width = '60vw';
		const dialogRef = this.dialog.open(OwnerInfoCreateFormComponent,dialogConfig);
        dialogRef.afterClosed().subscribe(
            val => console.log("Dialog output:", val)
		);
	}
}
