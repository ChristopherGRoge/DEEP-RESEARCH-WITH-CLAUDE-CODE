import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Ruling
 * A ruling that closes the validation loop for an assertion-validation pair
 */
export type RulingModel = runtime.Types.Result.DefaultSelection<Prisma.$RulingPayload>;
export type AggregateRuling = {
    _count: RulingCountAggregateOutputType | null;
    _min: RulingMinAggregateOutputType | null;
    _max: RulingMaxAggregateOutputType | null;
};
export type RulingMinAggregateOutputType = {
    id: string | null;
    assertionId: string | null;
    validationId: string | null;
    verdict: $Enums.RulingVerdict | null;
    tensionAnalysis: string | null;
    reasoning: string | null;
    actionTaken: string | null;
    ruledBy: string | null;
    ruledAt: Date | null;
};
export type RulingMaxAggregateOutputType = {
    id: string | null;
    assertionId: string | null;
    validationId: string | null;
    verdict: $Enums.RulingVerdict | null;
    tensionAnalysis: string | null;
    reasoning: string | null;
    actionTaken: string | null;
    ruledBy: string | null;
    ruledAt: Date | null;
};
export type RulingCountAggregateOutputType = {
    id: number;
    assertionId: number;
    validationId: number;
    verdict: number;
    tensionAnalysis: number;
    reasoning: number;
    actionTaken: number;
    ruledBy: number;
    ruledAt: number;
    _all: number;
};
export type RulingMinAggregateInputType = {
    id?: true;
    assertionId?: true;
    validationId?: true;
    verdict?: true;
    tensionAnalysis?: true;
    reasoning?: true;
    actionTaken?: true;
    ruledBy?: true;
    ruledAt?: true;
};
export type RulingMaxAggregateInputType = {
    id?: true;
    assertionId?: true;
    validationId?: true;
    verdict?: true;
    tensionAnalysis?: true;
    reasoning?: true;
    actionTaken?: true;
    ruledBy?: true;
    ruledAt?: true;
};
export type RulingCountAggregateInputType = {
    id?: true;
    assertionId?: true;
    validationId?: true;
    verdict?: true;
    tensionAnalysis?: true;
    reasoning?: true;
    actionTaken?: true;
    ruledBy?: true;
    ruledAt?: true;
    _all?: true;
};
export type RulingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Ruling to aggregate.
     */
    where?: Prisma.RulingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rulings to fetch.
     */
    orderBy?: Prisma.RulingOrderByWithRelationInput | Prisma.RulingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RulingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rulings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rulings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Rulings
    **/
    _count?: true | RulingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RulingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RulingMaxAggregateInputType;
};
export type GetRulingAggregateType<T extends RulingAggregateArgs> = {
    [P in keyof T & keyof AggregateRuling]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRuling[P]> : Prisma.GetScalarType<T[P], AggregateRuling[P]>;
};
export type RulingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RulingWhereInput;
    orderBy?: Prisma.RulingOrderByWithAggregationInput | Prisma.RulingOrderByWithAggregationInput[];
    by: Prisma.RulingScalarFieldEnum[] | Prisma.RulingScalarFieldEnum;
    having?: Prisma.RulingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RulingCountAggregateInputType | true;
    _min?: RulingMinAggregateInputType;
    _max?: RulingMaxAggregateInputType;
};
export type RulingGroupByOutputType = {
    id: string;
    assertionId: string;
    validationId: string;
    verdict: $Enums.RulingVerdict;
    tensionAnalysis: string;
    reasoning: string;
    actionTaken: string | null;
    ruledBy: string;
    ruledAt: Date;
    _count: RulingCountAggregateOutputType | null;
    _min: RulingMinAggregateOutputType | null;
    _max: RulingMaxAggregateOutputType | null;
};
type GetRulingGroupByPayload<T extends RulingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RulingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RulingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RulingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RulingGroupByOutputType[P]>;
}>>;
export type RulingWhereInput = {
    AND?: Prisma.RulingWhereInput | Prisma.RulingWhereInput[];
    OR?: Prisma.RulingWhereInput[];
    NOT?: Prisma.RulingWhereInput | Prisma.RulingWhereInput[];
    id?: Prisma.StringFilter<"Ruling"> | string;
    assertionId?: Prisma.StringFilter<"Ruling"> | string;
    validationId?: Prisma.StringFilter<"Ruling"> | string;
    verdict?: Prisma.EnumRulingVerdictFilter<"Ruling"> | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFilter<"Ruling"> | string;
    reasoning?: Prisma.StringFilter<"Ruling"> | string;
    actionTaken?: Prisma.StringNullableFilter<"Ruling"> | string | null;
    ruledBy?: Prisma.StringFilter<"Ruling"> | string;
    ruledAt?: Prisma.DateTimeFilter<"Ruling"> | Date | string;
    assertion?: Prisma.XOR<Prisma.AssertionScalarRelationFilter, Prisma.AssertionWhereInput>;
    validation?: Prisma.XOR<Prisma.ValidationResultScalarRelationFilter, Prisma.ValidationResultWhereInput>;
};
export type RulingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    validationId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    tensionAnalysis?: Prisma.SortOrder;
    reasoning?: Prisma.SortOrder;
    actionTaken?: Prisma.SortOrderInput | Prisma.SortOrder;
    ruledBy?: Prisma.SortOrder;
    ruledAt?: Prisma.SortOrder;
    assertion?: Prisma.AssertionOrderByWithRelationInput;
    validation?: Prisma.ValidationResultOrderByWithRelationInput;
};
export type RulingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RulingWhereInput | Prisma.RulingWhereInput[];
    OR?: Prisma.RulingWhereInput[];
    NOT?: Prisma.RulingWhereInput | Prisma.RulingWhereInput[];
    assertionId?: Prisma.StringFilter<"Ruling"> | string;
    validationId?: Prisma.StringFilter<"Ruling"> | string;
    verdict?: Prisma.EnumRulingVerdictFilter<"Ruling"> | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFilter<"Ruling"> | string;
    reasoning?: Prisma.StringFilter<"Ruling"> | string;
    actionTaken?: Prisma.StringNullableFilter<"Ruling"> | string | null;
    ruledBy?: Prisma.StringFilter<"Ruling"> | string;
    ruledAt?: Prisma.DateTimeFilter<"Ruling"> | Date | string;
    assertion?: Prisma.XOR<Prisma.AssertionScalarRelationFilter, Prisma.AssertionWhereInput>;
    validation?: Prisma.XOR<Prisma.ValidationResultScalarRelationFilter, Prisma.ValidationResultWhereInput>;
}, "id">;
export type RulingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    validationId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    tensionAnalysis?: Prisma.SortOrder;
    reasoning?: Prisma.SortOrder;
    actionTaken?: Prisma.SortOrderInput | Prisma.SortOrder;
    ruledBy?: Prisma.SortOrder;
    ruledAt?: Prisma.SortOrder;
    _count?: Prisma.RulingCountOrderByAggregateInput;
    _max?: Prisma.RulingMaxOrderByAggregateInput;
    _min?: Prisma.RulingMinOrderByAggregateInput;
};
export type RulingScalarWhereWithAggregatesInput = {
    AND?: Prisma.RulingScalarWhereWithAggregatesInput | Prisma.RulingScalarWhereWithAggregatesInput[];
    OR?: Prisma.RulingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RulingScalarWhereWithAggregatesInput | Prisma.RulingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Ruling"> | string;
    assertionId?: Prisma.StringWithAggregatesFilter<"Ruling"> | string;
    validationId?: Prisma.StringWithAggregatesFilter<"Ruling"> | string;
    verdict?: Prisma.EnumRulingVerdictWithAggregatesFilter<"Ruling"> | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringWithAggregatesFilter<"Ruling"> | string;
    reasoning?: Prisma.StringWithAggregatesFilter<"Ruling"> | string;
    actionTaken?: Prisma.StringNullableWithAggregatesFilter<"Ruling"> | string | null;
    ruledBy?: Prisma.StringWithAggregatesFilter<"Ruling"> | string;
    ruledAt?: Prisma.DateTimeWithAggregatesFilter<"Ruling"> | Date | string;
};
export type RulingCreateInput = {
    id?: string;
    verdict: $Enums.RulingVerdict;
    tensionAnalysis: string;
    reasoning: string;
    actionTaken?: string | null;
    ruledBy: string;
    ruledAt?: Date | string;
    assertion: Prisma.AssertionCreateNestedOneWithoutRulingsInput;
    validation: Prisma.ValidationResultCreateNestedOneWithoutRulingsInput;
};
export type RulingUncheckedCreateInput = {
    id?: string;
    assertionId: string;
    validationId: string;
    verdict: $Enums.RulingVerdict;
    tensionAnalysis: string;
    reasoning: string;
    actionTaken?: string | null;
    ruledBy: string;
    ruledAt?: Date | string;
};
export type RulingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumRulingVerdictFieldUpdateOperationsInput | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.StringFieldUpdateOperationsInput | string;
    actionTaken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    ruledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assertion?: Prisma.AssertionUpdateOneRequiredWithoutRulingsNestedInput;
    validation?: Prisma.ValidationResultUpdateOneRequiredWithoutRulingsNestedInput;
};
export type RulingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
    validationId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumRulingVerdictFieldUpdateOperationsInput | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.StringFieldUpdateOperationsInput | string;
    actionTaken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    ruledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RulingCreateManyInput = {
    id?: string;
    assertionId: string;
    validationId: string;
    verdict: $Enums.RulingVerdict;
    tensionAnalysis: string;
    reasoning: string;
    actionTaken?: string | null;
    ruledBy: string;
    ruledAt?: Date | string;
};
export type RulingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumRulingVerdictFieldUpdateOperationsInput | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.StringFieldUpdateOperationsInput | string;
    actionTaken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    ruledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RulingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
    validationId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumRulingVerdictFieldUpdateOperationsInput | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.StringFieldUpdateOperationsInput | string;
    actionTaken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    ruledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RulingListRelationFilter = {
    every?: Prisma.RulingWhereInput;
    some?: Prisma.RulingWhereInput;
    none?: Prisma.RulingWhereInput;
};
export type RulingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RulingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    validationId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    tensionAnalysis?: Prisma.SortOrder;
    reasoning?: Prisma.SortOrder;
    actionTaken?: Prisma.SortOrder;
    ruledBy?: Prisma.SortOrder;
    ruledAt?: Prisma.SortOrder;
};
export type RulingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    validationId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    tensionAnalysis?: Prisma.SortOrder;
    reasoning?: Prisma.SortOrder;
    actionTaken?: Prisma.SortOrder;
    ruledBy?: Prisma.SortOrder;
    ruledAt?: Prisma.SortOrder;
};
export type RulingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    validationId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    tensionAnalysis?: Prisma.SortOrder;
    reasoning?: Prisma.SortOrder;
    actionTaken?: Prisma.SortOrder;
    ruledBy?: Prisma.SortOrder;
    ruledAt?: Prisma.SortOrder;
};
export type RulingCreateNestedManyWithoutAssertionInput = {
    create?: Prisma.XOR<Prisma.RulingCreateWithoutAssertionInput, Prisma.RulingUncheckedCreateWithoutAssertionInput> | Prisma.RulingCreateWithoutAssertionInput[] | Prisma.RulingUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.RulingCreateOrConnectWithoutAssertionInput | Prisma.RulingCreateOrConnectWithoutAssertionInput[];
    createMany?: Prisma.RulingCreateManyAssertionInputEnvelope;
    connect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
};
export type RulingUncheckedCreateNestedManyWithoutAssertionInput = {
    create?: Prisma.XOR<Prisma.RulingCreateWithoutAssertionInput, Prisma.RulingUncheckedCreateWithoutAssertionInput> | Prisma.RulingCreateWithoutAssertionInput[] | Prisma.RulingUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.RulingCreateOrConnectWithoutAssertionInput | Prisma.RulingCreateOrConnectWithoutAssertionInput[];
    createMany?: Prisma.RulingCreateManyAssertionInputEnvelope;
    connect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
};
export type RulingUpdateManyWithoutAssertionNestedInput = {
    create?: Prisma.XOR<Prisma.RulingCreateWithoutAssertionInput, Prisma.RulingUncheckedCreateWithoutAssertionInput> | Prisma.RulingCreateWithoutAssertionInput[] | Prisma.RulingUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.RulingCreateOrConnectWithoutAssertionInput | Prisma.RulingCreateOrConnectWithoutAssertionInput[];
    upsert?: Prisma.RulingUpsertWithWhereUniqueWithoutAssertionInput | Prisma.RulingUpsertWithWhereUniqueWithoutAssertionInput[];
    createMany?: Prisma.RulingCreateManyAssertionInputEnvelope;
    set?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    disconnect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    delete?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    connect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    update?: Prisma.RulingUpdateWithWhereUniqueWithoutAssertionInput | Prisma.RulingUpdateWithWhereUniqueWithoutAssertionInput[];
    updateMany?: Prisma.RulingUpdateManyWithWhereWithoutAssertionInput | Prisma.RulingUpdateManyWithWhereWithoutAssertionInput[];
    deleteMany?: Prisma.RulingScalarWhereInput | Prisma.RulingScalarWhereInput[];
};
export type RulingUncheckedUpdateManyWithoutAssertionNestedInput = {
    create?: Prisma.XOR<Prisma.RulingCreateWithoutAssertionInput, Prisma.RulingUncheckedCreateWithoutAssertionInput> | Prisma.RulingCreateWithoutAssertionInput[] | Prisma.RulingUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.RulingCreateOrConnectWithoutAssertionInput | Prisma.RulingCreateOrConnectWithoutAssertionInput[];
    upsert?: Prisma.RulingUpsertWithWhereUniqueWithoutAssertionInput | Prisma.RulingUpsertWithWhereUniqueWithoutAssertionInput[];
    createMany?: Prisma.RulingCreateManyAssertionInputEnvelope;
    set?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    disconnect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    delete?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    connect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    update?: Prisma.RulingUpdateWithWhereUniqueWithoutAssertionInput | Prisma.RulingUpdateWithWhereUniqueWithoutAssertionInput[];
    updateMany?: Prisma.RulingUpdateManyWithWhereWithoutAssertionInput | Prisma.RulingUpdateManyWithWhereWithoutAssertionInput[];
    deleteMany?: Prisma.RulingScalarWhereInput | Prisma.RulingScalarWhereInput[];
};
export type RulingCreateNestedManyWithoutValidationInput = {
    create?: Prisma.XOR<Prisma.RulingCreateWithoutValidationInput, Prisma.RulingUncheckedCreateWithoutValidationInput> | Prisma.RulingCreateWithoutValidationInput[] | Prisma.RulingUncheckedCreateWithoutValidationInput[];
    connectOrCreate?: Prisma.RulingCreateOrConnectWithoutValidationInput | Prisma.RulingCreateOrConnectWithoutValidationInput[];
    createMany?: Prisma.RulingCreateManyValidationInputEnvelope;
    connect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
};
export type RulingUncheckedCreateNestedManyWithoutValidationInput = {
    create?: Prisma.XOR<Prisma.RulingCreateWithoutValidationInput, Prisma.RulingUncheckedCreateWithoutValidationInput> | Prisma.RulingCreateWithoutValidationInput[] | Prisma.RulingUncheckedCreateWithoutValidationInput[];
    connectOrCreate?: Prisma.RulingCreateOrConnectWithoutValidationInput | Prisma.RulingCreateOrConnectWithoutValidationInput[];
    createMany?: Prisma.RulingCreateManyValidationInputEnvelope;
    connect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
};
export type RulingUpdateManyWithoutValidationNestedInput = {
    create?: Prisma.XOR<Prisma.RulingCreateWithoutValidationInput, Prisma.RulingUncheckedCreateWithoutValidationInput> | Prisma.RulingCreateWithoutValidationInput[] | Prisma.RulingUncheckedCreateWithoutValidationInput[];
    connectOrCreate?: Prisma.RulingCreateOrConnectWithoutValidationInput | Prisma.RulingCreateOrConnectWithoutValidationInput[];
    upsert?: Prisma.RulingUpsertWithWhereUniqueWithoutValidationInput | Prisma.RulingUpsertWithWhereUniqueWithoutValidationInput[];
    createMany?: Prisma.RulingCreateManyValidationInputEnvelope;
    set?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    disconnect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    delete?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    connect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    update?: Prisma.RulingUpdateWithWhereUniqueWithoutValidationInput | Prisma.RulingUpdateWithWhereUniqueWithoutValidationInput[];
    updateMany?: Prisma.RulingUpdateManyWithWhereWithoutValidationInput | Prisma.RulingUpdateManyWithWhereWithoutValidationInput[];
    deleteMany?: Prisma.RulingScalarWhereInput | Prisma.RulingScalarWhereInput[];
};
export type RulingUncheckedUpdateManyWithoutValidationNestedInput = {
    create?: Prisma.XOR<Prisma.RulingCreateWithoutValidationInput, Prisma.RulingUncheckedCreateWithoutValidationInput> | Prisma.RulingCreateWithoutValidationInput[] | Prisma.RulingUncheckedCreateWithoutValidationInput[];
    connectOrCreate?: Prisma.RulingCreateOrConnectWithoutValidationInput | Prisma.RulingCreateOrConnectWithoutValidationInput[];
    upsert?: Prisma.RulingUpsertWithWhereUniqueWithoutValidationInput | Prisma.RulingUpsertWithWhereUniqueWithoutValidationInput[];
    createMany?: Prisma.RulingCreateManyValidationInputEnvelope;
    set?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    disconnect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    delete?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    connect?: Prisma.RulingWhereUniqueInput | Prisma.RulingWhereUniqueInput[];
    update?: Prisma.RulingUpdateWithWhereUniqueWithoutValidationInput | Prisma.RulingUpdateWithWhereUniqueWithoutValidationInput[];
    updateMany?: Prisma.RulingUpdateManyWithWhereWithoutValidationInput | Prisma.RulingUpdateManyWithWhereWithoutValidationInput[];
    deleteMany?: Prisma.RulingScalarWhereInput | Prisma.RulingScalarWhereInput[];
};
export type EnumRulingVerdictFieldUpdateOperationsInput = {
    set?: $Enums.RulingVerdict;
};
export type RulingCreateWithoutAssertionInput = {
    id?: string;
    verdict: $Enums.RulingVerdict;
    tensionAnalysis: string;
    reasoning: string;
    actionTaken?: string | null;
    ruledBy: string;
    ruledAt?: Date | string;
    validation: Prisma.ValidationResultCreateNestedOneWithoutRulingsInput;
};
export type RulingUncheckedCreateWithoutAssertionInput = {
    id?: string;
    validationId: string;
    verdict: $Enums.RulingVerdict;
    tensionAnalysis: string;
    reasoning: string;
    actionTaken?: string | null;
    ruledBy: string;
    ruledAt?: Date | string;
};
export type RulingCreateOrConnectWithoutAssertionInput = {
    where: Prisma.RulingWhereUniqueInput;
    create: Prisma.XOR<Prisma.RulingCreateWithoutAssertionInput, Prisma.RulingUncheckedCreateWithoutAssertionInput>;
};
export type RulingCreateManyAssertionInputEnvelope = {
    data: Prisma.RulingCreateManyAssertionInput | Prisma.RulingCreateManyAssertionInput[];
};
export type RulingUpsertWithWhereUniqueWithoutAssertionInput = {
    where: Prisma.RulingWhereUniqueInput;
    update: Prisma.XOR<Prisma.RulingUpdateWithoutAssertionInput, Prisma.RulingUncheckedUpdateWithoutAssertionInput>;
    create: Prisma.XOR<Prisma.RulingCreateWithoutAssertionInput, Prisma.RulingUncheckedCreateWithoutAssertionInput>;
};
export type RulingUpdateWithWhereUniqueWithoutAssertionInput = {
    where: Prisma.RulingWhereUniqueInput;
    data: Prisma.XOR<Prisma.RulingUpdateWithoutAssertionInput, Prisma.RulingUncheckedUpdateWithoutAssertionInput>;
};
export type RulingUpdateManyWithWhereWithoutAssertionInput = {
    where: Prisma.RulingScalarWhereInput;
    data: Prisma.XOR<Prisma.RulingUpdateManyMutationInput, Prisma.RulingUncheckedUpdateManyWithoutAssertionInput>;
};
export type RulingScalarWhereInput = {
    AND?: Prisma.RulingScalarWhereInput | Prisma.RulingScalarWhereInput[];
    OR?: Prisma.RulingScalarWhereInput[];
    NOT?: Prisma.RulingScalarWhereInput | Prisma.RulingScalarWhereInput[];
    id?: Prisma.StringFilter<"Ruling"> | string;
    assertionId?: Prisma.StringFilter<"Ruling"> | string;
    validationId?: Prisma.StringFilter<"Ruling"> | string;
    verdict?: Prisma.EnumRulingVerdictFilter<"Ruling"> | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFilter<"Ruling"> | string;
    reasoning?: Prisma.StringFilter<"Ruling"> | string;
    actionTaken?: Prisma.StringNullableFilter<"Ruling"> | string | null;
    ruledBy?: Prisma.StringFilter<"Ruling"> | string;
    ruledAt?: Prisma.DateTimeFilter<"Ruling"> | Date | string;
};
export type RulingCreateWithoutValidationInput = {
    id?: string;
    verdict: $Enums.RulingVerdict;
    tensionAnalysis: string;
    reasoning: string;
    actionTaken?: string | null;
    ruledBy: string;
    ruledAt?: Date | string;
    assertion: Prisma.AssertionCreateNestedOneWithoutRulingsInput;
};
export type RulingUncheckedCreateWithoutValidationInput = {
    id?: string;
    assertionId: string;
    verdict: $Enums.RulingVerdict;
    tensionAnalysis: string;
    reasoning: string;
    actionTaken?: string | null;
    ruledBy: string;
    ruledAt?: Date | string;
};
export type RulingCreateOrConnectWithoutValidationInput = {
    where: Prisma.RulingWhereUniqueInput;
    create: Prisma.XOR<Prisma.RulingCreateWithoutValidationInput, Prisma.RulingUncheckedCreateWithoutValidationInput>;
};
export type RulingCreateManyValidationInputEnvelope = {
    data: Prisma.RulingCreateManyValidationInput | Prisma.RulingCreateManyValidationInput[];
};
export type RulingUpsertWithWhereUniqueWithoutValidationInput = {
    where: Prisma.RulingWhereUniqueInput;
    update: Prisma.XOR<Prisma.RulingUpdateWithoutValidationInput, Prisma.RulingUncheckedUpdateWithoutValidationInput>;
    create: Prisma.XOR<Prisma.RulingCreateWithoutValidationInput, Prisma.RulingUncheckedCreateWithoutValidationInput>;
};
export type RulingUpdateWithWhereUniqueWithoutValidationInput = {
    where: Prisma.RulingWhereUniqueInput;
    data: Prisma.XOR<Prisma.RulingUpdateWithoutValidationInput, Prisma.RulingUncheckedUpdateWithoutValidationInput>;
};
export type RulingUpdateManyWithWhereWithoutValidationInput = {
    where: Prisma.RulingScalarWhereInput;
    data: Prisma.XOR<Prisma.RulingUpdateManyMutationInput, Prisma.RulingUncheckedUpdateManyWithoutValidationInput>;
};
export type RulingCreateManyAssertionInput = {
    id?: string;
    validationId: string;
    verdict: $Enums.RulingVerdict;
    tensionAnalysis: string;
    reasoning: string;
    actionTaken?: string | null;
    ruledBy: string;
    ruledAt?: Date | string;
};
export type RulingUpdateWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumRulingVerdictFieldUpdateOperationsInput | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.StringFieldUpdateOperationsInput | string;
    actionTaken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    ruledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validation?: Prisma.ValidationResultUpdateOneRequiredWithoutRulingsNestedInput;
};
export type RulingUncheckedUpdateWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    validationId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumRulingVerdictFieldUpdateOperationsInput | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.StringFieldUpdateOperationsInput | string;
    actionTaken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    ruledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RulingUncheckedUpdateManyWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    validationId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumRulingVerdictFieldUpdateOperationsInput | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.StringFieldUpdateOperationsInput | string;
    actionTaken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    ruledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RulingCreateManyValidationInput = {
    id?: string;
    assertionId: string;
    verdict: $Enums.RulingVerdict;
    tensionAnalysis: string;
    reasoning: string;
    actionTaken?: string | null;
    ruledBy: string;
    ruledAt?: Date | string;
};
export type RulingUpdateWithoutValidationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumRulingVerdictFieldUpdateOperationsInput | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.StringFieldUpdateOperationsInput | string;
    actionTaken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    ruledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assertion?: Prisma.AssertionUpdateOneRequiredWithoutRulingsNestedInput;
};
export type RulingUncheckedUpdateWithoutValidationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumRulingVerdictFieldUpdateOperationsInput | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.StringFieldUpdateOperationsInput | string;
    actionTaken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    ruledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RulingUncheckedUpdateManyWithoutValidationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumRulingVerdictFieldUpdateOperationsInput | $Enums.RulingVerdict;
    tensionAnalysis?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.StringFieldUpdateOperationsInput | string;
    actionTaken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ruledBy?: Prisma.StringFieldUpdateOperationsInput | string;
    ruledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RulingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    assertionId?: boolean;
    validationId?: boolean;
    verdict?: boolean;
    tensionAnalysis?: boolean;
    reasoning?: boolean;
    actionTaken?: boolean;
    ruledBy?: boolean;
    ruledAt?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    validation?: boolean | Prisma.ValidationResultDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ruling"]>;
