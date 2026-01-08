import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.2.0
 * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly ResearchProject: "ResearchProject";
    readonly Entity: "Entity";
    readonly Assertion: "Assertion";
    readonly Reasoning: "Reasoning";
    readonly Source: "Source";
    readonly AssertionSource: "AssertionSource";
    readonly ResearchLog: "ResearchLog";
    readonly Screenshot: "Screenshot";
    readonly Extraction: "Extraction";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "researchProject" | "entity" | "assertion" | "reasoning" | "source" | "assertionSource" | "researchLog" | "screenshot" | "extraction";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        ResearchProject: {
            payload: Prisma.$ResearchProjectPayload<ExtArgs>;
            fields: Prisma.ResearchProjectFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ResearchProjectFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ResearchProjectFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload>;
                };
                findFirst: {
                    args: Prisma.ResearchProjectFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ResearchProjectFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload>;
                };
                findMany: {
                    args: Prisma.ResearchProjectFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload>[];
                };
                create: {
                    args: Prisma.ResearchProjectCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload>;
                };
                createMany: {
                    args: Prisma.ResearchProjectCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ResearchProjectCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload>[];
                };
                delete: {
                    args: Prisma.ResearchProjectDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload>;
                };
                update: {
                    args: Prisma.ResearchProjectUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload>;
                };
                deleteMany: {
                    args: Prisma.ResearchProjectDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ResearchProjectUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ResearchProjectUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload>[];
                };
                upsert: {
                    args: Prisma.ResearchProjectUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchProjectPayload>;
                };
                aggregate: {
                    args: Prisma.ResearchProjectAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateResearchProject>;
                };
                groupBy: {
                    args: Prisma.ResearchProjectGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResearchProjectGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ResearchProjectCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResearchProjectCountAggregateOutputType> | number;
                };
            };
        };
        Entity: {
            payload: Prisma.$EntityPayload<ExtArgs>;
            fields: Prisma.EntityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EntityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EntityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload>;
                };
                findFirst: {
                    args: Prisma.EntityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EntityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload>;
                };
                findMany: {
                    args: Prisma.EntityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload>[];
                };
                create: {
                    args: Prisma.EntityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload>;
                };
                createMany: {
                    args: Prisma.EntityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EntityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload>[];
                };
                delete: {
                    args: Prisma.EntityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload>;
                };
                update: {
                    args: Prisma.EntityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload>;
                };
                deleteMany: {
                    args: Prisma.EntityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EntityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EntityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload>[];
                };
                upsert: {
                    args: Prisma.EntityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EntityPayload>;
                };
                aggregate: {
                    args: Prisma.EntityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEntity>;
                };
                groupBy: {
                    args: Prisma.EntityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EntityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EntityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EntityCountAggregateOutputType> | number;
                };
            };
        };
        Assertion: {
            payload: Prisma.$AssertionPayload<ExtArgs>;
            fields: Prisma.AssertionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AssertionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AssertionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload>;
                };
                findFirst: {
                    args: Prisma.AssertionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AssertionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload>;
                };
                findMany: {
                    args: Prisma.AssertionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload>[];
                };
                create: {
                    args: Prisma.AssertionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload>;
                };
                createMany: {
                    args: Prisma.AssertionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AssertionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload>[];
                };
                delete: {
                    args: Prisma.AssertionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload>;
                };
                update: {
                    args: Prisma.AssertionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload>;
                };
                deleteMany: {
                    args: Prisma.AssertionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AssertionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AssertionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload>[];
                };
                upsert: {
                    args: Prisma.AssertionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionPayload>;
                };
                aggregate: {
                    args: Prisma.AssertionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssertion>;
                };
                groupBy: {
                    args: Prisma.AssertionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssertionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AssertionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssertionCountAggregateOutputType> | number;
                };
            };
        };
        Reasoning: {
            payload: Prisma.$ReasoningPayload<ExtArgs>;
            fields: Prisma.ReasoningFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReasoningFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReasoningFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload>;
                };
                findFirst: {
                    args: Prisma.ReasoningFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReasoningFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload>;
                };
                findMany: {
                    args: Prisma.ReasoningFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload>[];
                };
                create: {
                    args: Prisma.ReasoningCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload>;
                };
                createMany: {
                    args: Prisma.ReasoningCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReasoningCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload>[];
                };
                delete: {
                    args: Prisma.ReasoningDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload>;
                };
                update: {
                    args: Prisma.ReasoningUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload>;
                };
                deleteMany: {
                    args: Prisma.ReasoningDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReasoningUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReasoningUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload>[];
                };
                upsert: {
                    args: Prisma.ReasoningUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReasoningPayload>;
                };
                aggregate: {
                    args: Prisma.ReasoningAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReasoning>;
                };
                groupBy: {
                    args: Prisma.ReasoningGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReasoningGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReasoningCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReasoningCountAggregateOutputType> | number;
                };
            };
        };
        Source: {
            payload: Prisma.$SourcePayload<ExtArgs>;
            fields: Prisma.SourceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SourceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SourceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload>;
                };
                findFirst: {
                    args: Prisma.SourceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SourceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload>;
                };
                findMany: {
                    args: Prisma.SourceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload>[];
                };
                create: {
                    args: Prisma.SourceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload>;
                };
                createMany: {
                    args: Prisma.SourceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SourceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload>[];
                };
                delete: {
                    args: Prisma.SourceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload>;
                };
                update: {
                    args: Prisma.SourceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload>;
                };
                deleteMany: {
                    args: Prisma.SourceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SourceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SourceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload>[];
                };
                upsert: {
                    args: Prisma.SourceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SourcePayload>;
                };
                aggregate: {
                    args: Prisma.SourceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSource>;
                };
                groupBy: {
                    args: Prisma.SourceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SourceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SourceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SourceCountAggregateOutputType> | number;
                };
            };
        };
        AssertionSource: {
            payload: Prisma.$AssertionSourcePayload<ExtArgs>;
            fields: Prisma.AssertionSourceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AssertionSourceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AssertionSourceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload>;
                };
                findFirst: {
                    args: Prisma.AssertionSourceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AssertionSourceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload>;
                };
                findMany: {
                    args: Prisma.AssertionSourceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload>[];
                };
                create: {
                    args: Prisma.AssertionSourceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload>;
                };
                createMany: {
                    args: Prisma.AssertionSourceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AssertionSourceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload>[];
                };
                delete: {
                    args: Prisma.AssertionSourceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload>;
                };
                update: {
                    args: Prisma.AssertionSourceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload>;
                };
                deleteMany: {
                    args: Prisma.AssertionSourceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AssertionSourceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AssertionSourceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload>[];
                };
                upsert: {
                    args: Prisma.AssertionSourceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AssertionSourcePayload>;
                };
                aggregate: {
                    args: Prisma.AssertionSourceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAssertionSource>;
                };
                groupBy: {
                    args: Prisma.AssertionSourceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssertionSourceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AssertionSourceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AssertionSourceCountAggregateOutputType> | number;
                };
            };
        };
        ResearchLog: {
            payload: Prisma.$ResearchLogPayload<ExtArgs>;
            fields: Prisma.ResearchLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ResearchLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ResearchLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload>;
                };
                findFirst: {
                    args: Prisma.ResearchLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ResearchLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload>;
                };
                findMany: {
                    args: Prisma.ResearchLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload>[];
                };
                create: {
                    args: Prisma.ResearchLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload>;
                };
                createMany: {
                    args: Prisma.ResearchLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ResearchLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload>[];
                };
                delete: {
                    args: Prisma.ResearchLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload>;
                };
                update: {
                    args: Prisma.ResearchLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload>;
                };
                deleteMany: {
                    args: Prisma.ResearchLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ResearchLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ResearchLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload>[];
                };
                upsert: {
                    args: Prisma.ResearchLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ResearchLogPayload>;
                };
                aggregate: {
                    args: Prisma.ResearchLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateResearchLog>;
                };
                groupBy: {
                    args: Prisma.ResearchLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResearchLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ResearchLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ResearchLogCountAggregateOutputType> | number;
                };
            };
        };
        Screenshot: {
            payload: Prisma.$ScreenshotPayload<ExtArgs>;
            fields: Prisma.ScreenshotFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ScreenshotFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ScreenshotFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload>;
                };
                findFirst: {
                    args: Prisma.ScreenshotFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ScreenshotFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload>;
                };
                findMany: {
                    args: Prisma.ScreenshotFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload>[];
                };
                create: {
                    args: Prisma.ScreenshotCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload>;
                };
                createMany: {
                    args: Prisma.ScreenshotCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ScreenshotCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload>[];
                };
                delete: {
                    args: Prisma.ScreenshotDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload>;
                };
                update: {
                    args: Prisma.ScreenshotUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload>;
                };
                deleteMany: {
                    args: Prisma.ScreenshotDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ScreenshotUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ScreenshotUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload>[];
                };
                upsert: {
                    args: Prisma.ScreenshotUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ScreenshotPayload>;
                };
                aggregate: {
                    args: Prisma.ScreenshotAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateScreenshot>;
                };
                groupBy: {
                    args: Prisma.ScreenshotGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ScreenshotGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ScreenshotCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ScreenshotCountAggregateOutputType> | number;
                };
            };
        };
        Extraction: {
            payload: Prisma.$ExtractionPayload<ExtArgs>;
            fields: Prisma.ExtractionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExtractionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExtractionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload>;
                };
                findFirst: {
                    args: Prisma.ExtractionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExtractionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload>;
                };
                findMany: {
                    args: Prisma.ExtractionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload>[];
                };
                create: {
                    args: Prisma.ExtractionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload>;
                };
                createMany: {
                    args: Prisma.ExtractionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExtractionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload>[];
                };
                delete: {
                    args: Prisma.ExtractionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload>;
                };
                update: {
                    args: Prisma.ExtractionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload>;
                };
                deleteMany: {
                    args: Prisma.ExtractionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExtractionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExtractionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload>[];
                };
                upsert: {
                    args: Prisma.ExtractionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExtractionPayload>;
                };
                aggregate: {
                    args: Prisma.ExtractionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExtraction>;
                };
                groupBy: {
                    args: Prisma.ExtractionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExtractionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExtractionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExtractionCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ResearchProjectScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly searchQuery: "searchQuery";
    readonly workflow: "workflow";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ResearchProjectScalarFieldEnum = (typeof ResearchProjectScalarFieldEnum)[keyof typeof ResearchProjectScalarFieldEnum];
export declare const EntityScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly entityType: "entityType";
    readonly url: "url";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly logoUrl: "logoUrl";
    readonly logoPath: "logoPath";
    readonly logoFormat: "logoFormat";
    readonly logoSvgContent: "logoSvgContent";
    readonly logoSourceUrl: "logoSourceUrl";
    readonly logoFetchedAt: "logoFetchedAt";
    readonly logoVerified: "logoVerified";
    readonly projectId: "projectId";
};
export type EntityScalarFieldEnum = (typeof EntityScalarFieldEnum)[keyof typeof EntityScalarFieldEnum];
export declare const AssertionScalarFieldEnum: {
    readonly id: "id";
    readonly claim: "claim";
    readonly status: "status";
    readonly category: "category";
    readonly confidence: "confidence";
    readonly criticality: "criticality";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly validatedAt: "validatedAt";
    readonly validatedBy: "validatedBy";
    readonly citedInConclusion: "citedInConclusion";
    readonly conclusionContext: "conclusionContext";
    readonly rejectionReason: "rejectionReason";
    readonly supersededBy: "supersededBy";
    readonly humanResponse: "humanResponse";
    readonly validationNotes: "validationNotes";
    readonly partiallyValidated: "partiallyValidated";
    readonly evidenceScreenshots: "evidenceScreenshots";
    readonly evidenceChain: "evidenceChain";
    readonly evidenceDescription: "evidenceDescription";
    readonly evidenceScreenshotPath: "evidenceScreenshotPath";
    readonly entityId: "entityId";
};
export type AssertionScalarFieldEnum = (typeof AssertionScalarFieldEnum)[keyof typeof AssertionScalarFieldEnum];
export declare const ReasoningScalarFieldEnum: {
    readonly id: "id";
    readonly content: "content";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly assertionId: "assertionId";
};
export type ReasoningScalarFieldEnum = (typeof ReasoningScalarFieldEnum)[keyof typeof ReasoningScalarFieldEnum];
export declare const SourceScalarFieldEnum: {
    readonly id: "id";
    readonly url: "url";
    readonly title: "title";
    readonly description: "description";
    readonly sourceType: "sourceType";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly validatedAt: "validatedAt";
    readonly validatedBy: "validatedBy";
    readonly lastFetchedAt: "lastFetchedAt";
    readonly lastStatusCode: "lastStatusCode";
    readonly contentHash: "contentHash";
    readonly isAccessible: "isAccessible";
};
export type SourceScalarFieldEnum = (typeof SourceScalarFieldEnum)[keyof typeof SourceScalarFieldEnum];
export declare const AssertionSourceScalarFieldEnum: {
    readonly id: "id";
    readonly quote: "quote";
    readonly createdAt: "createdAt";
    readonly addedBy: "addedBy";
    readonly relevanceGrade: "relevanceGrade";
    readonly annotation: "annotation";
    readonly gradedBy: "gradedBy";
    readonly gradedAt: "gradedAt";
    readonly assertionId: "assertionId";
    readonly sourceId: "sourceId";
};
export type AssertionSourceScalarFieldEnum = (typeof AssertionSourceScalarFieldEnum)[keyof typeof AssertionSourceScalarFieldEnum];
export declare const ResearchLogScalarFieldEnum: {
    readonly id: "id";
    readonly action: "action";
    readonly details: "details";
    readonly agentId: "agentId";
    readonly createdAt: "createdAt";
};
export type ResearchLogScalarFieldEnum = (typeof ResearchLogScalarFieldEnum)[keyof typeof ResearchLogScalarFieldEnum];
export declare const ScreenshotScalarFieldEnum: {
    readonly id: "id";
    readonly filePath: "filePath";
    readonly url: "url";
    readonly fullPage: "fullPage";
    readonly width: "width";
    readonly height: "height";
    readonly capturedAt: "capturedAt";
};
export type ScreenshotScalarFieldEnum = (typeof ScreenshotScalarFieldEnum)[keyof typeof ScreenshotScalarFieldEnum];
export declare const ExtractionScalarFieldEnum: {
    readonly id: "id";
    readonly schemaType: "schemaType";
    readonly data: "data";
    readonly rawQuotes: "rawQuotes";
    readonly status: "status";
    readonly confidence: "confidence";
    readonly error: "error";
    readonly extractedAt: "extractedAt";
    readonly expiresAt: "expiresAt";
    readonly entityId: "entityId";
    readonly sourceId: "sourceId";
    readonly screenshotId: "screenshotId";
    readonly assertionIds: "assertionIds";
};
export type ExtractionScalarFieldEnum = (typeof ExtractionScalarFieldEnum)[keyof typeof ExtractionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'ResearchWorkflow'
 */
export type EnumResearchWorkflowFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResearchWorkflow'>;
/**
 * Reference to a field of type 'ResearchWorkflow[]'
 */
export type ListEnumResearchWorkflowFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ResearchWorkflow[]'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'AssertionStatus'
 */
export type EnumAssertionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssertionStatus'>;
/**
 * Reference to a field of type 'AssertionStatus[]'
 */
export type ListEnumAssertionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssertionStatus[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Reference to a field of type 'AssertionCriticality'
 */
export type EnumAssertionCriticalityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssertionCriticality'>;
/**
 * Reference to a field of type 'AssertionCriticality[]'
 */
export type ListEnumAssertionCriticalityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssertionCriticality[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'SourceStatus'
 */
export type EnumSourceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceStatus'>;
/**
 * Reference to a field of type 'SourceStatus[]'
 */
export type ListEnumSourceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceStatus[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'SourceRelevance'
 */
export type EnumSourceRelevanceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceRelevance'>;
/**
 * Reference to a field of type 'SourceRelevance[]'
 */
export type ListEnumSourceRelevanceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SourceRelevance[]'>;
/**
 * Reference to a field of type 'ExtractionStatus'
 */
export type EnumExtractionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExtractionStatus'>;
/**
 * Reference to a field of type 'ExtractionStatus[]'
 */
export type ListEnumExtractionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExtractionStatus[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    researchProject?: Prisma.ResearchProjectOmit;
    entity?: Prisma.EntityOmit;
    assertion?: Prisma.AssertionOmit;
    reasoning?: Prisma.ReasoningOmit;
    source?: Prisma.SourceOmit;
    assertionSource?: Prisma.AssertionSourceOmit;
    researchLog?: Prisma.ResearchLogOmit;
    screenshot?: Prisma.ScreenshotOmit;
    extraction?: Prisma.ExtractionOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map