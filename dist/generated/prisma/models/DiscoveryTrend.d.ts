import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DiscoveryTrend
 * A detected trend across discoveries
 */
export type DiscoveryTrendModel = runtime.Types.Result.DefaultSelection<Prisma.$DiscoveryTrendPayload>;
export type AggregateDiscoveryTrend = {
    _count: DiscoveryTrendCountAggregateOutputType | null;
    _avg: DiscoveryTrendAvgAggregateOutputType | null;
    _sum: DiscoveryTrendSumAggregateOutputType | null;
    _min: DiscoveryTrendMinAggregateOutputType | null;
    _max: DiscoveryTrendMaxAggregateOutputType | null;
};
export type DiscoveryTrendAvgAggregateOutputType = {
    mentionCount: number | null;
    entityCount: number | null;
    sourceSpread: number | null;
    velocity: number | null;
    trendScore: number | null;
    emergingScore: number | null;
};
export type DiscoveryTrendSumAggregateOutputType = {
    mentionCount: number | null;
    entityCount: number | null;
    sourceSpread: number | null;
    velocity: number | null;
    trendScore: number | null;
    emergingScore: number | null;
};
export type DiscoveryTrendMinAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    name: string | null;
    description: string | null;
    category: string | null;
    mentionCount: number | null;
    entityCount: number | null;
    sourceSpread: number | null;
    velocity: number | null;
    firstSeenAt: Date | null;
    lastSeenAt: Date | null;
    peakAt: Date | null;
    trendScore: number | null;
    emergingScore: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DiscoveryTrendMaxAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    name: string | null;
    description: string | null;
    category: string | null;
    mentionCount: number | null;
    entityCount: number | null;
    sourceSpread: number | null;
    velocity: number | null;
    firstSeenAt: Date | null;
    lastSeenAt: Date | null;
    peakAt: Date | null;
    trendScore: number | null;
    emergingScore: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DiscoveryTrendCountAggregateOutputType = {
    id: number;
    projectId: number;
    name: number;
    description: number;
    category: number;
    mentionCount: number;
    entityCount: number;
    sourceSpread: number;
    velocity: number;
    firstSeenAt: number;
    lastSeenAt: number;
    peakAt: number;
    entityIds: number;
    keywords: number;
    trendScore: number;
    emergingScore: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DiscoveryTrendAvgAggregateInputType = {
    mentionCount?: true;
    entityCount?: true;
    sourceSpread?: true;
    velocity?: true;
    trendScore?: true;
    emergingScore?: true;
};
export type DiscoveryTrendSumAggregateInputType = {
    mentionCount?: true;
    entityCount?: true;
    sourceSpread?: true;
    velocity?: true;
    trendScore?: true;
    emergingScore?: true;
};
export type DiscoveryTrendMinAggregateInputType = {
    id?: true;
    projectId?: true;
    name?: true;
    description?: true;
    category?: true;
    mentionCount?: true;
    entityCount?: true;
    sourceSpread?: true;
    velocity?: true;
    firstSeenAt?: true;
    lastSeenAt?: true;
    peakAt?: true;
    trendScore?: true;
    emergingScore?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DiscoveryTrendMaxAggregateInputType = {
    id?: true;
    projectId?: true;
    name?: true;
    description?: true;
    category?: true;
    mentionCount?: true;
    entityCount?: true;
    sourceSpread?: true;
    velocity?: true;
    firstSeenAt?: true;
    lastSeenAt?: true;
    peakAt?: true;
    trendScore?: true;
    emergingScore?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DiscoveryTrendCountAggregateInputType = {
    id?: true;
    projectId?: true;
    name?: true;
    description?: true;
    category?: true;
    mentionCount?: true;
    entityCount?: true;
    sourceSpread?: true;
    velocity?: true;
    firstSeenAt?: true;
    lastSeenAt?: true;
    peakAt?: true;
    entityIds?: true;
    keywords?: true;
    trendScore?: true;
    emergingScore?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DiscoveryTrendAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DiscoveryTrend to aggregate.
     */
    where?: Prisma.DiscoveryTrendWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryTrends to fetch.
     */
    orderBy?: Prisma.DiscoveryTrendOrderByWithRelationInput | Prisma.DiscoveryTrendOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DiscoveryTrendWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryTrends from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryTrends.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DiscoveryTrends
    **/
    _count?: true | DiscoveryTrendCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DiscoveryTrendAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DiscoveryTrendSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DiscoveryTrendMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DiscoveryTrendMaxAggregateInputType;
};
export type GetDiscoveryTrendAggregateType<T extends DiscoveryTrendAggregateArgs> = {
    [P in keyof T & keyof AggregateDiscoveryTrend]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiscoveryTrend[P]> : Prisma.GetScalarType<T[P], AggregateDiscoveryTrend[P]>;
};
export type DiscoveryTrendGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscoveryTrendWhereInput;
    orderBy?: Prisma.DiscoveryTrendOrderByWithAggregationInput | Prisma.DiscoveryTrendOrderByWithAggregationInput[];
    by: Prisma.DiscoveryTrendScalarFieldEnum[] | Prisma.DiscoveryTrendScalarFieldEnum;
    having?: Prisma.DiscoveryTrendScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiscoveryTrendCountAggregateInputType | true;
    _avg?: DiscoveryTrendAvgAggregateInputType;
    _sum?: DiscoveryTrendSumAggregateInputType;
    _min?: DiscoveryTrendMinAggregateInputType;
    _max?: DiscoveryTrendMaxAggregateInputType;
};
export type DiscoveryTrendGroupByOutputType = {
    id: string;
    projectId: string | null;
    name: string;
    description: string | null;
    category: string | null;
    mentionCount: number;
    entityCount: number;
    sourceSpread: number;
    velocity: number | null;
    firstSeenAt: Date;
    lastSeenAt: Date;
    peakAt: Date | null;
    entityIds: runtime.JsonValue | null;
    keywords: runtime.JsonValue | null;
    trendScore: number | null;
    emergingScore: number | null;
    createdAt: Date;
    updatedAt: Date;
    _count: DiscoveryTrendCountAggregateOutputType | null;
    _avg: DiscoveryTrendAvgAggregateOutputType | null;
    _sum: DiscoveryTrendSumAggregateOutputType | null;
    _min: DiscoveryTrendMinAggregateOutputType | null;
    _max: DiscoveryTrendMaxAggregateOutputType | null;
};
type GetDiscoveryTrendGroupByPayload<T extends DiscoveryTrendGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiscoveryTrendGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiscoveryTrendGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiscoveryTrendGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiscoveryTrendGroupByOutputType[P]>;
}>>;
export type DiscoveryTrendWhereInput = {
    AND?: Prisma.DiscoveryTrendWhereInput | Prisma.DiscoveryTrendWhereInput[];
    OR?: Prisma.DiscoveryTrendWhereInput[];
    NOT?: Prisma.DiscoveryTrendWhereInput | Prisma.DiscoveryTrendWhereInput[];
    id?: Prisma.StringFilter<"DiscoveryTrend"> | string;
    projectId?: Prisma.StringNullableFilter<"DiscoveryTrend"> | string | null;
    name?: Prisma.StringFilter<"DiscoveryTrend"> | string;
    description?: Prisma.StringNullableFilter<"DiscoveryTrend"> | string | null;
    category?: Prisma.StringNullableFilter<"DiscoveryTrend"> | string | null;
    mentionCount?: Prisma.IntFilter<"DiscoveryTrend"> | number;
    entityCount?: Prisma.IntFilter<"DiscoveryTrend"> | number;
    sourceSpread?: Prisma.IntFilter<"DiscoveryTrend"> | number;
    velocity?: Prisma.FloatNullableFilter<"DiscoveryTrend"> | number | null;
    firstSeenAt?: Prisma.DateTimeFilter<"DiscoveryTrend"> | Date | string;
    lastSeenAt?: Prisma.DateTimeFilter<"DiscoveryTrend"> | Date | string;
    peakAt?: Prisma.DateTimeNullableFilter<"DiscoveryTrend"> | Date | string | null;
    entityIds?: Prisma.JsonNullableFilter<"DiscoveryTrend">;
    keywords?: Prisma.JsonNullableFilter<"DiscoveryTrend">;
    trendScore?: Prisma.FloatNullableFilter<"DiscoveryTrend"> | number | null;
    emergingScore?: Prisma.FloatNullableFilter<"DiscoveryTrend"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"DiscoveryTrend"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DiscoveryTrend"> | Date | string;
};
export type DiscoveryTrendOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    mentionCount?: Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    sourceSpread?: Prisma.SortOrder;
    velocity?: Prisma.SortOrderInput | Prisma.SortOrder;
    firstSeenAt?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    peakAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityIds?: Prisma.SortOrderInput | Prisma.SortOrder;
    keywords?: Prisma.SortOrderInput | Prisma.SortOrder;
    trendScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    emergingScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiscoveryTrendWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DiscoveryTrendWhereInput | Prisma.DiscoveryTrendWhereInput[];
    OR?: Prisma.DiscoveryTrendWhereInput[];
    NOT?: Prisma.DiscoveryTrendWhereInput | Prisma.DiscoveryTrendWhereInput[];
    projectId?: Prisma.StringNullableFilter<"DiscoveryTrend"> | string | null;
    name?: Prisma.StringFilter<"DiscoveryTrend"> | string;
    description?: Prisma.StringNullableFilter<"DiscoveryTrend"> | string | null;
    category?: Prisma.StringNullableFilter<"DiscoveryTrend"> | string | null;
    mentionCount?: Prisma.IntFilter<"DiscoveryTrend"> | number;
    entityCount?: Prisma.IntFilter<"DiscoveryTrend"> | number;
    sourceSpread?: Prisma.IntFilter<"DiscoveryTrend"> | number;
    velocity?: Prisma.FloatNullableFilter<"DiscoveryTrend"> | number | null;
    firstSeenAt?: Prisma.DateTimeFilter<"DiscoveryTrend"> | Date | string;
    lastSeenAt?: Prisma.DateTimeFilter<"DiscoveryTrend"> | Date | string;
    peakAt?: Prisma.DateTimeNullableFilter<"DiscoveryTrend"> | Date | string | null;
    entityIds?: Prisma.JsonNullableFilter<"DiscoveryTrend">;
    keywords?: Prisma.JsonNullableFilter<"DiscoveryTrend">;
    trendScore?: Prisma.FloatNullableFilter<"DiscoveryTrend"> | number | null;
    emergingScore?: Prisma.FloatNullableFilter<"DiscoveryTrend"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"DiscoveryTrend"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DiscoveryTrend"> | Date | string;
}, "id">;
export type DiscoveryTrendOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    mentionCount?: Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    sourceSpread?: Prisma.SortOrder;
    velocity?: Prisma.SortOrderInput | Prisma.SortOrder;
    firstSeenAt?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    peakAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityIds?: Prisma.SortOrderInput | Prisma.SortOrder;
    keywords?: Prisma.SortOrderInput | Prisma.SortOrder;
    trendScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    emergingScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DiscoveryTrendCountOrderByAggregateInput;
    _avg?: Prisma.DiscoveryTrendAvgOrderByAggregateInput;
    _max?: Prisma.DiscoveryTrendMaxOrderByAggregateInput;
    _min?: Prisma.DiscoveryTrendMinOrderByAggregateInput;
    _sum?: Prisma.DiscoveryTrendSumOrderByAggregateInput;
};
export type DiscoveryTrendScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiscoveryTrendScalarWhereWithAggregatesInput | Prisma.DiscoveryTrendScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiscoveryTrendScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiscoveryTrendScalarWhereWithAggregatesInput | Prisma.DiscoveryTrendScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DiscoveryTrend"> | string;
    projectId?: Prisma.StringNullableWithAggregatesFilter<"DiscoveryTrend"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"DiscoveryTrend"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"DiscoveryTrend"> | string | null;
    category?: Prisma.StringNullableWithAggregatesFilter<"DiscoveryTrend"> | string | null;
    mentionCount?: Prisma.IntWithAggregatesFilter<"DiscoveryTrend"> | number;
    entityCount?: Prisma.IntWithAggregatesFilter<"DiscoveryTrend"> | number;
    sourceSpread?: Prisma.IntWithAggregatesFilter<"DiscoveryTrend"> | number;
    velocity?: Prisma.FloatNullableWithAggregatesFilter<"DiscoveryTrend"> | number | null;
    firstSeenAt?: Prisma.DateTimeWithAggregatesFilter<"DiscoveryTrend"> | Date | string;
    lastSeenAt?: Prisma.DateTimeWithAggregatesFilter<"DiscoveryTrend"> | Date | string;
    peakAt?: Prisma.DateTimeNullableWithAggregatesFilter<"DiscoveryTrend"> | Date | string | null;
    entityIds?: Prisma.JsonNullableWithAggregatesFilter<"DiscoveryTrend">;
    keywords?: Prisma.JsonNullableWithAggregatesFilter<"DiscoveryTrend">;
    trendScore?: Prisma.FloatNullableWithAggregatesFilter<"DiscoveryTrend"> | number | null;
    emergingScore?: Prisma.FloatNullableWithAggregatesFilter<"DiscoveryTrend"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DiscoveryTrend"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DiscoveryTrend"> | Date | string;
};
export type DiscoveryTrendCreateInput = {
    id?: string;
    projectId?: string | null;
    name: string;
    description?: string | null;
    category?: string | null;
    mentionCount?: number;
    entityCount?: number;
    sourceSpread?: number;
    velocity?: number | null;
    firstSeenAt: Date | string;
    lastSeenAt: Date | string;
    peakAt?: Date | string | null;
    entityIds?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    keywords?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    trendScore?: number | null;
    emergingScore?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiscoveryTrendUncheckedCreateInput = {
    id?: string;
    projectId?: string | null;
    name: string;
    description?: string | null;
    category?: string | null;
    mentionCount?: number;
    entityCount?: number;
    sourceSpread?: number;
    velocity?: number | null;
    firstSeenAt: Date | string;
    lastSeenAt: Date | string;
    peakAt?: Date | string | null;
    entityIds?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    keywords?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    trendScore?: number | null;
    emergingScore?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiscoveryTrendUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mentionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    entityCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sourceSpread?: Prisma.IntFieldUpdateOperationsInput | number;
    velocity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    firstSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peakAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    entityIds?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    keywords?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    trendScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    emergingScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscoveryTrendUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mentionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    entityCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sourceSpread?: Prisma.IntFieldUpdateOperationsInput | number;
    velocity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    firstSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peakAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    entityIds?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    keywords?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    trendScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    emergingScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscoveryTrendCreateManyInput = {
    id?: string;
    projectId?: string | null;
    name: string;
    description?: string | null;
    category?: string | null;
    mentionCount?: number;
    entityCount?: number;
    sourceSpread?: number;
    velocity?: number | null;
    firstSeenAt: Date | string;
    lastSeenAt: Date | string;
    peakAt?: Date | string | null;
    entityIds?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    keywords?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    trendScore?: number | null;
    emergingScore?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiscoveryTrendUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mentionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    entityCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sourceSpread?: Prisma.IntFieldUpdateOperationsInput | number;
    velocity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    firstSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peakAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    entityIds?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    keywords?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    trendScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    emergingScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscoveryTrendUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mentionCount?: Prisma.IntFieldUpdateOperationsInput | number;
    entityCount?: Prisma.IntFieldUpdateOperationsInput | number;
    sourceSpread?: Prisma.IntFieldUpdateOperationsInput | number;
    velocity?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    firstSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    peakAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    entityIds?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    keywords?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    trendScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    emergingScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscoveryTrendCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    mentionCount?: Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    sourceSpread?: Prisma.SortOrder;
    velocity?: Prisma.SortOrder;
    firstSeenAt?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    peakAt?: Prisma.SortOrder;
    entityIds?: Prisma.SortOrder;
    keywords?: Prisma.SortOrder;
    trendScore?: Prisma.SortOrder;
    emergingScore?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiscoveryTrendAvgOrderByAggregateInput = {
    mentionCount?: Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    sourceSpread?: Prisma.SortOrder;
    velocity?: Prisma.SortOrder;
    trendScore?: Prisma.SortOrder;
    emergingScore?: Prisma.SortOrder;
};
export type DiscoveryTrendMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    mentionCount?: Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    sourceSpread?: Prisma.SortOrder;
    velocity?: Prisma.SortOrder;
    firstSeenAt?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    peakAt?: Prisma.SortOrder;
    trendScore?: Prisma.SortOrder;
    emergingScore?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiscoveryTrendMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    mentionCount?: Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    sourceSpread?: Prisma.SortOrder;
    velocity?: Prisma.SortOrder;
    firstSeenAt?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    peakAt?: Prisma.SortOrder;
    trendScore?: Prisma.SortOrder;
    emergingScore?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiscoveryTrendSumOrderByAggregateInput = {
    mentionCount?: Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    sourceSpread?: Prisma.SortOrder;
    velocity?: Prisma.SortOrder;
    trendScore?: Prisma.SortOrder;
    emergingScore?: Prisma.SortOrder;
};
export type DiscoveryTrendSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    name?: boolean;
    description?: boolean;
    category?: boolean;
    mentionCount?: boolean;
    entityCount?: boolean;
    sourceSpread?: boolean;
    velocity?: boolean;
    firstSeenAt?: boolean;
    lastSeenAt?: boolean;
    peakAt?: boolean;
    entityIds?: boolean;
    keywords?: boolean;
    trendScore?: boolean;
    emergingScore?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["discoveryTrend"]>;
export type DiscoveryTrendSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    name?: boolean;
    description?: boolean;
    category?: boolean;
    mentionCount?: boolean;
    entityCount?: boolean;
    sourceSpread?: boolean;
    velocity?: boolean;
    firstSeenAt?: boolean;
    lastSeenAt?: boolean;
    peakAt?: boolean;
    entityIds?: boolean;
    keywords?: boolean;
    trendScore?: boolean;
    emergingScore?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["discoveryTrend"]>;
export type DiscoveryTrendSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    name?: boolean;
    description?: boolean;
    category?: boolean;
    mentionCount?: boolean;
    entityCount?: boolean;
    sourceSpread?: boolean;
    velocity?: boolean;
    firstSeenAt?: boolean;
    lastSeenAt?: boolean;
    peakAt?: boolean;
    entityIds?: boolean;
    keywords?: boolean;
    trendScore?: boolean;
    emergingScore?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["discoveryTrend"]>;
export type DiscoveryTrendSelectScalar = {
    id?: boolean;
    projectId?: boolean;
    name?: boolean;
    description?: boolean;
    category?: boolean;
    mentionCount?: boolean;
    entityCount?: boolean;
    sourceSpread?: boolean;
    velocity?: boolean;
    firstSeenAt?: boolean;
    lastSeenAt?: boolean;
    peakAt?: boolean;
    entityIds?: boolean;
    keywords?: boolean;
    trendScore?: boolean;
    emergingScore?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DiscoveryTrendOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "projectId" | "name" | "description" | "category" | "mentionCount" | "entityCount" | "sourceSpread" | "velocity" | "firstSeenAt" | "lastSeenAt" | "peakAt" | "entityIds" | "keywords" | "trendScore" | "emergingScore" | "createdAt" | "updatedAt", ExtArgs["result"]["discoveryTrend"]>;
export type $DiscoveryTrendPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DiscoveryTrend";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        projectId: string | null;
        name: string;
        description: string | null;
        category: string | null;
        mentionCount: number;
        entityCount: number;
        sourceSpread: number;
        velocity: number | null;
        firstSeenAt: Date;
        lastSeenAt: Date;
        peakAt: Date | null;
        entityIds: runtime.JsonValue | null;
        keywords: runtime.JsonValue | null;
        trendScore: number | null;
        emergingScore: number | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["discoveryTrend"]>;
    composites: {};
};
export type DiscoveryTrendGetPayload<S extends boolean | null | undefined | DiscoveryTrendDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload, S>;
export type DiscoveryTrendCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiscoveryTrendFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiscoveryTrendCountAggregateInputType | true;
};
export interface DiscoveryTrendDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DiscoveryTrend'];
        meta: {
            name: 'DiscoveryTrend';
        };
    };
    /**
     * Find zero or one DiscoveryTrend that matches the filter.
     * @param {DiscoveryTrendFindUniqueArgs} args - Arguments to find a DiscoveryTrend
     * @example
     * // Get one DiscoveryTrend
     * const discoveryTrend = await prisma.discoveryTrend.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscoveryTrendFindUniqueArgs>(args: Prisma.SelectSubset<T, DiscoveryTrendFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiscoveryTrendClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DiscoveryTrend that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiscoveryTrendFindUniqueOrThrowArgs} args - Arguments to find a DiscoveryTrend
     * @example
     * // Get one DiscoveryTrend
     * const discoveryTrend = await prisma.discoveryTrend.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscoveryTrendFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiscoveryTrendFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiscoveryTrendClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DiscoveryTrend that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryTrendFindFirstArgs} args - Arguments to find a DiscoveryTrend
     * @example
     * // Get one DiscoveryTrend
     * const discoveryTrend = await prisma.discoveryTrend.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscoveryTrendFindFirstArgs>(args?: Prisma.SelectSubset<T, DiscoveryTrendFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiscoveryTrendClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DiscoveryTrend that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryTrendFindFirstOrThrowArgs} args - Arguments to find a DiscoveryTrend
     * @example
     * // Get one DiscoveryTrend
     * const discoveryTrend = await prisma.discoveryTrend.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscoveryTrendFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiscoveryTrendFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiscoveryTrendClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DiscoveryTrends that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryTrendFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscoveryTrends
     * const discoveryTrends = await prisma.discoveryTrend.findMany()
     *
     * // Get first 10 DiscoveryTrends
     * const discoveryTrends = await prisma.discoveryTrend.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const discoveryTrendWithIdOnly = await prisma.discoveryTrend.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DiscoveryTrendFindManyArgs>(args?: Prisma.SelectSubset<T, DiscoveryTrendFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DiscoveryTrend.
     * @param {DiscoveryTrendCreateArgs} args - Arguments to create a DiscoveryTrend.
     * @example
     * // Create one DiscoveryTrend
     * const DiscoveryTrend = await prisma.discoveryTrend.create({
     *   data: {
     *     // ... data to create a DiscoveryTrend
     *   }
     * })
     *
     */
    create<T extends DiscoveryTrendCreateArgs>(args: Prisma.SelectSubset<T, DiscoveryTrendCreateArgs<ExtArgs>>): Prisma.Prisma__DiscoveryTrendClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DiscoveryTrends.
     * @param {DiscoveryTrendCreateManyArgs} args - Arguments to create many DiscoveryTrends.
     * @example
     * // Create many DiscoveryTrends
     * const discoveryTrend = await prisma.discoveryTrend.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DiscoveryTrendCreateManyArgs>(args?: Prisma.SelectSubset<T, DiscoveryTrendCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DiscoveryTrends and returns the data saved in the database.
     * @param {DiscoveryTrendCreateManyAndReturnArgs} args - Arguments to create many DiscoveryTrends.
     * @example
     * // Create many DiscoveryTrends
     * const discoveryTrend = await prisma.discoveryTrend.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DiscoveryTrends and only return the `id`
     * const discoveryTrendWithIdOnly = await prisma.discoveryTrend.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DiscoveryTrendCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiscoveryTrendCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DiscoveryTrend.
     * @param {DiscoveryTrendDeleteArgs} args - Arguments to delete one DiscoveryTrend.
     * @example
     * // Delete one DiscoveryTrend
     * const DiscoveryTrend = await prisma.discoveryTrend.delete({
     *   where: {
     *     // ... filter to delete one DiscoveryTrend
     *   }
     * })
     *
     */
    delete<T extends DiscoveryTrendDeleteArgs>(args: Prisma.SelectSubset<T, DiscoveryTrendDeleteArgs<ExtArgs>>): Prisma.Prisma__DiscoveryTrendClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DiscoveryTrend.
     * @param {DiscoveryTrendUpdateArgs} args - Arguments to update one DiscoveryTrend.
     * @example
     * // Update one DiscoveryTrend
     * const discoveryTrend = await prisma.discoveryTrend.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DiscoveryTrendUpdateArgs>(args: Prisma.SelectSubset<T, DiscoveryTrendUpdateArgs<ExtArgs>>): Prisma.Prisma__DiscoveryTrendClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DiscoveryTrends.
     * @param {DiscoveryTrendDeleteManyArgs} args - Arguments to filter DiscoveryTrends to delete.
     * @example
     * // Delete a few DiscoveryTrends
     * const { count } = await prisma.discoveryTrend.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DiscoveryTrendDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiscoveryTrendDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DiscoveryTrends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryTrendUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscoveryTrends
     * const discoveryTrend = await prisma.discoveryTrend.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DiscoveryTrendUpdateManyArgs>(args: Prisma.SelectSubset<T, DiscoveryTrendUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DiscoveryTrends and returns the data updated in the database.
     * @param {DiscoveryTrendUpdateManyAndReturnArgs} args - Arguments to update many DiscoveryTrends.
     * @example
     * // Update many DiscoveryTrends
     * const discoveryTrend = await prisma.discoveryTrend.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DiscoveryTrends and only return the `id`
     * const discoveryTrendWithIdOnly = await prisma.discoveryTrend.updateManyAndReturn({
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
    updateManyAndReturn<T extends DiscoveryTrendUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiscoveryTrendUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DiscoveryTrend.
     * @param {DiscoveryTrendUpsertArgs} args - Arguments to update or create a DiscoveryTrend.
     * @example
     * // Update or create a DiscoveryTrend
     * const discoveryTrend = await prisma.discoveryTrend.upsert({
     *   create: {
     *     // ... data to create a DiscoveryTrend
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscoveryTrend we want to update
     *   }
     * })
     */
    upsert<T extends DiscoveryTrendUpsertArgs>(args: Prisma.SelectSubset<T, DiscoveryTrendUpsertArgs<ExtArgs>>): Prisma.Prisma__DiscoveryTrendClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryTrendPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DiscoveryTrends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryTrendCountArgs} args - Arguments to filter DiscoveryTrends to count.
     * @example
     * // Count the number of DiscoveryTrends
     * const count = await prisma.discoveryTrend.count({
     *   where: {
     *     // ... the filter for the DiscoveryTrends we want to count
     *   }
     * })
    **/
    count<T extends DiscoveryTrendCountArgs>(args?: Prisma.Subset<T, DiscoveryTrendCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiscoveryTrendCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DiscoveryTrend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryTrendAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DiscoveryTrendAggregateArgs>(args: Prisma.Subset<T, DiscoveryTrendAggregateArgs>): Prisma.PrismaPromise<GetDiscoveryTrendAggregateType<T>>;
    /**
     * Group by DiscoveryTrend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryTrendGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DiscoveryTrendGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiscoveryTrendGroupByArgs['orderBy'];
    } : {
        orderBy?: DiscoveryTrendGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiscoveryTrendGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscoveryTrendGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DiscoveryTrend model
     */
    readonly fields: DiscoveryTrendFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DiscoveryTrend.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DiscoveryTrendClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the DiscoveryTrend model
 */
export interface DiscoveryTrendFieldRefs {
    readonly id: Prisma.FieldRef<"DiscoveryTrend", 'String'>;
    readonly projectId: Prisma.FieldRef<"DiscoveryTrend", 'String'>;
    readonly name: Prisma.FieldRef<"DiscoveryTrend", 'String'>;
    readonly description: Prisma.FieldRef<"DiscoveryTrend", 'String'>;
    readonly category: Prisma.FieldRef<"DiscoveryTrend", 'String'>;
    readonly mentionCount: Prisma.FieldRef<"DiscoveryTrend", 'Int'>;
    readonly entityCount: Prisma.FieldRef<"DiscoveryTrend", 'Int'>;
    readonly sourceSpread: Prisma.FieldRef<"DiscoveryTrend", 'Int'>;
    readonly velocity: Prisma.FieldRef<"DiscoveryTrend", 'Float'>;
    readonly firstSeenAt: Prisma.FieldRef<"DiscoveryTrend", 'DateTime'>;
    readonly lastSeenAt: Prisma.FieldRef<"DiscoveryTrend", 'DateTime'>;
    readonly peakAt: Prisma.FieldRef<"DiscoveryTrend", 'DateTime'>;
    readonly entityIds: Prisma.FieldRef<"DiscoveryTrend", 'Json'>;
    readonly keywords: Prisma.FieldRef<"DiscoveryTrend", 'Json'>;
    readonly trendScore: Prisma.FieldRef<"DiscoveryTrend", 'Float'>;
    readonly emergingScore: Prisma.FieldRef<"DiscoveryTrend", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"DiscoveryTrend", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DiscoveryTrend", 'DateTime'>;
}
/**
 * DiscoveryTrend findUnique
 */
export type DiscoveryTrendFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * Filter, which DiscoveryTrend to fetch.
     */
    where: Prisma.DiscoveryTrendWhereUniqueInput;
};
/**
 * DiscoveryTrend findUniqueOrThrow
 */
export type DiscoveryTrendFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * Filter, which DiscoveryTrend to fetch.
     */
    where: Prisma.DiscoveryTrendWhereUniqueInput;
};
/**
 * DiscoveryTrend findFirst
 */
export type DiscoveryTrendFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * Filter, which DiscoveryTrend to fetch.
     */
    where?: Prisma.DiscoveryTrendWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryTrends to fetch.
     */
    orderBy?: Prisma.DiscoveryTrendOrderByWithRelationInput | Prisma.DiscoveryTrendOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DiscoveryTrends.
     */
    cursor?: Prisma.DiscoveryTrendWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryTrends from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryTrends.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DiscoveryTrends.
     */
    distinct?: Prisma.DiscoveryTrendScalarFieldEnum | Prisma.DiscoveryTrendScalarFieldEnum[];
};
/**
 * DiscoveryTrend findFirstOrThrow
 */
export type DiscoveryTrendFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * Filter, which DiscoveryTrend to fetch.
     */
    where?: Prisma.DiscoveryTrendWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryTrends to fetch.
     */
    orderBy?: Prisma.DiscoveryTrendOrderByWithRelationInput | Prisma.DiscoveryTrendOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DiscoveryTrends.
     */
    cursor?: Prisma.DiscoveryTrendWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryTrends from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryTrends.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DiscoveryTrends.
     */
    distinct?: Prisma.DiscoveryTrendScalarFieldEnum | Prisma.DiscoveryTrendScalarFieldEnum[];
};
/**
 * DiscoveryTrend findMany
 */
export type DiscoveryTrendFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * Filter, which DiscoveryTrends to fetch.
     */
    where?: Prisma.DiscoveryTrendWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryTrends to fetch.
     */
    orderBy?: Prisma.DiscoveryTrendOrderByWithRelationInput | Prisma.DiscoveryTrendOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DiscoveryTrends.
     */
    cursor?: Prisma.DiscoveryTrendWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryTrends from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryTrends.
     */
    skip?: number;
    distinct?: Prisma.DiscoveryTrendScalarFieldEnum | Prisma.DiscoveryTrendScalarFieldEnum[];
};
/**
 * DiscoveryTrend create
 */
