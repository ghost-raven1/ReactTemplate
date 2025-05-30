/**
 * Утилиты для валидации данных
 */

/**
 * Проверка email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Проверка номера телефона
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{10,14}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Проверка пароля
 */
export const isValidPassword = (password: string): boolean => {
  // Минимум 8 символов, минимум 1 буква и 1 цифра
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Проверка URL
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Проверка ИНН
 */
export const isValidINN = (inn: string): boolean => {
  const innRegex = /^\d{10}$|^\d{12}$/;
  if (!innRegex.test(inn)) return false;

  const checkDigit = (inn: string, coefficients: number[]): number => {
    let n = 0;
    for (let i = 0; i < coefficients.length; i++) {
      n += coefficients[i] * Number(inn[i]);
    }
    return parseInt(String(n % 11 % 10));
  };

  switch (inn.length) {
    case 10: {
      const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
      return n10 === Number(inn[9]);
    }
    case 12: {
      const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
      return n11 === Number(inn[10]) && n12 === Number(inn[11]);
    }
    default:
      return false;
  }
};

/**
 * Проверка СНИЛС
 */
export const isValidSNILS = (snils: string): boolean => {
  const snilsRegex = /^\d{3}-\d{3}-\d{3} \d{2}$/;
  if (!snilsRegex.test(snils)) return false;

  const numbers = snils.replace(/[-\s]/g, '');
  const checkDigit = parseInt(numbers.slice(-2));
  const digits = numbers.slice(0, -2).split('').map(Number);

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (9 - i);
  }

  let control = sum % 101;
  if (control === 100) control = 0;

  return control === checkDigit;
};

/**
 * Проверка ИП
 */
export const isValidIP = (ip: string): boolean => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ip)) return false;

  const parts = ip.split('.');
  return parts.every(part => {
    const num = parseInt(part);
    return num >= 0 && num <= 255;
  });
};

/**
 * Проверка MAC-адреса
 */
export const isValidMAC = (mac: string): boolean => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
};

/**
 * Проверка даты
 */
export const isValidDate = (date: string): boolean => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

/**
 * Проверка возраста
 */
export const isValidAge = (birthDate: string, minAge: number = 18): boolean => {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1 >= minAge;
  }
  
  return age >= minAge;
};

/**
 * Проверка размера файла
 */
export const isValidFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Проверка типа файла
 */
export const isValidFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * Проверка формата файла по расширению
 */
export const isValidFileExtension = (fileName: string, allowedExtensions: string[]): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedExtensions.includes(extension) : false;
}; 