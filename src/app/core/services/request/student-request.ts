export type AddressRequest = {
  zipcode: string;
  street: string;
  neighborhood: string;
  num: string;
  state: string;
  city: string;
};

export type ContactRequest = {
  email: string;
  phone: string;
};

export type StudentRequest = {
  name: string;
  birthDate: string;
  document?: string;
  address: AddressRequest;
  contact: ContactRequest;
};
