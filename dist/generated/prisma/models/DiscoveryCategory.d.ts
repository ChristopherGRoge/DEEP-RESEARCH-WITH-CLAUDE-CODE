import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model DiscoveryCategory
 * A category definition for LLM-based entity classification
 * Replaces regex-based classification with semantic understanding
 */
export type DiscoveryCategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$DiscoveryCategoryPayload>;
export type AggregateDiscoveryCategory = {
    _count: DiscoveryCategoryCountAggregateOutputType | null;
    _avg: DiscoveryCategoryAvgAggregateOutputType | null;
    _sum: DiscoveryCategorySumAggregateOutputType | null;
    _min: DiscoveryCategoryMinAggregateOutputType | null;
    _max: DiscoveryCategoryMaxAggregateOutputType | null;
};
export type DiscoveryCategoryAvgAggregateOutputType = {
    entityCount: number | null;
};
export type DiscoveryCategorySumAggregateOutputType = {
    entityCount: number | null;
};
export type DiscoveryCategoryMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    displayName: string | null;
    description: string | null;
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    entityCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DiscoveryCategoryMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    displayName: string | null;
    description: string | null;
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    entityCount: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DiscoveryCategoryCountAggregateOutputType = {
    id: number;
    name: number;
    displayName: number;
    description: number;
    inclusionCriteria: number;
    exclusionCriteria: number;
    exemplarEntities: number;
    antiExemplars: number;
    entityCount: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DiscoveryCategoryAvgAggregateInputType = {
    entityCount?: true;
};
export type DiscoveryCategorySumAggregateInputType = {
    entityCount?: true;
};
export type DiscoveryCategoryMinAggregateInputType = {
    id?: true;
    name?: true;
    displayName?: true;
    description?: true;
    inclusionCriteria?: true;
    exclusionCriteria?: true;
    entityCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DiscoveryCategoryMaxAggregateInputType = {
    id?: true;
    name?: true;
    displayName?: true;
    description?: true;
    inclusionCriteria?: true;
    exclusionCriteria?: true;
    entityCount?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DiscoveryCategoryCountAggregateInputType = {
    id?: true;
    name?: true;
    displayName?: true;
    description?: true;
    inclusionCriteria?: true;
    exclusionCriteria?: true;
    exemplarEntities?: true;
    antiExemplars?: true;
    entityCount?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DiscoveryCategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DiscoveryCategory to aggregate.
     */
    where?: Prisma.DiscoveryCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryCategories to fetch.
     */
    orderBy?: Prisma.DiscoveryCategoryOrderByWithRelationInput | Prisma.DiscoveryCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.DiscoveryCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryCategories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned DiscoveryCategories
    **/
    _count?: true | DiscoveryCategoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DiscoveryCategoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DiscoveryCategorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DiscoveryCategoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DiscoveryCategoryMaxAggregateInputType;
};
export type GetDiscoveryCategoryAggregateType<T extends DiscoveryCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateDiscoveryCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiscoveryCategory[P]> : Prisma.GetScalarType<T[P], AggregateDiscoveryCategory[P]>;
};
export type DiscoveryCategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscoveryCategoryWhereInput;
    orderBy?: Prisma.DiscoveryCategoryOrderByWithAggregationInput | Prisma.DiscoveryCategoryOrderByWithAggregationInput[];
    by: Prisma.DiscoveryCategoryScalarFieldEnum[] | Prisma.DiscoveryCategoryScalarFieldEnum;
    having?: Prisma.DiscoveryCategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiscoveryCategoryCountAggregateInputType | true;
    _avg?: DiscoveryCategoryAvgAggregateInputType;
    _sum?: DiscoveryCategorySumAggregateInputType;
    _min?: DiscoveryCategoryMinAggregateInputType;
    _max?: DiscoveryCategoryMaxAggregateInputType;
};
export type DiscoveryCategoryGroupByOutputType = {
    id: string;
    name: string;
    displayName: string;
    description: string;
    inclusionCriteria: string | null;
    exclusionCriteria: string | null;
    exemplarEntities: runtime.JsonValue | null;
    antiExemplars: runtime.JsonValue | null;
    entityCount: number;
    createdAt: Date;
    updatedAt: Date;
    _count: DiscoveryCategoryCountAggregateOutputType | null;
    _avg: DiscoveryCategoryAvgAggregateOutputType | null;
    _sum: DiscoveryCategorySumAggregateOutputType | null;
    _min: DiscoveryCategoryMinAggregateOutputType | null;
    _max: DiscoveryCategoryMaxAggregateOutputType | null;
};
type GetDiscoveryCategoryGroupByPayload<T extends DiscoveryCategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiscoveryCategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiscoveryCategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiscoveryCategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiscoveryCategoryGroupByOutputType[P]>;
}>>;
export type DiscoveryCategoryWhereInput = {
    AND?: Prisma.DiscoveryCategoryWhereInput | Prisma.DiscoveryCategoryWhereInput[];
    OR?: Prisma.DiscoveryCategoryWhereInput[];
    NOT?: Prisma.DiscoveryCategoryWhereInput | Prisma.DiscoveryCategoryWhereInput[];
    id?: Prisma.StringFilter<"DiscoveryCategory"> | string;
    name?: Prisma.StringFilter<"DiscoveryCategory"> | string;
    displayName?: Prisma.StringFilter<"DiscoveryCategory"> | string;
    description?: Prisma.StringFilter<"DiscoveryCategory"> | string;
    inclusionCriteria?: Prisma.StringNullableFilter<"DiscoveryCategory"> | string | null;
    exclusionCriteria?: Prisma.StringNullableFilter<"DiscoveryCategory"> | string | null;
    exemplarEntities?: Prisma.JsonNullableFilter<"DiscoveryCategory">;
    antiExemplars?: Prisma.JsonNullableFilter<"DiscoveryCategory">;
    entityCount?: Prisma.IntFilter<"DiscoveryCategory"> | number;
    createdAt?: Prisma.DateTimeFilter<"DiscoveryCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DiscoveryCategory"> | Date | string;
    entities?: Prisma.EntityListRelationFilter;
};
export type DiscoveryCategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    inclusionCriteria?: Prisma.SortOrderInput | Prisma.SortOrder;
    exclusionCriteria?: Prisma.SortOrderInput | Prisma.SortOrder;
    exemplarEntities?: Prisma.SortOrderInput | Prisma.SortOrder;
    antiExemplars?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    entities?: Prisma.EntityOrderByRelationAggregateInput;
};
export type DiscoveryCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.DiscoveryCategoryWhereInput | Prisma.DiscoveryCategoryWhereInput[];
    OR?: Prisma.DiscoveryCategoryWhereInput[];
    NOT?: Prisma.DiscoveryCategoryWhereInput | Prisma.DiscoveryCategoryWhereInput[];
    displayName?: Prisma.StringFilter<"DiscoveryCategory"> | string;
    description?: Prisma.StringFilter<"DiscoveryCategory"> | string;
    inclusionCriteria?: Prisma.StringNullableFilter<"DiscoveryCategory"> | string | null;
    exclusionCriteria?: Prisma.StringNullableFilter<"DiscoveryCategory"> | string | null;
    exemplarEntities?: Prisma.JsonNullableFilter<"DiscoveryCategory">;
    antiExemplars?: Prisma.JsonNullableFilter<"DiscoveryCategory">;
    entityCount?: Prisma.IntFilter<"DiscoveryCategory"> | number;
    createdAt?: Prisma.DateTimeFilter<"DiscoveryCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DiscoveryCategory"> | Date | string;
    entities?: Prisma.EntityListRelationFilter;
}, "id" | "name">;
export type DiscoveryCategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    inclusionCriteria?: Prisma.SortOrderInput | Prisma.SortOrder;
    exclusionCriteria?: Prisma.SortOrderInput | Prisma.SortOrder;
    exemplarEntities?: Prisma.SortOrderInput | Prisma.SortOrder;
    antiExemplars?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DiscoveryCategoryCountOrderByAggregateInput;
    _avg?: Prisma.DiscoveryCategoryAvgOrderByAggregateInput;
    _max?: Prisma.DiscoveryCategoryMaxOrderByAggregateInput;
    _min?: Prisma.DiscoveryCategoryMinOrderByAggregateInput;
    _sum?: Prisma.DiscoveryCategorySumOrderByAggregateInput;
};
export type DiscoveryCategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiscoveryCategoryScalarWhereWithAggregatesInput | Prisma.DiscoveryCategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiscoveryCategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiscoveryCategoryScalarWhereWithAggregatesInput | Prisma.DiscoveryCategoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DiscoveryCategory"> | string;
    name?: Prisma.StringWithAggregatesFilter<"DiscoveryCategory"> | string;
    displayName?: Prisma.StringWithAggregatesFilter<"DiscoveryCategory"> | string;
    description?: Prisma.StringWithAggregatesFilter<"DiscoveryCategory"> | string;
    inclusionCriteria?: Prisma.StringNullableWithAggregatesFilter<"DiscoveryCategory"> | string | null;
    exclusionCriteria?: Prisma.StringNullableWithAggregatesFilter<"DiscoveryCategory"> | string | null;
    exemplarEntities?: Prisma.JsonNullableWithAggregatesFilter<"DiscoveryCategory">;
    antiExemplars?: Prisma.JsonNullableWithAggregatesFilter<"DiscoveryCategory">;
    entityCount?: Prisma.IntWithAggregatesFilter<"DiscoveryCategory"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DiscoveryCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DiscoveryCategory"> | Date | string;
};
export type DiscoveryCategoryCreateInput = {
    id?: string;
    name: string;
    displayName: string;
    description: string;
    inclusionCriteria?: string | null;
    exclusionCriteria?: string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entities?: Prisma.EntityCreateNestedManyWithoutCategoryInput;
};
export type DiscoveryCategoryUncheckedCreateInput = {
    id?: string;
    name: string;
    displayName: string;
    description: string;
    inclusionCriteria?: string | null;
    exclusionCriteria?: string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entities?: Prisma.EntityUncheckedCreateNestedManyWithoutCategoryInput;
};
export type DiscoveryCategoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    inclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entities?: Prisma.EntityUpdateManyWithoutCategoryNestedInput;
};
export type DiscoveryCategoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    inclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entities?: Prisma.EntityUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type DiscoveryCategoryCreateManyInput = {
    id?: string;
    name: string;
    displayName: string;
    description: string;
    inclusionCriteria?: string | null;
    exclusionCriteria?: string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiscoveryCategoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    inclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscoveryCategoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    inclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscoveryCategoryNullableScalarRelationFilter = {
    is?: Prisma.DiscoveryCategoryWhereInput | null;
    isNot?: Prisma.DiscoveryCategoryWhereInput | null;
};
export type DiscoveryCategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    inclusionCriteria?: Prisma.SortOrder;
    exclusionCriteria?: Prisma.SortOrder;
    exemplarEntities?: Prisma.SortOrder;
    antiExemplars?: Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiscoveryCategoryAvgOrderByAggregateInput = {
    entityCount?: Prisma.SortOrder;
};
export type DiscoveryCategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    inclusionCriteria?: Prisma.SortOrder;
    exclusionCriteria?: Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiscoveryCategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    inclusionCriteria?: Prisma.SortOrder;
    exclusionCriteria?: Prisma.SortOrder;
    entityCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DiscoveryCategorySumOrderByAggregateInput = {
    entityCount?: Prisma.SortOrder;
};
export type DiscoveryCategoryCreateNestedOneWithoutEntitiesInput = {
    create?: Prisma.XOR<Prisma.DiscoveryCategoryCreateWithoutEntitiesInput, Prisma.DiscoveryCategoryUncheckedCreateWithoutEntitiesInput>;
    connectOrCreate?: Prisma.DiscoveryCategoryCreateOrConnectWithoutEntitiesInput;
    connect?: Prisma.DiscoveryCategoryWhereUniqueInput;
};
export type DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput = {
    create?: Prisma.XOR<Prisma.DiscoveryCategoryCreateWithoutEntitiesInput, Prisma.DiscoveryCategoryUncheckedCreateWithoutEntitiesInput>;
    connectOrCreate?: Prisma.DiscoveryCategoryCreateOrConnectWithoutEntitiesInput;
    upsert?: Prisma.DiscoveryCategoryUpsertWithoutEntitiesInput;
    disconnect?: Prisma.DiscoveryCategoryWhereInput | boolean;
    delete?: Prisma.DiscoveryCategoryWhereInput | boolean;
    connect?: Prisma.DiscoveryCategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DiscoveryCategoryUpdateToOneWithWhereWithoutEntitiesInput, Prisma.DiscoveryCategoryUpdateWithoutEntitiesInput>, Prisma.DiscoveryCategoryUncheckedUpdateWithoutEntitiesInput>;
};
export type DiscoveryCategoryCreateWithoutEntitiesInput = {
    id?: string;
    name: string;
    displayName: string;
    description: string;
    inclusionCriteria?: string | null;
    exclusionCriteria?: string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiscoveryCategoryUncheckedCreateWithoutEntitiesInput = {
    id?: string;
    name: string;
    displayName: string;
    description: string;
    inclusionCriteria?: string | null;
    exclusionCriteria?: string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DiscoveryCategoryCreateOrConnectWithoutEntitiesInput = {
    where: Prisma.DiscoveryCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiscoveryCategoryCreateWithoutEntitiesInput, Prisma.DiscoveryCategoryUncheckedCreateWithoutEntitiesInput>;
};
export type DiscoveryCategoryUpsertWithoutEntitiesInput = {
    update: Prisma.XOR<Prisma.DiscoveryCategoryUpdateWithoutEntitiesInput, Prisma.DiscoveryCategoryUncheckedUpdateWithoutEntitiesInput>;
    create: Prisma.XOR<Prisma.DiscoveryCategoryCreateWithoutEntitiesInput, Prisma.DiscoveryCategoryUncheckedCreateWithoutEntitiesInput>;
    where?: Prisma.DiscoveryCategoryWhereInput;
};
export type DiscoveryCategoryUpdateToOneWithWhereWithoutEntitiesInput = {
    where?: Prisma.DiscoveryCategoryWhereInput;
    data: Prisma.XOR<Prisma.DiscoveryCategoryUpdateWithoutEntitiesInput, Prisma.DiscoveryCategoryUncheckedUpdateWithoutEntitiesInput>;
};
export type DiscoveryCategoryUpdateWithoutEntitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    inclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscoveryCategoryUncheckedUpdateWithoutEntitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    inclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exclusionCriteria?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    exemplarEntities?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    antiExemplars?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    entityCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type DiscoveryCategoryCountOutputType
 */
export type DiscoveryCategoryCountOutputType = {
    entities: number;
};
export type DiscoveryCategoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entities?: boolean | DiscoveryCategoryCountOutputTypeCountEntitiesArgs;
};
/**
 * DiscoveryCategoryCountOutputType without action
 */
export type DiscoveryCategoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategoryCountOutputType
     */
    select?: Prisma.DiscoveryCategoryCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * DiscoveryCategoryCountOutputType without action
 */
export type DiscoveryCategoryCountOutputTypeCountEntitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntityWhereInput;
};
export type DiscoveryCategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    displayName?: boolean;
    description?: boolean;
    inclusionCriteria?: boolean;
    exclusionCriteria?: boolean;
    exemplarEntities?: boolean;
    antiExemplars?: boolean;
    entityCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    entities?: boolean | Prisma.DiscoveryCategory$entitiesArgs<ExtArgs>;
    _count?: boolean | Prisma.DiscoveryCategoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["discoveryCategory"]>;
export type DiscoveryCategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    displayName?: boolean;
    description?: boolean;
    inclusionCriteria?: boolean;
    exclusionCriteria?: boolean;
    exemplarEntities?: boolean;
    antiExemplars?: boolean;
    entityCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["discoveryCategory"]>;
export type DiscoveryCategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    displayName?: boolean;
    description?: boolean;
    inclusionCriteria?: boolean;
    exclusionCriteria?: boolean;
    exemplarEntities?: boolean;
    antiExemplars?: boolean;
    entityCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["discoveryCategory"]>;
export type DiscoveryCategorySelectScalar = {
    id?: boolean;
    name?: boolean;
    displayName?: boolean;
    description?: boolean;
    inclusionCriteria?: boolean;
    exclusionCriteria?: boolean;
    exemplarEntities?: boolean;
    antiExemplars?: boolean;
    entityCount?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DiscoveryCategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "displayName" | "description" | "inclusionCriteria" | "exclusionCriteria" | "exemplarEntities" | "antiExemplars" | "entityCount" | "createdAt" | "updatedAt", ExtArgs["result"]["discoveryCategory"]>;
export type DiscoveryCategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entities?: boolean | Prisma.DiscoveryCategory$entitiesArgs<ExtArgs>;
    _count?: boolean | Prisma.DiscoveryCategoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DiscoveryCategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type DiscoveryCategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $DiscoveryCategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DiscoveryCategory";
    objects: {
        entities: Prisma.$EntityPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        displayName: string;
        description: string;
        inclusionCriteria: string | null;
        exclusionCriteria: string | null;
        exemplarEntities: runtime.JsonValue | null;
        antiExemplars: runtime.JsonValue | null;
        entityCount: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["discoveryCategory"]>;
    composites: {};
};
export type DiscoveryCategoryGetPayload<S extends boolean | null | undefined | DiscoveryCategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload, S>;
export type DiscoveryCategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiscoveryCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiscoveryCategoryCountAggregateInputType | true;
};
export interface DiscoveryCategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DiscoveryCategory'];
        meta: {
            name: 'DiscoveryCategory';
        };
    };
    /**
     * Find zero or one DiscoveryCategory that matches the filter.
     * @param {DiscoveryCategoryFindUniqueArgs} args - Arguments to find a DiscoveryCategory
     * @example
     * // Get one DiscoveryCategory
     * const discoveryCategory = await prisma.discoveryCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscoveryCategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, DiscoveryCategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCategoryClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one DiscoveryCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiscoveryCategoryFindUniqueOrThrowArgs} args - Arguments to find a DiscoveryCategory
     * @example
     * // Get one DiscoveryCategory
     * const discoveryCategory = await prisma.discoveryCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscoveryCategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiscoveryCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCategoryClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DiscoveryCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCategoryFindFirstArgs} args - Arguments to find a DiscoveryCategory
     * @example
     * // Get one DiscoveryCategory
     * const discoveryCategory = await prisma.discoveryCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscoveryCategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, DiscoveryCategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCategoryClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first DiscoveryCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCategoryFindFirstOrThrowArgs} args - Arguments to find a DiscoveryCategory
     * @example
     * // Get one DiscoveryCategory
     * const discoveryCategory = await prisma.discoveryCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscoveryCategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiscoveryCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCategoryClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more DiscoveryCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscoveryCategories
     * const discoveryCategories = await prisma.discoveryCategory.findMany()
     *
     * // Get first 10 DiscoveryCategories
     * const discoveryCategories = await prisma.discoveryCategory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const discoveryCategoryWithIdOnly = await prisma.discoveryCategory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends DiscoveryCategoryFindManyArgs>(args?: Prisma.SelectSubset<T, DiscoveryCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a DiscoveryCategory.
     * @param {DiscoveryCategoryCreateArgs} args - Arguments to create a DiscoveryCategory.
     * @example
     * // Create one DiscoveryCategory
     * const DiscoveryCategory = await prisma.discoveryCategory.create({
     *   data: {
     *     // ... data to create a DiscoveryCategory
     *   }
     * })
     *
     */
    create<T extends DiscoveryCategoryCreateArgs>(args: Prisma.SelectSubset<T, DiscoveryCategoryCreateArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCategoryClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many DiscoveryCategories.
     * @param {DiscoveryCategoryCreateManyArgs} args - Arguments to create many DiscoveryCategories.
     * @example
     * // Create many DiscoveryCategories
     * const discoveryCategory = await prisma.discoveryCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends DiscoveryCategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, DiscoveryCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many DiscoveryCategories and returns the data saved in the database.
     * @param {DiscoveryCategoryCreateManyAndReturnArgs} args - Arguments to create many DiscoveryCategories.
     * @example
     * // Create many DiscoveryCategories
     * const discoveryCategory = await prisma.discoveryCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many DiscoveryCategories and only return the `id`
     * const discoveryCategoryWithIdOnly = await prisma.discoveryCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends DiscoveryCategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiscoveryCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a DiscoveryCategory.
     * @param {DiscoveryCategoryDeleteArgs} args - Arguments to delete one DiscoveryCategory.
     * @example
     * // Delete one DiscoveryCategory
     * const DiscoveryCategory = await prisma.discoveryCategory.delete({
     *   where: {
     *     // ... filter to delete one DiscoveryCategory
     *   }
     * })
     *
     */
    delete<T extends DiscoveryCategoryDeleteArgs>(args: Prisma.SelectSubset<T, DiscoveryCategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCategoryClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one DiscoveryCategory.
     * @param {DiscoveryCategoryUpdateArgs} args - Arguments to update one DiscoveryCategory.
     * @example
     * // Update one DiscoveryCategory
     * const discoveryCategory = await prisma.discoveryCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends DiscoveryCategoryUpdateArgs>(args: Prisma.SelectSubset<T, DiscoveryCategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCategoryClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more DiscoveryCategories.
     * @param {DiscoveryCategoryDeleteManyArgs} args - Arguments to filter DiscoveryCategories to delete.
     * @example
     * // Delete a few DiscoveryCategories
     * const { count } = await prisma.discoveryCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends DiscoveryCategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiscoveryCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DiscoveryCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscoveryCategories
     * const discoveryCategory = await prisma.discoveryCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends DiscoveryCategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, DiscoveryCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more DiscoveryCategories and returns the data updated in the database.
     * @param {DiscoveryCategoryUpdateManyAndReturnArgs} args - Arguments to update many DiscoveryCategories.
     * @example
     * // Update many DiscoveryCategories
     * const discoveryCategory = await prisma.discoveryCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more DiscoveryCategories and only return the `id`
     * const discoveryCategoryWithIdOnly = await prisma.discoveryCategory.updateManyAndReturn({
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
    updateManyAndReturn<T extends DiscoveryCategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiscoveryCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one DiscoveryCategory.
     * @param {DiscoveryCategoryUpsertArgs} args - Arguments to update or create a DiscoveryCategory.
     * @example
     * // Update or create a DiscoveryCategory
     * const discoveryCategory = await prisma.discoveryCategory.upsert({
     *   create: {
     *     // ... data to create a DiscoveryCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscoveryCategory we want to update
     *   }
     * })
     */
    upsert<T extends DiscoveryCategoryUpsertArgs>(args: Prisma.SelectSubset<T, DiscoveryCategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCategoryClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of DiscoveryCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCategoryCountArgs} args - Arguments to filter DiscoveryCategories to count.
     * @example
     * // Count the number of DiscoveryCategories
     * const count = await prisma.discoveryCategory.count({
     *   where: {
     *     // ... the filter for the DiscoveryCategories we want to count
     *   }
     * })
    **/
    count<T extends DiscoveryCategoryCountArgs>(args?: Prisma.Subset<T, DiscoveryCategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiscoveryCategoryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a DiscoveryCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DiscoveryCategoryAggregateArgs>(args: Prisma.Subset<T, DiscoveryCategoryAggregateArgs>): Prisma.PrismaPromise<GetDiscoveryCategoryAggregateType<T>>;
    /**
     * Group by DiscoveryCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoveryCategoryGroupByArgs} args - Group by arguments.
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
    groupBy<T extends DiscoveryCategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiscoveryCategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: DiscoveryCategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiscoveryCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscoveryCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the DiscoveryCategory model
     */
    readonly fields: DiscoveryCategoryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for DiscoveryCategory.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__DiscoveryCategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    entities<T extends Prisma.DiscoveryCategory$entitiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiscoveryCategory$entitiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the DiscoveryCategory model
 */
export interface DiscoveryCategoryFieldRefs {
    readonly id: Prisma.FieldRef<"DiscoveryCategory", 'String'>;
    readonly name: Prisma.FieldRef<"DiscoveryCategory", 'String'>;
    readonly displayName: Prisma.FieldRef<"DiscoveryCategory", 'String'>;
    readonly description: Prisma.FieldRef<"DiscoveryCategory", 'String'>;
    readonly inclusionCriteria: Prisma.FieldRef<"DiscoveryCategory", 'String'>;
    readonly exclusionCriteria: Prisma.FieldRef<"DiscoveryCategory", 'String'>;
    readonly exemplarEntities: Prisma.FieldRef<"DiscoveryCategory", 'Json'>;
    readonly antiExemplars: Prisma.FieldRef<"DiscoveryCategory", 'Json'>;
    readonly entityCount: Prisma.FieldRef<"DiscoveryCategory", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"DiscoveryCategory", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DiscoveryCategory", 'DateTime'>;
}
/**
 * DiscoveryCategory findUnique
 */
export type DiscoveryCategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which DiscoveryCategory to fetch.
     */
    where: Prisma.DiscoveryCategoryWhereUniqueInput;
};
/**
 * DiscoveryCategory findUniqueOrThrow
 */
export type DiscoveryCategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which DiscoveryCategory to fetch.
     */
    where: Prisma.DiscoveryCategoryWhereUniqueInput;
};
/**
 * DiscoveryCategory findFirst
 */
export type DiscoveryCategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which DiscoveryCategory to fetch.
     */
    where?: Prisma.DiscoveryCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryCategories to fetch.
     */
    orderBy?: Prisma.DiscoveryCategoryOrderByWithRelationInput | Prisma.DiscoveryCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DiscoveryCategories.
     */
    cursor?: Prisma.DiscoveryCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryCategories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DiscoveryCategories.
     */
    distinct?: Prisma.DiscoveryCategoryScalarFieldEnum | Prisma.DiscoveryCategoryScalarFieldEnum[];
};
/**
 * DiscoveryCategory findFirstOrThrow
 */
export type DiscoveryCategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which DiscoveryCategory to fetch.
     */
    where?: Prisma.DiscoveryCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryCategories to fetch.
     */
    orderBy?: Prisma.DiscoveryCategoryOrderByWithRelationInput | Prisma.DiscoveryCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for DiscoveryCategories.
     */
    cursor?: Prisma.DiscoveryCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryCategories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of DiscoveryCategories.
     */
    distinct?: Prisma.DiscoveryCategoryScalarFieldEnum | Prisma.DiscoveryCategoryScalarFieldEnum[];
};
/**
 * DiscoveryCategory findMany
 */
export type DiscoveryCategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which DiscoveryCategories to fetch.
     */
    where?: Prisma.DiscoveryCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of DiscoveryCategories to fetch.
     */
    orderBy?: Prisma.DiscoveryCategoryOrderByWithRelationInput | Prisma.DiscoveryCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing DiscoveryCategories.
     */
    cursor?: Prisma.DiscoveryCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` DiscoveryCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` DiscoveryCategories.
     */
    skip?: number;
    distinct?: Prisma.DiscoveryCategoryScalarFieldEnum | Prisma.DiscoveryCategoryScalarFieldEnum[];
};
/**
 * DiscoveryCategory create
 */
export type DiscoveryCategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a DiscoveryCategory.
     */
    data: Prisma.XOR<Prisma.DiscoveryCategoryCreateInput, Prisma.DiscoveryCategoryUncheckedCreateInput>;
};
/**
 * DiscoveryCategory createMany
 */
