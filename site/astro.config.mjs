// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://obn.wiki',
  integrations: [
    starlight({
      title: 'OBN',
      description: 'OpenClaw Builder Network — The open-source community for running OpenClaw agents in production',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/obn-wiki' },
      ],
      sidebar: [
        { label: 'Home', slug: 'index' },
        { label: 'Getting Started', slug: 'getting-started' },
        { label: '@obn/advisor Skill', slug: 'skill' },
        {
          label: 'Patterns',
          items: [
            { label: 'Security', autogenerate: { directory: 'patterns/security' } },
            { label: 'Operations', autogenerate: { directory: 'patterns/operations' } },
            { label: 'Memory', autogenerate: { directory: 'patterns/memory' } },
            { label: 'Soul', autogenerate: { directory: 'patterns/soul' } },
            { label: 'Context', autogenerate: { directory: 'patterns/context' } },
            { label: 'Gateway', autogenerate: { directory: 'patterns/gateway' } },
            { label: 'Tools', autogenerate: { directory: 'patterns/tools' } },
            { label: 'Agents', autogenerate: { directory: 'patterns/agents' } },
          ],
        },
        {
          label: 'Deploy',
          items: [
            { label: 'Deployment Stacks', autogenerate: { directory: 'stacks' } },
          ],
        },
        {
          label: 'Reference',
          items: [
            { slug: 'reference/version-matrix' },
            { slug: 'reference/pattern-template' },
            { slug: 'reference/gap-analysis' },
          ],
        },
        { label: 'Contributing', slug: 'contributing' },
      ],
      editLink: {
        baseUrl: 'https://github.com/obn-wiki/patterns/edit/main/',
      },
      components: {
        Footer: './src/components/Footer.astro',
      },
      customCss: ['./src/styles/custom.css'],
    }),
    react(),
  ],
});
