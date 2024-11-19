export const menuList = [
  { label: 'Women', to: '/?page=1&category=female' },
  { label: 'Men', to: '/?page=1&category=male' },
  { label: 'Top', to: '/?page=1&category=top' },
  { label: 'Pants', to: '/?page=1&category=pants' },
  { label: 'Dress', to: '/?page=1&category=dress' },
  { label: 'HOME', to: '/' },
  { label: 'Sale', to: '/?page=1&category=sale' },
];
export const womenList = [
  { label: 'Women Top', to: '/?page=1&category=female&category=top' },
  { label: 'Women Pants', to: '/?page=1&category=female&category=pants' },
  { label: 'Women Dress', to: '/?page=1&category=female&category=dress' },
  { label: 'Women Sale', to: '/?page=1&category=female&category=sale' },
];
export const menList = [
  { label: 'Men Top', to: '/?page=1&category=male&category=top' },
  { label: 'Men Pants', to: '/?page=1&category=male&category=pants' },
  { label: 'Men Sale', to: '/?page=1&category=male&category=sale' },
];
export const topList = [
  { label: 'Women Top', to: '/?page=1&category=female&category=top' },
  { label: 'Men Top', to: '/?page=1&category=male&category=top' },
  { label: 'Sale Top', to: '/?page=1&category=sale&category=top' },
];
export const pantsList = [
  { label: 'Women Pants', to: '/?page=1&category=female&category=pants' },
  { label: 'Men Pants', to: '/?page=1&category=male&category=pants' },
  { label: 'Sale Pants', to: '/?page=1&category=sale&category=pants' },
];
export const dressList = [
  { label: 'Women Dress', to: '/?page=1&category=female&category=dress' },
  { label: 'Women Sale', to: '/?page=1&category=female&category=sale' },
];
export const saleList = [
  { label: 'Top Sale', to: '/?page=1&category=sale&category=top' },
  { label: 'Pants Sale', to: '/?page=1&category=sale&category=pants' },
  { label: 'Dress Sale', to: '/?page=1&category=sale&category=dress' },
];

export function getLinkLists(str) {
  switch (str) {
    case 'female':
      return womenList;
    case 'male':
      return menList;
    case 'top':
      return topList;
    case 'pants':
      return pantsList;
    case 'sale':
      return saleList;
    case 'dress':
      return dressList;
    default:
      return null;
  }
}
