export class RoundingOff {
    name:string;
    precision:string;
    strategy:string;
    method:string;
    account:string;
    adjusment_account:string;

    constructor(r) {
        this.name = r.name;
        this.precision = r.precision;
        this.strategy = r.strategy;
        this.method = r.method;
        this.account = r.account;
        this.adjusment_account = r.adjusment_account;
    }
}