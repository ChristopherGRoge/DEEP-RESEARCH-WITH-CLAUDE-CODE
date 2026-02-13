import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ConceptEntityLink
 * Junction table linking concepts to entities with correlation strength
 */
export type ConceptEntityLinkModel = runtime.Types.Result.DefaultSelection<Prisma.$ConceptEntityLinkPayload>;
export type AggregateConceptEntityLink = {
    _count: ConceptEntityLinkCountAggregateOutputType | null;
    _avg: ConceptEntityLinkAvgAggregateOutputType | null;
    _sum: ConceptEntityLinkSumAggregateOutputType | null;
    _min: ConceptEntityLinkMinAggregateOutputType | null;
    _max: ConceptEntityLinkMaxAggregateOutputType | null;
};
export type ConceptEntityLinkAvgAggregateOutputType = {
    strength: number | null;
};
export type ConceptEntityLinkSumAggregateOutputType = {
    strength: number | null;
};
export type ConceptEntityLinkMinAggregateOutputType = {
    id: string | null;
    conceptId: string | null;
    entityId: string | null;
    linkType: string | null;
    strength: number | null;
    context: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConceptEntityLinkMaxAggregateOutputType = {
    id: string | null;
    conceptId: string | null;
    entityId: string | null;
    linkType: string | null;
    strength: number | null;
    context: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ConceptEntityLinkCountAggregateOutputType = {
    id: number;
    conceptId: number;
    entityId: number;
    linkType: number;
    strength: number;
    context: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ConceptEntityLinkAvgAggregateInputType = {
    strength?: true;
};
export type ConceptEntityLinkSumAggregateInputType = {
    strength?: true;
};
export type ConceptEntityLinkMinAggregateInputType = {
    id?: true;
    conceptId?: true;
    entityId?: true;
    linkType?: true;
    strength?: true;
    context?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConceptEntityLinkMaxAggregateInputType = {
    id?: true;
    conceptId?: true;
    entityId?: true;
    linkType?: true;
    strength?: true;
    context?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ConceptEntityLinkCountAggregateInputType = {
    id?: true;
    conceptId?: true;
    entityId?: true;
    linkType?: true;
    strength?: true;
    context?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ConceptEntityLinkAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ConceptEntityLink to aggregate.
     */
    where?: Prisma.ConceptEntityLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConceptEntityLinks to fetch.
     */
    orderBy?: Prisma.ConceptEntityLinkOrderByWithRelationInput | Prisma.ConceptEntityLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ConceptEntityLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConceptEntityLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConceptEntityLinks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ConceptEntityLinks
    **/
    _count?: true | ConceptEntityLinkCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ConceptEntityLinkAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ConceptEntityLinkSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ConceptEntityLinkMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ConceptEntityLinkMaxAggregateInputType;
};
export type GetConceptEntityLinkAggregateType<T extends ConceptEntityLinkAggregateArgs> = {
    [P in keyof T & keyof AggregateConceptEntityLink]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConceptEntityLink[P]> : Prisma.GetScalarType<T[P], AggregateConceptEntityLink[P]>;
};
export type ConceptEntityLinkGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConceptEntityLinkWhereInput;
    orderBy?: Prisma.ConceptEntityLinkOrderByWithAggregationInput | Prisma.ConceptEntityLinkOrderByWithAggregationInput[];
    by: Prisma.ConceptEntityLinkScalarFieldEnum[] | Prisma.ConceptEntityLinkScalarFieldEnum;
    having?: Prisma.ConceptEntityLinkScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConceptEntityLinkCountAggregateInputType | true;
    _avg?: ConceptEntityLinkAvgAggregateInputType;
    _sum?: ConceptEntityLinkSumAggregateInputType;
    _min?: ConceptEntityLinkMinAggregateInputType;
    _max?: ConceptEntityLinkMaxAggregateInputType;
};
export type ConceptEntityLinkGroupByOutputType = {
    id: string;
    conceptId: string;
    entityId: string;
    linkType: string;
    strength: number;
    context: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ConceptEntityLinkCountAggregateOutputType | null;
    _avg: ConceptEntityLinkAvgAggregateOutputType | null;
    _sum: ConceptEntityLinkSumAggregateOutputType | null;
    _min: ConceptEntityLinkMinAggregateOutputType | null;
    _max: ConceptEntityLinkMaxAggregateOutputType | null;
};
type GetConceptEntityLinkGroupByPayload<T extends ConceptEntityLinkGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConceptEntityLinkGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConceptEntityLinkGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConceptEntityLinkGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConceptEntityLinkGroupByOutputType[P]>;
}>>;
export type ConceptEntityLinkWhereInput = {
    AND?: Prisma.ConceptEntityLinkWhereInput | Prisma.ConceptEntityLinkWhereInput[];
    OR?: Prisma.ConceptEntityLinkWhereInput[];
    NOT?: Prisma.ConceptEntityLinkWhereInput | Prisma.ConceptEntityLinkWhereInput[];
    id?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    conceptId?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    entityId?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    linkType?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    strength?: Prisma.FloatFilter<"ConceptEntityLink"> | number;
    context?: Prisma.StringNullableFilter<"ConceptEntityLink"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ConceptEntityLink"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ConceptEntityLink"> | Date | string;
    concept?: Prisma.XOR<Prisma.CategoryConceptScalarRelationFilter, Prisma.CategoryConceptWhereInput>;
    entity?: Prisma.XOR<Prisma.EntityScalarRelationFilter, Prisma.EntityWhereInput>;
};
export type ConceptEntityLinkOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    conceptId?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    linkType?: Prisma.SortOrder;
    strength?: Prisma.SortOrder;
    context?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    concept?: Prisma.CategoryConceptOrderByWithRelationInput;
    entity?: Prisma.EntityOrderByWithRelationInput;
};
export type ConceptEntityLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    conceptId_entityId?: Prisma.ConceptEntityLinkConceptIdEntityIdCompoundUniqueInput;
    AND?: Prisma.ConceptEntityLinkWhereInput | Prisma.ConceptEntityLinkWhereInput[];
    OR?: Prisma.ConceptEntityLinkWhereInput[];
    NOT?: Prisma.ConceptEntityLinkWhereInput | Prisma.ConceptEntityLinkWhereInput[];
    conceptId?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    entityId?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    linkType?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    strength?: Prisma.FloatFilter<"ConceptEntityLink"> | number;
    context?: Prisma.StringNullableFilter<"ConceptEntityLink"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ConceptEntityLink"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ConceptEntityLink"> | Date | string;
    concept?: Prisma.XOR<Prisma.CategoryConceptScalarRelationFilter, Prisma.CategoryConceptWhereInput>;
    entity?: Prisma.XOR<Prisma.EntityScalarRelationFilter, Prisma.EntityWhereInput>;
}, "id" | "conceptId_entityId">;
export type ConceptEntityLinkOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    conceptId?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    linkType?: Prisma.SortOrder;
    strength?: Prisma.SortOrder;
    context?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ConceptEntityLinkCountOrderByAggregateInput;
    _avg?: Prisma.ConceptEntityLinkAvgOrderByAggregateInput;
    _max?: Prisma.ConceptEntityLinkMaxOrderByAggregateInput;
    _min?: Prisma.ConceptEntityLinkMinOrderByAggregateInput;
    _sum?: Prisma.ConceptEntityLinkSumOrderByAggregateInput;
};
export type ConceptEntityLinkScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConceptEntityLinkScalarWhereWithAggregatesInput | Prisma.ConceptEntityLinkScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConceptEntityLinkScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConceptEntityLinkScalarWhereWithAggregatesInput | Prisma.ConceptEntityLinkScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ConceptEntityLink"> | string;
    conceptId?: Prisma.StringWithAggregatesFilter<"ConceptEntityLink"> | string;
    entityId?: Prisma.StringWithAggregatesFilter<"ConceptEntityLink"> | string;
    linkType?: Prisma.StringWithAggregatesFilter<"ConceptEntityLink"> | string;
    strength?: Prisma.FloatWithAggregatesFilter<"ConceptEntityLink"> | number;
    context?: Prisma.StringNullableWithAggregatesFilter<"ConceptEntityLink"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ConceptEntityLink"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ConceptEntityLink"> | Date | string;
};
export type ConceptEntityLinkCreateInput = {
    id?: string;
    linkType?: string;
    strength?: number;
    context?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    concept: Prisma.CategoryConceptCreateNestedOneWithoutEntityLinksInput;
    entity: Prisma.EntityCreateNestedOneWithoutConceptLinksInput;
};
export type ConceptEntityLinkUncheckedCreateInput = {
    id?: string;
    conceptId: string;
    entityId: string;
    linkType?: string;
    strength?: number;
    context?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConceptEntityLinkUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    linkType?: Prisma.StringFieldUpdateOperationsInput | string;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    concept?: Prisma.CategoryConceptUpdateOneRequiredWithoutEntityLinksNestedInput;
    entity?: Prisma.EntityUpdateOneRequiredWithoutConceptLinksNestedInput;
};
export type ConceptEntityLinkUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conceptId?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    linkType?: Prisma.StringFieldUpdateOperationsInput | string;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConceptEntityLinkCreateManyInput = {
    id?: string;
    conceptId: string;
    entityId: string;
    linkType?: string;
    strength?: number;
    context?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConceptEntityLinkUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    linkType?: Prisma.StringFieldUpdateOperationsInput | string;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConceptEntityLinkUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conceptId?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    linkType?: Prisma.StringFieldUpdateOperationsInput | string;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConceptEntityLinkListRelationFilter = {
    every?: Prisma.ConceptEntityLinkWhereInput;
    some?: Prisma.ConceptEntityLinkWhereInput;
    none?: Prisma.ConceptEntityLinkWhereInput;
};
export type ConceptEntityLinkOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConceptEntityLinkConceptIdEntityIdCompoundUniqueInput = {
    conceptId: string;
    entityId: string;
};
export type ConceptEntityLinkCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conceptId?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    linkType?: Prisma.SortOrder;
    strength?: Prisma.SortOrder;
    context?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConceptEntityLinkAvgOrderByAggregateInput = {
    strength?: Prisma.SortOrder;
};
export type ConceptEntityLinkMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conceptId?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    linkType?: Prisma.SortOrder;
    strength?: Prisma.SortOrder;
    context?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConceptEntityLinkMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conceptId?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    linkType?: Prisma.SortOrder;
    strength?: Prisma.SortOrder;
    context?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ConceptEntityLinkSumOrderByAggregateInput = {
    strength?: Prisma.SortOrder;
};
export type ConceptEntityLinkCreateNestedManyWithoutEntityInput = {
    create?: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutEntityInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutEntityInput> | Prisma.ConceptEntityLinkCreateWithoutEntityInput[] | Prisma.ConceptEntityLinkUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.ConceptEntityLinkCreateOrConnectWithoutEntityInput | Prisma.ConceptEntityLinkCreateOrConnectWithoutEntityInput[];
    createMany?: Prisma.ConceptEntityLinkCreateManyEntityInputEnvelope;
    connect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
};
export type ConceptEntityLinkUncheckedCreateNestedManyWithoutEntityInput = {
    create?: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutEntityInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutEntityInput> | Prisma.ConceptEntityLinkCreateWithoutEntityInput[] | Prisma.ConceptEntityLinkUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.ConceptEntityLinkCreateOrConnectWithoutEntityInput | Prisma.ConceptEntityLinkCreateOrConnectWithoutEntityInput[];
    createMany?: Prisma.ConceptEntityLinkCreateManyEntityInputEnvelope;
    connect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
};
export type ConceptEntityLinkUpdateManyWithoutEntityNestedInput = {
    create?: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutEntityInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutEntityInput> | Prisma.ConceptEntityLinkCreateWithoutEntityInput[] | Prisma.ConceptEntityLinkUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.ConceptEntityLinkCreateOrConnectWithoutEntityInput | Prisma.ConceptEntityLinkCreateOrConnectWithoutEntityInput[];
    upsert?: Prisma.ConceptEntityLinkUpsertWithWhereUniqueWithoutEntityInput | Prisma.ConceptEntityLinkUpsertWithWhereUniqueWithoutEntityInput[];
    createMany?: Prisma.ConceptEntityLinkCreateManyEntityInputEnvelope;
    set?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    disconnect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    delete?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    connect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    update?: Prisma.ConceptEntityLinkUpdateWithWhereUniqueWithoutEntityInput | Prisma.ConceptEntityLinkUpdateWithWhereUniqueWithoutEntityInput[];
    updateMany?: Prisma.ConceptEntityLinkUpdateManyWithWhereWithoutEntityInput | Prisma.ConceptEntityLinkUpdateManyWithWhereWithoutEntityInput[];
    deleteMany?: Prisma.ConceptEntityLinkScalarWhereInput | Prisma.ConceptEntityLinkScalarWhereInput[];
};
export type ConceptEntityLinkUncheckedUpdateManyWithoutEntityNestedInput = {
    create?: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutEntityInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutEntityInput> | Prisma.ConceptEntityLinkCreateWithoutEntityInput[] | Prisma.ConceptEntityLinkUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.ConceptEntityLinkCreateOrConnectWithoutEntityInput | Prisma.ConceptEntityLinkCreateOrConnectWithoutEntityInput[];
    upsert?: Prisma.ConceptEntityLinkUpsertWithWhereUniqueWithoutEntityInput | Prisma.ConceptEntityLinkUpsertWithWhereUniqueWithoutEntityInput[];
    createMany?: Prisma.ConceptEntityLinkCreateManyEntityInputEnvelope;
    set?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    disconnect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    delete?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    connect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    update?: Prisma.ConceptEntityLinkUpdateWithWhereUniqueWithoutEntityInput | Prisma.ConceptEntityLinkUpdateWithWhereUniqueWithoutEntityInput[];
    updateMany?: Prisma.ConceptEntityLinkUpdateManyWithWhereWithoutEntityInput | Prisma.ConceptEntityLinkUpdateManyWithWhereWithoutEntityInput[];
    deleteMany?: Prisma.ConceptEntityLinkScalarWhereInput | Prisma.ConceptEntityLinkScalarWhereInput[];
};
export type ConceptEntityLinkCreateNestedManyWithoutConceptInput = {
    create?: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutConceptInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutConceptInput> | Prisma.ConceptEntityLinkCreateWithoutConceptInput[] | Prisma.ConceptEntityLinkUncheckedCreateWithoutConceptInput[];
    connectOrCreate?: Prisma.ConceptEntityLinkCreateOrConnectWithoutConceptInput | Prisma.ConceptEntityLinkCreateOrConnectWithoutConceptInput[];
    createMany?: Prisma.ConceptEntityLinkCreateManyConceptInputEnvelope;
    connect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
};
export type ConceptEntityLinkUncheckedCreateNestedManyWithoutConceptInput = {
    create?: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutConceptInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutConceptInput> | Prisma.ConceptEntityLinkCreateWithoutConceptInput[] | Prisma.ConceptEntityLinkUncheckedCreateWithoutConceptInput[];
    connectOrCreate?: Prisma.ConceptEntityLinkCreateOrConnectWithoutConceptInput | Prisma.ConceptEntityLinkCreateOrConnectWithoutConceptInput[];
    createMany?: Prisma.ConceptEntityLinkCreateManyConceptInputEnvelope;
    connect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
};
export type ConceptEntityLinkUpdateManyWithoutConceptNestedInput = {
    create?: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutConceptInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutConceptInput> | Prisma.ConceptEntityLinkCreateWithoutConceptInput[] | Prisma.ConceptEntityLinkUncheckedCreateWithoutConceptInput[];
    connectOrCreate?: Prisma.ConceptEntityLinkCreateOrConnectWithoutConceptInput | Prisma.ConceptEntityLinkCreateOrConnectWithoutConceptInput[];
    upsert?: Prisma.ConceptEntityLinkUpsertWithWhereUniqueWithoutConceptInput | Prisma.ConceptEntityLinkUpsertWithWhereUniqueWithoutConceptInput[];
    createMany?: Prisma.ConceptEntityLinkCreateManyConceptInputEnvelope;
    set?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    disconnect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    delete?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    connect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    update?: Prisma.ConceptEntityLinkUpdateWithWhereUniqueWithoutConceptInput | Prisma.ConceptEntityLinkUpdateWithWhereUniqueWithoutConceptInput[];
    updateMany?: Prisma.ConceptEntityLinkUpdateManyWithWhereWithoutConceptInput | Prisma.ConceptEntityLinkUpdateManyWithWhereWithoutConceptInput[];
    deleteMany?: Prisma.ConceptEntityLinkScalarWhereInput | Prisma.ConceptEntityLinkScalarWhereInput[];
};
export type ConceptEntityLinkUncheckedUpdateManyWithoutConceptNestedInput = {
    create?: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutConceptInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutConceptInput> | Prisma.ConceptEntityLinkCreateWithoutConceptInput[] | Prisma.ConceptEntityLinkUncheckedCreateWithoutConceptInput[];
    connectOrCreate?: Prisma.ConceptEntityLinkCreateOrConnectWithoutConceptInput | Prisma.ConceptEntityLinkCreateOrConnectWithoutConceptInput[];
    upsert?: Prisma.ConceptEntityLinkUpsertWithWhereUniqueWithoutConceptInput | Prisma.ConceptEntityLinkUpsertWithWhereUniqueWithoutConceptInput[];
    createMany?: Prisma.ConceptEntityLinkCreateManyConceptInputEnvelope;
    set?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    disconnect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    delete?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    connect?: Prisma.ConceptEntityLinkWhereUniqueInput | Prisma.ConceptEntityLinkWhereUniqueInput[];
    update?: Prisma.ConceptEntityLinkUpdateWithWhereUniqueWithoutConceptInput | Prisma.ConceptEntityLinkUpdateWithWhereUniqueWithoutConceptInput[];
    updateMany?: Prisma.ConceptEntityLinkUpdateManyWithWhereWithoutConceptInput | Prisma.ConceptEntityLinkUpdateManyWithWhereWithoutConceptInput[];
    deleteMany?: Prisma.ConceptEntityLinkScalarWhereInput | Prisma.ConceptEntityLinkScalarWhereInput[];
};
export type ConceptEntityLinkCreateWithoutEntityInput = {
    id?: string;
    linkType?: string;
    strength?: number;
    context?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    concept: Prisma.CategoryConceptCreateNestedOneWithoutEntityLinksInput;
};
export type ConceptEntityLinkUncheckedCreateWithoutEntityInput = {
    id?: string;
    conceptId: string;
    linkType?: string;
    strength?: number;
    context?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConceptEntityLinkCreateOrConnectWithoutEntityInput = {
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutEntityInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutEntityInput>;
};
export type ConceptEntityLinkCreateManyEntityInputEnvelope = {
    data: Prisma.ConceptEntityLinkCreateManyEntityInput | Prisma.ConceptEntityLinkCreateManyEntityInput[];
};
export type ConceptEntityLinkUpsertWithWhereUniqueWithoutEntityInput = {
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConceptEntityLinkUpdateWithoutEntityInput, Prisma.ConceptEntityLinkUncheckedUpdateWithoutEntityInput>;
    create: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutEntityInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutEntityInput>;
};
export type ConceptEntityLinkUpdateWithWhereUniqueWithoutEntityInput = {
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConceptEntityLinkUpdateWithoutEntityInput, Prisma.ConceptEntityLinkUncheckedUpdateWithoutEntityInput>;
};
export type ConceptEntityLinkUpdateManyWithWhereWithoutEntityInput = {
    where: Prisma.ConceptEntityLinkScalarWhereInput;
    data: Prisma.XOR<Prisma.ConceptEntityLinkUpdateManyMutationInput, Prisma.ConceptEntityLinkUncheckedUpdateManyWithoutEntityInput>;
};
export type ConceptEntityLinkScalarWhereInput = {
    AND?: Prisma.ConceptEntityLinkScalarWhereInput | Prisma.ConceptEntityLinkScalarWhereInput[];
    OR?: Prisma.ConceptEntityLinkScalarWhereInput[];
    NOT?: Prisma.ConceptEntityLinkScalarWhereInput | Prisma.ConceptEntityLinkScalarWhereInput[];
    id?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    conceptId?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    entityId?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    linkType?: Prisma.StringFilter<"ConceptEntityLink"> | string;
    strength?: Prisma.FloatFilter<"ConceptEntityLink"> | number;
    context?: Prisma.StringNullableFilter<"ConceptEntityLink"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ConceptEntityLink"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ConceptEntityLink"> | Date | string;
};
export type ConceptEntityLinkCreateWithoutConceptInput = {
    id?: string;
    linkType?: string;
    strength?: number;
    context?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entity: Prisma.EntityCreateNestedOneWithoutConceptLinksInput;
};
export type ConceptEntityLinkUncheckedCreateWithoutConceptInput = {
    id?: string;
    entityId: string;
    linkType?: string;
    strength?: number;
    context?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConceptEntityLinkCreateOrConnectWithoutConceptInput = {
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutConceptInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutConceptInput>;
};
export type ConceptEntityLinkCreateManyConceptInputEnvelope = {
    data: Prisma.ConceptEntityLinkCreateManyConceptInput | Prisma.ConceptEntityLinkCreateManyConceptInput[];
};
export type ConceptEntityLinkUpsertWithWhereUniqueWithoutConceptInput = {
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConceptEntityLinkUpdateWithoutConceptInput, Prisma.ConceptEntityLinkUncheckedUpdateWithoutConceptInput>;
    create: Prisma.XOR<Prisma.ConceptEntityLinkCreateWithoutConceptInput, Prisma.ConceptEntityLinkUncheckedCreateWithoutConceptInput>;
};
export type ConceptEntityLinkUpdateWithWhereUniqueWithoutConceptInput = {
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConceptEntityLinkUpdateWithoutConceptInput, Prisma.ConceptEntityLinkUncheckedUpdateWithoutConceptInput>;
};
export type ConceptEntityLinkUpdateManyWithWhereWithoutConceptInput = {
    where: Prisma.ConceptEntityLinkScalarWhereInput;
    data: Prisma.XOR<Prisma.ConceptEntityLinkUpdateManyMutationInput, Prisma.ConceptEntityLinkUncheckedUpdateManyWithoutConceptInput>;
};
export type ConceptEntityLinkCreateManyEntityInput = {
    id?: string;
    conceptId: string;
    linkType?: string;
    strength?: number;
    context?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConceptEntityLinkUpdateWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    linkType?: Prisma.StringFieldUpdateOperationsInput | string;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    concept?: Prisma.CategoryConceptUpdateOneRequiredWithoutEntityLinksNestedInput;
};
export type ConceptEntityLinkUncheckedUpdateWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conceptId?: Prisma.StringFieldUpdateOperationsInput | string;
    linkType?: Prisma.StringFieldUpdateOperationsInput | string;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConceptEntityLinkUncheckedUpdateManyWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conceptId?: Prisma.StringFieldUpdateOperationsInput | string;
    linkType?: Prisma.StringFieldUpdateOperationsInput | string;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConceptEntityLinkCreateManyConceptInput = {
    id?: string;
    entityId: string;
    linkType?: string;
    strength?: number;
    context?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ConceptEntityLinkUpdateWithoutConceptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    linkType?: Prisma.StringFieldUpdateOperationsInput | string;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entity?: Prisma.EntityUpdateOneRequiredWithoutConceptLinksNestedInput;
};
export type ConceptEntityLinkUncheckedUpdateWithoutConceptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    linkType?: Prisma.StringFieldUpdateOperationsInput | string;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConceptEntityLinkUncheckedUpdateManyWithoutConceptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    linkType?: Prisma.StringFieldUpdateOperationsInput | string;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConceptEntityLinkSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conceptId?: boolean;
    entityId?: boolean;
    linkType?: boolean;
    strength?: boolean;
    context?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    concept?: boolean | Prisma.CategoryConceptDefaultArgs<ExtArgs>;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conceptEntityLink"]>;
export type ConceptEntityLinkSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conceptId?: boolean;
    entityId?: boolean;
    linkType?: boolean;
    strength?: boolean;
    context?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    concept?: boolean | Prisma.CategoryConceptDefaultArgs<ExtArgs>;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conceptEntityLink"]>;
export type ConceptEntityLinkSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conceptId?: boolean;
    entityId?: boolean;
    linkType?: boolean;
    strength?: boolean;
    context?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    concept?: boolean | Prisma.CategoryConceptDefaultArgs<ExtArgs>;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conceptEntityLink"]>;
export type ConceptEntityLinkSelectScalar = {
    id?: boolean;
    conceptId?: boolean;
    entityId?: boolean;
    linkType?: boolean;
    strength?: boolean;
    context?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ConceptEntityLinkOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "conceptId" | "entityId" | "linkType" | "strength" | "context" | "createdAt" | "updatedAt", ExtArgs["result"]["conceptEntityLink"]>;
export type ConceptEntityLinkInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    concept?: boolean | Prisma.CategoryConceptDefaultArgs<ExtArgs>;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type ConceptEntityLinkIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    concept?: boolean | Prisma.CategoryConceptDefaultArgs<ExtArgs>;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type ConceptEntityLinkIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    concept?: boolean | Prisma.CategoryConceptDefaultArgs<ExtArgs>;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type $ConceptEntityLinkPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ConceptEntityLink";
    objects: {
        concept: Prisma.$CategoryConceptPayload<ExtArgs>;
        entity: Prisma.$EntityPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        conceptId: string;
        entityId: string;
        linkType: string;
        strength: number;
        context: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["conceptEntityLink"]>;
    composites: {};
};
export type ConceptEntityLinkGetPayload<S extends boolean | null | undefined | ConceptEntityLinkDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload, S>;
export type ConceptEntityLinkCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConceptEntityLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConceptEntityLinkCountAggregateInputType | true;
};
export interface ConceptEntityLinkDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ConceptEntityLink'];
        meta: {
            name: 'ConceptEntityLink';
        };
    };
    /**
     * Find zero or one ConceptEntityLink that matches the filter.
     * @param {ConceptEntityLinkFindUniqueArgs} args - Arguments to find a ConceptEntityLink
     * @example
     * // Get one ConceptEntityLink
     * const conceptEntityLink = await prisma.conceptEntityLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConceptEntityLinkFindUniqueArgs>(args: Prisma.SelectSubset<T, ConceptEntityLinkFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConceptEntityLinkClient<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ConceptEntityLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConceptEntityLinkFindUniqueOrThrowArgs} args - Arguments to find a ConceptEntityLink
     * @example
     * // Get one ConceptEntityLink
     * const conceptEntityLink = await prisma.conceptEntityLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConceptEntityLinkFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConceptEntityLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConceptEntityLinkClient<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ConceptEntityLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptEntityLinkFindFirstArgs} args - Arguments to find a ConceptEntityLink
     * @example
     * // Get one ConceptEntityLink
     * const conceptEntityLink = await prisma.conceptEntityLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConceptEntityLinkFindFirstArgs>(args?: Prisma.SelectSubset<T, ConceptEntityLinkFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConceptEntityLinkClient<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ConceptEntityLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptEntityLinkFindFirstOrThrowArgs} args - Arguments to find a ConceptEntityLink
     * @example
     * // Get one ConceptEntityLink
     * const conceptEntityLink = await prisma.conceptEntityLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConceptEntityLinkFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConceptEntityLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConceptEntityLinkClient<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ConceptEntityLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptEntityLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConceptEntityLinks
     * const conceptEntityLinks = await prisma.conceptEntityLink.findMany()
     *
     * // Get first 10 ConceptEntityLinks
     * const conceptEntityLinks = await prisma.conceptEntityLink.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const conceptEntityLinkWithIdOnly = await prisma.conceptEntityLink.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ConceptEntityLinkFindManyArgs>(args?: Prisma.SelectSubset<T, ConceptEntityLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ConceptEntityLink.
     * @param {ConceptEntityLinkCreateArgs} args - Arguments to create a ConceptEntityLink.
     * @example
     * // Create one ConceptEntityLink
     * const ConceptEntityLink = await prisma.conceptEntityLink.create({
     *   data: {
     *     // ... data to create a ConceptEntityLink
     *   }
     * })
     *
     */
    create<T extends ConceptEntityLinkCreateArgs>(args: Prisma.SelectSubset<T, ConceptEntityLinkCreateArgs<ExtArgs>>): Prisma.Prisma__ConceptEntityLinkClient<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ConceptEntityLinks.
     * @param {ConceptEntityLinkCreateManyArgs} args - Arguments to create many ConceptEntityLinks.
     * @example
     * // Create many ConceptEntityLinks
     * const conceptEntityLink = await prisma.conceptEntityLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ConceptEntityLinkCreateManyArgs>(args?: Prisma.SelectSubset<T, ConceptEntityLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ConceptEntityLinks and returns the data saved in the database.
     * @param {ConceptEntityLinkCreateManyAndReturnArgs} args - Arguments to create many ConceptEntityLinks.
     * @example
     * // Create many ConceptEntityLinks
     * const conceptEntityLink = await prisma.conceptEntityLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ConceptEntityLinks and only return the `id`
     * const conceptEntityLinkWithIdOnly = await prisma.conceptEntityLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ConceptEntityLinkCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConceptEntityLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ConceptEntityLink.
     * @param {ConceptEntityLinkDeleteArgs} args - Arguments to delete one ConceptEntityLink.
     * @example
     * // Delete one ConceptEntityLink
     * const ConceptEntityLink = await prisma.conceptEntityLink.delete({
     *   where: {
     *     // ... filter to delete one ConceptEntityLink
     *   }
     * })
     *
     */
    delete<T extends ConceptEntityLinkDeleteArgs>(args: Prisma.SelectSubset<T, ConceptEntityLinkDeleteArgs<ExtArgs>>): Prisma.Prisma__ConceptEntityLinkClient<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ConceptEntityLink.
     * @param {ConceptEntityLinkUpdateArgs} args - Arguments to update one ConceptEntityLink.
     * @example
     * // Update one ConceptEntityLink
     * const conceptEntityLink = await prisma.conceptEntityLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ConceptEntityLinkUpdateArgs>(args: Prisma.SelectSubset<T, ConceptEntityLinkUpdateArgs<ExtArgs>>): Prisma.Prisma__ConceptEntityLinkClient<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ConceptEntityLinks.
     * @param {ConceptEntityLinkDeleteManyArgs} args - Arguments to filter ConceptEntityLinks to delete.
     * @example
     * // Delete a few ConceptEntityLinks
     * const { count } = await prisma.conceptEntityLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ConceptEntityLinkDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConceptEntityLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ConceptEntityLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptEntityLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConceptEntityLinks
     * const conceptEntityLink = await prisma.conceptEntityLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ConceptEntityLinkUpdateManyArgs>(args: Prisma.SelectSubset<T, ConceptEntityLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ConceptEntityLinks and returns the data updated in the database.
     * @param {ConceptEntityLinkUpdateManyAndReturnArgs} args - Arguments to update many ConceptEntityLinks.
     * @example
     * // Update many ConceptEntityLinks
     * const conceptEntityLink = await prisma.conceptEntityLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ConceptEntityLinks and only return the `id`
     * const conceptEntityLinkWithIdOnly = await prisma.conceptEntityLink.updateManyAndReturn({
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
    updateManyAndReturn<T extends ConceptEntityLinkUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConceptEntityLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ConceptEntityLink.
     * @param {ConceptEntityLinkUpsertArgs} args - Arguments to update or create a ConceptEntityLink.
     * @example
     * // Update or create a ConceptEntityLink
     * const conceptEntityLink = await prisma.conceptEntityLink.upsert({
     *   create: {
     *     // ... data to create a ConceptEntityLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConceptEntityLink we want to update
     *   }
     * })
     */
    upsert<T extends ConceptEntityLinkUpsertArgs>(args: Prisma.SelectSubset<T, ConceptEntityLinkUpsertArgs<ExtArgs>>): Prisma.Prisma__ConceptEntityLinkClient<runtime.Types.Result.GetResult<Prisma.$ConceptEntityLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ConceptEntityLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptEntityLinkCountArgs} args - Arguments to filter ConceptEntityLinks to count.
     * @example
     * // Count the number of ConceptEntityLinks
     * const count = await prisma.conceptEntityLink.count({
     *   where: {
     *     // ... the filter for the ConceptEntityLinks we want to count
     *   }
     * })
    **/
    count<T extends ConceptEntityLinkCountArgs>(args?: Prisma.Subset<T, ConceptEntityLinkCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConceptEntityLinkCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ConceptEntityLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptEntityLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConceptEntityLinkAggregateArgs>(args: Prisma.Subset<T, ConceptEntityLinkAggregateArgs>): Prisma.PrismaPromise<GetConceptEntityLinkAggregateType<T>>;
    /**
     * Group by ConceptEntityLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptEntityLinkGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ConceptEntityLinkGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConceptEntityLinkGroupByArgs['orderBy'];
    } : {
        orderBy?: ConceptEntityLinkGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConceptEntityLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConceptEntityLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ConceptEntityLink model
     */
    readonly fields: ConceptEntityLinkFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ConceptEntityLink.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ConceptEntityLinkClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    concept<T extends Prisma.CategoryConceptDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CategoryConceptDefaultArgs<ExtArgs>>): Prisma.Prisma__CategoryConceptClient<runtime.Types.Result.GetResult<Prisma.$CategoryConceptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    entity<T extends Prisma.EntityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EntityDefaultArgs<ExtArgs>>): Prisma.Prisma__EntityClient<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ConceptEntityLink model
 */
export interface ConceptEntityLinkFieldRefs {
    readonly id: Prisma.FieldRef<"ConceptEntityLink", 'String'>;
    readonly conceptId: Prisma.FieldRef<"ConceptEntityLink", 'String'>;
    readonly entityId: Prisma.FieldRef<"ConceptEntityLink", 'String'>;
    readonly linkType: Prisma.FieldRef<"ConceptEntityLink", 'String'>;
    readonly strength: Prisma.FieldRef<"ConceptEntityLink", 'Float'>;
    readonly context: Prisma.FieldRef<"ConceptEntityLink", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ConceptEntityLink", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ConceptEntityLink", 'DateTime'>;
}
/**
 * ConceptEntityLink findUnique
 */
export type ConceptEntityLinkFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ConceptEntityLink to fetch.
     */
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
};
/**
 * ConceptEntityLink findUniqueOrThrow
 */
export type ConceptEntityLinkFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ConceptEntityLink to fetch.
     */
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
};
/**
 * ConceptEntityLink findFirst
 */
export type ConceptEntityLinkFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ConceptEntityLink to fetch.
     */
    where?: Prisma.ConceptEntityLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConceptEntityLinks to fetch.
     */
    orderBy?: Prisma.ConceptEntityLinkOrderByWithRelationInput | Prisma.ConceptEntityLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ConceptEntityLinks.
     */
    cursor?: Prisma.ConceptEntityLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConceptEntityLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConceptEntityLinks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ConceptEntityLinks.
     */
    distinct?: Prisma.ConceptEntityLinkScalarFieldEnum | Prisma.ConceptEntityLinkScalarFieldEnum[];
};
/**
 * ConceptEntityLink findFirstOrThrow
 */
export type ConceptEntityLinkFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ConceptEntityLink to fetch.
     */
    where?: Prisma.ConceptEntityLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConceptEntityLinks to fetch.
     */
    orderBy?: Prisma.ConceptEntityLinkOrderByWithRelationInput | Prisma.ConceptEntityLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ConceptEntityLinks.
     */
    cursor?: Prisma.ConceptEntityLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConceptEntityLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConceptEntityLinks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ConceptEntityLinks.
     */
    distinct?: Prisma.ConceptEntityLinkScalarFieldEnum | Prisma.ConceptEntityLinkScalarFieldEnum[];
};
/**
 * ConceptEntityLink findMany
 */
