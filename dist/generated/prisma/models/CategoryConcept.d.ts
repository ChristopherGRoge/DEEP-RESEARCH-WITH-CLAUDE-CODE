import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model CategoryConcept
 * A concept (methodology, technology, standard, or pattern) within a category
 * Concepts are the building blocks that explain WHY entities cluster
 */
export type CategoryConceptModel = runtime.Types.Result.DefaultSelection<Prisma.$CategoryConceptPayload>;
export type AggregateCategoryConcept = {
    _count: CategoryConceptCountAggregateOutputType | null;
    _min: CategoryConceptMinAggregateOutputType | null;
    _max: CategoryConceptMaxAggregateOutputType | null;
};
export type CategoryConceptMinAggregateOutputType = {
    id: string | null;
    categoryId: string | null;
    name: string | null;
    displayName: string | null;
    description: string | null;
    conceptType: string | null;
    url: string | null;
    maturity: string | null;
    discoveredBy: string | null;
    evidenceDescription: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CategoryConceptMaxAggregateOutputType = {
    id: string | null;
    categoryId: string | null;
    name: string | null;
    displayName: string | null;
    description: string | null;
    conceptType: string | null;
    url: string | null;
    maturity: string | null;
    discoveredBy: string | null;
    evidenceDescription: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CategoryConceptCountAggregateOutputType = {
    id: number;
    categoryId: number;
    name: number;
    displayName: number;
    description: number;
    conceptType: number;
    url: number;
    maturity: number;
    discoveredBy: number;
    evidenceDescription: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CategoryConceptMinAggregateInputType = {
    id?: true;
    categoryId?: true;
    name?: true;
    displayName?: true;
    description?: true;
    conceptType?: true;
    url?: true;
    maturity?: true;
    discoveredBy?: true;
    evidenceDescription?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CategoryConceptMaxAggregateInputType = {
    id?: true;
    categoryId?: true;
    name?: true;
    displayName?: true;
    description?: true;
    conceptType?: true;
    url?: true;
    maturity?: true;
    discoveredBy?: true;
    evidenceDescription?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CategoryConceptCountAggregateInputType = {
    id?: true;
    categoryId?: true;
    name?: true;
    displayName?: true;
    description?: true;
    conceptType?: true;
    url?: true;
    maturity?: true;
    discoveredBy?: true;
    evidenceDescription?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CategoryConceptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryConcept to aggregate.
     */
    where?: Prisma.CategoryConceptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CategoryConcepts to fetch.
     */
    orderBy?: Prisma.CategoryConceptOrderByWithRelationInput | Prisma.CategoryConceptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.CategoryConceptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CategoryConcepts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CategoryConcepts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned CategoryConcepts
    **/
    _count?: true | CategoryConceptCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CategoryConceptMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CategoryConceptMaxAggregateInputType;
};
export type GetCategoryConceptAggregateType<T extends CategoryConceptAggregateArgs> = {
    [P in keyof T & keyof AggregateCategoryConcept]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCategoryConcept[P]> : Prisma.GetScalarType<T[P], AggregateCategoryConcept[P]>;
};
export type CategoryConceptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CategoryConceptWhereInput;
    orderBy?: Prisma.CategoryConceptOrderByWithAggregationInput | Prisma.CategoryConceptOrderByWithAggregationInput[];
    by: Prisma.CategoryConceptScalarFieldEnum[] | Prisma.CategoryConceptScalarFieldEnum;
    having?: Prisma.CategoryConceptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CategoryConceptCountAggregateInputType | true;
    _min?: CategoryConceptMinAggregateInputType;
    _max?: CategoryConceptMaxAggregateInputType;
};
export type CategoryConceptGroupByOutputType = {
    id: string;
    categoryId: string;
    name: string;
    displayName: string;
    description: string | null;
    conceptType: string;
    url: string | null;
    maturity: string;
    discoveredBy: string | null;
    evidenceDescription: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CategoryConceptCountAggregateOutputType | null;
    _min: CategoryConceptMinAggregateOutputType | null;
    _max: CategoryConceptMaxAggregateOutputType | null;
};
type GetCategoryConceptGroupByPayload<T extends CategoryConceptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CategoryConceptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CategoryConceptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CategoryConceptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CategoryConceptGroupByOutputType[P]>;
}>>;
export type CategoryConceptWhereInput = {
    AND?: Prisma.CategoryConceptWhereInput | Prisma.CategoryConceptWhereInput[];
    OR?: Prisma.CategoryConceptWhereInput[];
    NOT?: Prisma.CategoryConceptWhereInput | Prisma.CategoryConceptWhereInput[];
    id?: Prisma.StringFilter<"CategoryConcept"> | string;
    categoryId?: Prisma.StringFilter<"CategoryConcept"> | string;
    name?: Prisma.StringFilter<"CategoryConcept"> | string;
    displayName?: Prisma.StringFilter<"CategoryConcept"> | string;
    description?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    conceptType?: Prisma.StringFilter<"CategoryConcept"> | string;
    url?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    maturity?: Prisma.StringFilter<"CategoryConcept"> | string;
    discoveredBy?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    evidenceDescription?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CategoryConcept"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CategoryConcept"> | Date | string;
    category?: Prisma.XOR<Prisma.DiscoveryCategoryScalarRelationFilter, Prisma.DiscoveryCategoryWhereInput>;
    entityLinks?: Prisma.ConceptEntityLinkListRelationFilter;
};
export type CategoryConceptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    conceptType?: Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    maturity?: Prisma.SortOrder;
    discoveredBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    category?: Prisma.DiscoveryCategoryOrderByWithRelationInput;
    entityLinks?: Prisma.ConceptEntityLinkOrderByRelationAggregateInput;
};
export type CategoryConceptWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    categoryId_name?: Prisma.CategoryConceptCategoryIdNameCompoundUniqueInput;
    AND?: Prisma.CategoryConceptWhereInput | Prisma.CategoryConceptWhereInput[];
    OR?: Prisma.CategoryConceptWhereInput[];
    NOT?: Prisma.CategoryConceptWhereInput | Prisma.CategoryConceptWhereInput[];
    categoryId?: Prisma.StringFilter<"CategoryConcept"> | string;
    name?: Prisma.StringFilter<"CategoryConcept"> | string;
    displayName?: Prisma.StringFilter<"CategoryConcept"> | string;
    description?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    conceptType?: Prisma.StringFilter<"CategoryConcept"> | string;
    url?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    maturity?: Prisma.StringFilter<"CategoryConcept"> | string;
    discoveredBy?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    evidenceDescription?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CategoryConcept"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CategoryConcept"> | Date | string;
    category?: Prisma.XOR<Prisma.DiscoveryCategoryScalarRelationFilter, Prisma.DiscoveryCategoryWhereInput>;
    entityLinks?: Prisma.ConceptEntityLinkListRelationFilter;
}, "id" | "categoryId_name">;
export type CategoryConceptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    conceptType?: Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    maturity?: Prisma.SortOrder;
    discoveredBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CategoryConceptCountOrderByAggregateInput;
    _max?: Prisma.CategoryConceptMaxOrderByAggregateInput;
    _min?: Prisma.CategoryConceptMinOrderByAggregateInput;
};
export type CategoryConceptScalarWhereWithAggregatesInput = {
    AND?: Prisma.CategoryConceptScalarWhereWithAggregatesInput | Prisma.CategoryConceptScalarWhereWithAggregatesInput[];
    OR?: Prisma.CategoryConceptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CategoryConceptScalarWhereWithAggregatesInput | Prisma.CategoryConceptScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CategoryConcept"> | string;
    categoryId?: Prisma.StringWithAggregatesFilter<"CategoryConcept"> | string;
    name?: Prisma.StringWithAggregatesFilter<"CategoryConcept"> | string;
    displayName?: Prisma.StringWithAggregatesFilter<"CategoryConcept"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"CategoryConcept"> | string | null;
    conceptType?: Prisma.StringWithAggregatesFilter<"CategoryConcept"> | string;
    url?: Prisma.StringNullableWithAggregatesFilter<"CategoryConcept"> | string | null;
    maturity?: Prisma.StringWithAggregatesFilter<"CategoryConcept"> | string;
    discoveredBy?: Prisma.StringNullableWithAggregatesFilter<"CategoryConcept"> | string | null;
    evidenceDescription?: Prisma.StringNullableWithAggregatesFilter<"CategoryConcept"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CategoryConcept"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CategoryConcept"> | Date | string;
};
export type CategoryConceptCreateInput = {
    id?: string;
    name: string;
    displayName: string;
    description?: string | null;
    conceptType: string;
    url?: string | null;
    maturity?: string;
    discoveredBy?: string | null;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.DiscoveryCategoryCreateNestedOneWithoutConceptsInput;
    entityLinks?: Prisma.ConceptEntityLinkCreateNestedManyWithoutConceptInput;
};
export type CategoryConceptUncheckedCreateInput = {
    id?: string;
    categoryId: string;
    name: string;
    displayName: string;
    description?: string | null;
    conceptType: string;
    url?: string | null;
    maturity?: string;
    discoveredBy?: string | null;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entityLinks?: Prisma.ConceptEntityLinkUncheckedCreateNestedManyWithoutConceptInput;
};
export type CategoryConceptUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    conceptType?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturity?: Prisma.StringFieldUpdateOperationsInput | string;
    discoveredBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.DiscoveryCategoryUpdateOneRequiredWithoutConceptsNestedInput;
    entityLinks?: Prisma.ConceptEntityLinkUpdateManyWithoutConceptNestedInput;
};
export type CategoryConceptUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    conceptType?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturity?: Prisma.StringFieldUpdateOperationsInput | string;
    discoveredBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entityLinks?: Prisma.ConceptEntityLinkUncheckedUpdateManyWithoutConceptNestedInput;
};
export type CategoryConceptCreateManyInput = {
    id?: string;
    categoryId: string;
    name: string;
    displayName: string;
    description?: string | null;
    conceptType: string;
    url?: string | null;
    maturity?: string;
    discoveredBy?: string | null;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CategoryConceptUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    conceptType?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturity?: Prisma.StringFieldUpdateOperationsInput | string;
    discoveredBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryConceptUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    conceptType?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturity?: Prisma.StringFieldUpdateOperationsInput | string;
    discoveredBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryConceptListRelationFilter = {
    every?: Prisma.CategoryConceptWhereInput;
    some?: Prisma.CategoryConceptWhereInput;
    none?: Prisma.CategoryConceptWhereInput;
};
export type CategoryConceptOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CategoryConceptCategoryIdNameCompoundUniqueInput = {
    categoryId: string;
    name: string;
};
export type CategoryConceptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    conceptType?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    maturity?: Prisma.SortOrder;
    discoveredBy?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CategoryConceptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    conceptType?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    maturity?: Prisma.SortOrder;
    discoveredBy?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CategoryConceptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    displayName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    conceptType?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    maturity?: Prisma.SortOrder;
    discoveredBy?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CategoryConceptScalarRelationFilter = {
    is?: Prisma.CategoryConceptWhereInput;
    isNot?: Prisma.CategoryConceptWhereInput;
};
export type CategoryConceptCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.CategoryConceptCreateWithoutCategoryInput, Prisma.CategoryConceptUncheckedCreateWithoutCategoryInput> | Prisma.CategoryConceptCreateWithoutCategoryInput[] | Prisma.CategoryConceptUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CategoryConceptCreateOrConnectWithoutCategoryInput | Prisma.CategoryConceptCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.CategoryConceptCreateManyCategoryInputEnvelope;
    connect?: Prisma.CategoryConceptWhereUniqueInput | Prisma.CategoryConceptWhereUniqueInput[];
};
export type CategoryConceptUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.CategoryConceptCreateWithoutCategoryInput, Prisma.CategoryConceptUncheckedCreateWithoutCategoryInput> | Prisma.CategoryConceptCreateWithoutCategoryInput[] | Prisma.CategoryConceptUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CategoryConceptCreateOrConnectWithoutCategoryInput | Prisma.CategoryConceptCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.CategoryConceptCreateManyCategoryInputEnvelope;
    connect?: Prisma.CategoryConceptWhereUniqueInput | Prisma.CategoryConceptWhereUniqueInput[];
};
export type CategoryConceptUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryConceptCreateWithoutCategoryInput, Prisma.CategoryConceptUncheckedCreateWithoutCategoryInput> | Prisma.CategoryConceptCreateWithoutCategoryInput[] | Prisma.CategoryConceptUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CategoryConceptCreateOrConnectWithoutCategoryInput | Prisma.CategoryConceptCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.CategoryConceptUpsertWithWhereUniqueWithoutCategoryInput | Prisma.CategoryConceptUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.CategoryConceptCreateManyCategoryInputEnvelope;
    set?: Prisma.CategoryConceptWhereUniqueInput | Prisma.CategoryConceptWhereUniqueInput[];
    disconnect?: Prisma.CategoryConceptWhereUniqueInput | Prisma.CategoryConceptWhereUniqueInput[];
    delete?: Prisma.CategoryConceptWhereUniqueInput | Prisma.CategoryConceptWhereUniqueInput[];
    connect?: Prisma.CategoryConceptWhereUniqueInput | Prisma.CategoryConceptWhereUniqueInput[];
    update?: Prisma.CategoryConceptUpdateWithWhereUniqueWithoutCategoryInput | Prisma.CategoryConceptUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.CategoryConceptUpdateManyWithWhereWithoutCategoryInput | Prisma.CategoryConceptUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.CategoryConceptScalarWhereInput | Prisma.CategoryConceptScalarWhereInput[];
};
export type CategoryConceptUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryConceptCreateWithoutCategoryInput, Prisma.CategoryConceptUncheckedCreateWithoutCategoryInput> | Prisma.CategoryConceptCreateWithoutCategoryInput[] | Prisma.CategoryConceptUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CategoryConceptCreateOrConnectWithoutCategoryInput | Prisma.CategoryConceptCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.CategoryConceptUpsertWithWhereUniqueWithoutCategoryInput | Prisma.CategoryConceptUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.CategoryConceptCreateManyCategoryInputEnvelope;
    set?: Prisma.CategoryConceptWhereUniqueInput | Prisma.CategoryConceptWhereUniqueInput[];
    disconnect?: Prisma.CategoryConceptWhereUniqueInput | Prisma.CategoryConceptWhereUniqueInput[];
    delete?: Prisma.CategoryConceptWhereUniqueInput | Prisma.CategoryConceptWhereUniqueInput[];
    connect?: Prisma.CategoryConceptWhereUniqueInput | Prisma.CategoryConceptWhereUniqueInput[];
    update?: Prisma.CategoryConceptUpdateWithWhereUniqueWithoutCategoryInput | Prisma.CategoryConceptUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.CategoryConceptUpdateManyWithWhereWithoutCategoryInput | Prisma.CategoryConceptUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.CategoryConceptScalarWhereInput | Prisma.CategoryConceptScalarWhereInput[];
};
export type CategoryConceptCreateNestedOneWithoutEntityLinksInput = {
    create?: Prisma.XOR<Prisma.CategoryConceptCreateWithoutEntityLinksInput, Prisma.CategoryConceptUncheckedCreateWithoutEntityLinksInput>;
    connectOrCreate?: Prisma.CategoryConceptCreateOrConnectWithoutEntityLinksInput;
    connect?: Prisma.CategoryConceptWhereUniqueInput;
};
export type CategoryConceptUpdateOneRequiredWithoutEntityLinksNestedInput = {
    create?: Prisma.XOR<Prisma.CategoryConceptCreateWithoutEntityLinksInput, Prisma.CategoryConceptUncheckedCreateWithoutEntityLinksInput>;
    connectOrCreate?: Prisma.CategoryConceptCreateOrConnectWithoutEntityLinksInput;
    upsert?: Prisma.CategoryConceptUpsertWithoutEntityLinksInput;
    connect?: Prisma.CategoryConceptWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CategoryConceptUpdateToOneWithWhereWithoutEntityLinksInput, Prisma.CategoryConceptUpdateWithoutEntityLinksInput>, Prisma.CategoryConceptUncheckedUpdateWithoutEntityLinksInput>;
};
export type CategoryConceptCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    displayName: string;
    description?: string | null;
    conceptType: string;
    url?: string | null;
    maturity?: string;
    discoveredBy?: string | null;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entityLinks?: Prisma.ConceptEntityLinkCreateNestedManyWithoutConceptInput;
};
export type CategoryConceptUncheckedCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    displayName: string;
    description?: string | null;
    conceptType: string;
    url?: string | null;
    maturity?: string;
    discoveredBy?: string | null;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entityLinks?: Prisma.ConceptEntityLinkUncheckedCreateNestedManyWithoutConceptInput;
};
export type CategoryConceptCreateOrConnectWithoutCategoryInput = {
    where: Prisma.CategoryConceptWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryConceptCreateWithoutCategoryInput, Prisma.CategoryConceptUncheckedCreateWithoutCategoryInput>;
};
export type CategoryConceptCreateManyCategoryInputEnvelope = {
    data: Prisma.CategoryConceptCreateManyCategoryInput | Prisma.CategoryConceptCreateManyCategoryInput[];
};
export type CategoryConceptUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.CategoryConceptWhereUniqueInput;
    update: Prisma.XOR<Prisma.CategoryConceptUpdateWithoutCategoryInput, Prisma.CategoryConceptUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.CategoryConceptCreateWithoutCategoryInput, Prisma.CategoryConceptUncheckedCreateWithoutCategoryInput>;
};
export type CategoryConceptUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.CategoryConceptWhereUniqueInput;
    data: Prisma.XOR<Prisma.CategoryConceptUpdateWithoutCategoryInput, Prisma.CategoryConceptUncheckedUpdateWithoutCategoryInput>;
};
export type CategoryConceptUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.CategoryConceptScalarWhereInput;
    data: Prisma.XOR<Prisma.CategoryConceptUpdateManyMutationInput, Prisma.CategoryConceptUncheckedUpdateManyWithoutCategoryInput>;
};
export type CategoryConceptScalarWhereInput = {
    AND?: Prisma.CategoryConceptScalarWhereInput | Prisma.CategoryConceptScalarWhereInput[];
    OR?: Prisma.CategoryConceptScalarWhereInput[];
    NOT?: Prisma.CategoryConceptScalarWhereInput | Prisma.CategoryConceptScalarWhereInput[];
    id?: Prisma.StringFilter<"CategoryConcept"> | string;
    categoryId?: Prisma.StringFilter<"CategoryConcept"> | string;
    name?: Prisma.StringFilter<"CategoryConcept"> | string;
    displayName?: Prisma.StringFilter<"CategoryConcept"> | string;
    description?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    conceptType?: Prisma.StringFilter<"CategoryConcept"> | string;
    url?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    maturity?: Prisma.StringFilter<"CategoryConcept"> | string;
    discoveredBy?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    evidenceDescription?: Prisma.StringNullableFilter<"CategoryConcept"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CategoryConcept"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CategoryConcept"> | Date | string;
};
export type CategoryConceptCreateWithoutEntityLinksInput = {
    id?: string;
    name: string;
    displayName: string;
    description?: string | null;
    conceptType: string;
    url?: string | null;
    maturity?: string;
    discoveredBy?: string | null;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    category: Prisma.DiscoveryCategoryCreateNestedOneWithoutConceptsInput;
};
export type CategoryConceptUncheckedCreateWithoutEntityLinksInput = {
    id?: string;
    categoryId: string;
    name: string;
    displayName: string;
    description?: string | null;
    conceptType: string;
    url?: string | null;
    maturity?: string;
    discoveredBy?: string | null;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CategoryConceptCreateOrConnectWithoutEntityLinksInput = {
    where: Prisma.CategoryConceptWhereUniqueInput;
    create: Prisma.XOR<Prisma.CategoryConceptCreateWithoutEntityLinksInput, Prisma.CategoryConceptUncheckedCreateWithoutEntityLinksInput>;
};
export type CategoryConceptUpsertWithoutEntityLinksInput = {
    update: Prisma.XOR<Prisma.CategoryConceptUpdateWithoutEntityLinksInput, Prisma.CategoryConceptUncheckedUpdateWithoutEntityLinksInput>;
    create: Prisma.XOR<Prisma.CategoryConceptCreateWithoutEntityLinksInput, Prisma.CategoryConceptUncheckedCreateWithoutEntityLinksInput>;
    where?: Prisma.CategoryConceptWhereInput;
};
export type CategoryConceptUpdateToOneWithWhereWithoutEntityLinksInput = {
    where?: Prisma.CategoryConceptWhereInput;
    data: Prisma.XOR<Prisma.CategoryConceptUpdateWithoutEntityLinksInput, Prisma.CategoryConceptUncheckedUpdateWithoutEntityLinksInput>;
};
export type CategoryConceptUpdateWithoutEntityLinksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    conceptType?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturity?: Prisma.StringFieldUpdateOperationsInput | string;
    discoveredBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    category?: Prisma.DiscoveryCategoryUpdateOneRequiredWithoutConceptsNestedInput;
};
export type CategoryConceptUncheckedUpdateWithoutEntityLinksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    conceptType?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturity?: Prisma.StringFieldUpdateOperationsInput | string;
    discoveredBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CategoryConceptCreateManyCategoryInput = {
    id?: string;
    name: string;
    displayName: string;
    description?: string | null;
    conceptType: string;
    url?: string | null;
    maturity?: string;
    discoveredBy?: string | null;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CategoryConceptUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    conceptType?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturity?: Prisma.StringFieldUpdateOperationsInput | string;
    discoveredBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entityLinks?: Prisma.ConceptEntityLinkUpdateManyWithoutConceptNestedInput;
};
export type CategoryConceptUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    conceptType?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturity?: Prisma.StringFieldUpdateOperationsInput | string;
    discoveredBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entityLinks?: Prisma.ConceptEntityLinkUncheckedUpdateManyWithoutConceptNestedInput;
};
export type CategoryConceptUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    displayName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    conceptType?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturity?: Prisma.StringFieldUpdateOperationsInput | string;
    discoveredBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type CategoryConceptCountOutputType
 */
