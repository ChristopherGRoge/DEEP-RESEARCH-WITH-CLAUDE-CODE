import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DiscoverySource
 * A curated information source for discovery crawling
 */
export type DiscoverySourceModel = runtime.Types.Result.DefaultSelection<Prisma.$DiscoverySourcePayload>;
export type AggregateDiscoverySource = {
    _count: DiscoverySourceCountAggregateOutputType | null;
    _avg: DiscoverySourceAvgAggregateOutputType | null;
    _sum: DiscoverySourceSumAggregateOutputType | null;
    _min: DiscoverySourceMinAggregateOutputType | null;
    _max: DiscoverySourceMaxAggregateOutputType | null;
};
export type DiscoverySourceAvgAggregateOutputType = {
    crawlDepth: number | null;
    consecutiveErrors: number | null;
    discoveriesCount: number | null;
    validatedCount: number | null;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    priority: number | null;
};
export type DiscoverySourceSumAggregateOutputType = {
    crawlDepth: number | null;
    consecutiveErrors: number | null;
    discoveriesCount: number | null;
    validatedCount: number | null;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    priority: number | null;
};
export type DiscoverySourceMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    url: string | null;
    sourceType: $Enums.SourceType | null;
    category: string | null;
    crawlStrategy: string | null;
    crawlFrequency: string | null;
    crawlDepth: number | null;
    feedUrl: string | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number | null;
    isActive: boolean | null;
    discoveriesCount: number | null;
    validatedCount: number | null;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    description: string | null;
    priority: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DiscoverySourceMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    url: string | null;
    sourceType: $Enums.SourceType | null;
    category: string | null;
    crawlStrategy: string | null;
    crawlFrequency: string | null;
    crawlDepth: number | null;
    feedUrl: string | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number | null;
    isActive: boolean | null;
    discoveriesCount: number | null;
    validatedCount: number | null;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    description: string | null;
    priority: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DiscoverySourceCountAggregateOutputType = {
    id: number;
    name: number;
    url: number;
    sourceType: number;
    category: number;
    crawlStrategy: number;
    crawlFrequency: number;
    crawlDepth: number;
    selectors: number;
    feedUrl: number;
    apiEndpoint: number;
    lastCrawledAt: number;
    lastSuccessAt: number;
    lastError: number;
    consecutiveErrors: number;
    isActive: number;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number;
    avgNoveltyScore: number;
    description: number;
    tags: number;
    priority: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DiscoverySourceAvgAggregateInputType = {
    crawlDepth?: true;
    consecutiveErrors?: true;
    discoveriesCount?: true;
    validatedCount?: true;
    hitRate?: true;
    avgNoveltyScore?: true;
    priority?: true;
};
export type DiscoverySourceSumAggregateInputType = {
    crawlDepth?: true;
    consecutiveErrors?: true;
    discoveriesCount?: true;
    validatedCount?: true;
    hitRate?: true;
    avgNoveltyScore?: true;
    priority?: true;
};
export type DiscoverySourceMinAggregateInputType = {
    id?: true;
    name?: true;
    url?: true;
    sourceType?: true;
    category?: true;
    crawlStrategy?: true;
    crawlFrequency?: true;
    crawlDepth?: true;
    feedUrl?: true;
    apiEndpoint?: true;
    lastCrawledAt?: true;
    lastSuccessAt?: true;
    lastError?: true;
    consecutiveErrors?: true;
    isActive?: true;
    discoveriesCount?: true;
    validatedCount?: true;
    hitRate?: true;
    avgNoveltyScore?: true;
    description?: true;
    priority?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DiscoverySourceMaxAggregateInputType = {
    id?: true;
    name?: true;
    url?: true;
    sourceType?: true;
    category?: true;
    crawlStrategy?: true;
    crawlFrequency?: true;
    crawlDepth?: true;
    feedUrl?: true;
    apiEndpoint?: true;
    lastCrawledAt?: true;
    lastSuccessAt?: true;
    lastError?: true;
    consecutiveErrors?: true;
    isActive?: true;
    discoveriesCount?: true;
    validatedCount?: true;
    hitRate?: true;
    avgNoveltyScore?: true;
    description?: true;
    priority?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DiscoverySourceCountAggregateInputType = {
    id?: true;
    name?: true;
    url?: true;
    sourceType?: true;
    category?: true;
    crawlStrategy?: true;
    crawlFrequency?: true;
    crawlDepth?: true;
    selectors?: true;
    feedUrl?: true;
    apiEndpoint?: true;
    lastCrawledAt?: true;
    lastSuccessAt?: true;
    lastError?: true;
    consecutiveErrors?: true;
    isActive?: true;
    discoveriesCount?: true;
    validatedCount?: true;
    hitRate?: true;
    avgNoveltyScore?: true;
    description?: true;
    tags?: true;
    priority?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DiscoverySourceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DiscoverySource to aggregate.
     */
    where?: Prisma.DiscoverySourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoverySources to fetch.
     */
    orderBy?: Prisma.DiscoverySourceOrderByWithRelationInput | Prisma.DiscoverySourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DiscoverySourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoverySources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoverySources.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DiscoverySources
    **/
    _count?: true | DiscoverySourceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DiscoverySourceAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DiscoverySourceSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DiscoverySourceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DiscoverySourceMaxAggregateInputType;
};
export type GetDiscoverySourceAggregateType<T extends DiscoverySourceAggregateArgs> = {
    [P in keyof T & keyof AggregateDiscoverySource]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiscoverySource[P]> : Prisma.GetScalarType<T[P], AggregateDiscoverySource[P]>;
};
export type DiscoverySourceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscoverySourceWhereInput;
    orderBy?: Prisma.DiscoverySourceOrderByWithAggregationInput | Prisma.DiscoverySourceOrderByWithAggregationInput[];
    by: Prisma.DiscoverySourceScalarFieldEnum[] | Prisma.DiscoverySourceScalarFieldEnum;
    having?: Prisma.DiscoverySourceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiscoverySourceCountAggregateInputType | true;
    _avg?: DiscoverySourceAvgAggregateInputType;
    _sum?: DiscoverySourceSumAggregateInputType;
    _min?: DiscoverySourceMinAggregateInputType;
    _max?: DiscoverySourceMaxAggregateInputType;
};
export type DiscoverySourceGroupByOutputType = {
    id: string;
    name: string;
    url: string;
    sourceType: $Enums.SourceType;
    category: string;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth: number;
    selectors: runtime.JsonValue | null;
    feedUrl: string | null;
    apiEndpoint: string | null;
    lastCrawledAt: Date | null;
    lastSuccessAt: Date | null;
    lastError: string | null;
    consecutiveErrors: number;
    isActive: boolean;
    discoveriesCount: number;
    validatedCount: number;
    hitRate: number | null;
    avgNoveltyScore: number | null;
    description: string | null;
    tags: string[];
    priority: number;
    createdAt: Date;
    updatedAt: Date;
    _count: DiscoverySourceCountAggregateOutputType | null;
    _avg: DiscoverySourceAvgAggregateOutputType | null;
    _sum: DiscoverySourceSumAggregateOutputType | null;
    _min: DiscoverySourceMinAggregateOutputType | null;
    _max: DiscoverySourceMaxAggregateOutputType | null;
};
type GetDiscoverySourceGroupByPayload<T extends DiscoverySourceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiscoverySourceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiscoverySourceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiscoverySourceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiscoverySourceGroupByOutputType[P]>;
}>>;
export type DiscoverySourceWhereInput = {
    AND?: Prisma.DiscoverySourceWhereInput | Prisma.DiscoverySourceWhereInput[];
    OR?: Prisma.DiscoverySourceWhereInput[];
    NOT?: Prisma.DiscoverySourceWhereInput | Prisma.DiscoverySourceWhereInput[];
    id?: Prisma.StringFilter<"DiscoverySource"> | string;
    name?: Prisma.StringFilter<"DiscoverySource"> | string;
    url?: Prisma.StringFilter<"DiscoverySource"> | string;
    sourceType?: Prisma.EnumSourceTypeFilter<"DiscoverySource"> | $Enums.SourceType;
    category?: Prisma.StringFilter<"DiscoverySource"> | string;
    crawlStrategy?: Prisma.StringFilter<"DiscoverySource"> | string;
    crawlFrequency?: Prisma.StringFilter<"DiscoverySource"> | string;
    crawlDepth?: Prisma.IntFilter<"DiscoverySource"> | number;
    selectors?: Prisma.JsonNullableFilter<"DiscoverySource">;
    feedUrl?: Prisma.StringNullableFilter<"DiscoverySource"> | string | null;
    apiEndpoint?: Prisma.StringNullableFilter<"DiscoverySource"> | string | null;
    lastCrawledAt?: Prisma.DateTimeNullableFilter<"DiscoverySource"> | Date | string | null;
    lastSuccessAt?: Prisma.DateTimeNullableFilter<"DiscoverySource"> | Date | string | null;
    lastError?: Prisma.StringNullableFilter<"DiscoverySource"> | string | null;
    consecutiveErrors?: Prisma.IntFilter<"DiscoverySource"> | number;
    isActive?: Prisma.BoolFilter<"DiscoverySource"> | boolean;
    discoveriesCount?: Prisma.IntFilter<"DiscoverySource"> | number;
    validatedCount?: Prisma.IntFilter<"DiscoverySource"> | number;
    hitRate?: Prisma.FloatNullableFilter<"DiscoverySource"> | number | null;
    avgNoveltyScore?: Prisma.FloatNullableFilter<"DiscoverySource"> | number | null;
    description?: Prisma.StringNullableFilter<"DiscoverySource"> | string | null;
    tags?: Prisma.StringNullableListFilter<"DiscoverySource">;
    priority?: Prisma.IntFilter<"DiscoverySource"> | number;
    createdAt?: Prisma.DateTimeFilter<"DiscoverySource"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DiscoverySource"> | Date | string;
    discoveries?: Prisma.RawDiscoveryListRelationFilter;
};
export type DiscoverySourceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    crawlStrategy?: Prisma.SortOrder;
    crawlFrequency?: Prisma.SortOrder;
    crawlDepth?: Prisma.SortOrder;
    selectors?: Prisma.SortOrderInput | Prisma.SortOrder;
    feedUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    apiEndpoint?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastCrawledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSuccessAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastError?: Prisma.SortOrderInput | Prisma.SortOrder;
    consecutiveErrors?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    discoveriesCount?: Prisma.SortOrder;
    validatedCount?: Prisma.SortOrder;
    hitRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    avgNoveltyScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    discoveries?: Prisma.RawDiscoveryOrderByRelationAggregateInput;
};
export type DiscoverySourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.DiscoverySourceWhereInput | Prisma.DiscoverySourceWhereInput[];
    OR?: Prisma.DiscoverySourceWhereInput[];
    NOT?: Prisma.DiscoverySourceWhereInput | Prisma.DiscoverySourceWhereInput[];
    url?: Prisma.StringFilter<"DiscoverySource"> | string;
    sourceType?: Prisma.EnumSourceTypeFilter<"DiscoverySource"> | $Enums.SourceType;
    category?: Prisma.StringFilter<"DiscoverySource"> | string;
    crawlStrategy?: Prisma.StringFilter<"DiscoverySource"> | string;
    crawlFrequency?: Prisma.StringFilter<"DiscoverySource"> | string;
    crawlDepth?: Prisma.IntFilter<"DiscoverySource"> | number;
    selectors?: Prisma.JsonNullableFilter<"DiscoverySource">;
    feedUrl?: Prisma.StringNullableFilter<"DiscoverySource"> | string | null;
    apiEndpoint?: Prisma.StringNullableFilter<"DiscoverySource"> | string | null;
    lastCrawledAt?: Prisma.DateTimeNullableFilter<"DiscoverySource"> | Date | string | null;
    lastSuccessAt?: Prisma.DateTimeNullableFilter<"DiscoverySource"> | Date | string | null;
    lastError?: Prisma.StringNullableFilter<"DiscoverySource"> | string | null;
    consecutiveErrors?: Prisma.IntFilter<"DiscoverySource"> | number;
    isActive?: Prisma.BoolFilter<"DiscoverySource"> | boolean;
    discoveriesCount?: Prisma.IntFilter<"DiscoverySource"> | number;
    validatedCount?: Prisma.IntFilter<"DiscoverySource"> | number;
    hitRate?: Prisma.FloatNullableFilter<"DiscoverySource"> | number | null;
    avgNoveltyScore?: Prisma.FloatNullableFilter<"DiscoverySource"> | number | null;
    description?: Prisma.StringNullableFilter<"DiscoverySource"> | string | null;
    tags?: Prisma.StringNullableListFilter<"DiscoverySource">;
    priority?: Prisma.IntFilter<"DiscoverySource"> | number;
    createdAt?: Prisma.DateTimeFilter<"DiscoverySource"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DiscoverySource"> | Date | string;
    discoveries?: Prisma.RawDiscoveryListRelationFilter;
}, "id" | "name">;
export type DiscoverySourceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    crawlStrategy?: Prisma.SortOrder;
    crawlFrequency?: Prisma.SortOrder;
    crawlDepth?: Prisma.SortOrder;
    selectors?: Prisma.SortOrderInput | Prisma.SortOrder;
    feedUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    apiEndpoint?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastCrawledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSuccessAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastError?: Prisma.SortOrderInput | Prisma.SortOrder;
    consecutiveErrors?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    discoveriesCount?: Prisma.SortOrder;
    validatedCount?: Prisma.SortOrder;
    hitRate?: Prisma.SortOrderInput | Prisma.SortOrder;
    avgNoveltyScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DiscoverySourceCountOrderByAggregateInput;
    _avg?: Prisma.DiscoverySourceAvgOrderByAggregateInput;
    _max?: Prisma.DiscoverySourceMaxOrderByAggregateInput;
    _min?: Prisma.DiscoverySourceMinOrderByAggregateInput;
    _sum?: Prisma.DiscoverySourceSumOrderByAggregateInput;
};
export type DiscoverySourceScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiscoverySourceScalarWhereWithAggregatesInput | Prisma.DiscoverySourceScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiscoverySourceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiscoverySourceScalarWhereWithAggregatesInput | Prisma.DiscoverySourceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DiscoverySource"> | string;
    name?: Prisma.StringWithAggregatesFilter<"DiscoverySource"> | string;
    url?: Prisma.StringWithAggregatesFilter<"DiscoverySource"> | string;
    sourceType?: Prisma.EnumSourceTypeWithAggregatesFilter<"DiscoverySource"> | $Enums.SourceType;
    category?: Prisma.StringWithAggregatesFilter<"DiscoverySource"> | string;
    crawlStrategy?: Prisma.StringWithAggregatesFilter<"DiscoverySource"> | string;
    crawlFrequency?: Prisma.StringWithAggregatesFilter<"DiscoverySource"> | string;
    crawlDepth?: Prisma.IntWithAggregatesFilter<"DiscoverySource"> | number;
    selectors?: Prisma.JsonNullableWithAggregatesFilter<"DiscoverySource">;
    feedUrl?: Prisma.StringNullableWithAggregatesFilter<"DiscoverySource"> | string | null;
    apiEndpoint?: Prisma.StringNullableWithAggregatesFilter<"DiscoverySource"> | string | null;
    lastCrawledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"DiscoverySource"> | Date | string | null;
    lastSuccessAt?: Prisma.DateTimeNullableWithAggregatesFilter<"DiscoverySource"> | Date | string | null;
    lastError?: Prisma.StringNullableWithAggregatesFilter<"DiscoverySource"> | string | null;
    consecutiveErrors?: Prisma.IntWithAggregatesFilter<"DiscoverySource"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"DiscoverySource"> | boolean;
    discoveriesCount?: Prisma.IntWithAggregatesFilter<"DiscoverySource"> | number;
    validatedCount?: Prisma.IntWithAggregatesFilter<"DiscoverySource"> | number;
    hitRate?: Prisma.FloatNullableWithAggregatesFilter<"DiscoverySource"> | number | null;
    avgNoveltyScore?: Prisma.FloatNullableWithAggregatesFilter<"DiscoverySource"> | number | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"DiscoverySource"> | string | null;
    tags?: Prisma.StringNullableListFilter<"DiscoverySource">;
    priority?: Prisma.IntWithAggregatesFilter<"DiscoverySource"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DiscoverySource"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DiscoverySource"> | Date | string;
};
export type DiscoverySourceCreateInput = {
    id?: string;
    name: string;
    url: string;
    sourceType: $Enums.SourceType;
    category: string;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth?: number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: string | null;
    apiEndpoint?: string | null;
    lastCrawledAt?: Date | string | null;
    lastSuccessAt?: Date | string | null;
    lastError?: string | null;
    consecutiveErrors?: number;
    isActive?: boolean;
    discoveriesCount?: number;
    validatedCount?: number;
    hitRate?: number | null;
    avgNoveltyScore?: number | null;
    description?: string | null;
    tags?: Prisma.DiscoverySourceCreatetagsInput | string[];
    priority?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveries?: Prisma.RawDiscoveryCreateNestedManyWithoutSourceInput;
};
export type DiscoverySourceUncheckedCreateInput = {
    id?: string;
    name: string;
    url: string;
    sourceType: $Enums.SourceType;
    category: string;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth?: number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: string | null;
    apiEndpoint?: string | null;
    lastCrawledAt?: Date | string | null;
    lastSuccessAt?: Date | string | null;
    lastError?: string | null;
    consecutiveErrors?: number;
    isActive?: boolean;
    discoveriesCount?: number;
    validatedCount?: number;
    hitRate?: number | null;
    avgNoveltyScore?: number | null;
    description?: string | null;
    tags?: Prisma.DiscoverySourceCreatetagsInput | string[];
    priority?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveries?: Prisma.RawDiscoveryUncheckedCreateNestedManyWithoutSourceInput;
};
export type DiscoverySourceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlStrategy?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlFrequency?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlDepth?: Prisma.IntFieldUpdateOperationsInput | number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    apiEndpoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCrawledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSuccessAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecutiveErrors?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    discoveriesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    validatedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    hitRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    avgNoveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tags?: Prisma.DiscoverySourceUpdatetagsInput | string[];
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveries?: Prisma.RawDiscoveryUpdateManyWithoutSourceNestedInput;
};
export type DiscoverySourceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlStrategy?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlFrequency?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlDepth?: Prisma.IntFieldUpdateOperationsInput | number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    apiEndpoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCrawledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSuccessAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecutiveErrors?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    discoveriesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    validatedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    hitRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    avgNoveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tags?: Prisma.DiscoverySourceUpdatetagsInput | string[];
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveries?: Prisma.RawDiscoveryUncheckedUpdateManyWithoutSourceNestedInput;
};
export type DiscoverySourceCreateManyInput = {
    id?: string;
    name: string;
    url: string;
    sourceType: $Enums.SourceType;
    category: string;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth?: number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: string | null;
    apiEndpoint?: string | null;
    lastCrawledAt?: Date | string | null;
    lastSuccessAt?: Date | string | null;
    lastError?: string | null;
    consecutiveErrors?: number;
    isActive?: boolean;
    discoveriesCount?: number;
    validatedCount?: number;
    hitRate?: number | null;
    avgNoveltyScore?: number | null;
    description?: string | null;
    tags?: Prisma.DiscoverySourceCreatetagsInput | string[];
    priority?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiscoverySourceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlStrategy?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlFrequency?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlDepth?: Prisma.IntFieldUpdateOperationsInput | number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    apiEndpoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCrawledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSuccessAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecutiveErrors?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    discoveriesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    validatedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    hitRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    avgNoveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tags?: Prisma.DiscoverySourceUpdatetagsInput | string[];
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscoverySourceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlStrategy?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlFrequency?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlDepth?: Prisma.IntFieldUpdateOperationsInput | number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    apiEndpoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCrawledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSuccessAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecutiveErrors?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    discoveriesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    validatedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    hitRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    avgNoveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tags?: Prisma.DiscoverySourceUpdatetagsInput | string[];
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscoverySourceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    crawlStrategy?: Prisma.SortOrder;
    crawlFrequency?: Prisma.SortOrder;
    crawlDepth?: Prisma.SortOrder;
    selectors?: Prisma.SortOrder;
    feedUrl?: Prisma.SortOrder;
    apiEndpoint?: Prisma.SortOrder;
    lastCrawledAt?: Prisma.SortOrder;
    lastSuccessAt?: Prisma.SortOrder;
    lastError?: Prisma.SortOrder;
    consecutiveErrors?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    discoveriesCount?: Prisma.SortOrder;
    validatedCount?: Prisma.SortOrder;
    hitRate?: Prisma.SortOrder;
    avgNoveltyScore?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiscoverySourceAvgOrderByAggregateInput = {
    crawlDepth?: Prisma.SortOrder;
    consecutiveErrors?: Prisma.SortOrder;
    discoveriesCount?: Prisma.SortOrder;
    validatedCount?: Prisma.SortOrder;
    hitRate?: Prisma.SortOrder;
    avgNoveltyScore?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
};
export type DiscoverySourceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    crawlStrategy?: Prisma.SortOrder;
    crawlFrequency?: Prisma.SortOrder;
    crawlDepth?: Prisma.SortOrder;
    feedUrl?: Prisma.SortOrder;
    apiEndpoint?: Prisma.SortOrder;
    lastCrawledAt?: Prisma.SortOrder;
    lastSuccessAt?: Prisma.SortOrder;
    lastError?: Prisma.SortOrder;
    consecutiveErrors?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    discoveriesCount?: Prisma.SortOrder;
    validatedCount?: Prisma.SortOrder;
    hitRate?: Prisma.SortOrder;
    avgNoveltyScore?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiscoverySourceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    sourceType?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    crawlStrategy?: Prisma.SortOrder;
    crawlFrequency?: Prisma.SortOrder;
    crawlDepth?: Prisma.SortOrder;
    feedUrl?: Prisma.SortOrder;
    apiEndpoint?: Prisma.SortOrder;
    lastCrawledAt?: Prisma.SortOrder;
    lastSuccessAt?: Prisma.SortOrder;
    lastError?: Prisma.SortOrder;
    consecutiveErrors?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    discoveriesCount?: Prisma.SortOrder;
    validatedCount?: Prisma.SortOrder;
    hitRate?: Prisma.SortOrder;
    avgNoveltyScore?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiscoverySourceSumOrderByAggregateInput = {
    crawlDepth?: Prisma.SortOrder;
    consecutiveErrors?: Prisma.SortOrder;
    discoveriesCount?: Prisma.SortOrder;
    validatedCount?: Prisma.SortOrder;
    hitRate?: Prisma.SortOrder;
    avgNoveltyScore?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
};
export type DiscoverySourceScalarRelationFilter = {
    is?: Prisma.DiscoverySourceWhereInput;
    isNot?: Prisma.DiscoverySourceWhereInput;
};
export type DiscoverySourceCreatetagsInput = {
    set: string[];
};
export type EnumSourceTypeFieldUpdateOperationsInput = {
    set?: $Enums.SourceType;
};
export type DiscoverySourceUpdatetagsInput = {
    set?: string[];
    push?: string | string[];
};
export type DiscoverySourceCreateNestedOneWithoutDiscoveriesInput = {
    create?: Prisma.XOR<Prisma.DiscoverySourceCreateWithoutDiscoveriesInput, Prisma.DiscoverySourceUncheckedCreateWithoutDiscoveriesInput>;
    connectOrCreate?: Prisma.DiscoverySourceCreateOrConnectWithoutDiscoveriesInput;
    connect?: Prisma.DiscoverySourceWhereUniqueInput;
};
export type DiscoverySourceUpdateOneRequiredWithoutDiscoveriesNestedInput = {
    create?: Prisma.XOR<Prisma.DiscoverySourceCreateWithoutDiscoveriesInput, Prisma.DiscoverySourceUncheckedCreateWithoutDiscoveriesInput>;
    connectOrCreate?: Prisma.DiscoverySourceCreateOrConnectWithoutDiscoveriesInput;
    upsert?: Prisma.DiscoverySourceUpsertWithoutDiscoveriesInput;
    connect?: Prisma.DiscoverySourceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DiscoverySourceUpdateToOneWithWhereWithoutDiscoveriesInput, Prisma.DiscoverySourceUpdateWithoutDiscoveriesInput>, Prisma.DiscoverySourceUncheckedUpdateWithoutDiscoveriesInput>;
};
export type DiscoverySourceCreateWithoutDiscoveriesInput = {
    id?: string;
    name: string;
    url: string;
    sourceType: $Enums.SourceType;
    category: string;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth?: number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: string | null;
    apiEndpoint?: string | null;
    lastCrawledAt?: Date | string | null;
    lastSuccessAt?: Date | string | null;
    lastError?: string | null;
    consecutiveErrors?: number;
    isActive?: boolean;
    discoveriesCount?: number;
    validatedCount?: number;
    hitRate?: number | null;
    avgNoveltyScore?: number | null;
    description?: string | null;
    tags?: Prisma.DiscoverySourceCreatetagsInput | string[];
    priority?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiscoverySourceUncheckedCreateWithoutDiscoveriesInput = {
    id?: string;
    name: string;
    url: string;
    sourceType: $Enums.SourceType;
    category: string;
    crawlStrategy: string;
    crawlFrequency: string;
    crawlDepth?: number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: string | null;
    apiEndpoint?: string | null;
    lastCrawledAt?: Date | string | null;
    lastSuccessAt?: Date | string | null;
    lastError?: string | null;
    consecutiveErrors?: number;
    isActive?: boolean;
    discoveriesCount?: number;
    validatedCount?: number;
    hitRate?: number | null;
    avgNoveltyScore?: number | null;
    description?: string | null;
    tags?: Prisma.DiscoverySourceCreatetagsInput | string[];
    priority?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiscoverySourceCreateOrConnectWithoutDiscoveriesInput = {
    where: Prisma.DiscoverySourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiscoverySourceCreateWithoutDiscoveriesInput, Prisma.DiscoverySourceUncheckedCreateWithoutDiscoveriesInput>;
};
export type DiscoverySourceUpsertWithoutDiscoveriesInput = {
    update: Prisma.XOR<Prisma.DiscoverySourceUpdateWithoutDiscoveriesInput, Prisma.DiscoverySourceUncheckedUpdateWithoutDiscoveriesInput>;
    create: Prisma.XOR<Prisma.DiscoverySourceCreateWithoutDiscoveriesInput, Prisma.DiscoverySourceUncheckedCreateWithoutDiscoveriesInput>;
    where?: Prisma.DiscoverySourceWhereInput;
};
export type DiscoverySourceUpdateToOneWithWhereWithoutDiscoveriesInput = {
    where?: Prisma.DiscoverySourceWhereInput;
    data: Prisma.XOR<Prisma.DiscoverySourceUpdateWithoutDiscoveriesInput, Prisma.DiscoverySourceUncheckedUpdateWithoutDiscoveriesInput>;
};
export type DiscoverySourceUpdateWithoutDiscoveriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlStrategy?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlFrequency?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlDepth?: Prisma.IntFieldUpdateOperationsInput | number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    apiEndpoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCrawledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSuccessAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecutiveErrors?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    discoveriesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    validatedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    hitRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    avgNoveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tags?: Prisma.DiscoverySourceUpdatetagsInput | string[];
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscoverySourceUncheckedUpdateWithoutDiscoveriesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceType?: Prisma.EnumSourceTypeFieldUpdateOperationsInput | $Enums.SourceType;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlStrategy?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlFrequency?: Prisma.StringFieldUpdateOperationsInput | string;
    crawlDepth?: Prisma.IntFieldUpdateOperationsInput | number;
    selectors?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    feedUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    apiEndpoint?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastCrawledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastSuccessAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastError?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    consecutiveErrors?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    discoveriesCount?: Prisma.IntFieldUpdateOperationsInput | number;
    validatedCount?: Prisma.IntFieldUpdateOperationsInput | number;
    hitRate?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    avgNoveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tags?: Prisma.DiscoverySourceUpdatetagsInput | string[];
    priority?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type DiscoverySourceCountOutputType
 */
export type DiscoverySourceCountOutputType = {
    discoveries: number;
};
export type DiscoverySourceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    discoveries?: boolean | DiscoverySourceCountOutputTypeCountDiscoveriesArgs;
};
/**
 * DiscoverySourceCountOutputType without action
 */
export type DiscoverySourceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySourceCountOutputType
     */
    select?: Prisma.DiscoverySourceCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * DiscoverySourceCountOutputType without action
 */
export type DiscoverySourceCountOutputTypeCountDiscoveriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RawDiscoveryWhereInput;
};
export type DiscoverySourceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    url?: boolean;
    sourceType?: boolean;
    category?: boolean;
    crawlStrategy?: boolean;
    crawlFrequency?: boolean;
    crawlDepth?: boolean;
    selectors?: boolean;
    feedUrl?: boolean;
    apiEndpoint?: boolean;
    lastCrawledAt?: boolean;
    lastSuccessAt?: boolean;
    lastError?: boolean;
    consecutiveErrors?: boolean;
    isActive?: boolean;
    discoveriesCount?: boolean;
    validatedCount?: boolean;
    hitRate?: boolean;
    avgNoveltyScore?: boolean;
    description?: boolean;
    tags?: boolean;
    priority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    discoveries?: boolean | Prisma.DiscoverySource$discoveriesArgs<ExtArgs>;
    _count?: boolean | Prisma.DiscoverySourceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["discoverySource"]>;
export type DiscoverySourceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    url?: boolean;
    sourceType?: boolean;
    category?: boolean;
    crawlStrategy?: boolean;
    crawlFrequency?: boolean;
    crawlDepth?: boolean;
    selectors?: boolean;
    feedUrl?: boolean;
    apiEndpoint?: boolean;
    lastCrawledAt?: boolean;
    lastSuccessAt?: boolean;
    lastError?: boolean;
    consecutiveErrors?: boolean;
    isActive?: boolean;
    discoveriesCount?: boolean;
    validatedCount?: boolean;
    hitRate?: boolean;
    avgNoveltyScore?: boolean;
    description?: boolean;
    tags?: boolean;
    priority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["discoverySource"]>;
export type DiscoverySourceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    url?: boolean;
    sourceType?: boolean;
    category?: boolean;
    crawlStrategy?: boolean;
    crawlFrequency?: boolean;
    crawlDepth?: boolean;
    selectors?: boolean;
    feedUrl?: boolean;
    apiEndpoint?: boolean;
    lastCrawledAt?: boolean;
    lastSuccessAt?: boolean;
    lastError?: boolean;
    consecutiveErrors?: boolean;
    isActive?: boolean;
    discoveriesCount?: boolean;
    validatedCount?: boolean;
    hitRate?: boolean;
    avgNoveltyScore?: boolean;
    description?: boolean;
    tags?: boolean;
    priority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["discoverySource"]>;
export type DiscoverySourceSelectScalar = {
    id?: boolean;
    name?: boolean;
    url?: boolean;
    sourceType?: boolean;
    category?: boolean;
    crawlStrategy?: boolean;
    crawlFrequency?: boolean;
    crawlDepth?: boolean;
    selectors?: boolean;
    feedUrl?: boolean;
    apiEndpoint?: boolean;
    lastCrawledAt?: boolean;
    lastSuccessAt?: boolean;
    lastError?: boolean;
    consecutiveErrors?: boolean;
    isActive?: boolean;
    discoveriesCount?: boolean;
    validatedCount?: boolean;
    hitRate?: boolean;
    avgNoveltyScore?: boolean;
    description?: boolean;
    tags?: boolean;
    priority?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DiscoverySourceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "url" | "sourceType" | "category" | "crawlStrategy" | "crawlFrequency" | "crawlDepth" | "selectors" | "feedUrl" | "apiEndpoint" | "lastCrawledAt" | "lastSuccessAt" | "lastError" | "consecutiveErrors" | "isActive" | "discoveriesCount" | "validatedCount" | "hitRate" | "avgNoveltyScore" | "description" | "tags" | "priority" | "createdAt" | "updatedAt", ExtArgs["result"]["discoverySource"]>;
export type DiscoverySourceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    discoveries?: boolean | Prisma.DiscoverySource$discoveriesArgs<ExtArgs>;
    _count?: boolean | Prisma.DiscoverySourceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DiscoverySourceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type DiscoverySourceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $DiscoverySourcePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DiscoverySource";
    objects: {
        discoveries: Prisma.$RawDiscoveryPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        url: string;
        sourceType: $Enums.SourceType;
        category: string;
        crawlStrategy: string;
        crawlFrequency: string;
        crawlDepth: number;
        selectors: runtime.JsonValue | null;
        feedUrl: string | null;
        apiEndpoint: string | null;
        lastCrawledAt: Date | null;
        lastSuccessAt: Date | null;
        lastError: string | null;
        consecutiveErrors: number;
        isActive: boolean;
        discoveriesCount: number;
        validatedCount: number;
        hitRate: number | null;
        avgNoveltyScore: number | null;
        description: string | null;
        tags: string[];
        priority: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["discoverySource"]>;
    composites: {};
};
export type DiscoverySourceGetPayload<S extends boolean | null | undefined | DiscoverySourceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload, S>;
export type DiscoverySourceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiscoverySourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiscoverySourceCountAggregateInputType | true;
};
export interface DiscoverySourceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DiscoverySource'];
        meta: {
            name: 'DiscoverySource';
        };
    };
    /**
     * Find zero or one DiscoverySource that matches the filter.
     * @param {DiscoverySourceFindUniqueArgs} args - Arguments to find a DiscoverySource
     * @example
     * // Get one DiscoverySource
     * const discoverySource = await prisma.discoverySource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscoverySourceFindUniqueArgs>(args: Prisma.SelectSubset<T, DiscoverySourceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiscoverySourceClient<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DiscoverySource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiscoverySourceFindUniqueOrThrowArgs} args - Arguments to find a DiscoverySource
     * @example
     * // Get one DiscoverySource
     * const discoverySource = await prisma.discoverySource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscoverySourceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiscoverySourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiscoverySourceClient<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DiscoverySource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverySourceFindFirstArgs} args - Arguments to find a DiscoverySource
     * @example
     * // Get one DiscoverySource
     * const discoverySource = await prisma.discoverySource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscoverySourceFindFirstArgs>(args?: Prisma.SelectSubset<T, DiscoverySourceFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiscoverySourceClient<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DiscoverySource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverySourceFindFirstOrThrowArgs} args - Arguments to find a DiscoverySource
     * @example
     * // Get one DiscoverySource
     * const discoverySource = await prisma.discoverySource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscoverySourceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiscoverySourceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiscoverySourceClient<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DiscoverySources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverySourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscoverySources
     * const discoverySources = await prisma.discoverySource.findMany()
     *
     * // Get first 10 DiscoverySources
     * const discoverySources = await prisma.discoverySource.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const discoverySourceWithIdOnly = await prisma.discoverySource.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DiscoverySourceFindManyArgs>(args?: Prisma.SelectSubset<T, DiscoverySourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DiscoverySource.
     * @param {DiscoverySourceCreateArgs} args - Arguments to create a DiscoverySource.
     * @example
     * // Create one DiscoverySource
     * const DiscoverySource = await prisma.discoverySource.create({
     *   data: {
     *     // ... data to create a DiscoverySource
     *   }
     * })
     *
     */
    create<T extends DiscoverySourceCreateArgs>(args: Prisma.SelectSubset<T, DiscoverySourceCreateArgs<ExtArgs>>): Prisma.Prisma__DiscoverySourceClient<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DiscoverySources.
     * @param {DiscoverySourceCreateManyArgs} args - Arguments to create many DiscoverySources.
     * @example
     * // Create many DiscoverySources
     * const discoverySource = await prisma.discoverySource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DiscoverySourceCreateManyArgs>(args?: Prisma.SelectSubset<T, DiscoverySourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DiscoverySources and returns the data saved in the database.
     * @param {DiscoverySourceCreateManyAndReturnArgs} args - Arguments to create many DiscoverySources.
     * @example
     * // Create many DiscoverySources
     * const discoverySource = await prisma.discoverySource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DiscoverySources and only return the `id`
     * const discoverySourceWithIdOnly = await prisma.discoverySource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DiscoverySourceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiscoverySourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DiscoverySource.
     * @param {DiscoverySourceDeleteArgs} args - Arguments to delete one DiscoverySource.
     * @example
     * // Delete one DiscoverySource
     * const DiscoverySource = await prisma.discoverySource.delete({
     *   where: {
     *     // ... filter to delete one DiscoverySource
     *   }
     * })
     *
     */
    delete<T extends DiscoverySourceDeleteArgs>(args: Prisma.SelectSubset<T, DiscoverySourceDeleteArgs<ExtArgs>>): Prisma.Prisma__DiscoverySourceClient<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DiscoverySource.
     * @param {DiscoverySourceUpdateArgs} args - Arguments to update one DiscoverySource.
     * @example
     * // Update one DiscoverySource
     * const discoverySource = await prisma.discoverySource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DiscoverySourceUpdateArgs>(args: Prisma.SelectSubset<T, DiscoverySourceUpdateArgs<ExtArgs>>): Prisma.Prisma__DiscoverySourceClient<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DiscoverySources.
     * @param {DiscoverySourceDeleteManyArgs} args - Arguments to filter DiscoverySources to delete.
     * @example
     * // Delete a few DiscoverySources
     * const { count } = await prisma.discoverySource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DiscoverySourceDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiscoverySourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DiscoverySources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverySourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscoverySources
     * const discoverySource = await prisma.discoverySource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DiscoverySourceUpdateManyArgs>(args: Prisma.SelectSubset<T, DiscoverySourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DiscoverySources and returns the data updated in the database.
     * @param {DiscoverySourceUpdateManyAndReturnArgs} args - Arguments to update many DiscoverySources.
     * @example
     * // Update many DiscoverySources
     * const discoverySource = await prisma.discoverySource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DiscoverySources and only return the `id`
     * const discoverySourceWithIdOnly = await prisma.discoverySource.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends DiscoverySourceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiscoverySourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DiscoverySource.
     * @param {DiscoverySourceUpsertArgs} args - Arguments to update or create a DiscoverySource.
     * @example
     * // Update or create a DiscoverySource
     * const discoverySource = await prisma.discoverySource.upsert({
     *   create: {
     *     // ... data to create a DiscoverySource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscoverySource we want to update
     *   }
     * })
     */
    upsert<T extends DiscoverySourceUpsertArgs>(args: Prisma.SelectSubset<T, DiscoverySourceUpsertArgs<ExtArgs>>): Prisma.Prisma__DiscoverySourceClient<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DiscoverySources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverySourceCountArgs} args - Arguments to filter DiscoverySources to count.
     * @example
     * // Count the number of DiscoverySources
     * const count = await prisma.discoverySource.count({
     *   where: {
     *     // ... the filter for the DiscoverySources we want to count
     *   }
     * })
    **/
    count<T extends DiscoverySourceCountArgs>(args?: Prisma.Subset<T, DiscoverySourceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiscoverySourceCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DiscoverySource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverySourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiscoverySourceAggregateArgs>(args: Prisma.Subset<T, DiscoverySourceAggregateArgs>): Prisma.PrismaPromise<GetDiscoverySourceAggregateType<T>>;
    /**
     * Group by DiscoverySource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverySourceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends DiscoverySourceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiscoverySourceGroupByArgs['orderBy'];
    } : {
        orderBy?: DiscoverySourceGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiscoverySourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscoverySourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DiscoverySource model
     */
    readonly fields: DiscoverySourceFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DiscoverySource.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DiscoverySourceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    discoveries<T extends Prisma.DiscoverySource$discoveriesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiscoverySource$discoveriesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the DiscoverySource model
 */
export interface DiscoverySourceFieldRefs {
    readonly id: Prisma.FieldRef<"DiscoverySource", 'String'>;
    readonly name: Prisma.FieldRef<"DiscoverySource", 'String'>;
    readonly url: Prisma.FieldRef<"DiscoverySource", 'String'>;
    readonly sourceType: Prisma.FieldRef<"DiscoverySource", 'SourceType'>;
    readonly category: Prisma.FieldRef<"DiscoverySource", 'String'>;
    readonly crawlStrategy: Prisma.FieldRef<"DiscoverySource", 'String'>;
    readonly crawlFrequency: Prisma.FieldRef<"DiscoverySource", 'String'>;
    readonly crawlDepth: Prisma.FieldRef<"DiscoverySource", 'Int'>;
    readonly selectors: Prisma.FieldRef<"DiscoverySource", 'Json'>;
    readonly feedUrl: Prisma.FieldRef<"DiscoverySource", 'String'>;
    readonly apiEndpoint: Prisma.FieldRef<"DiscoverySource", 'String'>;
    readonly lastCrawledAt: Prisma.FieldRef<"DiscoverySource", 'DateTime'>;
    readonly lastSuccessAt: Prisma.FieldRef<"DiscoverySource", 'DateTime'>;
    readonly lastError: Prisma.FieldRef<"DiscoverySource", 'String'>;
    readonly consecutiveErrors: Prisma.FieldRef<"DiscoverySource", 'Int'>;
    readonly isActive: Prisma.FieldRef<"DiscoverySource", 'Boolean'>;
    readonly discoveriesCount: Prisma.FieldRef<"DiscoverySource", 'Int'>;
    readonly validatedCount: Prisma.FieldRef<"DiscoverySource", 'Int'>;
    readonly hitRate: Prisma.FieldRef<"DiscoverySource", 'Float'>;
    readonly avgNoveltyScore: Prisma.FieldRef<"DiscoverySource", 'Float'>;
    readonly description: Prisma.FieldRef<"DiscoverySource", 'String'>;
    readonly tags: Prisma.FieldRef<"DiscoverySource", 'String[]'>;
    readonly priority: Prisma.FieldRef<"DiscoverySource", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"DiscoverySource", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DiscoverySource", 'DateTime'>;
}
/**
 * DiscoverySource findUnique
 */
export type DiscoverySourceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoverySourceInclude<ExtArgs> | null;
    /**
     * Filter, which DiscoverySource to fetch.
     */
    where: Prisma.DiscoverySourceWhereUniqueInput;
};
/**
 * DiscoverySource findUniqueOrThrow
 */
export type DiscoverySourceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoverySourceInclude<ExtArgs> | null;
    /**
     * Filter, which DiscoverySource to fetch.
     */
    where: Prisma.DiscoverySourceWhereUniqueInput;
};
/**
 * DiscoverySource findFirst
 */
