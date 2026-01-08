import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ResearchLog
 * Audit log for tracking research activities
 */
export type ResearchLogModel = runtime.Types.Result.DefaultSelection<Prisma.$ResearchLogPayload>;
export type AggregateResearchLog = {
    _count: ResearchLogCountAggregateOutputType | null;
    _min: ResearchLogMinAggregateOutputType | null;
    _max: ResearchLogMaxAggregateOutputType | null;
};
export type ResearchLogMinAggregateOutputType = {
    id: string | null;
    action: string | null;
    agentId: string | null;
    createdAt: Date | null;
};
export type ResearchLogMaxAggregateOutputType = {
    id: string | null;
    action: string | null;
    agentId: string | null;
    createdAt: Date | null;
};
export type ResearchLogCountAggregateOutputType = {
    id: number;
    action: number;
    details: number;
    agentId: number;
    createdAt: number;
    _all: number;
};
export type ResearchLogMinAggregateInputType = {
    id?: true;
    action?: true;
    agentId?: true;
    createdAt?: true;
};
export type ResearchLogMaxAggregateInputType = {
    id?: true;
    action?: true;
    agentId?: true;
    createdAt?: true;
};
export type ResearchLogCountAggregateInputType = {
    id?: true;
    action?: true;
    details?: true;
    agentId?: true;
    createdAt?: true;
    _all?: true;
};
export type ResearchLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchLog to aggregate.
     */
    where?: Prisma.ResearchLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchLogs to fetch.
     */
    orderBy?: Prisma.ResearchLogOrderByWithRelationInput | Prisma.ResearchLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ResearchLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ResearchLogs
    **/
    _count?: true | ResearchLogCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ResearchLogMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ResearchLogMaxAggregateInputType;
};
export type GetResearchLogAggregateType<T extends ResearchLogAggregateArgs> = {
    [P in keyof T & keyof AggregateResearchLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateResearchLog[P]> : Prisma.GetScalarType<T[P], AggregateResearchLog[P]>;
};
export type ResearchLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResearchLogWhereInput;
    orderBy?: Prisma.ResearchLogOrderByWithAggregationInput | Prisma.ResearchLogOrderByWithAggregationInput[];
    by: Prisma.ResearchLogScalarFieldEnum[] | Prisma.ResearchLogScalarFieldEnum;
    having?: Prisma.ResearchLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ResearchLogCountAggregateInputType | true;
    _min?: ResearchLogMinAggregateInputType;
    _max?: ResearchLogMaxAggregateInputType;
};
export type ResearchLogGroupByOutputType = {
    id: string;
    action: string;
    details: runtime.JsonValue | null;
    agentId: string | null;
    createdAt: Date;
    _count: ResearchLogCountAggregateOutputType | null;
    _min: ResearchLogMinAggregateOutputType | null;
    _max: ResearchLogMaxAggregateOutputType | null;
};
type GetResearchLogGroupByPayload<T extends ResearchLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ResearchLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ResearchLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ResearchLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ResearchLogGroupByOutputType[P]>;
}>>;
export type ResearchLogWhereInput = {
    AND?: Prisma.ResearchLogWhereInput | Prisma.ResearchLogWhereInput[];
    OR?: Prisma.ResearchLogWhereInput[];
    NOT?: Prisma.ResearchLogWhereInput | Prisma.ResearchLogWhereInput[];
    id?: Prisma.StringFilter<"ResearchLog"> | string;
    action?: Prisma.StringFilter<"ResearchLog"> | string;
    details?: Prisma.JsonNullableFilter<"ResearchLog">;
    agentId?: Prisma.StringNullableFilter<"ResearchLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ResearchLog"> | Date | string;
};
export type ResearchLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    details?: Prisma.SortOrderInput | Prisma.SortOrder;
    agentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ResearchLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ResearchLogWhereInput | Prisma.ResearchLogWhereInput[];
    OR?: Prisma.ResearchLogWhereInput[];
    NOT?: Prisma.ResearchLogWhereInput | Prisma.ResearchLogWhereInput[];
    action?: Prisma.StringFilter<"ResearchLog"> | string;
    details?: Prisma.JsonNullableFilter<"ResearchLog">;
    agentId?: Prisma.StringNullableFilter<"ResearchLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ResearchLog"> | Date | string;
}, "id">;
export type ResearchLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    details?: Prisma.SortOrderInput | Prisma.SortOrder;
    agentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ResearchLogCountOrderByAggregateInput;
    _max?: Prisma.ResearchLogMaxOrderByAggregateInput;
    _min?: Prisma.ResearchLogMinOrderByAggregateInput;
};
export type ResearchLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.ResearchLogScalarWhereWithAggregatesInput | Prisma.ResearchLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.ResearchLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ResearchLogScalarWhereWithAggregatesInput | Prisma.ResearchLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ResearchLog"> | string;
    action?: Prisma.StringWithAggregatesFilter<"ResearchLog"> | string;
    details?: Prisma.JsonNullableWithAggregatesFilter<"ResearchLog">;
    agentId?: Prisma.StringNullableWithAggregatesFilter<"ResearchLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ResearchLog"> | Date | string;
};
export type ResearchLogCreateInput = {
    id?: string;
    action: string;
    details?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    agentId?: string | null;
    createdAt?: Date | string;
};
export type ResearchLogUncheckedCreateInput = {
    id?: string;
    action: string;
    details?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    agentId?: string | null;
    createdAt?: Date | string;
};
export type ResearchLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResearchLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResearchLogCreateManyInput = {
    id?: string;
    action: string;
    details?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    agentId?: string | null;
    createdAt?: Date | string;
};
export type ResearchLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResearchLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    details?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    agentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResearchLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    agentId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ResearchLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    agentId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ResearchLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    agentId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ResearchLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    action?: boolean;
    details?: boolean;
    agentId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["researchLog"]>;