export type RulingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    assertionId?: boolean;
    validationId?: boolean;
    verdict?: boolean;
    tensionAnalysis?: boolean;
    reasoning?: boolean;
    actionTaken?: boolean;
    ruledBy?: boolean;
    ruledAt?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    validation?: boolean | Prisma.ValidationResultDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ruling"]>;
export type RulingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    assertionId?: boolean;
    validationId?: boolean;
    verdict?: boolean;
    tensionAnalysis?: boolean;
    reasoning?: boolean;
    actionTaken?: boolean;
    ruledBy?: boolean;
    ruledAt?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    validation?: boolean | Prisma.ValidationResultDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ruling"]>;
export type RulingSelectScalar = {
    id?: boolean;
    assertionId?: boolean;
    validationId?: boolean;
    verdict?: boolean;
    tensionAnalysis?: boolean;
    reasoning?: boolean;
    actionTaken?: boolean;
    ruledBy?: boolean;
    ruledAt?: boolean;
};
export type RulingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "assertionId" | "validationId" | "verdict" | "tensionAnalysis" | "reasoning" | "actionTaken" | "ruledBy" | "ruledAt", ExtArgs["result"]["ruling"]>;
export type RulingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    validation?: boolean | Prisma.ValidationResultDefaultArgs<ExtArgs>;
};
export type RulingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    validation?: boolean | Prisma.ValidationResultDefaultArgs<ExtArgs>;
};
export type RulingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    validation?: boolean | Prisma.ValidationResultDefaultArgs<ExtArgs>;
};
export type $RulingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Ruling";
    objects: {
        assertion: Prisma.$AssertionPayload<ExtArgs>;
        validation: Prisma.$ValidationResultPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        assertionId: string;
        validationId: string;
        verdict: $Enums.RulingVerdict;
        tensionAnalysis: string;
        reasoning: string;
        actionTaken: string | null;
        ruledBy: string;
        ruledAt: Date;
    }, ExtArgs["result"]["ruling"]>;
    composites: {};
};
export type RulingGetPayload<S extends boolean | null | undefined | RulingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RulingPayload, S>;
export type RulingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RulingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RulingCountAggregateInputType | true;
};
export interface RulingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Ruling'];
        meta: {
            name: 'Ruling';
        };
    };
    /**
     * Find zero or one Ruling that matches the filter.
     * @param {RulingFindUniqueArgs} args - Arguments to find a Ruling
     * @example
     * // Get one Ruling
     * const ruling = await prisma.ruling.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RulingFindUniqueArgs>(args: Prisma.SelectSubset<T, RulingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RulingClient<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Ruling that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RulingFindUniqueOrThrowArgs} args - Arguments to find a Ruling
     * @example
     * // Get one Ruling
     * const ruling = await prisma.ruling.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RulingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RulingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RulingClient<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Ruling that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulingFindFirstArgs} args - Arguments to find a Ruling
     * @example
     * // Get one Ruling
     * const ruling = await prisma.ruling.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RulingFindFirstArgs>(args?: Prisma.SelectSubset<T, RulingFindFirstArgs<ExtArgs>>): Prisma.Prisma__RulingClient<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Ruling that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulingFindFirstOrThrowArgs} args - Arguments to find a Ruling
     * @example
     * // Get one Ruling
     * const ruling = await prisma.ruling.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RulingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RulingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RulingClient<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Rulings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rulings
     * const rulings = await prisma.ruling.findMany()
     *
     * // Get first 10 Rulings
     * const rulings = await prisma.ruling.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const rulingWithIdOnly = await prisma.ruling.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RulingFindManyArgs>(args?: Prisma.SelectSubset<T, RulingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Ruling.
     * @param {RulingCreateArgs} args - Arguments to create a Ruling.
     * @example
     * // Create one Ruling
     * const Ruling = await prisma.ruling.create({
     *   data: {
     *     // ... data to create a Ruling
     *   }
     * })
     *
     */
    create<T extends RulingCreateArgs>(args: Prisma.SelectSubset<T, RulingCreateArgs<ExtArgs>>): Prisma.Prisma__RulingClient<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Rulings.
     * @param {RulingCreateManyArgs} args - Arguments to create many Rulings.
     * @example
     * // Create many Rulings
     * const ruling = await prisma.ruling.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RulingCreateManyArgs>(args?: Prisma.SelectSubset<T, RulingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Rulings and returns the data saved in the database.
     * @param {RulingCreateManyAndReturnArgs} args - Arguments to create many Rulings.
     * @example
     * // Create many Rulings
     * const ruling = await prisma.ruling.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Rulings and only return the `id`
     * const rulingWithIdOnly = await prisma.ruling.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RulingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RulingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Ruling.
     * @param {RulingDeleteArgs} args - Arguments to delete one Ruling.
     * @example
     * // Delete one Ruling
     * const Ruling = await prisma.ruling.delete({
     *   where: {
     *     // ... filter to delete one Ruling
     *   }
     * })
     *
     */
    delete<T extends RulingDeleteArgs>(args: Prisma.SelectSubset<T, RulingDeleteArgs<ExtArgs>>): Prisma.Prisma__RulingClient<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Ruling.
     * @param {RulingUpdateArgs} args - Arguments to update one Ruling.
     * @example
     * // Update one Ruling
     * const ruling = await prisma.ruling.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RulingUpdateArgs>(args: Prisma.SelectSubset<T, RulingUpdateArgs<ExtArgs>>): Prisma.Prisma__RulingClient<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Rulings.
     * @param {RulingDeleteManyArgs} args - Arguments to filter Rulings to delete.
     * @example
     * // Delete a few Rulings
     * const { count } = await prisma.ruling.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RulingDeleteManyArgs>(args?: Prisma.SelectSubset<T, RulingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Rulings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rulings
     * const ruling = await prisma.ruling.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RulingUpdateManyArgs>(args: Prisma.SelectSubset<T, RulingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Rulings and returns the data updated in the database.
     * @param {RulingUpdateManyAndReturnArgs} args - Arguments to update many Rulings.
     * @example
     * // Update many Rulings
     * const ruling = await prisma.ruling.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Rulings and only return the `id`
     * const rulingWithIdOnly = await prisma.ruling.updateManyAndReturn({
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
    updateManyAndReturn<T extends RulingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RulingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Ruling.
     * @param {RulingUpsertArgs} args - Arguments to update or create a Ruling.
     * @example
     * // Update or create a Ruling
     * const ruling = await prisma.ruling.upsert({
     *   create: {
     *     // ... data to create a Ruling
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ruling we want to update
     *   }
     * })
     */
    upsert<T extends RulingUpsertArgs>(args: Prisma.SelectSubset<T, RulingUpsertArgs<ExtArgs>>): Prisma.Prisma__RulingClient<runtime.Types.Result.GetResult<Prisma.$RulingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Rulings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulingCountArgs} args - Arguments to filter Rulings to count.
     * @example
     * // Count the number of Rulings
     * const count = await prisma.ruling.count({
     *   where: {
     *     // ... the filter for the Rulings we want to count
     *   }
     * })
    **/
    count<T extends RulingCountArgs>(args?: Prisma.Subset<T, RulingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RulingCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Ruling.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RulingAggregateArgs>(args: Prisma.Subset<T, RulingAggregateArgs>): Prisma.PrismaPromise<GetRulingAggregateType<T>>;
    /**
     * Group by Ruling.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulingGroupByArgs} args - Group by arguments.
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
    groupBy<T extends RulingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RulingGroupByArgs['orderBy'];
    } : {
        orderBy?: RulingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RulingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRulingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Ruling model
     */
    readonly fields: RulingFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Ruling.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RulingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    assertion<T extends Prisma.AssertionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AssertionDefaultArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    validation<T extends Prisma.ValidationResultDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ValidationResultDefaultArgs<ExtArgs>>): Prisma.Prisma__ValidationResultClient<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the Ruling model
 */
export interface RulingFieldRefs {
    readonly id: Prisma.FieldRef<"Ruling", 'String'>;
    readonly assertionId: Prisma.FieldRef<"Ruling", 'String'>;
    readonly validationId: Prisma.FieldRef<"Ruling", 'String'>;
    readonly verdict: Prisma.FieldRef<"Ruling", 'RulingVerdict'>;
    readonly tensionAnalysis: Prisma.FieldRef<"Ruling", 'String'>;
    readonly reasoning: Prisma.FieldRef<"Ruling", 'String'>;
    readonly actionTaken: Prisma.FieldRef<"Ruling", 'String'>;
    readonly ruledBy: Prisma.FieldRef<"Ruling", 'String'>;
    readonly ruledAt: Prisma.FieldRef<"Ruling", 'DateTime'>;
}
/**
 * Ruling findUnique
 */
export type RulingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingInclude<ExtArgs> | null;
    /**
     * Filter, which Ruling to fetch.
     */
    where: Prisma.RulingWhereUniqueInput;
};
/**
 * Ruling findUniqueOrThrow
 */
export type RulingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingInclude<ExtArgs> | null;
    /**
     * Filter, which Ruling to fetch.
     */
    where: Prisma.RulingWhereUniqueInput;
};
/**
 * Ruling findFirst
 */
export type RulingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingInclude<ExtArgs> | null;
    /**
     * Filter, which Ruling to fetch.
     */
    where?: Prisma.RulingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rulings to fetch.
     */
    orderBy?: Prisma.RulingOrderByWithRelationInput | Prisma.RulingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rulings.
     */
    cursor?: Prisma.RulingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rulings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rulings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rulings.
     */
    distinct?: Prisma.RulingScalarFieldEnum | Prisma.RulingScalarFieldEnum[];
};
/**
 * Ruling findFirstOrThrow
 */
export type RulingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingInclude<ExtArgs> | null;
    /**
     * Filter, which Ruling to fetch.
     */
    where?: Prisma.RulingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rulings to fetch.
     */
    orderBy?: Prisma.RulingOrderByWithRelationInput | Prisma.RulingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Rulings.
     */
    cursor?: Prisma.RulingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rulings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rulings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Rulings.
     */
    distinct?: Prisma.RulingScalarFieldEnum | Prisma.RulingScalarFieldEnum[];
};
/**
 * Ruling findMany
 */
