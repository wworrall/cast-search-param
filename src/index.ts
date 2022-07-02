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

/**
 * Delete provided keys from URLSearchParams and return new URLSearchParams
 */
export function deleteSearchParams(
  params: URLSearchParams,
  keysToDelete: string[]
): URLSearchParams {
  const filteredParams = new URLSearchParams();
  for (const [key, value] of params) {
    if (!keysToDelete.includes(key)) {
      filteredParams.append(key, value);
    }
  }
  return filteredParams;
}

/**
 * Add new keys to a URLSearchParams and return new URLSearchParams
 */
export function addSearchParams(
  params: URLSearchParams,
  newParams: {
    [key: string]:
      | string
      | number
      | boolean
      | Date
      | string[]
      | number[]
      | boolean[]
      | Date[];
  }
): URLSearchParams {
  const extendedParams = new URLSearchParams();
  for (const [key, value] of params) {
    extendedParams.set(key, value);
  }

  for (const [key, value] of Object.entries(newParams)) {
    if (value !== undefined) {
      extendedParams.set(key, value.toString());
    }
  }

  return extendedParams;
}

/**
 * Copy a URLSearchParams and return new URLSearchParams
 */
export function copySearchParams(params: URLSearchParams): URLSearchParams {
  const copiedParams = new URLSearchParams();
  for (const [key, value] of params) {
    copiedParams.set(key, value);
  }
  return copiedParams;
}
