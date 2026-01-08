import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model AssertionSource
 * Many-to-many relationship between Assertions and Sources
 * Includes human grading of source relevance for research quality improvement
 */
export type AssertionSourceModel = runtime.Types.Result.DefaultSelection<Prisma.$AssertionSourcePayload>;
export type AggregateAssertionSource = {
    _count: AssertionSourceCountAggregateOutputType | null;
    _min: AssertionSourceMinAggregateOutputType | null;
    _max: AssertionSourceMaxAggregateOutputType | null;
};
export type AssertionSourceMinAggregateOutputType = {
    id: string | null;
    quote: string | null;
    createdAt: Date | null;
    addedBy: string | null;
    relevanceGrade: $Enums.SourceRelevance | null;
    annotation: string | null;
    gradedBy: string | null;
    gradedAt: Date | null;
    assertionId: string | null;
    sourceId: string | null;
};
export type AssertionSourceMaxAggregateOutputType = {
    id: string | null;
    quote: string | null;
    createdAt: Date | null;
    addedBy: string | null;
    relevanceGrade: $Enums.SourceRelevance | null;
    annotation: string | null;
    gradedBy: string | null;
    gradedAt: Date | null;
    assertionId: string | null;
    sourceId: string | null;
};
export type AssertionSourceCountAggregateOutputType = {
    id: number;
    quote: number;
    createdAt: number;
    addedBy: number;
    relevanceGrade: number;
    annotation: number;
    gradedBy: number;
    gradedAt: number;
    assertionId: number;
    sourceId: number;
    _all: number;
};
export type AssertionSourceMinAggregateInputType = {
    id?: true;
    quote?: true;
    createdAt?: true;
    addedBy?: true;
    relevanceGrade?: true;
    annotation?: true;
    gradedBy?: true;
    gradedAt?: true;
    assertionId?: true;
    sourceId?: true;
};
export type AssertionSourceMaxAggregateInputType = {
    id?: true;
    quote?: true;
    createdAt?: true;
    addedBy?: true;
    relevanceGrade?: true;
    annotation?: true;
    gradedBy?: true;
    gradedAt?: true;
    assertionId?: true;
    sourceId?: true;
};
export type AssertionSourceCountAggregateInputType = {
    id?: true;
    quote?: true;
    createdAt?: true;
    addedBy?: true;
    relevanceGrade?: true;
    annotation?: true;
    gradedBy?: true;
    gradedAt?: true;
    assertionId?: true;
    sourceId?: true;
    _all?: true;
};
export type AssertionSourceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AssertionSource to aggregate.
     */
    where?: Prisma.AssertionSourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AssertionSources to fetch.
     */
    orderBy?: Prisma.AssertionSourceOrderByWithRelationInput | Prisma.AssertionSourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AssertionSourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AssertionSources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AssertionSources.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned AssertionSources
    **/
    _count?: true | AssertionSourceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AssertionSourceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AssertionSourceMaxAggregateInputType;
};
export type GetAssertionSourceAggregateType<T extends AssertionSourceAggregateArgs> = {
    [P in keyof T & keyof AggregateAssertionSource]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAssertionSource[P]> : Prisma.GetScalarType<T[P], AggregateAssertionSource[P]>;
};
export type AssertionSourceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssertionSourceWhereInput;
    orderBy?: Prisma.AssertionSourceOrderByWithAggregationInput | Prisma.AssertionSourceOrderByWithAggregationInput[];
    by: Prisma.AssertionSourceScalarFieldEnum[] | Prisma.AssertionSourceScalarFieldEnum;
    having?: Prisma.AssertionSourceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AssertionSourceCountAggregateInputType | true;
    _min?: AssertionSourceMinAggregateInputType;
    _max?: AssertionSourceMaxAggregateInputType;
};
export type AssertionSourceGroupByOutputType = {
    id: string;
    quote: string | null;
    createdAt: Date;
    addedBy: string | null;
    relevanceGrade: $Enums.SourceRelevance | null;
    annotation: string | null;
    gradedBy: string | null;
    gradedAt: Date | null;
    assertionId: string;
    sourceId: string;
    _count: AssertionSourceCountAggregateOutputType | null;
    _min: AssertionSourceMinAggregateOutputType | null;
    _max: AssertionSourceMaxAggregateOutputType | null;
};
type GetAssertionSourceGroupByPayload<T extends AssertionSourceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AssertionSourceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AssertionSourceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AssertionSourceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AssertionSourceGroupByOutputType[P]>;
}>>;
export type AssertionSourceWhereInput = {
    AND?: Prisma.AssertionSourceWhereInput | Prisma.AssertionSourceWhereInput[];
    OR?: Prisma.AssertionSourceWhereInput[];
    NOT?: Prisma.AssertionSourceWhereInput | Prisma.AssertionSourceWhereInput[];
    id?: Prisma.StringFilter<"AssertionSource"> | string;
    quote?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AssertionSource"> | Date | string;
    addedBy?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    relevanceGrade?: Prisma.EnumSourceRelevanceNullableFilter<"AssertionSource"> | $Enums.SourceRelevance | null;
    annotation?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    gradedBy?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    gradedAt?: Prisma.DateTimeNullableFilter<"AssertionSource"> | Date | string | null;
    assertionId?: Prisma.StringFilter<"AssertionSource"> | string;
    sourceId?: Prisma.StringFilter<"AssertionSource"> | string;
    assertion?: Prisma.XOR<Prisma.AssertionScalarRelationFilter, Prisma.AssertionWhereInput>;
    source?: Prisma.XOR<Prisma.SourceScalarRelationFilter, Prisma.SourceWhereInput>;
};
export type AssertionSourceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    quote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    addedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    relevanceGrade?: Prisma.SortOrderInput | Prisma.SortOrder;
    annotation?: Prisma.SortOrderInput | Prisma.SortOrder;
    gradedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    gradedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    assertion?: Prisma.AssertionOrderByWithRelationInput;
    source?: Prisma.SourceOrderByWithRelationInput;
};
export type AssertionSourceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    assertionId_sourceId?: Prisma.AssertionSourceAssertionIdSourceIdCompoundUniqueInput;
    AND?: Prisma.AssertionSourceWhereInput | Prisma.AssertionSourceWhereInput[];
    OR?: Prisma.AssertionSourceWhereInput[];
    NOT?: Prisma.AssertionSourceWhereInput | Prisma.AssertionSourceWhereInput[];
    quote?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AssertionSource"> | Date | string;
    addedBy?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    relevanceGrade?: Prisma.EnumSourceRelevanceNullableFilter<"AssertionSource"> | $Enums.SourceRelevance | null;
    annotation?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    gradedBy?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    gradedAt?: Prisma.DateTimeNullableFilter<"AssertionSource"> | Date | string | null;
    assertionId?: Prisma.StringFilter<"AssertionSource"> | string;
    sourceId?: Prisma.StringFilter<"AssertionSource"> | string;
    assertion?: Prisma.XOR<Prisma.AssertionScalarRelationFilter, Prisma.AssertionWhereInput>;
    source?: Prisma.XOR<Prisma.SourceScalarRelationFilter, Prisma.SourceWhereInput>;
}, "id" | "assertionId_sourceId">;
export type AssertionSourceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    quote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    addedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    relevanceGrade?: Prisma.SortOrderInput | Prisma.SortOrder;
    annotation?: Prisma.SortOrderInput | Prisma.SortOrder;
    gradedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    gradedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
    _count?: Prisma.AssertionSourceCountOrderByAggregateInput;
    _max?: Prisma.AssertionSourceMaxOrderByAggregateInput;
    _min?: Prisma.AssertionSourceMinOrderByAggregateInput;
};
export type AssertionSourceScalarWhereWithAggregatesInput = {
    AND?: Prisma.AssertionSourceScalarWhereWithAggregatesInput | Prisma.AssertionSourceScalarWhereWithAggregatesInput[];
    OR?: Prisma.AssertionSourceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AssertionSourceScalarWhereWithAggregatesInput | Prisma.AssertionSourceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AssertionSource"> | string;
    quote?: Prisma.StringNullableWithAggregatesFilter<"AssertionSource"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AssertionSource"> | Date | string;
    addedBy?: Prisma.StringNullableWithAggregatesFilter<"AssertionSource"> | string | null;
    relevanceGrade?: Prisma.EnumSourceRelevanceNullableWithAggregatesFilter<"AssertionSource"> | $Enums.SourceRelevance | null;
    annotation?: Prisma.StringNullableWithAggregatesFilter<"AssertionSource"> | string | null;
    gradedBy?: Prisma.StringNullableWithAggregatesFilter<"AssertionSource"> | string | null;
    gradedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"AssertionSource"> | Date | string | null;
    assertionId?: Prisma.StringWithAggregatesFilter<"AssertionSource"> | string;
    sourceId?: Prisma.StringWithAggregatesFilter<"AssertionSource"> | string;
};
export type AssertionSourceCreateInput = {
    id?: string;
    quote?: string | null;
    createdAt?: Date | string;
    addedBy?: string | null;
    relevanceGrade?: $Enums.SourceRelevance | null;
    annotation?: string | null;
    gradedBy?: string | null;
    gradedAt?: Date | string | null;
    assertion: Prisma.AssertionCreateNestedOneWithoutSourcesInput;
    source: Prisma.SourceCreateNestedOneWithoutAssertionsInput;
};
export type AssertionSourceUncheckedCreateInput = {
    id?: string;
    quote?: string | null;
    createdAt?: Date | string;
    addedBy?: string | null;
    relevanceGrade?: $Enums.SourceRelevance | null;
    annotation?: string | null;
    gradedBy?: string | null;
    gradedAt?: Date | string | null;
    assertionId: string;
    sourceId: string;
};
export type AssertionSourceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relevanceGrade?: Prisma.NullableEnumSourceRelevanceFieldUpdateOperationsInput | $Enums.SourceRelevance | null;
    annotation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assertion?: Prisma.AssertionUpdateOneRequiredWithoutSourcesNestedInput;
    source?: Prisma.SourceUpdateOneRequiredWithoutAssertionsNestedInput;
};
export type AssertionSourceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relevanceGrade?: Prisma.NullableEnumSourceRelevanceFieldUpdateOperationsInput | $Enums.SourceRelevance | null;
    annotation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AssertionSourceCreateManyInput = {
    id?: string;
    quote?: string | null;
    createdAt?: Date | string;
    addedBy?: string | null;
    relevanceGrade?: $Enums.SourceRelevance | null;
    annotation?: string | null;
    gradedBy?: string | null;
    gradedAt?: Date | string | null;
    assertionId: string;
    sourceId: string;
};
export type AssertionSourceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relevanceGrade?: Prisma.NullableEnumSourceRelevanceFieldUpdateOperationsInput | $Enums.SourceRelevance | null;
    annotation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type AssertionSourceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relevanceGrade?: Prisma.NullableEnumSourceRelevanceFieldUpdateOperationsInput | $Enums.SourceRelevance | null;
    annotation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AssertionSourceListRelationFilter = {
    every?: Prisma.AssertionSourceWhereInput;
    some?: Prisma.AssertionSourceWhereInput;
    none?: Prisma.AssertionSourceWhereInput;
};
export type AssertionSourceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AssertionSourceAssertionIdSourceIdCompoundUniqueInput = {
    assertionId: string;
    sourceId: string;
};
export type AssertionSourceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    addedBy?: Prisma.SortOrder;
    relevanceGrade?: Prisma.SortOrder;
    annotation?: Prisma.SortOrder;
    gradedBy?: Prisma.SortOrder;
    gradedAt?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
};
export type AssertionSourceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    addedBy?: Prisma.SortOrder;
    relevanceGrade?: Prisma.SortOrder;
    annotation?: Prisma.SortOrder;
    gradedBy?: Prisma.SortOrder;
    gradedAt?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
};
export type AssertionSourceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    addedBy?: Prisma.SortOrder;
    relevanceGrade?: Prisma.SortOrder;
    annotation?: Prisma.SortOrder;
    gradedBy?: Prisma.SortOrder;
    gradedAt?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    sourceId?: Prisma.SortOrder;
};
export type AssertionSourceCreateNestedManyWithoutAssertionInput = {
    create?: Prisma.XOR<Prisma.AssertionSourceCreateWithoutAssertionInput, Prisma.AssertionSourceUncheckedCreateWithoutAssertionInput> | Prisma.AssertionSourceCreateWithoutAssertionInput[] | Prisma.AssertionSourceUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.AssertionSourceCreateOrConnectWithoutAssertionInput | Prisma.AssertionSourceCreateOrConnectWithoutAssertionInput[];
    createMany?: Prisma.AssertionSourceCreateManyAssertionInputEnvelope;
    connect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
};
export type AssertionSourceUncheckedCreateNestedManyWithoutAssertionInput = {
    create?: Prisma.XOR<Prisma.AssertionSourceCreateWithoutAssertionInput, Prisma.AssertionSourceUncheckedCreateWithoutAssertionInput> | Prisma.AssertionSourceCreateWithoutAssertionInput[] | Prisma.AssertionSourceUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.AssertionSourceCreateOrConnectWithoutAssertionInput | Prisma.AssertionSourceCreateOrConnectWithoutAssertionInput[];
    createMany?: Prisma.AssertionSourceCreateManyAssertionInputEnvelope;
    connect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
};
export type AssertionSourceUpdateManyWithoutAssertionNestedInput = {
    create?: Prisma.XOR<Prisma.AssertionSourceCreateWithoutAssertionInput, Prisma.AssertionSourceUncheckedCreateWithoutAssertionInput> | Prisma.AssertionSourceCreateWithoutAssertionInput[] | Prisma.AssertionSourceUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.AssertionSourceCreateOrConnectWithoutAssertionInput | Prisma.AssertionSourceCreateOrConnectWithoutAssertionInput[];
    upsert?: Prisma.AssertionSourceUpsertWithWhereUniqueWithoutAssertionInput | Prisma.AssertionSourceUpsertWithWhereUniqueWithoutAssertionInput[];
    createMany?: Prisma.AssertionSourceCreateManyAssertionInputEnvelope;
    set?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    disconnect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    delete?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    connect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    update?: Prisma.AssertionSourceUpdateWithWhereUniqueWithoutAssertionInput | Prisma.AssertionSourceUpdateWithWhereUniqueWithoutAssertionInput[];
    updateMany?: Prisma.AssertionSourceUpdateManyWithWhereWithoutAssertionInput | Prisma.AssertionSourceUpdateManyWithWhereWithoutAssertionInput[];
    deleteMany?: Prisma.AssertionSourceScalarWhereInput | Prisma.AssertionSourceScalarWhereInput[];
};
export type AssertionSourceUncheckedUpdateManyWithoutAssertionNestedInput = {
    create?: Prisma.XOR<Prisma.AssertionSourceCreateWithoutAssertionInput, Prisma.AssertionSourceUncheckedCreateWithoutAssertionInput> | Prisma.AssertionSourceCreateWithoutAssertionInput[] | Prisma.AssertionSourceUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.AssertionSourceCreateOrConnectWithoutAssertionInput | Prisma.AssertionSourceCreateOrConnectWithoutAssertionInput[];
    upsert?: Prisma.AssertionSourceUpsertWithWhereUniqueWithoutAssertionInput | Prisma.AssertionSourceUpsertWithWhereUniqueWithoutAssertionInput[];
    createMany?: Prisma.AssertionSourceCreateManyAssertionInputEnvelope;
    set?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    disconnect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    delete?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    connect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    update?: Prisma.AssertionSourceUpdateWithWhereUniqueWithoutAssertionInput | Prisma.AssertionSourceUpdateWithWhereUniqueWithoutAssertionInput[];
    updateMany?: Prisma.AssertionSourceUpdateManyWithWhereWithoutAssertionInput | Prisma.AssertionSourceUpdateManyWithWhereWithoutAssertionInput[];
    deleteMany?: Prisma.AssertionSourceScalarWhereInput | Prisma.AssertionSourceScalarWhereInput[];
};
export type AssertionSourceCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.AssertionSourceCreateWithoutSourceInput, Prisma.AssertionSourceUncheckedCreateWithoutSourceInput> | Prisma.AssertionSourceCreateWithoutSourceInput[] | Prisma.AssertionSourceUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.AssertionSourceCreateOrConnectWithoutSourceInput | Prisma.AssertionSourceCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.AssertionSourceCreateManySourceInputEnvelope;
    connect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
};
export type AssertionSourceUncheckedCreateNestedManyWithoutSourceInput = {
    create?: Prisma.XOR<Prisma.AssertionSourceCreateWithoutSourceInput, Prisma.AssertionSourceUncheckedCreateWithoutSourceInput> | Prisma.AssertionSourceCreateWithoutSourceInput[] | Prisma.AssertionSourceUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.AssertionSourceCreateOrConnectWithoutSourceInput | Prisma.AssertionSourceCreateOrConnectWithoutSourceInput[];
    createMany?: Prisma.AssertionSourceCreateManySourceInputEnvelope;
    connect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
};
export type AssertionSourceUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.AssertionSourceCreateWithoutSourceInput, Prisma.AssertionSourceUncheckedCreateWithoutSourceInput> | Prisma.AssertionSourceCreateWithoutSourceInput[] | Prisma.AssertionSourceUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.AssertionSourceCreateOrConnectWithoutSourceInput | Prisma.AssertionSourceCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.AssertionSourceUpsertWithWhereUniqueWithoutSourceInput | Prisma.AssertionSourceUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.AssertionSourceCreateManySourceInputEnvelope;
    set?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    disconnect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    delete?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    connect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    update?: Prisma.AssertionSourceUpdateWithWhereUniqueWithoutSourceInput | Prisma.AssertionSourceUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.AssertionSourceUpdateManyWithWhereWithoutSourceInput | Prisma.AssertionSourceUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.AssertionSourceScalarWhereInput | Prisma.AssertionSourceScalarWhereInput[];
};
export type AssertionSourceUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: Prisma.XOR<Prisma.AssertionSourceCreateWithoutSourceInput, Prisma.AssertionSourceUncheckedCreateWithoutSourceInput> | Prisma.AssertionSourceCreateWithoutSourceInput[] | Prisma.AssertionSourceUncheckedCreateWithoutSourceInput[];
    connectOrCreate?: Prisma.AssertionSourceCreateOrConnectWithoutSourceInput | Prisma.AssertionSourceCreateOrConnectWithoutSourceInput[];
    upsert?: Prisma.AssertionSourceUpsertWithWhereUniqueWithoutSourceInput | Prisma.AssertionSourceUpsertWithWhereUniqueWithoutSourceInput[];
    createMany?: Prisma.AssertionSourceCreateManySourceInputEnvelope;
    set?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    disconnect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    delete?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    connect?: Prisma.AssertionSourceWhereUniqueInput | Prisma.AssertionSourceWhereUniqueInput[];
    update?: Prisma.AssertionSourceUpdateWithWhereUniqueWithoutSourceInput | Prisma.AssertionSourceUpdateWithWhereUniqueWithoutSourceInput[];
    updateMany?: Prisma.AssertionSourceUpdateManyWithWhereWithoutSourceInput | Prisma.AssertionSourceUpdateManyWithWhereWithoutSourceInput[];
    deleteMany?: Prisma.AssertionSourceScalarWhereInput | Prisma.AssertionSourceScalarWhereInput[];
};
export type NullableEnumSourceRelevanceFieldUpdateOperationsInput = {
    set?: $Enums.SourceRelevance | null;
};
export type AssertionSourceCreateWithoutAssertionInput = {
    id?: string;
    quote?: string | null;
    createdAt?: Date | string;
    addedBy?: string | null;
    relevanceGrade?: $Enums.SourceRelevance | null;
    annotation?: string | null;
    gradedBy?: string | null;
    gradedAt?: Date | string | null;
    source: Prisma.SourceCreateNestedOneWithoutAssertionsInput;
};
export type AssertionSourceUncheckedCreateWithoutAssertionInput = {
    id?: string;
    quote?: string | null;
    createdAt?: Date | string;
    addedBy?: string | null;
    relevanceGrade?: $Enums.SourceRelevance | null;
    annotation?: string | null;
    gradedBy?: string | null;
    gradedAt?: Date | string | null;
    sourceId: string;
};
export type AssertionSourceCreateOrConnectWithoutAssertionInput = {
    where: Prisma.AssertionSourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssertionSourceCreateWithoutAssertionInput, Prisma.AssertionSourceUncheckedCreateWithoutAssertionInput>;
};
export type AssertionSourceCreateManyAssertionInputEnvelope = {
    data: Prisma.AssertionSourceCreateManyAssertionInput | Prisma.AssertionSourceCreateManyAssertionInput[];
    skipDuplicates?: boolean;
};
export type AssertionSourceUpsertWithWhereUniqueWithoutAssertionInput = {
    where: Prisma.AssertionSourceWhereUniqueInput;
    update: Prisma.XOR<Prisma.AssertionSourceUpdateWithoutAssertionInput, Prisma.AssertionSourceUncheckedUpdateWithoutAssertionInput>;
    create: Prisma.XOR<Prisma.AssertionSourceCreateWithoutAssertionInput, Prisma.AssertionSourceUncheckedCreateWithoutAssertionInput>;
};
export type AssertionSourceUpdateWithWhereUniqueWithoutAssertionInput = {
    where: Prisma.AssertionSourceWhereUniqueInput;
    data: Prisma.XOR<Prisma.AssertionSourceUpdateWithoutAssertionInput, Prisma.AssertionSourceUncheckedUpdateWithoutAssertionInput>;
};
export type AssertionSourceUpdateManyWithWhereWithoutAssertionInput = {
    where: Prisma.AssertionSourceScalarWhereInput;
    data: Prisma.XOR<Prisma.AssertionSourceUpdateManyMutationInput, Prisma.AssertionSourceUncheckedUpdateManyWithoutAssertionInput>;
};
export type AssertionSourceScalarWhereInput = {
    AND?: Prisma.AssertionSourceScalarWhereInput | Prisma.AssertionSourceScalarWhereInput[];
    OR?: Prisma.AssertionSourceScalarWhereInput[];
    NOT?: Prisma.AssertionSourceScalarWhereInput | Prisma.AssertionSourceScalarWhereInput[];
    id?: Prisma.StringFilter<"AssertionSource"> | string;
    quote?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AssertionSource"> | Date | string;
    addedBy?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    relevanceGrade?: Prisma.EnumSourceRelevanceNullableFilter<"AssertionSource"> | $Enums.SourceRelevance | null;
    annotation?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    gradedBy?: Prisma.StringNullableFilter<"AssertionSource"> | string | null;
    gradedAt?: Prisma.DateTimeNullableFilter<"AssertionSource"> | Date | string | null;
    assertionId?: Prisma.StringFilter<"AssertionSource"> | string;
    sourceId?: Prisma.StringFilter<"AssertionSource"> | string;
};
export type AssertionSourceCreateWithoutSourceInput = {
    id?: string;
    quote?: string | null;
    createdAt?: Date | string;
    addedBy?: string | null;
    relevanceGrade?: $Enums.SourceRelevance | null;
    annotation?: string | null;
    gradedBy?: string | null;
    gradedAt?: Date | string | null;
    assertion: Prisma.AssertionCreateNestedOneWithoutSourcesInput;
};
export type AssertionSourceUncheckedCreateWithoutSourceInput = {
    id?: string;
    quote?: string | null;
    createdAt?: Date | string;
    addedBy?: string | null;
    relevanceGrade?: $Enums.SourceRelevance | null;
    annotation?: string | null;
    gradedBy?: string | null;
    gradedAt?: Date | string | null;
    assertionId: string;
};
export type AssertionSourceCreateOrConnectWithoutSourceInput = {
    where: Prisma.AssertionSourceWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssertionSourceCreateWithoutSourceInput, Prisma.AssertionSourceUncheckedCreateWithoutSourceInput>;
};
export type AssertionSourceCreateManySourceInputEnvelope = {
    data: Prisma.AssertionSourceCreateManySourceInput | Prisma.AssertionSourceCreateManySourceInput[];
    skipDuplicates?: boolean;
};
export type AssertionSourceUpsertWithWhereUniqueWithoutSourceInput = {
    where: Prisma.AssertionSourceWhereUniqueInput;
    update: Prisma.XOR<Prisma.AssertionSourceUpdateWithoutSourceInput, Prisma.AssertionSourceUncheckedUpdateWithoutSourceInput>;
    create: Prisma.XOR<Prisma.AssertionSourceCreateWithoutSourceInput, Prisma.AssertionSourceUncheckedCreateWithoutSourceInput>;
};
export type AssertionSourceUpdateWithWhereUniqueWithoutSourceInput = {
    where: Prisma.AssertionSourceWhereUniqueInput;
    data: Prisma.XOR<Prisma.AssertionSourceUpdateWithoutSourceInput, Prisma.AssertionSourceUncheckedUpdateWithoutSourceInput>;
};
export type AssertionSourceUpdateManyWithWhereWithoutSourceInput = {
    where: Prisma.AssertionSourceScalarWhereInput;
    data: Prisma.XOR<Prisma.AssertionSourceUpdateManyMutationInput, Prisma.AssertionSourceUncheckedUpdateManyWithoutSourceInput>;
};
export type AssertionSourceCreateManyAssertionInput = {
    id?: string;
    quote?: string | null;
    createdAt?: Date | string;
    addedBy?: string | null;
    relevanceGrade?: $Enums.SourceRelevance | null;
    annotation?: string | null;
    gradedBy?: string | null;
    gradedAt?: Date | string | null;
    sourceId: string;
};
export type AssertionSourceUpdateWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relevanceGrade?: Prisma.NullableEnumSourceRelevanceFieldUpdateOperationsInput | $Enums.SourceRelevance | null;
    annotation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    source?: Prisma.SourceUpdateOneRequiredWithoutAssertionsNestedInput;
};
export type AssertionSourceUncheckedUpdateWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relevanceGrade?: Prisma.NullableEnumSourceRelevanceFieldUpdateOperationsInput | $Enums.SourceRelevance | null;
    annotation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AssertionSourceUncheckedUpdateManyWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relevanceGrade?: Prisma.NullableEnumSourceRelevanceFieldUpdateOperationsInput | $Enums.SourceRelevance | null;
    annotation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    sourceId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AssertionSourceCreateManySourceInput = {
    id?: string;
    quote?: string | null;
    createdAt?: Date | string;
    addedBy?: string | null;
    relevanceGrade?: $Enums.SourceRelevance | null;
    annotation?: string | null;
    gradedBy?: string | null;
    gradedAt?: Date | string | null;
    assertionId: string;
};
export type AssertionSourceUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relevanceGrade?: Prisma.NullableEnumSourceRelevanceFieldUpdateOperationsInput | $Enums.SourceRelevance | null;
    annotation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assertion?: Prisma.AssertionUpdateOneRequiredWithoutSourcesNestedInput;
};
export type AssertionSourceUncheckedUpdateWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relevanceGrade?: Prisma.NullableEnumSourceRelevanceFieldUpdateOperationsInput | $Enums.SourceRelevance | null;
    annotation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AssertionSourceUncheckedUpdateManyWithoutSourceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    addedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    relevanceGrade?: Prisma.NullableEnumSourceRelevanceFieldUpdateOperationsInput | $Enums.SourceRelevance | null;
    annotation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    gradedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AssertionSourceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quote?: boolean;
    createdAt?: boolean;
    addedBy?: boolean;
    relevanceGrade?: boolean;
    annotation?: boolean;
    gradedBy?: boolean;
    gradedAt?: boolean;
    assertionId?: boolean;
    sourceId?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["assertionSource"]>;
