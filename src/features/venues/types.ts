export type SurfaceType = 'synthetic' | 'natural' | 'futsal';

export type AvailabilityStatus = 'available' | 'occupied' | 'maintenance';

export interface VenueTransport {
  type: 'bus' | 'tram' | 'walk';
  label: string;
  detail: string;
}

export interface VenueInfo {
  id: string;
  name: string;
  address: string;
  city: string;
  mapsUrl: string;
  surface: SurfaceType;
  capacity: number;
  lighting: boolean;
  parking: boolean;
  parkingDetails: string;
  changing: boolean;
  changingDetails: string;
  transport: VenueTransport[];
  notes: string;
  img: string;
  availability: AvailabilityStatus;
  nextMatch?: string;
  matchCount: number;
  featured?: boolean;
}
