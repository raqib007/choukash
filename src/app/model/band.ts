export class BrandList {
    id:number;
    name:string;
    description:string;

    constructor(band) {
        this.id = band.id;
        this.name = band.name;
        this.description = band.description;
    }
}