export type CategoryConceptCountOutputType = {
    entityLinks: number;
};
export type CategoryConceptCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entityLinks?: boolean | CategoryConceptCountOutputTypeCountEntityLinksArgs;
};
/**
 * CategoryConceptCountOutputType without action
 */
export type CategoryConceptCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConceptCountOutputType
     */
    select?: Prisma.CategoryConceptCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * CategoryConceptCountOutputType without action
 */
export type CategoryConceptCountOutputTypeCountEntityLinksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConceptEntityLinkWhereInput;
};
export type CategoryConceptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    categoryId?: boolean;
    name?: boolean;
    displayName?: boolean;
    description?: boolean;
    conceptType?: boolean;
    url?: boolean;
    maturity?: boolean;
    discoveredBy?: boolean;
    evidenceDescription?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.DiscoveryCategoryDefaultArgs<ExtArgs>;
    entityLinks?: boolean | Prisma.CategoryConcept$entityLinksArgs<ExtArgs>;
    _count?: boolean | Prisma.CategoryConceptCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["categoryConcept"]>;
export type CategoryConceptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    categoryId?: boolean;
    name?: boolean;
    displayName?: boolean;
    description?: boolean;
    conceptType?: boolean;
    url?: boolean;
    maturity?: boolean;
    discoveredBy?: boolean;
    evidenceDescription?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.DiscoveryCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["categoryConcept"]>;
