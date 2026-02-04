import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ValidationResult
 * A structured validation result from adversarial validation
 * Supports multiple validations per assertion (history tracking)
 */
export type ValidationResultModel = runtime.Types.Result.DefaultSelection<Prisma.$ValidationResultPayload>;
export type AggregateValidationResult = {
    _count: ValidationResultCountAggregateOutputType | null;
    _avg: ValidationResultAvgAggregateOutputType | null;
    _sum: ValidationResultSumAggregateOutputType | null;
    _min: ValidationResultMinAggregateOutputType | null;
    _max: ValidationResultMaxAggregateOutputType | null;
};
export type ValidationResultAvgAggregateOutputType = {
    durationMs: number | null;
};
export type ValidationResultSumAggregateOutputType = {
    durationMs: number | null;
};
export type ValidationResultMinAggregateOutputType = {
    id: string | null;
    assertionId: string | null;
    verdict: $Enums.ValidationVerdict | null;
    confidence: $Enums.ValidationConfidence | null;
    method: $Enums.ValidationMethod | null;
    refinedClaim: string | null;
    summary: string | null;
    recommendations: string | null;
    validatorId: string | null;
    validatedAt: Date | null;
    durationMs: number | null;
};
export type ValidationResultMaxAggregateOutputType = {
    id: string | null;
    assertionId: string | null;
    verdict: $Enums.ValidationVerdict | null;
    confidence: $Enums.ValidationConfidence | null;
    method: $Enums.ValidationMethod | null;
    refinedClaim: string | null;
    summary: string | null;
    recommendations: string | null;
    validatorId: string | null;
    validatedAt: Date | null;
    durationMs: number | null;
};
export type ValidationResultCountAggregateOutputType = {
    id: number;
    assertionId: number;
    verdict: number;
    confidence: number;
    method: number;
    refinedClaim: number;
    attackResults: number;
    counterEvidence: number;
    conditions: number;
    summary: number;
    recommendations: number;
    validatorId: number;
    validatedAt: number;
    durationMs: number;
    rawOutput: number;
    _all: number;
};
export type ValidationResultAvgAggregateInputType = {
    durationMs?: true;
};
export type ValidationResultSumAggregateInputType = {
    durationMs?: true;
};
export type ValidationResultMinAggregateInputType = {
    id?: true;
    assertionId?: true;
    verdict?: true;
    confidence?: true;
    method?: true;
    refinedClaim?: true;
    summary?: true;
    recommendations?: true;
    validatorId?: true;
    validatedAt?: true;
    durationMs?: true;
};
export type ValidationResultMaxAggregateInputType = {
    id?: true;
    assertionId?: true;
    verdict?: true;
    confidence?: true;
    method?: true;
    refinedClaim?: true;
    summary?: true;
    recommendations?: true;
    validatorId?: true;
    validatedAt?: true;
    durationMs?: true;
};
export type ValidationResultCountAggregateInputType = {
    id?: true;
    assertionId?: true;
    verdict?: true;
    confidence?: true;
    method?: true;
    refinedClaim?: true;
    attackResults?: true;
    counterEvidence?: true;
    conditions?: true;
    summary?: true;
    recommendations?: true;
    validatorId?: true;
    validatedAt?: true;
    durationMs?: true;
    rawOutput?: true;
    _all?: true;
};
export type ValidationResultAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ValidationResult to aggregate.
     */
    where?: Prisma.ValidationResultWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ValidationResults to fetch.
     */
    orderBy?: Prisma.ValidationResultOrderByWithRelationInput | Prisma.ValidationResultOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ValidationResultWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ValidationResults from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ValidationResults.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ValidationResults
    **/
    _count?: true | ValidationResultCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ValidationResultAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ValidationResultSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ValidationResultMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ValidationResultMaxAggregateInputType;
};
export type GetValidationResultAggregateType<T extends ValidationResultAggregateArgs> = {
    [P in keyof T & keyof AggregateValidationResult]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateValidationResult[P]> : Prisma.GetScalarType<T[P], AggregateValidationResult[P]>;
};
export type ValidationResultGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ValidationResultWhereInput;
    orderBy?: Prisma.ValidationResultOrderByWithAggregationInput | Prisma.ValidationResultOrderByWithAggregationInput[];
    by: Prisma.ValidationResultScalarFieldEnum[] | Prisma.ValidationResultScalarFieldEnum;
    having?: Prisma.ValidationResultScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ValidationResultCountAggregateInputType | true;
    _avg?: ValidationResultAvgAggregateInputType;
    _sum?: ValidationResultSumAggregateInputType;
    _min?: ValidationResultMinAggregateInputType;
    _max?: ValidationResultMaxAggregateInputType;
};
export type ValidationResultGroupByOutputType = {
    id: string;
    assertionId: string;
    verdict: $Enums.ValidationVerdict;
    confidence: $Enums.ValidationConfidence;
    method: $Enums.ValidationMethod;
    refinedClaim: string | null;
    attackResults: runtime.JsonValue | null;
    counterEvidence: runtime.JsonValue | null;
    conditions: runtime.JsonValue | null;
    summary: string | null;
    recommendations: string | null;
    validatorId: string;
    validatedAt: Date;
    durationMs: number | null;
    rawOutput: runtime.JsonValue | null;
    _count: ValidationResultCountAggregateOutputType | null;
    _avg: ValidationResultAvgAggregateOutputType | null;
    _sum: ValidationResultSumAggregateOutputType | null;
    _min: ValidationResultMinAggregateOutputType | null;
    _max: ValidationResultMaxAggregateOutputType | null;
};
type GetValidationResultGroupByPayload<T extends ValidationResultGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ValidationResultGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ValidationResultGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ValidationResultGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ValidationResultGroupByOutputType[P]>;
}>>;
export type ValidationResultWhereInput = {
    AND?: Prisma.ValidationResultWhereInput | Prisma.ValidationResultWhereInput[];
    OR?: Prisma.ValidationResultWhereInput[];
    NOT?: Prisma.ValidationResultWhereInput | Prisma.ValidationResultWhereInput[];
    id?: Prisma.StringFilter<"ValidationResult"> | string;
    assertionId?: Prisma.StringFilter<"ValidationResult"> | string;
    verdict?: Prisma.EnumValidationVerdictFilter<"ValidationResult"> | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFilter<"ValidationResult"> | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFilter<"ValidationResult"> | $Enums.ValidationMethod;
    refinedClaim?: Prisma.StringNullableFilter<"ValidationResult"> | string | null;
    attackResults?: Prisma.JsonNullableFilter<"ValidationResult">;
    counterEvidence?: Prisma.JsonNullableFilter<"ValidationResult">;
    conditions?: Prisma.JsonNullableFilter<"ValidationResult">;
    summary?: Prisma.StringNullableFilter<"ValidationResult"> | string | null;
    recommendations?: Prisma.StringNullableFilter<"ValidationResult"> | string | null;
    validatorId?: Prisma.StringFilter<"ValidationResult"> | string;
    validatedAt?: Prisma.DateTimeFilter<"ValidationResult"> | Date | string;
    durationMs?: Prisma.IntNullableFilter<"ValidationResult"> | number | null;
    rawOutput?: Prisma.JsonNullableFilter<"ValidationResult">;
    assertion?: Prisma.XOR<Prisma.AssertionScalarRelationFilter, Prisma.AssertionWhereInput>;
    citations?: Prisma.VerifiedCitationListRelationFilter;
};
export type ValidationResultOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    refinedClaim?: Prisma.SortOrderInput | Prisma.SortOrder;
    attackResults?: Prisma.SortOrderInput | Prisma.SortOrder;
    counterEvidence?: Prisma.SortOrderInput | Prisma.SortOrder;
    conditions?: Prisma.SortOrderInput | Prisma.SortOrder;
    summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    recommendations?: Prisma.SortOrderInput | Prisma.SortOrder;
    validatorId?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrderInput | Prisma.SortOrder;
    rawOutput?: Prisma.SortOrderInput | Prisma.SortOrder;
    assertion?: Prisma.AssertionOrderByWithRelationInput;
    citations?: Prisma.VerifiedCitationOrderByRelationAggregateInput;
};
export type ValidationResultWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ValidationResultWhereInput | Prisma.ValidationResultWhereInput[];
    OR?: Prisma.ValidationResultWhereInput[];
    NOT?: Prisma.ValidationResultWhereInput | Prisma.ValidationResultWhereInput[];
    assertionId?: Prisma.StringFilter<"ValidationResult"> | string;
    verdict?: Prisma.EnumValidationVerdictFilter<"ValidationResult"> | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFilter<"ValidationResult"> | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFilter<"ValidationResult"> | $Enums.ValidationMethod;
    refinedClaim?: Prisma.StringNullableFilter<"ValidationResult"> | string | null;
    attackResults?: Prisma.JsonNullableFilter<"ValidationResult">;
    counterEvidence?: Prisma.JsonNullableFilter<"ValidationResult">;
    conditions?: Prisma.JsonNullableFilter<"ValidationResult">;
    summary?: Prisma.StringNullableFilter<"ValidationResult"> | string | null;
    recommendations?: Prisma.StringNullableFilter<"ValidationResult"> | string | null;
    validatorId?: Prisma.StringFilter<"ValidationResult"> | string;
    validatedAt?: Prisma.DateTimeFilter<"ValidationResult"> | Date | string;
    durationMs?: Prisma.IntNullableFilter<"ValidationResult"> | number | null;
    rawOutput?: Prisma.JsonNullableFilter<"ValidationResult">;
    assertion?: Prisma.XOR<Prisma.AssertionScalarRelationFilter, Prisma.AssertionWhereInput>;
    citations?: Prisma.VerifiedCitationListRelationFilter;
}, "id">;
export type ValidationResultOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    refinedClaim?: Prisma.SortOrderInput | Prisma.SortOrder;
    attackResults?: Prisma.SortOrderInput | Prisma.SortOrder;
    counterEvidence?: Prisma.SortOrderInput | Prisma.SortOrder;
    conditions?: Prisma.SortOrderInput | Prisma.SortOrder;
    summary?: Prisma.SortOrderInput | Prisma.SortOrder;
    recommendations?: Prisma.SortOrderInput | Prisma.SortOrder;
    validatorId?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrderInput | Prisma.SortOrder;
    rawOutput?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ValidationResultCountOrderByAggregateInput;
    _avg?: Prisma.ValidationResultAvgOrderByAggregateInput;
    _max?: Prisma.ValidationResultMaxOrderByAggregateInput;
    _min?: Prisma.ValidationResultMinOrderByAggregateInput;
    _sum?: Prisma.ValidationResultSumOrderByAggregateInput;
};
export type ValidationResultScalarWhereWithAggregatesInput = {
    AND?: Prisma.ValidationResultScalarWhereWithAggregatesInput | Prisma.ValidationResultScalarWhereWithAggregatesInput[];
    OR?: Prisma.ValidationResultScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ValidationResultScalarWhereWithAggregatesInput | Prisma.ValidationResultScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ValidationResult"> | string;
    assertionId?: Prisma.StringWithAggregatesFilter<"ValidationResult"> | string;
    verdict?: Prisma.EnumValidationVerdictWithAggregatesFilter<"ValidationResult"> | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceWithAggregatesFilter<"ValidationResult"> | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodWithAggregatesFilter<"ValidationResult"> | $Enums.ValidationMethod;
    refinedClaim?: Prisma.StringNullableWithAggregatesFilter<"ValidationResult"> | string | null;
    attackResults?: Prisma.JsonNullableWithAggregatesFilter<"ValidationResult">;
    counterEvidence?: Prisma.JsonNullableWithAggregatesFilter<"ValidationResult">;
    conditions?: Prisma.JsonNullableWithAggregatesFilter<"ValidationResult">;
    summary?: Prisma.StringNullableWithAggregatesFilter<"ValidationResult"> | string | null;
    recommendations?: Prisma.StringNullableWithAggregatesFilter<"ValidationResult"> | string | null;
    validatorId?: Prisma.StringWithAggregatesFilter<"ValidationResult"> | string;
    validatedAt?: Prisma.DateTimeWithAggregatesFilter<"ValidationResult"> | Date | string;
    durationMs?: Prisma.IntNullableWithAggregatesFilter<"ValidationResult"> | number | null;
    rawOutput?: Prisma.JsonNullableWithAggregatesFilter<"ValidationResult">;
};
export type ValidationResultCreateInput = {
    id?: string;
    verdict: $Enums.ValidationVerdict;
    confidence: $Enums.ValidationConfidence;
    method: $Enums.ValidationMethod;
    refinedClaim?: string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: string | null;
    recommendations?: string | null;
    validatorId: string;
    validatedAt?: Date | string;
    durationMs?: number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    assertion: Prisma.AssertionCreateNestedOneWithoutValidationsInput;
    citations?: Prisma.VerifiedCitationCreateNestedManyWithoutValidationResultInput;
};
export type ValidationResultUncheckedCreateInput = {
    id?: string;
    assertionId: string;
    verdict: $Enums.ValidationVerdict;
    confidence: $Enums.ValidationConfidence;
    method: $Enums.ValidationMethod;
    refinedClaim?: string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: string | null;
    recommendations?: string | null;
    validatorId: string;
    validatedAt?: Date | string;
    durationMs?: number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.VerifiedCitationUncheckedCreateNestedManyWithoutValidationResultInput;
};
export type ValidationResultUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumValidationVerdictFieldUpdateOperationsInput | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFieldUpdateOperationsInput | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFieldUpdateOperationsInput | $Enums.ValidationMethod;
    refinedClaim?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    validatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    assertion?: Prisma.AssertionUpdateOneRequiredWithoutValidationsNestedInput;
    citations?: Prisma.VerifiedCitationUpdateManyWithoutValidationResultNestedInput;
};
export type ValidationResultUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumValidationVerdictFieldUpdateOperationsInput | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFieldUpdateOperationsInput | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFieldUpdateOperationsInput | $Enums.ValidationMethod;
    refinedClaim?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    validatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.VerifiedCitationUncheckedUpdateManyWithoutValidationResultNestedInput;
};
export type ValidationResultCreateManyInput = {
    id?: string;
    assertionId: string;
    verdict: $Enums.ValidationVerdict;
    confidence: $Enums.ValidationConfidence;
    method: $Enums.ValidationMethod;
    refinedClaim?: string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: string | null;
    recommendations?: string | null;
    validatorId: string;
    validatedAt?: Date | string;
    durationMs?: number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ValidationResultUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumValidationVerdictFieldUpdateOperationsInput | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFieldUpdateOperationsInput | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFieldUpdateOperationsInput | $Enums.ValidationMethod;
    refinedClaim?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    validatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ValidationResultUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumValidationVerdictFieldUpdateOperationsInput | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFieldUpdateOperationsInput | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFieldUpdateOperationsInput | $Enums.ValidationMethod;
    refinedClaim?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    validatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ValidationResultListRelationFilter = {
    every?: Prisma.ValidationResultWhereInput;
    some?: Prisma.ValidationResultWhereInput;
    none?: Prisma.ValidationResultWhereInput;
};
export type ValidationResultOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ValidationResultCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    refinedClaim?: Prisma.SortOrder;
    attackResults?: Prisma.SortOrder;
    counterEvidence?: Prisma.SortOrder;
    conditions?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    recommendations?: Prisma.SortOrder;
    validatorId?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
    rawOutput?: Prisma.SortOrder;
};
export type ValidationResultAvgOrderByAggregateInput = {
    durationMs?: Prisma.SortOrder;
};
export type ValidationResultMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    refinedClaim?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    recommendations?: Prisma.SortOrder;
    validatorId?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
};
export type ValidationResultMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    verdict?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    refinedClaim?: Prisma.SortOrder;
    summary?: Prisma.SortOrder;
    recommendations?: Prisma.SortOrder;
    validatorId?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
    durationMs?: Prisma.SortOrder;
};
export type ValidationResultSumOrderByAggregateInput = {
    durationMs?: Prisma.SortOrder;
};
export type ValidationResultNullableScalarRelationFilter = {
    is?: Prisma.ValidationResultWhereInput | null;
    isNot?: Prisma.ValidationResultWhereInput | null;
};
export type ValidationResultCreateNestedManyWithoutAssertionInput = {
    create?: Prisma.XOR<Prisma.ValidationResultCreateWithoutAssertionInput, Prisma.ValidationResultUncheckedCreateWithoutAssertionInput> | Prisma.ValidationResultCreateWithoutAssertionInput[] | Prisma.ValidationResultUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.ValidationResultCreateOrConnectWithoutAssertionInput | Prisma.ValidationResultCreateOrConnectWithoutAssertionInput[];
    createMany?: Prisma.ValidationResultCreateManyAssertionInputEnvelope;
    connect?: Prisma.ValidationResultWhereUniqueInput | Prisma.ValidationResultWhereUniqueInput[];
};
export type ValidationResultUncheckedCreateNestedManyWithoutAssertionInput = {
    create?: Prisma.XOR<Prisma.ValidationResultCreateWithoutAssertionInput, Prisma.ValidationResultUncheckedCreateWithoutAssertionInput> | Prisma.ValidationResultCreateWithoutAssertionInput[] | Prisma.ValidationResultUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.ValidationResultCreateOrConnectWithoutAssertionInput | Prisma.ValidationResultCreateOrConnectWithoutAssertionInput[];
    createMany?: Prisma.ValidationResultCreateManyAssertionInputEnvelope;
    connect?: Prisma.ValidationResultWhereUniqueInput | Prisma.ValidationResultWhereUniqueInput[];
};
export type ValidationResultUpdateManyWithoutAssertionNestedInput = {
    create?: Prisma.XOR<Prisma.ValidationResultCreateWithoutAssertionInput, Prisma.ValidationResultUncheckedCreateWithoutAssertionInput> | Prisma.ValidationResultCreateWithoutAssertionInput[] | Prisma.ValidationResultUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.ValidationResultCreateOrConnectWithoutAssertionInput | Prisma.ValidationResultCreateOrConnectWithoutAssertionInput[];
    upsert?: Prisma.ValidationResultUpsertWithWhereUniqueWithoutAssertionInput | Prisma.ValidationResultUpsertWithWhereUniqueWithoutAssertionInput[];
    createMany?: Prisma.ValidationResultCreateManyAssertionInputEnvelope;
    set?: Prisma.ValidationResultWhereUniqueInput | Prisma.ValidationResultWhereUniqueInput[];
    disconnect?: Prisma.ValidationResultWhereUniqueInput | Prisma.ValidationResultWhereUniqueInput[];
    delete?: Prisma.ValidationResultWhereUniqueInput | Prisma.ValidationResultWhereUniqueInput[];
    connect?: Prisma.ValidationResultWhereUniqueInput | Prisma.ValidationResultWhereUniqueInput[];
    update?: Prisma.ValidationResultUpdateWithWhereUniqueWithoutAssertionInput | Prisma.ValidationResultUpdateWithWhereUniqueWithoutAssertionInput[];
    updateMany?: Prisma.ValidationResultUpdateManyWithWhereWithoutAssertionInput | Prisma.ValidationResultUpdateManyWithWhereWithoutAssertionInput[];
    deleteMany?: Prisma.ValidationResultScalarWhereInput | Prisma.ValidationResultScalarWhereInput[];
};
export type ValidationResultUncheckedUpdateManyWithoutAssertionNestedInput = {
    create?: Prisma.XOR<Prisma.ValidationResultCreateWithoutAssertionInput, Prisma.ValidationResultUncheckedCreateWithoutAssertionInput> | Prisma.ValidationResultCreateWithoutAssertionInput[] | Prisma.ValidationResultUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.ValidationResultCreateOrConnectWithoutAssertionInput | Prisma.ValidationResultCreateOrConnectWithoutAssertionInput[];
    upsert?: Prisma.ValidationResultUpsertWithWhereUniqueWithoutAssertionInput | Prisma.ValidationResultUpsertWithWhereUniqueWithoutAssertionInput[];
    createMany?: Prisma.ValidationResultCreateManyAssertionInputEnvelope;
    set?: Prisma.ValidationResultWhereUniqueInput | Prisma.ValidationResultWhereUniqueInput[];
    disconnect?: Prisma.ValidationResultWhereUniqueInput | Prisma.ValidationResultWhereUniqueInput[];
    delete?: Prisma.ValidationResultWhereUniqueInput | Prisma.ValidationResultWhereUniqueInput[];
    connect?: Prisma.ValidationResultWhereUniqueInput | Prisma.ValidationResultWhereUniqueInput[];
    update?: Prisma.ValidationResultUpdateWithWhereUniqueWithoutAssertionInput | Prisma.ValidationResultUpdateWithWhereUniqueWithoutAssertionInput[];
    updateMany?: Prisma.ValidationResultUpdateManyWithWhereWithoutAssertionInput | Prisma.ValidationResultUpdateManyWithWhereWithoutAssertionInput[];
    deleteMany?: Prisma.ValidationResultScalarWhereInput | Prisma.ValidationResultScalarWhereInput[];
};
export type EnumValidationVerdictFieldUpdateOperationsInput = {
    set?: $Enums.ValidationVerdict;
};
export type EnumValidationConfidenceFieldUpdateOperationsInput = {
    set?: $Enums.ValidationConfidence;
};
export type EnumValidationMethodFieldUpdateOperationsInput = {
    set?: $Enums.ValidationMethod;
};
export type ValidationResultCreateNestedOneWithoutCitationsInput = {
    create?: Prisma.XOR<Prisma.ValidationResultCreateWithoutCitationsInput, Prisma.ValidationResultUncheckedCreateWithoutCitationsInput>;
    connectOrCreate?: Prisma.ValidationResultCreateOrConnectWithoutCitationsInput;
    connect?: Prisma.ValidationResultWhereUniqueInput;
};
export type ValidationResultUpdateOneWithoutCitationsNestedInput = {
    create?: Prisma.XOR<Prisma.ValidationResultCreateWithoutCitationsInput, Prisma.ValidationResultUncheckedCreateWithoutCitationsInput>;
    connectOrCreate?: Prisma.ValidationResultCreateOrConnectWithoutCitationsInput;
    upsert?: Prisma.ValidationResultUpsertWithoutCitationsInput;
    disconnect?: Prisma.ValidationResultWhereInput | boolean;
    delete?: Prisma.ValidationResultWhereInput | boolean;
    connect?: Prisma.ValidationResultWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ValidationResultUpdateToOneWithWhereWithoutCitationsInput, Prisma.ValidationResultUpdateWithoutCitationsInput>, Prisma.ValidationResultUncheckedUpdateWithoutCitationsInput>;
};
export type ValidationResultCreateWithoutAssertionInput = {
    id?: string;
    verdict: $Enums.ValidationVerdict;
    confidence: $Enums.ValidationConfidence;
    method: $Enums.ValidationMethod;
    refinedClaim?: string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: string | null;
    recommendations?: string | null;
    validatorId: string;
    validatedAt?: Date | string;
    durationMs?: number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.VerifiedCitationCreateNestedManyWithoutValidationResultInput;
};
export type ValidationResultUncheckedCreateWithoutAssertionInput = {
    id?: string;
    verdict: $Enums.ValidationVerdict;
    confidence: $Enums.ValidationConfidence;
    method: $Enums.ValidationMethod;
    refinedClaim?: string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: string | null;
    recommendations?: string | null;
    validatorId: string;
    validatedAt?: Date | string;
    durationMs?: number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.VerifiedCitationUncheckedCreateNestedManyWithoutValidationResultInput;
};
export type ValidationResultCreateOrConnectWithoutAssertionInput = {
    where: Prisma.ValidationResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.ValidationResultCreateWithoutAssertionInput, Prisma.ValidationResultUncheckedCreateWithoutAssertionInput>;
};
export type ValidationResultCreateManyAssertionInputEnvelope = {
    data: Prisma.ValidationResultCreateManyAssertionInput | Prisma.ValidationResultCreateManyAssertionInput[];
};
export type ValidationResultUpsertWithWhereUniqueWithoutAssertionInput = {
    where: Prisma.ValidationResultWhereUniqueInput;
    update: Prisma.XOR<Prisma.ValidationResultUpdateWithoutAssertionInput, Prisma.ValidationResultUncheckedUpdateWithoutAssertionInput>;
    create: Prisma.XOR<Prisma.ValidationResultCreateWithoutAssertionInput, Prisma.ValidationResultUncheckedCreateWithoutAssertionInput>;
};
export type ValidationResultUpdateWithWhereUniqueWithoutAssertionInput = {
    where: Prisma.ValidationResultWhereUniqueInput;
    data: Prisma.XOR<Prisma.ValidationResultUpdateWithoutAssertionInput, Prisma.ValidationResultUncheckedUpdateWithoutAssertionInput>;
};
export type ValidationResultUpdateManyWithWhereWithoutAssertionInput = {
    where: Prisma.ValidationResultScalarWhereInput;
    data: Prisma.XOR<Prisma.ValidationResultUpdateManyMutationInput, Prisma.ValidationResultUncheckedUpdateManyWithoutAssertionInput>;
};
export type ValidationResultScalarWhereInput = {
    AND?: Prisma.ValidationResultScalarWhereInput | Prisma.ValidationResultScalarWhereInput[];
    OR?: Prisma.ValidationResultScalarWhereInput[];
    NOT?: Prisma.ValidationResultScalarWhereInput | Prisma.ValidationResultScalarWhereInput[];
    id?: Prisma.StringFilter<"ValidationResult"> | string;
    assertionId?: Prisma.StringFilter<"ValidationResult"> | string;
    verdict?: Prisma.EnumValidationVerdictFilter<"ValidationResult"> | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFilter<"ValidationResult"> | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFilter<"ValidationResult"> | $Enums.ValidationMethod;
    refinedClaim?: Prisma.StringNullableFilter<"ValidationResult"> | string | null;
    attackResults?: Prisma.JsonNullableFilter<"ValidationResult">;
    counterEvidence?: Prisma.JsonNullableFilter<"ValidationResult">;
    conditions?: Prisma.JsonNullableFilter<"ValidationResult">;
    summary?: Prisma.StringNullableFilter<"ValidationResult"> | string | null;
    recommendations?: Prisma.StringNullableFilter<"ValidationResult"> | string | null;
    validatorId?: Prisma.StringFilter<"ValidationResult"> | string;
    validatedAt?: Prisma.DateTimeFilter<"ValidationResult"> | Date | string;
    durationMs?: Prisma.IntNullableFilter<"ValidationResult"> | number | null;
    rawOutput?: Prisma.JsonNullableFilter<"ValidationResult">;
};
export type ValidationResultCreateWithoutCitationsInput = {
    id?: string;
    verdict: $Enums.ValidationVerdict;
    confidence: $Enums.ValidationConfidence;
    method: $Enums.ValidationMethod;
    refinedClaim?: string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: string | null;
    recommendations?: string | null;
    validatorId: string;
    validatedAt?: Date | string;
    durationMs?: number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    assertion: Prisma.AssertionCreateNestedOneWithoutValidationsInput;
};
export type ValidationResultUncheckedCreateWithoutCitationsInput = {
    id?: string;
    assertionId: string;
    verdict: $Enums.ValidationVerdict;
    confidence: $Enums.ValidationConfidence;
    method: $Enums.ValidationMethod;
    refinedClaim?: string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: string | null;
    recommendations?: string | null;
    validatorId: string;
    validatedAt?: Date | string;
    durationMs?: number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ValidationResultCreateOrConnectWithoutCitationsInput = {
    where: Prisma.ValidationResultWhereUniqueInput;
    create: Prisma.XOR<Prisma.ValidationResultCreateWithoutCitationsInput, Prisma.ValidationResultUncheckedCreateWithoutCitationsInput>;
};
export type ValidationResultUpsertWithoutCitationsInput = {
    update: Prisma.XOR<Prisma.ValidationResultUpdateWithoutCitationsInput, Prisma.ValidationResultUncheckedUpdateWithoutCitationsInput>;
    create: Prisma.XOR<Prisma.ValidationResultCreateWithoutCitationsInput, Prisma.ValidationResultUncheckedCreateWithoutCitationsInput>;
    where?: Prisma.ValidationResultWhereInput;
};
export type ValidationResultUpdateToOneWithWhereWithoutCitationsInput = {
    where?: Prisma.ValidationResultWhereInput;
    data: Prisma.XOR<Prisma.ValidationResultUpdateWithoutCitationsInput, Prisma.ValidationResultUncheckedUpdateWithoutCitationsInput>;
};
export type ValidationResultUpdateWithoutCitationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumValidationVerdictFieldUpdateOperationsInput | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFieldUpdateOperationsInput | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFieldUpdateOperationsInput | $Enums.ValidationMethod;
    refinedClaim?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    validatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    assertion?: Prisma.AssertionUpdateOneRequiredWithoutValidationsNestedInput;
};
export type ValidationResultUncheckedUpdateWithoutCitationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumValidationVerdictFieldUpdateOperationsInput | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFieldUpdateOperationsInput | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFieldUpdateOperationsInput | $Enums.ValidationMethod;
    refinedClaim?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    validatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ValidationResultCreateManyAssertionInput = {
    id?: string;
    verdict: $Enums.ValidationVerdict;
    confidence: $Enums.ValidationConfidence;
    method: $Enums.ValidationMethod;
    refinedClaim?: string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: string | null;
    recommendations?: string | null;
    validatorId: string;
    validatedAt?: Date | string;
    durationMs?: number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ValidationResultUpdateWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumValidationVerdictFieldUpdateOperationsInput | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFieldUpdateOperationsInput | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFieldUpdateOperationsInput | $Enums.ValidationMethod;
    refinedClaim?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    validatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.VerifiedCitationUpdateManyWithoutValidationResultNestedInput;
};
export type ValidationResultUncheckedUpdateWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumValidationVerdictFieldUpdateOperationsInput | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFieldUpdateOperationsInput | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFieldUpdateOperationsInput | $Enums.ValidationMethod;
    refinedClaim?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    validatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    citations?: Prisma.VerifiedCitationUncheckedUpdateManyWithoutValidationResultNestedInput;
};
export type ValidationResultUncheckedUpdateManyWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    verdict?: Prisma.EnumValidationVerdictFieldUpdateOperationsInput | $Enums.ValidationVerdict;
    confidence?: Prisma.EnumValidationConfidenceFieldUpdateOperationsInput | $Enums.ValidationConfidence;
    method?: Prisma.EnumValidationMethodFieldUpdateOperationsInput | $Enums.ValidationMethod;
    refinedClaim?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    attackResults?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    counterEvidence?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    conditions?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    summary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendations?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    validatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    durationMs?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    rawOutput?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
