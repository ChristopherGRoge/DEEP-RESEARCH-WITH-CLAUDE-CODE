import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model EntityPositioning
 * Structural market positioning for an entity (one record per entity)
 */
export type EntityPositioningModel = runtime.Types.Result.DefaultSelection<Prisma.$EntityPositioningPayload>;
export type AggregateEntityPositioning = {
    _count: EntityPositioningCountAggregateOutputType | null;
    _min: EntityPositioningMinAggregateOutputType | null;
    _max: EntityPositioningMaxAggregateOutputType | null;
};
export type EntityPositioningMinAggregateOutputType = {
    id: string | null;
    entityId: string | null;
    primaryStage: string | null;
    solutionScope: string | null;
    maturityStage: string | null;
    adoptionCurve: string | null;
    businessModel: string | null;
    primaryEcosystem: string | null;
    positioningStatement: string | null;
    evidenceDescription: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    assessedAt: Date | null;
    assessedBy: string | null;
};
export type EntityPositioningMaxAggregateOutputType = {
    id: string | null;
    entityId: string | null;
    primaryStage: string | null;
    solutionScope: string | null;
    maturityStage: string | null;
    adoptionCurve: string | null;
    businessModel: string | null;
    primaryEcosystem: string | null;
    positioningStatement: string | null;
    evidenceDescription: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    assessedAt: Date | null;
    assessedBy: string | null;
};
export type EntityPositioningCountAggregateOutputType = {
    id: number;
    entityId: number;
    sdlcStages: number;
    primaryStage: number;
    solutionScope: number;
    maturityStage: number;
    adoptionCurve: number;
    businessModel: number;
    primaryEcosystem: number;
    positioningStatement: number;
    evidenceChain: number;
    evidenceDescription: number;
    createdAt: number;
    updatedAt: number;
    assessedAt: number;
    assessedBy: number;
    _all: number;
};
export type EntityPositioningMinAggregateInputType = {
    id?: true;
    entityId?: true;
    primaryStage?: true;
    solutionScope?: true;
    maturityStage?: true;
    adoptionCurve?: true;
    businessModel?: true;
    primaryEcosystem?: true;
    positioningStatement?: true;
    evidenceDescription?: true;
    createdAt?: true;
    updatedAt?: true;
    assessedAt?: true;
    assessedBy?: true;
};
export type EntityPositioningMaxAggregateInputType = {
    id?: true;
    entityId?: true;
    primaryStage?: true;
    solutionScope?: true;
    maturityStage?: true;
    adoptionCurve?: true;
    businessModel?: true;
    primaryEcosystem?: true;
    positioningStatement?: true;
    evidenceDescription?: true;
    createdAt?: true;
    updatedAt?: true;
    assessedAt?: true;
    assessedBy?: true;
};
export type EntityPositioningCountAggregateInputType = {
    id?: true;
    entityId?: true;
    sdlcStages?: true;
    primaryStage?: true;
    solutionScope?: true;
    maturityStage?: true;
    adoptionCurve?: true;
    businessModel?: true;
    primaryEcosystem?: true;
    positioningStatement?: true;
    evidenceChain?: true;
    evidenceDescription?: true;
    createdAt?: true;
    updatedAt?: true;
    assessedAt?: true;
    assessedBy?: true;
    _all?: true;
};
export type EntityPositioningAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which EntityPositioning to aggregate.
     */
    where?: Prisma.EntityPositioningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EntityPositionings to fetch.
     */
    orderBy?: Prisma.EntityPositioningOrderByWithRelationInput | Prisma.EntityPositioningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.EntityPositioningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EntityPositionings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EntityPositionings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned EntityPositionings
    **/
    _count?: true | EntityPositioningCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: EntityPositioningMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: EntityPositioningMaxAggregateInputType;
};
export type GetEntityPositioningAggregateType<T extends EntityPositioningAggregateArgs> = {
    [P in keyof T & keyof AggregateEntityPositioning]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEntityPositioning[P]> : Prisma.GetScalarType<T[P], AggregateEntityPositioning[P]>;
};
export type EntityPositioningGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntityPositioningWhereInput;
    orderBy?: Prisma.EntityPositioningOrderByWithAggregationInput | Prisma.EntityPositioningOrderByWithAggregationInput[];
    by: Prisma.EntityPositioningScalarFieldEnum[] | Prisma.EntityPositioningScalarFieldEnum;
    having?: Prisma.EntityPositioningScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EntityPositioningCountAggregateInputType | true;
    _min?: EntityPositioningMinAggregateInputType;
    _max?: EntityPositioningMaxAggregateInputType;
};
export type EntityPositioningGroupByOutputType = {
    id: string;
    entityId: string;
    sdlcStages: runtime.JsonValue | null;
    primaryStage: string | null;
    solutionScope: string | null;
    maturityStage: string | null;
    adoptionCurve: string | null;
    businessModel: string | null;
    primaryEcosystem: string | null;
    positioningStatement: string | null;
    evidenceChain: runtime.JsonValue | null;
    evidenceDescription: string | null;
    createdAt: Date;
    updatedAt: Date;
    assessedAt: Date | null;
    assessedBy: string | null;
    _count: EntityPositioningCountAggregateOutputType | null;
    _min: EntityPositioningMinAggregateOutputType | null;
    _max: EntityPositioningMaxAggregateOutputType | null;
};
type GetEntityPositioningGroupByPayload<T extends EntityPositioningGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EntityPositioningGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EntityPositioningGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EntityPositioningGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EntityPositioningGroupByOutputType[P]>;
}>>;
export type EntityPositioningWhereInput = {
    AND?: Prisma.EntityPositioningWhereInput | Prisma.EntityPositioningWhereInput[];
    OR?: Prisma.EntityPositioningWhereInput[];
    NOT?: Prisma.EntityPositioningWhereInput | Prisma.EntityPositioningWhereInput[];
    id?: Prisma.StringFilter<"EntityPositioning"> | string;
    entityId?: Prisma.StringFilter<"EntityPositioning"> | string;
    sdlcStages?: Prisma.JsonNullableFilter<"EntityPositioning">;
    primaryStage?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    solutionScope?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    maturityStage?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    adoptionCurve?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    businessModel?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    primaryEcosystem?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    positioningStatement?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    evidenceChain?: Prisma.JsonNullableFilter<"EntityPositioning">;
    evidenceDescription?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"EntityPositioning"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EntityPositioning"> | Date | string;
    assessedAt?: Prisma.DateTimeNullableFilter<"EntityPositioning"> | Date | string | null;
    assessedBy?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    entity?: Prisma.XOR<Prisma.EntityScalarRelationFilter, Prisma.EntityWhereInput>;
};
export type EntityPositioningOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    sdlcStages?: Prisma.SortOrderInput | Prisma.SortOrder;
    primaryStage?: Prisma.SortOrderInput | Prisma.SortOrder;
    solutionScope?: Prisma.SortOrderInput | Prisma.SortOrder;
    maturityStage?: Prisma.SortOrderInput | Prisma.SortOrder;
    adoptionCurve?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessModel?: Prisma.SortOrderInput | Prisma.SortOrder;
    primaryEcosystem?: Prisma.SortOrderInput | Prisma.SortOrder;
    positioningStatement?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceChain?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    assessedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    assessedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    entity?: Prisma.EntityOrderByWithRelationInput;
};
export type EntityPositioningWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    entityId?: string;
    AND?: Prisma.EntityPositioningWhereInput | Prisma.EntityPositioningWhereInput[];
    OR?: Prisma.EntityPositioningWhereInput[];
    NOT?: Prisma.EntityPositioningWhereInput | Prisma.EntityPositioningWhereInput[];
    sdlcStages?: Prisma.JsonNullableFilter<"EntityPositioning">;
    primaryStage?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    solutionScope?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    maturityStage?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    adoptionCurve?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    businessModel?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    primaryEcosystem?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    positioningStatement?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    evidenceChain?: Prisma.JsonNullableFilter<"EntityPositioning">;
    evidenceDescription?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"EntityPositioning"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EntityPositioning"> | Date | string;
    assessedAt?: Prisma.DateTimeNullableFilter<"EntityPositioning"> | Date | string | null;
    assessedBy?: Prisma.StringNullableFilter<"EntityPositioning"> | string | null;
    entity?: Prisma.XOR<Prisma.EntityScalarRelationFilter, Prisma.EntityWhereInput>;
}, "id" | "entityId">;
export type EntityPositioningOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    sdlcStages?: Prisma.SortOrderInput | Prisma.SortOrder;
    primaryStage?: Prisma.SortOrderInput | Prisma.SortOrder;
    solutionScope?: Prisma.SortOrderInput | Prisma.SortOrder;
    maturityStage?: Prisma.SortOrderInput | Prisma.SortOrder;
    adoptionCurve?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessModel?: Prisma.SortOrderInput | Prisma.SortOrder;
    primaryEcosystem?: Prisma.SortOrderInput | Prisma.SortOrder;
    positioningStatement?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceChain?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    assessedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    assessedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.EntityPositioningCountOrderByAggregateInput;
    _max?: Prisma.EntityPositioningMaxOrderByAggregateInput;
    _min?: Prisma.EntityPositioningMinOrderByAggregateInput;
};
export type EntityPositioningScalarWhereWithAggregatesInput = {
    AND?: Prisma.EntityPositioningScalarWhereWithAggregatesInput | Prisma.EntityPositioningScalarWhereWithAggregatesInput[];
    OR?: Prisma.EntityPositioningScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EntityPositioningScalarWhereWithAggregatesInput | Prisma.EntityPositioningScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EntityPositioning"> | string;
    entityId?: Prisma.StringWithAggregatesFilter<"EntityPositioning"> | string;
    sdlcStages?: Prisma.JsonNullableWithAggregatesFilter<"EntityPositioning">;
    primaryStage?: Prisma.StringNullableWithAggregatesFilter<"EntityPositioning"> | string | null;
    solutionScope?: Prisma.StringNullableWithAggregatesFilter<"EntityPositioning"> | string | null;
    maturityStage?: Prisma.StringNullableWithAggregatesFilter<"EntityPositioning"> | string | null;
    adoptionCurve?: Prisma.StringNullableWithAggregatesFilter<"EntityPositioning"> | string | null;
    businessModel?: Prisma.StringNullableWithAggregatesFilter<"EntityPositioning"> | string | null;
    primaryEcosystem?: Prisma.StringNullableWithAggregatesFilter<"EntityPositioning"> | string | null;
    positioningStatement?: Prisma.StringNullableWithAggregatesFilter<"EntityPositioning"> | string | null;
    evidenceChain?: Prisma.JsonNullableWithAggregatesFilter<"EntityPositioning">;
    evidenceDescription?: Prisma.StringNullableWithAggregatesFilter<"EntityPositioning"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EntityPositioning"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"EntityPositioning"> | Date | string;
    assessedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"EntityPositioning"> | Date | string | null;
    assessedBy?: Prisma.StringNullableWithAggregatesFilter<"EntityPositioning"> | string | null;
};
export type EntityPositioningCreateInput = {
    id?: string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: string | null;
    solutionScope?: string | null;
    maturityStage?: string | null;
    adoptionCurve?: string | null;
    businessModel?: string | null;
    primaryEcosystem?: string | null;
    positioningStatement?: string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assessedAt?: Date | string | null;
    assessedBy?: string | null;
    entity: Prisma.EntityCreateNestedOneWithoutPositioningInput;
};
export type EntityPositioningUncheckedCreateInput = {
    id?: string;
    entityId: string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: string | null;
    solutionScope?: string | null;
    maturityStage?: string | null;
    adoptionCurve?: string | null;
    businessModel?: string | null;
    primaryEcosystem?: string | null;
    positioningStatement?: string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assessedAt?: Date | string | null;
    assessedBy?: string | null;
};
export type EntityPositioningUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solutionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturityStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adoptionCurve?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryEcosystem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    positioningStatement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assessedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entity?: Prisma.EntityUpdateOneRequiredWithoutPositioningNestedInput;
};
export type EntityPositioningUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solutionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturityStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adoptionCurve?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryEcosystem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    positioningStatement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assessedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type EntityPositioningCreateManyInput = {
    id?: string;
    entityId: string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: string | null;
    solutionScope?: string | null;
    maturityStage?: string | null;
    adoptionCurve?: string | null;
    businessModel?: string | null;
    primaryEcosystem?: string | null;
    positioningStatement?: string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assessedAt?: Date | string | null;
    assessedBy?: string | null;
};
export type EntityPositioningUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solutionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturityStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adoptionCurve?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryEcosystem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    positioningStatement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assessedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type EntityPositioningUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solutionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturityStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adoptionCurve?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryEcosystem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    positioningStatement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assessedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type EntityPositioningNullableScalarRelationFilter = {
    is?: Prisma.EntityPositioningWhereInput | null;
    isNot?: Prisma.EntityPositioningWhereInput | null;
};
export type EntityPositioningCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    sdlcStages?: Prisma.SortOrder;
    primaryStage?: Prisma.SortOrder;
    solutionScope?: Prisma.SortOrder;
    maturityStage?: Prisma.SortOrder;
    adoptionCurve?: Prisma.SortOrder;
    businessModel?: Prisma.SortOrder;
    primaryEcosystem?: Prisma.SortOrder;
    positioningStatement?: Prisma.SortOrder;
    evidenceChain?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    assessedAt?: Prisma.SortOrder;
    assessedBy?: Prisma.SortOrder;
};
export type EntityPositioningMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    primaryStage?: Prisma.SortOrder;
    solutionScope?: Prisma.SortOrder;
    maturityStage?: Prisma.SortOrder;
    adoptionCurve?: Prisma.SortOrder;
    businessModel?: Prisma.SortOrder;
    primaryEcosystem?: Prisma.SortOrder;
    positioningStatement?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    assessedAt?: Prisma.SortOrder;
    assessedBy?: Prisma.SortOrder;
};
export type EntityPositioningMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    primaryStage?: Prisma.SortOrder;
    solutionScope?: Prisma.SortOrder;
    maturityStage?: Prisma.SortOrder;
    adoptionCurve?: Prisma.SortOrder;
    businessModel?: Prisma.SortOrder;
    primaryEcosystem?: Prisma.SortOrder;
    positioningStatement?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    assessedAt?: Prisma.SortOrder;
    assessedBy?: Prisma.SortOrder;
};
export type EntityPositioningCreateNestedOneWithoutEntityInput = {
    create?: Prisma.XOR<Prisma.EntityPositioningCreateWithoutEntityInput, Prisma.EntityPositioningUncheckedCreateWithoutEntityInput>;
    connectOrCreate?: Prisma.EntityPositioningCreateOrConnectWithoutEntityInput;
    connect?: Prisma.EntityPositioningWhereUniqueInput;
};
export type EntityPositioningUncheckedCreateNestedOneWithoutEntityInput = {
    create?: Prisma.XOR<Prisma.EntityPositioningCreateWithoutEntityInput, Prisma.EntityPositioningUncheckedCreateWithoutEntityInput>;
    connectOrCreate?: Prisma.EntityPositioningCreateOrConnectWithoutEntityInput;
    connect?: Prisma.EntityPositioningWhereUniqueInput;
};
export type EntityPositioningUpdateOneWithoutEntityNestedInput = {
    create?: Prisma.XOR<Prisma.EntityPositioningCreateWithoutEntityInput, Prisma.EntityPositioningUncheckedCreateWithoutEntityInput>;
    connectOrCreate?: Prisma.EntityPositioningCreateOrConnectWithoutEntityInput;
    upsert?: Prisma.EntityPositioningUpsertWithoutEntityInput;
    disconnect?: Prisma.EntityPositioningWhereInput | boolean;
    delete?: Prisma.EntityPositioningWhereInput | boolean;
    connect?: Prisma.EntityPositioningWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EntityPositioningUpdateToOneWithWhereWithoutEntityInput, Prisma.EntityPositioningUpdateWithoutEntityInput>, Prisma.EntityPositioningUncheckedUpdateWithoutEntityInput>;
};
export type EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput = {
    create?: Prisma.XOR<Prisma.EntityPositioningCreateWithoutEntityInput, Prisma.EntityPositioningUncheckedCreateWithoutEntityInput>;
    connectOrCreate?: Prisma.EntityPositioningCreateOrConnectWithoutEntityInput;
    upsert?: Prisma.EntityPositioningUpsertWithoutEntityInput;
    disconnect?: Prisma.EntityPositioningWhereInput | boolean;
    delete?: Prisma.EntityPositioningWhereInput | boolean;
    connect?: Prisma.EntityPositioningWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EntityPositioningUpdateToOneWithWhereWithoutEntityInput, Prisma.EntityPositioningUpdateWithoutEntityInput>, Prisma.EntityPositioningUncheckedUpdateWithoutEntityInput>;
};
export type EntityPositioningCreateWithoutEntityInput = {
    id?: string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: string | null;
    solutionScope?: string | null;
    maturityStage?: string | null;
    adoptionCurve?: string | null;
    businessModel?: string | null;
    primaryEcosystem?: string | null;
    positioningStatement?: string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assessedAt?: Date | string | null;
    assessedBy?: string | null;
};
export type EntityPositioningUncheckedCreateWithoutEntityInput = {
    id?: string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: string | null;
    solutionScope?: string | null;
    maturityStage?: string | null;
    adoptionCurve?: string | null;
    businessModel?: string | null;
    primaryEcosystem?: string | null;
    positioningStatement?: string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assessedAt?: Date | string | null;
    assessedBy?: string | null;
};
export type EntityPositioningCreateOrConnectWithoutEntityInput = {
    where: Prisma.EntityPositioningWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityPositioningCreateWithoutEntityInput, Prisma.EntityPositioningUncheckedCreateWithoutEntityInput>;
};
export type EntityPositioningUpsertWithoutEntityInput = {
    update: Prisma.XOR<Prisma.EntityPositioningUpdateWithoutEntityInput, Prisma.EntityPositioningUncheckedUpdateWithoutEntityInput>;
    create: Prisma.XOR<Prisma.EntityPositioningCreateWithoutEntityInput, Prisma.EntityPositioningUncheckedCreateWithoutEntityInput>;
    where?: Prisma.EntityPositioningWhereInput;
};
export type EntityPositioningUpdateToOneWithWhereWithoutEntityInput = {
    where?: Prisma.EntityPositioningWhereInput;
    data: Prisma.XOR<Prisma.EntityPositioningUpdateWithoutEntityInput, Prisma.EntityPositioningUncheckedUpdateWithoutEntityInput>;
};
export type EntityPositioningUpdateWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solutionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturityStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adoptionCurve?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryEcosystem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    positioningStatement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assessedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type EntityPositioningUncheckedUpdateWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sdlcStages?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    primaryStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    solutionScope?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    maturityStage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adoptionCurve?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessModel?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    primaryEcosystem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    positioningStatement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceChain?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assessedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    assessedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type EntityPositioningSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entityId?: boolean;
    sdlcStages?: boolean;
    primaryStage?: boolean;
    solutionScope?: boolean;
    maturityStage?: boolean;
    adoptionCurve?: boolean;
    businessModel?: boolean;
    primaryEcosystem?: boolean;
    positioningStatement?: boolean;
    evidenceChain?: boolean;
    evidenceDescription?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    assessedAt?: boolean;
    assessedBy?: boolean;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entityPositioning"]>;
