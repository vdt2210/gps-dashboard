interface Config {
  content: string[];
  theme: {
    fontFamily: Record<string, unknown>;
    extend: Record<string, unknown>;
  };
  plugins: unknown[];
}

const config: Config = {
  content: ['./src/**/*.{html,ts}'],
  plugins: [],
  theme: {
    extend: {
      transitionProperty: {
        size: 'height, width',
        spacing: 'margin, padding',
      },
    },
    fontFamily: {
      primary: ['Tektur'],
    },
  },
};

export default config;
