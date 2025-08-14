import { DateValue } from "@nextui-org/react";

interface IRegency {
  id: string;
  name: string;
}

// Sesuai dengan yang diminta pada API
interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  isFeatured?: boolean | string;
  isPublish?: boolean | string;
  isOnline?: boolean | string;
  description?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  location?: {
    address: string;
    region: string;
    coordinates: number[];
  };
  banner?: string | FileList;
}

// ovveride dan tambahin beberapa data yg perlu di form
interface IEventForm extends IEvent {
  address?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
}

export type { IRegency, IEvent, IEventForm };