export type RulingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingInclude<ExtArgs> | null;
    /**
     * Filter, which Rulings to fetch.
     */
    where?: Prisma.RulingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Rulings to fetch.
     */
    orderBy?: Prisma.RulingOrderByWithRelationInput | Prisma.RulingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Rulings.
     */
    cursor?: Prisma.RulingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Rulings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Rulings.
     */
    skip?: number;
    distinct?: Prisma.RulingScalarFieldEnum | Prisma.RulingScalarFieldEnum[];
};
/**
 * Ruling create
 */
export type RulingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingInclude<ExtArgs> | null;
    /**
     * The data needed to create a Ruling.
     */
    data: Prisma.XOR<Prisma.RulingCreateInput, Prisma.RulingUncheckedCreateInput>;
};
/**
 * Ruling createMany
 */
export type RulingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rulings.
     */
    data: Prisma.RulingCreateManyInput | Prisma.RulingCreateManyInput[];
};
/**
 * Ruling createManyAndReturn
 */
export type RulingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * The data used to create many Rulings.
     */
    data: Prisma.RulingCreateManyInput | Prisma.RulingCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Ruling update
 */
export type RulingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingInclude<ExtArgs> | null;
    /**
     * The data needed to update a Ruling.
     */
    data: Prisma.XOR<Prisma.RulingUpdateInput, Prisma.RulingUncheckedUpdateInput>;
    /**
     * Choose, which Ruling to update.
     */
    where: Prisma.RulingWhereUniqueInput;
};
/**
 * Ruling updateMany
 */