export type ResearchLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    action?: boolean;
    details?: boolean;
    agentId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["researchLog"]>;
export type ResearchLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    action?: boolean;
    details?: boolean;
    agentId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["researchLog"]>;
export type ResearchLogSelectScalar = {
    id?: boolean;
    action?: boolean;
    details?: boolean;
    agentId?: boolean;
    createdAt?: boolean;
};
export type ResearchLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "action" | "details" | "agentId" | "createdAt", ExtArgs["result"]["researchLog"]>;
export type $ResearchLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ResearchLog";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        action: string;
        details: runtime.JsonValue | null;
        agentId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["researchLog"]>;
    composites: {};
};
export type ResearchLogGetPayload<S extends boolean | null | undefined | ResearchLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload, S>;
export type ResearchLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ResearchLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ResearchLogCountAggregateInputType | true;
};
export interface ResearchLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ResearchLog'];
        meta: {
            name: 'ResearchLog';
        };
    };
    /**
     * Find zero or one ResearchLog that matches the filter.
     * @param {ResearchLogFindUniqueArgs} args - Arguments to find a ResearchLog
     * @example
     * // Get one ResearchLog
     * const researchLog = await prisma.researchLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResearchLogFindUniqueArgs>(args: Prisma.SelectSubset<T, ResearchLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ResearchLogClient<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ResearchLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResearchLogFindUniqueOrThrowArgs} args - Arguments to find a ResearchLog
     * @example
     * // Get one ResearchLog
     * const researchLog = await prisma.researchLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResearchLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ResearchLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResearchLogClient<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ResearchLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchLogFindFirstArgs} args - Arguments to find a ResearchLog
     * @example
     * // Get one ResearchLog
     * const researchLog = await prisma.researchLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResearchLogFindFirstArgs>(args?: Prisma.SelectSubset<T, ResearchLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__ResearchLogClient<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ResearchLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchLogFindFirstOrThrowArgs} args - Arguments to find a ResearchLog
     * @example
     * // Get one ResearchLog
     * const researchLog = await prisma.researchLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResearchLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ResearchLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResearchLogClient<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ResearchLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResearchLogs
     * const researchLogs = await prisma.researchLog.findMany()
     *
     * // Get first 10 ResearchLogs
     * const researchLogs = await prisma.researchLog.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const researchLogWithIdOnly = await prisma.researchLog.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ResearchLogFindManyArgs>(args?: Prisma.SelectSubset<T, ResearchLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ResearchLog.
     * @param {ResearchLogCreateArgs} args - Arguments to create a ResearchLog.
     * @example
     * // Create one ResearchLog
     * const ResearchLog = await prisma.researchLog.create({
     *   data: {
     *     // ... data to create a ResearchLog
     *   }
     * })
     *
     */
    create<T extends ResearchLogCreateArgs>(args: Prisma.SelectSubset<T, ResearchLogCreateArgs<ExtArgs>>): Prisma.Prisma__ResearchLogClient<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ResearchLogs.
     * @param {ResearchLogCreateManyArgs} args - Arguments to create many ResearchLogs.
     * @example
     * // Create many ResearchLogs
     * const researchLog = await prisma.researchLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ResearchLogCreateManyArgs>(args?: Prisma.SelectSubset<T, ResearchLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ResearchLogs and returns the data saved in the database.
     * @param {ResearchLogCreateManyAndReturnArgs} args - Arguments to create many ResearchLogs.
     * @example
     * // Create many ResearchLogs
     * const researchLog = await prisma.researchLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ResearchLogs and only return the `id`
     * const researchLogWithIdOnly = await prisma.researchLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ResearchLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ResearchLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ResearchLog.
     * @param {ResearchLogDeleteArgs} args - Arguments to delete one ResearchLog.
     * @example
     * // Delete one ResearchLog
     * const ResearchLog = await prisma.researchLog.delete({
     *   where: {
     *     // ... filter to delete one ResearchLog
     *   }
     * })
     *
     */
    delete<T extends ResearchLogDeleteArgs>(args: Prisma.SelectSubset<T, ResearchLogDeleteArgs<ExtArgs>>): Prisma.Prisma__ResearchLogClient<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ResearchLog.
     * @param {ResearchLogUpdateArgs} args - Arguments to update one ResearchLog.
     * @example
     * // Update one ResearchLog
     * const researchLog = await prisma.researchLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ResearchLogUpdateArgs>(args: Prisma.SelectSubset<T, ResearchLogUpdateArgs<ExtArgs>>): Prisma.Prisma__ResearchLogClient<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ResearchLogs.
     * @param {ResearchLogDeleteManyArgs} args - Arguments to filter ResearchLogs to delete.
     * @example
     * // Delete a few ResearchLogs
     * const { count } = await prisma.researchLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ResearchLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, ResearchLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ResearchLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResearchLogs
     * const researchLog = await prisma.researchLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ResearchLogUpdateManyArgs>(args: Prisma.SelectSubset<T, ResearchLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ResearchLogs and returns the data updated in the database.
     * @param {ResearchLogUpdateManyAndReturnArgs} args - Arguments to update many ResearchLogs.
     * @example
     * // Update many ResearchLogs
     * const researchLog = await prisma.researchLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ResearchLogs and only return the `id`
     * const researchLogWithIdOnly = await prisma.researchLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends ResearchLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ResearchLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ResearchLog.
     * @param {ResearchLogUpsertArgs} args - Arguments to update or create a ResearchLog.
     * @example
     * // Update or create a ResearchLog
     * const researchLog = await prisma.researchLog.upsert({
     *   create: {
     *     // ... data to create a ResearchLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResearchLog we want to update
     *   }
     * })
     */
    upsert<T extends ResearchLogUpsertArgs>(args: Prisma.SelectSubset<T, ResearchLogUpsertArgs<ExtArgs>>): Prisma.Prisma__ResearchLogClient<runtime.Types.Result.GetResult<Prisma.$ResearchLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ResearchLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchLogCountArgs} args - Arguments to filter ResearchLogs to count.
     * @example
     * // Count the number of ResearchLogs
     * const count = await prisma.researchLog.count({
     *   where: {
     *     // ... the filter for the ResearchLogs we want to count
     *   }
     * })
    **/
    count<T extends ResearchLogCountArgs>(args?: Prisma.Subset<T, ResearchLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ResearchLogCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ResearchLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResearchLogAggregateArgs>(args: Prisma.Subset<T, ResearchLogAggregateArgs>): Prisma.PrismaPromise<GetResearchLogAggregateType<T>>;
    /**
     * Group by ResearchLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchLogGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ResearchLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ResearchLogGroupByArgs['orderBy'];
    } : {
        orderBy?: ResearchLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ResearchLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResearchLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ResearchLog model
     */
    readonly fields: ResearchLogFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ResearchLog.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ResearchLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the ResearchLog model
 */
export interface ResearchLogFieldRefs {
    readonly id: Prisma.FieldRef<"ResearchLog", 'String'>;
    readonly action: Prisma.FieldRef<"ResearchLog", 'String'>;
    readonly details: Prisma.FieldRef<"ResearchLog", 'Json'>;
    readonly agentId: Prisma.FieldRef<"ResearchLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ResearchLog", 'DateTime'>;
}
/**
 * ResearchLog findUnique
 */
export type ResearchLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * Filter, which ResearchLog to fetch.
     */
    where: Prisma.ResearchLogWhereUniqueInput;
};
/**
 * ResearchLog findUniqueOrThrow
 */
export type ResearchLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * Filter, which ResearchLog to fetch.
     */
    where: Prisma.ResearchLogWhereUniqueInput;
};
/**
 * ResearchLog findFirst
 */