export type ConceptEntityLinkFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ConceptEntityLinks to fetch.
     */
    where?: Prisma.ConceptEntityLinkWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ConceptEntityLinks to fetch.
     */
    orderBy?: Prisma.ConceptEntityLinkOrderByWithRelationInput | Prisma.ConceptEntityLinkOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ConceptEntityLinks.
     */
    cursor?: Prisma.ConceptEntityLinkWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ConceptEntityLinks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ConceptEntityLinks.
     */
    skip?: number;
    distinct?: Prisma.ConceptEntityLinkScalarFieldEnum | Prisma.ConceptEntityLinkScalarFieldEnum[];
};
/**
 * ConceptEntityLink create
 */
export type ConceptEntityLinkCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a ConceptEntityLink.
     */
    data: Prisma.XOR<Prisma.ConceptEntityLinkCreateInput, Prisma.ConceptEntityLinkUncheckedCreateInput>;
};
/**
 * ConceptEntityLink createMany
 */
export type ConceptEntityLinkCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConceptEntityLinks.
     */
    data: Prisma.ConceptEntityLinkCreateManyInput | Prisma.ConceptEntityLinkCreateManyInput[];
};
/**
 * ConceptEntityLink createManyAndReturn
 */
export type ConceptEntityLinkCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptEntityLink
     */
    select?: Prisma.ConceptEntityLinkSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ConceptEntityLink
     */
    omit?: Prisma.ConceptEntityLinkOmit<ExtArgs> | null;
    /**
     * The data used to create many ConceptEntityLinks.
     */
    data: Prisma.ConceptEntityLinkCreateManyInput | Prisma.ConceptEntityLinkCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ConceptEntityLinkIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ConceptEntityLink update
 */
