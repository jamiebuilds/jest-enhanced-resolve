import * as fs from 'fs'
import path from 'path'
// import resolveFrom from 'resolve-from';
import { ResolverFactory } from 'enhanced-resolve'
import Resolver from 'jest-resolve'
import type { ResolverConfig } from 'jest-resolve/build/types'
interface JestResolveOpts extends ResolverConfig {
  basedir: string
}

export default function createEnhancedResolver(resolverOpts: Parameters<typeof ResolverFactory.createResolver>[0]) {
  return function enhancedResolve(modulePath: string, opts: JestResolveOpts) {
    if (modulePath.startsWith('.') || modulePath.startsWith(path.sep)) {
      return new Resolver(modulePath, opts)
    }

    let wpResolver = ResolverFactory.createResolver({
      ...resolverOpts,
      // @ts-ignore
      fileSystem: fs,
      useSyncFileSystemCalls: true
    })

    let result = wpResolver.resolveSync({}, opts.basedir, modulePath)

    if (result) {
      result = fs.realpathSync(result)
    }

    return result
  }
}