/**
 * Count Type ValidationResultCountOutputType
 */
export type ValidationResultCountOutputType = {
    citations: number;
};
export type ValidationResultCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    citations?: boolean | ValidationResultCountOutputTypeCountCitationsArgs;
};
/**
 * ValidationResultCountOutputType without action
 */
export type ValidationResultCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResultCountOutputType
     */
    select?: Prisma.ValidationResultCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ValidationResultCountOutputType without action
 */
export type ValidationResultCountOutputTypeCountCitationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VerifiedCitationWhereInput;
};
export type ValidationResultSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    assertionId?: boolean;
    verdict?: boolean;
    confidence?: boolean;
    method?: boolean;
    refinedClaim?: boolean;
    attackResults?: boolean;
    counterEvidence?: boolean;
    conditions?: boolean;
    summary?: boolean;
    recommendations?: boolean;
    validatorId?: boolean;
    validatedAt?: boolean;
    durationMs?: boolean;
    rawOutput?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    citations?: boolean | Prisma.ValidationResult$citationsArgs<ExtArgs>;
    _count?: boolean | Prisma.ValidationResultCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["validationResult"]>;
export type ValidationResultSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    assertionId?: boolean;
    verdict?: boolean;
    confidence?: boolean;
    method?: boolean;
    refinedClaim?: boolean;
    attackResults?: boolean;
    counterEvidence?: boolean;
    conditions?: boolean;
    summary?: boolean;
    recommendations?: boolean;
    validatorId?: boolean;
    validatedAt?: boolean;
    durationMs?: boolean;
    rawOutput?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["validationResult"]>;
