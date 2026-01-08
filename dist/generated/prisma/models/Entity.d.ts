import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Entity
 * An entity being researched (e.g., a tool, framework, product)
 */
export type EntityModel = runtime.Types.Result.DefaultSelection<Prisma.$EntityPayload>;
export type AggregateEntity = {
    _count: EntityCountAggregateOutputType | null;
    _min: EntityMinAggregateOutputType | null;
    _max: EntityMaxAggregateOutputType | null;
};
export type EntityMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    entityType: string | null;
    url: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean | null;
    projectId: string | null;
};
export type EntityMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    entityType: string | null;
    url: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean | null;
    projectId: string | null;
};
export type EntityCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    entityType: number;
    url: number;
    createdAt: number;
    updatedAt: number;
    logoUrl: number;
    logoPath: number;
    logoFormat: number;
    logoSvgContent: number;
    logoSourceUrl: number;
    logoFetchedAt: number;
    logoVerified: number;
    projectId: number;
    _all: number;
};
export type EntityMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    entityType?: true;
    url?: true;
    createdAt?: true;
    updatedAt?: true;
    logoUrl?: true;
    logoPath?: true;
    logoFormat?: true;
    logoSvgContent?: true;
    logoSourceUrl?: true;
    logoFetchedAt?: true;
    logoVerified?: true;
    projectId?: true;
};
export type EntityMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    entityType?: true;
    url?: true;
    createdAt?: true;
    updatedAt?: true;
    logoUrl?: true;
    logoPath?: true;
    logoFormat?: true;
    logoSvgContent?: true;
    logoSourceUrl?: true;
    logoFetchedAt?: true;
    logoVerified?: true;
    projectId?: true;
};
export type EntityCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    entityType?: true;
    url?: true;
    createdAt?: true;
    updatedAt?: true;
    logoUrl?: true;
    logoPath?: true;
    logoFormat?: true;
    logoSvgContent?: true;
    logoSourceUrl?: true;
    logoFetchedAt?: true;
    logoVerified?: true;
    projectId?: true;
    _all?: true;
};
export type EntityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Entity to aggregate.
     */
    where?: Prisma.EntityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Entities to fetch.
     */
    orderBy?: Prisma.EntityOrderByWithRelationInput | Prisma.EntityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.EntityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Entities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Entities
    **/
    _count?: true | EntityCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: EntityMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: EntityMaxAggregateInputType;
};
export type GetEntityAggregateType<T extends EntityAggregateArgs> = {
    [P in keyof T & keyof AggregateEntity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEntity[P]> : Prisma.GetScalarType<T[P], AggregateEntity[P]>;
};
export type EntityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntityWhereInput;
    orderBy?: Prisma.EntityOrderByWithAggregationInput | Prisma.EntityOrderByWithAggregationInput[];
    by: Prisma.EntityScalarFieldEnum[] | Prisma.EntityScalarFieldEnum;
    having?: Prisma.EntityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EntityCountAggregateInputType | true;
    _min?: EntityMinAggregateInputType;
    _max?: EntityMaxAggregateInputType;
};
export type EntityGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    entityType: string | null;
    url: string | null;
    createdAt: Date;
    updatedAt: Date;
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean;
    projectId: string;
    _count: EntityCountAggregateOutputType | null;
    _min: EntityMinAggregateOutputType | null;
    _max: EntityMaxAggregateOutputType | null;
};
type GetEntityGroupByPayload<T extends EntityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EntityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EntityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EntityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EntityGroupByOutputType[P]>;
}>>;
export type EntityWhereInput = {
    AND?: Prisma.EntityWhereInput | Prisma.EntityWhereInput[];
    OR?: Prisma.EntityWhereInput[];
    NOT?: Prisma.EntityWhereInput | Prisma.EntityWhereInput[];
    id?: Prisma.StringFilter<"Entity"> | string;
    name?: Prisma.StringFilter<"Entity"> | string;
    description?: Prisma.StringNullableFilter<"Entity"> | string | null;
    entityType?: Prisma.StringNullableFilter<"Entity"> | string | null;
    url?: Prisma.StringNullableFilter<"Entity"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Entity"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Entity"> | Date | string;
    logoUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoPath?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFormat?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSvgContent?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSourceUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFetchedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    logoVerified?: Prisma.BoolFilter<"Entity"> | boolean;
    projectId?: Prisma.StringFilter<"Entity"> | string;
    project?: Prisma.XOR<Prisma.ResearchProjectScalarRelationFilter, Prisma.ResearchProjectWhereInput>;
    assertions?: Prisma.AssertionListRelationFilter;
    extractions?: Prisma.ExtractionListRelationFilter;
};
export type EntityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityType?: Prisma.SortOrderInput | Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoFormat?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoSvgContent?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoSourceUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoFetchedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoVerified?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    project?: Prisma.ResearchProjectOrderByWithRelationInput;
    assertions?: Prisma.AssertionOrderByRelationAggregateInput;
    extractions?: Prisma.ExtractionOrderByRelationAggregateInput;
};
export type EntityWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    projectId_name?: Prisma.EntityProjectIdNameCompoundUniqueInput;
    AND?: Prisma.EntityWhereInput | Prisma.EntityWhereInput[];
    OR?: Prisma.EntityWhereInput[];
    NOT?: Prisma.EntityWhereInput | Prisma.EntityWhereInput[];
    name?: Prisma.StringFilter<"Entity"> | string;
    description?: Prisma.StringNullableFilter<"Entity"> | string | null;
    entityType?: Prisma.StringNullableFilter<"Entity"> | string | null;
    url?: Prisma.StringNullableFilter<"Entity"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Entity"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Entity"> | Date | string;
    logoUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoPath?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFormat?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSvgContent?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSourceUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFetchedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    logoVerified?: Prisma.BoolFilter<"Entity"> | boolean;
    projectId?: Prisma.StringFilter<"Entity"> | string;
    project?: Prisma.XOR<Prisma.ResearchProjectScalarRelationFilter, Prisma.ResearchProjectWhereInput>;
    assertions?: Prisma.AssertionListRelationFilter;
    extractions?: Prisma.ExtractionListRelationFilter;
}, "id" | "projectId_name">;
export type EntityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityType?: Prisma.SortOrderInput | Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoFormat?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoSvgContent?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoSourceUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoFetchedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoVerified?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    _count?: Prisma.EntityCountOrderByAggregateInput;
    _max?: Prisma.EntityMaxOrderByAggregateInput;
    _min?: Prisma.EntityMinOrderByAggregateInput;
};
export type EntityScalarWhereWithAggregatesInput = {
    AND?: Prisma.EntityScalarWhereWithAggregatesInput | Prisma.EntityScalarWhereWithAggregatesInput[];
    OR?: Prisma.EntityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EntityScalarWhereWithAggregatesInput | Prisma.EntityScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Entity"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Entity"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    entityType?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    url?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Entity"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Entity"> | Date | string;
    logoUrl?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoPath?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoFormat?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoSvgContent?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoSourceUrl?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoFetchedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Entity"> | Date | string | null;
    logoVerified?: Prisma.BoolWithAggregatesFilter<"Entity"> | boolean;
    projectId?: Prisma.StringWithAggregatesFilter<"Entity"> | string;
};
export type EntityCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    projectId: string;
};
export type EntityUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type EntityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntityListRelationFilter = {
    every?: Prisma.EntityWhereInput;
    some?: Prisma.EntityWhereInput;
    none?: Prisma.EntityWhereInput;
};
export type EntityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EntityProjectIdNameCompoundUniqueInput = {
    projectId: string;
    name: string;
};
export type EntityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    logoPath?: Prisma.SortOrder;
    logoFormat?: Prisma.SortOrder;
    logoSvgContent?: Prisma.SortOrder;
    logoSourceUrl?: Prisma.SortOrder;
    logoFetchedAt?: Prisma.SortOrder;
    logoVerified?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
};
export type EntityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    logoPath?: Prisma.SortOrder;
    logoFormat?: Prisma.SortOrder;
    logoSvgContent?: Prisma.SortOrder;
    logoSourceUrl?: Prisma.SortOrder;
    logoFetchedAt?: Prisma.SortOrder;
    logoVerified?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
};
export type EntityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    logoPath?: Prisma.SortOrder;
    logoFormat?: Prisma.SortOrder;
    logoSvgContent?: Prisma.SortOrder;
    logoSourceUrl?: Prisma.SortOrder;
    logoFetchedAt?: Prisma.SortOrder;
    logoVerified?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
};
export type EntityScalarRelationFilter = {
    is?: Prisma.EntityWhereInput;
    isNot?: Prisma.EntityWhereInput;
};
export type EntityCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutProjectInput, Prisma.EntityUncheckedCreateWithoutProjectInput> | Prisma.EntityCreateWithoutProjectInput[] | Prisma.EntityUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutProjectInput | Prisma.EntityCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.EntityCreateManyProjectInputEnvelope;
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
};
export type EntityUncheckedCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutProjectInput, Prisma.EntityUncheckedCreateWithoutProjectInput> | Prisma.EntityCreateWithoutProjectInput[] | Prisma.EntityUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutProjectInput | Prisma.EntityCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.EntityCreateManyProjectInputEnvelope;
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
};
export type EntityUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutProjectInput, Prisma.EntityUncheckedCreateWithoutProjectInput> | Prisma.EntityCreateWithoutProjectInput[] | Prisma.EntityUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutProjectInput | Prisma.EntityCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.EntityUpsertWithWhereUniqueWithoutProjectInput | Prisma.EntityUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.EntityCreateManyProjectInputEnvelope;
    set?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    disconnect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    delete?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    update?: Prisma.EntityUpdateWithWhereUniqueWithoutProjectInput | Prisma.EntityUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.EntityUpdateManyWithWhereWithoutProjectInput | Prisma.EntityUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.EntityScalarWhereInput | Prisma.EntityScalarWhereInput[];
};
export type EntityUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutProjectInput, Prisma.EntityUncheckedCreateWithoutProjectInput> | Prisma.EntityCreateWithoutProjectInput[] | Prisma.EntityUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutProjectInput | Prisma.EntityCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.EntityUpsertWithWhereUniqueWithoutProjectInput | Prisma.EntityUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.EntityCreateManyProjectInputEnvelope;
    set?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    disconnect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    delete?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    update?: Prisma.EntityUpdateWithWhereUniqueWithoutProjectInput | Prisma.EntityUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.EntityUpdateManyWithWhereWithoutProjectInput | Prisma.EntityUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.EntityScalarWhereInput | Prisma.EntityScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type EntityCreateNestedOneWithoutAssertionsInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutAssertionsInput, Prisma.EntityUncheckedCreateWithoutAssertionsInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutAssertionsInput;
    connect?: Prisma.EntityWhereUniqueInput;
};
export type EntityUpdateOneRequiredWithoutAssertionsNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutAssertionsInput, Prisma.EntityUncheckedCreateWithoutAssertionsInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutAssertionsInput;
    upsert?: Prisma.EntityUpsertWithoutAssertionsInput;
    connect?: Prisma.EntityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EntityUpdateToOneWithWhereWithoutAssertionsInput, Prisma.EntityUpdateWithoutAssertionsInput>, Prisma.EntityUncheckedUpdateWithoutAssertionsInput>;
};
export type EntityCreateNestedOneWithoutExtractionsInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutExtractionsInput, Prisma.EntityUncheckedCreateWithoutExtractionsInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutExtractionsInput;
    connect?: Prisma.EntityWhereUniqueInput;
};
export type EntityUpdateOneRequiredWithoutExtractionsNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutExtractionsInput, Prisma.EntityUncheckedCreateWithoutExtractionsInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutExtractionsInput;
    upsert?: Prisma.EntityUpsertWithoutExtractionsInput;
    connect?: Prisma.EntityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EntityUpdateToOneWithWhereWithoutExtractionsInput, Prisma.EntityUpdateWithoutExtractionsInput>, Prisma.EntityUncheckedUpdateWithoutExtractionsInput>;
};
export type EntityCreateWithoutProjectInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutProjectInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutProjectInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutProjectInput, Prisma.EntityUncheckedCreateWithoutProjectInput>;
};
export type EntityCreateManyProjectInputEnvelope = {
    data: Prisma.EntityCreateManyProjectInput | Prisma.EntityCreateManyProjectInput[];
    skipDuplicates?: boolean;
};
export type EntityUpsertWithWhereUniqueWithoutProjectInput = {
    where: Prisma.EntityWhereUniqueInput;
    update: Prisma.XOR<Prisma.EntityUpdateWithoutProjectInput, Prisma.EntityUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.EntityCreateWithoutProjectInput, Prisma.EntityUncheckedCreateWithoutProjectInput>;
};
export type EntityUpdateWithWhereUniqueWithoutProjectInput = {
    where: Prisma.EntityWhereUniqueInput;
    data: Prisma.XOR<Prisma.EntityUpdateWithoutProjectInput, Prisma.EntityUncheckedUpdateWithoutProjectInput>;
};
export type EntityUpdateManyWithWhereWithoutProjectInput = {
    where: Prisma.EntityScalarWhereInput;
    data: Prisma.XOR<Prisma.EntityUpdateManyMutationInput, Prisma.EntityUncheckedUpdateManyWithoutProjectInput>;
};
export type EntityScalarWhereInput = {
    AND?: Prisma.EntityScalarWhereInput | Prisma.EntityScalarWhereInput[];
    OR?: Prisma.EntityScalarWhereInput[];
    NOT?: Prisma.EntityScalarWhereInput | Prisma.EntityScalarWhereInput[];
    id?: Prisma.StringFilter<"Entity"> | string;
    name?: Prisma.StringFilter<"Entity"> | string;
    description?: Prisma.StringNullableFilter<"Entity"> | string | null;
    entityType?: Prisma.StringNullableFilter<"Entity"> | string | null;
    url?: Prisma.StringNullableFilter<"Entity"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Entity"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Entity"> | Date | string;
    logoUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoPath?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFormat?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSvgContent?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSourceUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFetchedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    logoVerified?: Prisma.BoolFilter<"Entity"> | boolean;
    projectId?: Prisma.StringFilter<"Entity"> | string;
};
export type EntityCreateWithoutAssertionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutAssertionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    projectId: string;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutAssertionsInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutAssertionsInput, Prisma.EntityUncheckedCreateWithoutAssertionsInput>;
};
export type EntityUpsertWithoutAssertionsInput = {
    update: Prisma.XOR<Prisma.EntityUpdateWithoutAssertionsInput, Prisma.EntityUncheckedUpdateWithoutAssertionsInput>;
    create: Prisma.XOR<Prisma.EntityCreateWithoutAssertionsInput, Prisma.EntityUncheckedCreateWithoutAssertionsInput>;
    where?: Prisma.EntityWhereInput;
};
export type EntityUpdateToOneWithWhereWithoutAssertionsInput = {
    where?: Prisma.EntityWhereInput;
    data: Prisma.XOR<Prisma.EntityUpdateWithoutAssertionsInput, Prisma.EntityUncheckedUpdateWithoutAssertionsInput>;
};
export type EntityUpdateWithoutAssertionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutAssertionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityCreateWithoutExtractionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutExtractionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutExtractionsInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutExtractionsInput, Prisma.EntityUncheckedCreateWithoutExtractionsInput>;
};
export type EntityUpsertWithoutExtractionsInput = {
    update: Prisma.XOR<Prisma.EntityUpdateWithoutExtractionsInput, Prisma.EntityUncheckedUpdateWithoutExtractionsInput>;
    create: Prisma.XOR<Prisma.EntityCreateWithoutExtractionsInput, Prisma.EntityUncheckedCreateWithoutExtractionsInput>;
    where?: Prisma.EntityWhereInput;
};
export type EntityUpdateToOneWithWhereWithoutExtractionsInput = {
    where?: Prisma.EntityWhereInput;
    data: Prisma.XOR<Prisma.EntityUpdateWithoutExtractionsInput, Prisma.EntityUncheckedUpdateWithoutExtractionsInput>;
};
export type EntityUpdateWithoutExtractionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutExtractionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityCreateManyProjectInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
};
export type EntityUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateManyWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
/**
 * Count Type EntityCountOutputType
 */
