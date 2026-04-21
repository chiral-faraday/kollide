import { PreferenceSchema, PreferenceScope } from '@theia/core/lib/common/preferences';

export const SyphorPreferenceSchema: PreferenceSchema = {
  properties: {
    'syphor.repl.endpoint': {
      type: 'string',
      default: 'bolt://localhost:7687',
      description: 'Memgraph server endpoint for Syphor REPL',
      scope: PreferenceScope.Workspace
    },
    'syphor.repl.username': {
      type: 'string',
      default: '',
      description: 'Username for Memgraph connection',
      scope: PreferenceScope.Workspace
    },
    'syphor.repl.password': {
      type: 'string',
      default: '',
      description: 'Password for Memgraph connection',
      scope: PreferenceScope.Workspace
    },
    'syphor.repl.autoRun': {
      type: 'boolean',
      default: false,
      description: 'Automatically execute queries on change'
    },
    'syphor.repl.timeout': {
      type: 'number',
      default: 10000,
      description: 'Query timeout in milliseconds',
      minimum: 1000
    }
  }
}

export const SyphorPreferenceContribution = Symbol('SyphorPreferenceContribution');
