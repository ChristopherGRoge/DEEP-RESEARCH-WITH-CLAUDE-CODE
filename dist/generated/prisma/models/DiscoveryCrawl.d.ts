import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DiscoveryCrawl
 * A crawl session for tracking progress
 */
export type DiscoveryCrawlModel = runtime.Types.Result.DefaultSelection<Prisma.$DiscoveryCrawlPayload>;
export type AggregateDiscoveryCrawl = {
    _count: DiscoveryCrawlCountAggregateOutputType | null;
    _avg: DiscoveryCrawlAvgAggregateOutputType | null;
    _sum: DiscoveryCrawlSumAggregateOutputType | null;
    _min: DiscoveryCrawlMinAggregateOutputType | null;
    _max: DiscoveryCrawlMaxAggregateOutputType | null;
};
export type DiscoveryCrawlAvgAggregateOutputType = {
    sourcesTotal: number | null;
    sourcesComplete: number | null;
    sourcesFailed: number | null;
    discoveriesFound: number | null;
    entitiesCreated: number | null;
    entitiesUpdated: number | null;
    trendsDetected: number | null;
};
export type DiscoveryCrawlSumAggregateOutputType = {
    sourcesTotal: number | null;
    sourcesComplete: number | null;
    sourcesFailed: number | null;
    discoveriesFound: number | null;
    entitiesCreated: number | null;
    entitiesUpdated: number | null;
    trendsDetected: number | null;
};
export type DiscoveryCrawlMinAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    researchFocus: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    pausedAt: Date | null;
    status: $Enums.CrawlStatus | null;
    sourcesTotal: number | null;
    sourcesComplete: number | null;
    sourcesFailed: number | null;
    discoveriesFound: number | null;
    entitiesCreated: number | null;
    entitiesUpdated: number | null;
    trendsDetected: number | null;
};
export type DiscoveryCrawlMaxAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    researchFocus: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    pausedAt: Date | null;
    status: $Enums.CrawlStatus | null;
    sourcesTotal: number | null;
    sourcesComplete: number | null;
    sourcesFailed: number | null;
    discoveriesFound: number | null;
    entitiesCreated: number | null;
    entitiesUpdated: number | null;
    trendsDetected: number | null;
};
export type DiscoveryCrawlCountAggregateOutputType = {
    id: number;
    projectId: number;
    sourceIds: number;
    researchFocus: number;
    startedAt: number;
    completedAt: number;
    pausedAt: number;
    status: number;
    sourcesTotal: number;
    sourcesComplete: number;
    sourcesFailed: number;
    discoveriesFound: number;
    entitiesCreated: number;
    entitiesUpdated: number;
    trendsDetected: number;
    checkpoint: number;
    _all: number;
};
export type DiscoveryCrawlAvgAggregateInputType = {
    sourcesTotal?: true;
    sourcesComplete?: true;
    sourcesFailed?: true;
    discoveriesFound?: true;
    entitiesCreated?: true;
    entitiesUpdated?: true;
    trendsDetected?: true;
};
export type DiscoveryCrawlSumAggregateInputType = {
    sourcesTotal?: true;
    sourcesComplete?: true;
    sourcesFailed?: true;
    discoveriesFound?: true;
    entitiesCreated?: true;
    entitiesUpdated?: true;
    trendsDetected?: true;
};
export type DiscoveryCrawlMinAggregateInputType = {
    id?: true;
    projectId?: true;
    researchFocus?: true;
    startedAt?: true;
    completedAt?: true;
    pausedAt?: true;
    status?: true;
    sourcesTotal?: true;
    sourcesComplete?: true;
    sourcesFailed?: true;
    discoveriesFound?: true;
    entitiesCreated?: true;
    entitiesUpdated?: true;
    trendsDetected?: true;
};
export type DiscoveryCrawlMaxAggregateInputType = {
    id?: true;
    projectId?: true;
    researchFocus?: true;
    startedAt?: true;
    completedAt?: true;
    pausedAt?: true;
    status?: true;
    sourcesTotal?: true;
    sourcesComplete?: true;
    sourcesFailed?: true;
    discoveriesFound?: true;
    entitiesCreated?: true;
    entitiesUpdated?: true;
    trendsDetected?: true;
};
export type DiscoveryCrawlCountAggregateInputType = {
    id?: true;
    projectId?: true;
    sourceIds?: true;
    researchFocus?: true;
    startedAt?: true;
    completedAt?: true;
    pausedAt?: true;
    status?: true;
    sourcesTotal?: true;
    sourcesComplete?: true;
    sourcesFailed?: true;
    discoveriesFound?: true;
    entitiesCreated?: true;
    entitiesUpdated?: true;
    trendsDetected?: true;
    checkpoint?: true;
    _all?: true;
};
export type DiscoveryCrawlAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DiscoveryCrawl to aggregate.
     */
    where?: Prisma.DiscoveryCrawlWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryCrawls to fetch.
     */
    orderBy?: Prisma.DiscoveryCrawlOrderByWithRelationInput | Prisma.DiscoveryCrawlOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DiscoveryCrawlWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryCrawls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryCrawls.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DiscoveryCrawls
    **/
    _count?: true | DiscoveryCrawlCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DiscoveryCrawlAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DiscoveryCrawlSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DiscoveryCrawlMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DiscoveryCrawlMaxAggregateInputType;
};
export type GetDiscoveryCrawlAggregateType<T extends DiscoveryCrawlAggregateArgs> = {
    [P in keyof T & keyof AggregateDiscoveryCrawl]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiscoveryCrawl[P]> : Prisma.GetScalarType<T[P], AggregateDiscoveryCrawl[P]>;
};
export type DiscoveryCrawlGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscoveryCrawlWhereInput;
    orderBy?: Prisma.DiscoveryCrawlOrderByWithAggregationInput | Prisma.DiscoveryCrawlOrderByWithAggregationInput[];
    by: Prisma.DiscoveryCrawlScalarFieldEnum[] | Prisma.DiscoveryCrawlScalarFieldEnum;
    having?: Prisma.DiscoveryCrawlScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiscoveryCrawlCountAggregateInputType | true;
    _avg?: DiscoveryCrawlAvgAggregateInputType;
    _sum?: DiscoveryCrawlSumAggregateInputType;
    _min?: DiscoveryCrawlMinAggregateInputType;
    _max?: DiscoveryCrawlMaxAggregateInputType;
};
export type DiscoveryCrawlGroupByOutputType = {
    id: string;
    projectId: string | null;
    sourceIds: string[];
    researchFocus: string | null;
    startedAt: Date;
    completedAt: Date | null;
    pausedAt: Date | null;
    status: $Enums.CrawlStatus;
    sourcesTotal: number;
    sourcesComplete: number;
    sourcesFailed: number;
    discoveriesFound: number;
    entitiesCreated: number;
    entitiesUpdated: number;
    trendsDetected: number;
    checkpoint: runtime.JsonValue | null;
    _count: DiscoveryCrawlCountAggregateOutputType | null;
    _avg: DiscoveryCrawlAvgAggregateOutputType | null;
    _sum: DiscoveryCrawlSumAggregateOutputType | null;
    _min: DiscoveryCrawlMinAggregateOutputType | null;
    _max: DiscoveryCrawlMaxAggregateOutputType | null;
};
type GetDiscoveryCrawlGroupByPayload<T extends DiscoveryCrawlGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiscoveryCrawlGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiscoveryCrawlGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiscoveryCrawlGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiscoveryCrawlGroupByOutputType[P]>;
}>>;
export type DiscoveryCrawlWhereInput = {
    AND?: Prisma.DiscoveryCrawlWhereInput | Prisma.DiscoveryCrawlWhereInput[];
    OR?: Prisma.DiscoveryCrawlWhereInput[];
    NOT?: Prisma.DiscoveryCrawlWhereInput | Prisma.DiscoveryCrawlWhereInput[];
    id?: Prisma.StringFilter<"DiscoveryCrawl"> | string;
    projectId?: Prisma.StringNullableFilter<"DiscoveryCrawl"> | string | null;
    sourceIds?: Prisma.StringNullableListFilter<"DiscoveryCrawl">;
    researchFocus?: Prisma.StringNullableFilter<"DiscoveryCrawl"> | string | null;
    startedAt?: Prisma.DateTimeFilter<"DiscoveryCrawl"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"DiscoveryCrawl"> | Date | string | null;
    pausedAt?: Prisma.DateTimeNullableFilter<"DiscoveryCrawl"> | Date | string | null;
    status?: Prisma.EnumCrawlStatusFilter<"DiscoveryCrawl"> | $Enums.CrawlStatus;
    sourcesTotal?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    sourcesComplete?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    sourcesFailed?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    discoveriesFound?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    entitiesCreated?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    entitiesUpdated?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    trendsDetected?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    checkpoint?: Prisma.JsonNullableFilter<"DiscoveryCrawl">;
};
export type DiscoveryCrawlOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceIds?: Prisma.SortOrder;
    researchFocus?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    pausedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourcesTotal?: Prisma.SortOrder;
    sourcesComplete?: Prisma.SortOrder;
    sourcesFailed?: Prisma.SortOrder;
    discoveriesFound?: Prisma.SortOrder;
    entitiesCreated?: Prisma.SortOrder;
    entitiesUpdated?: Prisma.SortOrder;
    trendsDetected?: Prisma.SortOrder;
    checkpoint?: Prisma.SortOrderInput | Prisma.SortOrder;
};
export type DiscoveryCrawlWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DiscoveryCrawlWhereInput | Prisma.DiscoveryCrawlWhereInput[];
    OR?: Prisma.DiscoveryCrawlWhereInput[];
    NOT?: Prisma.DiscoveryCrawlWhereInput | Prisma.DiscoveryCrawlWhereInput[];
    projectId?: Prisma.StringNullableFilter<"DiscoveryCrawl"> | string | null;
    sourceIds?: Prisma.StringNullableListFilter<"DiscoveryCrawl">;
    researchFocus?: Prisma.StringNullableFilter<"DiscoveryCrawl"> | string | null;
    startedAt?: Prisma.DateTimeFilter<"DiscoveryCrawl"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"DiscoveryCrawl"> | Date | string | null;
    pausedAt?: Prisma.DateTimeNullableFilter<"DiscoveryCrawl"> | Date | string | null;
    status?: Prisma.EnumCrawlStatusFilter<"DiscoveryCrawl"> | $Enums.CrawlStatus;
    sourcesTotal?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    sourcesComplete?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    sourcesFailed?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    discoveriesFound?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    entitiesCreated?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    entitiesUpdated?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    trendsDetected?: Prisma.IntFilter<"DiscoveryCrawl"> | number;
    checkpoint?: Prisma.JsonNullableFilter<"DiscoveryCrawl">;
}, "id">;
export type DiscoveryCrawlOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    sourceIds?: Prisma.SortOrder;
    researchFocus?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    pausedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourcesTotal?: Prisma.SortOrder;
    sourcesComplete?: Prisma.SortOrder;
    sourcesFailed?: Prisma.SortOrder;
    discoveriesFound?: Prisma.SortOrder;
    entitiesCreated?: Prisma.SortOrder;
    entitiesUpdated?: Prisma.SortOrder;
    trendsDetected?: Prisma.SortOrder;
    checkpoint?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.DiscoveryCrawlCountOrderByAggregateInput;
    _avg?: Prisma.DiscoveryCrawlAvgOrderByAggregateInput;
    _max?: Prisma.DiscoveryCrawlMaxOrderByAggregateInput;
    _min?: Prisma.DiscoveryCrawlMinOrderByAggregateInput;
    _sum?: Prisma.DiscoveryCrawlSumOrderByAggregateInput;
};
export type DiscoveryCrawlScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiscoveryCrawlScalarWhereWithAggregatesInput | Prisma.DiscoveryCrawlScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiscoveryCrawlScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiscoveryCrawlScalarWhereWithAggregatesInput | Prisma.DiscoveryCrawlScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DiscoveryCrawl"> | string;
    projectId?: Prisma.StringNullableWithAggregatesFilter<"DiscoveryCrawl"> | string | null;
    sourceIds?: Prisma.StringNullableListFilter<"DiscoveryCrawl">;
    researchFocus?: Prisma.StringNullableWithAggregatesFilter<"DiscoveryCrawl"> | string | null;
    startedAt?: Prisma.DateTimeWithAggregatesFilter<"DiscoveryCrawl"> | Date | string;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"DiscoveryCrawl"> | Date | string | null;
    pausedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"DiscoveryCrawl"> | Date | string | null;
    status?: Prisma.EnumCrawlStatusWithAggregatesFilter<"DiscoveryCrawl"> | $Enums.CrawlStatus;
    sourcesTotal?: Prisma.IntWithAggregatesFilter<"DiscoveryCrawl"> | number;
    sourcesComplete?: Prisma.IntWithAggregatesFilter<"DiscoveryCrawl"> | number;
    sourcesFailed?: Prisma.IntWithAggregatesFilter<"DiscoveryCrawl"> | number;
    discoveriesFound?: Prisma.IntWithAggregatesFilter<"DiscoveryCrawl"> | number;
    entitiesCreated?: Prisma.IntWithAggregatesFilter<"DiscoveryCrawl"> | number;
    entitiesUpdated?: Prisma.IntWithAggregatesFilter<"DiscoveryCrawl"> | number;
    trendsDetected?: Prisma.IntWithAggregatesFilter<"DiscoveryCrawl"> | number;
    checkpoint?: Prisma.JsonNullableWithAggregatesFilter<"DiscoveryCrawl">;
};
export type DiscoveryCrawlCreateInput = {
    id?: string;
    projectId?: string | null;
    sourceIds?: Prisma.DiscoveryCrawlCreatesourceIdsInput | string[];
    researchFocus?: string | null;
    startedAt?: Date | string;
    completedAt?: Date | string | null;
    pausedAt?: Date | string | null;
    status?: $Enums.CrawlStatus;
    sourcesTotal: number;
    sourcesComplete?: number;
    sourcesFailed?: number;
    discoveriesFound?: number;
    entitiesCreated?: number;
    entitiesUpdated?: number;
    trendsDetected?: number;
    checkpoint?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type DiscoveryCrawlUncheckedCreateInput = {
    id?: string;
    projectId?: string | null;
    sourceIds?: Prisma.DiscoveryCrawlCreatesourceIdsInput | string[];
    researchFocus?: string | null;
    startedAt?: Date | string;
    completedAt?: Date | string | null;
    pausedAt?: Date | string | null;
    status?: $Enums.CrawlStatus;
    sourcesTotal: number;
    sourcesComplete?: number;
    sourcesFailed?: number;
    discoveriesFound?: number;
    entitiesCreated?: number;
    entitiesUpdated?: number;
    trendsDetected?: number;
    checkpoint?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type DiscoveryCrawlUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceIds?: Prisma.DiscoveryCrawlUpdatesourceIdsInput | string[];
    researchFocus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    pausedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    sourcesTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    sourcesComplete?: Prisma.IntFieldUpdateOperationsInput | number;
    sourcesFailed?: Prisma.IntFieldUpdateOperationsInput | number;
    discoveriesFound?: Prisma.IntFieldUpdateOperationsInput | number;
    entitiesCreated?: Prisma.IntFieldUpdateOperationsInput | number;
    entitiesUpdated?: Prisma.IntFieldUpdateOperationsInput | number;
    trendsDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    checkpoint?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type DiscoveryCrawlUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceIds?: Prisma.DiscoveryCrawlUpdatesourceIdsInput | string[];
    researchFocus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    pausedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    sourcesTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    sourcesComplete?: Prisma.IntFieldUpdateOperationsInput | number;
    sourcesFailed?: Prisma.IntFieldUpdateOperationsInput | number;
    discoveriesFound?: Prisma.IntFieldUpdateOperationsInput | number;
    entitiesCreated?: Prisma.IntFieldUpdateOperationsInput | number;
    entitiesUpdated?: Prisma.IntFieldUpdateOperationsInput | number;
    trendsDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    checkpoint?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type DiscoveryCrawlCreateManyInput = {
    id?: string;
    projectId?: string | null;
    sourceIds?: Prisma.DiscoveryCrawlCreatesourceIdsInput | string[];
    researchFocus?: string | null;
    startedAt?: Date | string;
    completedAt?: Date | string | null;
    pausedAt?: Date | string | null;
    status?: $Enums.CrawlStatus;
    sourcesTotal: number;
    sourcesComplete?: number;
    sourcesFailed?: number;
    discoveriesFound?: number;
    entitiesCreated?: number;
    entitiesUpdated?: number;
    trendsDetected?: number;
    checkpoint?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type DiscoveryCrawlUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceIds?: Prisma.DiscoveryCrawlUpdatesourceIdsInput | string[];
    researchFocus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    pausedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    sourcesTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    sourcesComplete?: Prisma.IntFieldUpdateOperationsInput | number;
    sourcesFailed?: Prisma.IntFieldUpdateOperationsInput | number;
    discoveriesFound?: Prisma.IntFieldUpdateOperationsInput | number;
    entitiesCreated?: Prisma.IntFieldUpdateOperationsInput | number;
    entitiesUpdated?: Prisma.IntFieldUpdateOperationsInput | number;
    trendsDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    checkpoint?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type DiscoveryCrawlUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    sourceIds?: Prisma.DiscoveryCrawlUpdatesourceIdsInput | string[];
    researchFocus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    pausedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    status?: Prisma.EnumCrawlStatusFieldUpdateOperationsInput | $Enums.CrawlStatus;
    sourcesTotal?: Prisma.IntFieldUpdateOperationsInput | number;
    sourcesComplete?: Prisma.IntFieldUpdateOperationsInput | number;
    sourcesFailed?: Prisma.IntFieldUpdateOperationsInput | number;
    discoveriesFound?: Prisma.IntFieldUpdateOperationsInput | number;
    entitiesCreated?: Prisma.IntFieldUpdateOperationsInput | number;
    entitiesUpdated?: Prisma.IntFieldUpdateOperationsInput | number;
    trendsDetected?: Prisma.IntFieldUpdateOperationsInput | number;
    checkpoint?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type DiscoveryCrawlCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    sourceIds?: Prisma.SortOrder;
    researchFocus?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    pausedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourcesTotal?: Prisma.SortOrder;
    sourcesComplete?: Prisma.SortOrder;
    sourcesFailed?: Prisma.SortOrder;
    discoveriesFound?: Prisma.SortOrder;
    entitiesCreated?: Prisma.SortOrder;
    entitiesUpdated?: Prisma.SortOrder;
    trendsDetected?: Prisma.SortOrder;
    checkpoint?: Prisma.SortOrder;
};
export type DiscoveryCrawlAvgOrderByAggregateInput = {
    sourcesTotal?: Prisma.SortOrder;
    sourcesComplete?: Prisma.SortOrder;
    sourcesFailed?: Prisma.SortOrder;
    discoveriesFound?: Prisma.SortOrder;
    entitiesCreated?: Prisma.SortOrder;
    entitiesUpdated?: Prisma.SortOrder;
    trendsDetected?: Prisma.SortOrder;
};
export type DiscoveryCrawlMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    researchFocus?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    pausedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourcesTotal?: Prisma.SortOrder;
    sourcesComplete?: Prisma.SortOrder;
    sourcesFailed?: Prisma.SortOrder;
    discoveriesFound?: Prisma.SortOrder;
    entitiesCreated?: Prisma.SortOrder;
    entitiesUpdated?: Prisma.SortOrder;
    trendsDetected?: Prisma.SortOrder;
};
export type DiscoveryCrawlMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    researchFocus?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    pausedAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    sourcesTotal?: Prisma.SortOrder;
    sourcesComplete?: Prisma.SortOrder;
    sourcesFailed?: Prisma.SortOrder;
    discoveriesFound?: Prisma.SortOrder;
    entitiesCreated?: Prisma.SortOrder;
    entitiesUpdated?: Prisma.SortOrder;
    trendsDetected?: Prisma.SortOrder;
};
export type DiscoveryCrawlSumOrderByAggregateInput = {
    sourcesTotal?: Prisma.SortOrder;
    sourcesComplete?: Prisma.SortOrder;
    sourcesFailed?: Prisma.SortOrder;
    discoveriesFound?: Prisma.SortOrder;
    entitiesCreated?: Prisma.SortOrder;
    entitiesUpdated?: Prisma.SortOrder;
    trendsDetected?: Prisma.SortOrder;
};
export type DiscoveryCrawlCreatesourceIdsInput = {
    set: string[];
};
export type DiscoveryCrawlUpdatesourceIdsInput = {
    set?: string[];
    push?: string | string[];
};
export type EnumCrawlStatusFieldUpdateOperationsInput = {
    set?: $Enums.CrawlStatus;
};
export type DiscoveryCrawlSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    sourceIds?: boolean;
    researchFocus?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    pausedAt?: boolean;
    status?: boolean;
    sourcesTotal?: boolean;
    sourcesComplete?: boolean;
    sourcesFailed?: boolean;
    discoveriesFound?: boolean;
    entitiesCreated?: boolean;
    entitiesUpdated?: boolean;
    trendsDetected?: boolean;
    checkpoint?: boolean;
}, ExtArgs["result"]["discoveryCrawl"]>;
export type DiscoveryCrawlSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    sourceIds?: boolean;
    researchFocus?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    pausedAt?: boolean;
    status?: boolean;
    sourcesTotal?: boolean;
    sourcesComplete?: boolean;
    sourcesFailed?: boolean;
    discoveriesFound?: boolean;
    entitiesCreated?: boolean;
    entitiesUpdated?: boolean;
    trendsDetected?: boolean;
    checkpoint?: boolean;
}, ExtArgs["result"]["discoveryCrawl"]>;
export type DiscoveryCrawlSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    sourceIds?: boolean;
    researchFocus?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    pausedAt?: boolean;
    status?: boolean;
    sourcesTotal?: boolean;
    sourcesComplete?: boolean;
    sourcesFailed?: boolean;
    discoveriesFound?: boolean;
    entitiesCreated?: boolean;
    entitiesUpdated?: boolean;
    trendsDetected?: boolean;
    checkpoint?: boolean;
}, ExtArgs["result"]["discoveryCrawl"]>;
export type DiscoveryCrawlSelectScalar = {
    id?: boolean;
    projectId?: boolean;
    sourceIds?: boolean;
    researchFocus?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    pausedAt?: boolean;
    status?: boolean;
    sourcesTotal?: boolean;
    sourcesComplete?: boolean;
    sourcesFailed?: boolean;
    discoveriesFound?: boolean;
    entitiesCreated?: boolean;
    entitiesUpdated?: boolean;
    trendsDetected?: boolean;
    checkpoint?: boolean;
};
export type DiscoveryCrawlOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "projectId" | "sourceIds" | "researchFocus" | "startedAt" | "completedAt" | "pausedAt" | "status" | "sourcesTotal" | "sourcesComplete" | "sourcesFailed" | "discoveriesFound" | "entitiesCreated" | "entitiesUpdated" | "trendsDetected" | "checkpoint", ExtArgs["result"]["discoveryCrawl"]>;
export type $DiscoveryCrawlPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DiscoveryCrawl";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        projectId: string | null;
        sourceIds: string[];
        researchFocus: string | null;
        startedAt: Date;
        completedAt: Date | null;
        pausedAt: Date | null;
        status: $Enums.CrawlStatus;
        sourcesTotal: number;
        sourcesComplete: number;
        sourcesFailed: number;
        discoveriesFound: number;
        entitiesCreated: number;
        entitiesUpdated: number;
        trendsDetected: number;
        checkpoint: runtime.JsonValue | null;
    }, ExtArgs["result"]["discoveryCrawl"]>;
    composites: {};
};
export type DiscoveryCrawlGetPayload<S extends boolean | null | undefined | DiscoveryCrawlDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload, S>;
export type DiscoveryCrawlCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiscoveryCrawlFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiscoveryCrawlCountAggregateInputType | true;
};
export interface DiscoveryCrawlDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DiscoveryCrawl'];
        meta: {
            name: 'DiscoveryCrawl';
        };
    };
    /**
     * Find zero or one DiscoveryCrawl that matches the filter.
     * @param {DiscoveryCrawlFindUniqueArgs} args - Arguments to find a DiscoveryCrawl
     * @example
     * // Get one DiscoveryCrawl
     * const discoveryCrawl = await prisma.discoveryCrawl.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscoveryCrawlFindUniqueArgs>(args: Prisma.SelectSubset<T, DiscoveryCrawlFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCrawlClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DiscoveryCrawl that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiscoveryCrawlFindUniqueOrThrowArgs} args - Arguments to find a DiscoveryCrawl
     * @example
     * // Get one DiscoveryCrawl
     * const discoveryCrawl = await prisma.discoveryCrawl.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscoveryCrawlFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiscoveryCrawlFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCrawlClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DiscoveryCrawl that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCrawlFindFirstArgs} args - Arguments to find a DiscoveryCrawl
     * @example
     * // Get one DiscoveryCrawl
     * const discoveryCrawl = await prisma.discoveryCrawl.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscoveryCrawlFindFirstArgs>(args?: Prisma.SelectSubset<T, DiscoveryCrawlFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCrawlClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DiscoveryCrawl that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCrawlFindFirstOrThrowArgs} args - Arguments to find a DiscoveryCrawl
     * @example
     * // Get one DiscoveryCrawl
     * const discoveryCrawl = await prisma.discoveryCrawl.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscoveryCrawlFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiscoveryCrawlFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCrawlClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DiscoveryCrawls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCrawlFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscoveryCrawls
     * const discoveryCrawls = await prisma.discoveryCrawl.findMany()
     *
     * // Get first 10 DiscoveryCrawls
     * const discoveryCrawls = await prisma.discoveryCrawl.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const discoveryCrawlWithIdOnly = await prisma.discoveryCrawl.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DiscoveryCrawlFindManyArgs>(args?: Prisma.SelectSubset<T, DiscoveryCrawlFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DiscoveryCrawl.
     * @param {DiscoveryCrawlCreateArgs} args - Arguments to create a DiscoveryCrawl.
     * @example
     * // Create one DiscoveryCrawl
     * const DiscoveryCrawl = await prisma.discoveryCrawl.create({
     *   data: {
     *     // ... data to create a DiscoveryCrawl
     *   }
     * })
     *
     */
    create<T extends DiscoveryCrawlCreateArgs>(args: Prisma.SelectSubset<T, DiscoveryCrawlCreateArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCrawlClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DiscoveryCrawls.
     * @param {DiscoveryCrawlCreateManyArgs} args - Arguments to create many DiscoveryCrawls.
     * @example
     * // Create many DiscoveryCrawls
     * const discoveryCrawl = await prisma.discoveryCrawl.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DiscoveryCrawlCreateManyArgs>(args?: Prisma.SelectSubset<T, DiscoveryCrawlCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DiscoveryCrawls and returns the data saved in the database.
     * @param {DiscoveryCrawlCreateManyAndReturnArgs} args - Arguments to create many DiscoveryCrawls.
     * @example
     * // Create many DiscoveryCrawls
     * const discoveryCrawl = await prisma.discoveryCrawl.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DiscoveryCrawls and only return the `id`
     * const discoveryCrawlWithIdOnly = await prisma.discoveryCrawl.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DiscoveryCrawlCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiscoveryCrawlCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DiscoveryCrawl.
     * @param {DiscoveryCrawlDeleteArgs} args - Arguments to delete one DiscoveryCrawl.
     * @example
     * // Delete one DiscoveryCrawl
     * const DiscoveryCrawl = await prisma.discoveryCrawl.delete({
     *   where: {
     *     // ... filter to delete one DiscoveryCrawl
     *   }
     * })
     *
     */
    delete<T extends DiscoveryCrawlDeleteArgs>(args: Prisma.SelectSubset<T, DiscoveryCrawlDeleteArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCrawlClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DiscoveryCrawl.
     * @param {DiscoveryCrawlUpdateArgs} args - Arguments to update one DiscoveryCrawl.
     * @example
     * // Update one DiscoveryCrawl
     * const discoveryCrawl = await prisma.discoveryCrawl.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DiscoveryCrawlUpdateArgs>(args: Prisma.SelectSubset<T, DiscoveryCrawlUpdateArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCrawlClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DiscoveryCrawls.
     * @param {DiscoveryCrawlDeleteManyArgs} args - Arguments to filter DiscoveryCrawls to delete.
     * @example
     * // Delete a few DiscoveryCrawls
     * const { count } = await prisma.discoveryCrawl.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DiscoveryCrawlDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiscoveryCrawlDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DiscoveryCrawls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCrawlUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscoveryCrawls
     * const discoveryCrawl = await prisma.discoveryCrawl.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DiscoveryCrawlUpdateManyArgs>(args: Prisma.SelectSubset<T, DiscoveryCrawlUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DiscoveryCrawls and returns the data updated in the database.
     * @param {DiscoveryCrawlUpdateManyAndReturnArgs} args - Arguments to update many DiscoveryCrawls.
     * @example
     * // Update many DiscoveryCrawls
     * const discoveryCrawl = await prisma.discoveryCrawl.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DiscoveryCrawls and only return the `id`
     * const discoveryCrawlWithIdOnly = await prisma.discoveryCrawl.updateManyAndReturn({
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
    updateManyAndReturn<T extends DiscoveryCrawlUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiscoveryCrawlUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DiscoveryCrawl.
     * @param {DiscoveryCrawlUpsertArgs} args - Arguments to update or create a DiscoveryCrawl.
     * @example
     * // Update or create a DiscoveryCrawl
     * const discoveryCrawl = await prisma.discoveryCrawl.upsert({
     *   create: {
     *     // ... data to create a DiscoveryCrawl
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscoveryCrawl we want to update
     *   }
     * })
     */
    upsert<T extends DiscoveryCrawlUpsertArgs>(args: Prisma.SelectSubset<T, DiscoveryCrawlUpsertArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCrawlClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCrawlPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DiscoveryCrawls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCrawlCountArgs} args - Arguments to filter DiscoveryCrawls to count.
     * @example
     * // Count the number of DiscoveryCrawls
     * const count = await prisma.discoveryCrawl.count({
     *   where: {
     *     // ... the filter for the DiscoveryCrawls we want to count
     *   }
     * })
    **/
    count<T extends DiscoveryCrawlCountArgs>(args?: Prisma.Subset<T, DiscoveryCrawlCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiscoveryCrawlCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DiscoveryCrawl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCrawlAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DiscoveryCrawlAggregateArgs>(args: Prisma.Subset<T, DiscoveryCrawlAggregateArgs>): Prisma.PrismaPromise<GetDiscoveryCrawlAggregateType<T>>;
    /**
     * Group by DiscoveryCrawl.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCrawlGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DiscoveryCrawlGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiscoveryCrawlGroupByArgs['orderBy'];
    } : {
        orderBy?: DiscoveryCrawlGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiscoveryCrawlGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscoveryCrawlGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DiscoveryCrawl model
     */
    readonly fields: DiscoveryCrawlFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DiscoveryCrawl.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DiscoveryCrawlClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the DiscoveryCrawl model
 */
export interface DiscoveryCrawlFieldRefs {
    readonly id: Prisma.FieldRef<"DiscoveryCrawl", 'String'>;
    readonly projectId: Prisma.FieldRef<"DiscoveryCrawl", 'String'>;
    readonly sourceIds: Prisma.FieldRef<"DiscoveryCrawl", 'String[]'>;
    readonly researchFocus: Prisma.FieldRef<"DiscoveryCrawl", 'String'>;
    readonly startedAt: Prisma.FieldRef<"DiscoveryCrawl", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"DiscoveryCrawl", 'DateTime'>;
    readonly pausedAt: Prisma.FieldRef<"DiscoveryCrawl", 'DateTime'>;
    readonly status: Prisma.FieldRef<"DiscoveryCrawl", 'CrawlStatus'>;
    readonly sourcesTotal: Prisma.FieldRef<"DiscoveryCrawl", 'Int'>;
    readonly sourcesComplete: Prisma.FieldRef<"DiscoveryCrawl", 'Int'>;
    readonly sourcesFailed: Prisma.FieldRef<"DiscoveryCrawl", 'Int'>;
    readonly discoveriesFound: Prisma.FieldRef<"DiscoveryCrawl", 'Int'>;
    readonly entitiesCreated: Prisma.FieldRef<"DiscoveryCrawl", 'Int'>;
    readonly entitiesUpdated: Prisma.FieldRef<"DiscoveryCrawl", 'Int'>;
    readonly trendsDetected: Prisma.FieldRef<"DiscoveryCrawl", 'Int'>;
    readonly checkpoint: Prisma.FieldRef<"DiscoveryCrawl", 'Json'>;
}
/**
 * DiscoveryCrawl findUnique
 */
export type DiscoveryCrawlFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * Filter, which DiscoveryCrawl to fetch.
     */
    where: Prisma.DiscoveryCrawlWhereUniqueInput;
};
/**
 * DiscoveryCrawl findUniqueOrThrow
 */
export type DiscoveryCrawlFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * Filter, which DiscoveryCrawl to fetch.
     */
    where: Prisma.DiscoveryCrawlWhereUniqueInput;
};
/**
 * DiscoveryCrawl findFirst
 */
export type DiscoveryCrawlFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * Filter, which DiscoveryCrawl to fetch.
     */
    where?: Prisma.DiscoveryCrawlWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryCrawls to fetch.
     */
    orderBy?: Prisma.DiscoveryCrawlOrderByWithRelationInput | Prisma.DiscoveryCrawlOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DiscoveryCrawls.
     */
    cursor?: Prisma.DiscoveryCrawlWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryCrawls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryCrawls.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DiscoveryCrawls.
     */
    distinct?: Prisma.DiscoveryCrawlScalarFieldEnum | Prisma.DiscoveryCrawlScalarFieldEnum[];
};
/**
 * DiscoveryCrawl findFirstOrThrow
 */
export type DiscoveryCrawlFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * Filter, which DiscoveryCrawl to fetch.
     */
    where?: Prisma.DiscoveryCrawlWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryCrawls to fetch.
     */
    orderBy?: Prisma.DiscoveryCrawlOrderByWithRelationInput | Prisma.DiscoveryCrawlOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DiscoveryCrawls.
     */
    cursor?: Prisma.DiscoveryCrawlWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryCrawls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryCrawls.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DiscoveryCrawls.
     */
    distinct?: Prisma.DiscoveryCrawlScalarFieldEnum | Prisma.DiscoveryCrawlScalarFieldEnum[];
};
/**
 * DiscoveryCrawl findMany
 */
export type DiscoveryCrawlFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * Filter, which DiscoveryCrawls to fetch.
     */
    where?: Prisma.DiscoveryCrawlWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryCrawls to fetch.
     */
    orderBy?: Prisma.DiscoveryCrawlOrderByWithRelationInput | Prisma.DiscoveryCrawlOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DiscoveryCrawls.
     */
    cursor?: Prisma.DiscoveryCrawlWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryCrawls from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryCrawls.
     */
    skip?: number;
    distinct?: Prisma.DiscoveryCrawlScalarFieldEnum | Prisma.DiscoveryCrawlScalarFieldEnum[];
};
/**
 * DiscoveryCrawl create
 */
export type DiscoveryCrawlCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * The data needed to create a DiscoveryCrawl.
     */
    data: Prisma.XOR<Prisma.DiscoveryCrawlCreateInput, Prisma.DiscoveryCrawlUncheckedCreateInput>;
};
/**
 * DiscoveryCrawl createMany
 */
export type DiscoveryCrawlCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiscoveryCrawls.
     */
    data: Prisma.DiscoveryCrawlCreateManyInput | Prisma.DiscoveryCrawlCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DiscoveryCrawl createManyAndReturn
 */
export type DiscoveryCrawlCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * The data used to create many DiscoveryCrawls.
     */
    data: Prisma.DiscoveryCrawlCreateManyInput | Prisma.DiscoveryCrawlCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * DiscoveryCrawl update
 */
export type DiscoveryCrawlUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * The data needed to update a DiscoveryCrawl.
     */
    data: Prisma.XOR<Prisma.DiscoveryCrawlUpdateInput, Prisma.DiscoveryCrawlUncheckedUpdateInput>;
    /**
     * Choose, which DiscoveryCrawl to update.
     */
    where: Prisma.DiscoveryCrawlWhereUniqueInput;
};
/**
 * DiscoveryCrawl updateMany
 */
export type DiscoveryCrawlUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DiscoveryCrawls.
     */
    data: Prisma.XOR<Prisma.DiscoveryCrawlUpdateManyMutationInput, Prisma.DiscoveryCrawlUncheckedUpdateManyInput>;
    /**
     * Filter which DiscoveryCrawls to update
     */
    where?: Prisma.DiscoveryCrawlWhereInput;
    /**
     * Limit how many DiscoveryCrawls to update.
     */
    limit?: number;
};
/**
 * DiscoveryCrawl updateManyAndReturn
 */
