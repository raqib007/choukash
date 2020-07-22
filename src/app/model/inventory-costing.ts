export class ProductCosting {
    invoice_number:string;
    receiving_date:string;
    product_name:string;
    quantity:string;
    ucost:string;
    tcost:string;
    vendor_details:string;

    constructor(r) {
        this.invoice_number = r.invoice_number;
        this.receiving_date = r.receiving_date;
        this.product_name = r.product_name;
        this.quantity = r.quantity;
        this.ucost = r.ucost;
        this.tcost = r.tcost;
        this.vendor_details = r.vendor_details;
    }
}