export type ValidationResultSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    assertionId?: boolean;
    verdict?: boolean;
    confidence?: boolean;
    method?: boolean;
    refinedClaim?: boolean;
    attackResults?: boolean;
    counterEvidence?: boolean;
    conditions?: boolean;
    summary?: boolean;
    recommendations?: boolean;
    validatorId?: boolean;
    validatedAt?: boolean;
    durationMs?: boolean;
    rawOutput?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["validationResult"]>;
export type ValidationResultSelectScalar = {
    id?: boolean;
    assertionId?: boolean;
    verdict?: boolean;
    confidence?: boolean;
    method?: boolean;
    refinedClaim?: boolean;
    attackResults?: boolean;
    counterEvidence?: boolean;
    conditions?: boolean;
    summary?: boolean;
    recommendations?: boolean;
    validatorId?: boolean;
    validatedAt?: boolean;
    durationMs?: boolean;
    rawOutput?: boolean;
};
export type ValidationResultOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "assertionId" | "verdict" | "confidence" | "method" | "refinedClaim" | "attackResults" | "counterEvidence" | "conditions" | "summary" | "recommendations" | "validatorId" | "validatedAt" | "durationMs" | "rawOutput", ExtArgs["result"]["validationResult"]>;
export type ValidationResultInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
    citations?: boolean | Prisma.ValidationResult$citationsArgs<ExtArgs>;
    _count?: boolean | Prisma.ValidationResultCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ValidationResultIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
};
export type ValidationResultIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
};
export type $ValidationResultPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ValidationResult";
    objects: {
        assertion: Prisma.$AssertionPayload<ExtArgs>;
        citations: Prisma.$VerifiedCitationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        assertionId: string;
        verdict: $Enums.ValidationVerdict;
        confidence: $Enums.ValidationConfidence;
        method: $Enums.ValidationMethod;
        refinedClaim: string | null;
        attackResults: runtime.JsonValue | null;
        counterEvidence: runtime.JsonValue | null;
        conditions: runtime.JsonValue | null;
        summary: string | null;
        recommendations: string | null;
        validatorId: string;
        validatedAt: Date;
        durationMs: number | null;
        rawOutput: runtime.JsonValue | null;
    }, ExtArgs["result"]["validationResult"]>;
    composites: {};
};
export type ValidationResultGetPayload<S extends boolean | null | undefined | ValidationResultDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload, S>;
export type ValidationResultCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ValidationResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ValidationResultCountAggregateInputType | true;
};
export interface ValidationResultDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ValidationResult'];
        meta: {
            name: 'ValidationResult';
        };
    };
    /**
     * Find zero or one ValidationResult that matches the filter.
     * @param {ValidationResultFindUniqueArgs} args - Arguments to find a ValidationResult
     * @example
     * // Get one ValidationResult
     * const validationResult = await prisma.validationResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ValidationResultFindUniqueArgs>(args: Prisma.SelectSubset<T, ValidationResultFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ValidationResultClient<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ValidationResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ValidationResultFindUniqueOrThrowArgs} args - Arguments to find a ValidationResult
     * @example
     * // Get one ValidationResult
     * const validationResult = await prisma.validationResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ValidationResultFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ValidationResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ValidationResultClient<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ValidationResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultFindFirstArgs} args - Arguments to find a ValidationResult
     * @example
     * // Get one ValidationResult
     * const validationResult = await prisma.validationResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ValidationResultFindFirstArgs>(args?: Prisma.SelectSubset<T, ValidationResultFindFirstArgs<ExtArgs>>): Prisma.Prisma__ValidationResultClient<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ValidationResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultFindFirstOrThrowArgs} args - Arguments to find a ValidationResult
     * @example
     * // Get one ValidationResult
     * const validationResult = await prisma.validationResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ValidationResultFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ValidationResultFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ValidationResultClient<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ValidationResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ValidationResults
     * const validationResults = await prisma.validationResult.findMany()
     *
     * // Get first 10 ValidationResults
     * const validationResults = await prisma.validationResult.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const validationResultWithIdOnly = await prisma.validationResult.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ValidationResultFindManyArgs>(args?: Prisma.SelectSubset<T, ValidationResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ValidationResult.
     * @param {ValidationResultCreateArgs} args - Arguments to create a ValidationResult.
     * @example
     * // Create one ValidationResult
     * const ValidationResult = await prisma.validationResult.create({
     *   data: {
     *     // ... data to create a ValidationResult
     *   }
     * })
     *
     */
    create<T extends ValidationResultCreateArgs>(args: Prisma.SelectSubset<T, ValidationResultCreateArgs<ExtArgs>>): Prisma.Prisma__ValidationResultClient<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ValidationResults.
     * @param {ValidationResultCreateManyArgs} args - Arguments to create many ValidationResults.
     * @example
     * // Create many ValidationResults
     * const validationResult = await prisma.validationResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ValidationResultCreateManyArgs>(args?: Prisma.SelectSubset<T, ValidationResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ValidationResults and returns the data saved in the database.
     * @param {ValidationResultCreateManyAndReturnArgs} args - Arguments to create many ValidationResults.
     * @example
     * // Create many ValidationResults
     * const validationResult = await prisma.validationResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ValidationResults and only return the `id`
     * const validationResultWithIdOnly = await prisma.validationResult.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ValidationResultCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ValidationResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ValidationResult.
     * @param {ValidationResultDeleteArgs} args - Arguments to delete one ValidationResult.
     * @example
     * // Delete one ValidationResult
     * const ValidationResult = await prisma.validationResult.delete({
     *   where: {
     *     // ... filter to delete one ValidationResult
     *   }
     * })
     *
     */
    delete<T extends ValidationResultDeleteArgs>(args: Prisma.SelectSubset<T, ValidationResultDeleteArgs<ExtArgs>>): Prisma.Prisma__ValidationResultClient<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ValidationResult.
     * @param {ValidationResultUpdateArgs} args - Arguments to update one ValidationResult.
     * @example
     * // Update one ValidationResult
     * const validationResult = await prisma.validationResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ValidationResultUpdateArgs>(args: Prisma.SelectSubset<T, ValidationResultUpdateArgs<ExtArgs>>): Prisma.Prisma__ValidationResultClient<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ValidationResults.
     * @param {ValidationResultDeleteManyArgs} args - Arguments to filter ValidationResults to delete.
     * @example
     * // Delete a few ValidationResults
     * const { count } = await prisma.validationResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ValidationResultDeleteManyArgs>(args?: Prisma.SelectSubset<T, ValidationResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ValidationResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ValidationResults
     * const validationResult = await prisma.validationResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ValidationResultUpdateManyArgs>(args: Prisma.SelectSubset<T, ValidationResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ValidationResults and returns the data updated in the database.
     * @param {ValidationResultUpdateManyAndReturnArgs} args - Arguments to update many ValidationResults.
     * @example
     * // Update many ValidationResults
     * const validationResult = await prisma.validationResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ValidationResults and only return the `id`
     * const validationResultWithIdOnly = await prisma.validationResult.updateManyAndReturn({
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
    updateManyAndReturn<T extends ValidationResultUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ValidationResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ValidationResult.
     * @param {ValidationResultUpsertArgs} args - Arguments to update or create a ValidationResult.
     * @example
     * // Update or create a ValidationResult
     * const validationResult = await prisma.validationResult.upsert({
     *   create: {
     *     // ... data to create a ValidationResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ValidationResult we want to update
     *   }
     * })
     */
    upsert<T extends ValidationResultUpsertArgs>(args: Prisma.SelectSubset<T, ValidationResultUpsertArgs<ExtArgs>>): Prisma.Prisma__ValidationResultClient<runtime.Types.Result.GetResult<Prisma.$ValidationResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ValidationResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultCountArgs} args - Arguments to filter ValidationResults to count.
     * @example
     * // Count the number of ValidationResults
     * const count = await prisma.validationResult.count({
     *   where: {
     *     // ... the filter for the ValidationResults we want to count
     *   }
     * })
    **/
    count<T extends ValidationResultCountArgs>(args?: Prisma.Subset<T, ValidationResultCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ValidationResultCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ValidationResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ValidationResultAggregateArgs>(args: Prisma.Subset<T, ValidationResultAggregateArgs>): Prisma.PrismaPromise<GetValidationResultAggregateType<T>>;
    /**
     * Group by ValidationResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ValidationResultGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ValidationResultGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ValidationResultGroupByArgs['orderBy'];
    } : {
        orderBy?: ValidationResultGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ValidationResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetValidationResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ValidationResult model
     */
    readonly fields: ValidationResultFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ValidationResult.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ValidationResultClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    assertion<T extends Prisma.AssertionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AssertionDefaultArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    citations<T extends Prisma.ValidationResult$citationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ValidationResult$citationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VerifiedCitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the ValidationResult model
 */
export interface ValidationResultFieldRefs {
    readonly id: Prisma.FieldRef<"ValidationResult", 'String'>;
    readonly assertionId: Prisma.FieldRef<"ValidationResult", 'String'>;
    readonly verdict: Prisma.FieldRef<"ValidationResult", 'ValidationVerdict'>;
    readonly confidence: Prisma.FieldRef<"ValidationResult", 'ValidationConfidence'>;
    readonly method: Prisma.FieldRef<"ValidationResult", 'ValidationMethod'>;
    readonly refinedClaim: Prisma.FieldRef<"ValidationResult", 'String'>;
    readonly attackResults: Prisma.FieldRef<"ValidationResult", 'Json'>;
    readonly counterEvidence: Prisma.FieldRef<"ValidationResult", 'Json'>;
    readonly conditions: Prisma.FieldRef<"ValidationResult", 'Json'>;
    readonly summary: Prisma.FieldRef<"ValidationResult", 'String'>;
    readonly recommendations: Prisma.FieldRef<"ValidationResult", 'String'>;
    readonly validatorId: Prisma.FieldRef<"ValidationResult", 'String'>;
    readonly validatedAt: Prisma.FieldRef<"ValidationResult", 'DateTime'>;
    readonly durationMs: Prisma.FieldRef<"ValidationResult", 'Int'>;
    readonly rawOutput: Prisma.FieldRef<"ValidationResult", 'Json'>;
}
/**
 * ValidationResult findUnique
 */
export type ValidationResultFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ValidationResult to fetch.
     */
    where: Prisma.ValidationResultWhereUniqueInput;
};
/**
 * ValidationResult findUniqueOrThrow
 */
export type ValidationResultFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ValidationResult to fetch.
     */
    where: Prisma.ValidationResultWhereUniqueInput;
};
/**
 * ValidationResult findFirst
 */
export type ValidationResultFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ValidationResult to fetch.
     */
    where?: Prisma.ValidationResultWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ValidationResults to fetch.
     */
    orderBy?: Prisma.ValidationResultOrderByWithRelationInput | Prisma.ValidationResultOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ValidationResults.
     */
    cursor?: Prisma.ValidationResultWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ValidationResults from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ValidationResults.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ValidationResults.
     */
    distinct?: Prisma.ValidationResultScalarFieldEnum | Prisma.ValidationResultScalarFieldEnum[];
};
/**
 * ValidationResult findFirstOrThrow
 */
export type ValidationResultFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ValidationResult to fetch.
     */
    where?: Prisma.ValidationResultWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ValidationResults to fetch.
     */
    orderBy?: Prisma.ValidationResultOrderByWithRelationInput | Prisma.ValidationResultOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ValidationResults.
     */
    cursor?: Prisma.ValidationResultWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ValidationResults from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ValidationResults.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ValidationResults.
     */
    distinct?: Prisma.ValidationResultScalarFieldEnum | Prisma.ValidationResultScalarFieldEnum[];
};
/**
 * ValidationResult findMany
 */
export type ValidationResultFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ValidationResults to fetch.
     */
    where?: Prisma.ValidationResultWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ValidationResults to fetch.
     */
    orderBy?: Prisma.ValidationResultOrderByWithRelationInput | Prisma.ValidationResultOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ValidationResults.
     */
    cursor?: Prisma.ValidationResultWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ValidationResults from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ValidationResults.
     */
    skip?: number;
    distinct?: Prisma.ValidationResultScalarFieldEnum | Prisma.ValidationResultScalarFieldEnum[];
};
/**
 * ValidationResult create
 */
