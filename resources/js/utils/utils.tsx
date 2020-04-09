import S from "string";
import * as moment from "moment";

export function slugify(string: string) {
  return S(string).slugify().replace("-", "_").s;
}

export function clone(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}

export function unique(array) {
  return Array.from(new Set(array));
}

export function validateEmail(email: string) {
  const rx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return email && rx.test(email);
}

export function formatDate(str: string) {
  return moment(str).format("Do MMM YY");
}
