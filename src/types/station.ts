export interface Station {
  _id: string;
  name: string;
  lat: number;
  lng: number;
  location: {
    type: string;
    coordinates: number[];
  };
  address: string;
  type: string;
  connectors: string[];
  power_kw: number;
  amenities: string[];
  distance_meters: number;
}
