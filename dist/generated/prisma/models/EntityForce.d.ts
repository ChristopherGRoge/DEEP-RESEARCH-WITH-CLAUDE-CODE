import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model EntityForce
 * A market force acting on an entity's trajectory
 */
export type EntityForceModel = runtime.Types.Result.DefaultSelection<Prisma.$EntityForcePayload>;
export type AggregateEntityForce = {
    _count: EntityForceCountAggregateOutputType | null;
    _avg: EntityForceAvgAggregateOutputType | null;
    _sum: EntityForceSumAggregateOutputType | null;
    _min: EntityForceMinAggregateOutputType | null;
    _max: EntityForceMaxAggregateOutputType | null;
};
export type EntityForceAvgAggregateOutputType = {
    strength: number | null;
};
export type EntityForceSumAggregateOutputType = {
    strength: number | null;
};
export type EntityForceMinAggregateOutputType = {
    id: string | null;
    entityId: string | null;
    forceType: string | null;
    name: string | null;
    description: string | null;
    strength: number | null;
    timeHorizon: string | null;
    evidenceDescription: string | null;
    evidenceScreenshotPath: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EntityForceMaxAggregateOutputType = {
    id: string | null;
    entityId: string | null;
    forceType: string | null;
    name: string | null;
    description: string | null;
    strength: number | null;
    timeHorizon: string | null;
    evidenceDescription: string | null;
    evidenceScreenshotPath: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EntityForceCountAggregateOutputType = {
    id: number;
    entityId: number;
    forceType: number;
    name: number;
    description: number;
    strength: number;
    timeHorizon: number;
    evidenceDescription: number;
    evidenceScreenshotPath: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type EntityForceAvgAggregateInputType = {
    strength?: true;
};
export type EntityForceSumAggregateInputType = {
    strength?: true;
};
export type EntityForceMinAggregateInputType = {
    id?: true;
    entityId?: true;
    forceType?: true;
    name?: true;
    description?: true;
    strength?: true;
    timeHorizon?: true;
    evidenceDescription?: true;
    evidenceScreenshotPath?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EntityForceMaxAggregateInputType = {
    id?: true;
    entityId?: true;
    forceType?: true;
    name?: true;
    description?: true;
    strength?: true;
    timeHorizon?: true;
    evidenceDescription?: true;
    evidenceScreenshotPath?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EntityForceCountAggregateInputType = {
    id?: true;
    entityId?: true;
    forceType?: true;
    name?: true;
    description?: true;
    strength?: true;
    timeHorizon?: true;
    evidenceDescription?: true;
    evidenceScreenshotPath?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type EntityForceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which EntityForce to aggregate.
     */
    where?: Prisma.EntityForceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EntityForces to fetch.
     */
    orderBy?: Prisma.EntityForceOrderByWithRelationInput | Prisma.EntityForceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.EntityForceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EntityForces from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EntityForces.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned EntityForces
    **/
    _count?: true | EntityForceCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: EntityForceAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: EntityForceSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: EntityForceMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: EntityForceMaxAggregateInputType;
};
export type GetEntityForceAggregateType<T extends EntityForceAggregateArgs> = {
    [P in keyof T & keyof AggregateEntityForce]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEntityForce[P]> : Prisma.GetScalarType<T[P], AggregateEntityForce[P]>;
};
export type EntityForceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntityForceWhereInput;
    orderBy?: Prisma.EntityForceOrderByWithAggregationInput | Prisma.EntityForceOrderByWithAggregationInput[];
    by: Prisma.EntityForceScalarFieldEnum[] | Prisma.EntityForceScalarFieldEnum;
    having?: Prisma.EntityForceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EntityForceCountAggregateInputType | true;
    _avg?: EntityForceAvgAggregateInputType;
    _sum?: EntityForceSumAggregateInputType;
    _min?: EntityForceMinAggregateInputType;
    _max?: EntityForceMaxAggregateInputType;
};
export type EntityForceGroupByOutputType = {
    id: string;
    entityId: string;
    forceType: string;
    name: string;
    description: string | null;
    strength: number;
    timeHorizon: string | null;
    evidenceDescription: string | null;
    evidenceScreenshotPath: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: EntityForceCountAggregateOutputType | null;
    _avg: EntityForceAvgAggregateOutputType | null;
    _sum: EntityForceSumAggregateOutputType | null;
    _min: EntityForceMinAggregateOutputType | null;
    _max: EntityForceMaxAggregateOutputType | null;
};
type GetEntityForceGroupByPayload<T extends EntityForceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EntityForceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EntityForceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EntityForceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EntityForceGroupByOutputType[P]>;
}>>;
export type EntityForceWhereInput = {
    AND?: Prisma.EntityForceWhereInput | Prisma.EntityForceWhereInput[];
    OR?: Prisma.EntityForceWhereInput[];
    NOT?: Prisma.EntityForceWhereInput | Prisma.EntityForceWhereInput[];
    id?: Prisma.StringFilter<"EntityForce"> | string;
    entityId?: Prisma.StringFilter<"EntityForce"> | string;
    forceType?: Prisma.StringFilter<"EntityForce"> | string;
    name?: Prisma.StringFilter<"EntityForce"> | string;
    description?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    strength?: Prisma.FloatFilter<"EntityForce"> | number;
    timeHorizon?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    evidenceDescription?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    evidenceScreenshotPath?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"EntityForce"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EntityForce"> | Date | string;
    entity?: Prisma.XOR<Prisma.EntityScalarRelationFilter, Prisma.EntityWhereInput>;
};
export type EntityForceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    forceType?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    strength?: Prisma.SortOrder;
    timeHorizon?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceScreenshotPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    entity?: Prisma.EntityOrderByWithRelationInput;
};
export type EntityForceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    entityId_name?: Prisma.EntityForceEntityIdNameCompoundUniqueInput;
    AND?: Prisma.EntityForceWhereInput | Prisma.EntityForceWhereInput[];
    OR?: Prisma.EntityForceWhereInput[];
    NOT?: Prisma.EntityForceWhereInput | Prisma.EntityForceWhereInput[];
    entityId?: Prisma.StringFilter<"EntityForce"> | string;
    forceType?: Prisma.StringFilter<"EntityForce"> | string;
    name?: Prisma.StringFilter<"EntityForce"> | string;
    description?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    strength?: Prisma.FloatFilter<"EntityForce"> | number;
    timeHorizon?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    evidenceDescription?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    evidenceScreenshotPath?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"EntityForce"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EntityForce"> | Date | string;
    entity?: Prisma.XOR<Prisma.EntityScalarRelationFilter, Prisma.EntityWhereInput>;
}, "id" | "entityId_name">;
export type EntityForceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    forceType?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    strength?: Prisma.SortOrder;
    timeHorizon?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrderInput | Prisma.SortOrder;
    evidenceScreenshotPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.EntityForceCountOrderByAggregateInput;
    _avg?: Prisma.EntityForceAvgOrderByAggregateInput;
    _max?: Prisma.EntityForceMaxOrderByAggregateInput;
    _min?: Prisma.EntityForceMinOrderByAggregateInput;
    _sum?: Prisma.EntityForceSumOrderByAggregateInput;
};
export type EntityForceScalarWhereWithAggregatesInput = {
    AND?: Prisma.EntityForceScalarWhereWithAggregatesInput | Prisma.EntityForceScalarWhereWithAggregatesInput[];
    OR?: Prisma.EntityForceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EntityForceScalarWhereWithAggregatesInput | Prisma.EntityForceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EntityForce"> | string;
    entityId?: Prisma.StringWithAggregatesFilter<"EntityForce"> | string;
    forceType?: Prisma.StringWithAggregatesFilter<"EntityForce"> | string;
    name?: Prisma.StringWithAggregatesFilter<"EntityForce"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"EntityForce"> | string | null;
    strength?: Prisma.FloatWithAggregatesFilter<"EntityForce"> | number;
    timeHorizon?: Prisma.StringNullableWithAggregatesFilter<"EntityForce"> | string | null;
    evidenceDescription?: Prisma.StringNullableWithAggregatesFilter<"EntityForce"> | string | null;
    evidenceScreenshotPath?: Prisma.StringNullableWithAggregatesFilter<"EntityForce"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EntityForce"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"EntityForce"> | Date | string;
};
export type EntityForceCreateInput = {
    id?: string;
    forceType: string;
    name: string;
    description?: string | null;
    strength?: number;
    timeHorizon?: string | null;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entity: Prisma.EntityCreateNestedOneWithoutForcesInput;
};
export type EntityForceUncheckedCreateInput = {
    id?: string;
    entityId: string;
    forceType: string;
    name: string;
    description?: string | null;
    strength?: number;
    timeHorizon?: string | null;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EntityForceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    forceType?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    timeHorizon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entity?: Prisma.EntityUpdateOneRequiredWithoutForcesNestedInput;
};
export type EntityForceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    forceType?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    timeHorizon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntityForceCreateManyInput = {
    id?: string;
    entityId: string;
    forceType: string;
    name: string;
    description?: string | null;
    strength?: number;
    timeHorizon?: string | null;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EntityForceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    forceType?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    timeHorizon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntityForceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    forceType?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    timeHorizon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntityForceListRelationFilter = {
    every?: Prisma.EntityForceWhereInput;
    some?: Prisma.EntityForceWhereInput;
    none?: Prisma.EntityForceWhereInput;
};
export type EntityForceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EntityForceEntityIdNameCompoundUniqueInput = {
    entityId: string;
    name: string;
};
export type EntityForceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    forceType?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    strength?: Prisma.SortOrder;
    timeHorizon?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    evidenceScreenshotPath?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EntityForceAvgOrderByAggregateInput = {
    strength?: Prisma.SortOrder;
};
export type EntityForceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    forceType?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    strength?: Prisma.SortOrder;
    timeHorizon?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    evidenceScreenshotPath?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EntityForceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    forceType?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    strength?: Prisma.SortOrder;
    timeHorizon?: Prisma.SortOrder;
    evidenceDescription?: Prisma.SortOrder;
    evidenceScreenshotPath?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EntityForceSumOrderByAggregateInput = {
    strength?: Prisma.SortOrder;
};
export type EntityForceCreateNestedManyWithoutEntityInput = {
    create?: Prisma.XOR<Prisma.EntityForceCreateWithoutEntityInput, Prisma.EntityForceUncheckedCreateWithoutEntityInput> | Prisma.EntityForceCreateWithoutEntityInput[] | Prisma.EntityForceUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.EntityForceCreateOrConnectWithoutEntityInput | Prisma.EntityForceCreateOrConnectWithoutEntityInput[];
    createMany?: Prisma.EntityForceCreateManyEntityInputEnvelope;
    connect?: Prisma.EntityForceWhereUniqueInput | Prisma.EntityForceWhereUniqueInput[];
};
export type EntityForceUncheckedCreateNestedManyWithoutEntityInput = {
    create?: Prisma.XOR<Prisma.EntityForceCreateWithoutEntityInput, Prisma.EntityForceUncheckedCreateWithoutEntityInput> | Prisma.EntityForceCreateWithoutEntityInput[] | Prisma.EntityForceUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.EntityForceCreateOrConnectWithoutEntityInput | Prisma.EntityForceCreateOrConnectWithoutEntityInput[];
    createMany?: Prisma.EntityForceCreateManyEntityInputEnvelope;
    connect?: Prisma.EntityForceWhereUniqueInput | Prisma.EntityForceWhereUniqueInput[];
};
export type EntityForceUpdateManyWithoutEntityNestedInput = {
    create?: Prisma.XOR<Prisma.EntityForceCreateWithoutEntityInput, Prisma.EntityForceUncheckedCreateWithoutEntityInput> | Prisma.EntityForceCreateWithoutEntityInput[] | Prisma.EntityForceUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.EntityForceCreateOrConnectWithoutEntityInput | Prisma.EntityForceCreateOrConnectWithoutEntityInput[];
    upsert?: Prisma.EntityForceUpsertWithWhereUniqueWithoutEntityInput | Prisma.EntityForceUpsertWithWhereUniqueWithoutEntityInput[];
    createMany?: Prisma.EntityForceCreateManyEntityInputEnvelope;
    set?: Prisma.EntityForceWhereUniqueInput | Prisma.EntityForceWhereUniqueInput[];
    disconnect?: Prisma.EntityForceWhereUniqueInput | Prisma.EntityForceWhereUniqueInput[];
    delete?: Prisma.EntityForceWhereUniqueInput | Prisma.EntityForceWhereUniqueInput[];
    connect?: Prisma.EntityForceWhereUniqueInput | Prisma.EntityForceWhereUniqueInput[];
    update?: Prisma.EntityForceUpdateWithWhereUniqueWithoutEntityInput | Prisma.EntityForceUpdateWithWhereUniqueWithoutEntityInput[];
    updateMany?: Prisma.EntityForceUpdateManyWithWhereWithoutEntityInput | Prisma.EntityForceUpdateManyWithWhereWithoutEntityInput[];
    deleteMany?: Prisma.EntityForceScalarWhereInput | Prisma.EntityForceScalarWhereInput[];
};
export type EntityForceUncheckedUpdateManyWithoutEntityNestedInput = {
    create?: Prisma.XOR<Prisma.EntityForceCreateWithoutEntityInput, Prisma.EntityForceUncheckedCreateWithoutEntityInput> | Prisma.EntityForceCreateWithoutEntityInput[] | Prisma.EntityForceUncheckedCreateWithoutEntityInput[];
    connectOrCreate?: Prisma.EntityForceCreateOrConnectWithoutEntityInput | Prisma.EntityForceCreateOrConnectWithoutEntityInput[];
    upsert?: Prisma.EntityForceUpsertWithWhereUniqueWithoutEntityInput | Prisma.EntityForceUpsertWithWhereUniqueWithoutEntityInput[];
    createMany?: Prisma.EntityForceCreateManyEntityInputEnvelope;
    set?: Prisma.EntityForceWhereUniqueInput | Prisma.EntityForceWhereUniqueInput[];
    disconnect?: Prisma.EntityForceWhereUniqueInput | Prisma.EntityForceWhereUniqueInput[];
    delete?: Prisma.EntityForceWhereUniqueInput | Prisma.EntityForceWhereUniqueInput[];
    connect?: Prisma.EntityForceWhereUniqueInput | Prisma.EntityForceWhereUniqueInput[];
    update?: Prisma.EntityForceUpdateWithWhereUniqueWithoutEntityInput | Prisma.EntityForceUpdateWithWhereUniqueWithoutEntityInput[];
    updateMany?: Prisma.EntityForceUpdateManyWithWhereWithoutEntityInput | Prisma.EntityForceUpdateManyWithWhereWithoutEntityInput[];
    deleteMany?: Prisma.EntityForceScalarWhereInput | Prisma.EntityForceScalarWhereInput[];
};
export type EntityForceCreateWithoutEntityInput = {
    id?: string;
    forceType: string;
    name: string;
    description?: string | null;
    strength?: number;
    timeHorizon?: string | null;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EntityForceUncheckedCreateWithoutEntityInput = {
    id?: string;
    forceType: string;
    name: string;
    description?: string | null;
    strength?: number;
    timeHorizon?: string | null;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EntityForceCreateOrConnectWithoutEntityInput = {
    where: Prisma.EntityForceWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityForceCreateWithoutEntityInput, Prisma.EntityForceUncheckedCreateWithoutEntityInput>;
};
export type EntityForceCreateManyEntityInputEnvelope = {
    data: Prisma.EntityForceCreateManyEntityInput | Prisma.EntityForceCreateManyEntityInput[];
};
export type EntityForceUpsertWithWhereUniqueWithoutEntityInput = {
    where: Prisma.EntityForceWhereUniqueInput;
    update: Prisma.XOR<Prisma.EntityForceUpdateWithoutEntityInput, Prisma.EntityForceUncheckedUpdateWithoutEntityInput>;
    create: Prisma.XOR<Prisma.EntityForceCreateWithoutEntityInput, Prisma.EntityForceUncheckedCreateWithoutEntityInput>;
};
export type EntityForceUpdateWithWhereUniqueWithoutEntityInput = {
    where: Prisma.EntityForceWhereUniqueInput;
    data: Prisma.XOR<Prisma.EntityForceUpdateWithoutEntityInput, Prisma.EntityForceUncheckedUpdateWithoutEntityInput>;
};
export type EntityForceUpdateManyWithWhereWithoutEntityInput = {
    where: Prisma.EntityForceScalarWhereInput;
    data: Prisma.XOR<Prisma.EntityForceUpdateManyMutationInput, Prisma.EntityForceUncheckedUpdateManyWithoutEntityInput>;
};
export type EntityForceScalarWhereInput = {
    AND?: Prisma.EntityForceScalarWhereInput | Prisma.EntityForceScalarWhereInput[];
    OR?: Prisma.EntityForceScalarWhereInput[];
    NOT?: Prisma.EntityForceScalarWhereInput | Prisma.EntityForceScalarWhereInput[];
    id?: Prisma.StringFilter<"EntityForce"> | string;
    entityId?: Prisma.StringFilter<"EntityForce"> | string;
    forceType?: Prisma.StringFilter<"EntityForce"> | string;
    name?: Prisma.StringFilter<"EntityForce"> | string;
    description?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    strength?: Prisma.FloatFilter<"EntityForce"> | number;
    timeHorizon?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    evidenceDescription?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    evidenceScreenshotPath?: Prisma.StringNullableFilter<"EntityForce"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"EntityForce"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EntityForce"> | Date | string;
};
export type EntityForceCreateManyEntityInput = {
    id?: string;
    forceType: string;
    name: string;
    description?: string | null;
    strength?: number;
    timeHorizon?: string | null;
    evidenceDescription?: string | null;
    evidenceScreenshotPath?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EntityForceUpdateWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    forceType?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    timeHorizon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntityForceUncheckedUpdateWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    forceType?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    timeHorizon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntityForceUncheckedUpdateManyWithoutEntityInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    forceType?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    strength?: Prisma.FloatFieldUpdateOperationsInput | number;
    timeHorizon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceDescription?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    evidenceScreenshotPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EntityForceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entityId?: boolean;
    forceType?: boolean;
    name?: boolean;
    description?: boolean;
    strength?: boolean;
    timeHorizon?: boolean;
    evidenceDescription?: boolean;
    evidenceScreenshotPath?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entityForce"]>;
export type EntityForceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entityId?: boolean;
    forceType?: boolean;
    name?: boolean;
    description?: boolean;
    strength?: boolean;
    timeHorizon?: boolean;
    evidenceDescription?: boolean;
    evidenceScreenshotPath?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entityForce"]>;
export type EntityForceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entityId?: boolean;
    forceType?: boolean;
    name?: boolean;
    description?: boolean;
    strength?: boolean;
    timeHorizon?: boolean;
    evidenceDescription?: boolean;
    evidenceScreenshotPath?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entityForce"]>;
export type EntityForceSelectScalar = {
    id?: boolean;
    entityId?: boolean;
    forceType?: boolean;
    name?: boolean;
    description?: boolean;
    strength?: boolean;
    timeHorizon?: boolean;
    evidenceDescription?: boolean;
    evidenceScreenshotPath?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type EntityForceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "entityId" | "forceType" | "name" | "description" | "strength" | "timeHorizon" | "evidenceDescription" | "evidenceScreenshotPath" | "createdAt" | "updatedAt", ExtArgs["result"]["entityForce"]>;
export type EntityForceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type EntityForceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type EntityForceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entity?: boolean | Prisma.EntityDefaultArgs<ExtArgs>;
};
export type $EntityForcePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EntityForce";
    objects: {
        entity: Prisma.$EntityPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        entityId: string;
        forceType: string;
        name: string;
        description: string | null;
        strength: number;
        timeHorizon: string | null;
        evidenceDescription: string | null;
        evidenceScreenshotPath: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["entityForce"]>;
    composites: {};
};
export type EntityForceGetPayload<S extends boolean | null | undefined | EntityForceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EntityForcePayload, S>;
export type EntityForceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EntityForceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EntityForceCountAggregateInputType | true;
};
export interface EntityForceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EntityForce'];
        meta: {
            name: 'EntityForce';
        };
    };
    /**
     * Find zero or one EntityForce that matches the filter.
     * @param {EntityForceFindUniqueArgs} args - Arguments to find a EntityForce
     * @example
     * // Get one EntityForce
     * const entityForce = await prisma.entityForce.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntityForceFindUniqueArgs>(args: Prisma.SelectSubset<T, EntityForceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EntityForceClient<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one EntityForce that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntityForceFindUniqueOrThrowArgs} args - Arguments to find a EntityForce
     * @example
     * // Get one EntityForce
     * const entityForce = await prisma.entityForce.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntityForceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EntityForceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntityForceClient<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first EntityForce that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityForceFindFirstArgs} args - Arguments to find a EntityForce
     * @example
     * // Get one EntityForce
     * const entityForce = await prisma.entityForce.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntityForceFindFirstArgs>(args?: Prisma.SelectSubset<T, EntityForceFindFirstArgs<ExtArgs>>): Prisma.Prisma__EntityForceClient<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first EntityForce that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityForceFindFirstOrThrowArgs} args - Arguments to find a EntityForce
     * @example
     * // Get one EntityForce
     * const entityForce = await prisma.entityForce.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntityForceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EntityForceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntityForceClient<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more EntityForces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityForceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EntityForces
     * const entityForces = await prisma.entityForce.findMany()
     *
     * // Get first 10 EntityForces
     * const entityForces = await prisma.entityForce.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const entityForceWithIdOnly = await prisma.entityForce.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EntityForceFindManyArgs>(args?: Prisma.SelectSubset<T, EntityForceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a EntityForce.
     * @param {EntityForceCreateArgs} args - Arguments to create a EntityForce.
     * @example
     * // Create one EntityForce
     * const EntityForce = await prisma.entityForce.create({
     *   data: {
     *     // ... data to create a EntityForce
     *   }
     * })
     *
     */
    create<T extends EntityForceCreateArgs>(args: Prisma.SelectSubset<T, EntityForceCreateArgs<ExtArgs>>): Prisma.Prisma__EntityForceClient<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many EntityForces.
     * @param {EntityForceCreateManyArgs} args - Arguments to create many EntityForces.
     * @example
     * // Create many EntityForces
     * const entityForce = await prisma.entityForce.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EntityForceCreateManyArgs>(args?: Prisma.SelectSubset<T, EntityForceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many EntityForces and returns the data saved in the database.
     * @param {EntityForceCreateManyAndReturnArgs} args - Arguments to create many EntityForces.
     * @example
     * // Create many EntityForces
     * const entityForce = await prisma.entityForce.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many EntityForces and only return the `id`
     * const entityForceWithIdOnly = await prisma.entityForce.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EntityForceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EntityForceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a EntityForce.
     * @param {EntityForceDeleteArgs} args - Arguments to delete one EntityForce.
     * @example
     * // Delete one EntityForce
     * const EntityForce = await prisma.entityForce.delete({
     *   where: {
     *     // ... filter to delete one EntityForce
     *   }
     * })
     *
     */
    delete<T extends EntityForceDeleteArgs>(args: Prisma.SelectSubset<T, EntityForceDeleteArgs<ExtArgs>>): Prisma.Prisma__EntityForceClient<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one EntityForce.
     * @param {EntityForceUpdateArgs} args - Arguments to update one EntityForce.
     * @example
     * // Update one EntityForce
     * const entityForce = await prisma.entityForce.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EntityForceUpdateArgs>(args: Prisma.SelectSubset<T, EntityForceUpdateArgs<ExtArgs>>): Prisma.Prisma__EntityForceClient<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more EntityForces.
     * @param {EntityForceDeleteManyArgs} args - Arguments to filter EntityForces to delete.
     * @example
     * // Delete a few EntityForces
     * const { count } = await prisma.entityForce.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EntityForceDeleteManyArgs>(args?: Prisma.SelectSubset<T, EntityForceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more EntityForces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityForceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EntityForces
     * const entityForce = await prisma.entityForce.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EntityForceUpdateManyArgs>(args: Prisma.SelectSubset<T, EntityForceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more EntityForces and returns the data updated in the database.
     * @param {EntityForceUpdateManyAndReturnArgs} args - Arguments to update many EntityForces.
     * @example
     * // Update many EntityForces
     * const entityForce = await prisma.entityForce.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more EntityForces and only return the `id`
     * const entityForceWithIdOnly = await prisma.entityForce.updateManyAndReturn({
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
    updateManyAndReturn<T extends EntityForceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EntityForceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one EntityForce.
     * @param {EntityForceUpsertArgs} args - Arguments to update or create a EntityForce.
     * @example
     * // Update or create a EntityForce
     * const entityForce = await prisma.entityForce.upsert({
     *   create: {
     *     // ... data to create a EntityForce
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EntityForce we want to update
     *   }
     * })
     */
    upsert<T extends EntityForceUpsertArgs>(args: Prisma.SelectSubset<T, EntityForceUpsertArgs<ExtArgs>>): Prisma.Prisma__EntityForceClient<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of EntityForces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityForceCountArgs} args - Arguments to filter EntityForces to count.
     * @example
     * // Count the number of EntityForces
     * const count = await prisma.entityForce.count({
     *   where: {
     *     // ... the filter for the EntityForces we want to count
     *   }
     * })
    **/
    count<T extends EntityForceCountArgs>(args?: Prisma.Subset<T, EntityForceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EntityForceCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a EntityForce.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityForceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EntityForceAggregateArgs>(args: Prisma.Subset<T, EntityForceAggregateArgs>): Prisma.PrismaPromise<GetEntityForceAggregateType<T>>;
    /**
     * Group by EntityForce.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityForceGroupByArgs} args - Group by arguments.
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
    groupBy<T extends EntityForceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EntityForceGroupByArgs['orderBy'];
    } : {
        orderBy?: EntityForceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EntityForceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntityForceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the EntityForce model
     */
    readonly fields: EntityForceFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for EntityForce.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__EntityForceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the EntityForce model
 */
export interface EntityForceFieldRefs {
    readonly id: Prisma.FieldRef<"EntityForce", 'String'>;
    readonly entityId: Prisma.FieldRef<"EntityForce", 'String'>;
    readonly forceType: Prisma.FieldRef<"EntityForce", 'String'>;
    readonly name: Prisma.FieldRef<"EntityForce", 'String'>;
    readonly description: Prisma.FieldRef<"EntityForce", 'String'>;
    readonly strength: Prisma.FieldRef<"EntityForce", 'Float'>;
    readonly timeHorizon: Prisma.FieldRef<"EntityForce", 'String'>;
    readonly evidenceDescription: Prisma.FieldRef<"EntityForce", 'String'>;
    readonly evidenceScreenshotPath: Prisma.FieldRef<"EntityForce", 'String'>;
    readonly createdAt: Prisma.FieldRef<"EntityForce", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"EntityForce", 'DateTime'>;
}
/**
 * EntityForce findUnique
 */
export type EntityForceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceInclude<ExtArgs> | null;
    /**
     * Filter, which EntityForce to fetch.
     */
    where: Prisma.EntityForceWhereUniqueInput;
};
/**
 * EntityForce findUniqueOrThrow
 */
export type EntityForceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceInclude<ExtArgs> | null;
    /**
     * Filter, which EntityForce to fetch.
     */
    where: Prisma.EntityForceWhereUniqueInput;
};
/**
 * EntityForce findFirst
 */
export type EntityForceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceInclude<ExtArgs> | null;
    /**
     * Filter, which EntityForce to fetch.
     */
    where?: Prisma.EntityForceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EntityForces to fetch.
     */
    orderBy?: Prisma.EntityForceOrderByWithRelationInput | Prisma.EntityForceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EntityForces.
     */
    cursor?: Prisma.EntityForceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EntityForces from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EntityForces.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EntityForces.
     */
    distinct?: Prisma.EntityForceScalarFieldEnum | Prisma.EntityForceScalarFieldEnum[];
};
/**
 * EntityForce findFirstOrThrow
 */
export type EntityForceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceInclude<ExtArgs> | null;
    /**
     * Filter, which EntityForce to fetch.
     */
    where?: Prisma.EntityForceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EntityForces to fetch.
     */
    orderBy?: Prisma.EntityForceOrderByWithRelationInput | Prisma.EntityForceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EntityForces.
     */
    cursor?: Prisma.EntityForceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EntityForces from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EntityForces.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EntityForces.
     */
    distinct?: Prisma.EntityForceScalarFieldEnum | Prisma.EntityForceScalarFieldEnum[];
};
/**
 * EntityForce findMany
 */
export type EntityForceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceInclude<ExtArgs> | null;
    /**
     * Filter, which EntityForces to fetch.
     */
    where?: Prisma.EntityForceWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EntityForces to fetch.
     */
    orderBy?: Prisma.EntityForceOrderByWithRelationInput | Prisma.EntityForceOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing EntityForces.
     */
    cursor?: Prisma.EntityForceWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EntityForces from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EntityForces.
     */
    skip?: number;
    distinct?: Prisma.EntityForceScalarFieldEnum | Prisma.EntityForceScalarFieldEnum[];
};
/**
 * EntityForce create
 */
export type EntityForceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceInclude<ExtArgs> | null;
    /**
     * The data needed to create a EntityForce.
     */
    data: Prisma.XOR<Prisma.EntityForceCreateInput, Prisma.EntityForceUncheckedCreateInput>;
};
/**
 * EntityForce createMany
 */
export type EntityForceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many EntityForces.
     */
    data: Prisma.EntityForceCreateManyInput | Prisma.EntityForceCreateManyInput[];
};
/**
 * EntityForce createManyAndReturn
 */
