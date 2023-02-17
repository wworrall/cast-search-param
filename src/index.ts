export function getString(
  params: URLSearchParams,
  key: string
): string | undefined {
  const param = params.get(key);
  if (param === null || param === "") {
    return undefined;
  }
  return param;
}

export function getInt(
  params: URLSearchParams,
  key: string
): number | undefined {
  const param = params.get(key);
  if (param === null || param === "") {
    return undefined;
  }
  try {
    return parseInt(param);
  } catch (error) {
    console.error(`An error occurred while parsing ${key}`, error);
    return undefined;
  }
}

export function getFloat(
  params: URLSearchParams,
  key: string
): number | undefined {
  const param = params.get(key);
  if (param === null || param === "") {
    return undefined;
  }
  try {
    return parseFloat(param);
  } catch (error) {
    console.error(`An error occurred while parsing ${key}`, error);
    return undefined;
  }
}

export function getBoolean(
  params: URLSearchParams,
  key: string
): boolean | undefined {
  const param = params.get(key);
  if (param === null || param === "") {
    return undefined;
  }
  try {
    if (param !== "true" && param !== "false") {
      throw new Error(`string must be either "true" or "false"`);
    }
    return param === "true";
  } catch (error) {
    console.error(`An error occurred while parsing ${key}`, error);
    return undefined;
  }
}

export function getDate(params: URLSearchParams, key: string) {
  const param = params.get(key);
  if (param === null || param === "") {
    return undefined;
  }
  try {
    return new Date(param);
  } catch (error) {
    console.error(`An error occurred while parsing ${key}`, error);
    return undefined;
  }
}

export function getStringArray(params: URLSearchParams, key: string) {
  const paramArray = params.getAll(key);
  if (paramArray.length === 0) {
    return undefined;
  }
  return paramArray;
}

export function getIntArray(params: URLSearchParams, key: string) {
  const paramArray = params.getAll(key);
  if (paramArray.length === 0) {
    return undefined;
  }
  try {
    return paramArray.map((param) => parseInt(param));
  } catch (error) {
    console.error(`An error occurred while parsing ${key}`, error);
    return undefined;
  }
}

export function getFloatArray(params: URLSearchParams, key: string) {
  const paramArray = params.getAll(key);
  if (paramArray.length === 0) {
    return undefined;
  }
  try {
    return paramArray.map((param) => parseFloat(param));
  } catch (error) {
    console.error(`An error occurred while parsing ${key}`, error);
    return undefined;
  }
}

export function getBooleanArray(params: URLSearchParams, key: string) {
  const paramArray = params.getAll(key);
  if (paramArray.length === 0) {
    return undefined;
  }
  try {
    return paramArray.map((param) => {
      if (param !== "true" && param !== "false") {
        throw new Error(`string must be either "true" or "false"`);
      }
      return param === "true";
    });
  } catch (error) {
    console.error(`An error occurred while parsing ${key}`, error);
    return undefined;
  }
}

export function getDateArray(params: URLSearchParams, key: string) {
  const paramArray = params.getAll(key);
  if (paramArray.length === 0) {
    return undefined;
  }

  try {
    return paramArray.map((param) => new Date(param));
  } catch (error) {
    console.error(`An error occurred while parsing ${key}`, error);
    return undefined;
  }
}

/**
 * Extract pagination from URLSearchParams
 * @param params - URLSearchParams
 * @returns pagination object
 * @example
 * const params = new URLSearchParams("page=1&pageSize=10");
 * const pagination = extractPagination(params);
 * // pagination = { page: 1, pageSize: 10 }
 *
 **/
export function getPagination(params: URLSearchParams) {
  const page = getInt(params, "page");
  const pageSize = getInt(params, "pageSize");
  return {
    page,
    pageSize,
  };
}

/**
 * Extract sorting from URLSearchParams
 * @param params - URLSearchParams
 * @returns sorting object
 * @example
 * const params = new URLSearchParams("orderBy=name&orderDirection=asc");
 * const sorting = extractSorting(params);
 * // sorting = { orderBy: "name", orderDirection: "ASC" }
 *
 **/
export function getOrdering(params: URLSearchParams) {
  const orderBy = getString(params, "orderBy");
  const orderDirection = getString(params, "orderDirection");

  return {
    orderBy,
    orderDirection,
  };
}

/**
 * Delete keys from a URLSearchParams and return new URLSearchParams
 *
 * @param params - URLSearchParams
 * @param keysToDelete - keys to delete
 * @returns new URLSearchParams
 *
 * @example
 * const params = new URLSearchParams("page=1&pageSize=10&orderBy=name&orderDirection=asc");
 * const newParams = deleteSearchParams(params, ["page", "pageSize"]);
 * // newParams = "orderBy=name&orderDirection=asc"
 *
 */
export function deleteSearchParams(
  params: URLSearchParams,
  keysToDelete: string[]
): URLSearchParams {
  const newParams = copySearchParams(params);
  for (const key of keysToDelete) {
    newParams.delete(key);
  }

  return newParams;
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
  const newSearchParams = copySearchParams(params);
  for (const [key, value] of Object.entries(newParams)) {
    if (value === undefined) continue;

    if (Array.isArray(value)) {
      if (value.length === 0 || newSearchParams.has(key)) {
        newSearchParams.delete(key);
      }
      for (const item of value) {
        newSearchParams.append(key, item.toString());
      }
    } else {
      newSearchParams.set(key, value.toString());
    }
  }

  return newSearchParams;
}

/**
 * Copy a URLSearchParams and return new URLSearchParams
 */
export function copySearchParams(params: URLSearchParams): URLSearchParams {
  const newParams = new URLSearchParams();
  for (const [key, value] of params) {
    newParams.append(key, value);
  }
  return newParams;
}
