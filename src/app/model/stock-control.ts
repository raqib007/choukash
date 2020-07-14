export class StockControl{
    id:number;
    control:string;
    abbreviation:string;
    description:string;
    inputtype:string;

    constructor(unit) {
        this.id = unit.id;
        this.control = unit.control;
        this.abbreviation = unit.abbreviation;
        this.description = unit.description;
        this.inputtype = unit.inputtype;
    }
}