export type EntityCountOutputType = {
    assertions: number;
    extractions: number;
};
export type EntityCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertions?: boolean | EntityCountOutputTypeCountAssertionsArgs;
    extractions?: boolean | EntityCountOutputTypeCountExtractionsArgs;
};
/**
 * EntityCountOutputType without action
 */
export type EntityCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityCountOutputType
     */
    select?: Prisma.EntityCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * EntityCountOutputType without action
 */
export type EntityCountOutputTypeCountAssertionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssertionWhereInput;
};
/**
 * EntityCountOutputType without action
 */
export type EntityCountOutputTypeCountExtractionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExtractionWhereInput;
};
export type EntitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    entityType?: boolean;
    url?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    logoUrl?: boolean;
    logoPath?: boolean;
    logoFormat?: boolean;
    logoSvgContent?: boolean;
    logoSourceUrl?: boolean;
    logoFetchedAt?: boolean;
    logoVerified?: boolean;
    projectId?: boolean;
    project?: boolean | Prisma.ResearchProjectDefaultArgs<ExtArgs>;
    assertions?: boolean | Prisma.Entity$assertionsArgs<ExtArgs>;
    extractions?: boolean | Prisma.Entity$extractionsArgs<ExtArgs>;
    _count?: boolean | Prisma.EntityCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entity"]>;
