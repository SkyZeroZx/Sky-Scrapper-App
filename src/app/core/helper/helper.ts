import { HistoryPrice, ListHistoryPrice } from '@core/interfaces';

export function formatedListPrice(res: HistoryPrice[]): ListHistoryPrice {
  const listDays = res.map(({ registerDate }) => registerDate);
  const listPrice = res.map(({ price }) => price);

  return {
    listDays,
    listPrice,
  };
}

export function previewUrlFile(file): any {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });
}