export type EntityPositioningSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entityId?: boolean;
    sdlcStages?: boolean;
    primaryStage?: boolean;
    solutionScope?: boolean;
    maturityStage?: boolean;
    adoptionCurve?: boolean;
    businessModel?: boolean;
    primaryEcosystem?: boolean;
    positioningStatement?: boolean;
    evidenceChain?: boolean;
    evidenceDescription?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    assessedAt?: boolean;
    assessedBy?: boolean;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entityPositioning"]>;
export type EntityPositioningSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entityId?: boolean;
    sdlcStages?: boolean;
    primaryStage?: boolean;
    solutionScope?: boolean;
    maturityStage?: boolean;
    adoptionCurve?: boolean;
    businessModel?: boolean;
    primaryEcosystem?: boolean;
    positioningStatement?: boolean;
    evidenceChain?: boolean;
    evidenceDescription?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    assessedAt?: boolean;
    assessedBy?: boolean;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entityPositioning"]>;
export type EntityPositioningSelectScalar = {
    id?: boolean;
    entityId?: boolean;
    sdlcStages?: boolean;
    primaryStage?: boolean;
    solutionScope?: boolean;
    maturityStage?: boolean;
    adoptionCurve?: boolean;
    businessModel?: boolean;
    primaryEcosystem?: boolean;
    positioningStatement?: boolean;
    evidenceChain?: boolean;
    evidenceDescription?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    assessedAt?: boolean;
    assessedBy?: boolean;
};
export type EntityPositioningOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "entityId" | "sdlcStages" | "primaryStage" | "solutionScope" | "maturityStage" | "adoptionCurve" | "businessModel" | "primaryEcosystem" | "positioningStatement" | "evidenceChain" | "evidenceDescription" | "createdAt" | "updatedAt" | "assessedAt" | "assessedBy", ExtArgs["result"]["entityPositioning"]>;
export type EntityPositioningInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type EntityPositioningIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type EntityPositioningIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type $EntityPositioningPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EntityPositioning";
    objects: {
        entity: Prisma.$EntityPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        entityId: string;
        sdlcStages: runtime.JsonValue | null;
        primaryStage: string | null;
        solutionScope: string | null;
        maturityStage: string | null;
        adoptionCurve: string | null;
        businessModel: string | null;
        primaryEcosystem: string | null;
        positioningStatement: string | null;
        evidenceChain: runtime.JsonValue | null;
        evidenceDescription: string | null;
        createdAt: Date;
        updatedAt: Date;
        assessedAt: Date | null;
        assessedBy: string | null;
    }, ExtArgs["result"]["entityPositioning"]>;
    composites: {};
};
export type EntityPositioningGetPayload<S extends boolean | null | undefined | EntityPositioningDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload, S>;
export type EntityPositioningCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EntityPositioningFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EntityPositioningCountAggregateInputType | true;
};
export interface EntityPositioningDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EntityPositioning'];
        meta: {
            name: 'EntityPositioning';
        };
    };
    /**
     * Find zero or one EntityPositioning that matches the filter.
     * @param {EntityPositioningFindUniqueArgs} args - Arguments to find a EntityPositioning
     * @example
     * // Get one EntityPositioning
     * const entityPositioning = await prisma.entityPositioning.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntityPositioningFindUniqueArgs>(args: Prisma.SelectSubset<T, EntityPositioningFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EntityPositioningClient<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one EntityPositioning that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntityPositioningFindUniqueOrThrowArgs} args - Arguments to find a EntityPositioning
     * @example
     * // Get one EntityPositioning
     * const entityPositioning = await prisma.entityPositioning.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntityPositioningFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EntityPositioningFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntityPositioningClient<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first EntityPositioning that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityPositioningFindFirstArgs} args - Arguments to find a EntityPositioning
     * @example
     * // Get one EntityPositioning
     * const entityPositioning = await prisma.entityPositioning.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntityPositioningFindFirstArgs>(args?: Prisma.SelectSubset<T, EntityPositioningFindFirstArgs<ExtArgs>>): Prisma.Prisma__EntityPositioningClient<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first EntityPositioning that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityPositioningFindFirstOrThrowArgs} args - Arguments to find a EntityPositioning
     * @example
     * // Get one EntityPositioning
     * const entityPositioning = await prisma.entityPositioning.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntityPositioningFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EntityPositioningFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntityPositioningClient<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more EntityPositionings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityPositioningFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EntityPositionings
     * const entityPositionings = await prisma.entityPositioning.findMany()
     *
     * // Get first 10 EntityPositionings
     * const entityPositionings = await prisma.entityPositioning.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const entityPositioningWithIdOnly = await prisma.entityPositioning.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EntityPositioningFindManyArgs>(args?: Prisma.SelectSubset<T, EntityPositioningFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a EntityPositioning.
     * @param {EntityPositioningCreateArgs} args - Arguments to create a EntityPositioning.
     * @example
     * // Create one EntityPositioning
     * const EntityPositioning = await prisma.entityPositioning.create({
     *   data: {
     *     // ... data to create a EntityPositioning
     *   }
     * })
     *
     */
    create<T extends EntityPositioningCreateArgs>(args: Prisma.SelectSubset<T, EntityPositioningCreateArgs<ExtArgs>>): Prisma.Prisma__EntityPositioningClient<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many EntityPositionings.
     * @param {EntityPositioningCreateManyArgs} args - Arguments to create many EntityPositionings.
     * @example
     * // Create many EntityPositionings
     * const entityPositioning = await prisma.entityPositioning.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EntityPositioningCreateManyArgs>(args?: Prisma.SelectSubset<T, EntityPositioningCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many EntityPositionings and returns the data saved in the database.
     * @param {EntityPositioningCreateManyAndReturnArgs} args - Arguments to create many EntityPositionings.
     * @example
     * // Create many EntityPositionings
     * const entityPositioning = await prisma.entityPositioning.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many EntityPositionings and only return the `id`
     * const entityPositioningWithIdOnly = await prisma.entityPositioning.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EntityPositioningCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EntityPositioningCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a EntityPositioning.
     * @param {EntityPositioningDeleteArgs} args - Arguments to delete one EntityPositioning.
     * @example
     * // Delete one EntityPositioning
     * const EntityPositioning = await prisma.entityPositioning.delete({
     *   where: {
     *     // ... filter to delete one EntityPositioning
     *   }
     * })
     *
     */
    delete<T extends EntityPositioningDeleteArgs>(args: Prisma.SelectSubset<T, EntityPositioningDeleteArgs<ExtArgs>>): Prisma.Prisma__EntityPositioningClient<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one EntityPositioning.
     * @param {EntityPositioningUpdateArgs} args - Arguments to update one EntityPositioning.
     * @example
     * // Update one EntityPositioning
     * const entityPositioning = await prisma.entityPositioning.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EntityPositioningUpdateArgs>(args: Prisma.SelectSubset<T, EntityPositioningUpdateArgs<ExtArgs>>): Prisma.Prisma__EntityPositioningClient<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more EntityPositionings.
     * @param {EntityPositioningDeleteManyArgs} args - Arguments to filter EntityPositionings to delete.
     * @example
     * // Delete a few EntityPositionings
     * const { count } = await prisma.entityPositioning.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EntityPositioningDeleteManyArgs>(args?: Prisma.SelectSubset<T, EntityPositioningDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more EntityPositionings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityPositioningUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EntityPositionings
     * const entityPositioning = await prisma.entityPositioning.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EntityPositioningUpdateManyArgs>(args: Prisma.SelectSubset<T, EntityPositioningUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more EntityPositionings and returns the data updated in the database.
     * @param {EntityPositioningUpdateManyAndReturnArgs} args - Arguments to update many EntityPositionings.
     * @example
     * // Update many EntityPositionings
     * const entityPositioning = await prisma.entityPositioning.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more EntityPositionings and only return the `id`
     * const entityPositioningWithIdOnly = await prisma.entityPositioning.updateManyAndReturn({
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
    updateManyAndReturn<T extends EntityPositioningUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EntityPositioningUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one EntityPositioning.
     * @param {EntityPositioningUpsertArgs} args - Arguments to update or create a EntityPositioning.
     * @example
     * // Update or create a EntityPositioning
     * const entityPositioning = await prisma.entityPositioning.upsert({
     *   create: {
     *     // ... data to create a EntityPositioning
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EntityPositioning we want to update
     *   }
     * })
     */
    upsert<T extends EntityPositioningUpsertArgs>(args: Prisma.SelectSubset<T, EntityPositioningUpsertArgs<ExtArgs>>): Prisma.Prisma__EntityPositioningClient<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of EntityPositionings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityPositioningCountArgs} args - Arguments to filter EntityPositionings to count.
     * @example
     * // Count the number of EntityPositionings
     * const count = await prisma.entityPositioning.count({
     *   where: {
     *     // ... the filter for the EntityPositionings we want to count
     *   }
     * })
    **/
    count<T extends EntityPositioningCountArgs>(args?: Prisma.Subset<T, EntityPositioningCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EntityPositioningCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a EntityPositioning.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityPositioningAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EntityPositioningAggregateArgs>(args: Prisma.Subset<T, EntityPositioningAggregateArgs>): Prisma.PrismaPromise<GetEntityPositioningAggregateType<T>>;
    /**
     * Group by EntityPositioning.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityPositioningGroupByArgs} args - Group by arguments.
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
    groupBy<T extends EntityPositioningGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EntityPositioningGroupByArgs['orderBy'];
    } : {
        orderBy?: EntityPositioningGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EntityPositioningGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntityPositioningGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the EntityPositioning model
     */
    readonly fields: EntityPositioningFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for EntityPositioning.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__EntityPositioningClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the EntityPositioning model
 */
export interface EntityPositioningFieldRefs {
    readonly id: Prisma.FieldRef<"EntityPositioning", 'String'>;
    readonly entityId: Prisma.FieldRef<"EntityPositioning", 'String'>;
    readonly sdlcStages: Prisma.FieldRef<"EntityPositioning", 'Json'>;
    readonly primaryStage: Prisma.FieldRef<"EntityPositioning", 'String'>;
    readonly solutionScope: Prisma.FieldRef<"EntityPositioning", 'String'>;
    readonly maturityStage: Prisma.FieldRef<"EntityPositioning", 'String'>;
    readonly adoptionCurve: Prisma.FieldRef<"EntityPositioning", 'String'>;
    readonly businessModel: Prisma.FieldRef<"EntityPositioning", 'String'>;
    readonly primaryEcosystem: Prisma.FieldRef<"EntityPositioning", 'String'>;
    readonly positioningStatement: Prisma.FieldRef<"EntityPositioning", 'String'>;
    readonly evidenceChain: Prisma.FieldRef<"EntityPositioning", 'Json'>;
    readonly evidenceDescription: Prisma.FieldRef<"EntityPositioning", 'String'>;
    readonly createdAt: Prisma.FieldRef<"EntityPositioning", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"EntityPositioning", 'DateTime'>;
    readonly assessedAt: Prisma.FieldRef<"EntityPositioning", 'DateTime'>;
    readonly assessedBy: Prisma.FieldRef<"EntityPositioning", 'String'>;
}
/**
 * EntityPositioning findUnique
 */
export type EntityPositioningFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningInclude<ExtArgs> | null;
    /**
     * Filter, which EntityPositioning to fetch.
     */
    where: Prisma.EntityPositioningWhereUniqueInput;
};
/**
 * EntityPositioning findUniqueOrThrow
 */
export type EntityPositioningFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningInclude<ExtArgs> | null;
    /**
     * Filter, which EntityPositioning to fetch.
     */
    where: Prisma.EntityPositioningWhereUniqueInput;
};
/**
 * EntityPositioning findFirst
 */
export type EntityPositioningFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningInclude<ExtArgs> | null;
    /**
     * Filter, which EntityPositioning to fetch.
     */
    where?: Prisma.EntityPositioningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EntityPositionings to fetch.
     */
    orderBy?: Prisma.EntityPositioningOrderByWithRelationInput | Prisma.EntityPositioningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EntityPositionings.
     */
    cursor?: Prisma.EntityPositioningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EntityPositionings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EntityPositionings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EntityPositionings.
     */
    distinct?: Prisma.EntityPositioningScalarFieldEnum | Prisma.EntityPositioningScalarFieldEnum[];
};
/**
 * EntityPositioning findFirstOrThrow
 */
export type EntityPositioningFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningInclude<ExtArgs> | null;
    /**
     * Filter, which EntityPositioning to fetch.
     */
    where?: Prisma.EntityPositioningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EntityPositionings to fetch.
     */
    orderBy?: Prisma.EntityPositioningOrderByWithRelationInput | Prisma.EntityPositioningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EntityPositionings.
     */
    cursor?: Prisma.EntityPositioningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EntityPositionings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EntityPositionings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EntityPositionings.
     */
    distinct?: Prisma.EntityPositioningScalarFieldEnum | Prisma.EntityPositioningScalarFieldEnum[];
};
/**
 * EntityPositioning findMany
 */
export type EntityPositioningFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningInclude<ExtArgs> | null;
    /**
     * Filter, which EntityPositionings to fetch.
     */
    where?: Prisma.EntityPositioningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EntityPositionings to fetch.
     */
    orderBy?: Prisma.EntityPositioningOrderByWithRelationInput | Prisma.EntityPositioningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing EntityPositionings.
     */
    cursor?: Prisma.EntityPositioningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EntityPositionings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EntityPositionings.
     */
    skip?: number;
    distinct?: Prisma.EntityPositioningScalarFieldEnum | Prisma.EntityPositioningScalarFieldEnum[];
};
/**
 * EntityPositioning create
 */
