interface JsonValue {
  label: string;
  value: any;
}

const AppUtil = {
  toFixedNoRounding(value: number, n: number) {
    const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + n + '})?', 'g');
    const a = value.toString().match(reg)[0];
    const dot = a.indexOf('.');
    if (dot === -1) {
      // integer, insert decimal dot and pad up zeros
      return a + '.' + '0'.repeat(n);
    }
    const b = n - (a.length - dot) + 1;
    return b > 0 ? a + '0'.repeat(b) : a;
  },

  getUnitSystem(appConstant: any): JsonValue[] {
    let results: JsonValue[] = [];

    results = [
      {
        label: 'unit.metric',
        value: appConstant.unitSystem.metric.unit,
      },
      {
        label: 'unit.imperial',
        value: appConstant.unitSystem.imperial.unit,
      },
    ];
    return results;
  },

  getLanguages(appConstant: any): JsonValue[] {
    let results: JsonValue[] = [];

    results = [
      {
        label: 'lang.vi',
        value: appConstant.language.vi,
      },
      {
        label: 'lang.en',
        value: appConstant.language.en,
      },
    ];
    return results;
  },

  decodeJWT(token) {
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
};

export default AppUtil;
