import {
  HistoryPrice,
  ListHistoryPrice,
  BookDiscount,
  Book,
  BookDetails,
} from '@core/interfaces';

export function formatedListPrice(res: HistoryPrice[]): ListHistoryPrice {
  const listDays = res.map(({ registerDate }) => registerDate);
  const listPrice = res.map(({ price }) => price);

  return {
    listDays,
    listPrice,
  };
}

export function formatedLastDiscont(data: BookDiscount[]): Book[] {
  const list = data.map((res) => {
    return {
      isbn: res.isbn,
      image: res.image,
      bookDetails: [res] as BookDetails[],
    };
  });
  return list;
}

export function previewUrlFile(file): any {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
}

export function getValueDefined(list: any[], value: string) {
  return list.find((res) => res[value] !== 'null')[value];
}

export function formatedBookDetail(
  listBookDetails: BookDetails[]
): BookDetails {
  return {
    price: getValueDefined(listBookDetails, 'price'),
    editorial: getValueDefined(listBookDetails, 'editorial'),
    isbn: getValueDefined(listBookDetails, 'isbn'),
    linkProduct: getValueDefined(listBookDetails, 'linkProduct'),
    category: getValueDefined(listBookDetails, 'category'),
    image: getValueDefined(listBookDetails, 'image'),
    shop: getValueDefined(listBookDetails, 'shop'),
    title: getValueDefined(listBookDetails, 'title'),
    author: getValueDefined(listBookDetails, 'author'),
  };
}