export type EntitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    entityType?: boolean;
    url?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    logoUrl?: boolean;
    logoPath?: boolean;
    logoFormat?: boolean;
    logoSvgContent?: boolean;
    logoSourceUrl?: boolean;
    logoFetchedAt?: boolean;
    logoVerified?: boolean;
    projectId?: boolean;
    project?: boolean | Prisma.ResearchProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entity"]>;
export type EntitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    entityType?: boolean;
    url?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    logoUrl?: boolean;
    logoPath?: boolean;
    logoFormat?: boolean;
    logoSvgContent?: boolean;
    logoSourceUrl?: boolean;
    logoFetchedAt?: boolean;
    logoVerified?: boolean;
    projectId?: boolean;
    project?: boolean | Prisma.ResearchProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["entity"]>;
export type EntitySelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    entityType?: boolean;
    url?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    logoUrl?: boolean;
    logoPath?: boolean;
    logoFormat?: boolean;
    logoSvgContent?: boolean;
    logoSourceUrl?: boolean;
    logoFetchedAt?: boolean;
    logoVerified?: boolean;
    projectId?: boolean;
};
export type EntityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "entityType" | "url" | "createdAt" | "updatedAt" | "logoUrl" | "logoPath" | "logoFormat" | "logoSvgContent" | "logoSourceUrl" | "logoFetchedAt" | "logoVerified" | "projectId", ExtArgs["result"]["entity"]>;
export type EntityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ResearchProjectDefaultArgs<ExtArgs>;
    assertions?: boolean | Prisma.Entity$assertionsArgs<ExtArgs>;
    extractions?: boolean | Prisma.Entity$extractionsArgs<ExtArgs>;
    _count?: boolean | Prisma.EntityCountOutputTypeDefaultArgs<ExtArgs>;
};
export type EntityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ResearchProjectDefaultArgs<ExtArgs>;
};
export type EntityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ResearchProjectDefaultArgs<ExtArgs>;
};
export type $EntityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Entity";
    objects: {
        project: Prisma.$ResearchProjectPayload<ExtArgs>;
        assertions: Prisma.$AssertionPayload<ExtArgs>[];
        extractions: Prisma.$ExtractionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        entityType: string | null;
        url: string | null;
        createdAt: Date;
        updatedAt: Date;
        logoUrl: string | null;
        logoPath: string | null;
        logoFormat: string | null;
        logoSvgContent: string | null;
        logoSourceUrl: string | null;
        logoFetchedAt: Date | null;
        logoVerified: boolean;
        projectId: string;
    }, ExtArgs["result"]["entity"]>;
    composites: {};
};
export type EntityGetPayload<S extends boolean | null | undefined | EntityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EntityPayload, S>;
export type EntityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EntityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EntityCountAggregateInputType | true;
};
export interface EntityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Entity'];
        meta: {
            name: 'Entity';
        };
    };
    /**
     * Find zero or one Entity that matches the filter.
     * @param {EntityFindUniqueArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntityFindUniqueArgs>(args: Prisma.SelectSubset<T, EntityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EntityClient<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Entity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntityFindUniqueOrThrowArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EntityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntityClient<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Entity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityFindFirstArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntityFindFirstArgs>(args?: Prisma.SelectSubset<T, EntityFindFirstArgs<ExtArgs>>): Prisma.Prisma__EntityClient<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Entity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityFindFirstOrThrowArgs} args - Arguments to find a Entity
     * @example
     * // Get one Entity
     * const entity = await prisma.entity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EntityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EntityClient<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Entities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Entities
     * const entities = await prisma.entity.findMany()
     *
     * // Get first 10 Entities
     * const entities = await prisma.entity.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const entityWithIdOnly = await prisma.entity.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EntityFindManyArgs>(args?: Prisma.SelectSubset<T, EntityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Entity.
     * @param {EntityCreateArgs} args - Arguments to create a Entity.
     * @example
     * // Create one Entity
     * const Entity = await prisma.entity.create({
     *   data: {
     *     // ... data to create a Entity
     *   }
     * })
     *
     */
    create<T extends EntityCreateArgs>(args: Prisma.SelectSubset<T, EntityCreateArgs<ExtArgs>>): Prisma.Prisma__EntityClient<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Entities.
     * @param {EntityCreateManyArgs} args - Arguments to create many Entities.
     * @example
     * // Create many Entities
     * const entity = await prisma.entity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EntityCreateManyArgs>(args?: Prisma.SelectSubset<T, EntityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Entities and returns the data saved in the database.
     * @param {EntityCreateManyAndReturnArgs} args - Arguments to create many Entities.
     * @example
     * // Create many Entities
     * const entity = await prisma.entity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Entities and only return the `id`
     * const entityWithIdOnly = await prisma.entity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EntityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EntityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Entity.
     * @param {EntityDeleteArgs} args - Arguments to delete one Entity.
     * @example
     * // Delete one Entity
     * const Entity = await prisma.entity.delete({
     *   where: {
     *     // ... filter to delete one Entity
     *   }
     * })
     *
     */
    delete<T extends EntityDeleteArgs>(args: Prisma.SelectSubset<T, EntityDeleteArgs<ExtArgs>>): Prisma.Prisma__EntityClient<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Entity.
     * @param {EntityUpdateArgs} args - Arguments to update one Entity.
     * @example
     * // Update one Entity
     * const entity = await prisma.entity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EntityUpdateArgs>(args: Prisma.SelectSubset<T, EntityUpdateArgs<ExtArgs>>): Prisma.Prisma__EntityClient<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Entities.
     * @param {EntityDeleteManyArgs} args - Arguments to filter Entities to delete.
     * @example
     * // Delete a few Entities
     * const { count } = await prisma.entity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EntityDeleteManyArgs>(args?: Prisma.SelectSubset<T, EntityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Entities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Entities
     * const entity = await prisma.entity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EntityUpdateManyArgs>(args: Prisma.SelectSubset<T, EntityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Entities and returns the data updated in the database.
     * @param {EntityUpdateManyAndReturnArgs} args - Arguments to update many Entities.
     * @example
     * // Update many Entities
     * const entity = await prisma.entity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Entities and only return the `id`
     * const entityWithIdOnly = await prisma.entity.updateManyAndReturn({
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
    updateManyAndReturn<T extends EntityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EntityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Entity.
     * @param {EntityUpsertArgs} args - Arguments to update or create a Entity.
     * @example
     * // Update or create a Entity
     * const entity = await prisma.entity.upsert({
     *   create: {
     *     // ... data to create a Entity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Entity we want to update
     *   }
     * })
     */
    upsert<T extends EntityUpsertArgs>(args: Prisma.SelectSubset<T, EntityUpsertArgs<ExtArgs>>): Prisma.Prisma__EntityClient<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Entities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityCountArgs} args - Arguments to filter Entities to count.
     * @example
     * // Count the number of Entities
     * const count = await prisma.entity.count({
     *   where: {
     *     // ... the filter for the Entities we want to count
     *   }
     * })
    **/
    count<T extends EntityCountArgs>(args?: Prisma.Subset<T, EntityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EntityCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Entity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EntityAggregateArgs>(args: Prisma.Subset<T, EntityAggregateArgs>): Prisma.PrismaPromise<GetEntityAggregateType<T>>;
    /**
     * Group by Entity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntityGroupByArgs} args - Group by arguments.
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
    groupBy<T extends EntityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EntityGroupByArgs['orderBy'];
    } : {
        orderBy?: EntityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EntityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Entity model
     */
    readonly fields: EntityFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Entity.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__EntityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    project<T extends Prisma.ResearchProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ResearchProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ResearchProjectClient<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assertions<T extends Prisma.Entity$assertionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$assertionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    extractions<T extends Prisma.Entity$extractionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$extractionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Entity model
 */
export interface EntityFieldRefs {
    readonly id: Prisma.FieldRef<"Entity", 'String'>;
    readonly name: Prisma.FieldRef<"Entity", 'String'>;
    readonly description: Prisma.FieldRef<"Entity", 'String'>;
    readonly entityType: Prisma.FieldRef<"Entity", 'String'>;
    readonly url: Prisma.FieldRef<"Entity", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Entity", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Entity", 'DateTime'>;
    readonly logoUrl: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoPath: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoFormat: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoSvgContent: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoSourceUrl: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoFetchedAt: Prisma.FieldRef<"Entity", 'DateTime'>;
    readonly logoVerified: Prisma.FieldRef<"Entity", 'Boolean'>;
    readonly projectId: Prisma.FieldRef<"Entity", 'String'>;
}
/**
 * Entity findUnique
 */
export type EntityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Entity to fetch.
     */
    where: Prisma.EntityWhereUniqueInput;
};
/**
 * Entity findUniqueOrThrow
 */
export type EntityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Entity to fetch.
     */
    where: Prisma.EntityWhereUniqueInput;
};
/**
 * Entity findFirst
 */
export type EntityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Entity to fetch.
     */
    where?: Prisma.EntityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Entities to fetch.
     */
    orderBy?: Prisma.EntityOrderByWithRelationInput | Prisma.EntityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Entities.
     */
    cursor?: Prisma.EntityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Entities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Entities.
     */
    distinct?: Prisma.EntityScalarFieldEnum | Prisma.EntityScalarFieldEnum[];
};
/**
 * Entity findFirstOrThrow
 */
export type EntityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Entity to fetch.
     */
    where?: Prisma.EntityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Entities to fetch.
     */
    orderBy?: Prisma.EntityOrderByWithRelationInput | Prisma.EntityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Entities.
     */
    cursor?: Prisma.EntityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Entities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Entities.
     */
    distinct?: Prisma.EntityScalarFieldEnum | Prisma.EntityScalarFieldEnum[];
};
/**
 * Entity findMany
 */
export type EntityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Entities to fetch.
     */
    where?: Prisma.EntityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Entities to fetch.
     */
    orderBy?: Prisma.EntityOrderByWithRelationInput | Prisma.EntityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Entities.
     */
    cursor?: Prisma.EntityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Entities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Entities.
     */
    skip?: number;
    distinct?: Prisma.EntityScalarFieldEnum | Prisma.EntityScalarFieldEnum[];
};
/**
 * Entity create
 */