export type DiscoverySourceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoverySourceInclude<ExtArgs> | null;
    /**
     * Filter, which DiscoverySource to fetch.
     */
    where?: Prisma.DiscoverySourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoverySources to fetch.
     */
    orderBy?: Prisma.DiscoverySourceOrderByWithRelationInput | Prisma.DiscoverySourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DiscoverySources.
     */
    cursor?: Prisma.DiscoverySourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoverySources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoverySources.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DiscoverySources.
     */
    distinct?: Prisma.DiscoverySourceScalarFieldEnum | Prisma.DiscoverySourceScalarFieldEnum[];
};
/**
 * DiscoverySource findFirstOrThrow
 */
export type DiscoverySourceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoverySourceInclude<ExtArgs> | null;
    /**
     * Filter, which DiscoverySource to fetch.
     */
    where?: Prisma.DiscoverySourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoverySources to fetch.
     */
    orderBy?: Prisma.DiscoverySourceOrderByWithRelationInput | Prisma.DiscoverySourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DiscoverySources.
     */
    cursor?: Prisma.DiscoverySourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoverySources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoverySources.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DiscoverySources.
     */
    distinct?: Prisma.DiscoverySourceScalarFieldEnum | Prisma.DiscoverySourceScalarFieldEnum[];
};
/**
 * DiscoverySource findMany
 */