export type DiscoveryTrendCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * The data needed to create a DiscoveryTrend.
     */
    data: Prisma.XOR<Prisma.DiscoveryTrendCreateInput, Prisma.DiscoveryTrendUncheckedCreateInput>;
};
/**
 * DiscoveryTrend createMany
 */
export type DiscoveryTrendCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiscoveryTrends.
     */
    data: Prisma.DiscoveryTrendCreateManyInput | Prisma.DiscoveryTrendCreateManyInput[];
};
/**
 * DiscoveryTrend createManyAndReturn
 */
export type DiscoveryTrendCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * The data used to create many DiscoveryTrends.
     */
    data: Prisma.DiscoveryTrendCreateManyInput | Prisma.DiscoveryTrendCreateManyInput[];
};
/**
 * DiscoveryTrend update
 */
export type DiscoveryTrendUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * The data needed to update a DiscoveryTrend.
     */
    data: Prisma.XOR<Prisma.DiscoveryTrendUpdateInput, Prisma.DiscoveryTrendUncheckedUpdateInput>;
    /**
     * Choose, which DiscoveryTrend to update.
     */
    where: Prisma.DiscoveryTrendWhereUniqueInput;
};
/**
 * DiscoveryTrend updateMany
 */
export type DiscoveryTrendUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DiscoveryTrends.
     */
    data: Prisma.XOR<Prisma.DiscoveryTrendUpdateManyMutationInput, Prisma.DiscoveryTrendUncheckedUpdateManyInput>;
    /**
     * Filter which DiscoveryTrends to update
     */
    where?: Prisma.DiscoveryTrendWhereInput;
    /**
     * Limit how many DiscoveryTrends to update.
     */
    limit?: number;
};
/**
 * DiscoveryTrend updateManyAndReturn
 */