export type CategoryConceptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    categoryId?: boolean;
    name?: boolean;
    displayName?: boolean;
    description?: boolean;
    conceptType?: boolean;
    url?: boolean;
    maturity?: boolean;
    discoveredBy?: boolean;
    evidenceDescription?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    category?: boolean | Prisma.DiscoveryCategoryDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["categoryConcept"]>;
export type CategoryConceptSelectScalar = {
    id?: boolean;
    categoryId?: boolean;
    name?: boolean;
    displayName?: boolean;
    description?: boolean;
    conceptType?: boolean;
    url?: boolean;
    maturity?: boolean;
    discoveredBy?: boolean;
    evidenceDescription?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CategoryConceptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "categoryId" | "name" | "displayName" | "description" | "conceptType" | "url" | "maturity" | "discoveredBy" | "evidenceDescription" | "createdAt" | "updatedAt", ExtArgs["result"]["categoryConcept"]>;
export type CategoryConceptInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.DiscoveryCategoryDefaultArgs<ExtArgs>;
    entityLinks?: boolean | Prisma.CategoryConcept$entityLinksArgs<ExtArgs>;
    _count?: boolean | Prisma.CategoryConceptCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CategoryConceptIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.DiscoveryCategoryDefaultArgs<ExtArgs>;
};
export type CategoryConceptIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.DiscoveryCategoryDefaultArgs<ExtArgs>;
};
export type $CategoryConceptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CategoryConcept";
    objects: {
        category: Prisma.$DiscoveryCategoryPayload<ExtArgs>;
        entityLinks: Prisma.$ConceptEntityLinkPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        categoryId: string;
        name: string;
        displayName: string;
        description: string | null;
        conceptType: string;
        url: string | null;
        maturity: string;
        discoveredBy: string | null;
        evidenceDescription: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["categoryConcept"]>;
    composites: {};
};
export type CategoryConceptGetPayload<S extends boolean | null | undefined | CategoryConceptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload, S>;
export type CategoryConceptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CategoryConceptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CategoryConceptCountAggregateInputType | true;
};
export interface CategoryConceptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CategoryConcept'];
        meta: {
            name: 'CategoryConcept';
        };
    };
    /**
     * Find zero or one CategoryConcept that matches the filter.
     * @param {CategoryConceptFindUniqueArgs} args - Arguments to find a CategoryConcept
     * @example
     * // Get one CategoryConcept
     * const categoryConcept = await prisma.categoryConcept.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryConceptFindUniqueArgs>(args: Prisma.SelectSubset<T, CategoryConceptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CategoryConceptClient<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one CategoryConcept that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryConceptFindUniqueOrThrowArgs} args - Arguments to find a CategoryConcept
     * @example
     * // Get one CategoryConcept
     * const categoryConcept = await prisma.categoryConcept.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryConceptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CategoryConceptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryConceptClient<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CategoryConcept that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryConceptFindFirstArgs} args - Arguments to find a CategoryConcept
     * @example
     * // Get one CategoryConcept
     * const categoryConcept = await prisma.categoryConcept.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryConceptFindFirstArgs>(args?: Prisma.SelectSubset<T, CategoryConceptFindFirstArgs<ExtArgs>>): Prisma.Prisma__CategoryConceptClient<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first CategoryConcept that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryConceptFindFirstOrThrowArgs} args - Arguments to find a CategoryConcept
     * @example
     * // Get one CategoryConcept
     * const categoryConcept = await prisma.categoryConcept.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryConceptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CategoryConceptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CategoryConceptClient<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more CategoryConcepts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryConceptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategoryConcepts
     * const categoryConcepts = await prisma.categoryConcept.findMany()
     *
     * // Get first 10 CategoryConcepts
     * const categoryConcepts = await prisma.categoryConcept.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const categoryConceptWithIdOnly = await prisma.categoryConcept.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CategoryConceptFindManyArgs>(args?: Prisma.SelectSubset<T, CategoryConceptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a CategoryConcept.
     * @param {CategoryConceptCreateArgs} args - Arguments to create a CategoryConcept.
     * @example
     * // Create one CategoryConcept
     * const CategoryConcept = await prisma.categoryConcept.create({
     *   data: {
     *     // ... data to create a CategoryConcept
     *   }
     * })
     *
     */
    create<T extends CategoryConceptCreateArgs>(args: Prisma.SelectSubset<T, CategoryConceptCreateArgs<ExtArgs>>): Prisma.Prisma__CategoryConceptClient<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many CategoryConcepts.
     * @param {CategoryConceptCreateManyArgs} args - Arguments to create many CategoryConcepts.
     * @example
     * // Create many CategoryConcepts
     * const categoryConcept = await prisma.categoryConcept.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CategoryConceptCreateManyArgs>(args?: Prisma.SelectSubset<T, CategoryConceptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many CategoryConcepts and returns the data saved in the database.
     * @param {CategoryConceptCreateManyAndReturnArgs} args - Arguments to create many CategoryConcepts.
     * @example
     * // Create many CategoryConcepts
     * const categoryConcept = await prisma.categoryConcept.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many CategoryConcepts and only return the `id`
     * const categoryConceptWithIdOnly = await prisma.categoryConcept.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CategoryConceptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CategoryConceptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a CategoryConcept.
     * @param {CategoryConceptDeleteArgs} args - Arguments to delete one CategoryConcept.
     * @example
     * // Delete one CategoryConcept
     * const CategoryConcept = await prisma.categoryConcept.delete({
     *   where: {
     *     // ... filter to delete one CategoryConcept
     *   }
     * })
     *
     */
    delete<T extends CategoryConceptDeleteArgs>(args: Prisma.SelectSubset<T, CategoryConceptDeleteArgs<ExtArgs>>): Prisma.Prisma__CategoryConceptClient<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one CategoryConcept.
     * @param {CategoryConceptUpdateArgs} args - Arguments to update one CategoryConcept.
     * @example
     * // Update one CategoryConcept
     * const categoryConcept = await prisma.categoryConcept.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CategoryConceptUpdateArgs>(args: Prisma.SelectSubset<T, CategoryConceptUpdateArgs<ExtArgs>>): Prisma.Prisma__CategoryConceptClient<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more CategoryConcepts.
     * @param {CategoryConceptDeleteManyArgs} args - Arguments to filter CategoryConcepts to delete.
     * @example
     * // Delete a few CategoryConcepts
     * const { count } = await prisma.categoryConcept.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CategoryConceptDeleteManyArgs>(args?: Prisma.SelectSubset<T, CategoryConceptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CategoryConcepts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryConceptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategoryConcepts
     * const categoryConcept = await prisma.categoryConcept.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CategoryConceptUpdateManyArgs>(args: Prisma.SelectSubset<T, CategoryConceptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more CategoryConcepts and returns the data updated in the database.
     * @param {CategoryConceptUpdateManyAndReturnArgs} args - Arguments to update many CategoryConcepts.
     * @example
     * // Update many CategoryConcepts
     * const categoryConcept = await prisma.categoryConcept.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more CategoryConcepts and only return the `id`
     * const categoryConceptWithIdOnly = await prisma.categoryConcept.updateManyAndReturn({
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
    updateManyAndReturn<T extends CategoryConceptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CategoryConceptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one CategoryConcept.
     * @param {CategoryConceptUpsertArgs} args - Arguments to update or create a CategoryConcept.
     * @example
     * // Update or create a CategoryConcept
     * const categoryConcept = await prisma.categoryConcept.upsert({
     *   create: {
     *     // ... data to create a CategoryConcept
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategoryConcept we want to update
     *   }
     * })
     */
    upsert<T extends CategoryConceptUpsertArgs>(args: Prisma.SelectSubset<T, CategoryConceptUpsertArgs<ExtArgs>>): Prisma.Prisma__CategoryConceptClient<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of CategoryConcepts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryConceptCountArgs} args - Arguments to filter CategoryConcepts to count.
     * @example
     * // Count the number of CategoryConcepts
     * const count = await prisma.categoryConcept.count({
     *   where: {
     *     // ... the filter for the CategoryConcepts we want to count
     *   }
     * })
    **/
    count<T extends CategoryConceptCountArgs>(args?: Prisma.Subset<T, CategoryConceptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CategoryConceptCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a CategoryConcept.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryConceptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryConceptAggregateArgs>(args: Prisma.Subset<T, CategoryConceptAggregateArgs>): Prisma.PrismaPromise<GetCategoryConceptAggregateType<T>>;
    /**
     * Group by CategoryConcept.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryConceptGroupByArgs} args - Group by arguments.
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
    groupBy<T extends CategoryConceptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CategoryConceptGroupByArgs['orderBy'];
    } : {
        orderBy?: CategoryConceptGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CategoryConceptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryConceptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the CategoryConcept model
     */
    readonly fields: CategoryConceptFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for CategoryConcept.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__CategoryConceptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    category<T extends Prisma.DiscoveryCategoryDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiscoveryCategoryDefaultArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCategoryClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    entityLinks<T extends Prisma.CategoryConcept$entityLinksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryConcept$entityLinksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the CategoryConcept model
 */
export interface CategoryConceptFieldRefs {
    readonly id: Prisma.FieldRef<"CategoryConcept", 'String'>;
    readonly categoryId: Prisma.FieldRef<"CategoryConcept", 'String'>;
    readonly name: Prisma.FieldRef<"CategoryConcept", 'String'>;
    readonly displayName: Prisma.FieldRef<"CategoryConcept", 'String'>;
    readonly description: Prisma.FieldRef<"CategoryConcept", 'String'>;
    readonly conceptType: Prisma.FieldRef<"CategoryConcept", 'String'>;
    readonly url: Prisma.FieldRef<"CategoryConcept", 'String'>;
    readonly maturity: Prisma.FieldRef<"CategoryConcept", 'String'>;
    readonly discoveredBy: Prisma.FieldRef<"CategoryConcept", 'String'>;
    readonly evidenceDescription: Prisma.FieldRef<"CategoryConcept", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CategoryConcept", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CategoryConcept", 'DateTime'>;
}
/**
 * CategoryConcept findUnique
 */
export type CategoryConceptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptInclude<ExtArgs> | null;
    /**
     * Filter, which CategoryConcept to fetch.
     */
    where: Prisma.CategoryConceptWhereUniqueInput;
};
/**
 * CategoryConcept findUniqueOrThrow
 */
export type CategoryConceptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptInclude<ExtArgs> | null;
    /**
     * Filter, which CategoryConcept to fetch.
     */
    where: Prisma.CategoryConceptWhereUniqueInput;
};
/**
 * CategoryConcept findFirst
 */
export type CategoryConceptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptInclude<ExtArgs> | null;
    /**
     * Filter, which CategoryConcept to fetch.
     */
    where?: Prisma.CategoryConceptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CategoryConcepts to fetch.
     */
    orderBy?: Prisma.CategoryConceptOrderByWithRelationInput | Prisma.CategoryConceptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CategoryConcepts.
     */
    cursor?: Prisma.CategoryConceptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CategoryConcepts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CategoryConcepts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CategoryConcepts.
     */
    distinct?: Prisma.CategoryConceptScalarFieldEnum | Prisma.CategoryConceptScalarFieldEnum[];
};
/**
 * CategoryConcept findFirstOrThrow
 */
export type CategoryConceptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptInclude<ExtArgs> | null;
    /**
     * Filter, which CategoryConcept to fetch.
     */
    where?: Prisma.CategoryConceptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CategoryConcepts to fetch.
     */
    orderBy?: Prisma.CategoryConceptOrderByWithRelationInput | Prisma.CategoryConceptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for CategoryConcepts.
     */
    cursor?: Prisma.CategoryConceptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CategoryConcepts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CategoryConcepts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of CategoryConcepts.
     */
    distinct?: Prisma.CategoryConceptScalarFieldEnum | Prisma.CategoryConceptScalarFieldEnum[];
};
/**
 * CategoryConcept findMany
 */
export type CategoryConceptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptInclude<ExtArgs> | null;
    /**
     * Filter, which CategoryConcepts to fetch.
     */
    where?: Prisma.CategoryConceptWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of CategoryConcepts to fetch.
     */
    orderBy?: Prisma.CategoryConceptOrderByWithRelationInput | Prisma.CategoryConceptOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing CategoryConcepts.
     */
    cursor?: Prisma.CategoryConceptWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` CategoryConcepts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` CategoryConcepts.
     */
    skip?: number;
    distinct?: Prisma.CategoryConceptScalarFieldEnum | Prisma.CategoryConceptScalarFieldEnum[];
};
/**
 * CategoryConcept create
 */