export type ResearchLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * Filter, which ResearchLog to fetch.
     */
    where?: Prisma.ResearchLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchLogs to fetch.
     */
    orderBy?: Prisma.ResearchLogOrderByWithRelationInput | Prisma.ResearchLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ResearchLogs.
     */
    cursor?: Prisma.ResearchLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResearchLogs.
     */
    distinct?: Prisma.ResearchLogScalarFieldEnum | Prisma.ResearchLogScalarFieldEnum[];
};
/**
 * ResearchLog findFirstOrThrow
 */
export type ResearchLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * Filter, which ResearchLog to fetch.
     */
    where?: Prisma.ResearchLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchLogs to fetch.
     */
    orderBy?: Prisma.ResearchLogOrderByWithRelationInput | Prisma.ResearchLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ResearchLogs.
     */
    cursor?: Prisma.ResearchLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchLogs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResearchLogs.
     */
    distinct?: Prisma.ResearchLogScalarFieldEnum | Prisma.ResearchLogScalarFieldEnum[];
};
/**
 * ResearchLog findMany
 */
export type ResearchLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * Filter, which ResearchLogs to fetch.
     */
    where?: Prisma.ResearchLogWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchLogs to fetch.
     */
    orderBy?: Prisma.ResearchLogOrderByWithRelationInput | Prisma.ResearchLogOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ResearchLogs.
     */
    cursor?: Prisma.ResearchLogWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchLogs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchLogs.
     */
    skip?: number;
    distinct?: Prisma.ResearchLogScalarFieldEnum | Prisma.ResearchLogScalarFieldEnum[];
};
/**
 * ResearchLog create
 */
