import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owner-info-create-form',
  templateUrl: './owner-info-create-form.component.html',
  styleUrls: ['./owner-info-create-form.component.scss']
})
export class OwnerInfoCreateFormComponent implements OnInit {
    selectedIndex = 0;
    constructor() { }

    ngOnInit(): void {
    }

}
