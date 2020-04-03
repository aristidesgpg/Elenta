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