export type AssertionSourceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quote?: boolean;
    createdAt?: boolean;
    addedBy?: boolean;
    relevanceGrade?: boolean;
    annotation?: boolean;
    gradedBy?: boolean;
    gradedAt?: boolean;
    assertionId?: boolean;
    sourceId?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["assertionSource"]>;
export type AssertionSourceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    quote?: boolean;
    createdAt?: boolean;
    addedBy?: boolean;
    relevanceGrade?: boolean;
    annotation?: boolean;
    gradedBy?: boolean;
    gradedAt?: boolean;
    assertionId?: boolean;
    sourceId?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["assertionSource"]>;
export type AssertionSourceSelectScalar = {
    id?: boolean;
    quote?: boolean;
    createdAt?: boolean;
    addedBy?: boolean;
    relevanceGrade?: boolean;
    annotation?: boolean;
    gradedBy?: boolean;
    gradedAt?: boolean;
    assertionId?: boolean;
    sourceId?: boolean;
};
export type AssertionSourceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "quote" | "createdAt" | "addedBy" | "relevanceGrade" | "annotation" | "gradedBy" | "gradedAt" | "assertionId" | "sourceId", ExtArgs["result"]["assertionSource"]>;
export type AssertionSourceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
};
export type AssertionSourceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
};
export type AssertionSourceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    source?: boolean | Prisma.SourceDefaultArgs<ExtArgs>;
};
export type $AssertionSourcePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AssertionSource";
    objects: {
        assertion: Prisma.$AssertionPayload<ExtArgs>;
        source: Prisma.$SourcePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        quote: string | null;
        createdAt: Date;
        addedBy: string | null;
        relevanceGrade: $Enums.SourceRelevance | null;
        annotation: string | null;
        gradedBy: string | null;
        gradedAt: Date | null;
        assertionId: string;
        sourceId: string;
    }, ExtArgs["result"]["assertionSource"]>;
    composites: {};
};
export type AssertionSourceGetPayload<S extends boolean | null | undefined | AssertionSourceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload, S>;
export type AssertionSourceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AssertionSourceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AssertionSourceCountAggregateInputType | true;
};
export interface AssertionSourceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AssertionSource'];
        meta: {
            name: 'AssertionSource';
        };
    };
    /**
     * Find zero or one AssertionSource that matches the filter.
     * @param {AssertionSourceFindUniqueArgs} args - Arguments to find a AssertionSource
     * @example
     * // Get one AssertionSource
     * const assertionSource = await prisma.assertionSource.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssertionSourceFindUniqueArgs>(args: Prisma.SelectSubset<T, AssertionSourceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AssertionSourceClient<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one AssertionSource that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssertionSourceFindUniqueOrThrowArgs} args - Arguments to find a AssertionSource
     * @example
     * // Get one AssertionSource
     * const assertionSource = await prisma.assertionSource.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssertionSourceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AssertionSourceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssertionSourceClient<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AssertionSource that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionSourceFindFirstArgs} args - Arguments to find a AssertionSource
     * @example
     * // Get one AssertionSource
     * const assertionSource = await prisma.assertionSource.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssertionSourceFindFirstArgs>(args?: Prisma.SelectSubset<T, AssertionSourceFindFirstArgs<ExtArgs>>): Prisma.Prisma__AssertionSourceClient<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first AssertionSource that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionSourceFindFirstOrThrowArgs} args - Arguments to find a AssertionSource
     * @example
     * // Get one AssertionSource
     * const assertionSource = await prisma.assertionSource.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssertionSourceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AssertionSourceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssertionSourceClient<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more AssertionSources that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionSourceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AssertionSources
     * const assertionSources = await prisma.assertionSource.findMany()
     *
     * // Get first 10 AssertionSources
     * const assertionSources = await prisma.assertionSource.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const assertionSourceWithIdOnly = await prisma.assertionSource.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AssertionSourceFindManyArgs>(args?: Prisma.SelectSubset<T, AssertionSourceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a AssertionSource.
     * @param {AssertionSourceCreateArgs} args - Arguments to create a AssertionSource.
     * @example
     * // Create one AssertionSource
     * const AssertionSource = await prisma.assertionSource.create({
     *   data: {
     *     // ... data to create a AssertionSource
     *   }
     * })
     *
     */
    create<T extends AssertionSourceCreateArgs>(args: Prisma.SelectSubset<T, AssertionSourceCreateArgs<ExtArgs>>): Prisma.Prisma__AssertionSourceClient<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many AssertionSources.
     * @param {AssertionSourceCreateManyArgs} args - Arguments to create many AssertionSources.
     * @example
     * // Create many AssertionSources
     * const assertionSource = await prisma.assertionSource.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AssertionSourceCreateManyArgs>(args?: Prisma.SelectSubset<T, AssertionSourceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many AssertionSources and returns the data saved in the database.
     * @param {AssertionSourceCreateManyAndReturnArgs} args - Arguments to create many AssertionSources.
     * @example
     * // Create many AssertionSources
     * const assertionSource = await prisma.assertionSource.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many AssertionSources and only return the `id`
     * const assertionSourceWithIdOnly = await prisma.assertionSource.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AssertionSourceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AssertionSourceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a AssertionSource.
     * @param {AssertionSourceDeleteArgs} args - Arguments to delete one AssertionSource.
     * @example
     * // Delete one AssertionSource
     * const AssertionSource = await prisma.assertionSource.delete({
     *   where: {
     *     // ... filter to delete one AssertionSource
     *   }
     * })
     *
     */
    delete<T extends AssertionSourceDeleteArgs>(args: Prisma.SelectSubset<T, AssertionSourceDeleteArgs<ExtArgs>>): Prisma.Prisma__AssertionSourceClient<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one AssertionSource.
     * @param {AssertionSourceUpdateArgs} args - Arguments to update one AssertionSource.
     * @example
     * // Update one AssertionSource
     * const assertionSource = await prisma.assertionSource.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AssertionSourceUpdateArgs>(args: Prisma.SelectSubset<T, AssertionSourceUpdateArgs<ExtArgs>>): Prisma.Prisma__AssertionSourceClient<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more AssertionSources.
     * @param {AssertionSourceDeleteManyArgs} args - Arguments to filter AssertionSources to delete.
     * @example
     * // Delete a few AssertionSources
     * const { count } = await prisma.assertionSource.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AssertionSourceDeleteManyArgs>(args?: Prisma.SelectSubset<T, AssertionSourceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AssertionSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionSourceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AssertionSources
     * const assertionSource = await prisma.assertionSource.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AssertionSourceUpdateManyArgs>(args: Prisma.SelectSubset<T, AssertionSourceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more AssertionSources and returns the data updated in the database.
     * @param {AssertionSourceUpdateManyAndReturnArgs} args - Arguments to update many AssertionSources.
     * @example
     * // Update many AssertionSources
     * const assertionSource = await prisma.assertionSource.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more AssertionSources and only return the `id`
     * const assertionSourceWithIdOnly = await prisma.assertionSource.updateManyAndReturn({
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
    updateManyAndReturn<T extends AssertionSourceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AssertionSourceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one AssertionSource.
     * @param {AssertionSourceUpsertArgs} args - Arguments to update or create a AssertionSource.
     * @example
     * // Update or create a AssertionSource
     * const assertionSource = await prisma.assertionSource.upsert({
     *   create: {
     *     // ... data to create a AssertionSource
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AssertionSource we want to update
     *   }
     * })
     */
    upsert<T extends AssertionSourceUpsertArgs>(args: Prisma.SelectSubset<T, AssertionSourceUpsertArgs<ExtArgs>>): Prisma.Prisma__AssertionSourceClient<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of AssertionSources.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionSourceCountArgs} args - Arguments to filter AssertionSources to count.
     * @example
     * // Count the number of AssertionSources
     * const count = await prisma.assertionSource.count({
     *   where: {
     *     // ... the filter for the AssertionSources we want to count
     *   }
     * })
    **/
    count<T extends AssertionSourceCountArgs>(args?: Prisma.Subset<T, AssertionSourceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AssertionSourceCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a AssertionSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionSourceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssertionSourceAggregateArgs>(args: Prisma.Subset<T, AssertionSourceAggregateArgs>): Prisma.PrismaPromise<GetAssertionSourceAggregateType<T>>;
    /**
     * Group by AssertionSource.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionSourceGroupByArgs} args - Group by arguments.
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
    groupBy<T extends AssertionSourceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AssertionSourceGroupByArgs['orderBy'];
    } : {
        orderBy?: AssertionSourceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AssertionSourceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssertionSourceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the AssertionSource model
     */
    readonly fields: AssertionSourceFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for AssertionSource.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AssertionSourceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    assertion<T extends Prisma.AssertionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AssertionDefaultArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    source<T extends Prisma.SourceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SourceDefaultArgs<ExtArgs>>): Prisma.Prisma__SourceClient<runtime.Types.Result.GetResult<Prisma.$SourcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the AssertionSource model
 */
export interface AssertionSourceFieldRefs {
    readonly id: Prisma.FieldRef<"AssertionSource", 'String'>;
    readonly quote: Prisma.FieldRef<"AssertionSource", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AssertionSource", 'DateTime'>;
    readonly addedBy: Prisma.FieldRef<"AssertionSource", 'String'>;
    readonly relevanceGrade: Prisma.FieldRef<"AssertionSource", 'SourceRelevance'>;
    readonly annotation: Prisma.FieldRef<"AssertionSource", 'String'>;
    readonly gradedBy: Prisma.FieldRef<"AssertionSource", 'String'>;
    readonly gradedAt: Prisma.FieldRef<"AssertionSource", 'DateTime'>;
    readonly assertionId: Prisma.FieldRef<"AssertionSource", 'String'>;
    readonly sourceId: Prisma.FieldRef<"AssertionSource", 'String'>;
}
/**
 * AssertionSource findUnique
 */
export type AssertionSourceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceInclude<ExtArgs> | null;
    /**
     * Filter, which AssertionSource to fetch.
     */
    where: Prisma.AssertionSourceWhereUniqueInput;
};
/**
 * AssertionSource findUniqueOrThrow
 */
export type AssertionSourceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceInclude<ExtArgs> | null;
    /**
     * Filter, which AssertionSource to fetch.
     */
    where: Prisma.AssertionSourceWhereUniqueInput;
};
/**
 * AssertionSource findFirst
 */
export type AssertionSourceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceInclude<ExtArgs> | null;
    /**
     * Filter, which AssertionSource to fetch.
     */
    where?: Prisma.AssertionSourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AssertionSources to fetch.
     */
    orderBy?: Prisma.AssertionSourceOrderByWithRelationInput | Prisma.AssertionSourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AssertionSources.
     */
    cursor?: Prisma.AssertionSourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AssertionSources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AssertionSources.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AssertionSources.
     */
    distinct?: Prisma.AssertionSourceScalarFieldEnum | Prisma.AssertionSourceScalarFieldEnum[];
};
/**
 * AssertionSource findFirstOrThrow
 */
export type AssertionSourceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceInclude<ExtArgs> | null;
    /**
     * Filter, which AssertionSource to fetch.
     */
    where?: Prisma.AssertionSourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AssertionSources to fetch.
     */
    orderBy?: Prisma.AssertionSourceOrderByWithRelationInput | Prisma.AssertionSourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for AssertionSources.
     */
    cursor?: Prisma.AssertionSourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AssertionSources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AssertionSources.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of AssertionSources.
     */
    distinct?: Prisma.AssertionSourceScalarFieldEnum | Prisma.AssertionSourceScalarFieldEnum[];
};
/**
 * AssertionSource findMany
 */