export type DiscoveryCategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiscoveryCategories.
     */
    data: Prisma.DiscoveryCategoryCreateManyInput | Prisma.DiscoveryCategoryCreateManyInput[];
};
/**
 * DiscoveryCategory createManyAndReturn
 */
export type DiscoveryCategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * The data used to create many DiscoveryCategories.
     */
    data: Prisma.DiscoveryCategoryCreateManyInput | Prisma.DiscoveryCategoryCreateManyInput[];
};
/**
 * DiscoveryCategory update
 */
export type DiscoveryCategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a DiscoveryCategory.
     */
    data: Prisma.XOR<Prisma.DiscoveryCategoryUpdateInput, Prisma.DiscoveryCategoryUncheckedUpdateInput>;
    /**
     * Choose, which DiscoveryCategory to update.
     */
    where: Prisma.DiscoveryCategoryWhereUniqueInput;
};
/**
 * DiscoveryCategory updateMany
 */
export type DiscoveryCategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update DiscoveryCategories.
     */
    data: Prisma.XOR<Prisma.DiscoveryCategoryUpdateManyMutationInput, Prisma.DiscoveryCategoryUncheckedUpdateManyInput>;
    /**
     * Filter which DiscoveryCategories to update
     */
    where?: Prisma.DiscoveryCategoryWhereInput;
    /**
     * Limit how many DiscoveryCategories to update.
     */
    limit?: number;
};
/**
 * DiscoveryCategory updateManyAndReturn
 */
