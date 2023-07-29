interface Config {
  content: string[];
  theme: {
    extend: Record<string, unknown>;
  };
  plugins: unknown[];
}

const config: Config = {
  content: ['./src/**/*.{html,ts}'],
  plugins: [],
  theme: {
    extend: {},
  },
};

export default config;
