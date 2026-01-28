import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model RawDiscovery
 * A raw discovery from a source before deduplication
 */
export type RawDiscoveryModel = runtime.Types.Result.DefaultSelection<Prisma.$RawDiscoveryPayload>;
export type AggregateRawDiscovery = {
    _count: RawDiscoveryCountAggregateOutputType | null;
    _avg: RawDiscoveryAvgAggregateOutputType | null;
    _sum: RawDiscoverySumAggregateOutputType | null;
    _min: RawDiscoveryMinAggregateOutputType | null;
    _max: RawDiscoveryMaxAggregateOutputType | null;
};
export type RawDiscoveryAvgAggregateOutputType = {
    noveltyScore: number | null;
    relevanceScore: number | null;
};
export type RawDiscoverySumAggregateOutputType = {
    noveltyScore: number | null;
    relevanceScore: number | null;
};
export type RawDiscoveryMinAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    mentionedName: string | null;
    briefDescription: string | null;
    discoveryUrl: string | null;
    contextSnippet: string | null;
    releaseVersion: string | null;
    releaseDate: Date | null;
    discoveredAt: Date | null;
    crawlSessionId: string | null;
    processed: boolean | null;
    matchedEntityId: string | null;
    createdEntityId: string | null;
    noveltyScore: number | null;
    relevanceScore: number | null;
};
export type RawDiscoveryMaxAggregateOutputType = {
    id: string | null;
    sourceId: string | null;
    mentionedName: string | null;
    briefDescription: string | null;
    discoveryUrl: string | null;
    contextSnippet: string | null;
    releaseVersion: string | null;
    releaseDate: Date | null;
    discoveredAt: Date | null;
    crawlSessionId: string | null;
    processed: boolean | null;
    matchedEntityId: string | null;
    createdEntityId: string | null;
    noveltyScore: number | null;
    relevanceScore: number | null;
};
export type RawDiscoveryCountAggregateOutputType = {
    id: number;
    sourceId: number;
    mentionedName: number;
    briefDescription: number;
    discoveryUrl: number;
    contextSnippet: number;
    extractedLinks: number;
    releaseVersion: number;
    releaseDate: number;
    keywords: number;
    discoveredAt: number;
    crawlSessionId: number;
    processed: number;
    matchedEntityId: number;
    createdEntityId: number;
    noveltyScore: number;
    relevanceScore: number;
    _all: number;
};
export type RawDiscoveryAvgAggregateInputType = {
    noveltyScore?: true;
    relevanceScore?: true;
};
export type RawDiscoverySumAggregateInputType = {
    noveltyScore?: true;
    relevanceScore?: true;
};
export type RawDiscoveryMinAggregateInputType = {
    id?: true;
    sourceId?: true;
    mentionedName?: true;
    briefDescription?: true;
    discoveryUrl?: true;
    contextSnippet?: true;
    releaseVersion?: true;
    releaseDate?: true;
    discoveredAt?: true;
    crawlSessionId?: true;
    processed?: true;
    matchedEntityId?: true;
    createdEntityId?: true;
    noveltyScore?: true;
    relevanceScore?: true;
};
export type RawDiscoveryMaxAggregateInputType = {
    id?: true;
    sourceId?: true;
    mentionedName?: true;
    briefDescription?: true;
    discoveryUrl?: true;
    contextSnippet?: true;
    releaseVersion?: true;
    releaseDate?: true;
    discoveredAt?: true;
    crawlSessionId?: true;
    processed?: true;
    matchedEntityId?: true;
    createdEntityId?: true;
    noveltyScore?: true;
    relevanceScore?: true;
};
export type RawDiscoveryCountAggregateInputType = {
    id?: true;
    sourceId?: true;
    mentionedName?: true;
    briefDescription?: true;
    discoveryUrl?: true;
    contextSnippet?: true;
    extractedLinks?: true;
    releaseVersion?: true;
    releaseDate?: true;
    keywords?: true;
    discoveredAt?: true;
    crawlSessionId?: true;
    processed?: true;
    matchedEntityId?: true;
    createdEntityId?: true;
    noveltyScore?: true;
    relevanceScore?: true;
    _all?: true;
};
export type RawDiscoveryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RawDiscovery to aggregate.
     */
    where?: Prisma.RawDiscoveryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RawDiscoveries to fetch.
     */
    orderBy?: Prisma.RawDiscoveryOrderByWithRelationInput | Prisma.RawDiscoveryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RawDiscoveryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RawDiscoveries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RawDiscoveries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RawDiscoveries
    **/
    _count?: true | RawDiscoveryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: RawDiscoveryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: RawDiscoverySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RawDiscoveryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RawDiscoveryMaxAggregateInputType;
};
export type GetRawDiscoveryAggregateType<T extends RawDiscoveryAggregateArgs> = {
    [P in keyof T & keyof AggregateRawDiscovery]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRawDiscovery[P]> : Prisma.GetScalarType<T[P], AggregateRawDiscovery[P]>;
};
export type RawDiscoveryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RawDiscoveryWhereInput;
    orderBy?: Prisma.RawDiscoveryOrderByWithAggregationInput | Prisma.RawDiscoveryOrderByWithAggregationInput[];
    by: Prisma.RawDiscoveryScalarFieldEnum[] | Prisma.RawDiscoveryScalarFieldEnum;
    having?: Prisma.RawDiscoveryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RawDiscoveryCountAggregateInputType | true;
    _avg?: RawDiscoveryAvgAggregateInputType;
    _sum?: RawDiscoverySumAggregateInputType;
    _min?: RawDiscoveryMinAggregateInputType;
    _max?: RawDiscoveryMaxAggregateInputType;
};
export type RawDiscoveryGroupByOutputType = {
    id: string;
    sourceId: string;
    mentionedName: string;
    briefDescription: string | null;
    discoveryUrl: string;
    contextSnippet: string | null;
    extractedLinks: string[];
    releaseVersion: string | null;
    releaseDate: Date | null;
    keywords: string[];
    discoveredAt: Date;
    crawlSessionId: string;
    processed: boolean;
    matchedEntityId: string | null;
    createdEntityId: string | null;
    noveltyScore: number | null;
    relevanceScore: number | null;
    _count: RawDiscoveryCountAggregateOutputType | null;
    _avg: RawDiscoveryAvgAggregateOutputType | null;
    _sum: RawDiscoverySumAggregateOutputType | null;
    _min: RawDiscoveryMinAggregateOutputType | null;
    _max: RawDiscoveryMaxAggregateOutputType | null;
};
type GetRawDiscoveryGroupByPayload<T extends RawDiscoveryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RawDiscoveryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RawDiscoveryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RawDiscoveryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RawDiscoveryGroupByOutputType[P]>;
}>>;
export type RawDiscoveryWhereInput = {
    AND?: Prisma.RawDiscoveryWhereInput | Prisma.RawDiscoveryWhereInput[];
    OR?: Prisma.RawDiscoveryWhereInput[];
    NOT?: Prisma.RawDiscoveryWhereInput | Prisma.RawDiscoveryWhereInput[];
    id?: Prisma.StringFilter<"RawDiscovery"> | string;
    sourceId?: Prisma.StringFilter<"RawDiscovery"> | string;
    mentionedName?: Prisma.StringFilter<"RawDiscovery"> | string;
    briefDescription?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    discoveryUrl?: Prisma.StringFilter<"RawDiscovery"> | string;
    contextSnippet?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    extractedLinks?: Prisma.StringNullableListFilter<"RawDiscovery">;
    releaseVersion?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    releaseDate?: Prisma.DateTimeNullableFilter<"RawDiscovery"> | Date | string | null;
    keywords?: Prisma.StringNullableListFilter<"RawDiscovery">;
    discoveredAt?: Prisma.DateTimeFilter<"RawDiscovery"> | Date | string;
    crawlSessionId?: Prisma.StringFilter<"RawDiscovery"> | string;
    processed?: Prisma.BoolFilter<"RawDiscovery"> | boolean;
    matchedEntityId?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    createdEntityId?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    noveltyScore?: Prisma.FloatNullableFilter<"RawDiscovery"> | number | null;
    relevanceScore?: Prisma.FloatNullableFilter<"RawDiscovery"> | number | null;
    source?: Prisma.XOR<Prisma.DiscoverySourceScalarRelationFilter, Prisma.DiscoverySourceWhereInput>;
};
export type RawDiscoveryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    mentionedName?: Prisma.SortOrder;
    briefDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    discoveryUrl?: Prisma.SortOrder;
    contextSnippet?: Prisma.SortOrderInput | Prisma.SortOrder;
    extractedLinks?: Prisma.SortOrder;
    releaseVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    releaseDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    keywords?: Prisma.SortOrder;
    discoveredAt?: Prisma.SortOrder;
    crawlSessionId?: Prisma.SortOrder;
    processed?: Prisma.SortOrder;
    matchedEntityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdEntityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    noveltyScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    relevanceScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    source?: Prisma.DiscoverySourceOrderByWithRelationInput;
};
export type RawDiscoveryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RawDiscoveryWhereInput | Prisma.RawDiscoveryWhereInput[];
    OR?: Prisma.RawDiscoveryWhereInput[];
    NOT?: Prisma.RawDiscoveryWhereInput | Prisma.RawDiscoveryWhereInput[];
    sourceId?: Prisma.StringFilter<"RawDiscovery"> | string;
    mentionedName?: Prisma.StringFilter<"RawDiscovery"> | string;
    briefDescription?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    discoveryUrl?: Prisma.StringFilter<"RawDiscovery"> | string;
    contextSnippet?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    extractedLinks?: Prisma.StringNullableListFilter<"RawDiscovery">;
    releaseVersion?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    releaseDate?: Prisma.DateTimeNullableFilter<"RawDiscovery"> | Date | string | null;
    keywords?: Prisma.StringNullableListFilter<"RawDiscovery">;
    discoveredAt?: Prisma.DateTimeFilter<"RawDiscovery"> | Date | string;
    crawlSessionId?: Prisma.StringFilter<"RawDiscovery"> | string;
    processed?: Prisma.BoolFilter<"RawDiscovery"> | boolean;
    matchedEntityId?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    createdEntityId?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    noveltyScore?: Prisma.FloatNullableFilter<"RawDiscovery"> | number | null;
    relevanceScore?: Prisma.FloatNullableFilter<"RawDiscovery"> | number | null;
    source?: Prisma.XOR<Prisma.DiscoverySourceScalarRelationFilter, Prisma.DiscoverySourceWhereInput>;
}, "id">;
export type RawDiscoveryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    mentionedName?: Prisma.SortOrder;
    briefDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    discoveryUrl?: Prisma.SortOrder;
    contextSnippet?: Prisma.SortOrderInput | Prisma.SortOrder;
    extractedLinks?: Prisma.SortOrder;
    releaseVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    releaseDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    keywords?: Prisma.SortOrder;
    discoveredAt?: Prisma.SortOrder;
    crawlSessionId?: Prisma.SortOrder;
    processed?: Prisma.SortOrder;
    matchedEntityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdEntityId?: Prisma.SortOrderInput | Prisma.SortOrder;
    noveltyScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    relevanceScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.RawDiscoveryCountOrderByAggregateInput;
    _avg?: Prisma.RawDiscoveryAvgOrderByAggregateInput;
    _max?: Prisma.RawDiscoveryMaxOrderByAggregateInput;
    _min?: Prisma.RawDiscoveryMinOrderByAggregateInput;
    _sum?: Prisma.RawDiscoverySumOrderByAggregateInput;
};
export type RawDiscoveryScalarWhereWithAggregatesInput = {
    AND?: Prisma.RawDiscoveryScalarWhereWithAggregatesInput | Prisma.RawDiscoveryScalarWhereWithAggregatesInput[];
    OR?: Prisma.RawDiscoveryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RawDiscoveryScalarWhereWithAggregatesInput | Prisma.RawDiscoveryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RawDiscovery"> | string;
    sourceId?: Prisma.StringWithAggregatesFilter<"RawDiscovery"> | string;
    mentionedName?: Prisma.StringWithAggregatesFilter<"RawDiscovery"> | string;
    briefDescription?: Prisma.StringNullableWithAggregatesFilter<"RawDiscovery"> | string | null;
    discoveryUrl?: Prisma.StringWithAggregatesFilter<"RawDiscovery"> | string;
    contextSnippet?: Prisma.StringNullableWithAggregatesFilter<"RawDiscovery"> | string | null;
    extractedLinks?: Prisma.StringNullableListFilter<"RawDiscovery">;
    releaseVersion?: Prisma.StringNullableWithAggregatesFilter<"RawDiscovery"> | string | null;
    releaseDate?: Prisma.DateTimeNullableWithAggregatesFilter<"RawDiscovery"> | Date | string | null;
    keywords?: Prisma.StringNullableListFilter<"RawDiscovery">;
    discoveredAt?: Prisma.DateTimeWithAggregatesFilter<"RawDiscovery"> | Date | string;
    crawlSessionId?: Prisma.StringWithAggregatesFilter<"RawDiscovery"> | string;
    processed?: Prisma.BoolWithAggregatesFilter<"RawDiscovery"> | boolean;
    matchedEntityId?: Prisma.StringNullableWithAggregatesFilter<"RawDiscovery"> | string | null;
    createdEntityId?: Prisma.StringNullableWithAggregatesFilter<"RawDiscovery"> | string | null;
    noveltyScore?: Prisma.FloatNullableWithAggregatesFilter<"RawDiscovery"> | number | null;
    relevanceScore?: Prisma.FloatNullableWithAggregatesFilter<"RawDiscovery"> | number | null;
};
export type RawDiscoveryCreateInput = {
    id?: string;
    mentionedName: string;
    briefDescription?: string | null;
    discoveryUrl: string;
    contextSnippet?: string | null;
    extractedLinks?: Prisma.RawDiscoveryCreateextractedLinksInput | string[];
    releaseVersion?: string | null;
    releaseDate?: Date | string | null;
    keywords?: Prisma.RawDiscoveryCreatekeywordsInput | string[];
    discoveredAt?: Date | string;
    crawlSessionId: string;
    processed?: boolean;
    matchedEntityId?: string | null;
    createdEntityId?: string | null;
    noveltyScore?: number | null;
    relevanceScore?: number | null;
    source: Prisma.DiscoverySourceCreateNestedOneWithoutDiscoveriesInput;
};
export type RawDiscoveryUncheckedCreateInput = {
    id?: string;
    sourceId: string;
    mentionedName: string;
    briefDescription?: string | null;
    discoveryUrl: string;
    contextSnippet?: string | null;
    extractedLinks?: Prisma.RawDiscoveryCreateextractedLinksInput | string[];
    releaseVersion?: string | null;
    releaseDate?: Date | string | null;
    keywords?: Prisma.RawDiscoveryCreatekeywordsInput | string[];
    discoveredAt?: Date | string;
    crawlSessionId: string;
    processed?: boolean;
    matchedEntityId?: string | null;
    createdEntityId?: string | null;
    noveltyScore?: number | null;
    relevanceScore?: number | null;
};
export type RawDiscoveryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    mentionedName?: Prisma.StringFieldUpdateOperationsInput | string;
    briefDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoveryUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    contextSnippet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    extractedLinks?: Prisma.RawDiscoveryUpdateextractedLinksInput | string[];
    releaseVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    keywords?: Prisma.RawDiscoveryUpdatekeywordsInput | string[];
    discoveredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crawlSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    matchedEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    relevanceScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    source?: Prisma.DiscoverySourceUpdateOneRequiredWithoutDiscoveriesNestedInput;
};
export type RawDiscoveryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    mentionedName?: Prisma.StringFieldUpdateOperationsInput | string;
    briefDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoveryUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    contextSnippet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    extractedLinks?: Prisma.RawDiscoveryUpdateextractedLinksInput | string[];
    releaseVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    keywords?: Prisma.RawDiscoveryUpdatekeywordsInput | string[];
    discoveredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crawlSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    matchedEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    relevanceScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type RawDiscoveryCreateManyInput = {
    id?: string;
    sourceId: string;
    mentionedName: string;
    briefDescription?: string | null;
    discoveryUrl: string;
    contextSnippet?: string | null;
    extractedLinks?: Prisma.RawDiscoveryCreateextractedLinksInput | string[];
    releaseVersion?: string | null;
    releaseDate?: Date | string | null;
    keywords?: Prisma.RawDiscoveryCreatekeywordsInput | string[];
    discoveredAt?: Date | string;
    crawlSessionId: string;
    processed?: boolean;
    matchedEntityId?: string | null;
    createdEntityId?: string | null;
    noveltyScore?: number | null;
    relevanceScore?: number | null;
};
export type RawDiscoveryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    mentionedName?: Prisma.StringFieldUpdateOperationsInput | string;
    briefDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoveryUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    contextSnippet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    extractedLinks?: Prisma.RawDiscoveryUpdateextractedLinksInput | string[];
    releaseVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    keywords?: Prisma.RawDiscoveryUpdatekeywordsInput | string[];
    discoveredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crawlSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    matchedEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    relevanceScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type RawDiscoveryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
    mentionedName?: Prisma.StringFieldUpdateOperationsInput | string;
    briefDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoveryUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    contextSnippet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    extractedLinks?: Prisma.RawDiscoveryUpdateextractedLinksInput | string[];
    releaseVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    keywords?: Prisma.RawDiscoveryUpdatekeywordsInput | string[];
    discoveredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crawlSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    matchedEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    relevanceScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type RawDiscoveryListRelationFilter = {
    every?: Prisma.RawDiscoveryWhereInput;
    some?: Prisma.RawDiscoveryWhereInput;
    none?: Prisma.RawDiscoveryWhereInput;
};
export type RawDiscoveryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RawDiscoveryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    mentionedName?: Prisma.SortOrder;
    briefDescription?: Prisma.SortOrder;
    discoveryUrl?: Prisma.SortOrder;
    contextSnippet?: Prisma.SortOrder;
    extractedLinks?: Prisma.SortOrder;
    releaseVersion?: Prisma.SortOrder;
    releaseDate?: Prisma.SortOrder;
    keywords?: Prisma.SortOrder;
    discoveredAt?: Prisma.SortOrder;
    crawlSessionId?: Prisma.SortOrder;
    processed?: Prisma.SortOrder;
    matchedEntityId?: Prisma.SortOrder;
    createdEntityId?: Prisma.SortOrder;
    noveltyScore?: Prisma.SortOrder;
    relevanceScore?: Prisma.SortOrder;
};
export type RawDiscoveryAvgOrderByAggregateInput = {
    noveltyScore?: Prisma.SortOrder;
    relevanceScore?: Prisma.SortOrder;
};
export type RawDiscoveryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    mentionedName?: Prisma.SortOrder;
    briefDescription?: Prisma.SortOrder;
    discoveryUrl?: Prisma.SortOrder;
    contextSnippet?: Prisma.SortOrder;
    releaseVersion?: Prisma.SortOrder;
    releaseDate?: Prisma.SortOrder;
    discoveredAt?: Prisma.SortOrder;
    crawlSessionId?: Prisma.SortOrder;
    processed?: Prisma.SortOrder;
    matchedEntityId?: Prisma.SortOrder;
    createdEntityId?: Prisma.SortOrder;
    noveltyScore?: Prisma.SortOrder;
    relevanceScore?: Prisma.SortOrder;
};
export type RawDiscoveryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    mentionedName?: Prisma.SortOrder;
    briefDescription?: Prisma.SortOrder;
    discoveryUrl?: Prisma.SortOrder;
    contextSnippet?: Prisma.SortOrder;
    releaseVersion?: Prisma.SortOrder;
    releaseDate?: Prisma.SortOrder;
    discoveredAt?: Prisma.SortOrder;
    crawlSessionId?: Prisma.SortOrder;
    processed?: Prisma.SortOrder;
    matchedEntityId?: Prisma.SortOrder;
    createdEntityId?: Prisma.SortOrder;
    noveltyScore?: Prisma.SortOrder;
    relevanceScore?: Prisma.SortOrder;
};
export type RawDiscoverySumOrderByAggregateInput = {
    noveltyScore?: Prisma.SortOrder;
    relevanceScore?: Prisma.SortOrder;
};
export type RawDiscoveryCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.RawDiscoveryCreateWithoutSourceInput, Prisma.RawDiscoveryUncheckedCreateWithoutSourceInput> | Prisma.RawDiscoveryCreateWithoutSourceInput[] | Prisma.RawDiscoveryUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.RawDiscoveryCreateOrConnectWithoutSourceInput | Prisma.RawDiscoveryCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.RawDiscoveryCreateManySourceInputEnvelope;
    connect?: Prisma.RawDiscoveryWhereUniqueInput | Prisma.RawDiscoveryWhereUniqueInput[];
};
export type RawDiscoveryUncheckedCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.RawDiscoveryCreateWithoutSourceInput, Prisma.RawDiscoveryUncheckedCreateWithoutSourceInput> | Prisma.RawDiscoveryCreateWithoutSourceInput[] | Prisma.RawDiscoveryUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.RawDiscoveryCreateOrConnectWithoutSourceInput | Prisma.RawDiscoveryCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.RawDiscoveryCreateManySourceInputEnvelope;
    connect?: Prisma.RawDiscoveryWhereUniqueInput | Prisma.RawDiscoveryWhereUniqueInput[];
};
export type RawDiscoveryUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.RawDiscoveryCreateWithoutSourceInput, Prisma.RawDiscoveryUncheckedCreateWithoutSourceInput> | Prisma.RawDiscoveryCreateWithoutSourceInput[] | Prisma.RawDiscoveryUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.RawDiscoveryCreateOrConnectWithoutSourceInput | Prisma.RawDiscoveryCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.RawDiscoveryUpsertWithWhereUniqueWithoutSourceInput | Prisma.RawDiscoveryUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.RawDiscoveryCreateManySourceInputEnvelope;
    set?: Prisma.RawDiscoveryWhereUniqueInput | Prisma.RawDiscoveryWhereUniqueInput[];
    disconnect?: Prisma.RawDiscoveryWhereUniqueInput | Prisma.RawDiscoveryWhereUniqueInput[];
    delete?: Prisma.RawDiscoveryWhereUniqueInput | Prisma.RawDiscoveryWhereUniqueInput[];
    connect?: Prisma.RawDiscoveryWhereUniqueInput | Prisma.RawDiscoveryWhereUniqueInput[];
    update?: Prisma.RawDiscoveryUpdateWithWhereUniqueWithoutSourceInput | Prisma.RawDiscoveryUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.RawDiscoveryUpdateManyWithWhereWithoutSourceInput | Prisma.RawDiscoveryUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.RawDiscoveryScalarWhereInput | Prisma.RawDiscoveryScalarWhereInput[];
};
export type RawDiscoveryUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.RawDiscoveryCreateWithoutSourceInput, Prisma.RawDiscoveryUncheckedCreateWithoutSourceInput> | Prisma.RawDiscoveryCreateWithoutSourceInput[] | Prisma.RawDiscoveryUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.RawDiscoveryCreateOrConnectWithoutSourceInput | Prisma.RawDiscoveryCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.RawDiscoveryUpsertWithWhereUniqueWithoutSourceInput | Prisma.RawDiscoveryUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.RawDiscoveryCreateManySourceInputEnvelope;
    set?: Prisma.RawDiscoveryWhereUniqueInput | Prisma.RawDiscoveryWhereUniqueInput[];
    disconnect?: Prisma.RawDiscoveryWhereUniqueInput | Prisma.RawDiscoveryWhereUniqueInput[];
    delete?: Prisma.RawDiscoveryWhereUniqueInput | Prisma.RawDiscoveryWhereUniqueInput[];
    connect?: Prisma.RawDiscoveryWhereUniqueInput | Prisma.RawDiscoveryWhereUniqueInput[];
    update?: Prisma.RawDiscoveryUpdateWithWhereUniqueWithoutSourceInput | Prisma.RawDiscoveryUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.RawDiscoveryUpdateManyWithWhereWithoutSourceInput | Prisma.RawDiscoveryUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.RawDiscoveryScalarWhereInput | Prisma.RawDiscoveryScalarWhereInput[];
};
export type RawDiscoveryCreateextractedLinksInput = {
    set: string[];
};
export type RawDiscoveryCreatekeywordsInput = {
    set: string[];
};
export type RawDiscoveryUpdateextractedLinksInput = {
    set?: string[];
    push?: string | string[];
};
export type RawDiscoveryUpdatekeywordsInput = {
    set?: string[];
    push?: string | string[];
};
export type RawDiscoveryCreateWithoutSourceInput = {
    id?: string;
    mentionedName: string;
    briefDescription?: string | null;
    discoveryUrl: string;
    contextSnippet?: string | null;
    extractedLinks?: Prisma.RawDiscoveryCreateextractedLinksInput | string[];
    releaseVersion?: string | null;
    releaseDate?: Date | string | null;
    keywords?: Prisma.RawDiscoveryCreatekeywordsInput | string[];
    discoveredAt?: Date | string;
    crawlSessionId: string;
    processed?: boolean;
    matchedEntityId?: string | null;
    createdEntityId?: string | null;
    noveltyScore?: number | null;
    relevanceScore?: number | null;
};
export type RawDiscoveryUncheckedCreateWithoutSourceInput = {
    id?: string;
    mentionedName: string;
    briefDescription?: string | null;
    discoveryUrl: string;
    contextSnippet?: string | null;
    extractedLinks?: Prisma.RawDiscoveryCreateextractedLinksInput | string[];
    releaseVersion?: string | null;
    releaseDate?: Date | string | null;
    keywords?: Prisma.RawDiscoveryCreatekeywordsInput | string[];
    discoveredAt?: Date | string;
    crawlSessionId: string;
    processed?: boolean;
    matchedEntityId?: string | null;
    createdEntityId?: string | null;
    noveltyScore?: number | null;
    relevanceScore?: number | null;
};
export type RawDiscoveryCreateOrConnectWithoutSourceInput = {
    where: Prisma.RawDiscoveryWhereUniqueInput;
    create: Prisma.XOR<Prisma.RawDiscoveryCreateWithoutSourceInput, Prisma.RawDiscoveryUncheckedCreateWithoutSourceInput>;
};
export type RawDiscoveryCreateManySourceInputEnvelope = {
    data: Prisma.RawDiscoveryCreateManySourceInput | Prisma.RawDiscoveryCreateManySourceInput[];
    skipDuplicates?: boolean;
};
export type RawDiscoveryUpsertWithWhereUniqueWithoutSourceInput = {
    where: Prisma.RawDiscoveryWhereUniqueInput;
    update: Prisma.XOR<Prisma.RawDiscoveryUpdateWithoutSourceInput, Prisma.RawDiscoveryUncheckedUpdateWithoutSourceInput>;
    create: Prisma.XOR<Prisma.RawDiscoveryCreateWithoutSourceInput, Prisma.RawDiscoveryUncheckedCreateWithoutSourceInput>;
};
export type RawDiscoveryUpdateWithWhereUniqueWithoutSourceInput = {
    where: Prisma.RawDiscoveryWhereUniqueInput;
    data: Prisma.XOR<Prisma.RawDiscoveryUpdateWithoutSourceInput, Prisma.RawDiscoveryUncheckedUpdateWithoutSourceInput>;
};
export type RawDiscoveryUpdateManyWithWhereWithoutSourceInput = {
    where: Prisma.RawDiscoveryScalarWhereInput;
    data: Prisma.XOR<Prisma.RawDiscoveryUpdateManyMutationInput, Prisma.RawDiscoveryUncheckedUpdateManyWithoutSourceInput>;
};
export type RawDiscoveryScalarWhereInput = {
    AND?: Prisma.RawDiscoveryScalarWhereInput | Prisma.RawDiscoveryScalarWhereInput[];
    OR?: Prisma.RawDiscoveryScalarWhereInput[];
    NOT?: Prisma.RawDiscoveryScalarWhereInput | Prisma.RawDiscoveryScalarWhereInput[];
    id?: Prisma.StringFilter<"RawDiscovery"> | string;
    sourceId?: Prisma.StringFilter<"RawDiscovery"> | string;
    mentionedName?: Prisma.StringFilter<"RawDiscovery"> | string;
    briefDescription?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    discoveryUrl?: Prisma.StringFilter<"RawDiscovery"> | string;
    contextSnippet?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    extractedLinks?: Prisma.StringNullableListFilter<"RawDiscovery">;
    releaseVersion?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    releaseDate?: Prisma.DateTimeNullableFilter<"RawDiscovery"> | Date | string | null;
    keywords?: Prisma.StringNullableListFilter<"RawDiscovery">;
    discoveredAt?: Prisma.DateTimeFilter<"RawDiscovery"> | Date | string;
    crawlSessionId?: Prisma.StringFilter<"RawDiscovery"> | string;
    processed?: Prisma.BoolFilter<"RawDiscovery"> | boolean;
    matchedEntityId?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    createdEntityId?: Prisma.StringNullableFilter<"RawDiscovery"> | string | null;
    noveltyScore?: Prisma.FloatNullableFilter<"RawDiscovery"> | number | null;
    relevanceScore?: Prisma.FloatNullableFilter<"RawDiscovery"> | number | null;
};
export type RawDiscoveryCreateManySourceInput = {
    id?: string;
    mentionedName: string;
    briefDescription?: string | null;
    discoveryUrl: string;
    contextSnippet?: string | null;
    extractedLinks?: Prisma.RawDiscoveryCreateextractedLinksInput | string[];
    releaseVersion?: string | null;
    releaseDate?: Date | string | null;
    keywords?: Prisma.RawDiscoveryCreatekeywordsInput | string[];
    discoveredAt?: Date | string;
    crawlSessionId: string;
    processed?: boolean;
    matchedEntityId?: string | null;
    createdEntityId?: string | null;
    noveltyScore?: number | null;
    relevanceScore?: number | null;
};
export type RawDiscoveryUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    mentionedName?: Prisma.StringFieldUpdateOperationsInput | string;
    briefDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoveryUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    contextSnippet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    extractedLinks?: Prisma.RawDiscoveryUpdateextractedLinksInput | string[];
    releaseVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    keywords?: Prisma.RawDiscoveryUpdatekeywordsInput | string[];
    discoveredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crawlSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    matchedEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    relevanceScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type RawDiscoveryUncheckedUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    mentionedName?: Prisma.StringFieldUpdateOperationsInput | string;
    briefDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoveryUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    contextSnippet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    extractedLinks?: Prisma.RawDiscoveryUpdateextractedLinksInput | string[];
    releaseVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    keywords?: Prisma.RawDiscoveryUpdatekeywordsInput | string[];
    discoveredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crawlSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    matchedEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    relevanceScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type RawDiscoveryUncheckedUpdateManyWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    mentionedName?: Prisma.StringFieldUpdateOperationsInput | string;
    briefDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    discoveryUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    contextSnippet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    extractedLinks?: Prisma.RawDiscoveryUpdateextractedLinksInput | string[];
    releaseVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    releaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    keywords?: Prisma.RawDiscoveryUpdatekeywordsInput | string[];
    discoveredAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    crawlSessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    processed?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    matchedEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdEntityId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    noveltyScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    relevanceScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
};
export type RawDiscoverySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    mentionedName?: boolean;
    briefDescription?: boolean;
    discoveryUrl?: boolean;
    contextSnippet?: boolean;
    extractedLinks?: boolean;
    releaseVersion?: boolean;
    releaseDate?: boolean;
    keywords?: boolean;
    discoveredAt?: boolean;
    crawlSessionId?: boolean;
    processed?: boolean;
    matchedEntityId?: boolean;
    createdEntityId?: boolean;
    noveltyScore?: boolean;
    relevanceScore?: boolean;
    source?: boolean | Prisma.DiscoverySourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rawDiscovery"]>;