export type ConceptEntityLinkUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a ConceptEntityLink.
     */
    data: Prisma.XOR<Prisma.ConceptEntityLinkUpdateInput, Prisma.ConceptEntityLinkUncheckedUpdateInput>;
    /**
     * Choose, which ConceptEntityLink to update.
     */
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
};
/**
 * ConceptEntityLink updateMany
 */
export type ConceptEntityLinkUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ConceptEntityLinks.
     */
    data: Prisma.XOR<Prisma.ConceptEntityLinkUpdateManyMutationInput, Prisma.ConceptEntityLinkUncheckedUpdateManyInput>;
    /**
     * Filter which ConceptEntityLinks to update
     */
    where?: Prisma.ConceptEntityLinkWhereInput;
    /**
     * Limit how many ConceptEntityLinks to update.
     */
    limit?: number;
};
/**
 * ConceptEntityLink updateManyAndReturn
 */
export type ConceptEntityLinkUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptEntityLink
     */
    select?: Prisma.ConceptEntityLinkSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ConceptEntityLink
     */
    omit?: Prisma.ConceptEntityLinkOmit<ExtArgs> | null;
    /**
     * The data used to update ConceptEntityLinks.
     */
    data: Prisma.XOR<Prisma.ConceptEntityLinkUpdateManyMutationInput, Prisma.ConceptEntityLinkUncheckedUpdateManyInput>;
    /**
     * Filter which ConceptEntityLinks to update
     */
    where?: Prisma.ConceptEntityLinkWhereInput;
    /**
     * Limit how many ConceptEntityLinks to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ConceptEntityLinkIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ConceptEntityLink upsert
 */
export type ConceptEntityLinkUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the ConceptEntityLink to update in case it exists.
     */
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
    /**
     * In case the ConceptEntityLink found by the `where` argument doesn't exist, create a new ConceptEntityLink with this data.
     */
    create: Prisma.XOR<Prisma.ConceptEntityLinkCreateInput, Prisma.ConceptEntityLinkUncheckedCreateInput>;
    /**
     * In case the ConceptEntityLink was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ConceptEntityLinkUpdateInput, Prisma.ConceptEntityLinkUncheckedUpdateInput>;
};
/**
 * ConceptEntityLink delete
 */
export type ConceptEntityLinkDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which ConceptEntityLink to delete.
     */
    where: Prisma.ConceptEntityLinkWhereUniqueInput;
};
/**
 * ConceptEntityLink deleteMany
 */
export type ConceptEntityLinkDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ConceptEntityLinks to delete
     */
    where?: Prisma.ConceptEntityLinkWhereInput;
    /**
     * Limit how many ConceptEntityLinks to delete.
     */
    limit?: number;
};
/**
 * ConceptEntityLink without action
 */
export type ConceptEntityLinkDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=ConceptEntityLink.d.ts.map