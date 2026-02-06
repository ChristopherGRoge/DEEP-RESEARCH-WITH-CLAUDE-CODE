import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ResearchProjects
   * const researchProjects = await prisma.researchProject.findMany()
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ResearchProjects
 * const researchProjects = await prisma.researchProject.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.researchProject`: Exposes CRUD operations for the **ResearchProject** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more ResearchProjects
  * const researchProjects = await prisma.researchProject.findMany()
  * ```
  */
    get researchProject(): Prisma.ResearchProjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.entity`: Exposes CRUD operations for the **Entity** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Entities
      * const entities = await prisma.entity.findMany()
      * ```
      */
    get entity(): Prisma.EntityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.assertion`: Exposes CRUD operations for the **Assertion** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Assertions
      * const assertions = await prisma.assertion.findMany()
      * ```
      */
    get assertion(): Prisma.AssertionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.reasoning`: Exposes CRUD operations for the **Reasoning** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Reasonings
      * const reasonings = await prisma.reasoning.findMany()
      * ```
      */
    get reasoning(): Prisma.ReasoningDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.source`: Exposes CRUD operations for the **Source** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Sources
      * const sources = await prisma.source.findMany()
      * ```
      */
    get source(): Prisma.SourceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.assertionSource`: Exposes CRUD operations for the **AssertionSource** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more AssertionSources
      * const assertionSources = await prisma.assertionSource.findMany()
      * ```
      */
    get assertionSource(): Prisma.AssertionSourceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.researchLog`: Exposes CRUD operations for the **ResearchLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ResearchLogs
      * const researchLogs = await prisma.researchLog.findMany()
      * ```
      */
    get researchLog(): Prisma.ResearchLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.validationResult`: Exposes CRUD operations for the **ValidationResult** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ValidationResults
      * const validationResults = await prisma.validationResult.findMany()
      * ```
      */
    get validationResult(): Prisma.ValidationResultDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.verifiedCitation`: Exposes CRUD operations for the **VerifiedCitation** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more VerifiedCitations
      * const verifiedCitations = await prisma.verifiedCitation.findMany()
      * ```
      */
    get verifiedCitation(): Prisma.VerifiedCitationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.screenshot`: Exposes CRUD operations for the **Screenshot** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Screenshots
      * const screenshots = await prisma.screenshot.findMany()
      * ```
      */
    get screenshot(): Prisma.ScreenshotDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.extraction`: Exposes CRUD operations for the **Extraction** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Extractions
      * const extractions = await prisma.extraction.findMany()
      * ```
      */
    get extraction(): Prisma.ExtractionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.researchSession`: Exposes CRUD operations for the **ResearchSession** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ResearchSessions
      * const researchSessions = await prisma.researchSession.findMany()
      * ```
      */
    get researchSession(): Prisma.ResearchSessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.researchTask`: Exposes CRUD operations for the **ResearchTask** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ResearchTasks
      * const researchTasks = await prisma.researchTask.findMany()
      * ```
      */
    get researchTask(): Prisma.ResearchTaskDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.discoverySource`: Exposes CRUD operations for the **DiscoverySource** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DiscoverySources
      * const discoverySources = await prisma.discoverySource.findMany()
      * ```
      */
    get discoverySource(): Prisma.DiscoverySourceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.rawDiscovery`: Exposes CRUD operations for the **RawDiscovery** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RawDiscoveries
      * const rawDiscoveries = await prisma.rawDiscovery.findMany()
      * ```
      */
    get rawDiscovery(): Prisma.RawDiscoveryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.discoveryCrawl`: Exposes CRUD operations for the **DiscoveryCrawl** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DiscoveryCrawls
      * const discoveryCrawls = await prisma.discoveryCrawl.findMany()
      * ```
      */
    get discoveryCrawl(): Prisma.DiscoveryCrawlDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.discoveryTrend`: Exposes CRUD operations for the **DiscoveryTrend** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DiscoveryTrends
      * const discoveryTrends = await prisma.discoveryTrend.findMany()
      * ```
      */
    get discoveryTrend(): Prisma.DiscoveryTrendDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.discoveryCategory`: Exposes CRUD operations for the **DiscoveryCategory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more DiscoveryCategories
      * const discoveryCategories = await prisma.discoveryCategory.findMany()
      * ```
      */
    get discoveryCategory(): Prisma.DiscoveryCategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.researchDomain`: Exposes CRUD operations for the **ResearchDomain** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ResearchDomains
      * const researchDomains = await prisma.researchDomain.findMany()
      * ```
      */
    get researchDomain(): Prisma.ResearchDomainDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.entityRelationship`: Exposes CRUD operations for the **EntityRelationship** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more EntityRelationships
      * const entityRelationships = await prisma.entityRelationship.findMany()
      * ```
      */
    get entityRelationship(): Prisma.EntityRelationshipDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.entityPositioning`: Exposes CRUD operations for the **EntityPositioning** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more EntityPositionings
      * const entityPositionings = await prisma.entityPositioning.findMany()
      * ```
      */
    get entityPositioning(): Prisma.EntityPositioningDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.entityForce`: Exposes CRUD operations for the **EntityForce** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more EntityForces
      * const entityForces = await prisma.entityForce.findMany()
      * ```
      */
    get entityForce(): Prisma.EntityForceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map