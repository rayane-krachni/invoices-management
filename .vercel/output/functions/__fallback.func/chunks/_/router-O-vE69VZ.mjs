import {
  createRouter,
  createRootRoute,
  createFileRoute,
  lazyRouteComponent,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { jsxs, jsx } from 'react/jsx-runtime'
import { c as createSsrRpc } from './createSsrRpc-B7i2AQJQ.mjs'
import fs from 'node:fs'
import { a as createServerFn, j as json } from '../virtual/entry.mjs'
import '../nitro/nitro.mjs'
import 'node:http'
import 'node:https'
import 'node:events'
import 'node:buffer'
import 'node:path'
import 'node:crypto'
import 'node:async_hooks'
import '@tanstack/react-router/ssr/server'

const appCss = '/assets/styles-JnPvOcB7.css'
const Route$9 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Invoices',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs('html', {
    lang: 'en',
    children: [
      /* @__PURE__ */ jsx('head', {
        children: /* @__PURE__ */ jsx(HeadContent, {}),
      }),
      /* @__PURE__ */ jsxs('body', {
        children: [children, /* @__PURE__ */ jsx(Scripts, {})],
      }),
    ],
  })
}
const $$splitComponentImporter$7 = () => import('./dashboard-D5damhwm.mjs')
const Route$8 = createFileRoute('/dashboard')({
  component: lazyRouteComponent($$splitComponentImporter$7, 'component'),
})
const $$splitComponentImporter$6 = () => import('./index-DiJBTiut.mjs')
const Route$7 = createFileRoute('/')({
  component: lazyRouteComponent($$splitComponentImporter$6, 'component'),
})
const $$splitComponentImporter$5 = () =>
  import('./start.server-funcs-B2zYaptC.mjs')
const TODOS_FILE = 'todos.json'
async function readTodos() {
  return JSON.parse(
    await fs.promises.readFile(TODOS_FILE, 'utf-8').catch(() =>
      JSON.stringify(
        [
          {
            id: 1,
            name: 'Get groceries',
          },
          {
            id: 2,
            name: 'Buy a new phone',
          },
        ],
        null,
        2,
      ),
    ),
  )
}
const getTodos_createServerFn_handler = createSsrRpc(
  'c9d51a5243700889c80f82ed57a4ce74b25f188e5ebd534c9c64965dc44e8e8d',
)
const getTodos = createServerFn({
  method: 'GET',
}).handler(getTodos_createServerFn_handler, async () => await readTodos())
const Route$6 = createFileRoute('/demo/start/server-funcs')({
  component: lazyRouteComponent($$splitComponentImporter$5, 'component'),
  loader: async () => await getTodos(),
})
const $$splitComponentImporter$4 = () =>
  import('./start.api-request-DhPN1_Dc.mjs')
const Route$5 = createFileRoute('/demo/start/api-request')({
  component: lazyRouteComponent($$splitComponentImporter$4, 'component'),
})
const Route$4 = createFileRoute('/demo/api/names')({
  server: {
    handlers: {
      GET: () => json(['Alice', 'Bob', 'Charlie']),
    },
  },
})
const $$splitComponentImporter$3 = () =>
  import('./start.ssr.index-DW0C9PHQ.mjs')
const Route$3 = createFileRoute('/demo/start/ssr/')({
  component: lazyRouteComponent($$splitComponentImporter$3, 'component'),
})
const $$splitComponentImporter$2 = () =>
  import('./start.ssr.spa-mode-BYDg9wK3.mjs')
const Route$2 = createFileRoute('/demo/start/ssr/spa-mode')({
  ssr: false,
  component: lazyRouteComponent($$splitComponentImporter$2, 'component'),
})
const getPunkSongs_createServerFn_handler = createSsrRpc(
  'f74da881407a186b78a7af058df21dafb0126eb11e5a4d54fd322e8feb5038f1',
)
const getPunkSongs = createServerFn({
  method: 'GET',
}).handler(getPunkSongs_createServerFn_handler, async () => [
  {
    id: 1,
    name: 'Teenage Dirtbag',
    artist: 'Wheatus',
  },
  {
    id: 2,
    name: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
  },
  {
    id: 3,
    name: 'The Middle',
    artist: 'Jimmy Eat World',
  },
  {
    id: 4,
    name: 'My Own Worst Enemy',
    artist: 'Lit',
  },
  {
    id: 5,
    name: 'Fat Lip',
    artist: 'Sum 41',
  },
  {
    id: 6,
    name: 'All the Small Things',
    artist: 'blink-182',
  },
  {
    id: 7,
    name: 'Beverly Hills',
    artist: 'Weezer',
  },
])
const $$splitComponentImporter$1 = () =>
  import('./start.ssr.full-ssr-qR2O6b85.mjs')
const Route$1 = createFileRoute('/demo/start/ssr/full-ssr')({
  component: lazyRouteComponent($$splitComponentImporter$1, 'component'),
  loader: async () => await getPunkSongs(),
})
const $$splitComponentImporter = () =>
  import('./start.ssr.data-only-BzOQWewh.mjs')
const Route = createFileRoute('/demo/start/ssr/data-only')({
  ssr: 'data-only',
  component: lazyRouteComponent($$splitComponentImporter, 'component'),
  loader: async () => await getPunkSongs(),
})
const DashboardRoute = Route$8.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => Route$9,
})
const IndexRoute = Route$7.update({
  id: '/',
  path: '/',
  getParentRoute: () => Route$9,
})
const DemoStartServerFuncsRoute = Route$6.update({
  id: '/demo/start/server-funcs',
  path: '/demo/start/server-funcs',
  getParentRoute: () => Route$9,
})
const DemoStartApiRequestRoute = Route$5.update({
  id: '/demo/start/api-request',
  path: '/demo/start/api-request',
  getParentRoute: () => Route$9,
})
const DemoApiNamesRoute = Route$4.update({
  id: '/demo/api/names',
  path: '/demo/api/names',
  getParentRoute: () => Route$9,
})
const DemoStartSsrIndexRoute = Route$3.update({
  id: '/demo/start/ssr/',
  path: '/demo/start/ssr/',
  getParentRoute: () => Route$9,
})
const DemoStartSsrSpaModeRoute = Route$2.update({
  id: '/demo/start/ssr/spa-mode',
  path: '/demo/start/ssr/spa-mode',
  getParentRoute: () => Route$9,
})
const DemoStartSsrFullSsrRoute = Route$1.update({
  id: '/demo/start/ssr/full-ssr',
  path: '/demo/start/ssr/full-ssr',
  getParentRoute: () => Route$9,
})
const DemoStartSsrDataOnlyRoute = Route.update({
  id: '/demo/start/ssr/data-only',
  path: '/demo/start/ssr/data-only',
  getParentRoute: () => Route$9,
})
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute,
  DemoApiNamesRoute,
  DemoStartApiRequestRoute,
  DemoStartServerFuncsRoute,
  DemoStartSsrDataOnlyRoute,
  DemoStartSsrFullSsrRoute,
  DemoStartSsrSpaModeRoute,
  DemoStartSsrIndexRoute,
}
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes()
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  })
  return router2
}
const router = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      getRouter,
    },
    Symbol.toStringTag,
    { value: 'Module' },
  ),
)

export {
  Route$6 as R,
  Route$1 as a,
  Route as b,
  getPunkSongs as g,
  router as r,
}
//# sourceMappingURL=router-O-vE69VZ.mjs.map
