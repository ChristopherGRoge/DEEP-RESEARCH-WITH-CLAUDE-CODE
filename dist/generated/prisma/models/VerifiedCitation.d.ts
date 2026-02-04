import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model VerifiedCitation
 * A verified citation from the cite:verify tool
 * Persisted for audit trail, reuse, and cache
 */
export type VerifiedCitationModel = runtime.Types.Result.DefaultSelection<Prisma.$VerifiedCitationPayload>;
export type AggregateVerifiedCitation = {
    _count: VerifiedCitationCountAggregateOutputType | null;
    _avg: VerifiedCitationAvgAggregateOutputType | null;
    _sum: VerifiedCitationSumAggregateOutputType | null;
    _min: VerifiedCitationMinAggregateOutputType | null;
    _max: VerifiedCitationMaxAggregateOutputType | null;
};
export type VerifiedCitationAvgAggregateOutputType = {
    statusCode: number | null;
};
export type VerifiedCitationSumAggregateOutputType = {
    statusCode: number | null;
};
export type VerifiedCitationMinAggregateOutputType = {
    id: string | null;
    url: string | null;
    quote: string | null;
    found: boolean | null;
    accessible: boolean | null;
    statusCode: number | null;
    context: string | null;
    recommendation: string | null;
    reasoning: string | null;
    verifiedAt: Date | null;
    validationResultId: string | null;
};
export type VerifiedCitationMaxAggregateOutputType = {
    id: string | null;
    url: string | null;
    quote: string | null;
    found: boolean | null;
    accessible: boolean | null;
    statusCode: number | null;
    context: string | null;
    recommendation: string | null;
    reasoning: string | null;
    verifiedAt: Date | null;
    validationResultId: string | null;
};
export type VerifiedCitationCountAggregateOutputType = {
    id: number;
    url: number;
    quote: number;
    found: number;
    accessible: number;
    statusCode: number;
    context: number;
    similarPhrases: number;
    recommendation: number;
    reasoning: number;
    verifiedAt: number;
    validationResultId: number;
    _all: number;
};
export type VerifiedCitationAvgAggregateInputType = {
    statusCode?: true;
};
export type VerifiedCitationSumAggregateInputType = {
    statusCode?: true;
};
export type VerifiedCitationMinAggregateInputType = {
    id?: true;
    url?: true;
    quote?: true;
    found?: true;
    accessible?: true;
    statusCode?: true;
    context?: true;
    recommendation?: true;
    reasoning?: true;
    verifiedAt?: true;
    validationResultId?: true;
};
export type VerifiedCitationMaxAggregateInputType = {
    id?: true;
    url?: true;
    quote?: true;
    found?: true;
    accessible?: true;
    statusCode?: true;
    context?: true;
    recommendation?: true;
    reasoning?: true;
    verifiedAt?: true;
    validationResultId?: true;
};
export type VerifiedCitationCountAggregateInputType = {
    id?: true;
    url?: true;
    quote?: true;
    found?: true;
    accessible?: true;
    statusCode?: true;
    context?: true;
    similarPhrases?: true;
    recommendation?: true;
    reasoning?: true;
    verifiedAt?: true;
    validationResultId?: true;
    _all?: true;
};
export type VerifiedCitationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VerifiedCitation to aggregate.
     */
    where?: Prisma.VerifiedCitationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerifiedCitations to fetch.
     */
    orderBy?: Prisma.VerifiedCitationOrderByWithRelationInput | Prisma.VerifiedCitationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.VerifiedCitationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerifiedCitations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerifiedCitations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned VerifiedCitations
    **/
    _count?: true | VerifiedCitationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: VerifiedCitationAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: VerifiedCitationSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: VerifiedCitationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: VerifiedCitationMaxAggregateInputType;
};
export type GetVerifiedCitationAggregateType<T extends VerifiedCitationAggregateArgs> = {
    [P in keyof T & keyof AggregateVerifiedCitation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVerifiedCitation[P]> : Prisma.GetScalarType<T[P], AggregateVerifiedCitation[P]>;
};
export type VerifiedCitationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerifiedCitationWhereInput;
    orderBy?: Prisma.VerifiedCitationOrderByWithAggregationInput | Prisma.VerifiedCitationOrderByWithAggregationInput[];
    by: Prisma.VerifiedCitationScalarFieldEnum[] | Prisma.VerifiedCitationScalarFieldEnum;
    having?: Prisma.VerifiedCitationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VerifiedCitationCountAggregateInputType | true;
    _avg?: VerifiedCitationAvgAggregateInputType;
    _sum?: VerifiedCitationSumAggregateInputType;
    _min?: VerifiedCitationMinAggregateInputType;
    _max?: VerifiedCitationMaxAggregateInputType;
};
export type VerifiedCitationGroupByOutputType = {
    id: string;
    url: string;
    quote: string;
    found: boolean;
    accessible: boolean;
    statusCode: number | null;
    context: string | null;
    similarPhrases: runtime.JsonValue | null;
    recommendation: string;
    reasoning: string | null;
    verifiedAt: Date;
    validationResultId: string | null;
    _count: VerifiedCitationCountAggregateOutputType | null;
    _avg: VerifiedCitationAvgAggregateOutputType | null;
    _sum: VerifiedCitationSumAggregateOutputType | null;
    _min: VerifiedCitationMinAggregateOutputType | null;
    _max: VerifiedCitationMaxAggregateOutputType | null;
};
type GetVerifiedCitationGroupByPayload<T extends VerifiedCitationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VerifiedCitationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VerifiedCitationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VerifiedCitationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VerifiedCitationGroupByOutputType[P]>;
}>>;
export type VerifiedCitationWhereInput = {
    AND?: Prisma.VerifiedCitationWhereInput | Prisma.VerifiedCitationWhereInput[];
    OR?: Prisma.VerifiedCitationWhereInput[];
    NOT?: Prisma.VerifiedCitationWhereInput | Prisma.VerifiedCitationWhereInput[];
    id?: Prisma.StringFilter<"VerifiedCitation"> | string;
    url?: Prisma.StringFilter<"VerifiedCitation"> | string;
    quote?: Prisma.StringFilter<"VerifiedCitation"> | string;
    found?: Prisma.BoolFilter<"VerifiedCitation"> | boolean;
    accessible?: Prisma.BoolFilter<"VerifiedCitation"> | boolean;
    statusCode?: Prisma.IntNullableFilter<"VerifiedCitation"> | number | null;
    context?: Prisma.StringNullableFilter<"VerifiedCitation"> | string | null;
    similarPhrases?: Prisma.JsonNullableFilter<"VerifiedCitation">;
    recommendation?: Prisma.StringFilter<"VerifiedCitation"> | string;
    reasoning?: Prisma.StringNullableFilter<"VerifiedCitation"> | string | null;
    verifiedAt?: Prisma.DateTimeFilter<"VerifiedCitation"> | Date | string;
    validationResultId?: Prisma.StringNullableFilter<"VerifiedCitation"> | string | null;
    validationResult?: Prisma.XOR<Prisma.ValidationResultNullableScalarRelationFilter, Prisma.ValidationResultWhereInput> | null;
};
export type VerifiedCitationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    found?: Prisma.SortOrder;
    accessible?: Prisma.SortOrder;
    statusCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    context?: Prisma.SortOrderInput | Prisma.SortOrder;
    similarPhrases?: Prisma.SortOrderInput | Prisma.SortOrder;
    recommendation?: Prisma.SortOrder;
    reasoning?: Prisma.SortOrderInput | Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    validationResultId?: Prisma.SortOrderInput | Prisma.SortOrder;
    validationResult?: Prisma.ValidationResultOrderByWithRelationInput;
};
export type VerifiedCitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.VerifiedCitationWhereInput | Prisma.VerifiedCitationWhereInput[];
    OR?: Prisma.VerifiedCitationWhereInput[];
    NOT?: Prisma.VerifiedCitationWhereInput | Prisma.VerifiedCitationWhereInput[];
    url?: Prisma.StringFilter<"VerifiedCitation"> | string;
    quote?: Prisma.StringFilter<"VerifiedCitation"> | string;
    found?: Prisma.BoolFilter<"VerifiedCitation"> | boolean;
    accessible?: Prisma.BoolFilter<"VerifiedCitation"> | boolean;
    statusCode?: Prisma.IntNullableFilter<"VerifiedCitation"> | number | null;
    context?: Prisma.StringNullableFilter<"VerifiedCitation"> | string | null;
    similarPhrases?: Prisma.JsonNullableFilter<"VerifiedCitation">;
    recommendation?: Prisma.StringFilter<"VerifiedCitation"> | string;
    reasoning?: Prisma.StringNullableFilter<"VerifiedCitation"> | string | null;
    verifiedAt?: Prisma.DateTimeFilter<"VerifiedCitation"> | Date | string;
    validationResultId?: Prisma.StringNullableFilter<"VerifiedCitation"> | string | null;
    validationResult?: Prisma.XOR<Prisma.ValidationResultNullableScalarRelationFilter, Prisma.ValidationResultWhereInput> | null;
}, "id">;
export type VerifiedCitationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    found?: Prisma.SortOrder;
    accessible?: Prisma.SortOrder;
    statusCode?: Prisma.SortOrderInput | Prisma.SortOrder;
    context?: Prisma.SortOrderInput | Prisma.SortOrder;
    similarPhrases?: Prisma.SortOrderInput | Prisma.SortOrder;
    recommendation?: Prisma.SortOrder;
    reasoning?: Prisma.SortOrderInput | Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    validationResultId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.VerifiedCitationCountOrderByAggregateInput;
    _avg?: Prisma.VerifiedCitationAvgOrderByAggregateInput;
    _max?: Prisma.VerifiedCitationMaxOrderByAggregateInput;
    _min?: Prisma.VerifiedCitationMinOrderByAggregateInput;
    _sum?: Prisma.VerifiedCitationSumOrderByAggregateInput;
};
export type VerifiedCitationScalarWhereWithAggregatesInput = {
    AND?: Prisma.VerifiedCitationScalarWhereWithAggregatesInput | Prisma.VerifiedCitationScalarWhereWithAggregatesInput[];
    OR?: Prisma.VerifiedCitationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VerifiedCitationScalarWhereWithAggregatesInput | Prisma.VerifiedCitationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"VerifiedCitation"> | string;
    url?: Prisma.StringWithAggregatesFilter<"VerifiedCitation"> | string;
    quote?: Prisma.StringWithAggregatesFilter<"VerifiedCitation"> | string;
    found?: Prisma.BoolWithAggregatesFilter<"VerifiedCitation"> | boolean;
    accessible?: Prisma.BoolWithAggregatesFilter<"VerifiedCitation"> | boolean;
    statusCode?: Prisma.IntNullableWithAggregatesFilter<"VerifiedCitation"> | number | null;
    context?: Prisma.StringNullableWithAggregatesFilter<"VerifiedCitation"> | string | null;
    similarPhrases?: Prisma.JsonNullableWithAggregatesFilter<"VerifiedCitation">;
    recommendation?: Prisma.StringWithAggregatesFilter<"VerifiedCitation"> | string;
    reasoning?: Prisma.StringNullableWithAggregatesFilter<"VerifiedCitation"> | string | null;
    verifiedAt?: Prisma.DateTimeWithAggregatesFilter<"VerifiedCitation"> | Date | string;
    validationResultId?: Prisma.StringNullableWithAggregatesFilter<"VerifiedCitation"> | string | null;
};
export type VerifiedCitationCreateInput = {
    id?: string;
    url: string;
    quote: string;
    found: boolean;
    accessible: boolean;
    statusCode?: number | null;
    context?: string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation: string;
    reasoning?: string | null;
    verifiedAt?: Date | string;
    validationResult?: Prisma.ValidationResultCreateNestedOneWithoutCitationsInput;
};
export type VerifiedCitationUncheckedCreateInput = {
    id?: string;
    url: string;
    quote: string;
    found: boolean;
    accessible: boolean;
    statusCode?: number | null;
    context?: string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation: string;
    reasoning?: string | null;
    verifiedAt?: Date | string;
    validationResultId?: string | null;
};
export type VerifiedCitationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.StringFieldUpdateOperationsInput | string;
    found?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validationResult?: Prisma.ValidationResultUpdateOneWithoutCitationsNestedInput;
};
export type VerifiedCitationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.StringFieldUpdateOperationsInput | string;
    found?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validationResultId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VerifiedCitationCreateManyInput = {
    id?: string;
    url: string;
    quote: string;
    found: boolean;
    accessible: boolean;
    statusCode?: number | null;
    context?: string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation: string;
    reasoning?: string | null;
    verifiedAt?: Date | string;
    validationResultId?: string | null;
};
export type VerifiedCitationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.StringFieldUpdateOperationsInput | string;
    found?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerifiedCitationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.StringFieldUpdateOperationsInput | string;
    found?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validationResultId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type VerifiedCitationListRelationFilter = {
    every?: Prisma.VerifiedCitationWhereInput;
    some?: Prisma.VerifiedCitationWhereInput;
    none?: Prisma.VerifiedCitationWhereInput;
};
export type VerifiedCitationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VerifiedCitationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    found?: Prisma.SortOrder;
    accessible?: Prisma.SortOrder;
    statusCode?: Prisma.SortOrder;
    context?: Prisma.SortOrder;
    similarPhrases?: Prisma.SortOrder;
    recommendation?: Prisma.SortOrder;
    reasoning?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    validationResultId?: Prisma.SortOrder;
};
export type VerifiedCitationAvgOrderByAggregateInput = {
    statusCode?: Prisma.SortOrder;
};
export type VerifiedCitationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    found?: Prisma.SortOrder;
    accessible?: Prisma.SortOrder;
    statusCode?: Prisma.SortOrder;
    context?: Prisma.SortOrder;
    recommendation?: Prisma.SortOrder;
    reasoning?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    validationResultId?: Prisma.SortOrder;
};
export type VerifiedCitationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    quote?: Prisma.SortOrder;
    found?: Prisma.SortOrder;
    accessible?: Prisma.SortOrder;
    statusCode?: Prisma.SortOrder;
    context?: Prisma.SortOrder;
    recommendation?: Prisma.SortOrder;
    reasoning?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    validationResultId?: Prisma.SortOrder;
};
export type VerifiedCitationSumOrderByAggregateInput = {
    statusCode?: Prisma.SortOrder;
};
export type VerifiedCitationCreateNestedManyWithoutValidationResultInput = {
    create?: Prisma.XOR<Prisma.VerifiedCitationCreateWithoutValidationResultInput, Prisma.VerifiedCitationUncheckedCreateWithoutValidationResultInput> | Prisma.VerifiedCitationCreateWithoutValidationResultInput[] | Prisma.VerifiedCitationUncheckedCreateWithoutValidationResultInput[];
    connectOrCreate?: Prisma.VerifiedCitationCreateOrConnectWithoutValidationResultInput | Prisma.VerifiedCitationCreateOrConnectWithoutValidationResultInput[];
    createMany?: Prisma.VerifiedCitationCreateManyValidationResultInputEnvelope;
    connect?: Prisma.VerifiedCitationWhereUniqueInput | Prisma.VerifiedCitationWhereUniqueInput[];
};
export type VerifiedCitationUncheckedCreateNestedManyWithoutValidationResultInput = {
    create?: Prisma.XOR<Prisma.VerifiedCitationCreateWithoutValidationResultInput, Prisma.VerifiedCitationUncheckedCreateWithoutValidationResultInput> | Prisma.VerifiedCitationCreateWithoutValidationResultInput[] | Prisma.VerifiedCitationUncheckedCreateWithoutValidationResultInput[];
    connectOrCreate?: Prisma.VerifiedCitationCreateOrConnectWithoutValidationResultInput | Prisma.VerifiedCitationCreateOrConnectWithoutValidationResultInput[];
    createMany?: Prisma.VerifiedCitationCreateManyValidationResultInputEnvelope;
    connect?: Prisma.VerifiedCitationWhereUniqueInput | Prisma.VerifiedCitationWhereUniqueInput[];
};
export type VerifiedCitationUpdateManyWithoutValidationResultNestedInput = {
    create?: Prisma.XOR<Prisma.VerifiedCitationCreateWithoutValidationResultInput, Prisma.VerifiedCitationUncheckedCreateWithoutValidationResultInput> | Prisma.VerifiedCitationCreateWithoutValidationResultInput[] | Prisma.VerifiedCitationUncheckedCreateWithoutValidationResultInput[];
    connectOrCreate?: Prisma.VerifiedCitationCreateOrConnectWithoutValidationResultInput | Prisma.VerifiedCitationCreateOrConnectWithoutValidationResultInput[];
    upsert?: Prisma.VerifiedCitationUpsertWithWhereUniqueWithoutValidationResultInput | Prisma.VerifiedCitationUpsertWithWhereUniqueWithoutValidationResultInput[];
    createMany?: Prisma.VerifiedCitationCreateManyValidationResultInputEnvelope;
    set?: Prisma.VerifiedCitationWhereUniqueInput | Prisma.VerifiedCitationWhereUniqueInput[];
    disconnect?: Prisma.VerifiedCitationWhereUniqueInput | Prisma.VerifiedCitationWhereUniqueInput[];
    delete?: Prisma.VerifiedCitationWhereUniqueInput | Prisma.VerifiedCitationWhereUniqueInput[];
    connect?: Prisma.VerifiedCitationWhereUniqueInput | Prisma.VerifiedCitationWhereUniqueInput[];
    update?: Prisma.VerifiedCitationUpdateWithWhereUniqueWithoutValidationResultInput | Prisma.VerifiedCitationUpdateWithWhereUniqueWithoutValidationResultInput[];
    updateMany?: Prisma.VerifiedCitationUpdateManyWithWhereWithoutValidationResultInput | Prisma.VerifiedCitationUpdateManyWithWhereWithoutValidationResultInput[];
    deleteMany?: Prisma.VerifiedCitationScalarWhereInput | Prisma.VerifiedCitationScalarWhereInput[];
};
export type VerifiedCitationUncheckedUpdateManyWithoutValidationResultNestedInput = {
    create?: Prisma.XOR<Prisma.VerifiedCitationCreateWithoutValidationResultInput, Prisma.VerifiedCitationUncheckedCreateWithoutValidationResultInput> | Prisma.VerifiedCitationCreateWithoutValidationResultInput[] | Prisma.VerifiedCitationUncheckedCreateWithoutValidationResultInput[];
    connectOrCreate?: Prisma.VerifiedCitationCreateOrConnectWithoutValidationResultInput | Prisma.VerifiedCitationCreateOrConnectWithoutValidationResultInput[];
    upsert?: Prisma.VerifiedCitationUpsertWithWhereUniqueWithoutValidationResultInput | Prisma.VerifiedCitationUpsertWithWhereUniqueWithoutValidationResultInput[];
    createMany?: Prisma.VerifiedCitationCreateManyValidationResultInputEnvelope;
    set?: Prisma.VerifiedCitationWhereUniqueInput | Prisma.VerifiedCitationWhereUniqueInput[];
    disconnect?: Prisma.VerifiedCitationWhereUniqueInput | Prisma.VerifiedCitationWhereUniqueInput[];
    delete?: Prisma.VerifiedCitationWhereUniqueInput | Prisma.VerifiedCitationWhereUniqueInput[];
    connect?: Prisma.VerifiedCitationWhereUniqueInput | Prisma.VerifiedCitationWhereUniqueInput[];
    update?: Prisma.VerifiedCitationUpdateWithWhereUniqueWithoutValidationResultInput | Prisma.VerifiedCitationUpdateWithWhereUniqueWithoutValidationResultInput[];
    updateMany?: Prisma.VerifiedCitationUpdateManyWithWhereWithoutValidationResultInput | Prisma.VerifiedCitationUpdateManyWithWhereWithoutValidationResultInput[];
    deleteMany?: Prisma.VerifiedCitationScalarWhereInput | Prisma.VerifiedCitationScalarWhereInput[];
};
export type VerifiedCitationCreateWithoutValidationResultInput = {
    id?: string;
    url: string;
    quote: string;
    found: boolean;
    accessible: boolean;
    statusCode?: number | null;
    context?: string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation: string;
    reasoning?: string | null;
    verifiedAt?: Date | string;
};
export type VerifiedCitationUncheckedCreateWithoutValidationResultInput = {
    id?: string;
    url: string;
    quote: string;
    found: boolean;
    accessible: boolean;
    statusCode?: number | null;
    context?: string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation: string;
    reasoning?: string | null;
    verifiedAt?: Date | string;
};
export type VerifiedCitationCreateOrConnectWithoutValidationResultInput = {
    where: Prisma.VerifiedCitationWhereUniqueInput;
    create: Prisma.XOR<Prisma.VerifiedCitationCreateWithoutValidationResultInput, Prisma.VerifiedCitationUncheckedCreateWithoutValidationResultInput>;
};
export type VerifiedCitationCreateManyValidationResultInputEnvelope = {
    data: Prisma.VerifiedCitationCreateManyValidationResultInput | Prisma.VerifiedCitationCreateManyValidationResultInput[];
};
export type VerifiedCitationUpsertWithWhereUniqueWithoutValidationResultInput = {
    where: Prisma.VerifiedCitationWhereUniqueInput;
    update: Prisma.XOR<Prisma.VerifiedCitationUpdateWithoutValidationResultInput, Prisma.VerifiedCitationUncheckedUpdateWithoutValidationResultInput>;
    create: Prisma.XOR<Prisma.VerifiedCitationCreateWithoutValidationResultInput, Prisma.VerifiedCitationUncheckedCreateWithoutValidationResultInput>;
};
export type VerifiedCitationUpdateWithWhereUniqueWithoutValidationResultInput = {
    where: Prisma.VerifiedCitationWhereUniqueInput;
    data: Prisma.XOR<Prisma.VerifiedCitationUpdateWithoutValidationResultInput, Prisma.VerifiedCitationUncheckedUpdateWithoutValidationResultInput>;
};
export type VerifiedCitationUpdateManyWithWhereWithoutValidationResultInput = {
    where: Prisma.VerifiedCitationScalarWhereInput;
    data: Prisma.XOR<Prisma.VerifiedCitationUpdateManyMutationInput, Prisma.VerifiedCitationUncheckedUpdateManyWithoutValidationResultInput>;
};
export type VerifiedCitationScalarWhereInput = {
    AND?: Prisma.VerifiedCitationScalarWhereInput | Prisma.VerifiedCitationScalarWhereInput[];
    OR?: Prisma.VerifiedCitationScalarWhereInput[];
    NOT?: Prisma.VerifiedCitationScalarWhereInput | Prisma.VerifiedCitationScalarWhereInput[];
    id?: Prisma.StringFilter<"VerifiedCitation"> | string;
    url?: Prisma.StringFilter<"VerifiedCitation"> | string;
    quote?: Prisma.StringFilter<"VerifiedCitation"> | string;
    found?: Prisma.BoolFilter<"VerifiedCitation"> | boolean;
    accessible?: Prisma.BoolFilter<"VerifiedCitation"> | boolean;
    statusCode?: Prisma.IntNullableFilter<"VerifiedCitation"> | number | null;
    context?: Prisma.StringNullableFilter<"VerifiedCitation"> | string | null;
    similarPhrases?: Prisma.JsonNullableFilter<"VerifiedCitation">;
    recommendation?: Prisma.StringFilter<"VerifiedCitation"> | string;
    reasoning?: Prisma.StringNullableFilter<"VerifiedCitation"> | string | null;
    verifiedAt?: Prisma.DateTimeFilter<"VerifiedCitation"> | Date | string;
    validationResultId?: Prisma.StringNullableFilter<"VerifiedCitation"> | string | null;
};
export type VerifiedCitationCreateManyValidationResultInput = {
    id?: string;
    url: string;
    quote: string;
    found: boolean;
    accessible: boolean;
    statusCode?: number | null;
    context?: string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation: string;
    reasoning?: string | null;
    verifiedAt?: Date | string;
};
export type VerifiedCitationUpdateWithoutValidationResultInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.StringFieldUpdateOperationsInput | string;
    found?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerifiedCitationUncheckedUpdateWithoutValidationResultInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.StringFieldUpdateOperationsInput | string;
    found?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerifiedCitationUncheckedUpdateManyWithoutValidationResultInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    quote?: Prisma.StringFieldUpdateOperationsInput | string;
    found?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    accessible?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    statusCode?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    context?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    similarPhrases?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    recommendation?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    verifiedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VerifiedCitationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    url?: boolean;
    quote?: boolean;
    found?: boolean;
    accessible?: boolean;
    statusCode?: boolean;
    context?: boolean;
    similarPhrases?: boolean;
    recommendation?: boolean;
    reasoning?: boolean;
    verifiedAt?: boolean;
    validationResultId?: boolean;
    validationResult?: boolean | Prisma.VerifiedCitation$validationResultArgs<ExtArgs>;
}, ExtArgs["result"]["verifiedCitation"]>;
export type VerifiedCitationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    url?: boolean;
    quote?: boolean;
    found?: boolean;
    accessible?: boolean;
    statusCode?: boolean;
    context?: boolean;
    similarPhrases?: boolean;
    recommendation?: boolean;
    reasoning?: boolean;
    verifiedAt?: boolean;
    validationResultId?: boolean;
    validationResult?: boolean | Prisma.VerifiedCitation$validationResultArgs<ExtArgs>;
}, ExtArgs["result"]["verifiedCitation"]>;
export type VerifiedCitationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    url?: boolean;
    quote?: boolean;
    found?: boolean;
    accessible?: boolean;
    statusCode?: boolean;
    context?: boolean;
    similarPhrases?: boolean;
    recommendation?: boolean;
    reasoning?: boolean;
    verifiedAt?: boolean;
    validationResultId?: boolean;
    validationResult?: boolean | Prisma.VerifiedCitation$validationResultArgs<ExtArgs>;
}, ExtArgs["result"]["verifiedCitation"]>;
export type VerifiedCitationSelectScalar = {
    id?: boolean;
    url?: boolean;
    quote?: boolean;
    found?: boolean;
    accessible?: boolean;
    statusCode?: boolean;
    context?: boolean;
    similarPhrases?: boolean;
    recommendation?: boolean;
    reasoning?: boolean;
    verifiedAt?: boolean;
    validationResultId?: boolean;
};
export type VerifiedCitationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "url" | "quote" | "found" | "accessible" | "statusCode" | "context" | "similarPhrases" | "recommendation" | "reasoning" | "verifiedAt" | "validationResultId", ExtArgs["result"]["verifiedCitation"]>;
export type VerifiedCitationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    validationResult?: boolean | Prisma.VerifiedCitation$validationResultArgs<ExtArgs>;
};
export type VerifiedCitationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    validationResult?: boolean | Prisma.VerifiedCitation$validationResultArgs<ExtArgs>;
};
export type VerifiedCitationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    validationResult?: boolean | Prisma.VerifiedCitation$validationResultArgs<ExtArgs>;
};
export type $VerifiedCitationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VerifiedCitation";
    objects: {
        validationResult: Prisma.$ValidationResultPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        url: string;
        quote: string;
        found: boolean;
        accessible: boolean;
        statusCode: number | null;
        context: string | null;
        similarPhrases: runtime.JsonValue | null;
        recommendation: string;
        reasoning: string | null;
        verifiedAt: Date;
        validationResultId: string | null;
    }, ExtArgs["result"]["verifiedCitation"]>;
    composites: {};
};
export type VerifiedCitationGetPayload<S extends boolean | null | undefined | VerifiedCitationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload, S>;
export type VerifiedCitationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VerifiedCitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VerifiedCitationCountAggregateInputType | true;
};
export interface VerifiedCitationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VerifiedCitation'];
        meta: {
            name: 'VerifiedCitation';
        };
    };
    /**
     * Find zero or one VerifiedCitation that matches the filter.
     * @param {VerifiedCitationFindUniqueArgs} args - Arguments to find a VerifiedCitation
     * @example
     * // Get one VerifiedCitation
     * const verifiedCitation = await prisma.verifiedCitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerifiedCitationFindUniqueArgs>(args: Prisma.SelectSubset<T, VerifiedCitationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VerifiedCitationClient<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one VerifiedCitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerifiedCitationFindUniqueOrThrowArgs} args - Arguments to find a VerifiedCitation
     * @example
     * // Get one VerifiedCitation
     * const verifiedCitation = await prisma.verifiedCitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerifiedCitationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VerifiedCitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VerifiedCitationClient<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VerifiedCitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerifiedCitationFindFirstArgs} args - Arguments to find a VerifiedCitation
     * @example
     * // Get one VerifiedCitation
     * const verifiedCitation = await prisma.verifiedCitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerifiedCitationFindFirstArgs>(args?: Prisma.SelectSubset<T, VerifiedCitationFindFirstArgs<ExtArgs>>): Prisma.Prisma__VerifiedCitationClient<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first VerifiedCitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerifiedCitationFindFirstOrThrowArgs} args - Arguments to find a VerifiedCitation
     * @example
     * // Get one VerifiedCitation
     * const verifiedCitation = await prisma.verifiedCitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerifiedCitationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VerifiedCitationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VerifiedCitationClient<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more VerifiedCitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerifiedCitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerifiedCitations
     * const verifiedCitations = await prisma.verifiedCitation.findMany()
     *
     * // Get first 10 VerifiedCitations
     * const verifiedCitations = await prisma.verifiedCitation.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const verifiedCitationWithIdOnly = await prisma.verifiedCitation.findMany({ select: { id: true } })
     *
     */
    findMany<T extends VerifiedCitationFindManyArgs>(args?: Prisma.SelectSubset<T, VerifiedCitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a VerifiedCitation.
     * @param {VerifiedCitationCreateArgs} args - Arguments to create a VerifiedCitation.
     * @example
     * // Create one VerifiedCitation
     * const VerifiedCitation = await prisma.verifiedCitation.create({
     *   data: {
     *     // ... data to create a VerifiedCitation
     *   }
     * })
     *
     */
    create<T extends VerifiedCitationCreateArgs>(args: Prisma.SelectSubset<T, VerifiedCitationCreateArgs<ExtArgs>>): Prisma.Prisma__VerifiedCitationClient<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many VerifiedCitations.
     * @param {VerifiedCitationCreateManyArgs} args - Arguments to create many VerifiedCitations.
     * @example
     * // Create many VerifiedCitations
     * const verifiedCitation = await prisma.verifiedCitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends VerifiedCitationCreateManyArgs>(args?: Prisma.SelectSubset<T, VerifiedCitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many VerifiedCitations and returns the data saved in the database.
     * @param {VerifiedCitationCreateManyAndReturnArgs} args - Arguments to create many VerifiedCitations.
     * @example
     * // Create many VerifiedCitations
     * const verifiedCitation = await prisma.verifiedCitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many VerifiedCitations and only return the `id`
     * const verifiedCitationWithIdOnly = await prisma.verifiedCitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends VerifiedCitationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VerifiedCitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a VerifiedCitation.
     * @param {VerifiedCitationDeleteArgs} args - Arguments to delete one VerifiedCitation.
     * @example
     * // Delete one VerifiedCitation
     * const VerifiedCitation = await prisma.verifiedCitation.delete({
     *   where: {
     *     // ... filter to delete one VerifiedCitation
     *   }
     * })
     *
     */
    delete<T extends VerifiedCitationDeleteArgs>(args: Prisma.SelectSubset<T, VerifiedCitationDeleteArgs<ExtArgs>>): Prisma.Prisma__VerifiedCitationClient<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one VerifiedCitation.
     * @param {VerifiedCitationUpdateArgs} args - Arguments to update one VerifiedCitation.
     * @example
     * // Update one VerifiedCitation
     * const verifiedCitation = await prisma.verifiedCitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends VerifiedCitationUpdateArgs>(args: Prisma.SelectSubset<T, VerifiedCitationUpdateArgs<ExtArgs>>): Prisma.Prisma__VerifiedCitationClient<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more VerifiedCitations.
     * @param {VerifiedCitationDeleteManyArgs} args - Arguments to filter VerifiedCitations to delete.
     * @example
     * // Delete a few VerifiedCitations
     * const { count } = await prisma.verifiedCitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends VerifiedCitationDeleteManyArgs>(args?: Prisma.SelectSubset<T, VerifiedCitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VerifiedCitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerifiedCitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerifiedCitations
     * const verifiedCitation = await prisma.verifiedCitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends VerifiedCitationUpdateManyArgs>(args: Prisma.SelectSubset<T, VerifiedCitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more VerifiedCitations and returns the data updated in the database.
     * @param {VerifiedCitationUpdateManyAndReturnArgs} args - Arguments to update many VerifiedCitations.
     * @example
     * // Update many VerifiedCitations
     * const verifiedCitation = await prisma.verifiedCitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more VerifiedCitations and only return the `id`
     * const verifiedCitationWithIdOnly = await prisma.verifiedCitation.updateManyAndReturn({
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
    updateManyAndReturn<T extends VerifiedCitationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VerifiedCitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one VerifiedCitation.
     * @param {VerifiedCitationUpsertArgs} args - Arguments to update or create a VerifiedCitation.
     * @example
     * // Update or create a VerifiedCitation
     * const verifiedCitation = await prisma.verifiedCitation.upsert({
     *   create: {
     *     // ... data to create a VerifiedCitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerifiedCitation we want to update
     *   }
     * })
     */
    upsert<T extends VerifiedCitationUpsertArgs>(args: Prisma.SelectSubset<T, VerifiedCitationUpsertArgs<ExtArgs>>): Prisma.Prisma__VerifiedCitationClient<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of VerifiedCitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerifiedCitationCountArgs} args - Arguments to filter VerifiedCitations to count.
     * @example
     * // Count the number of VerifiedCitations
     * const count = await prisma.verifiedCitation.count({
     *   where: {
     *     // ... the filter for the VerifiedCitations we want to count
     *   }
     * })
    **/
    count<T extends VerifiedCitationCountArgs>(args?: Prisma.Subset<T, VerifiedCitationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VerifiedCitationCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a VerifiedCitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerifiedCitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerifiedCitationAggregateArgs>(args: Prisma.Subset<T, VerifiedCitationAggregateArgs>): Prisma.PrismaPromise<GetVerifiedCitationAggregateType<T>>;
    /**
     * Group by VerifiedCitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerifiedCitationGroupByArgs} args - Group by arguments.
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
    groupBy<T extends VerifiedCitationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VerifiedCitationGroupByArgs['orderBy'];
    } : {
        orderBy?: VerifiedCitationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VerifiedCitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerifiedCitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the VerifiedCitation model
     */
    readonly fields: VerifiedCitationFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for VerifiedCitation.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__VerifiedCitationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    validationResult<T extends Prisma.VerifiedCitation$validationResultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.VerifiedCitation$validationResultArgs<ExtArgs>>): Prisma.Prisma__ValidationResultClient<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the VerifiedCitation model
 */
export interface VerifiedCitationFieldRefs {
    readonly id: Prisma.FieldRef<"VerifiedCitation", 'String'>;
    readonly url: Prisma.FieldRef<"VerifiedCitation", 'String'>;
    readonly quote: Prisma.FieldRef<"VerifiedCitation", 'String'>;
    readonly found: Prisma.FieldRef<"VerifiedCitation", 'Boolean'>;
    readonly accessible: Prisma.FieldRef<"VerifiedCitation", 'Boolean'>;
    readonly statusCode: Prisma.FieldRef<"VerifiedCitation", 'Int'>;
    readonly context: Prisma.FieldRef<"VerifiedCitation", 'String'>;
    readonly similarPhrases: Prisma.FieldRef<"VerifiedCitation", 'Json'>;
    readonly recommendation: Prisma.FieldRef<"VerifiedCitation", 'String'>;
    readonly reasoning: Prisma.FieldRef<"VerifiedCitation", 'String'>;
    readonly verifiedAt: Prisma.FieldRef<"VerifiedCitation", 'DateTime'>;
    readonly validationResultId: Prisma.FieldRef<"VerifiedCitation", 'String'>;
}
/**
 * VerifiedCitation findUnique
 */
export type VerifiedCitationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationInclude<ExtArgs> | null;
    /**
     * Filter, which VerifiedCitation to fetch.
     */
    where: Prisma.VerifiedCitationWhereUniqueInput;
};
/**
 * VerifiedCitation findUniqueOrThrow
 */
export type VerifiedCitationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationInclude<ExtArgs> | null;
    /**
     * Filter, which VerifiedCitation to fetch.
     */
    where: Prisma.VerifiedCitationWhereUniqueInput;
};
/**
 * VerifiedCitation findFirst
 */
export type VerifiedCitationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationInclude<ExtArgs> | null;
    /**
     * Filter, which VerifiedCitation to fetch.
     */
    where?: Prisma.VerifiedCitationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerifiedCitations to fetch.
     */
    orderBy?: Prisma.VerifiedCitationOrderByWithRelationInput | Prisma.VerifiedCitationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VerifiedCitations.
     */
    cursor?: Prisma.VerifiedCitationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerifiedCitations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerifiedCitations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerifiedCitations.
     */
    distinct?: Prisma.VerifiedCitationScalarFieldEnum | Prisma.VerifiedCitationScalarFieldEnum[];
};
/**
 * VerifiedCitation findFirstOrThrow
 */
export type VerifiedCitationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationInclude<ExtArgs> | null;
    /**
     * Filter, which VerifiedCitation to fetch.
     */
    where?: Prisma.VerifiedCitationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerifiedCitations to fetch.
     */
    orderBy?: Prisma.VerifiedCitationOrderByWithRelationInput | Prisma.VerifiedCitationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for VerifiedCitations.
     */
    cursor?: Prisma.VerifiedCitationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerifiedCitations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerifiedCitations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of VerifiedCitations.
     */
    distinct?: Prisma.VerifiedCitationScalarFieldEnum | Prisma.VerifiedCitationScalarFieldEnum[];
};
/**
 * VerifiedCitation findMany
 */
export type VerifiedCitationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationInclude<ExtArgs> | null;
    /**
     * Filter, which VerifiedCitations to fetch.
     */
    where?: Prisma.VerifiedCitationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of VerifiedCitations to fetch.
     */
    orderBy?: Prisma.VerifiedCitationOrderByWithRelationInput | Prisma.VerifiedCitationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing VerifiedCitations.
     */
    cursor?: Prisma.VerifiedCitationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` VerifiedCitations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` VerifiedCitations.
     */
    skip?: number;
    distinct?: Prisma.VerifiedCitationScalarFieldEnum | Prisma.VerifiedCitationScalarFieldEnum[];
};
/**
 * VerifiedCitation create
 */