export type EntityPositioningCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningInclude<ExtArgs> | null;
    /**
     * The data needed to create a EntityPositioning.
     */
    data: Prisma.XOR<Prisma.EntityPositioningCreateInput, Prisma.EntityPositioningUncheckedCreateInput>;
};
/**
 * EntityPositioning createMany
 */
export type EntityPositioningCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many EntityPositionings.
     */
    data: Prisma.EntityPositioningCreateManyInput | Prisma.EntityPositioningCreateManyInput[];
};
/**
 * EntityPositioning createManyAndReturn
 */
export type EntityPositioningCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * The data used to create many EntityPositionings.
     */
    data: Prisma.EntityPositioningCreateManyInput | Prisma.EntityPositioningCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * EntityPositioning update
 */
export type EntityPositioningUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningInclude<ExtArgs> | null;
    /**
     * The data needed to update a EntityPositioning.
     */
    data: Prisma.XOR<Prisma.EntityPositioningUpdateInput, Prisma.EntityPositioningUncheckedUpdateInput>;
    /**
     * Choose, which EntityPositioning to update.
     */
    where: Prisma.EntityPositioningWhereUniqueInput;
};
/**
 * EntityPositioning updateMany
 */
export type EntityPositioningUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update EntityPositionings.
     */
    data: Prisma.XOR<Prisma.EntityPositioningUpdateManyMutationInput, Prisma.EntityPositioningUncheckedUpdateManyInput>;
    /**
     * Filter which EntityPositionings to update
     */
    where?: Prisma.EntityPositioningWhereInput;
    /**
     * Limit how many EntityPositionings to update.
     */
    limit?: number;
};
/**
 * EntityPositioning updateManyAndReturn
 */