export type ValidationResultCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a ValidationResult.
     */
    data: Prisma.XOR<Prisma.ValidationResultCreateInput, Prisma.ValidationResultUncheckedCreateInput>;
};
/**
 * ValidationResult createMany
 */
export type ValidationResultCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ValidationResults.
     */
    data: Prisma.ValidationResultCreateManyInput | Prisma.ValidationResultCreateManyInput[];
};
/**
 * ValidationResult createManyAndReturn
 */
export type ValidationResultCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: Prisma.ValidationResultSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: Prisma.ValidationResultOmit<ExtArgs> | null;
    /**
     * The data used to create many ValidationResults.
     */
    data: Prisma.ValidationResultCreateManyInput | Prisma.ValidationResultCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ValidationResultIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ValidationResult update
 */
export type ValidationResultUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a ValidationResult.
     */
    data: Prisma.XOR<Prisma.ValidationResultUpdateInput, Prisma.ValidationResultUncheckedUpdateInput>;
    /**
     * Choose, which ValidationResult to update.
     */
    where: Prisma.ValidationResultWhereUniqueInput;
};
/**
 * ValidationResult updateMany
 */
export type ValidationResultUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ValidationResults.
     */
    data: Prisma.XOR<Prisma.ValidationResultUpdateManyMutationInput, Prisma.ValidationResultUncheckedUpdateManyInput>;
    /**
     * Filter which ValidationResults to update
     */
    where?: Prisma.ValidationResultWhereInput;
    /**
     * Limit how many ValidationResults to update.
     */
    limit?: number;
};
/**
 * ValidationResult updateManyAndReturn
 */
