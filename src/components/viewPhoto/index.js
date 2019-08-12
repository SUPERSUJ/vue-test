import viewCom from './instance';

let viewPhoto;
function getViewPhoto() {
  viewPhoto = viewPhoto || viewCom.newInstance();
  return viewPhoto;
}
const instance = getViewPhoto();
export default function (e) {
  instance.open(e);
}