export type DiscoverySourceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoverySourceInclude<ExtArgs> | null;
    /**
     * Filter, which DiscoverySources to fetch.
     */
    where?: Prisma.DiscoverySourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoverySources to fetch.
     */
    orderBy?: Prisma.DiscoverySourceOrderByWithRelationInput | Prisma.DiscoverySourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DiscoverySources.
     */
    cursor?: Prisma.DiscoverySourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoverySources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoverySources.
     */
    skip?: number;
    distinct?: Prisma.DiscoverySourceScalarFieldEnum | Prisma.DiscoverySourceScalarFieldEnum[];
};
/**
 * DiscoverySource create
 */
export type DiscoverySourceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoverySourceInclude<ExtArgs> | null;
    /**
     * The data needed to create a DiscoverySource.
     */
    data: Prisma.XOR<Prisma.DiscoverySourceCreateInput, Prisma.DiscoverySourceUncheckedCreateInput>;
};
/**
 * DiscoverySource createMany
 */
export type DiscoverySourceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiscoverySources.
     */
    data: Prisma.DiscoverySourceCreateManyInput | Prisma.DiscoverySourceCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DiscoverySource createManyAndReturn
 */
export type DiscoverySourceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * The data used to create many DiscoverySources.
     */
    data: Prisma.DiscoverySourceCreateManyInput | Prisma.DiscoverySourceCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DiscoverySource update
 */
