export function castString(searchParam: string | null): string | undefined {
  if (searchParam === null) {
    return undefined;
  }
  return searchParam;
}

export function castInt(searchParam: string | null): number | undefined {
  if (searchParam === null) {
    return undefined;
  }
  return parseInt(searchParam);
}

export function castFloat(searchParam: string | null): number | undefined {
  if (searchParam === null) {
    return undefined;
  }
  return parseFloat(searchParam);
}

export function castBoolean(searchParam: string | null): boolean | undefined {
  if (searchParam === null) {
    return undefined;
  }
  return searchParam === "true" ? true : false;
}

export function castDate(searchParam: string | null): Date | undefined {
  if (searchParam === null) {
    return undefined;
  }
  return new Date(searchParam);
}

export function castStringArray(searchParam: string | null) {
  if (searchParam === null) {
    return undefined;
  }
  return searchParam.split(",");
}

export function castIntArray(searchParam: string | null): number[] | undefined {
  if (searchParam === null) {
    return undefined;
  }
  return searchParam.split(",").map((str) => parseInt(str));
}

export function castFloatArray(searchParam: string | null) {
  if (searchParam === null) {
    return undefined;
  }
  return searchParam.split(",").map((str) => parseFloat(str));
}

export function castDateArray(searchParam: string | null): Date[] | undefined {
  if (searchParam === null) {
    return undefined;
  }
  const dateArray = searchParam.split(",");
  return dateArray.map((date) => new Date(date));
}
