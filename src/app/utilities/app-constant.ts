const appConstant = Object.freeze({
  backupKeys: [
    'totalDistance',
    'tripDistance',
    'avgSpeedTotalDistance',
    'totalTime',
    'avgSpeedTotalTime',
    'topSpeed',
  ],

  buttonExpand: {
    block: 'block',
    full: 'full',
  },

  buttonType: {
    button: 'button',
    reset: 'reset',
    submit: 'submit',
  },

  color: {
    danger: 'danger',
    dark: 'dark',
    light: 'light',
    medium: 'medium',
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    tertiary: 'tertiary',
    warning: 'warning',
  },

  fill: {
    clear: 'clear',
    default: 'default',
    outline: 'outline',
    solid: 'solid',
  },

  inputType: {
    email: 'email',
    number: 'number',
    password: 'password',
    text: 'text',
  },

  languages: {
    en: { name: 'English', value: 'en' },
    vi: { name: 'Tiếng Việt', value: 'vi' },
  },

  storageKeys: {
    avgSpeedTotalDistance: 'avgSpeedTotalDistance',
    avgSpeedTotalTime: 'avgSpeedTotalTime',
    deviceId: 'deviceId',
    jwtToken: 'jwtToken',
    language: 'language',
    speedCorrection: 'speedCorrection',
    topSpeed: 'topSpeed',
    totalDistance: 'totalDistance',
    totalTime: 'totalTime',
    tripDistance: 'tripDistance',
    uid: 'uid',
    unit: 'unit',
  },

  unit: {
    imperial: {
      distanceUnit: 'mi',
      lengthUnit: 'ft',
      speedUnit: 'mph',
      value: 'imperial',
    },
    metric: {
      distanceUnit: 'km',
      lengthUnit: 'm',
      speedUnit: 'km/h',
      value: 'metric',
    },
  },
});

export default appConstant;
