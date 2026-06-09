//odstranenie diakritiky
export function removeAccents(value: string): string {
  return value.normalize('NFD').replace(/\p{Mn}/gu, '');
}

// prerobenie na text pre link
export function slugify(value: string): string {
  return removeAccents(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

// prve pismo velke vo vete
export function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// prve pismo velke v kazdom slove
export function capitalizeWords(value: string): string {
  return value.split(/\s+/).map(capitalize).join(' ');
}

// na skratenie slova kde sa da urcit ci chceme strikne skratit alebo skratit po najblizsiu medzeru
export function truncate(value: string, maxLength: number, suffix = '…'): string {
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength - suffix.length).trimEnd() + suffix;
}
