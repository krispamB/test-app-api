export type CreatePerson = {
  id?: string;
  name?: string;
  images?: string[];
  gender?: string;
  date_of_birth?: string;
  nationality?: string;
  collections: string[];
  notes?: string;
  is_bulk_insert?: boolean;
};

enum Gender {
  M,
  F,
}

export type Person = {
  id: string;
  name: string;
  thumbnails: [];
  gender?: string;
  date_of_birth?: string;
  nationality?: string;
  notes?: string;
  create_date?: string;
  modified_date?: string;
  score?: number;
  collections: Collection[];
};

export type Collection = {
  id: string;
  name: string;
  description: string;
  count: number;
  create_date: string;
  modified_date: string;
};