export type DiscoveryCategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * The data used to update DiscoveryCategories.
     */
    data: Prisma.XOR<Prisma.DiscoveryCategoryUpdateManyMutationInput, Prisma.DiscoveryCategoryUncheckedUpdateManyInput>;
    /**
     * Filter which DiscoveryCategories to update
     */
    where?: Prisma.DiscoveryCategoryWhereInput;
    /**
     * Limit how many DiscoveryCategories to update.
     */
    limit?: number;
};
/**
 * DiscoveryCategory upsert
 */
export type DiscoveryCategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the DiscoveryCategory to update in case it exists.
     */
    where: Prisma.DiscoveryCategoryWhereUniqueInput;
    /**
     * In case the DiscoveryCategory found by the `where` argument doesn't exist, create a new DiscoveryCategory with this data.
     */
    create: Prisma.XOR<Prisma.DiscoveryCategoryCreateInput, Prisma.DiscoveryCategoryUncheckedCreateInput>;
    /**
     * In case the DiscoveryCategory was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.DiscoveryCategoryUpdateInput, Prisma.DiscoveryCategoryUncheckedUpdateInput>;
};
/**
 * DiscoveryCategory delete
 */
export type DiscoveryCategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
    /**
     * Filter which DiscoveryCategory to delete.
     */
    where: Prisma.DiscoveryCategoryWhereUniqueInput;
};
/**
 * DiscoveryCategory deleteMany
 */
export type DiscoveryCategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which DiscoveryCategories to delete
     */
    where?: Prisma.DiscoveryCategoryWhereInput;
    /**
     * Limit how many DiscoveryCategories to delete.
     */
    limit?: number;
};
/**
 * DiscoveryCategory.entities
 */
export type DiscoveryCategory$entitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: Prisma.EntitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Entity
     */
    omit?: Prisma.EntityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityInclude<ExtArgs> | null;
    where?: Prisma.EntityWhereInput;
    orderBy?: Prisma.EntityOrderByWithRelationInput | Prisma.EntityOrderByWithRelationInput[];
    cursor?: Prisma.EntityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EntityScalarFieldEnum | Prisma.EntityScalarFieldEnum[];
};
/**
 * DiscoveryCategory without action
 */
export type DiscoveryCategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=DiscoveryCategory.d.ts.map