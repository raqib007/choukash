export class Product {
    id: number;
    productNo: string;
    productName: string;
    barcode: string;
    uom: string;
    stockinHand: string;
    committedStock: string;
    stockAvailable: string;
    stockControl: string;
    priceRetail: string;
    priceWholesale: string;
    priceVIP: number;
    priceUSD: string;
    priceNZD: string;
    costUSD: string;
    costNZD: string;
    costEUR: string;

    constructor(product) {
        this.id = product.id;
        this.productNo = product.productNo;
        this.productName = product.productName;
        this.barcode = product.barcode;
        this.uom = product.uom;
        this.stockinHand = product.stockinHand;
        this.committedStock = product.committedStock;
        this.stockAvailable = product.stockAvailable;
        this.stockControl = product.stockControl;
        this.priceRetail = product.priceRetail;
        this.priceWholesale = product.priceWholesale;
        this.priceVIP = product.priceVIP;
        this.priceUSD = product.priceUSD;
        this.priceNZD = product.priceNZD;
        this.costUSD = product.costUSD;
        this.costNZD = product.costNZD;
        this.costEUR = product.costEUR;
    }
}