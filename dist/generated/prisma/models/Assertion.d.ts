import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Assertion
 * An assertion/claim about an entity
 */
export type AssertionModel = runtime.Types.Result.DefaultSelection<Prisma.$AssertionPayload>;
export type AggregateAssertion = {
    _count: AssertionCountAggregateOutputType | null;
    _avg: AssertionAvgAggregateOutputType | null;
    _sum: AssertionSumAggregateOutputType | null;
    _min: AssertionMinAggregateOutputType | null;
    _max: AssertionMaxAggregateOutputType | null;
};
export type AssertionAvgAggregateOutputType = {
    confidence: number | null;
};
export type AssertionSumAggregateOutputType = {
    confidence: number | null;
};
export type AssertionMinAggregateOutputType = {
    id: string | null;
    claim: string | null;
    status: $Enums.AssertionStatus | null;
    category: string | null;
    confidence: number | null;
    criticality: $Enums.AssertionCriticality | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    validatedAt: Date | null;
    validatedBy: string | null;
    citedInConclusion: boolean | null;
    conclusionContext: string | null;
    rejectionReason: string | null;
    supersededBy: string | null;
    humanResponse: string | null;
    partiallyValidated: boolean | null;
    evidenceDescription: string | null;
    evidenceScreenshotPath: string | null;
    entityId: string | null;
};
export type AssertionMaxAggregateOutputType = {
    id: string | null;
    claim: string | null;
    status: $Enums.AssertionStatus | null;
    category: string | null;
    confidence: number | null;
    criticality: $Enums.AssertionCriticality | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    validatedAt: Date | null;
    validatedBy: string | null;
    citedInConclusion: boolean | null;
    conclusionContext: string | null;
    rejectionReason: string | null;
    supersededBy: string | null;
    humanResponse: string | null;
    partiallyValidated: boolean | null;
    evidenceDescription: string | null;
    evidenceScreenshotPath: string | null;
    entityId: string | null;
};
export type AssertionCountAggregateOutputType = {
    id: number;
    claim: number;
    status: number;
    category: number;
    confidence: number;
    criticality: number;
    createdAt: number;
    updatedAt: number;
    validatedAt: number;
    validatedBy: number;
    citedInConclusion: number;
    conclusionContext: number;
    rejectionReason: number;
    supersededBy: number;
    humanResponse: number;
    validationNotes: number;
    partiallyValidated: number;
    evidenceScreenshots: number;
    evidenceChain: number;
    evidenceDescription: number;
    evidenceScreenshotPath: number;
    entityId: number;
    _all: number;
};
export type AssertionAvgAggregateInputType = {
    confidence?: true;
};
export type AssertionSumAggregateInputType = {
    confidence?: true;
};
export type AssertionMinAggregateInputType = {
    id?: true;
    claim?: true;
    status?: true;
    category?: true;
    confidence?: true;
    criticality?: true;
    createdAt?: true;
    updatedAt?: true;
    validatedAt?: true;
    validatedBy?: true;
    citedInConclusion?: true;
    conclusionContext?: true;
    rejectionReason?: true;
    supersededBy?: true;
    humanResponse?: true;
    partiallyValidated?: true;
    evidenceDescription?: true;
    evidenceScreenshotPath?: true;
    entityId?: true;
};
export type AssertionMaxAggregateInputType = {
    id?: true;
    claim?: true;
    status?: true;
    category?: true;
    confidence?: true;
    criticality?: true;
    createdAt?: true;
    updatedAt?: true;
    validatedAt?: true;
    validatedBy?: true;
    citedInConclusion?: true;
    conclusionContext?: true;
    rejectionReason?: true;
    supersededBy?: true;
    humanResponse?: true;
    partiallyValidated?: true;
    evidenceDescription?: true;
    evidenceScreenshotPath?: true;
    entityId?: true;
};
export type AssertionCountAggregateInputType = {
    id?: true;
    claim?: true;
    status?: true;
    category?: true;
    confidence?: true;
    criticality?: true;
    createdAt?: true;
    updatedAt?: true;
    validatedAt?: true;
    validatedBy?: true;
    citedInConclusion?: true;
    conclusionContext?: true;
    rejectionReason?: true;
    supersededBy?: true;
    humanResponse?: true;
    validationNotes?: true;
    partiallyValidated?: true;
    evidenceScreenshots?: true;
    evidenceChain?: true;
    evidenceDescription?: true;
    evidenceScreenshotPath?: true;
    entityId?: true;
    _all?: true;
};
export type AssertionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Assertion to aggregate.
     */
    where?: Prisma.AssertionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Assertions to fetch.
     */
    orderBy?: Prisma.AssertionOrderByWithRelationInput | Prisma.AssertionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.AssertionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Assertions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Assertions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Assertions
    **/
    _count?: true | AssertionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: AssertionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: AssertionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: AssertionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: AssertionMaxAggregateInputType;
};
export type GetAssertionAggregateType<T extends AssertionAggregateArgs> = {
    [P in keyof T & keyof AggregateAssertion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAssertion[P]> : Prisma.GetScalarType<T[P], AggregateAssertion[P]>;
};
export type AssertionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssertionWhereInput;
    orderBy?: Prisma.AssertionOrderByWithAggregationInput | Prisma.AssertionOrderByWithAggregationInput[];
    by: Prisma.AssertionScalarFieldEnum[] | Prisma.AssertionScalarFieldEnum;
    having?: Prisma.AssertionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AssertionCountAggregateInputType | true;
    _avg?: AssertionAvgAggregateInputType;
    _sum?: AssertionSumAggregateInputType;
    _min?: AssertionMinAggregateInputType;
    _max?: AssertionMaxAggregateInputType;
};
export type AssertionGroupByOutputType = {
    id: string;
    claim: string;
    status: $Enums.AssertionStatus;
    category: string | null;
    confidence: number | null;
    criticality: $Enums.AssertionCriticality;
    createdAt: Date;
    updatedAt: Date;
    validatedAt: Date | null;
    validatedBy: string | null;
    citedInConclusion: boolean;
    conclusionContext: string | null;
    rejectionReason: string | null;
    supersededBy: string | null;
    humanResponse: string | null;
    validationNotes: runtime.JsonValue | null;
    partiallyValidated: boolean;
    evidenceScreenshots: string[];
    evidenceChain: runtime.JsonValue | null;
    evidenceDescription: string | null;
    evidenceScreenshotPath: string | null;
    entityId: string;
    _count: AssertionCountAggregateOutputType | null;
    _avg: AssertionAvgAggregateOutputType | null;
    _sum: AssertionSumAggregateOutputType | null;
    _min: AssertionMinAggregateOutputType | null;
    _max: AssertionMaxAggregateOutputType | null;
};
type GetAssertionGroupByPayload<T extends AssertionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AssertionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AssertionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AssertionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AssertionGroupByOutputType[P]>;
}>>;
export type AssertionWhereInput = {
    AND?: Prisma.AssertionWhereInput | Prisma.AssertionWhereInput[];
    OR?: Prisma.AssertionWhereInput[];
    NOT?: Prisma.AssertionWhereInput | Prisma.AssertionWhereInput[];
    id?: Prisma.StringFilter<"Assertion"> | string;
    claim?: Prisma.StringFilter<"Assertion"> | string;
    status?: Prisma.EnumAssertionStatusFilter<"Assertion"> | $Enums.AssertionStatus;
    category?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    confidence?: Prisma.FloatNullableFilter<"Assertion"> | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFilter<"Assertion"> | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFilter<"Assertion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Assertion"> | Date | string;
    validatedAt?: Prisma.DateTimeNullableFilter<"Assertion"> | Date | string | null;
    validatedBy?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    citedInConclusion?: Prisma.BoolFilter<"Assertion"> | boolean;
    conclusionContext?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    supersededBy?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    humanResponse?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    validationNotes?: Prisma.JsonNullableFilter<"Assertion">;
    partiallyValidated?: Prisma.BoolFilter<"Assertion"> | boolean;
    evidenceScreenshots?: Prisma.StringNullableListFilter<"Assertion">;
    evidenceChain?: Prisma.JsonNullableFilter<"Assertion">;
    evidenceDescription?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    evidenceScreenshotPath?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    entityId?: Prisma.StringFilter<"Assertion"> | string;
    entity?: Prisma.XOR<Prisma.EntityScalarRelationFilter, Prisma.EntityWhereInput>;
    reasoning?: Prisma.ReasoningListRelationFilter;
    sources?: Prisma.AssertionSourceListRelationFilter;
};
export type AssertionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    claim?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    confidence?: Prisma.SortOrderInput | Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    validatedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    citedInConclusion?: Prisma.SortOrder;
    conclusionContext?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    supersededBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    humanResponse?: Prisma.SortOrderInput | Prisma.SortOrder;
    validationNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    partiallyValidated?: Prisma.SortOrder;
    evidenceScreenshots?: Prisma.SortOrder;
    evidenceChain?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceScreenshotPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    entity?: Prisma.EntityOrderByWithRelationInput;
    reasoning?: Prisma.ReasoningOrderByRelationAggregateInput;
    sources?: Prisma.AssertionSourceOrderByRelationAggregateInput;
};
export type AssertionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AssertionWhereInput | Prisma.AssertionWhereInput[];
    OR?: Prisma.AssertionWhereInput[];
    NOT?: Prisma.AssertionWhereInput | Prisma.AssertionWhereInput[];
    claim?: Prisma.StringFilter<"Assertion"> | string;
    status?: Prisma.EnumAssertionStatusFilter<"Assertion"> | $Enums.AssertionStatus;
    category?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    confidence?: Prisma.FloatNullableFilter<"Assertion"> | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFilter<"Assertion"> | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFilter<"Assertion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Assertion"> | Date | string;
    validatedAt?: Prisma.DateTimeNullableFilter<"Assertion"> | Date | string | null;
    validatedBy?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    citedInConclusion?: Prisma.BoolFilter<"Assertion"> | boolean;
    conclusionContext?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    supersededBy?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    humanResponse?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    validationNotes?: Prisma.JsonNullableFilter<"Assertion">;
    partiallyValidated?: Prisma.BoolFilter<"Assertion"> | boolean;
    evidenceScreenshots?: Prisma.StringNullableListFilter<"Assertion">;
    evidenceChain?: Prisma.JsonNullableFilter<"Assertion">;
    evidenceDescription?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    evidenceScreenshotPath?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    entityId?: Prisma.StringFilter<"Assertion"> | string;
    entity?: Prisma.XOR<Prisma.EntityScalarRelationFilter, Prisma.EntityWhereInput>;
    reasoning?: Prisma.ReasoningListRelationFilter;
    sources?: Prisma.AssertionSourceListRelationFilter;
}, "id">;
export type AssertionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    claim?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    category?: Prisma.SortOrderInput | Prisma.SortOrder;
    confidence?: Prisma.SortOrderInput | Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    validatedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    citedInConclusion?: Prisma.SortOrder;
    conclusionContext?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    supersededBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    humanResponse?: Prisma.SortOrderInput | Prisma.SortOrder;
    validationNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    partiallyValidated?: Prisma.SortOrder;
    evidenceScreenshots?: Prisma.SortOrder;
    evidenceChain?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceScreenshotPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    _count?: Prisma.AssertionCountOrderByAggregateInput;
    _avg?: Prisma.AssertionAvgOrderByAggregateInput;
    _max?: Prisma.AssertionMaxOrderByAggregateInput;
    _min?: Prisma.AssertionMinOrderByAggregateInput;
    _sum?: Prisma.AssertionSumOrderByAggregateInput;
};
export type AssertionScalarWhereWithAggregatesInput = {
    AND?: Prisma.AssertionScalarWhereWithAggregatesInput | Prisma.AssertionScalarWhereWithAggregatesInput[];
    OR?: Prisma.AssertionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AssertionScalarWhereWithAggregatesInput | Prisma.AssertionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Assertion"> | string;
    claim?: Prisma.StringWithAggregatesFilter<"Assertion"> | string;
    status?: Prisma.EnumAssertionStatusWithAggregatesFilter<"Assertion"> | $Enums.AssertionStatus;
    category?: Prisma.StringNullableWithAggregatesFilter<"Assertion"> | string | null;
    confidence?: Prisma.FloatNullableWithAggregatesFilter<"Assertion"> | number | null;
    criticality?: Prisma.EnumAssertionCriticalityWithAggregatesFilter<"Assertion"> | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Assertion"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Assertion"> | Date | string;
    validatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Assertion"> | Date | string | null;
    validatedBy?: Prisma.StringNullableWithAggregatesFilter<"Assertion"> | string | null;
    citedInConclusion?: Prisma.BoolWithAggregatesFilter<"Assertion"> | boolean;
    conclusionContext?: Prisma.StringNullableWithAggregatesFilter<"Assertion"> | string | null;
    rejectionReason?: Prisma.StringNullableWithAggregatesFilter<"Assertion"> | string | null;
    supersededBy?: Prisma.StringNullableWithAggregatesFilter<"Assertion"> | string | null;
    humanResponse?: Prisma.StringNullableWithAggregatesFilter<"Assertion"> | string | null;
    validationNotes?: Prisma.JsonNullableWithAggregatesFilter<"Assertion">;
    partiallyValidated?: Prisma.BoolWithAggregatesFilter<"Assertion"> | boolean;
    evidenceScreenshots?: Prisma.StringNullableListFilter<"Assertion">;
    evidenceChain?: Prisma.JsonNullableWithAggregatesFilter<"Assertion">;
    evidenceDescription?: Prisma.StringNullableWithAggregatesFilter<"Assertion"> | string | null;
    evidenceScreenshotPath?: Prisma.StringNullableWithAggregatesFilter<"Assertion"> | string | null;
    entityId?: Prisma.StringWithAggregatesFilter<"Assertion"> | string;
};
export type AssertionCreateInput = {
    id?: string;
    claim: string;
    status?: $Enums.AssertionStatus;
    category?: string | null;
    confidence?: number | null;
    criticality?: $Enums.AssertionCriticality;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    validatedAt?: Date | string | null;
    validatedBy?: string | null;
    citedInConclusion?: boolean;
    conclusionContext?: string | null;
    rejectionReason?: string | null;
    supersededBy?: string | null;
    humanResponse?: string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: boolean;
    evidenceScreenshots?: Prisma.AssertionCreateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    entity: Prisma.EntityCreateNestedOneWithoutAssertionsInput;
    reasoning?: Prisma.ReasoningCreateNestedManyWithoutAssertionInput;
    sources?: Prisma.AssertionSourceCreateNestedManyWithoutAssertionInput;
};
export type AssertionUncheckedCreateInput = {
    id?: string;
    claim: string;
    status?: $Enums.AssertionStatus;
    category?: string | null;
    confidence?: number | null;
    criticality?: $Enums.AssertionCriticality;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    validatedAt?: Date | string | null;
    validatedBy?: string | null;
    citedInConclusion?: boolean;
    conclusionContext?: string | null;
    rejectionReason?: string | null;
    supersededBy?: string | null;
    humanResponse?: string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: boolean;
    evidenceScreenshots?: Prisma.AssertionCreateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    entityId: string;
    reasoning?: Prisma.ReasoningUncheckedCreateNestedManyWithoutAssertionInput;
    sources?: Prisma.AssertionSourceUncheckedCreateNestedManyWithoutAssertionInput;
};
export type AssertionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity?: Prisma.EntityUpdateOneRequiredWithoutAssertionsNestedInput;
    reasoning?: Prisma.ReasoningUpdateManyWithoutAssertionNestedInput;
    sources?: Prisma.AssertionSourceUpdateManyWithoutAssertionNestedInput;
};
export type AssertionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.ReasoningUncheckedUpdateManyWithoutAssertionNestedInput;
    sources?: Prisma.AssertionSourceUncheckedUpdateManyWithoutAssertionNestedInput;
};
export type AssertionCreateManyInput = {
    id?: string;
    claim: string;
    status?: $Enums.AssertionStatus;
    category?: string | null;
    confidence?: number | null;
    criticality?: $Enums.AssertionCriticality;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    validatedAt?: Date | string | null;
    validatedBy?: string | null;
    citedInConclusion?: boolean;
    conclusionContext?: string | null;
    rejectionReason?: string | null;
    supersededBy?: string | null;
    humanResponse?: string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: boolean;
    evidenceScreenshots?: Prisma.AssertionCreateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    entityId: string;
};
export type AssertionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type AssertionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type AssertionListRelationFilter = {
    every?: Prisma.AssertionWhereInput;
    some?: Prisma.AssertionWhereInput;
    none?: Prisma.AssertionWhereInput;
};
export type AssertionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type AssertionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    claim?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
    validatedBy?: Prisma.SortOrder;
    citedInConclusion?: Prisma.SortOrder;
    conclusionContext?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    supersededBy?: Prisma.SortOrder;
    humanResponse?: Prisma.SortOrder;
    validationNotes?: Prisma.SortOrder;
    partiallyValidated?: Prisma.SortOrder;
    evidenceScreenshots?: Prisma.SortOrder;
    evidenceChain?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    evidenceScreenshotPath?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
};
export type AssertionAvgOrderByAggregateInput = {
    confidence?: Prisma.SortOrder;
};
export type AssertionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    claim?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
    validatedBy?: Prisma.SortOrder;
    citedInConclusion?: Prisma.SortOrder;
    conclusionContext?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    supersededBy?: Prisma.SortOrder;
    humanResponse?: Prisma.SortOrder;
    partiallyValidated?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    evidenceScreenshotPath?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
};
export type AssertionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    claim?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    criticality?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
    validatedBy?: Prisma.SortOrder;
    citedInConclusion?: Prisma.SortOrder;
    conclusionContext?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    supersededBy?: Prisma.SortOrder;
    humanResponse?: Prisma.SortOrder;
    partiallyValidated?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    evidenceScreenshotPath?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
};
export type AssertionSumOrderByAggregateInput = {
    confidence?: Prisma.SortOrder;
};
export type AssertionScalarRelationFilter = {
    is?: Prisma.AssertionWhereInput;
    isNot?: Prisma.AssertionWhereInput;
};
export type AssertionCreateNestedManyWithoutEntityInput = {
    create?: Prisma.XOR<Prisma.AssertionCreateWithoutEntityInput, Prisma.AssertionUncheckedCreateWithoutEntityInput> | Prisma.AssertionCreateWithoutEntityInput[] | Prisma.AssertionUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.AssertionCreateOrConnectWithoutEntityInput | Prisma.AssertionCreateOrConnectWithoutEntityInput[];
    createMany?: Prisma.AssertionCreateManyEntityInputEnvelope;
    connect?: Prisma.AssertionWhereUniqueInput | Prisma.AssertionWhereUniqueInput[];
};
export type AssertionUncheckedCreateNestedManyWithoutEntityInput = {
    create?: Prisma.XOR<Prisma.AssertionCreateWithoutEntityInput, Prisma.AssertionUncheckedCreateWithoutEntityInput> | Prisma.AssertionCreateWithoutEntityInput[] | Prisma.AssertionUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.AssertionCreateOrConnectWithoutEntityInput | Prisma.AssertionCreateOrConnectWithoutEntityInput[];
    createMany?: Prisma.AssertionCreateManyEntityInputEnvelope;
    connect?: Prisma.AssertionWhereUniqueInput | Prisma.AssertionWhereUniqueInput[];
};
export type AssertionUpdateManyWithoutEntityNestedInput = {
    create?: Prisma.XOR<Prisma.AssertionCreateWithoutEntityInput, Prisma.AssertionUncheckedCreateWithoutEntityInput> | Prisma.AssertionCreateWithoutEntityInput[] | Prisma.AssertionUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.AssertionCreateOrConnectWithoutEntityInput | Prisma.AssertionCreateOrConnectWithoutEntityInput[];
    upsert?: Prisma.AssertionUpsertWithWhereUniqueWithoutEntityInput | Prisma.AssertionUpsertWithWhereUniqueWithoutEntityInput[];
    createMany?: Prisma.AssertionCreateManyEntityInputEnvelope;
    set?: Prisma.AssertionWhereUniqueInput | Prisma.AssertionWhereUniqueInput[];
    disconnect?: Prisma.AssertionWhereUniqueInput | Prisma.AssertionWhereUniqueInput[];
    delete?: Prisma.AssertionWhereUniqueInput | Prisma.AssertionWhereUniqueInput[];
    connect?: Prisma.AssertionWhereUniqueInput | Prisma.AssertionWhereUniqueInput[];
    update?: Prisma.AssertionUpdateWithWhereUniqueWithoutEntityInput | Prisma.AssertionUpdateWithWhereUniqueWithoutEntityInput[];
    updateMany?: Prisma.AssertionUpdateManyWithWhereWithoutEntityInput | Prisma.AssertionUpdateManyWithWhereWithoutEntityInput[];
    deleteMany?: Prisma.AssertionScalarWhereInput | Prisma.AssertionScalarWhereInput[];
};
export type AssertionUncheckedUpdateManyWithoutEntityNestedInput = {
    create?: Prisma.XOR<Prisma.AssertionCreateWithoutEntityInput, Prisma.AssertionUncheckedCreateWithoutEntityInput> | Prisma.AssertionCreateWithoutEntityInput[] | Prisma.AssertionUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.AssertionCreateOrConnectWithoutEntityInput | Prisma.AssertionCreateOrConnectWithoutEntityInput[];
    upsert?: Prisma.AssertionUpsertWithWhereUniqueWithoutEntityInput | Prisma.AssertionUpsertWithWhereUniqueWithoutEntityInput[];
    createMany?: Prisma.AssertionCreateManyEntityInputEnvelope;
    set?: Prisma.AssertionWhereUniqueInput | Prisma.AssertionWhereUniqueInput[];
    disconnect?: Prisma.AssertionWhereUniqueInput | Prisma.AssertionWhereUniqueInput[];
    delete?: Prisma.AssertionWhereUniqueInput | Prisma.AssertionWhereUniqueInput[];
    connect?: Prisma.AssertionWhereUniqueInput | Prisma.AssertionWhereUniqueInput[];
    update?: Prisma.AssertionUpdateWithWhereUniqueWithoutEntityInput | Prisma.AssertionUpdateWithWhereUniqueWithoutEntityInput[];
    updateMany?: Prisma.AssertionUpdateManyWithWhereWithoutEntityInput | Prisma.AssertionUpdateManyWithWhereWithoutEntityInput[];
    deleteMany?: Prisma.AssertionScalarWhereInput | Prisma.AssertionScalarWhereInput[];
};
export type AssertionCreateevidenceScreenshotsInput = {
    set: string[];
};
export type EnumAssertionStatusFieldUpdateOperationsInput = {
    set?: $Enums.AssertionStatus;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumAssertionCriticalityFieldUpdateOperationsInput = {
    set?: $Enums.AssertionCriticality;
};
export type AssertionUpdateevidenceScreenshotsInput = {
    set?: string[];
    push?: string | string[];
};
export type AssertionCreateNestedOneWithoutReasoningInput = {
    create?: Prisma.XOR<Prisma.AssertionCreateWithoutReasoningInput, Prisma.AssertionUncheckedCreateWithoutReasoningInput>;
    connectOrCreate?: Prisma.AssertionCreateOrConnectWithoutReasoningInput;
    connect?: Prisma.AssertionWhereUniqueInput;
};
export type AssertionUpdateOneRequiredWithoutReasoningNestedInput = {
    create?: Prisma.XOR<Prisma.AssertionCreateWithoutReasoningInput, Prisma.AssertionUncheckedCreateWithoutReasoningInput>;
    connectOrCreate?: Prisma.AssertionCreateOrConnectWithoutReasoningInput;
    upsert?: Prisma.AssertionUpsertWithoutReasoningInput;
    connect?: Prisma.AssertionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AssertionUpdateToOneWithWhereWithoutReasoningInput, Prisma.AssertionUpdateWithoutReasoningInput>, Prisma.AssertionUncheckedUpdateWithoutReasoningInput>;
};
export type AssertionCreateNestedOneWithoutSourcesInput = {
    create?: Prisma.XOR<Prisma.AssertionCreateWithoutSourcesInput, Prisma.AssertionUncheckedCreateWithoutSourcesInput>;
    connectOrCreate?: Prisma.AssertionCreateOrConnectWithoutSourcesInput;
    connect?: Prisma.AssertionWhereUniqueInput;
};
export type AssertionUpdateOneRequiredWithoutSourcesNestedInput = {
    create?: Prisma.XOR<Prisma.AssertionCreateWithoutSourcesInput, Prisma.AssertionUncheckedCreateWithoutSourcesInput>;
    connectOrCreate?: Prisma.AssertionCreateOrConnectWithoutSourcesInput;
    upsert?: Prisma.AssertionUpsertWithoutSourcesInput;
    connect?: Prisma.AssertionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AssertionUpdateToOneWithWhereWithoutSourcesInput, Prisma.AssertionUpdateWithoutSourcesInput>, Prisma.AssertionUncheckedUpdateWithoutSourcesInput>;
};
export type AssertionCreateWithoutEntityInput = {
    id?: string;
    claim: string;
    status?: $Enums.AssertionStatus;
    category?: string | null;
    confidence?: number | null;
    criticality?: $Enums.AssertionCriticality;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    validatedAt?: Date | string | null;
    validatedBy?: string | null;
    citedInConclusion?: boolean;
    conclusionContext?: string | null;
    rejectionReason?: string | null;
    supersededBy?: string | null;
    humanResponse?: string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: boolean;
    evidenceScreenshots?: Prisma.AssertionCreateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    reasoning?: Prisma.ReasoningCreateNestedManyWithoutAssertionInput;
    sources?: Prisma.AssertionSourceCreateNestedManyWithoutAssertionInput;
};
export type AssertionUncheckedCreateWithoutEntityInput = {
    id?: string;
    claim: string;
    status?: $Enums.AssertionStatus;
    category?: string | null;
    confidence?: number | null;
    criticality?: $Enums.AssertionCriticality;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    validatedAt?: Date | string | null;
    validatedBy?: string | null;
    citedInConclusion?: boolean;
    conclusionContext?: string | null;
    rejectionReason?: string | null;
    supersededBy?: string | null;
    humanResponse?: string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: boolean;
    evidenceScreenshots?: Prisma.AssertionCreateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    reasoning?: Prisma.ReasoningUncheckedCreateNestedManyWithoutAssertionInput;
    sources?: Prisma.AssertionSourceUncheckedCreateNestedManyWithoutAssertionInput;
};
export type AssertionCreateOrConnectWithoutEntityInput = {
    where: Prisma.AssertionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssertionCreateWithoutEntityInput, Prisma.AssertionUncheckedCreateWithoutEntityInput>;
};
export type AssertionCreateManyEntityInputEnvelope = {
    data: Prisma.AssertionCreateManyEntityInput | Prisma.AssertionCreateManyEntityInput[];
    skipDuplicates?: boolean;
};
export type AssertionUpsertWithWhereUniqueWithoutEntityInput = {
    where: Prisma.AssertionWhereUniqueInput;
    update: Prisma.XOR<Prisma.AssertionUpdateWithoutEntityInput, Prisma.AssertionUncheckedUpdateWithoutEntityInput>;
    create: Prisma.XOR<Prisma.AssertionCreateWithoutEntityInput, Prisma.AssertionUncheckedCreateWithoutEntityInput>;
};
export type AssertionUpdateWithWhereUniqueWithoutEntityInput = {
    where: Prisma.AssertionWhereUniqueInput;
    data: Prisma.XOR<Prisma.AssertionUpdateWithoutEntityInput, Prisma.AssertionUncheckedUpdateWithoutEntityInput>;
};
export type AssertionUpdateManyWithWhereWithoutEntityInput = {
    where: Prisma.AssertionScalarWhereInput;
    data: Prisma.XOR<Prisma.AssertionUpdateManyMutationInput, Prisma.AssertionUncheckedUpdateManyWithoutEntityInput>;
};
export type AssertionScalarWhereInput = {
    AND?: Prisma.AssertionScalarWhereInput | Prisma.AssertionScalarWhereInput[];
    OR?: Prisma.AssertionScalarWhereInput[];
    NOT?: Prisma.AssertionScalarWhereInput | Prisma.AssertionScalarWhereInput[];
    id?: Prisma.StringFilter<"Assertion"> | string;
    claim?: Prisma.StringFilter<"Assertion"> | string;
    status?: Prisma.EnumAssertionStatusFilter<"Assertion"> | $Enums.AssertionStatus;
    category?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    confidence?: Prisma.FloatNullableFilter<"Assertion"> | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFilter<"Assertion"> | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFilter<"Assertion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Assertion"> | Date | string;
    validatedAt?: Prisma.DateTimeNullableFilter<"Assertion"> | Date | string | null;
    validatedBy?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    citedInConclusion?: Prisma.BoolFilter<"Assertion"> | boolean;
    conclusionContext?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    supersededBy?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    humanResponse?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    validationNotes?: Prisma.JsonNullableFilter<"Assertion">;
    partiallyValidated?: Prisma.BoolFilter<"Assertion"> | boolean;
    evidenceScreenshots?: Prisma.StringNullableListFilter<"Assertion">;
    evidenceChain?: Prisma.JsonNullableFilter<"Assertion">;
    evidenceDescription?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    evidenceScreenshotPath?: Prisma.StringNullableFilter<"Assertion"> | string | null;
    entityId?: Prisma.StringFilter<"Assertion"> | string;
};
export type AssertionCreateWithoutReasoningInput = {
    id?: string;
    claim: string;
    status?: $Enums.AssertionStatus;
    category?: string | null;
    confidence?: number | null;
    criticality?: $Enums.AssertionCriticality;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    validatedAt?: Date | string | null;
    validatedBy?: string | null;
    citedInConclusion?: boolean;
    conclusionContext?: string | null;
    rejectionReason?: string | null;
    supersededBy?: string | null;
    humanResponse?: string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: boolean;
    evidenceScreenshots?: Prisma.AssertionCreateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    entity: Prisma.EntityCreateNestedOneWithoutAssertionsInput;
    sources?: Prisma.AssertionSourceCreateNestedManyWithoutAssertionInput;
};
export type AssertionUncheckedCreateWithoutReasoningInput = {
    id?: string;
    claim: string;
    status?: $Enums.AssertionStatus;
    category?: string | null;
    confidence?: number | null;
    criticality?: $Enums.AssertionCriticality;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    validatedAt?: Date | string | null;
    validatedBy?: string | null;
    citedInConclusion?: boolean;
    conclusionContext?: string | null;
    rejectionReason?: string | null;
    supersededBy?: string | null;
    humanResponse?: string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: boolean;
    evidenceScreenshots?: Prisma.AssertionCreateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    entityId: string;
    sources?: Prisma.AssertionSourceUncheckedCreateNestedManyWithoutAssertionInput;
};
export type AssertionCreateOrConnectWithoutReasoningInput = {
    where: Prisma.AssertionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssertionCreateWithoutReasoningInput, Prisma.AssertionUncheckedCreateWithoutReasoningInput>;
};
export type AssertionUpsertWithoutReasoningInput = {
    update: Prisma.XOR<Prisma.AssertionUpdateWithoutReasoningInput, Prisma.AssertionUncheckedUpdateWithoutReasoningInput>;
    create: Prisma.XOR<Prisma.AssertionCreateWithoutReasoningInput, Prisma.AssertionUncheckedCreateWithoutReasoningInput>;
    where?: Prisma.AssertionWhereInput;
};
export type AssertionUpdateToOneWithWhereWithoutReasoningInput = {
    where?: Prisma.AssertionWhereInput;
    data: Prisma.XOR<Prisma.AssertionUpdateWithoutReasoningInput, Prisma.AssertionUncheckedUpdateWithoutReasoningInput>;
};
export type AssertionUpdateWithoutReasoningInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity?: Prisma.EntityUpdateOneRequiredWithoutAssertionsNestedInput;
    sources?: Prisma.AssertionSourceUpdateManyWithoutAssertionNestedInput;
};
export type AssertionUncheckedUpdateWithoutReasoningInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    sources?: Prisma.AssertionSourceUncheckedUpdateManyWithoutAssertionNestedInput;
};
export type AssertionCreateWithoutSourcesInput = {
    id?: string;
    claim: string;
    status?: $Enums.AssertionStatus;
    category?: string | null;
    confidence?: number | null;
    criticality?: $Enums.AssertionCriticality;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    validatedAt?: Date | string | null;
    validatedBy?: string | null;
    citedInConclusion?: boolean;
    conclusionContext?: string | null;
    rejectionReason?: string | null;
    supersededBy?: string | null;
    humanResponse?: string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: boolean;
    evidenceScreenshots?: Prisma.AssertionCreateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    entity: Prisma.EntityCreateNestedOneWithoutAssertionsInput;
    reasoning?: Prisma.ReasoningCreateNestedManyWithoutAssertionInput;
};
export type AssertionUncheckedCreateWithoutSourcesInput = {
    id?: string;
    claim: string;
    status?: $Enums.AssertionStatus;
    category?: string | null;
    confidence?: number | null;
    criticality?: $Enums.AssertionCriticality;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    validatedAt?: Date | string | null;
    validatedBy?: string | null;
    citedInConclusion?: boolean;
    conclusionContext?: string | null;
    rejectionReason?: string | null;
    supersededBy?: string | null;
    humanResponse?: string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: boolean;
    evidenceScreenshots?: Prisma.AssertionCreateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    entityId: string;
    reasoning?: Prisma.ReasoningUncheckedCreateNestedManyWithoutAssertionInput;
};
export type AssertionCreateOrConnectWithoutSourcesInput = {
    where: Prisma.AssertionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AssertionCreateWithoutSourcesInput, Prisma.AssertionUncheckedCreateWithoutSourcesInput>;
};
export type AssertionUpsertWithoutSourcesInput = {
    update: Prisma.XOR<Prisma.AssertionUpdateWithoutSourcesInput, Prisma.AssertionUncheckedUpdateWithoutSourcesInput>;
    create: Prisma.XOR<Prisma.AssertionCreateWithoutSourcesInput, Prisma.AssertionUncheckedCreateWithoutSourcesInput>;
    where?: Prisma.AssertionWhereInput;
};
export type AssertionUpdateToOneWithWhereWithoutSourcesInput = {
    where?: Prisma.AssertionWhereInput;
    data: Prisma.XOR<Prisma.AssertionUpdateWithoutSourcesInput, Prisma.AssertionUncheckedUpdateWithoutSourcesInput>;
};
export type AssertionUpdateWithoutSourcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity?: Prisma.EntityUpdateOneRequiredWithoutAssertionsNestedInput;
    reasoning?: Prisma.ReasoningUpdateManyWithoutAssertionNestedInput;
};
export type AssertionUncheckedUpdateWithoutSourcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    reasoning?: Prisma.ReasoningUncheckedUpdateManyWithoutAssertionNestedInput;
};
export type AssertionCreateManyEntityInput = {
    id?: string;
    claim: string;
    status?: $Enums.AssertionStatus;
    category?: string | null;
    confidence?: number | null;
    criticality?: $Enums.AssertionCriticality;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    validatedAt?: Date | string | null;
    validatedBy?: string | null;
    citedInConclusion?: boolean;
    conclusionContext?: string | null;
    rejectionReason?: string | null;
    supersededBy?: string | null;
    humanResponse?: string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: boolean;
    evidenceScreenshots?: Prisma.AssertionCreateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
};
export type AssertionUpdateWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reasoning?: Prisma.ReasoningUpdateManyWithoutAssertionNestedInput;
    sources?: Prisma.AssertionSourceUpdateManyWithoutAssertionNestedInput;
};
export type AssertionUncheckedUpdateWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reasoning?: Prisma.ReasoningUncheckedUpdateManyWithoutAssertionNestedInput;
    sources?: Prisma.AssertionSourceUncheckedUpdateManyWithoutAssertionNestedInput;
};
export type AssertionUncheckedUpdateManyWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    claim?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumAssertionStatusFieldUpdateOperationsInput | $Enums.AssertionStatus;
    category?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    confidence?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    criticality?: Prisma.EnumAssertionCriticalityFieldUpdateOperationsInput | $Enums.AssertionCriticality;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    validatedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    citedInConclusion?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    conclusionContext?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    supersededBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    humanResponse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    validationNotes?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    partiallyValidated?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    evidenceScreenshots?: Prisma.AssertionUpdateevidenceScreenshotsInput | string[];
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
/**
 * Count Type AssertionCountOutputType
 */