export type VerifiedCitationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationInclude<ExtArgs> | null;
    /**
     * The data needed to create a VerifiedCitation.
     */
    data: Prisma.XOR<Prisma.VerifiedCitationCreateInput, Prisma.VerifiedCitationUncheckedCreateInput>;
};
/**
 * VerifiedCitation createMany
 */
export type VerifiedCitationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerifiedCitations.
     */
    data: Prisma.VerifiedCitationCreateManyInput | Prisma.VerifiedCitationCreateManyInput[];
};
/**
 * VerifiedCitation createManyAndReturn
 */
export type VerifiedCitationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * The data used to create many VerifiedCitations.
     */
    data: Prisma.VerifiedCitationCreateManyInput | Prisma.VerifiedCitationCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * VerifiedCitation update
 */
export type VerifiedCitationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationInclude<ExtArgs> | null;
    /**
     * The data needed to update a VerifiedCitation.
     */
    data: Prisma.XOR<Prisma.VerifiedCitationUpdateInput, Prisma.VerifiedCitationUncheckedUpdateInput>;
    /**
     * Choose, which VerifiedCitation to update.
     */
    where: Prisma.VerifiedCitationWhereUniqueInput;
};
/**
 * VerifiedCitation updateMany
 */
export type VerifiedCitationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update VerifiedCitations.
     */
    data: Prisma.XOR<Prisma.VerifiedCitationUpdateManyMutationInput, Prisma.VerifiedCitationUncheckedUpdateManyInput>;
    /**
     * Filter which VerifiedCitations to update
     */
    where?: Prisma.VerifiedCitationWhereInput;
    /**
     * Limit how many VerifiedCitations to update.
     */
    limit?: number;
};
/**
 * VerifiedCitation updateManyAndReturn
 */
