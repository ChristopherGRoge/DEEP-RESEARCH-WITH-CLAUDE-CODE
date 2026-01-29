import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ResearchTask
 * An individual research task within a session
 */
export type ResearchTaskModel = runtime.Types.Result.DefaultSelection<Prisma.$ResearchTaskPayload>;
export type AggregateResearchTask = {
    _count: ResearchTaskCountAggregateOutputType | null;
    _min: ResearchTaskMinAggregateOutputType | null;
    _max: ResearchTaskMaxAggregateOutputType | null;
};
export type ResearchTaskMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    category: string | null;
    status: $Enums.ResearchTaskStatus | null;
    agentId: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    error: string | null;
};
export type ResearchTaskMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    category: string | null;
    status: $Enums.ResearchTaskStatus | null;
    agentId: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    error: string | null;
};
export type ResearchTaskCountAggregateOutputType = {
    id: number;
    sessionId: number;
    category: number;
    status: number;
    agentId: number;
    startedAt: number;
    completedAt: number;
    error: number;
    progress: number;
    results: number;
    _all: number;
};
export type ResearchTaskMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    category?: true;
    status?: true;
    agentId?: true;
    startedAt?: true;
    completedAt?: true;
    error?: true;
};
export type ResearchTaskMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    category?: true;
    status?: true;
    agentId?: true;
    startedAt?: true;
    completedAt?: true;
    error?: true;
};
export type ResearchTaskCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    category?: true;
    status?: true;
    agentId?: true;
    startedAt?: true;
    completedAt?: true;
    error?: true;
    progress?: true;
    results?: true;
    _all?: true;
};
export type ResearchTaskAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchTask to aggregate.
     */
    where?: Prisma.ResearchTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchTasks to fetch.
     */
    orderBy?: Prisma.ResearchTaskOrderByWithRelationInput | Prisma.ResearchTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ResearchTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchTasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ResearchTasks
    **/
    _count?: true | ResearchTaskCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ResearchTaskMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ResearchTaskMaxAggregateInputType;
};
export type GetResearchTaskAggregateType<T extends ResearchTaskAggregateArgs> = {
    [P in keyof T & keyof AggregateResearchTask]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateResearchTask[P]> : Prisma.GetScalarType<T[P], AggregateResearchTask[P]>;
};
export type ResearchTaskGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResearchTaskWhereInput;
    orderBy?: Prisma.ResearchTaskOrderByWithAggregationInput | Prisma.ResearchTaskOrderByWithAggregationInput[];
    by: Prisma.ResearchTaskScalarFieldEnum[] | Prisma.ResearchTaskScalarFieldEnum;
    having?: Prisma.ResearchTaskScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ResearchTaskCountAggregateInputType | true;
    _min?: ResearchTaskMinAggregateInputType;
    _max?: ResearchTaskMaxAggregateInputType;
};
export type ResearchTaskGroupByOutputType = {
    id: string;
    sessionId: string;
    category: string;
    status: $Enums.ResearchTaskStatus;
    agentId: string | null;
    startedAt: Date | null;
    completedAt: Date | null;
    error: string | null;
    progress: runtime.JsonValue | null;
    results: runtime.JsonValue | null;
    _count: ResearchTaskCountAggregateOutputType | null;
    _min: ResearchTaskMinAggregateOutputType | null;
    _max: ResearchTaskMaxAggregateOutputType | null;
};
type GetResearchTaskGroupByPayload<T extends ResearchTaskGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ResearchTaskGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ResearchTaskGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ResearchTaskGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ResearchTaskGroupByOutputType[P]>;
}>>;
export type ResearchTaskWhereInput = {
    AND?: Prisma.ResearchTaskWhereInput | Prisma.ResearchTaskWhereInput[];
    OR?: Prisma.ResearchTaskWhereInput[];
    NOT?: Prisma.ResearchTaskWhereInput | Prisma.ResearchTaskWhereInput[];
    id?: Prisma.StringFilter<"ResearchTask"> | string;
    sessionId?: Prisma.StringFilter<"ResearchTask"> | string;
    category?: Prisma.StringFilter<"ResearchTask"> | string;
    status?: Prisma.EnumResearchTaskStatusFilter<"ResearchTask"> | $Enums.ResearchTaskStatus;
    agentId?: Prisma.StringNullableFilter<"ResearchTask"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"ResearchTask"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"ResearchTask"> | Date | string | null;
    error?: Prisma.StringNullableFilter<"ResearchTask"> | string | null;
    progress?: Prisma.JsonNullableFilter<"ResearchTask">;
    results?: Prisma.JsonNullableFilter<"ResearchTask">;
    session?: Prisma.XOR<Prisma.ResearchSessionScalarRelationFilter, Prisma.ResearchSessionWhereInput>;
};
export type ResearchTaskOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    agentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    progress?: Prisma.SortOrderInput | Prisma.SortOrder;
    results?: Prisma.SortOrderInput | Prisma.SortOrder;
    session?: Prisma.ResearchSessionOrderByWithRelationInput;
};
export type ResearchTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ResearchTaskWhereInput | Prisma.ResearchTaskWhereInput[];
    OR?: Prisma.ResearchTaskWhereInput[];
    NOT?: Prisma.ResearchTaskWhereInput | Prisma.ResearchTaskWhereInput[];
    sessionId?: Prisma.StringFilter<"ResearchTask"> | string;
    category?: Prisma.StringFilter<"ResearchTask"> | string;
    status?: Prisma.EnumResearchTaskStatusFilter<"ResearchTask"> | $Enums.ResearchTaskStatus;
    agentId?: Prisma.StringNullableFilter<"ResearchTask"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"ResearchTask"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"ResearchTask"> | Date | string | null;
    error?: Prisma.StringNullableFilter<"ResearchTask"> | string | null;
    progress?: Prisma.JsonNullableFilter<"ResearchTask">;
    results?: Prisma.JsonNullableFilter<"ResearchTask">;
    session?: Prisma.XOR<Prisma.ResearchSessionScalarRelationFilter, Prisma.ResearchSessionWhereInput>;
}, "id">;
export type ResearchTaskOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    agentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    error?: Prisma.SortOrderInput | Prisma.SortOrder;
    progress?: Prisma.SortOrderInput | Prisma.SortOrder;
    results?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ResearchTaskCountOrderByAggregateInput;
    _max?: Prisma.ResearchTaskMaxOrderByAggregateInput;
    _min?: Prisma.ResearchTaskMinOrderByAggregateInput;
};
export type ResearchTaskScalarWhereWithAggregatesInput = {
    AND?: Prisma.ResearchTaskScalarWhereWithAggregatesInput | Prisma.ResearchTaskScalarWhereWithAggregatesInput[];
    OR?: Prisma.ResearchTaskScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ResearchTaskScalarWhereWithAggregatesInput | Prisma.ResearchTaskScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ResearchTask"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"ResearchTask"> | string;
    category?: Prisma.StringWithAggregatesFilter<"ResearchTask"> | string;
    status?: Prisma.EnumResearchTaskStatusWithAggregatesFilter<"ResearchTask"> | $Enums.ResearchTaskStatus;
    agentId?: Prisma.StringNullableWithAggregatesFilter<"ResearchTask"> | string | null;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ResearchTask"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ResearchTask"> | Date | string | null;
    error?: Prisma.StringNullableWithAggregatesFilter<"ResearchTask"> | string | null;
    progress?: Prisma.JsonNullableWithAggregatesFilter<"ResearchTask">;
    results?: Prisma.JsonNullableWithAggregatesFilter<"ResearchTask">;
};
export type ResearchTaskCreateInput = {
    id?: string;
    category: string;
    status?: $Enums.ResearchTaskStatus;
    agentId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    error?: string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    session: Prisma.ResearchSessionCreateNestedOneWithoutTasksInput;
};
export type ResearchTaskUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    category: string;
    status?: $Enums.ResearchTaskStatus;
    agentId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    error?: string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumResearchTaskStatusFieldUpdateOperationsInput | $Enums.ResearchTaskStatus;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    session?: Prisma.ResearchSessionUpdateOneRequiredWithoutTasksNestedInput;
};
export type ResearchTaskUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumResearchTaskStatusFieldUpdateOperationsInput | $Enums.ResearchTaskStatus;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskCreateManyInput = {
    id?: string;
    sessionId: string;
    category: string;
    status?: $Enums.ResearchTaskStatus;
    agentId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    error?: string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumResearchTaskStatusFieldUpdateOperationsInput | $Enums.ResearchTaskStatus;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumResearchTaskStatusFieldUpdateOperationsInput | $Enums.ResearchTaskStatus;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskListRelationFilter = {
    every?: Prisma.ResearchTaskWhereInput;
    some?: Prisma.ResearchTaskWhereInput;
    none?: Prisma.ResearchTaskWhereInput;
};
export type ResearchTaskOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ResearchTaskCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    agentId?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    results?: Prisma.SortOrder;
};
export type ResearchTaskMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    agentId?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
};
export type ResearchTaskMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    agentId?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    error?: Prisma.SortOrder;
};
export type ResearchTaskCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.ResearchTaskCreateWithoutSessionInput, Prisma.ResearchTaskUncheckedCreateWithoutSessionInput> | Prisma.ResearchTaskCreateWithoutSessionInput[] | Prisma.ResearchTaskUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.ResearchTaskCreateOrConnectWithoutSessionInput | Prisma.ResearchTaskCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.ResearchTaskCreateManySessionInputEnvelope;
    connect?: Prisma.ResearchTaskWhereUniqueInput | Prisma.ResearchTaskWhereUniqueInput[];
};
export type ResearchTaskUncheckedCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.ResearchTaskCreateWithoutSessionInput, Prisma.ResearchTaskUncheckedCreateWithoutSessionInput> | Prisma.ResearchTaskCreateWithoutSessionInput[] | Prisma.ResearchTaskUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.ResearchTaskCreateOrConnectWithoutSessionInput | Prisma.ResearchTaskCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.ResearchTaskCreateManySessionInputEnvelope;
    connect?: Prisma.ResearchTaskWhereUniqueInput | Prisma.ResearchTaskWhereUniqueInput[];
};
export type ResearchTaskUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.ResearchTaskCreateWithoutSessionInput, Prisma.ResearchTaskUncheckedCreateWithoutSessionInput> | Prisma.ResearchTaskCreateWithoutSessionInput[] | Prisma.ResearchTaskUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.ResearchTaskCreateOrConnectWithoutSessionInput | Prisma.ResearchTaskCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.ResearchTaskUpsertWithWhereUniqueWithoutSessionInput | Prisma.ResearchTaskUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.ResearchTaskCreateManySessionInputEnvelope;
    set?: Prisma.ResearchTaskWhereUniqueInput | Prisma.ResearchTaskWhereUniqueInput[];
    disconnect?: Prisma.ResearchTaskWhereUniqueInput | Prisma.ResearchTaskWhereUniqueInput[];
    delete?: Prisma.ResearchTaskWhereUniqueInput | Prisma.ResearchTaskWhereUniqueInput[];
    connect?: Prisma.ResearchTaskWhereUniqueInput | Prisma.ResearchTaskWhereUniqueInput[];
    update?: Prisma.ResearchTaskUpdateWithWhereUniqueWithoutSessionInput | Prisma.ResearchTaskUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.ResearchTaskUpdateManyWithWhereWithoutSessionInput | Prisma.ResearchTaskUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.ResearchTaskScalarWhereInput | Prisma.ResearchTaskScalarWhereInput[];
};
export type ResearchTaskUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.ResearchTaskCreateWithoutSessionInput, Prisma.ResearchTaskUncheckedCreateWithoutSessionInput> | Prisma.ResearchTaskCreateWithoutSessionInput[] | Prisma.ResearchTaskUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.ResearchTaskCreateOrConnectWithoutSessionInput | Prisma.ResearchTaskCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.ResearchTaskUpsertWithWhereUniqueWithoutSessionInput | Prisma.ResearchTaskUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.ResearchTaskCreateManySessionInputEnvelope;
    set?: Prisma.ResearchTaskWhereUniqueInput | Prisma.ResearchTaskWhereUniqueInput[];
    disconnect?: Prisma.ResearchTaskWhereUniqueInput | Prisma.ResearchTaskWhereUniqueInput[];
    delete?: Prisma.ResearchTaskWhereUniqueInput | Prisma.ResearchTaskWhereUniqueInput[];
    connect?: Prisma.ResearchTaskWhereUniqueInput | Prisma.ResearchTaskWhereUniqueInput[];
    update?: Prisma.ResearchTaskUpdateWithWhereUniqueWithoutSessionInput | Prisma.ResearchTaskUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.ResearchTaskUpdateManyWithWhereWithoutSessionInput | Prisma.ResearchTaskUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.ResearchTaskScalarWhereInput | Prisma.ResearchTaskScalarWhereInput[];
};
export type EnumResearchTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.ResearchTaskStatus;
};
export type ResearchTaskCreateWithoutSessionInput = {
    id?: string;
    category: string;
    status?: $Enums.ResearchTaskStatus;
    agentId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    error?: string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskUncheckedCreateWithoutSessionInput = {
    id?: string;
    category: string;
    status?: $Enums.ResearchTaskStatus;
    agentId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    error?: string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskCreateOrConnectWithoutSessionInput = {
    where: Prisma.ResearchTaskWhereUniqueInput;
    create: Prisma.XOR<Prisma.ResearchTaskCreateWithoutSessionInput, Prisma.ResearchTaskUncheckedCreateWithoutSessionInput>;
};
export type ResearchTaskCreateManySessionInputEnvelope = {
    data: Prisma.ResearchTaskCreateManySessionInput | Prisma.ResearchTaskCreateManySessionInput[];
};
export type ResearchTaskUpsertWithWhereUniqueWithoutSessionInput = {
    where: Prisma.ResearchTaskWhereUniqueInput;
    update: Prisma.XOR<Prisma.ResearchTaskUpdateWithoutSessionInput, Prisma.ResearchTaskUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.ResearchTaskCreateWithoutSessionInput, Prisma.ResearchTaskUncheckedCreateWithoutSessionInput>;
};
export type ResearchTaskUpdateWithWhereUniqueWithoutSessionInput = {
    where: Prisma.ResearchTaskWhereUniqueInput;
    data: Prisma.XOR<Prisma.ResearchTaskUpdateWithoutSessionInput, Prisma.ResearchTaskUncheckedUpdateWithoutSessionInput>;
};
export type ResearchTaskUpdateManyWithWhereWithoutSessionInput = {
    where: Prisma.ResearchTaskScalarWhereInput;
    data: Prisma.XOR<Prisma.ResearchTaskUpdateManyMutationInput, Prisma.ResearchTaskUncheckedUpdateManyWithoutSessionInput>;
};
export type ResearchTaskScalarWhereInput = {
    AND?: Prisma.ResearchTaskScalarWhereInput | Prisma.ResearchTaskScalarWhereInput[];
    OR?: Prisma.ResearchTaskScalarWhereInput[];
    NOT?: Prisma.ResearchTaskScalarWhereInput | Prisma.ResearchTaskScalarWhereInput[];
    id?: Prisma.StringFilter<"ResearchTask"> | string;
    sessionId?: Prisma.StringFilter<"ResearchTask"> | string;
    category?: Prisma.StringFilter<"ResearchTask"> | string;
    status?: Prisma.EnumResearchTaskStatusFilter<"ResearchTask"> | $Enums.ResearchTaskStatus;
    agentId?: Prisma.StringNullableFilter<"ResearchTask"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"ResearchTask"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"ResearchTask"> | Date | string | null;
    error?: Prisma.StringNullableFilter<"ResearchTask"> | string | null;
    progress?: Prisma.JsonNullableFilter<"ResearchTask">;
    results?: Prisma.JsonNullableFilter<"ResearchTask">;
};
export type ResearchTaskCreateManySessionInput = {
    id?: string;
    category: string;
    status?: $Enums.ResearchTaskStatus;
    agentId?: string | null;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    error?: string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumResearchTaskStatusFieldUpdateOperationsInput | $Enums.ResearchTaskStatus;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumResearchTaskStatusFieldUpdateOperationsInput | $Enums.ResearchTaskStatus;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskUncheckedUpdateManyWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumResearchTaskStatusFieldUpdateOperationsInput | $Enums.ResearchTaskStatus;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    error?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    progress?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    results?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type ResearchTaskSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    category?: boolean;
    status?: boolean;
    agentId?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    error?: boolean;
    progress?: boolean;
    results?: boolean;
    session?: boolean | Prisma.ResearchSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["researchTask"]>;
export type ResearchTaskSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    category?: boolean;
    status?: boolean;
    agentId?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    error?: boolean;
    progress?: boolean;
    results?: boolean;
    session?: boolean | Prisma.ResearchSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["researchTask"]>;
export type ResearchTaskSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    category?: boolean;
    status?: boolean;
    agentId?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    error?: boolean;
    progress?: boolean;
    results?: boolean;
    session?: boolean | Prisma.ResearchSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["researchTask"]>;
export type ResearchTaskSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    category?: boolean;
    status?: boolean;
    agentId?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    error?: boolean;
    progress?: boolean;
    results?: boolean;
};
export type ResearchTaskOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "category" | "status" | "agentId" | "startedAt" | "completedAt" | "error" | "progress" | "results", ExtArgs["result"]["researchTask"]>;
export type ResearchTaskInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.ResearchSessionDefaultArgs<ExtArgs>;
};
export type ResearchTaskIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.ResearchSessionDefaultArgs<ExtArgs>;
};
export type ResearchTaskIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.ResearchSessionDefaultArgs<ExtArgs>;
};
export type $ResearchTaskPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ResearchTask";
    objects: {
        session: Prisma.$ResearchSessionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        category: string;
        status: $Enums.ResearchTaskStatus;
        agentId: string | null;
        startedAt: Date | null;
        completedAt: Date | null;
        error: string | null;
        progress: runtime.JsonValue | null;
        results: runtime.JsonValue | null;
    }, ExtArgs["result"]["researchTask"]>;
    composites: {};
};
export type ResearchTaskGetPayload<S extends boolean | null | undefined | ResearchTaskDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload, S>;
export type ResearchTaskCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ResearchTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ResearchTaskCountAggregateInputType | true;
};
export interface ResearchTaskDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ResearchTask'];
        meta: {
            name: 'ResearchTask';
        };
    };
    /**
     * Find zero or one ResearchTask that matches the filter.
     * @param {ResearchTaskFindUniqueArgs} args - Arguments to find a ResearchTask
     * @example
     * // Get one ResearchTask
     * const researchTask = await prisma.researchTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResearchTaskFindUniqueArgs>(args: Prisma.SelectSubset<T, ResearchTaskFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ResearchTaskClient<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ResearchTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResearchTaskFindUniqueOrThrowArgs} args - Arguments to find a ResearchTask
     * @example
     * // Get one ResearchTask
     * const researchTask = await prisma.researchTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResearchTaskFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ResearchTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResearchTaskClient<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ResearchTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchTaskFindFirstArgs} args - Arguments to find a ResearchTask
     * @example
     * // Get one ResearchTask
     * const researchTask = await prisma.researchTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResearchTaskFindFirstArgs>(args?: Prisma.SelectSubset<T, ResearchTaskFindFirstArgs<ExtArgs>>): Prisma.Prisma__ResearchTaskClient<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ResearchTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchTaskFindFirstOrThrowArgs} args - Arguments to find a ResearchTask
     * @example
     * // Get one ResearchTask
     * const researchTask = await prisma.researchTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResearchTaskFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ResearchTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResearchTaskClient<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ResearchTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResearchTasks
     * const researchTasks = await prisma.researchTask.findMany()
     *
     * // Get first 10 ResearchTasks
     * const researchTasks = await prisma.researchTask.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const researchTaskWithIdOnly = await prisma.researchTask.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ResearchTaskFindManyArgs>(args?: Prisma.SelectSubset<T, ResearchTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ResearchTask.
     * @param {ResearchTaskCreateArgs} args - Arguments to create a ResearchTask.
     * @example
     * // Create one ResearchTask
     * const ResearchTask = await prisma.researchTask.create({
     *   data: {
     *     // ... data to create a ResearchTask
     *   }
     * })
     *
     */
    create<T extends ResearchTaskCreateArgs>(args: Prisma.SelectSubset<T, ResearchTaskCreateArgs<ExtArgs>>): Prisma.Prisma__ResearchTaskClient<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ResearchTasks.
     * @param {ResearchTaskCreateManyArgs} args - Arguments to create many ResearchTasks.
     * @example
     * // Create many ResearchTasks
     * const researchTask = await prisma.researchTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ResearchTaskCreateManyArgs>(args?: Prisma.SelectSubset<T, ResearchTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ResearchTasks and returns the data saved in the database.
     * @param {ResearchTaskCreateManyAndReturnArgs} args - Arguments to create many ResearchTasks.
     * @example
     * // Create many ResearchTasks
     * const researchTask = await prisma.researchTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ResearchTasks and only return the `id`
     * const researchTaskWithIdOnly = await prisma.researchTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ResearchTaskCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ResearchTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ResearchTask.
     * @param {ResearchTaskDeleteArgs} args - Arguments to delete one ResearchTask.
     * @example
     * // Delete one ResearchTask
     * const ResearchTask = await prisma.researchTask.delete({
     *   where: {
     *     // ... filter to delete one ResearchTask
     *   }
     * })
     *
     */
    delete<T extends ResearchTaskDeleteArgs>(args: Prisma.SelectSubset<T, ResearchTaskDeleteArgs<ExtArgs>>): Prisma.Prisma__ResearchTaskClient<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ResearchTask.
     * @param {ResearchTaskUpdateArgs} args - Arguments to update one ResearchTask.
     * @example
     * // Update one ResearchTask
     * const researchTask = await prisma.researchTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ResearchTaskUpdateArgs>(args: Prisma.SelectSubset<T, ResearchTaskUpdateArgs<ExtArgs>>): Prisma.Prisma__ResearchTaskClient<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ResearchTasks.
     * @param {ResearchTaskDeleteManyArgs} args - Arguments to filter ResearchTasks to delete.
     * @example
     * // Delete a few ResearchTasks
     * const { count } = await prisma.researchTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ResearchTaskDeleteManyArgs>(args?: Prisma.SelectSubset<T, ResearchTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ResearchTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResearchTasks
     * const researchTask = await prisma.researchTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ResearchTaskUpdateManyArgs>(args: Prisma.SelectSubset<T, ResearchTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ResearchTasks and returns the data updated in the database.
     * @param {ResearchTaskUpdateManyAndReturnArgs} args - Arguments to update many ResearchTasks.
     * @example
     * // Update many ResearchTasks
     * const researchTask = await prisma.researchTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ResearchTasks and only return the `id`
     * const researchTaskWithIdOnly = await prisma.researchTask.updateManyAndReturn({
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
    updateManyAndReturn<T extends ResearchTaskUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ResearchTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ResearchTask.
     * @param {ResearchTaskUpsertArgs} args - Arguments to update or create a ResearchTask.
     * @example
     * // Update or create a ResearchTask
     * const researchTask = await prisma.researchTask.upsert({
     *   create: {
     *     // ... data to create a ResearchTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResearchTask we want to update
     *   }
     * })
     */
    upsert<T extends ResearchTaskUpsertArgs>(args: Prisma.SelectSubset<T, ResearchTaskUpsertArgs<ExtArgs>>): Prisma.Prisma__ResearchTaskClient<runtime.Types.Result.GetResult<Prisma.$ResearchTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ResearchTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchTaskCountArgs} args - Arguments to filter ResearchTasks to count.
     * @example
     * // Count the number of ResearchTasks
     * const count = await prisma.researchTask.count({
     *   where: {
     *     // ... the filter for the ResearchTasks we want to count
     *   }
     * })
    **/
    count<T extends ResearchTaskCountArgs>(args?: Prisma.Subset<T, ResearchTaskCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ResearchTaskCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ResearchTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResearchTaskAggregateArgs>(args: Prisma.Subset<T, ResearchTaskAggregateArgs>): Prisma.PrismaPromise<GetResearchTaskAggregateType<T>>;
    /**
     * Group by ResearchTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchTaskGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ResearchTaskGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ResearchTaskGroupByArgs['orderBy'];
    } : {
        orderBy?: ResearchTaskGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ResearchTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResearchTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ResearchTask model
     */
    readonly fields: ResearchTaskFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ResearchTask.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ResearchTaskClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.ResearchSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ResearchSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__ResearchSessionClient<runtime.Types.Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ResearchTask model
 */
export interface ResearchTaskFieldRefs {
    readonly id: Prisma.FieldRef<"ResearchTask", 'String'>;
    readonly sessionId: Prisma.FieldRef<"ResearchTask", 'String'>;
    readonly category: Prisma.FieldRef<"ResearchTask", 'String'>;
    readonly status: Prisma.FieldRef<"ResearchTask", 'ResearchTaskStatus'>;
    readonly agentId: Prisma.FieldRef<"ResearchTask", 'String'>;
    readonly startedAt: Prisma.FieldRef<"ResearchTask", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"ResearchTask", 'DateTime'>;
    readonly error: Prisma.FieldRef<"ResearchTask", 'String'>;
    readonly progress: Prisma.FieldRef<"ResearchTask", 'Json'>;
    readonly results: Prisma.FieldRef<"ResearchTask", 'Json'>;
}
/**
 * ResearchTask findUnique
 */
export type ResearchTaskFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskInclude<ExtArgs> | null;
    /**
     * Filter, which ResearchTask to fetch.
     */
    where: Prisma.ResearchTaskWhereUniqueInput;
};
/**
 * ResearchTask findUniqueOrThrow
 */
export type ResearchTaskFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskInclude<ExtArgs> | null;
    /**
     * Filter, which ResearchTask to fetch.
     */
    where: Prisma.ResearchTaskWhereUniqueInput;
};
/**
 * ResearchTask findFirst
 */
export type ResearchTaskFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskInclude<ExtArgs> | null;
    /**
     * Filter, which ResearchTask to fetch.
     */
    where?: Prisma.ResearchTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchTasks to fetch.
     */
    orderBy?: Prisma.ResearchTaskOrderByWithRelationInput | Prisma.ResearchTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ResearchTasks.
     */
    cursor?: Prisma.ResearchTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchTasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResearchTasks.
     */
    distinct?: Prisma.ResearchTaskScalarFieldEnum | Prisma.ResearchTaskScalarFieldEnum[];
};
/**
 * ResearchTask findFirstOrThrow
 */
export type ResearchTaskFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskInclude<ExtArgs> | null;
    /**
     * Filter, which ResearchTask to fetch.
     */
    where?: Prisma.ResearchTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchTasks to fetch.
     */
    orderBy?: Prisma.ResearchTaskOrderByWithRelationInput | Prisma.ResearchTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ResearchTasks.
     */
    cursor?: Prisma.ResearchTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchTasks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResearchTasks.
     */
    distinct?: Prisma.ResearchTaskScalarFieldEnum | Prisma.ResearchTaskScalarFieldEnum[];
};
/**
 * ResearchTask findMany
 */
export type ResearchTaskFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskInclude<ExtArgs> | null;
    /**
     * Filter, which ResearchTasks to fetch.
     */
    where?: Prisma.ResearchTaskWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchTasks to fetch.
     */
    orderBy?: Prisma.ResearchTaskOrderByWithRelationInput | Prisma.ResearchTaskOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ResearchTasks.
     */
    cursor?: Prisma.ResearchTaskWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchTasks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchTasks.
     */
    skip?: number;
    distinct?: Prisma.ResearchTaskScalarFieldEnum | Prisma.ResearchTaskScalarFieldEnum[];
};
/**
 * ResearchTask create
 */