export type AssertionCountOutputType = {
    reasoning: number;
    sources: number;
};
export type AssertionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reasoning?: boolean | AssertionCountOutputTypeCountReasoningArgs;
    sources?: boolean | AssertionCountOutputTypeCountSourcesArgs;
};
/**
 * AssertionCountOutputType without action
 */
export type AssertionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssertionCountOutputType
     */
    select?: Prisma.AssertionCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * AssertionCountOutputType without action
 */
export type AssertionCountOutputTypeCountReasoningArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReasoningWhereInput;
};
/**
 * AssertionCountOutputType without action
 */
export type AssertionCountOutputTypeCountSourcesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssertionSourceWhereInput;
};
export type AssertionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    claim?: boolean;
    status?: boolean;
    category?: boolean;
    confidence?: boolean;
    criticality?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    validatedAt?: boolean;
    validatedBy?: boolean;
    citedInConclusion?: boolean;
    conclusionContext?: boolean;
    rejectionReason?: boolean;
    supersededBy?: boolean;
    humanResponse?: boolean;
    validationNotes?: boolean;
    partiallyValidated?: boolean;
    evidenceScreenshots?: boolean;
    evidenceChain?: boolean;
    evidenceDescription?: boolean;
    evidenceScreenshotPath?: boolean;
    entityId?: boolean;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
    reasoning?: boolean | Prisma.Assertion$reasoningArgs<ExtArgs>;
    sources?: boolean | Prisma.Assertion$sourcesArgs<ExtArgs>;
    _count?: boolean | Prisma.AssertionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["assertion"]>;
