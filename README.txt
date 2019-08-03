# Setup

`create-next-app home`

Installs: `"next": "9.0.3", "react": "16.8.6"`

## `yarn add next-apollo graphql react-apollo` Output

```
$ yarn add next-apollo graphql react-apollo
yarn add v1.17.3
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning "next-apollo > @apollo/react-common@0.1.0-beta.9" has unmet peer dependency "apollo-utilities@^1.3.2".
warning " > next-apollo@3.0.3" has incorrect peer dependency "next@^8.1.0".
warning " > react-apollo@2.5.8" has unmet peer dependency "apollo-client@^2.6.3".
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 22 new dependencies.
info Direct dependencies
├─ graphql@14.4.2
├─ next-apollo@3.0.3
└─ react-apollo@2.5.8
info All dependencies
├─ @apollo/react-hooks@0.1.0-beta.11
├─ @apollo/react-ssr@0.1.0-beta.1
├─ @types/zen-observable@0.8.0
├─ @wry/equality@0.1.9
├─ apollo-cache@1.3.2
├─ apollo-client@2.6.3
├─ apollo-link@1.2.12
├─ encoding@0.1.12
├─ graphql@14.4.2
├─ hoist-non-react-statics@3.3.0
├─ is-stream@1.1.0
├─ isomorphic-fetch@2.2.1
├─ iterall@1.2.2
├─ lodash.isequal@4.5.0
├─ lodash.isfunction@3.0.9
├─ next-apollo@3.0.3
├─ node-fetch@1.7.3
├─ react-apollo@2.5.8
├─ symbol-observable@1.2.0
├─ ts-invariant@0.4.4
├─ whatwg-fetch@3.0.0
└─ zen-observable-ts@0.8.19
  Done in 61.28s.
```

## Observed: compilation error
```
./node_modules/next-apollo/dist/initApollo.js
Module not found: Can't resolve 'apollo-cache-inmemory' in '/project-path/node_modules/next-apollo/dist'
```


## Attempting to fix missing apollo-cache-inmemory with `yarn add apollo-cache-inmemory`

```
$ yarn add apollo-cache-inmemory@^1.6.0
yarn add v1.17.3
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning " > next-apollo@3.0.3" has incorrect peer dependency "next@^8.1.0".
warning "next-apollo > @apollo/react-common@0.1.0-beta.9" has unmet peer dependency "apollo-utilities@^1.3.2".
warning " > react-apollo@2.5.8" has unmet peer dependency "apollo-client@^2.6.3".
[4/4] 🔨  Building fresh packages...

success Saved lockfile.
success Saved 4 new dependencies.
info Direct dependencies
└─ apollo-cache-inmemory@1.6.2
info All dependencies
├─ @types/node@12.6.9
├─ @wry/context@0.4.4
├─ apollo-cache-inmemory@1.6.2
└─ optimism@0.9.6
✨  Done in 16.87s.
```


## Observed: compilation error

```
./lib/apollo.js
Module not found: Can't resolve 'apollo-link-http' in '/project-path/lib'
```

which sort of makes sense since we have `import { HttpLink } from "apollo-link-http"` and no package.


## Attempting to fix

```
$ yarn add apollo-link-http
yarn add v1.17.3
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning " > next-apollo@3.0.3" has incorrect peer dependency "next@^8.1.0".
warning "next-apollo > @apollo/react-common@0.1.0-beta.9" has unmet peer dependency "apollo-utilities@^1.3.2".
warning " > react-apollo@2.5.8" has unmet peer dependency "apollo-client@^2.6.3".
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
success Saved 2 new dependencies.
info Direct dependencies
└─ apollo-link-http@1.5.15
info All dependencies
├─ apollo-link-http-common@0.2.14
└─ apollo-link-http@1.5.15
✨  Done in 11.99s
```

## Observed: no compilation errors

Hooray!

## Next steps
1. Adding query as per https://github.com/apollographql/react-apollo#usage, with Query component:
```
<Query query={GET_POSTS}>
  {(loading, error, data) => {
    if (loading) return "Loading...";
    if (error) return `Error: ${error}`;

    const { allPosts } = data;
    return (
      <>
        {allPosts.map(({ id, title, url }) => (
          <Link key={id} href={url}>
            <a className="card">
              <h3>{title}</h3>
            </a>
          </Link>
        ))}
      </>
    );
  }}
</Query>
```
2. Find `graphql-tag` missing
3. Add that

