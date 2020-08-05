export class Bussiness{
    company_id : string;
    business_name : string;
    business_legal_name : string;
    business_type : string;
    ssn : string;
    tax_id : string;
    industry : string;
    date_of_establishment : Date;
    company_logo : string;
    created_by : string;
    created_on : string;
    updated_by : string;
    updated_on : string;
    is_active : string;

    constructor(business? : any) {
        this.company_id = business && business.company_id || '';
        this.business_name = business && business.business_name || '';
        this.business_legal_name = business && business.business_legal_name || '';
        this.business_type = business && business.business_type || '';
        this.ssn = business && business.ssn || '';
        this.tax_id = business && business.tax_id || '';
        this.industry = business && business.industry || '';
        this.date_of_establishment = business && business.date_of_establishment || '';
        this.company_logo = business && business.company_logo || '';
        this.created_by = business && business.created_by || '';
        this.created_on = business && business.created_on || '';
        this.updated_by = business && business.updated_by || '';
        this.updated_by = business && business.updated_by || '';
        this.is_active = business && business.is_active || true;
    }
}