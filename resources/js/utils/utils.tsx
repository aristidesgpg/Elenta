import S from "string";

export function slugify(string) {
  return S(string).slugify().replace("-", "_").s;
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function unique(array) {
  return Array.from(new Set(array));
}

export function validateEmail(email) {
  const rx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return email && rx.test(email);
}