export type ValidationResultUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ValidationResult
     */
    select?: Prisma.ValidationResultSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ValidationResult
     */
    omit?: Prisma.ValidationResultOmit<ExtArgs> | null;
    /**
     * The data used to update ValidationResults.
     */
    data: Prisma.XOR<Prisma.ValidationResultUpdateManyMutationInput, Prisma.ValidationResultUncheckedUpdateManyInput>;
    /**
     * Filter which ValidationResults to update
     */
    where?: Prisma.ValidationResultWhereInput;
    /**
     * Limit how many ValidationResults to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ValidationResultIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ValidationResult upsert
 */
export type ValidationResultUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the ValidationResult to update in case it exists.
     */
    where: Prisma.ValidationResultWhereUniqueInput;
    /**
     * In case the ValidationResult found by the `where` argument doesn't exist, create a new ValidationResult with this data.
     */
    create: Prisma.XOR<Prisma.ValidationResultCreateInput, Prisma.ValidationResultUncheckedCreateInput>;
    /**
     * In case the ValidationResult was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ValidationResultUpdateInput, Prisma.ValidationResultUncheckedUpdateInput>;
};
/**
 * ValidationResult delete
 */
export type ValidationResultDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which ValidationResult to delete.
     */
    where: Prisma.ValidationResultWhereUniqueInput;
};
/**
 * ValidationResult deleteMany
 */
export type ValidationResultDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ValidationResults to delete
     */
    where?: Prisma.ValidationResultWhereInput;
    /**
     * Limit how many ValidationResults to delete.
     */
    limit?: number;
};
/**
 * ValidationResult.citations
 */
export type ValidationResult$citationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.VerifiedCitationWhereInput;
    orderBy?: Prisma.VerifiedCitationOrderByWithRelationInput | Prisma.VerifiedCitationOrderByWithRelationInput[];
    cursor?: Prisma.VerifiedCitationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VerifiedCitationScalarFieldEnum | Prisma.VerifiedCitationScalarFieldEnum[];
};
/**
 * ValidationResult without action
 */
export type ValidationResultDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=ValidationResult.d.ts.map