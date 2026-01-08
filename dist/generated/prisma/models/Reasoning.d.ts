import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Reasoning
 * Reasoning supporting an assertion
 */
export type ReasoningModel = runtime.Types.Result.DefaultSelection<Prisma.$ReasoningPayload>;
export type AggregateReasoning = {
    _count: ReasoningCountAggregateOutputType | null;
    _min: ReasoningMinAggregateOutputType | null;
    _max: ReasoningMaxAggregateOutputType | null;
};
export type ReasoningMinAggregateOutputType = {
    id: string | null;
    content: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    assertionId: string | null;
};
export type ReasoningMaxAggregateOutputType = {
    id: string | null;
    content: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    assertionId: string | null;
};
export type ReasoningCountAggregateOutputType = {
    id: number;
    content: number;
    createdAt: number;
    updatedAt: number;
    assertionId: number;
    _all: number;
};
export type ReasoningMinAggregateInputType = {
    id?: true;
    content?: true;
    createdAt?: true;
    updatedAt?: true;
    assertionId?: true;
};
export type ReasoningMaxAggregateInputType = {
    id?: true;
    content?: true;
    createdAt?: true;
    updatedAt?: true;
    assertionId?: true;
};
export type ReasoningCountAggregateInputType = {
    id?: true;
    content?: true;
    createdAt?: true;
    updatedAt?: true;
    assertionId?: true;
    _all?: true;
};
export type ReasoningAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Reasoning to aggregate.
     */
    where?: Prisma.ReasoningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Reasonings to fetch.
     */
    orderBy?: Prisma.ReasoningOrderByWithRelationInput | Prisma.ReasoningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ReasoningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Reasonings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Reasonings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Reasonings
    **/
    _count?: true | ReasoningCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ReasoningMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ReasoningMaxAggregateInputType;
};
export type GetReasoningAggregateType<T extends ReasoningAggregateArgs> = {
    [P in keyof T & keyof AggregateReasoning]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReasoning[P]> : Prisma.GetScalarType<T[P], AggregateReasoning[P]>;
};
export type ReasoningGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReasoningWhereInput;
    orderBy?: Prisma.ReasoningOrderByWithAggregationInput | Prisma.ReasoningOrderByWithAggregationInput[];
    by: Prisma.ReasoningScalarFieldEnum[] | Prisma.ReasoningScalarFieldEnum;
    having?: Prisma.ReasoningScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReasoningCountAggregateInputType | true;
    _min?: ReasoningMinAggregateInputType;
    _max?: ReasoningMaxAggregateInputType;
};
export type ReasoningGroupByOutputType = {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    assertionId: string;
    _count: ReasoningCountAggregateOutputType | null;
    _min: ReasoningMinAggregateOutputType | null;
    _max: ReasoningMaxAggregateOutputType | null;
};
type GetReasoningGroupByPayload<T extends ReasoningGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReasoningGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReasoningGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReasoningGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReasoningGroupByOutputType[P]>;
}>>;
export type ReasoningWhereInput = {
    AND?: Prisma.ReasoningWhereInput | Prisma.ReasoningWhereInput[];
    OR?: Prisma.ReasoningWhereInput[];
    NOT?: Prisma.ReasoningWhereInput | Prisma.ReasoningWhereInput[];
    id?: Prisma.StringFilter<"Reasoning"> | string;
    content?: Prisma.StringFilter<"Reasoning"> | string;
    createdAt?: Prisma.DateTimeFilter<"Reasoning"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Reasoning"> | Date | string;
    assertionId?: Prisma.StringFilter<"Reasoning"> | string;
    assertion?: Prisma.XOR<Prisma.AssertionScalarRelationFilter, Prisma.AssertionWhereInput>;
};
export type ReasoningOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    assertion?: Prisma.AssertionOrderByWithRelationInput;
};
export type ReasoningWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReasoningWhereInput | Prisma.ReasoningWhereInput[];
    OR?: Prisma.ReasoningWhereInput[];
    NOT?: Prisma.ReasoningWhereInput | Prisma.ReasoningWhereInput[];
    content?: Prisma.StringFilter<"Reasoning"> | string;
    createdAt?: Prisma.DateTimeFilter<"Reasoning"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Reasoning"> | Date | string;
    assertionId?: Prisma.StringFilter<"Reasoning"> | string;
    assertion?: Prisma.XOR<Prisma.AssertionScalarRelationFilter, Prisma.AssertionWhereInput>;
}, "id">;
export type ReasoningOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
    _count?: Prisma.ReasoningCountOrderByAggregateInput;
    _max?: Prisma.ReasoningMaxOrderByAggregateInput;
    _min?: Prisma.ReasoningMinOrderByAggregateInput;
};
export type ReasoningScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReasoningScalarWhereWithAggregatesInput | Prisma.ReasoningScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReasoningScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReasoningScalarWhereWithAggregatesInput | Prisma.ReasoningScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Reasoning"> | string;
    content?: Prisma.StringWithAggregatesFilter<"Reasoning"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Reasoning"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Reasoning"> | Date | string;
    assertionId?: Prisma.StringWithAggregatesFilter<"Reasoning"> | string;
};
export type ReasoningCreateInput = {
    id?: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assertion: Prisma.AssertionCreateNestedOneWithoutReasoningInput;
};
export type ReasoningUncheckedCreateInput = {
    id?: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assertionId: string;
};
export type ReasoningUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assertion?: Prisma.AssertionUpdateOneRequiredWithoutReasoningNestedInput;
};
export type ReasoningUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReasoningCreateManyInput = {
    id?: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assertionId: string;
};
export type ReasoningUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReasoningUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assertionId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReasoningListRelationFilter = {
    every?: Prisma.ReasoningWhereInput;
    some?: Prisma.ReasoningWhereInput;
    none?: Prisma.ReasoningWhereInput;
};
export type ReasoningOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReasoningCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
};
export type ReasoningMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
};
export type ReasoningMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    assertionId?: Prisma.SortOrder;
};
export type ReasoningCreateNestedManyWithoutAssertionInput = {
    create?: Prisma.XOR<Prisma.ReasoningCreateWithoutAssertionInput, Prisma.ReasoningUncheckedCreateWithoutAssertionInput> | Prisma.ReasoningCreateWithoutAssertionInput[] | Prisma.ReasoningUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.ReasoningCreateOrConnectWithoutAssertionInput | Prisma.ReasoningCreateOrConnectWithoutAssertionInput[];
    createMany?: Prisma.ReasoningCreateManyAssertionInputEnvelope;
    connect?: Prisma.ReasoningWhereUniqueInput | Prisma.ReasoningWhereUniqueInput[];
};
export type ReasoningUncheckedCreateNestedManyWithoutAssertionInput = {
    create?: Prisma.XOR<Prisma.ReasoningCreateWithoutAssertionInput, Prisma.ReasoningUncheckedCreateWithoutAssertionInput> | Prisma.ReasoningCreateWithoutAssertionInput[] | Prisma.ReasoningUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.ReasoningCreateOrConnectWithoutAssertionInput | Prisma.ReasoningCreateOrConnectWithoutAssertionInput[];
    createMany?: Prisma.ReasoningCreateManyAssertionInputEnvelope;
    connect?: Prisma.ReasoningWhereUniqueInput | Prisma.ReasoningWhereUniqueInput[];
};
export type ReasoningUpdateManyWithoutAssertionNestedInput = {
    create?: Prisma.XOR<Prisma.ReasoningCreateWithoutAssertionInput, Prisma.ReasoningUncheckedCreateWithoutAssertionInput> | Prisma.ReasoningCreateWithoutAssertionInput[] | Prisma.ReasoningUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.ReasoningCreateOrConnectWithoutAssertionInput | Prisma.ReasoningCreateOrConnectWithoutAssertionInput[];
    upsert?: Prisma.ReasoningUpsertWithWhereUniqueWithoutAssertionInput | Prisma.ReasoningUpsertWithWhereUniqueWithoutAssertionInput[];
    createMany?: Prisma.ReasoningCreateManyAssertionInputEnvelope;
    set?: Prisma.ReasoningWhereUniqueInput | Prisma.ReasoningWhereUniqueInput[];
    disconnect?: Prisma.ReasoningWhereUniqueInput | Prisma.ReasoningWhereUniqueInput[];
    delete?: Prisma.ReasoningWhereUniqueInput | Prisma.ReasoningWhereUniqueInput[];
    connect?: Prisma.ReasoningWhereUniqueInput | Prisma.ReasoningWhereUniqueInput[];
    update?: Prisma.ReasoningUpdateWithWhereUniqueWithoutAssertionInput | Prisma.ReasoningUpdateWithWhereUniqueWithoutAssertionInput[];
    updateMany?: Prisma.ReasoningUpdateManyWithWhereWithoutAssertionInput | Prisma.ReasoningUpdateManyWithWhereWithoutAssertionInput[];
    deleteMany?: Prisma.ReasoningScalarWhereInput | Prisma.ReasoningScalarWhereInput[];
};
export type ReasoningUncheckedUpdateManyWithoutAssertionNestedInput = {
    create?: Prisma.XOR<Prisma.ReasoningCreateWithoutAssertionInput, Prisma.ReasoningUncheckedCreateWithoutAssertionInput> | Prisma.ReasoningCreateWithoutAssertionInput[] | Prisma.ReasoningUncheckedCreateWithoutAssertionInput[];
    connectOrCreate?: Prisma.ReasoningCreateOrConnectWithoutAssertionInput | Prisma.ReasoningCreateOrConnectWithoutAssertionInput[];
    upsert?: Prisma.ReasoningUpsertWithWhereUniqueWithoutAssertionInput | Prisma.ReasoningUpsertWithWhereUniqueWithoutAssertionInput[];
    createMany?: Prisma.ReasoningCreateManyAssertionInputEnvelope;
    set?: Prisma.ReasoningWhereUniqueInput | Prisma.ReasoningWhereUniqueInput[];
    disconnect?: Prisma.ReasoningWhereUniqueInput | Prisma.ReasoningWhereUniqueInput[];
    delete?: Prisma.ReasoningWhereUniqueInput | Prisma.ReasoningWhereUniqueInput[];
    connect?: Prisma.ReasoningWhereUniqueInput | Prisma.ReasoningWhereUniqueInput[];
    update?: Prisma.ReasoningUpdateWithWhereUniqueWithoutAssertionInput | Prisma.ReasoningUpdateWithWhereUniqueWithoutAssertionInput[];
    updateMany?: Prisma.ReasoningUpdateManyWithWhereWithoutAssertionInput | Prisma.ReasoningUpdateManyWithWhereWithoutAssertionInput[];
    deleteMany?: Prisma.ReasoningScalarWhereInput | Prisma.ReasoningScalarWhereInput[];
};
export type ReasoningCreateWithoutAssertionInput = {
    id?: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReasoningUncheckedCreateWithoutAssertionInput = {
    id?: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReasoningCreateOrConnectWithoutAssertionInput = {
    where: Prisma.ReasoningWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReasoningCreateWithoutAssertionInput, Prisma.ReasoningUncheckedCreateWithoutAssertionInput>;
};
export type ReasoningCreateManyAssertionInputEnvelope = {
    data: Prisma.ReasoningCreateManyAssertionInput | Prisma.ReasoningCreateManyAssertionInput[];
    skipDuplicates?: boolean;
};
export type ReasoningUpsertWithWhereUniqueWithoutAssertionInput = {
    where: Prisma.ReasoningWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReasoningUpdateWithoutAssertionInput, Prisma.ReasoningUncheckedUpdateWithoutAssertionInput>;
    create: Prisma.XOR<Prisma.ReasoningCreateWithoutAssertionInput, Prisma.ReasoningUncheckedCreateWithoutAssertionInput>;
};
export type ReasoningUpdateWithWhereUniqueWithoutAssertionInput = {
    where: Prisma.ReasoningWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReasoningUpdateWithoutAssertionInput, Prisma.ReasoningUncheckedUpdateWithoutAssertionInput>;
};
export type ReasoningUpdateManyWithWhereWithoutAssertionInput = {
    where: Prisma.ReasoningScalarWhereInput;
    data: Prisma.XOR<Prisma.ReasoningUpdateManyMutationInput, Prisma.ReasoningUncheckedUpdateManyWithoutAssertionInput>;
};
export type ReasoningScalarWhereInput = {
    AND?: Prisma.ReasoningScalarWhereInput | Prisma.ReasoningScalarWhereInput[];
    OR?: Prisma.ReasoningScalarWhereInput[];
    NOT?: Prisma.ReasoningScalarWhereInput | Prisma.ReasoningScalarWhereInput[];
    id?: Prisma.StringFilter<"Reasoning"> | string;
    content?: Prisma.StringFilter<"Reasoning"> | string;
    createdAt?: Prisma.DateTimeFilter<"Reasoning"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Reasoning"> | Date | string;
    assertionId?: Prisma.StringFilter<"Reasoning"> | string;
};
export type ReasoningCreateManyAssertionInput = {
    id?: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReasoningUpdateWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReasoningUncheckedUpdateWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReasoningUncheckedUpdateManyWithoutAssertionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReasoningSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    assertionId?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reasoning"]>;
export type ReasoningSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    assertionId?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reasoning"]>;
export type ReasoningSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    content?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    assertionId?: boolean;
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["reasoning"]>;
export type ReasoningSelectScalar = {
    id?: boolean;
    content?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    assertionId?: boolean;
};
export type ReasoningOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "content" | "createdAt" | "updatedAt" | "assertionId", ExtArgs["result"]["reasoning"]>;
export type ReasoningInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
};
export type ReasoningIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
};
export type ReasoningIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertion?: boolean | Prisma.AssertionDefaultArgs<ExtArgs>;
};
export type $ReasoningPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Reasoning";
    objects: {
        assertion: Prisma.$AssertionPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        assertionId: string;
    }, ExtArgs["result"]["reasoning"]>;
    composites: {};
};
export type ReasoningGetPayload<S extends boolean | null | undefined | ReasoningDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReasoningPayload, S>;
export type ReasoningCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReasoningFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReasoningCountAggregateInputType | true;
};
export interface ReasoningDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Reasoning'];
        meta: {
            name: 'Reasoning';
        };
    };
    /**
     * Find zero or one Reasoning that matches the filter.
     * @param {ReasoningFindUniqueArgs} args - Arguments to find a Reasoning
     * @example
     * // Get one Reasoning
     * const reasoning = await prisma.reasoning.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReasoningFindUniqueArgs>(args: Prisma.SelectSubset<T, ReasoningFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReasoningClient<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Reasoning that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReasoningFindUniqueOrThrowArgs} args - Arguments to find a Reasoning
     * @example
     * // Get one Reasoning
     * const reasoning = await prisma.reasoning.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReasoningFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReasoningFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReasoningClient<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Reasoning that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReasoningFindFirstArgs} args - Arguments to find a Reasoning
     * @example
     * // Get one Reasoning
     * const reasoning = await prisma.reasoning.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReasoningFindFirstArgs>(args?: Prisma.SelectSubset<T, ReasoningFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReasoningClient<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Reasoning that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReasoningFindFirstOrThrowArgs} args - Arguments to find a Reasoning
     * @example
     * // Get one Reasoning
     * const reasoning = await prisma.reasoning.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReasoningFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReasoningFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReasoningClient<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Reasonings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReasoningFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reasonings
     * const reasonings = await prisma.reasoning.findMany()
     *
     * // Get first 10 Reasonings
     * const reasonings = await prisma.reasoning.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const reasoningWithIdOnly = await prisma.reasoning.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ReasoningFindManyArgs>(args?: Prisma.SelectSubset<T, ReasoningFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Reasoning.
     * @param {ReasoningCreateArgs} args - Arguments to create a Reasoning.
     * @example
     * // Create one Reasoning
     * const Reasoning = await prisma.reasoning.create({
     *   data: {
     *     // ... data to create a Reasoning
     *   }
     * })
     *
     */
    create<T extends ReasoningCreateArgs>(args: Prisma.SelectSubset<T, ReasoningCreateArgs<ExtArgs>>): Prisma.Prisma__ReasoningClient<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Reasonings.
     * @param {ReasoningCreateManyArgs} args - Arguments to create many Reasonings.
     * @example
     * // Create many Reasonings
     * const reasoning = await prisma.reasoning.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ReasoningCreateManyArgs>(args?: Prisma.SelectSubset<T, ReasoningCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Reasonings and returns the data saved in the database.
     * @param {ReasoningCreateManyAndReturnArgs} args - Arguments to create many Reasonings.
     * @example
     * // Create many Reasonings
     * const reasoning = await prisma.reasoning.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Reasonings and only return the `id`
     * const reasoningWithIdOnly = await prisma.reasoning.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ReasoningCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReasoningCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Reasoning.
     * @param {ReasoningDeleteArgs} args - Arguments to delete one Reasoning.
     * @example
     * // Delete one Reasoning
     * const Reasoning = await prisma.reasoning.delete({
     *   where: {
     *     // ... filter to delete one Reasoning
     *   }
     * })
     *
     */
    delete<T extends ReasoningDeleteArgs>(args: Prisma.SelectSubset<T, ReasoningDeleteArgs<ExtArgs>>): Prisma.Prisma__ReasoningClient<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Reasoning.
     * @param {ReasoningUpdateArgs} args - Arguments to update one Reasoning.
     * @example
     * // Update one Reasoning
     * const reasoning = await prisma.reasoning.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ReasoningUpdateArgs>(args: Prisma.SelectSubset<T, ReasoningUpdateArgs<ExtArgs>>): Prisma.Prisma__ReasoningClient<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Reasonings.
     * @param {ReasoningDeleteManyArgs} args - Arguments to filter Reasonings to delete.
     * @example
     * // Delete a few Reasonings
     * const { count } = await prisma.reasoning.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ReasoningDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReasoningDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Reasonings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReasoningUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reasonings
     * const reasoning = await prisma.reasoning.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ReasoningUpdateManyArgs>(args: Prisma.SelectSubset<T, ReasoningUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Reasonings and returns the data updated in the database.
     * @param {ReasoningUpdateManyAndReturnArgs} args - Arguments to update many Reasonings.
     * @example
     * // Update many Reasonings
     * const reasoning = await prisma.reasoning.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Reasonings and only return the `id`
     * const reasoningWithIdOnly = await prisma.reasoning.updateManyAndReturn({
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
    updateManyAndReturn<T extends ReasoningUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReasoningUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Reasoning.
     * @param {ReasoningUpsertArgs} args - Arguments to update or create a Reasoning.
     * @example
     * // Update or create a Reasoning
     * const reasoning = await prisma.reasoning.upsert({
     *   create: {
     *     // ... data to create a Reasoning
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reasoning we want to update
     *   }
     * })
     */
    upsert<T extends ReasoningUpsertArgs>(args: Prisma.SelectSubset<T, ReasoningUpsertArgs<ExtArgs>>): Prisma.Prisma__ReasoningClient<runtime.Types.Result.GetResult<Prisma.$ReasoningPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Reasonings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReasoningCountArgs} args - Arguments to filter Reasonings to count.
     * @example
     * // Count the number of Reasonings
     * const count = await prisma.reasoning.count({
     *   where: {
     *     // ... the filter for the Reasonings we want to count
     *   }
     * })
    **/
    count<T extends ReasoningCountArgs>(args?: Prisma.Subset<T, ReasoningCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReasoningCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Reasoning.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReasoningAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReasoningAggregateArgs>(args: Prisma.Subset<T, ReasoningAggregateArgs>): Prisma.PrismaPromise<GetReasoningAggregateType<T>>;
    /**
     * Group by Reasoning.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReasoningGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ReasoningGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReasoningGroupByArgs['orderBy'];
    } : {
        orderBy?: ReasoningGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReasoningGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReasoningGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Reasoning model
     */
    readonly fields: ReasoningFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Reasoning.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ReasoningClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    assertion<T extends Prisma.AssertionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AssertionDefaultArgs<ExtArgs>>): Prisma.Prisma__AssertionClient<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the Reasoning model
 */
export interface ReasoningFieldRefs {
    readonly id: Prisma.FieldRef<"Reasoning", 'String'>;
    readonly content: Prisma.FieldRef<"Reasoning", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Reasoning", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Reasoning", 'DateTime'>;
    readonly assertionId: Prisma.FieldRef<"Reasoning", 'String'>;
}
/**
 * Reasoning findUnique
 */
export type ReasoningFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Reasoning to fetch.
     */
    where: Prisma.ReasoningWhereUniqueInput;
};
/**
 * Reasoning findUniqueOrThrow
 */
export type ReasoningFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Reasoning to fetch.
     */
    where: Prisma.ReasoningWhereUniqueInput;
};
/**
 * Reasoning findFirst
 */
export type ReasoningFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Reasoning to fetch.
     */
    where?: Prisma.ReasoningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Reasonings to fetch.
     */
    orderBy?: Prisma.ReasoningOrderByWithRelationInput | Prisma.ReasoningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Reasonings.
     */
    cursor?: Prisma.ReasoningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Reasonings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Reasonings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Reasonings.
     */
    distinct?: Prisma.ReasoningScalarFieldEnum | Prisma.ReasoningScalarFieldEnum[];
};
/**
 * Reasoning findFirstOrThrow
 */
