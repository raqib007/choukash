export class Unit{
    id:number;
    count:string;
    name:string;
    abbreviation:string;

    constructor(unit) {
        this.id = unit.id;
        this.count = unit.count;
        this.name = unit.name;
        this.abbreviation = unit.abbreviation;
    }
}