export type ResearchTaskCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskInclude<ExtArgs> | null;
    /**
     * The data needed to create a ResearchTask.
     */
    data: Prisma.XOR<Prisma.ResearchTaskCreateInput, Prisma.ResearchTaskUncheckedCreateInput>;
};
/**
 * ResearchTask createMany
 */
export type ResearchTaskCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResearchTasks.
     */
    data: Prisma.ResearchTaskCreateManyInput | Prisma.ResearchTaskCreateManyInput[];
};
/**
 * ResearchTask createManyAndReturn
 */
export type ResearchTaskCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * The data used to create many ResearchTasks.
     */
    data: Prisma.ResearchTaskCreateManyInput | Prisma.ResearchTaskCreateManyInput[];
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ResearchTask update
 */
export type ResearchTaskUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskInclude<ExtArgs> | null;
    /**
     * The data needed to update a ResearchTask.
     */
    data: Prisma.XOR<Prisma.ResearchTaskUpdateInput, Prisma.ResearchTaskUncheckedUpdateInput>;
    /**
     * Choose, which ResearchTask to update.
     */
    where: Prisma.ResearchTaskWhereUniqueInput;
};
/**
 * ResearchTask updateMany
 */
export type ResearchTaskUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ResearchTasks.
     */
    data: Prisma.XOR<Prisma.ResearchTaskUpdateManyMutationInput, Prisma.ResearchTaskUncheckedUpdateManyInput>;
    /**
     * Filter which ResearchTasks to update
     */
    where?: Prisma.ResearchTaskWhereInput;
    /**
     * Limit how many ResearchTasks to update.
     */
    limit?: number;
};
/**
 * ResearchTask updateManyAndReturn
 */
