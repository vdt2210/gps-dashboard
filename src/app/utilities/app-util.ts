import { EGpsStatusColor } from '@models/index';

export const AppUtil = {
  calculateSpeed(speed: number, correction: number) {
    speed =
      speed && correction
        ? parseFloat(this.toFixedNoRounding(speed * (1 + correction / 100), 1))
        : speed;
    return speed;
  },

  decodeJWT(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  },

  getGpsStatusColor(accuracy: number): EGpsStatusColor {
    switch (true) {
      case accuracy <= 6:
        return EGpsStatusColor.success;
      case accuracy <= 25:
        return EGpsStatusColor.warning;
      case accuracy > 25:
        return EGpsStatusColor.danger;
      default:
        return '' as EGpsStatusColor;
    }
  },

  toFixedNoRounding(value: number, n: number) {
    const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + n + '})?', 'g');
    const a = value.toString().match(reg)![0];
    const dot = a.indexOf('.');
    if (dot === -1) {
      return a + '.' + '0'.repeat(n);
    }
    const b = n - (a.length - dot) + 1;
    return b > 0 ? a + '0'.repeat(b) : a;
  },
};
