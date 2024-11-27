export const menuList = [
  { label: 'Women', to: '/?category=female' },
  { label: 'Men', to: '/?category=male' },
  { label: 'Top', to: '/?category=top' },
  { label: 'Pants', to: '/?category=pants' },
  { label: 'Dress', to: '/?category=dress' },
  { label: 'HOME', to: '/' },
  { label: 'Sale', to: '/?category=sale' },
];
export const womenList = [
  { label: 'Women Top', to: '/?category=female&category=top' },
  { label: 'Women Pants', to: '/?category=female&category=pants' },
  { label: 'Women Dress', to: '/?category=female&category=dress' },
  { label: 'Women Sale', to: '/?category=female&category=sale' },
];
export const menList = [
  { label: 'Men Top', to: '/?category=male&category=top' },
  { label: 'Men Pants', to: '/?category=male&category=pants' },
  { label: 'Men Sale', to: '/?category=male&category=sale' },
];
export const topList = [
  { label: 'Women Top', to: '/?category=female&category=top' },
  { label: 'Men Top', to: '/?category=male&category=top' },
  { label: 'Sale Top', to: '/?category=sale&category=top' },
];
export const pantsList = [
  { label: 'Women Pants', to: '/?category=female&category=pants' },
  { label: 'Men Pants', to: '/?category=male&category=pants' },
  { label: 'Sale Pants', to: '/?category=sale&category=pants' },
];
export const dressList = [
  { label: 'Women Dress', to: '/?category=female&category=dress' },
  { label: 'Women Sale', to: '/?category=female&category=sale' },
];
export const saleList = [
  { label: 'Top Sale', to: '/?category=sale&category=top' },
  { label: 'Pants Sale', to: '/?category=sale&category=pants' },
  { label: 'Dress Sale', to: '/?category=sale&category=dress' },
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
