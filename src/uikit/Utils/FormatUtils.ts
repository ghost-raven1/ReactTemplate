/**
 * Утилиты для форматирования данных
 */

/**
 * Форматирование числа с разделителями
 */
export const formatNumber = (
  num: number,
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat('ru-RU', options).format(num);
};

/**
 * Форматирование валюты
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'RUB',
  locale: string = 'ru-RU'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Форматирование даты
 */
export const formatDate = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale: string = 'ru-RU'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Форматирование времени
 */
export const formatTime = (
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  },
  locale: string = 'ru-RU'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Форматирование относительного времени
 */
export const formatRelativeTime = (
  date: Date | string | number,
  locale: string = 'ru-RU'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} ${days === 1 ? 'день' : 'дней'} назад`;
  }
  if (hours > 0) {
    return `${hours} ${hours === 1 ? 'час' : 'часов'} назад`;
  }
  if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'минуту' : 'минут'} назад`;
  }
  return 'только что';
};

/**
 * Форматирование размера файла
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Б';
  const k = 1024;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Форматирование номера телефона
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  return phone;
};

/**
 * Форматирование имени файла
 */
export const formatFileName = (fileName: string, maxLength: number = 30): string => {
  if (fileName.length <= maxLength) return fileName;
  const extension = fileName.split('.').pop();
  const name = fileName.slice(0, -(extension?.length || 0) - 1);
  const halfLength = Math.floor((maxLength - 3) / 2);
  return `${name.slice(0, halfLength)}...${name.slice(-halfLength)}.${extension}`;
};

/**
 * Форматирование текста с переносами строк
 */
export const formatTextWithLineBreaks = (text: string): string => {
  return text.replace(/\n/g, '<br />');
};

/**
 * Форматирование JSON с отступами
 */
export const formatJSON = (obj: any, indent: number = 2): string => {
  return JSON.stringify(obj, null, indent);
}; 