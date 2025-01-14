import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
 
const es = initEdgeStore.create();
 
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles:  es.fileBucket({ maxSize: 1024 * 1024 * 10, /* maxSize: 10MB */ }),
  publicImages: es.imageBucket({ maxSize: 1024 /** 1024 * 5, /* maxSize: 5MB */ }),
  serverImages:  es.imageBucket({ maxSize: 1024 * 1024 * 2 }),
  profileImages: es.imageBucket({ maxSize: 1024 })
});
 
const handler = createEdgeStoreNextHandler({
  logLevel: 'debug', // optional. defaults to 'error' in production and 'info' in development
  router: edgeStoreRouter,
});
 
export { handler as GET, handler as POST };
 
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;