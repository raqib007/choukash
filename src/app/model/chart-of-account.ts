export class ChartAccount {
    name:string;
    type:string;
    detail:string;
    sub_account:string;

    constructor(r) {
        this.name = r.name;
        this.type = r.type;
        this.detail = r.detail;
        this.sub_account = r.sub_account;
    }
}