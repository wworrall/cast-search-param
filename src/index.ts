export function castString(
  searchParam: string | null | undefined
): string | undefined {
  if (searchParam === null || searchParam === undefined) {
    return undefined;
  }
  return searchParam;
}

export function castInt(
  searchParam: string | null | undefined
): number | undefined {
  if (searchParam === null || searchParam === undefined) {
    return undefined;
  }
  return parseInt(searchParam);
}

export function castFloat(
  searchParam: string | null | undefined
): number | undefined {
  if (searchParam === null || searchParam === undefined) {
    return undefined;
  }
  return parseFloat(searchParam);
}

export function castBoolean(
  searchParam: string | null | undefined
): boolean | undefined {
  if (searchParam === null || searchParam === undefined) {
    return undefined;
  }

  if (searchParam === "true") return true;
  else if (searchParam === "false") return false;
  else return undefined;
}

export function castDate(
  searchParam: string | null | undefined
): Date | undefined {
  if (searchParam === null || searchParam === undefined) {
    return undefined;
  }
  return new Date(searchParam);
}

export function castStringArray(searchParam: string | null | undefined) {
  if (searchParam === null || searchParam === undefined) {
    return undefined;
  }
  return searchParam.split(",");
}

export function castIntArray(
  searchParam: string | null | undefined
): number[] | undefined {
  if (searchParam === null || searchParam === undefined) {
    return undefined;
  }
  return searchParam.split(",").map((str) => parseInt(str));
}

export function castFloatArray(searchParam: string | null | undefined) {
  if (searchParam === null || searchParam === undefined) {
    return undefined;
  }
  return searchParam.split(",").map((str) => parseFloat(str));
}

export function castDateArray(
  searchParam: string | null | undefined
): Date[] | undefined {
  if (searchParam === null || searchParam === undefined) {
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
 * Generate a setter function for a URLSearchParams
 * @param key - key to set
 * @param searchParams - URLSearchParams to set
 * @param setSearchParams - function to set URLSearchParams
 * @returns setter function
 * @example
 * const [searchParams, setSearchParams] = useState(new URLSearchParams());
 * const setQuery = generateSetter("query", searchParams, setSearchParams);
 * setQuery("hello");
 * // searchParams is now { query: "hello" }
 * setQuery(undefined);
 *
 **/
export function generateSetter<T extends unknown = string>(
  key: string,
  searchParams: URLSearchParams,
  setSearchParams: (params: URLSearchParams) => void
) {
  return (value: T) => {
    if (value !== undefined && value !== "") searchParams.set(key, `${value}`);
    else searchParams.delete(key);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };
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
