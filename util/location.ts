import { ICoords } from './../types/index';
const STATIC_API_URL =
  'https://static-maps.yandex.ru/1.x/?ll=37.620070,55.753630&size=450,450&z=13&l=map&pt=37.620070,55.753630,pmwtm1~37.64,55.76363,pmwtm99';

export const getMapPreview = (coords: ICoords) => {
  const imgPreviewUrl = `https://static-maps.yandex.ru/1.x/?ll=${coords.lng},${coords.lat}&size=450,300&z=16&l=map&pt=${coords.lng},${coords.lat},org`;
  return imgPreviewUrl;
};