export type AssertionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    claim?: boolean;
    status?: boolean;
    category?: boolean;
    confidence?: boolean;
    criticality?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    validatedAt?: boolean;
    validatedBy?: boolean;
    citedInConclusion?: boolean;
    conclusionContext?: boolean;
    rejectionReason?: boolean;
    supersededBy?: boolean;
    humanResponse?: boolean;
    validationNotes?: boolean;
    partiallyValidated?: boolean;
    evidenceScreenshots?: boolean;
    evidenceChain?: boolean;
    evidenceDescription?: boolean;
    evidenceScreenshotPath?: boolean;
    entityId?: boolean;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["assertion"]>;
export type AssertionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    claim?: boolean;
    status?: boolean;
    category?: boolean;
    confidence?: boolean;
    criticality?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    validatedAt?: boolean;
    validatedBy?: boolean;
    citedInConclusion?: boolean;
    conclusionContext?: boolean;
    rejectionReason?: boolean;
    supersededBy?: boolean;
    humanResponse?: boolean;
    validationNotes?: boolean;
    partiallyValidated?: boolean;
    evidenceScreenshots?: boolean;
    evidenceChain?: boolean;
    evidenceDescription?: boolean;
    evidenceScreenshotPath?: boolean;
    entityId?: boolean;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["assertion"]>;