export type RawDiscoverySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    mentionedName?: boolean;
    briefDescription?: boolean;
    discoveryUrl?: boolean;
    contextSnippet?: boolean;
    extractedLinks?: boolean;
    releaseVersion?: boolean;
    releaseDate?: boolean;
    keywords?: boolean;
    discoveredAt?: boolean;
    crawlSessionId?: boolean;
    processed?: boolean;
    matchedEntityId?: boolean;
    createdEntityId?: boolean;
    noveltyScore?: boolean;
    relevanceScore?: boolean;
    source?: boolean | Prisma.DiscoverySourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rawDiscovery"]>;
export type RawDiscoverySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sourceId?: boolean;
    mentionedName?: boolean;
    briefDescription?: boolean;
    discoveryUrl?: boolean;
    contextSnippet?: boolean;
    extractedLinks?: boolean;
    releaseVersion?: boolean;
    releaseDate?: boolean;
    keywords?: boolean;
    discoveredAt?: boolean;
    crawlSessionId?: boolean;
    processed?: boolean;
    matchedEntityId?: boolean;
    createdEntityId?: boolean;
    noveltyScore?: boolean;
    relevanceScore?: boolean;
    source?: boolean | Prisma.DiscoverySourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rawDiscovery"]>;
export type RawDiscoverySelectScalar = {
    id?: boolean;
    sourceId?: boolean;
    mentionedName?: boolean;
    briefDescription?: boolean;
    discoveryUrl?: boolean;
    contextSnippet?: boolean;
    extractedLinks?: boolean;
    releaseVersion?: boolean;
    releaseDate?: boolean;
    keywords?: boolean;
    discoveredAt?: boolean;
    crawlSessionId?: boolean;
    processed?: boolean;
    matchedEntityId?: boolean;
    createdEntityId?: boolean;
    noveltyScore?: boolean;
    relevanceScore?: boolean;
};
export type RawDiscoveryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sourceId" | "mentionedName" | "briefDescription" | "discoveryUrl" | "contextSnippet" | "extractedLinks" | "releaseVersion" | "releaseDate" | "keywords" | "discoveredAt" | "crawlSessionId" | "processed" | "matchedEntityId" | "createdEntityId" | "noveltyScore" | "relevanceScore", ExtArgs["result"]["rawDiscovery"]>;
export type RawDiscoveryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.DiscoverySourceDefaultArgs<ExtArgs>;
};
export type RawDiscoveryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.DiscoverySourceDefaultArgs<ExtArgs>;
};
export type RawDiscoveryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    source?: boolean | Prisma.DiscoverySourceDefaultArgs<ExtArgs>;
};
export type $RawDiscoveryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RawDiscovery";
    objects: {
        source: Prisma.$DiscoverySourcePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sourceId: string;
        mentionedName: string;
        briefDescription: string | null;
        discoveryUrl: string;
        contextSnippet: string | null;
        extractedLinks: string[];
        releaseVersion: string | null;
        releaseDate: Date | null;
        keywords: string[];
        discoveredAt: Date;
        crawlSessionId: string;
        processed: boolean;
        matchedEntityId: string | null;
        createdEntityId: string | null;
        noveltyScore: number | null;
        relevanceScore: number | null;
    }, ExtArgs["result"]["rawDiscovery"]>;
    composites: {};
};
export type RawDiscoveryGetPayload<S extends boolean | null | undefined | RawDiscoveryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload, S>;
export type RawDiscoveryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RawDiscoveryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RawDiscoveryCountAggregateInputType | true;
};
export interface RawDiscoveryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RawDiscovery'];
        meta: {
            name: 'RawDiscovery';
        };
    };
    /**
     * Find zero or one RawDiscovery that matches the filter.
     * @param {RawDiscoveryFindUniqueArgs} args - Arguments to find a RawDiscovery
     * @example
     * // Get one RawDiscovery
     * const rawDiscovery = await prisma.rawDiscovery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RawDiscoveryFindUniqueArgs>(args: Prisma.SelectSubset<T, RawDiscoveryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RawDiscoveryClient<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one RawDiscovery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RawDiscoveryFindUniqueOrThrowArgs} args - Arguments to find a RawDiscovery
     * @example
     * // Get one RawDiscovery
     * const rawDiscovery = await prisma.rawDiscovery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RawDiscoveryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RawDiscoveryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RawDiscoveryClient<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RawDiscovery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDiscoveryFindFirstArgs} args - Arguments to find a RawDiscovery
     * @example
     * // Get one RawDiscovery
     * const rawDiscovery = await prisma.rawDiscovery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RawDiscoveryFindFirstArgs>(args?: Prisma.SelectSubset<T, RawDiscoveryFindFirstArgs<ExtArgs>>): Prisma.Prisma__RawDiscoveryClient<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first RawDiscovery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDiscoveryFindFirstOrThrowArgs} args - Arguments to find a RawDiscovery
     * @example
     * // Get one RawDiscovery
     * const rawDiscovery = await prisma.rawDiscovery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RawDiscoveryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RawDiscoveryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RawDiscoveryClient<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more RawDiscoveries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDiscoveryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RawDiscoveries
     * const rawDiscoveries = await prisma.rawDiscovery.findMany()
     *
     * // Get first 10 RawDiscoveries
     * const rawDiscoveries = await prisma.rawDiscovery.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const rawDiscoveryWithIdOnly = await prisma.rawDiscovery.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RawDiscoveryFindManyArgs>(args?: Prisma.SelectSubset<T, RawDiscoveryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a RawDiscovery.
     * @param {RawDiscoveryCreateArgs} args - Arguments to create a RawDiscovery.
     * @example
     * // Create one RawDiscovery
     * const RawDiscovery = await prisma.rawDiscovery.create({
     *   data: {
     *     // ... data to create a RawDiscovery
     *   }
     * })
     *
     */
    create<T extends RawDiscoveryCreateArgs>(args: Prisma.SelectSubset<T, RawDiscoveryCreateArgs<ExtArgs>>): Prisma.Prisma__RawDiscoveryClient<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many RawDiscoveries.
     * @param {RawDiscoveryCreateManyArgs} args - Arguments to create many RawDiscoveries.
     * @example
     * // Create many RawDiscoveries
     * const rawDiscovery = await prisma.rawDiscovery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RawDiscoveryCreateManyArgs>(args?: Prisma.SelectSubset<T, RawDiscoveryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many RawDiscoveries and returns the data saved in the database.
     * @param {RawDiscoveryCreateManyAndReturnArgs} args - Arguments to create many RawDiscoveries.
     * @example
     * // Create many RawDiscoveries
     * const rawDiscovery = await prisma.rawDiscovery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RawDiscoveries and only return the `id`
     * const rawDiscoveryWithIdOnly = await prisma.rawDiscovery.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RawDiscoveryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RawDiscoveryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a RawDiscovery.
     * @param {RawDiscoveryDeleteArgs} args - Arguments to delete one RawDiscovery.
     * @example
     * // Delete one RawDiscovery
     * const RawDiscovery = await prisma.rawDiscovery.delete({
     *   where: {
     *     // ... filter to delete one RawDiscovery
     *   }
     * })
     *
     */
    delete<T extends RawDiscoveryDeleteArgs>(args: Prisma.SelectSubset<T, RawDiscoveryDeleteArgs<ExtArgs>>): Prisma.Prisma__RawDiscoveryClient<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one RawDiscovery.
     * @param {RawDiscoveryUpdateArgs} args - Arguments to update one RawDiscovery.
     * @example
     * // Update one RawDiscovery
     * const rawDiscovery = await prisma.rawDiscovery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RawDiscoveryUpdateArgs>(args: Prisma.SelectSubset<T, RawDiscoveryUpdateArgs<ExtArgs>>): Prisma.Prisma__RawDiscoveryClient<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more RawDiscoveries.
     * @param {RawDiscoveryDeleteManyArgs} args - Arguments to filter RawDiscoveries to delete.
     * @example
     * // Delete a few RawDiscoveries
     * const { count } = await prisma.rawDiscovery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RawDiscoveryDeleteManyArgs>(args?: Prisma.SelectSubset<T, RawDiscoveryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RawDiscoveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDiscoveryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RawDiscoveries
     * const rawDiscovery = await prisma.rawDiscovery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RawDiscoveryUpdateManyArgs>(args: Prisma.SelectSubset<T, RawDiscoveryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more RawDiscoveries and returns the data updated in the database.
     * @param {RawDiscoveryUpdateManyAndReturnArgs} args - Arguments to update many RawDiscoveries.
     * @example
     * // Update many RawDiscoveries
     * const rawDiscovery = await prisma.rawDiscovery.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more RawDiscoveries and only return the `id`
     * const rawDiscoveryWithIdOnly = await prisma.rawDiscovery.updateManyAndReturn({
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
    updateManyAndReturn<T extends RawDiscoveryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RawDiscoveryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one RawDiscovery.
     * @param {RawDiscoveryUpsertArgs} args - Arguments to update or create a RawDiscovery.
     * @example
     * // Update or create a RawDiscovery
     * const rawDiscovery = await prisma.rawDiscovery.upsert({
     *   create: {
     *     // ... data to create a RawDiscovery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RawDiscovery we want to update
     *   }
     * })
     */
    upsert<T extends RawDiscoveryUpsertArgs>(args: Prisma.SelectSubset<T, RawDiscoveryUpsertArgs<ExtArgs>>): Prisma.Prisma__RawDiscoveryClient<runtime.Types.Result.GetResult<Prisma.$RawDiscoveryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of RawDiscoveries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDiscoveryCountArgs} args - Arguments to filter RawDiscoveries to count.
     * @example
     * // Count the number of RawDiscoveries
     * const count = await prisma.rawDiscovery.count({
     *   where: {
     *     // ... the filter for the RawDiscoveries we want to count
     *   }
     * })
    **/
    count<T extends RawDiscoveryCountArgs>(args?: Prisma.Subset<T, RawDiscoveryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RawDiscoveryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a RawDiscovery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDiscoveryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RawDiscoveryAggregateArgs>(args: Prisma.Subset<T, RawDiscoveryAggregateArgs>): Prisma.PrismaPromise<GetRawDiscoveryAggregateType<T>>;
    /**
     * Group by RawDiscovery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDiscoveryGroupByArgs} args - Group by arguments.
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
    groupBy<T extends RawDiscoveryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RawDiscoveryGroupByArgs['orderBy'];
    } : {
        orderBy?: RawDiscoveryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RawDiscoveryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRawDiscoveryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RawDiscovery model
     */
    readonly fields: RawDiscoveryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for RawDiscovery.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RawDiscoveryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    source<T extends Prisma.DiscoverySourceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiscoverySourceDefaultArgs<ExtArgs>>): Prisma.Prisma__DiscoverySourceClient<runtime.Types.Result.GetResult<Prisma.$DiscoverySourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the RawDiscovery model
 */
export interface RawDiscoveryFieldRefs {
    readonly id: Prisma.FieldRef<"RawDiscovery", 'String'>;
    readonly sourceId: Prisma.FieldRef<"RawDiscovery", 'String'>;
    readonly mentionedName: Prisma.FieldRef<"RawDiscovery", 'String'>;
    readonly briefDescription: Prisma.FieldRef<"RawDiscovery", 'String'>;
    readonly discoveryUrl: Prisma.FieldRef<"RawDiscovery", 'String'>;
    readonly contextSnippet: Prisma.FieldRef<"RawDiscovery", 'String'>;
    readonly extractedLinks: Prisma.FieldRef<"RawDiscovery", 'String[]'>;
    readonly releaseVersion: Prisma.FieldRef<"RawDiscovery", 'String'>;
    readonly releaseDate: Prisma.FieldRef<"RawDiscovery", 'DateTime'>;
    readonly keywords: Prisma.FieldRef<"RawDiscovery", 'String[]'>;
    readonly discoveredAt: Prisma.FieldRef<"RawDiscovery", 'DateTime'>;
    readonly crawlSessionId: Prisma.FieldRef<"RawDiscovery", 'String'>;
    readonly processed: Prisma.FieldRef<"RawDiscovery", 'Boolean'>;
    readonly matchedEntityId: Prisma.FieldRef<"RawDiscovery", 'String'>;
    readonly createdEntityId: Prisma.FieldRef<"RawDiscovery", 'String'>;
    readonly noveltyScore: Prisma.FieldRef<"RawDiscovery", 'Float'>;
    readonly relevanceScore: Prisma.FieldRef<"RawDiscovery", 'Float'>;
}
/**
 * RawDiscovery findUnique
 */
export type RawDiscoveryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RawDiscovery to fetch.
     */
    where: Prisma.RawDiscoveryWhereUniqueInput;
};
/**
 * RawDiscovery findUniqueOrThrow
 */
export type RawDiscoveryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RawDiscovery to fetch.
     */
    where: Prisma.RawDiscoveryWhereUniqueInput;
};
/**
 * RawDiscovery findFirst
 */
export type RawDiscoveryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RawDiscovery to fetch.
     */
    where?: Prisma.RawDiscoveryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RawDiscoveries to fetch.
     */
    orderBy?: Prisma.RawDiscoveryOrderByWithRelationInput | Prisma.RawDiscoveryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RawDiscoveries.
     */
    cursor?: Prisma.RawDiscoveryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RawDiscoveries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RawDiscoveries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RawDiscoveries.
     */
    distinct?: Prisma.RawDiscoveryScalarFieldEnum | Prisma.RawDiscoveryScalarFieldEnum[];
};
/**
 * RawDiscovery findFirstOrThrow
 */
export type RawDiscoveryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RawDiscovery to fetch.
     */
    where?: Prisma.RawDiscoveryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RawDiscoveries to fetch.
     */
    orderBy?: Prisma.RawDiscoveryOrderByWithRelationInput | Prisma.RawDiscoveryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RawDiscoveries.
     */
    cursor?: Prisma.RawDiscoveryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RawDiscoveries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RawDiscoveries.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RawDiscoveries.
     */
    distinct?: Prisma.RawDiscoveryScalarFieldEnum | Prisma.RawDiscoveryScalarFieldEnum[];
};
/**
 * RawDiscovery findMany
 */