export type ResearchTaskUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * The data used to update ResearchTasks.
     */
    data: Prisma.XOR<Prisma.ResearchTaskUpdateManyMutationInput, Prisma.ResearchTaskUncheckedUpdateManyInput>;
    /**
     * Filter which ResearchTasks to update
     */
    where?: Prisma.ResearchTaskWhereInput;
    /**
     * Limit how many ResearchTasks to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ResearchTask upsert
 */
export type ResearchTaskUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskInclude<ExtArgs> | null;
    /**
     * The filter to search for the ResearchTask to update in case it exists.
     */
    where: Prisma.ResearchTaskWhereUniqueInput;
    /**
     * In case the ResearchTask found by the `where` argument doesn't exist, create a new ResearchTask with this data.
     */
    create: Prisma.XOR<Prisma.ResearchTaskCreateInput, Prisma.ResearchTaskUncheckedCreateInput>;
    /**
     * In case the ResearchTask was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ResearchTaskUpdateInput, Prisma.ResearchTaskUncheckedUpdateInput>;
};
/**
 * ResearchTask delete
 */
export type ResearchTaskDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskInclude<ExtArgs> | null;
    /**
     * Filter which ResearchTask to delete.
     */
    where: Prisma.ResearchTaskWhereUniqueInput;
};
/**
 * ResearchTask deleteMany
 */
export type ResearchTaskDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchTasks to delete
     */
    where?: Prisma.ResearchTaskWhereInput;
    /**
     * Limit how many ResearchTasks to delete.
     */
    limit?: number;
};
/**
 * ResearchTask without action
 */
export type ResearchTaskDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchTask
     */
    select?: Prisma.ResearchTaskSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchTask
     */
    omit?: Prisma.ResearchTaskOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchTaskInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ResearchTask.d.ts.map