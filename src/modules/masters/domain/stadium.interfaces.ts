export interface StadiumInterface {
  id: string;
  country: string;
  city: string;
  stateAddress: string;
  name: string;
}

export interface SoccerFieldInterface {
  name: string;
  description: string;
  stadiumId?: string;
}
