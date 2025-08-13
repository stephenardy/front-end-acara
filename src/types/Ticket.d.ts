interface ITicket {
  _id?: string;
  price?: number | string;
  name?: string;
  events?: string;
  description?: string;
  quantity?: number | string;
}

export type { ITicket };
