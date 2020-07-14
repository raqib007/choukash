export class LocationGroup {
    id:number;
    locationName:string;
    description:string;
    type:number;
    shortName:string;
    users:string;

    get name() {
        let name = '';
        if (this.locationName && this.locationName) {
            name = this.locationName + ' ' + this.locationName;
        } else if (this.locationName) {
            name = this.locationName;
        } else if (this.locationName) {
            name = this.locationName;
        }
        return name;
    }
  
    set name(value) { }
  
    get address() {
        return `${this.description}, ${this.description} ${this.description}`;
    }
    set address(value) { }

    constructor(locationGroup) {
        this.id = locationGroup.id;
        this.locationName = locationGroup.locationName;
        this.description = locationGroup.description;
        this.type = locationGroup.type;
        this.shortName = locationGroup.shortName;
        this.users = locationGroup.users;
    }
}