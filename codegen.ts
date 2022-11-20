import { CodegenConfig } from '@graphql-codegen/cli';

require('dotenv').config();

const config: CodegenConfig = {
  schema: process.env.REACT_APP_COUNTRIES_URI,
  documents: ['src/apollo/**/*.ts'],
  generates: {
    './src/apollo/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;