export type RawDiscoveryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which RawDiscoveries to fetch.
     */
    where?: Prisma.RawDiscoveryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RawDiscoveries to fetch.
     */
    orderBy?: Prisma.RawDiscoveryOrderByWithRelationInput | Prisma.RawDiscoveryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RawDiscoveries.
     */
    cursor?: Prisma.RawDiscoveryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RawDiscoveries from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RawDiscoveries.
     */
    skip?: number;
    distinct?: Prisma.RawDiscoveryScalarFieldEnum | Prisma.RawDiscoveryScalarFieldEnum[];
};
/**
 * RawDiscovery create
 */
export type RawDiscoveryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a RawDiscovery.
     */
    data: Prisma.XOR<Prisma.RawDiscoveryCreateInput, Prisma.RawDiscoveryUncheckedCreateInput>;
};
/**
 * RawDiscovery createMany
 */
export type RawDiscoveryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many RawDiscoveries.
     */
    data: Prisma.RawDiscoveryCreateManyInput | Prisma.RawDiscoveryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * RawDiscovery createManyAndReturn
 */
export type RawDiscoveryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawDiscovery
     */
    select?: Prisma.RawDiscoverySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RawDiscovery
     */
    omit?: Prisma.RawDiscoveryOmit<ExtArgs> | null;
    /**
     * The data used to create many RawDiscoveries.
     */
    data: Prisma.RawDiscoveryCreateManyInput | Prisma.RawDiscoveryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RawDiscoveryIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * RawDiscovery update
 */
