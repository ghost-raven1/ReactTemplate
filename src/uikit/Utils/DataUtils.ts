/**
 * Утилиты для работы с данными
 */

// Типы для функций
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Глубокое слияние объектов
 */
export const deepMerge = <T extends object>(target: T, source: DeepPartial<T>): T => {
  const result = { ...target };

  for (const key in source) {
    const targetValue = result[key];
    const sourceValue = source[key];

    if (
      targetValue &&
      sourceValue &&
      typeof targetValue === 'object' &&
      typeof sourceValue === 'object'
    ) {
      result[key] = deepMerge(targetValue, sourceValue as DeepPartial<typeof targetValue>);
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue as T[typeof key];
    }
  }

  return result;
};

/**
 * Глубокое клонирование объекта
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  if (obj instanceof Object) {
    const copy = {} as T;
    Object.keys(obj).forEach(key => {
      copy[key as keyof T] = deepClone(obj[key as keyof T]);
    });
    return copy;
  }

  return obj;
};

/**
 * Получение значения из объекта по пути
 */
export const get = (obj: any, path: string, defaultValue?: any): any => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj
      );
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

/**
 * Установка значения в объект по пути
 */
export const set = (obj: any, path: string, value: any): any => {
  if (Object(obj) !== obj) return obj;
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];

  path.slice(0, -1).reduce((a, c, i) => {
    if (Object(a[c]) === a[c]) {
      return a[c];
    } else {
      a[c] = Math.abs(Number(path[i + 1])) >> 0 === +path[i + 1] ? [] : {};
      return a[c];
    }
  }, obj)[path[path.length - 1]] = value;
  return obj;
};

/**
 * Удаление значения из объекта по пути
 */
export const unset = (obj: any, path: string): boolean => {
  if (Object(obj) !== obj) return false;
  if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || [];

  const lastKey = path.pop();
  const parent = path.reduce((a, c, i) => {
    if (Object(a[c]) === a[c]) {
      return a[c];
    } else {
      return false;
    }
  }, obj);

  if (parent === false) return false;
  return delete parent[lastKey];
};

/**
 * Проверка на пустой объект
 */
export const isEmpty = (obj: any): boolean => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj === 'string') return obj.trim().length === 0;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

/**
 * Фильтрация объекта по ключам
 */
export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Pick<T, K>);
};

/**
 * Исключение ключей из объекта
 */
export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  return Object.keys(obj).reduce((result, key) => {
    if (!keys.includes(key as K)) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Omit<T, K>);
};
