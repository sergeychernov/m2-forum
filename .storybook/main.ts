import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  // Добавляем поддержку статических файлов
  staticDirs: ['../public'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: false,
    checkOptions: {},
  },
  webpackFinal: async (config) => {
    // Добавляем поддержку TypeScript
    config.module?.rules?.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    });
    
    config.resolve = {
      ...config.resolve,
      extensions: [...(config.resolve?.extensions || []), '.ts', '.tsx'],
    };
    
    return config;
  },
};

export default config;