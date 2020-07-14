
import { MatTableDataSource, MatTable } from '@angular/material/table';

export interface SubCategory {
	id:number;
	parentId:number;
    name:string;
    description:string;
}

export class ProCatagoryList {
    id:number;
    name:string;
    description:string;
    isExpand:boolean;
    items?: SubCategory[] | MatTableDataSource<SubCategory>;
    
    constructor(catagory) {
        this.id = catagory.id;
        this.name = catagory.name;
        this.description = catagory.description;
        this.isExpand = catagory.isExpand;
        this.items = catagory.items;
    }
}