export type ReasoningFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Reasoning to fetch.
     */
    where?: Prisma.ReasoningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Reasonings to fetch.
     */
    orderBy?: Prisma.ReasoningOrderByWithRelationInput | Prisma.ReasoningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Reasonings.
     */
    cursor?: Prisma.ReasoningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Reasonings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Reasonings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Reasonings.
     */
    distinct?: Prisma.ReasoningScalarFieldEnum | Prisma.ReasoningScalarFieldEnum[];
};
/**
 * Reasoning findMany
 */
export type ReasoningFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which Reasonings to fetch.
     */
    where?: Prisma.ReasoningWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Reasonings to fetch.
     */
    orderBy?: Prisma.ReasoningOrderByWithRelationInput | Prisma.ReasoningOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Reasonings.
     */
    cursor?: Prisma.ReasoningWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Reasonings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Reasonings.
     */
    skip?: number;
    distinct?: Prisma.ReasoningScalarFieldEnum | Prisma.ReasoningScalarFieldEnum[];
};
/**
 * Reasoning create
 */
export type ReasoningCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a Reasoning.
     */
    data: Prisma.XOR<Prisma.ReasoningCreateInput, Prisma.ReasoningUncheckedCreateInput>;
};
/**
 * Reasoning createMany
 */
export type ReasoningCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reasonings.
     */
    data: Prisma.ReasoningCreateManyInput | Prisma.ReasoningCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Reasoning createManyAndReturn
 */
