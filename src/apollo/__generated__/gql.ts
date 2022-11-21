/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query GetCountries($filter: CountryFilterInput) {\n    countries(filter: $filter) {\n      code\n      name\n    }\n  }\n": types.GetCountriesDocument,
};

export function gql(source: "\n  query GetCountries($filter: CountryFilterInput) {\n    countries(filter: $filter) {\n      code\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetCountries($filter: CountryFilterInput) {\n    countries(filter: $filter) {\n      code\n      name\n    }\n  }\n"];

export function gql(source: string): unknown;
export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;