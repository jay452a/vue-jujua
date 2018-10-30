/**
 * Created by jimmy on 2018/6/5.
 */
export function urlEncode(json, key) {
  return Object.keys(json).map((key) => {
    return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
  }).join('&');
}
export function dateTransform(time) {
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  return `${year}-${month}-${day}`;
}
