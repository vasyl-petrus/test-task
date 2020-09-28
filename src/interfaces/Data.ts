export interface Data {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
}

export interface DataDetails {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    streetAddress: string;
    city: string;
    state: string;
    zip: string;
  };
  description: string;
}