export type AssertionSourceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceInclude<ExtArgs> | null;
    /**
     * Filter, which AssertionSources to fetch.
     */
    where?: Prisma.AssertionSourceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of AssertionSources to fetch.
     */
    orderBy?: Prisma.AssertionSourceOrderByWithRelationInput | Prisma.AssertionSourceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing AssertionSources.
     */
    cursor?: Prisma.AssertionSourceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` AssertionSources from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` AssertionSources.
     */
    skip?: number;
    distinct?: Prisma.AssertionSourceScalarFieldEnum | Prisma.AssertionSourceScalarFieldEnum[];
};
/**
 * AssertionSource create
 */
export type AssertionSourceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceInclude<ExtArgs> | null;
    /**
     * The data needed to create a AssertionSource.
     */
    data: Prisma.XOR<Prisma.AssertionSourceCreateInput, Prisma.AssertionSourceUncheckedCreateInput>;
};
/**
 * AssertionSource createMany
 */
export type AssertionSourceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many AssertionSources.
     */
    data: Prisma.AssertionSourceCreateManyInput | Prisma.AssertionSourceCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * AssertionSource createManyAndReturn
 */
export type AssertionSourceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * The data used to create many AssertionSources.
     */
    data: Prisma.AssertionSourceCreateManyInput | Prisma.AssertionSourceCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * AssertionSource update
 */