export type EntityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Entity.
     */
    data: Prisma.XOR<Prisma.EntityCreateInput, Prisma.EntityUncheckedCreateInput>;
};
/**
 * Entity createMany
 */
export type EntityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Entities.
     */
    data: Prisma.EntityCreateManyInput | Prisma.EntityCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Entity createManyAndReturn
 */
export type EntityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: Prisma.EntitySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Entity
     */
    omit?: Prisma.EntityOmit<ExtArgs> | null;
    /**
     * The data used to create many Entities.
     */
    data: Prisma.EntityCreateManyInput | Prisma.EntityCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Entity update
 */
export type EntityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Entity.
     */
    data: Prisma.XOR<Prisma.EntityUpdateInput, Prisma.EntityUncheckedUpdateInput>;
    /**
     * Choose, which Entity to update.
     */
    where: Prisma.EntityWhereUniqueInput;
};
/**
 * Entity updateMany
 */
export type EntityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Entities.
     */
    data: Prisma.XOR<Prisma.EntityUpdateManyMutationInput, Prisma.EntityUncheckedUpdateManyInput>;
    /**
     * Filter which Entities to update
     */
    where?: Prisma.EntityWhereInput;
    /**
     * Limit how many Entities to update.
     */
    limit?: number;
};
/**
 * Entity updateManyAndReturn
 */
