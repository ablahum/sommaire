import { createRouteHandler } from 'uploadthing/next'
import { ourFileRouter } from './core'

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token:
      'eyJhcGlLZXkiOiJza19saXZlXzYzMjA4MDU2MWM2M2U1M2M5MmYwOTk5YmI2YjlmODk4ZWZjYWQ5Mzc4ODFhMjg0OTIzZTg4MGJhMWRlY2RmNWEiLCJhcHBJZCI6ImtsdnJuajFxaXMiLCJyZWdpb25zIjpbInNlYTEiXX0=',
  },
})
