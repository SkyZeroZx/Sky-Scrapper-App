export interface ListWish {
  price: number;
  title: string;
  isbn: string;
  image: string;
}

export type ItemListWishDto = Omit<ListWish, 'price' | 'title' | 'image'>;

