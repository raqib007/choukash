export class Bussiness{
    company_id : string;
    business_name : string;
    business_legal_name : string;
    business_type : string;
    ssn : string;
    tax_id : string;
    industry : string;
    date_of_establishment : string;
    company_logo : string;
    created_by : string;
    created_on : string;
    updated_by : string;
    updated_on : string;
    is_active : string;

    constructor(contact) {
        this.company_id = contact.company_id;
        this.business_name = contact.business_name;
        this.business_legal_name = contact.business_legal_name;
        this.business_type = contact.business_type;
        this.ssn = contact.ssn;
        this.tax_id = contact.tax_id;
        this.industry = contact.industry;
        this.date_of_establishment = contact.date_of_establishment;
        this.company_logo = contact.company_logo;
        this.created_by = contact.created_by;
        this.created_on = contact.created_on;
        this.updated_by = contact.updated_by;
        this.updated_by = contact.updated_by;
        this.is_active = contact.is_active;
    }
}