export type RulingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Rulings.
     */
    data: Prisma.XOR<Prisma.RulingUpdateManyMutationInput, Prisma.RulingUncheckedUpdateManyInput>;
    /**
     * Filter which Rulings to update
     */
    where?: Prisma.RulingWhereInput;
    /**
     * Limit how many Rulings to update.
     */
    limit?: number;
};
/**
 * Ruling updateManyAndReturn
 */
export type RulingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * The data used to update Rulings.
     */
    data: Prisma.XOR<Prisma.RulingUpdateManyMutationInput, Prisma.RulingUncheckedUpdateManyInput>;
    /**
     * Filter which Rulings to update
     */
    where?: Prisma.RulingWhereInput;
    /**
     * Limit how many Rulings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Ruling upsert
 */
export type RulingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingInclude<ExtArgs> | null;
    /**
     * The filter to search for the Ruling to update in case it exists.
     */
    where: Prisma.RulingWhereUniqueInput;
    /**
     * In case the Ruling found by the `where` argument doesn't exist, create a new Ruling with this data.
     */
    create: Prisma.XOR<Prisma.RulingCreateInput, Prisma.RulingUncheckedCreateInput>;
    /**
     * In case the Ruling was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RulingUpdateInput, Prisma.RulingUncheckedUpdateInput>;
};
/**
 * Ruling delete
 */
export type RulingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingInclude<ExtArgs> | null;
    /**
     * Filter which Ruling to delete.
     */
    where: Prisma.RulingWhereUniqueInput;
};
/**
 * Ruling deleteMany
 */
export type RulingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Rulings to delete
     */
    where?: Prisma.RulingWhereInput;
    /**
     * Limit how many Rulings to delete.
     */
    limit?: number;
};
/**
 * Ruling without action
 */
export type RulingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruling
     */
    select?: Prisma.RulingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ruling
     */
    omit?: Prisma.RulingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RulingInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Ruling.d.ts.map