export type DiscoverySourceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoverySourceInclude<ExtArgs> | null;
    /**
     * The data needed to update a DiscoverySource.
     */
    data: Prisma.XOR<Prisma.DiscoverySourceUpdateInput, Prisma.DiscoverySourceUncheckedUpdateInput>;
    /**
     * Choose, which DiscoverySource to update.
     */
    where: Prisma.DiscoverySourceWhereUniqueInput;
};
/**
 * DiscoverySource updateMany
 */
export type DiscoverySourceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DiscoverySources.
     */
    data: Prisma.XOR<Prisma.DiscoverySourceUpdateManyMutationInput, Prisma.DiscoverySourceUncheckedUpdateManyInput>;
    /**
     * Filter which DiscoverySources to update
     */
    where?: Prisma.DiscoverySourceWhereInput;
    /**
     * Limit how many DiscoverySources to update.
     */
    limit?: number;
};
/**
 * DiscoverySource updateManyAndReturn
 */
export type DiscoverySourceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * The data used to update DiscoverySources.
     */
    data: Prisma.XOR<Prisma.DiscoverySourceUpdateManyMutationInput, Prisma.DiscoverySourceUncheckedUpdateManyInput>;
    /**
     * Filter which DiscoverySources to update
     */
    where?: Prisma.DiscoverySourceWhereInput;
    /**
     * Limit how many DiscoverySources to update.
     */
    limit?: number;
};
/**
 * DiscoverySource upsert
 */