export type RawDiscoveryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a RawDiscovery.
     */
    data: Prisma.XOR<Prisma.RawDiscoveryUpdateInput, Prisma.RawDiscoveryUncheckedUpdateInput>;
    /**
     * Choose, which RawDiscovery to update.
     */
    where: Prisma.RawDiscoveryWhereUniqueInput;
};
/**
 * RawDiscovery updateMany
 */
export type RawDiscoveryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update RawDiscoveries.
     */
    data: Prisma.XOR<Prisma.RawDiscoveryUpdateManyMutationInput, Prisma.RawDiscoveryUncheckedUpdateManyInput>;
    /**
     * Filter which RawDiscoveries to update
     */
    where?: Prisma.RawDiscoveryWhereInput;
    /**
     * Limit how many RawDiscoveries to update.
     */
    limit?: number;
};
/**
 * RawDiscovery updateManyAndReturn
 */
export type RawDiscoveryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawDiscovery
     */
    select?: Prisma.RawDiscoverySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the RawDiscovery
     */
    omit?: Prisma.RawDiscoveryOmit<ExtArgs> | null;
    /**
     * The data used to update RawDiscoveries.
     */
    data: Prisma.XOR<Prisma.RawDiscoveryUpdateManyMutationInput, Prisma.RawDiscoveryUncheckedUpdateManyInput>;
    /**
     * Filter which RawDiscoveries to update
     */
    where?: Prisma.RawDiscoveryWhereInput;
    /**
     * Limit how many RawDiscoveries to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RawDiscoveryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * RawDiscovery upsert
 */
export type RawDiscoveryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the RawDiscovery to update in case it exists.
     */
    where: Prisma.RawDiscoveryWhereUniqueInput;
    /**
     * In case the RawDiscovery found by the `where` argument doesn't exist, create a new RawDiscovery with this data.
     */
    create: Prisma.XOR<Prisma.RawDiscoveryCreateInput, Prisma.RawDiscoveryUncheckedCreateInput>;
    /**
     * In case the RawDiscovery was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RawDiscoveryUpdateInput, Prisma.RawDiscoveryUncheckedUpdateInput>;
};
/**
 * RawDiscovery delete
 */
export type RawDiscoveryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which RawDiscovery to delete.
     */
    where: Prisma.RawDiscoveryWhereUniqueInput;
};
/**
 * RawDiscovery deleteMany
 */
export type RawDiscoveryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which RawDiscoveries to delete
     */
    where?: Prisma.RawDiscoveryWhereInput;
    /**
     * Limit how many RawDiscoveries to delete.
     */
    limit?: number;
};
/**
 * RawDiscovery without action
 */
export type RawDiscoveryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=RawDiscovery.d.ts.map