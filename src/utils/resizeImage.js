// 이미지 사이즈 줄여서 최적화 하기
// parameter: image url, prefer width size
export function resizeImage(img, w) {
  const imgSplit = img.split("/upload");
  const image = imgSplit[0] + `/upload/w_${w}` + imgSplit[1];

  return image;
}