export type ResearchLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * The data needed to create a ResearchLog.
     */
    data: Prisma.XOR<Prisma.ResearchLogCreateInput, Prisma.ResearchLogUncheckedCreateInput>;
};
/**
 * ResearchLog createMany
 */
export type ResearchLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResearchLogs.
     */
    data: Prisma.ResearchLogCreateManyInput | Prisma.ResearchLogCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ResearchLog createManyAndReturn
 */
export type ResearchLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * The data used to create many ResearchLogs.
     */
    data: Prisma.ResearchLogCreateManyInput | Prisma.ResearchLogCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ResearchLog update
 */
export type ResearchLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * The data needed to update a ResearchLog.
     */
    data: Prisma.XOR<Prisma.ResearchLogUpdateInput, Prisma.ResearchLogUncheckedUpdateInput>;
    /**
     * Choose, which ResearchLog to update.
     */
    where: Prisma.ResearchLogWhereUniqueInput;
};
/**
 * ResearchLog updateMany
 */
export type ResearchLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ResearchLogs.
     */
    data: Prisma.XOR<Prisma.ResearchLogUpdateManyMutationInput, Prisma.ResearchLogUncheckedUpdateManyInput>;
    /**
     * Filter which ResearchLogs to update
     */
    where?: Prisma.ResearchLogWhereInput;
    /**
     * Limit how many ResearchLogs to update.
     */
    limit?: number;
};
/**
 * ResearchLog updateManyAndReturn
 */
export type ResearchLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * The data used to update ResearchLogs.
     */
    data: Prisma.XOR<Prisma.ResearchLogUpdateManyMutationInput, Prisma.ResearchLogUncheckedUpdateManyInput>;
    /**
     * Filter which ResearchLogs to update
     */
    where?: Prisma.ResearchLogWhereInput;
    /**
     * Limit how many ResearchLogs to update.
     */
    limit?: number;
};
/**
 * ResearchLog upsert
 */
export type ResearchLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * The filter to search for the ResearchLog to update in case it exists.
     */
    where: Prisma.ResearchLogWhereUniqueInput;
    /**
     * In case the ResearchLog found by the `where` argument doesn't exist, create a new ResearchLog with this data.
     */
    create: Prisma.XOR<Prisma.ResearchLogCreateInput, Prisma.ResearchLogUncheckedCreateInput>;
    /**
     * In case the ResearchLog was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ResearchLogUpdateInput, Prisma.ResearchLogUncheckedUpdateInput>;
};
/**
 * ResearchLog delete
 */
export type ResearchLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
    /**
     * Filter which ResearchLog to delete.
     */
    where: Prisma.ResearchLogWhereUniqueInput;
};
/**
 * ResearchLog deleteMany
 */
export type ResearchLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchLogs to delete
     */
    where?: Prisma.ResearchLogWhereInput;
    /**
     * Limit how many ResearchLogs to delete.
     */
    limit?: number;
};
/**
 * ResearchLog without action
 */
export type ResearchLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchLog
     */
    select?: Prisma.ResearchLogSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchLog
     */
    omit?: Prisma.ResearchLogOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ResearchLog.d.ts.map