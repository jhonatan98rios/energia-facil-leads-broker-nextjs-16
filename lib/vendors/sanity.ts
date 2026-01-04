import SanityClient from 'next-sanity-client';

export const sanityClient = new SanityClient({
  projectId: 'nrfh1qf7',
  dataset: 'production',
  apiVersion: '2026-01-04',
  useCdn: true
})