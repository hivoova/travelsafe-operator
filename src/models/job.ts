export interface AvailableJob { 
    quote_id?:number ;
    passenger?: number;
    col_address?: string;
    date_out?: string;
    active?: number;
}   

export interface JobDetail {
    date?: string;
    movement_id?: number;
    datetime_start?: string;
    collection_address?: string;
    destination_address?: string;
    movement_order?: number;
    passenger?: number;
    dateKey?: string;
    buy_now_price?: number;
}

export interface AcceptRequest { 
  _quoteId: number;
  _price: number;
  _notes?: string;
  _dateKey: string;
  _movementIds: Array<number>;
  _buynow?: string;
}

export interface WaitAcceptJob {
    quote_id?:number ;
    passenger?: number;
    col_address?: string;
    date_out?: string;
}
