import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';
import { structure } from './sanity/structure';

export default defineConfig({
  name: 'radha-gallery',
  title: 'Radha Gallery',
  projectId: '1wb1gf6c',
  dataset: 'production',
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
