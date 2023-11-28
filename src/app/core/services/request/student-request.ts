export type AddressRequest = {
  zipcode: string;
  street: string;
  neighborhood: string;
  num: string;
};
export type StudentRequest = {
  name: string;
  age: string; //number,
  address: AddressRequest;
};
