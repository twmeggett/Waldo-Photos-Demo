export default function getIdFromUrl() {
  const params = window.location.href.split('/');
  return params[params.length - 1];
}
