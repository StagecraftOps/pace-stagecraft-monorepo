// ─── Property Types ───────────────────────────────────────────────────────────

export interface Property {
  id: string;
  zpid: string;
  address: Address;
  price: number;
  priceHistory: PriceEvent[];
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize?: number;
  yearBuilt?: number;
  propertyType: PropertyType;
  status: ListingStatus;
  description?: string;
  features: string[];
  images: MediaAsset[];
  location: GeoPoint;
  zestimate?: number;
  rentZestimate?: number;
  hoaFee?: number;
  taxHistory: TaxEvent[];
  schools: School[];
  walkScore?: number;
  transitScore?: number;
  bikeScore?: number;
  daysOnZillow?: number;
  createdAt: string;
  updatedAt: string;
}

export type PropertyType = 'single_family' | 'condo' | 'townhouse' | 'multi_family' | 'land' | 'mobile' | 'co_op';
export type ListingStatus = 'for_sale' | 'for_rent' | 'sold' | 'off_market' | 'pending' | 'foreclosure';

export interface Address {
  street: string;
  unit?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface PriceEvent {
  date: string;
  price: number;
  event: 'listed' | 'price_change' | 'sold' | 'relisted';
}

export interface TaxEvent {
  year: number;
  taxPaid: number;
  taxAssessment: number;
}

export interface School {
  name: string;
  type: 'elementary' | 'middle' | 'high';
  rating: number;
  distance: number;
  districtName: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  thumbnailUrl: string;
  type: 'photo' | 'video' | 'floor_plan' | '3d_tour';
  caption?: string;
  order: number;
}

// ─── User Types ───────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  preferences: UserPreferences;
  savedSearches: SavedSearch[];
  savedHomes: string[];
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'buyer' | 'seller' | 'renter' | 'agent' | 'admin' | 'internal';

export interface UserPreferences {
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  minBaths?: number;
  propertyTypes: PropertyType[];
  locations: string[];
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilters;
  alertEnabled: boolean;
  createdAt: string;
}

// ─── Search Types ─────────────────────────────────────────────────────────────

export interface SearchFilters {
  query?: string;
  location?: string;
  bbox?: BoundingBox;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  minSqft?: number;
  maxSqft?: number;
  propertyTypes?: PropertyType[];
  status?: ListingStatus[];
  maxDaysOnMarket?: number;
  hasGarage?: boolean;
  hasPool?: boolean;
  hasPets?: boolean;
  sortBy?: SortOption;
  page?: number;
  pageSize?: number;
}

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

export type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'sqft_desc' | 'lot_size_desc' | 'zestimate';

export interface SearchResult {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Agent Types ──────────────────────────────────────────────────────────────

export interface Agent {
  id: string;
  userId: string;
  licenseNumber: string;
  licenseState: string;
  brokerage: Brokerage;
  bio?: string;
  specializations: string[];
  serviceAreas: string[];
  ratings: AgentRating[];
  avgRating: number;
  totalReviews: number;
  activeListing: number;
  closedTransactions: number;
  yearsExperience: number;
  languages: string[];
  createdAt: string;
}

export interface Brokerage {
  id: string;
  name: string;
  address: Address;
  phone: string;
  website?: string;
}

export interface AgentRating {
  id: string;
  reviewerId: string;
  rating: number;
  review: string;
  transactionType: 'bought' | 'sold' | 'rented';
  createdAt: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: ApiError[];
  meta?: ResponseMeta;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

export interface ResponseMeta {
  requestId: string;
  timestamp: string;
  duration: number;
  version: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ─── Event Types ──────────────────────────────────────────────────────────────

export interface DomainEvent<T = unknown> {
  id: string;
  type: string;
  source: string;
  version: string;
  timestamp: string;
  data: T;
  metadata?: Record<string, string>;
}

export interface PropertyCreatedEvent extends DomainEvent<Property> {
  type: 'property.created';
}

export interface PropertyUpdatedEvent extends DomainEvent<Partial<Property> & { id: string }> {
  type: 'property.updated';
}

export interface UserRegisteredEvent extends DomainEvent<User> {
  type: 'user.registered';
}
