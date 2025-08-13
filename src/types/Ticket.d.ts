interface ITicket {
  _id?: string;
  price?: number | string;
  name?: string;
  events?: string;
  description?: string;
  quantity?: string;
}

export type { ITicket };