export type AssertionSourceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceInclude<ExtArgs> | null;
    /**
     * The data needed to update a AssertionSource.
     */
    data: Prisma.XOR<Prisma.AssertionSourceUpdateInput, Prisma.AssertionSourceUncheckedUpdateInput>;
    /**
     * Choose, which AssertionSource to update.
     */
    where: Prisma.AssertionSourceWhereUniqueInput;
};
/**
 * AssertionSource updateMany
 */
export type AssertionSourceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update AssertionSources.
     */
    data: Prisma.XOR<Prisma.AssertionSourceUpdateManyMutationInput, Prisma.AssertionSourceUncheckedUpdateManyInput>;
    /**
     * Filter which AssertionSources to update
     */
    where?: Prisma.AssertionSourceWhereInput;
    /**
     * Limit how many AssertionSources to update.
     */
    limit?: number;
};
/**
 * AssertionSource updateManyAndReturn
 */
export type AssertionSourceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * The data used to update AssertionSources.
     */
    data: Prisma.XOR<Prisma.AssertionSourceUpdateManyMutationInput, Prisma.AssertionSourceUncheckedUpdateManyInput>;
    /**
     * Filter which AssertionSources to update
     */
    where?: Prisma.AssertionSourceWhereInput;
    /**
     * Limit how many AssertionSources to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * AssertionSource upsert
 */