export type EntityForceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * The data used to create many EntityForces.
     */
    data: Prisma.EntityForceCreateManyInput | Prisma.EntityForceCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * EntityForce update
 */
export type EntityForceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceInclude<ExtArgs> | null;
    /**
     * The data needed to update a EntityForce.
     */
    data: Prisma.XOR<Prisma.EntityForceUpdateInput, Prisma.EntityForceUncheckedUpdateInput>;
    /**
     * Choose, which EntityForce to update.
     */
    where: Prisma.EntityForceWhereUniqueInput;
};
/**
 * EntityForce updateMany
 */
export type EntityForceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update EntityForces.
     */
    data: Prisma.XOR<Prisma.EntityForceUpdateManyMutationInput, Prisma.EntityForceUncheckedUpdateManyInput>;
    /**
     * Filter which EntityForces to update
     */
    where?: Prisma.EntityForceWhereInput;
    /**
     * Limit how many EntityForces to update.
     */
    limit?: number;
};
/**
 * EntityForce updateManyAndReturn
 */
export type EntityForceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * The data used to update EntityForces.
     */
    data: Prisma.XOR<Prisma.EntityForceUpdateManyMutationInput, Prisma.EntityForceUncheckedUpdateManyInput>;
    /**
     * Filter which EntityForces to update
     */
    where?: Prisma.EntityForceWhereInput;
    /**
     * Limit how many EntityForces to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * EntityForce upsert
 */
export type EntityForceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceInclude<ExtArgs> | null;
    /**
     * The filter to search for the EntityForce to update in case it exists.
     */
    where: Prisma.EntityForceWhereUniqueInput;
    /**
     * In case the EntityForce found by the `where` argument doesn't exist, create a new EntityForce with this data.
     */
    create: Prisma.XOR<Prisma.EntityForceCreateInput, Prisma.EntityForceUncheckedCreateInput>;
    /**
     * In case the EntityForce was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.EntityForceUpdateInput, Prisma.EntityForceUncheckedUpdateInput>;
};
/**
 * EntityForce delete
 */
export type EntityForceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceInclude<ExtArgs> | null;
    /**
     * Filter which EntityForce to delete.
     */
    where: Prisma.EntityForceWhereUniqueInput;
};
/**
 * EntityForce deleteMany
 */
export type EntityForceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which EntityForces to delete
     */
    where?: Prisma.EntityForceWhereInput;
    /**
     * Limit how many EntityForces to delete.
     */
    limit?: number;
};
/**
 * EntityForce without action
 */
export type EntityForceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityForce
     */
    select?: Prisma.EntityForceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityForce
     */
    omit?: Prisma.EntityForceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityForceInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=EntityForce.d.ts.map