export type EntityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Entity
     */
    select?: Prisma.EntitySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Entity
     */
    omit?: Prisma.EntityOmit<ExtArgs> | null;
    /**
     * The data used to update Entities.
     */
    data: Prisma.XOR<Prisma.EntityUpdateManyMutationInput, Prisma.EntityUncheckedUpdateManyInput>;
    /**
     * Filter which Entities to update
     */
    where?: Prisma.EntityWhereInput;
    /**
     * Limit how many Entities to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Entity upsert
 */
export type EntityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Entity to update in case it exists.
     */
    where: Prisma.EntityWhereUniqueInput;
    /**
     * In case the Entity found by the `where` argument doesn't exist, create a new Entity with this data.
     */
    create: Prisma.XOR<Prisma.EntityCreateInput, Prisma.EntityUncheckedCreateInput>;
    /**
     * In case the Entity was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.EntityUpdateInput, Prisma.EntityUncheckedUpdateInput>;
};
/**
 * Entity delete
 */
export type EntityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Entity to delete.
     */
    where: Prisma.EntityWhereUniqueInput;
};
/**
 * Entity deleteMany
 */
export type EntityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Entities to delete
     */
    where?: Prisma.EntityWhereInput;
    /**
     * Limit how many Entities to delete.
     */
    limit?: number;
};
/**
 * Entity.assertions
 */
export type Entity$assertionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.AssertionWhereInput;
    orderBy?: Prisma.AssertionOrderByWithRelationInput | Prisma.AssertionOrderByWithRelationInput[];
    cursor?: Prisma.AssertionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssertionScalarFieldEnum | Prisma.AssertionScalarFieldEnum[];
};
/**
 * Entity.extractions
 */
export type Entity$extractionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: Prisma.ExtractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Extraction
     */
    omit?: Prisma.ExtractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ExtractionInclude<ExtArgs> | null;
    where?: Prisma.ExtractionWhereInput;
    orderBy?: Prisma.ExtractionOrderByWithRelationInput | Prisma.ExtractionOrderByWithRelationInput[];
    cursor?: Prisma.ExtractionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExtractionScalarFieldEnum | Prisma.ExtractionScalarFieldEnum[];
};
/**
 * Entity without action
 */
export type EntityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Entity.d.ts.map