export type VerifiedCitationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * The data used to update VerifiedCitations.
     */
    data: Prisma.XOR<Prisma.VerifiedCitationUpdateManyMutationInput, Prisma.VerifiedCitationUncheckedUpdateManyInput>;
    /**
     * Filter which VerifiedCitations to update
     */
    where?: Prisma.VerifiedCitationWhereInput;
    /**
     * Limit how many VerifiedCitations to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * VerifiedCitation upsert
 */
export type VerifiedCitationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationInclude<ExtArgs> | null;
    /**
     * The filter to search for the VerifiedCitation to update in case it exists.
     */
    where: Prisma.VerifiedCitationWhereUniqueInput;
    /**
     * In case the VerifiedCitation found by the `where` argument doesn't exist, create a new VerifiedCitation with this data.
     */
    create: Prisma.XOR<Prisma.VerifiedCitationCreateInput, Prisma.VerifiedCitationUncheckedCreateInput>;
    /**
     * In case the VerifiedCitation was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.VerifiedCitationUpdateInput, Prisma.VerifiedCitationUncheckedUpdateInput>;
};
/**
 * VerifiedCitation delete
 */
export type VerifiedCitationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationInclude<ExtArgs> | null;
    /**
     * Filter which VerifiedCitation to delete.
     */
    where: Prisma.VerifiedCitationWhereUniqueInput;
};
/**
 * VerifiedCitation deleteMany
 */
export type VerifiedCitationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which VerifiedCitations to delete
     */
    where?: Prisma.VerifiedCitationWhereInput;
    /**
     * Limit how many VerifiedCitations to delete.
     */
    limit?: number;
};
/**
 * VerifiedCitation.validationResult
 */
export type VerifiedCitation$validationResultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: Prisma.ValidationResultSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: Prisma.ValidationResultOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ValidationResultInclude<ExtArgs> | null;
    where?: Prisma.ValidationResultWhereInput;
};
/**
 * VerifiedCitation without action
 */
export type VerifiedCitationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerifiedCitation
     */
    select?: Prisma.VerifiedCitationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the VerifiedCitation
     */
    omit?: Prisma.VerifiedCitationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.VerifiedCitationInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=VerifiedCitation.d.ts.map