export type DiscoveryCrawlUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * The data used to update DiscoveryCrawls.
     */
    data: Prisma.XOR<Prisma.DiscoveryCrawlUpdateManyMutationInput, Prisma.DiscoveryCrawlUncheckedUpdateManyInput>;
    /**
     * Filter which DiscoveryCrawls to update
     */
    where?: Prisma.DiscoveryCrawlWhereInput;
    /**
     * Limit how many DiscoveryCrawls to update.
     */
    limit?: number;
};
/**
 * DiscoveryCrawl upsert
 */
export type DiscoveryCrawlUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * The filter to search for the DiscoveryCrawl to update in case it exists.
     */
    where: Prisma.DiscoveryCrawlWhereUniqueInput;
    /**
     * In case the DiscoveryCrawl found by the `where` argument doesn't exist, create a new DiscoveryCrawl with this data.
     */
    create: Prisma.XOR<Prisma.DiscoveryCrawlCreateInput, Prisma.DiscoveryCrawlUncheckedCreateInput>;
    /**
     * In case the DiscoveryCrawl was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DiscoveryCrawlUpdateInput, Prisma.DiscoveryCrawlUncheckedUpdateInput>;
};
/**
 * DiscoveryCrawl delete
 */
export type DiscoveryCrawlDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
    /**
     * Filter which DiscoveryCrawl to delete.
     */
    where: Prisma.DiscoveryCrawlWhereUniqueInput;
};
/**
 * DiscoveryCrawl deleteMany
 */
export type DiscoveryCrawlDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DiscoveryCrawls to delete
     */
    where?: Prisma.DiscoveryCrawlWhereInput;
    /**
     * Limit how many DiscoveryCrawls to delete.
     */
    limit?: number;
};
/**
 * DiscoveryCrawl without action
 */
export type DiscoveryCrawlDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCrawl
     */
    select?: Prisma.DiscoveryCrawlSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCrawl
     */
    omit?: Prisma.DiscoveryCrawlOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DiscoveryCrawl.d.ts.map