export type DiscoveryTrendUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * The data used to update DiscoveryTrends.
     */
    data: Prisma.XOR<Prisma.DiscoveryTrendUpdateManyMutationInput, Prisma.DiscoveryTrendUncheckedUpdateManyInput>;
    /**
     * Filter which DiscoveryTrends to update
     */
    where?: Prisma.DiscoveryTrendWhereInput;
    /**
     * Limit how many DiscoveryTrends to update.
     */
    limit?: number;
};
/**
 * DiscoveryTrend upsert
 */
export type DiscoveryTrendUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * The filter to search for the DiscoveryTrend to update in case it exists.
     */
    where: Prisma.DiscoveryTrendWhereUniqueInput;
    /**
     * In case the DiscoveryTrend found by the `where` argument doesn't exist, create a new DiscoveryTrend with this data.
     */
    create: Prisma.XOR<Prisma.DiscoveryTrendCreateInput, Prisma.DiscoveryTrendUncheckedCreateInput>;
    /**
     * In case the DiscoveryTrend was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DiscoveryTrendUpdateInput, Prisma.DiscoveryTrendUncheckedUpdateInput>;
};
/**
 * DiscoveryTrend delete
 */
export type DiscoveryTrendDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
    /**
     * Filter which DiscoveryTrend to delete.
     */
    where: Prisma.DiscoveryTrendWhereUniqueInput;
};
/**
 * DiscoveryTrend deleteMany
 */
export type DiscoveryTrendDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DiscoveryTrends to delete
     */
    where?: Prisma.DiscoveryTrendWhereInput;
    /**
     * Limit how many DiscoveryTrends to delete.
     */
    limit?: number;
};
/**
 * DiscoveryTrend without action
 */
export type DiscoveryTrendDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryTrend
     */
    select?: Prisma.DiscoveryTrendSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryTrend
     */
    omit?: Prisma.DiscoveryTrendOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DiscoveryTrend.d.ts.map