export type CategoryConceptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptInclude<ExtArgs> | null;
    /**
     * The data needed to create a CategoryConcept.
     */
    data: Prisma.XOR<Prisma.CategoryConceptCreateInput, Prisma.CategoryConceptUncheckedCreateInput>;
};
/**
 * CategoryConcept createMany
 */
export type CategoryConceptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many CategoryConcepts.
     */
    data: Prisma.CategoryConceptCreateManyInput | Prisma.CategoryConceptCreateManyInput[];
};
/**
 * CategoryConcept createManyAndReturn
 */
export type CategoryConceptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * The data used to create many CategoryConcepts.
     */
    data: Prisma.CategoryConceptCreateManyInput | Prisma.CategoryConceptCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * CategoryConcept update
 */
export type CategoryConceptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptInclude<ExtArgs> | null;
    /**
     * The data needed to update a CategoryConcept.
     */
    data: Prisma.XOR<Prisma.CategoryConceptUpdateInput, Prisma.CategoryConceptUncheckedUpdateInput>;
    /**
     * Choose, which CategoryConcept to update.
     */
    where: Prisma.CategoryConceptWhereUniqueInput;
};
/**
 * CategoryConcept updateMany
 */
export type CategoryConceptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update CategoryConcepts.
     */
    data: Prisma.XOR<Prisma.CategoryConceptUpdateManyMutationInput, Prisma.CategoryConceptUncheckedUpdateManyInput>;
    /**
     * Filter which CategoryConcepts to update
     */
    where?: Prisma.CategoryConceptWhereInput;
    /**
     * Limit how many CategoryConcepts to update.
     */
    limit?: number;
};
/**
 * CategoryConcept updateManyAndReturn
 */