export type AssertionSourceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceInclude<ExtArgs> | null;
    /**
     * The filter to search for the AssertionSource to update in case it exists.
     */
    where: Prisma.AssertionSourceWhereUniqueInput;
    /**
     * In case the AssertionSource found by the `where` argument doesn't exist, create a new AssertionSource with this data.
     */
    create: Prisma.XOR<Prisma.AssertionSourceCreateInput, Prisma.AssertionSourceUncheckedCreateInput>;
    /**
     * In case the AssertionSource was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AssertionSourceUpdateInput, Prisma.AssertionSourceUncheckedUpdateInput>;
};
/**
 * AssertionSource delete
 */
export type AssertionSourceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceInclude<ExtArgs> | null;
    /**
     * Filter which AssertionSource to delete.
     */
    where: Prisma.AssertionSourceWhereUniqueInput;
};
/**
 * AssertionSource deleteMany
 */
export type AssertionSourceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which AssertionSources to delete
     */
    where?: Prisma.AssertionSourceWhereInput;
    /**
     * Limit how many AssertionSources to delete.
     */
    limit?: number;
};
/**
 * AssertionSource without action
 */
export type AssertionSourceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionSource
     */
    select?: Prisma.AssertionSourceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AssertionSource
     */
    omit?: Prisma.AssertionSourceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionSourceInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=AssertionSource.d.ts.map