export type EntityPositioningUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * The data used to update EntityPositionings.
     */
    data: Prisma.XOR<Prisma.EntityPositioningUpdateManyMutationInput, Prisma.EntityPositioningUncheckedUpdateManyInput>;
    /**
     * Filter which EntityPositionings to update
     */
    where?: Prisma.EntityPositioningWhereInput;
    /**
     * Limit how many EntityPositionings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * EntityPositioning upsert
 */
export type EntityPositioningUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningInclude<ExtArgs> | null;
    /**
     * The filter to search for the EntityPositioning to update in case it exists.
     */
    where: Prisma.EntityPositioningWhereUniqueInput;
    /**
     * In case the EntityPositioning found by the `where` argument doesn't exist, create a new EntityPositioning with this data.
     */
    create: Prisma.XOR<Prisma.EntityPositioningCreateInput, Prisma.EntityPositioningUncheckedCreateInput>;
    /**
     * In case the EntityPositioning was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.EntityPositioningUpdateInput, Prisma.EntityPositioningUncheckedUpdateInput>;
};
/**
 * EntityPositioning delete
 */
export type EntityPositioningDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningInclude<ExtArgs> | null;
    /**
     * Filter which EntityPositioning to delete.
     */
    where: Prisma.EntityPositioningWhereUniqueInput;
};
/**
 * EntityPositioning deleteMany
 */
export type EntityPositioningDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which EntityPositionings to delete
     */
    where?: Prisma.EntityPositioningWhereInput;
    /**
     * Limit how many EntityPositionings to delete.
     */
    limit?: number;
};
/**
 * EntityPositioning without action
 */
export type EntityPositioningDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityPositioning
     */
    select?: Prisma.EntityPositioningSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityPositioning
     */
    omit?: Prisma.EntityPositioningOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityPositioningInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=EntityPositioning.d.ts.map