## Observed: Runtime error

```
Could not find "client" in the context or passed in as a prop. Wrap the root component in an <ApolloProvider>, or pass an ApolloClient instance in via props.

Invariant Violation: Could not find "client" in the context or passed in as a prop. Wrap the root component in an <ApolloProvider>, or pass an ApolloClient instance in via props.
    at new InvariantError (/project-path/node_modules/ts-invariant/lib/invariant.js:16:28)
    at Object.invariant (/project-path/node_modules/ts-invariant/lib/invariant.js:28:15)
    at getClient (/project-path/node_modules/react-apollo/react-apollo.cjs.js:116:91)
    at new Query (/project-path/node_modules/react-apollo/react-apollo.cjs.js:282:24)
    at processChild (/project-path/node_modules/react-dom/cjs/react-dom-server.node.development.js:2846:14)
    at resolve (/project-path/node_modules/react-dom/cjs/react-dom-server.node.development.js:2812:5)
    at ReactDOMServerRenderer.render (/project-path/node_modules/react-dom/cjs/react-dom-server.node.development.js:3202:22)
    at ReactDOMServerRenderer.read (/project-path/node_modules/react-dom/cjs/react-dom-server.node.development.js:3161:29)
    at renderToString (/project-path/node_modules/react-dom/cjs/react-dom-server.node.development.js:3646:27)
    at render (/project-path/node_modules/next-server/dist/server/render.js:80:16)
    at renderPage (/project-path/node_modules/next-server/dist/server/render.js:237:20)
    at /project-path/.next/server/static/development/pages/_document.js:437:17
    at Generator.next (<anonymous>)
    at asyncGeneratorStep (/project-path/.next/server/static/development/pages/_document.js:206:24)
    at _next (/project-path/.next/server/static/development/pages/_document.js:228:9)
    at /project-path/.next/server/static/development/pages/_document.js:235:7
```

## Trying to fix by moving to `react-apollo@beta`

```
$ yarn add react-apollo@3.0.0-beta.4
yarn add v1.17.3
[1/4] 🔍  Resolving packages...
Couldn't find any versions for "react-apollo" that matches "next"
? Please choose a version of "react-apollo" from this list: 3.0.0-beta.4
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning " > next-apollo@3.0.3" has incorrect peer dependency "next@^8.1.0".
warning "next-apollo > @apollo/react-common@0.1.0-beta.9" has unmet peer dependency "apollo-utilities@^1.3.2".
warning "react-apollo > @apollo/react-hooks@0.1.0-beta.11" has unmet peer dependency "apollo-client@^2.6.3".
warning "react-apollo > @apollo/react-components@0.1.0-beta.8" has unmet peer dependency "apollo-cache@^1.3.2".
warning "react-apollo > @apollo/react-components@0.1.0-beta.8" has unmet peer dependency "apollo-client@^2.6.3".
warning "react-apollo > @apollo/react-components@0.1.0-beta.8" has unmet peer dependency "apollo-link@^1.2.12".
warning "react-apollo > @apollo/react-components@0.1.0-beta.8" has unmet peer dependency "apollo-utilities@^1.3.2".
warning "react-apollo > @apollo/react-hoc@0.1.0-beta.8" has unmet peer dependency "apollo-client@^2.6.3".
warning " > react-apollo@3.0.0-beta.4" has unmet peer dependency "apollo-client@^2.6.3".
[4/4] 🔨  Building fresh packages...

success Saved lockfile.
success Saved 3 new dependencies.
info Direct dependencies
└─ react-apollo@3.0.0-beta.4
info All dependencies
├─ @apollo/react-hoc@0.1.0-beta.8
├─ hoist-non-react-statics@3.3.0
└─ react-apollo@3.0.0-beta.4
✨  Done in 72.00s.
```


## Observed: slight improvement?
* Page loads, showing "loading..." message
* Inspecting the page, I find `__NEXT_DATA__` very obviously contains query result
* However, the page never shows the results, and no errors appear in the Next dev server or the browser JS console


## Solved!

1. I stumble upon https://github.com/adamsoffer/next-apollo/issues/37#issuecomment-500664154
2. I decide that might be the source for the latest installation / implementation details
3. I switch to `useQuery` and now everything works!
