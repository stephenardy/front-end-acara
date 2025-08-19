interface ITicket {
  _id?: string;
  price?: number | string;
  name?: string;
  events?: string;
  description?: string;
  quantity?: number | string;
}

interface ICart {
  events: string;
  ticket: string;
  quantity: number;
}

export type { ITicket, ICart };
