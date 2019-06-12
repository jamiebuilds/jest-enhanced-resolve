import fs from "fs";
import { ResolverFactory } from "enhanced-resolve";

type CreateResolver = typeof ResolverFactory.createResolver;
type Resolver = ReturnType<CreateResolver>;
type ResolverOpts = Parameters<CreateResolver>[0];
type JestResolveOpts = Parameters<
  typeof import("jest-resolve/build/defaultResolver").default
>[1];
type getConfigOpts = Pick<
  JestResolveOpts,
  "browser" | "extensions" | "moduleDirectory"
>;

export default (module.exports = exports = create(getDefaultConfig));

export function create(getConfig: (opts: getConfigOpts) => ResolverOpts) {
  const resolverCache: { [x: string]: Resolver } = Object.create(null);
  return (modulePath: string, jestOpts: JestResolveOpts) => {
    const configOpts = {
      browser: jestOpts.browser,
      extensions: jestOpts.extensions,
      moduleDirectory: jestOpts.moduleDirectory
    };
    const cacheKey = JSON.stringify(configOpts);
    const resolver =
      resolverCache[cacheKey] ||
      (resolverCache[cacheKey] = ResolverFactory.createResolver({
        ...getConfig(configOpts),
        useSyncFileSystemCalls: true
      }));

    return resolver.resolveSync({}, jestOpts.basedir, modulePath);
  };
}

export function getDefaultConfig(opts: getConfigOpts): ResolverOpts {
  return {
    symlinks: true,
    extensions: opts.extensions,
    modules: opts.moduleDirectory,
    fileSystem: fs as ResolverOpts["fileSystem"],
    ...(opts.browser
      ? {
          aliasFields: ["browser"],
          mainFields: ["browser", "main"]
        }
      : {})
  };
}
