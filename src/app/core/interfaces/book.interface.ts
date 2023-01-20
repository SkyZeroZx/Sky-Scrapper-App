export interface Book {
  image: string;
  isbn: string;
  bookDetails: BookDetails[];
}

export interface BookDetails {
  price: number;

  editorial?: string;

  isbn: string;

  linkProduct: string;

  author?: string;

  category?: string;

  image: string;

  isAvailable?: boolean;

  shop: string;

  title: string;
}

export interface BookDiscount {
  price: number;
  title: string;
  isbn: string;
  image: string;
}