export type DiscoverySourceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoverySourceInclude<ExtArgs> | null;
    /**
     * The filter to search for the DiscoverySource to update in case it exists.
     */
    where: Prisma.DiscoverySourceWhereUniqueInput;
    /**
     * In case the DiscoverySource found by the `where` argument doesn't exist, create a new DiscoverySource with this data.
     */
    create: Prisma.XOR<Prisma.DiscoverySourceCreateInput, Prisma.DiscoverySourceUncheckedCreateInput>;
    /**
     * In case the DiscoverySource was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DiscoverySourceUpdateInput, Prisma.DiscoverySourceUncheckedUpdateInput>;
};
/**
 * DiscoverySource delete
 */
export type DiscoverySourceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoverySourceInclude<ExtArgs> | null;
    /**
     * Filter which DiscoverySource to delete.
     */
    where: Prisma.DiscoverySourceWhereUniqueInput;
};
/**
 * DiscoverySource deleteMany
 */
export type DiscoverySourceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DiscoverySources to delete
     */
    where?: Prisma.DiscoverySourceWhereInput;
    /**
     * Limit how many DiscoverySources to delete.
     */
    limit?: number;
};
/**
 * DiscoverySource.discoveries
 */
export type DiscoverySource$discoveriesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawDiscovery
     */
    select?: Prisma.RawDiscoverySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RawDiscovery
     */
    omit?: Prisma.RawDiscoveryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RawDiscoveryInclude<ExtArgs> | null;
    where?: Prisma.RawDiscoveryWhereInput;
    orderBy?: Prisma.RawDiscoveryOrderByWithRelationInput | Prisma.RawDiscoveryOrderByWithRelationInput[];
    cursor?: Prisma.RawDiscoveryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RawDiscoveryScalarFieldEnum | Prisma.RawDiscoveryScalarFieldEnum[];
};
/**
 * DiscoverySource without action
 */
export type DiscoverySourceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverySource
     */
    select?: Prisma.DiscoverySourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoverySource
     */
    omit?: Prisma.DiscoverySourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoverySourceInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DiscoverySource.d.ts.map