export type ReasoningCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reasoning
     */
    select?: Prisma.ReasoningSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Reasoning
     */
    omit?: Prisma.ReasoningOmit<ExtArgs> | null;
    /**
     * The data used to create many Reasonings.
     */
    data: Prisma.ReasoningCreateManyInput | Prisma.ReasoningCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReasoningIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Reasoning update
 */
export type ReasoningUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a Reasoning.
     */
    data: Prisma.XOR<Prisma.ReasoningUpdateInput, Prisma.ReasoningUncheckedUpdateInput>;
    /**
     * Choose, which Reasoning to update.
     */
    where: Prisma.ReasoningWhereUniqueInput;
};
/**
 * Reasoning updateMany
 */
export type ReasoningUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Reasonings.
     */
    data: Prisma.XOR<Prisma.ReasoningUpdateManyMutationInput, Prisma.ReasoningUncheckedUpdateManyInput>;
    /**
     * Filter which Reasonings to update
     */
    where?: Prisma.ReasoningWhereInput;
    /**
     * Limit how many Reasonings to update.
     */
    limit?: number;
};
/**
 * Reasoning updateManyAndReturn
 */
export type ReasoningUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reasoning
     */
    select?: Prisma.ReasoningSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Reasoning
     */
    omit?: Prisma.ReasoningOmit<ExtArgs> | null;
    /**
     * The data used to update Reasonings.
     */
    data: Prisma.XOR<Prisma.ReasoningUpdateManyMutationInput, Prisma.ReasoningUncheckedUpdateManyInput>;
    /**
     * Filter which Reasonings to update
     */
    where?: Prisma.ReasoningWhereInput;
    /**
     * Limit how many Reasonings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReasoningIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Reasoning upsert
 */
export type ReasoningUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the Reasoning to update in case it exists.
     */
    where: Prisma.ReasoningWhereUniqueInput;
    /**
     * In case the Reasoning found by the `where` argument doesn't exist, create a new Reasoning with this data.
     */
    create: Prisma.XOR<Prisma.ReasoningCreateInput, Prisma.ReasoningUncheckedCreateInput>;
    /**
     * In case the Reasoning was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ReasoningUpdateInput, Prisma.ReasoningUncheckedUpdateInput>;
};
/**
 * Reasoning delete
 */
export type ReasoningDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which Reasoning to delete.
     */
    where: Prisma.ReasoningWhereUniqueInput;
};
/**
 * Reasoning deleteMany
 */
export type ReasoningDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Reasonings to delete
     */
    where?: Prisma.ReasoningWhereInput;
    /**
     * Limit how many Reasonings to delete.
     */
    limit?: number;
};
/**
 * Reasoning without action
 */
export type ReasoningDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=Reasoning.d.ts.map