export type CategoryConceptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * The data used to update CategoryConcepts.
     */
    data: Prisma.XOR<Prisma.CategoryConceptUpdateManyMutationInput, Prisma.CategoryConceptUncheckedUpdateManyInput>;
    /**
     * Filter which CategoryConcepts to update
     */
    where?: Prisma.CategoryConceptWhereInput;
    /**
     * Limit how many CategoryConcepts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * CategoryConcept upsert
 */
export type CategoryConceptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptInclude<ExtArgs> | null;
    /**
     * The filter to search for the CategoryConcept to update in case it exists.
     */
    where: Prisma.CategoryConceptWhereUniqueInput;
    /**
     * In case the CategoryConcept found by the `where` argument doesn't exist, create a new CategoryConcept with this data.
     */
    create: Prisma.XOR<Prisma.CategoryConceptCreateInput, Prisma.CategoryConceptUncheckedCreateInput>;
    /**
     * In case the CategoryConcept was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.CategoryConceptUpdateInput, Prisma.CategoryConceptUncheckedUpdateInput>;
};
/**
 * CategoryConcept delete
 */
export type CategoryConceptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptInclude<ExtArgs> | null;
    /**
     * Filter which CategoryConcept to delete.
     */
    where: Prisma.CategoryConceptWhereUniqueInput;
};
/**
 * CategoryConcept deleteMany
 */
export type CategoryConceptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which CategoryConcepts to delete
     */
    where?: Prisma.CategoryConceptWhereInput;
    /**
     * Limit how many CategoryConcepts to delete.
     */
    limit?: number;
};
/**
 * CategoryConcept.entityLinks
 */
export type CategoryConcept$entityLinksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptEntityLink
     */
    select?: Prisma.ConceptEntityLinkSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ConceptEntityLink
     */
    omit?: Prisma.ConceptEntityLinkOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ConceptEntityLinkInclude<ExtArgs> | null;
    where?: Prisma.ConceptEntityLinkWhereInput;
    orderBy?: Prisma.ConceptEntityLinkOrderByWithRelationInput | Prisma.ConceptEntityLinkOrderByWithRelationInput[];
    cursor?: Prisma.ConceptEntityLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConceptEntityLinkScalarFieldEnum | Prisma.ConceptEntityLinkScalarFieldEnum[];
};
/**
 * CategoryConcept without action
 */
export type CategoryConceptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryConcept
     */
    select?: Prisma.CategoryConceptSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the CategoryConcept
     */
    omit?: Prisma.CategoryConceptOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CategoryConceptInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=CategoryConcept.d.ts.map