export type AssertionSelectScalar = {
    id?: boolean;
    claim?: boolean;
    status?: boolean;
    category?: boolean;
    confidence?: boolean;
    criticality?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    validatedAt?: boolean;
    validatedBy?: boolean;
    citedInConclusion?: boolean;
    conclusionContext?: boolean;
    rejectionReason?: boolean;
    supersededBy?: boolean;
    humanResponse?: boolean;
    validationNotes?: boolean;
    partiallyValidated?: boolean;
    evidenceScreenshots?: boolean;
    evidenceChain?: boolean;
    evidenceDescription?: boolean;
    evidenceScreenshotPath?: boolean;
    entityId?: boolean;
};
export type AssertionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "claim" | "status" | "category" | "confidence" | "criticality" | "createdAt" | "updatedAt" | "validatedAt" | "validatedBy" | "citedInConclusion" | "conclusionContext" | "rejectionReason" | "supersededBy" | "humanResponse" | "validationNotes" | "partiallyValidated" | "evidenceScreenshots" | "evidenceChain" | "evidenceDescription" | "evidenceScreenshotPath" | "entityId", ExtArgs["result"]["assertion"]>;
export type AssertionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
    reasoning?: boolean | Prisma.Assertion$reasoningArgs<ExtArgs>;
    sources?: boolean | Prisma.Assertion$sourcesArgs<ExtArgs>;
    _count?: boolean | Prisma.AssertionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AssertionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type AssertionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type $AssertionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Assertion";
    objects: {
        entity: Prisma.$EntityPayload<ExtArgs>;
        reasoning: Prisma.$ReasoningPayload<ExtArgs>[];
        sources: Prisma.$AssertionSourcePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        claim: string;
        status: $Enums.AssertionStatus;
        category: string | null;
        confidence: number | null;
        criticality: $Enums.AssertionCriticality;
        createdAt: Date;
        updatedAt: Date;
        validatedAt: Date | null;
        validatedBy: string | null;
        citedInConclusion: boolean;
        conclusionContext: string | null;
        rejectionReason: string | null;
        supersededBy: string | null;
        humanResponse: string | null;
        validationNotes: runtime.JsonValue | null;
        partiallyValidated: boolean;
        evidenceScreenshots: string[];
        evidenceChain: runtime.JsonValue | null;
        evidenceDescription: string | null;
        evidenceScreenshotPath: string | null;
        entityId: string;
    }, ExtArgs["result"]["assertion"]>;
    composites: {};
};
export type AssertionGetPayload<S extends boolean | null | undefined | AssertionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AssertionPayload, S>;
export type AssertionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AssertionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AssertionCountAggregateInputType | true;
};
export interface AssertionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Assertion'];
        meta: {
            name: 'Assertion';
        };
    };
    /**
     * Find zero or one Assertion that matches the filter.
     * @param {AssertionFindUniqueArgs} args - Arguments to find a Assertion
     * @example
     * // Get one Assertion
     * const assertion = await prisma.assertion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssertionFindUniqueArgs>(args: Prisma.SelectSubset<T, AssertionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Assertion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssertionFindUniqueOrThrowArgs} args - Arguments to find a Assertion
     * @example
     * // Get one Assertion
     * const assertion = await prisma.assertion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssertionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AssertionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Assertion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionFindFirstArgs} args - Arguments to find a Assertion
     * @example
     * // Get one Assertion
     * const assertion = await prisma.assertion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssertionFindFirstArgs>(args?: Prisma.SelectSubset<T, AssertionFindFirstArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Assertion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionFindFirstOrThrowArgs} args - Arguments to find a Assertion
     * @example
     * // Get one Assertion
     * const assertion = await prisma.assertion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssertionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AssertionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Assertions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assertions
     * const assertions = await prisma.assertion.findMany()
     *
     * // Get first 10 Assertions
     * const assertions = await prisma.assertion.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const assertionWithIdOnly = await prisma.assertion.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AssertionFindManyArgs>(args?: Prisma.SelectSubset<T, AssertionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Assertion.
     * @param {AssertionCreateArgs} args - Arguments to create a Assertion.
     * @example
     * // Create one Assertion
     * const Assertion = await prisma.assertion.create({
     *   data: {
     *     // ... data to create a Assertion
     *   }
     * })
     *
     */
    create<T extends AssertionCreateArgs>(args: Prisma.SelectSubset<T, AssertionCreateArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Assertions.
     * @param {AssertionCreateManyArgs} args - Arguments to create many Assertions.
     * @example
     * // Create many Assertions
     * const assertion = await prisma.assertion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AssertionCreateManyArgs>(args?: Prisma.SelectSubset<T, AssertionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Assertions and returns the data saved in the database.
     * @param {AssertionCreateManyAndReturnArgs} args - Arguments to create many Assertions.
     * @example
     * // Create many Assertions
     * const assertion = await prisma.assertion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Assertions and only return the `id`
     * const assertionWithIdOnly = await prisma.assertion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AssertionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AssertionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Assertion.
     * @param {AssertionDeleteArgs} args - Arguments to delete one Assertion.
     * @example
     * // Delete one Assertion
     * const Assertion = await prisma.assertion.delete({
     *   where: {
     *     // ... filter to delete one Assertion
     *   }
     * })
     *
     */
    delete<T extends AssertionDeleteArgs>(args: Prisma.SelectSubset<T, AssertionDeleteArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Assertion.
     * @param {AssertionUpdateArgs} args - Arguments to update one Assertion.
     * @example
     * // Update one Assertion
     * const assertion = await prisma.assertion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AssertionUpdateArgs>(args: Prisma.SelectSubset<T, AssertionUpdateArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Assertions.
     * @param {AssertionDeleteManyArgs} args - Arguments to filter Assertions to delete.
     * @example
     * // Delete a few Assertions
     * const { count } = await prisma.assertion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AssertionDeleteManyArgs>(args?: Prisma.SelectSubset<T, AssertionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Assertions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assertions
     * const assertion = await prisma.assertion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AssertionUpdateManyArgs>(args: Prisma.SelectSubset<T, AssertionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Assertions and returns the data updated in the database.
     * @param {AssertionUpdateManyAndReturnArgs} args - Arguments to update many Assertions.
     * @example
     * // Update many Assertions
     * const assertion = await prisma.assertion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Assertions and only return the `id`
     * const assertionWithIdOnly = await prisma.assertion.updateManyAndReturn({
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
    updateManyAndReturn<T extends AssertionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AssertionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Assertion.
     * @param {AssertionUpsertArgs} args - Arguments to update or create a Assertion.
     * @example
     * // Update or create a Assertion
     * const assertion = await prisma.assertion.upsert({
     *   create: {
     *     // ... data to create a Assertion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assertion we want to update
     *   }
     * })
     */
    upsert<T extends AssertionUpsertArgs>(args: Prisma.SelectSubset<T, AssertionUpsertArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Assertions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionCountArgs} args - Arguments to filter Assertions to count.
     * @example
     * // Count the number of Assertions
     * const count = await prisma.assertion.count({
     *   where: {
     *     // ... the filter for the Assertions we want to count
     *   }
     * })
    **/
    count<T extends AssertionCountArgs>(args?: Prisma.Subset<T, AssertionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AssertionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Assertion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssertionAggregateArgs>(args: Prisma.Subset<T, AssertionAggregateArgs>): Prisma.PrismaPromise<GetAssertionAggregateType<T>>;
    /**
     * Group by Assertion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssertionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends AssertionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AssertionGroupByArgs['orderBy'];
    } : {
        orderBy?: AssertionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AssertionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssertionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Assertion model
     */
    readonly fields: AssertionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Assertion.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__AssertionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    entity<T extends Prisma.EntityDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EntityDefaultArgs<ExtArgs>>): Prisma.Prisma__EntityClient<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    reasoning<T extends Prisma.Assertion$reasoningArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Assertion$reasoningArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    sources<T extends Prisma.Assertion$sourcesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Assertion$sourcesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssertionSourcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Assertion model
 */
export interface AssertionFieldRefs {
    readonly id: Prisma.FieldRef<"Assertion", 'String'>;
    readonly claim: Prisma.FieldRef<"Assertion", 'String'>;
    readonly status: Prisma.FieldRef<"Assertion", 'AssertionStatus'>;
    readonly category: Prisma.FieldRef<"Assertion", 'String'>;
    readonly confidence: Prisma.FieldRef<"Assertion", 'Float'>;
    readonly criticality: Prisma.FieldRef<"Assertion", 'AssertionCriticality'>;
    readonly createdAt: Prisma.FieldRef<"Assertion", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Assertion", 'DateTime'>;
    readonly validatedAt: Prisma.FieldRef<"Assertion", 'DateTime'>;
    readonly validatedBy: Prisma.FieldRef<"Assertion", 'String'>;
    readonly citedInConclusion: Prisma.FieldRef<"Assertion", 'Boolean'>;
    readonly conclusionContext: Prisma.FieldRef<"Assertion", 'String'>;
    readonly rejectionReason: Prisma.FieldRef<"Assertion", 'String'>;
    readonly supersededBy: Prisma.FieldRef<"Assertion", 'String'>;
    readonly humanResponse: Prisma.FieldRef<"Assertion", 'String'>;
    readonly validationNotes: Prisma.FieldRef<"Assertion", 'Json'>;
    readonly partiallyValidated: Prisma.FieldRef<"Assertion", 'Boolean'>;
    readonly evidenceScreenshots: Prisma.FieldRef<"Assertion", 'String[]'>;
    readonly evidenceChain: Prisma.FieldRef<"Assertion", 'Json'>;
    readonly evidenceDescription: Prisma.FieldRef<"Assertion", 'String'>;
    readonly evidenceScreenshotPath: Prisma.FieldRef<"Assertion", 'String'>;
    readonly entityId: Prisma.FieldRef<"Assertion", 'String'>;
}
/**
 * Assertion findUnique
 */
export type AssertionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionInclude<ExtArgs> | null;
    /**
     * Filter, which Assertion to fetch.
     */
    where: Prisma.AssertionWhereUniqueInput;
};
/**
 * Assertion findUniqueOrThrow
 */
export type AssertionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionInclude<ExtArgs> | null;
    /**
     * Filter, which Assertion to fetch.
     */
    where: Prisma.AssertionWhereUniqueInput;
};
/**
 * Assertion findFirst
 */
export type AssertionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionInclude<ExtArgs> | null;
    /**
     * Filter, which Assertion to fetch.
     */
    where?: Prisma.AssertionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Assertions to fetch.
     */
    orderBy?: Prisma.AssertionOrderByWithRelationInput | Prisma.AssertionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Assertions.
     */
    cursor?: Prisma.AssertionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Assertions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Assertions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Assertions.
     */
    distinct?: Prisma.AssertionScalarFieldEnum | Prisma.AssertionScalarFieldEnum[];
};
/**
 * Assertion findFirstOrThrow
 */
export type AssertionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionInclude<ExtArgs> | null;
    /**
     * Filter, which Assertion to fetch.
     */
    where?: Prisma.AssertionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Assertions to fetch.
     */
    orderBy?: Prisma.AssertionOrderByWithRelationInput | Prisma.AssertionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Assertions.
     */
    cursor?: Prisma.AssertionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Assertions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Assertions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Assertions.
     */
    distinct?: Prisma.AssertionScalarFieldEnum | Prisma.AssertionScalarFieldEnum[];
};
/**
 * Assertion findMany
 */
export type AssertionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionInclude<ExtArgs> | null;
    /**
     * Filter, which Assertions to fetch.
     */
    where?: Prisma.AssertionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Assertions to fetch.
     */
    orderBy?: Prisma.AssertionOrderByWithRelationInput | Prisma.AssertionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Assertions.
     */
    cursor?: Prisma.AssertionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Assertions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Assertions.
     */
    skip?: number;
    distinct?: Prisma.AssertionScalarFieldEnum | Prisma.AssertionScalarFieldEnum[];
};
/**
 * Assertion create
 */
export type AssertionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Assertion.
     */
    data: Prisma.XOR<Prisma.AssertionCreateInput, Prisma.AssertionUncheckedCreateInput>;
};
/**
 * Assertion createMany
 */
export type AssertionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assertions.
     */
    data: Prisma.AssertionCreateManyInput | Prisma.AssertionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Assertion createManyAndReturn
 */
export type AssertionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * The data used to create many Assertions.
     */
    data: Prisma.AssertionCreateManyInput | Prisma.AssertionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Assertion update
 */
export type AssertionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Assertion.
     */
    data: Prisma.XOR<Prisma.AssertionUpdateInput, Prisma.AssertionUncheckedUpdateInput>;
    /**
     * Choose, which Assertion to update.
     */
    where: Prisma.AssertionWhereUniqueInput;
};
/**
 * Assertion updateMany
 */
export type AssertionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Assertions.
     */
    data: Prisma.XOR<Prisma.AssertionUpdateManyMutationInput, Prisma.AssertionUncheckedUpdateManyInput>;
    /**
     * Filter which Assertions to update
     */
    where?: Prisma.AssertionWhereInput;
    /**
     * Limit how many Assertions to update.
     */
    limit?: number;
};
/**
 * Assertion updateManyAndReturn
 */
export type AssertionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * The data used to update Assertions.
     */
    data: Prisma.XOR<Prisma.AssertionUpdateManyMutationInput, Prisma.AssertionUncheckedUpdateManyInput>;
    /**
     * Filter which Assertions to update
     */
    where?: Prisma.AssertionWhereInput;
    /**
     * Limit how many Assertions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Assertion upsert
 */
export type AssertionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Assertion to update in case it exists.
     */
    where: Prisma.AssertionWhereUniqueInput;
    /**
     * In case the Assertion found by the `where` argument doesn't exist, create a new Assertion with this data.
     */
    create: Prisma.XOR<Prisma.AssertionCreateInput, Prisma.AssertionUncheckedCreateInput>;
    /**
     * In case the Assertion was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.AssertionUpdateInput, Prisma.AssertionUncheckedUpdateInput>;
};
/**
 * Assertion delete
 */
export type AssertionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionInclude<ExtArgs> | null;
    /**
     * Filter which Assertion to delete.
     */
    where: Prisma.AssertionWhereUniqueInput;
};
/**
 * Assertion deleteMany
 */
export type AssertionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Assertions to delete
     */
    where?: Prisma.AssertionWhereInput;
    /**
     * Limit how many Assertions to delete.
     */
    limit?: number;
};
/**
 * Assertion.reasoning
 */
export type Assertion$reasoningArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reasoning
     */
    select?: Prisma.ReasoningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Reasoning
     */
    omit?: Prisma.ReasoningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReasoningInclude<ExtArgs> | null;
    where?: Prisma.ReasoningWhereInput;
    orderBy?: Prisma.ReasoningOrderByWithRelationInput | Prisma.ReasoningOrderByWithRelationInput[];
    cursor?: Prisma.ReasoningWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReasoningScalarFieldEnum | Prisma.ReasoningScalarFieldEnum[];
};
/**
 * Assertion.sources
 */
export type Assertion$sourcesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.AssertionSourceWhereInput;
    orderBy?: Prisma.AssertionSourceOrderByWithRelationInput | Prisma.AssertionSourceOrderByWithRelationInput[];
    cursor?: Prisma.AssertionSourceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssertionSourceScalarFieldEnum | Prisma.AssertionSourceScalarFieldEnum[];
};
/**
 * Assertion without action
 */
export type AssertionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assertion
     */
    select?: Prisma.AssertionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Assertion
     */
    omit?: Prisma.AssertionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AssertionInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Assertion.d.ts.map