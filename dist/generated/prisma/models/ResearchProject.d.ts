import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ResearchProject
 * A research project/topic being investigated
 */
export type ResearchProjectModel = runtime.Types.Result.DefaultSelection<Prisma.$ResearchProjectPayload>;
export type AggregateResearchProject = {
    _count: ResearchProjectCountAggregateOutputType | null;
    _min: ResearchProjectMinAggregateOutputType | null;
    _max: ResearchProjectMaxAggregateOutputType | null;
};
export type ResearchProjectMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    searchQuery: string | null;
    workflow: $Enums.ResearchWorkflow | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ResearchProjectMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    searchQuery: string | null;
    workflow: $Enums.ResearchWorkflow | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ResearchProjectCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    searchQuery: number;
    workflow: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ResearchProjectMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    searchQuery?: true;
    workflow?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ResearchProjectMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    searchQuery?: true;
    workflow?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ResearchProjectCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    searchQuery?: true;
    workflow?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ResearchProjectAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchProject to aggregate.
     */
    where?: Prisma.ResearchProjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchProjects to fetch.
     */
    orderBy?: Prisma.ResearchProjectOrderByWithRelationInput | Prisma.ResearchProjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ResearchProjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchProjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchProjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ResearchProjects
    **/
    _count?: true | ResearchProjectCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ResearchProjectMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ResearchProjectMaxAggregateInputType;
};
export type GetResearchProjectAggregateType<T extends ResearchProjectAggregateArgs> = {
    [P in keyof T & keyof AggregateResearchProject]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateResearchProject[P]> : Prisma.GetScalarType<T[P], AggregateResearchProject[P]>;
};
export type ResearchProjectGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResearchProjectWhereInput;
    orderBy?: Prisma.ResearchProjectOrderByWithAggregationInput | Prisma.ResearchProjectOrderByWithAggregationInput[];
    by: Prisma.ResearchProjectScalarFieldEnum[] | Prisma.ResearchProjectScalarFieldEnum;
    having?: Prisma.ResearchProjectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ResearchProjectCountAggregateInputType | true;
    _min?: ResearchProjectMinAggregateInputType;
    _max?: ResearchProjectMaxAggregateInputType;
};
export type ResearchProjectGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    searchQuery: string | null;
    workflow: $Enums.ResearchWorkflow;
    createdAt: Date;
    updatedAt: Date;
    _count: ResearchProjectCountAggregateOutputType | null;
    _min: ResearchProjectMinAggregateOutputType | null;
    _max: ResearchProjectMaxAggregateOutputType | null;
};
type GetResearchProjectGroupByPayload<T extends ResearchProjectGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ResearchProjectGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ResearchProjectGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ResearchProjectGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ResearchProjectGroupByOutputType[P]>;
}>>;
export type ResearchProjectWhereInput = {
    AND?: Prisma.ResearchProjectWhereInput | Prisma.ResearchProjectWhereInput[];
    OR?: Prisma.ResearchProjectWhereInput[];
    NOT?: Prisma.ResearchProjectWhereInput | Prisma.ResearchProjectWhereInput[];
    id?: Prisma.StringFilter<"ResearchProject"> | string;
    name?: Prisma.StringFilter<"ResearchProject"> | string;
    description?: Prisma.StringNullableFilter<"ResearchProject"> | string | null;
    searchQuery?: Prisma.StringNullableFilter<"ResearchProject"> | string | null;
    workflow?: Prisma.EnumResearchWorkflowFilter<"ResearchProject"> | $Enums.ResearchWorkflow;
    createdAt?: Prisma.DateTimeFilter<"ResearchProject"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ResearchProject"> | Date | string;
    entities?: Prisma.EntityListRelationFilter;
};
export type ResearchProjectOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    searchQuery?: Prisma.SortOrderInput | Prisma.SortOrder;
    workflow?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    entities?: Prisma.EntityOrderByRelationAggregateInput;
};
export type ResearchProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ResearchProjectWhereInput | Prisma.ResearchProjectWhereInput[];
    OR?: Prisma.ResearchProjectWhereInput[];
    NOT?: Prisma.ResearchProjectWhereInput | Prisma.ResearchProjectWhereInput[];
    name?: Prisma.StringFilter<"ResearchProject"> | string;
    description?: Prisma.StringNullableFilter<"ResearchProject"> | string | null;
    searchQuery?: Prisma.StringNullableFilter<"ResearchProject"> | string | null;
    workflow?: Prisma.EnumResearchWorkflowFilter<"ResearchProject"> | $Enums.ResearchWorkflow;
    createdAt?: Prisma.DateTimeFilter<"ResearchProject"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ResearchProject"> | Date | string;
    entities?: Prisma.EntityListRelationFilter;
}, "id">;
export type ResearchProjectOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    searchQuery?: Prisma.SortOrderInput | Prisma.SortOrder;
    workflow?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ResearchProjectCountOrderByAggregateInput;
    _max?: Prisma.ResearchProjectMaxOrderByAggregateInput;
    _min?: Prisma.ResearchProjectMinOrderByAggregateInput;
};
export type ResearchProjectScalarWhereWithAggregatesInput = {
    AND?: Prisma.ResearchProjectScalarWhereWithAggregatesInput | Prisma.ResearchProjectScalarWhereWithAggregatesInput[];
    OR?: Prisma.ResearchProjectScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ResearchProjectScalarWhereWithAggregatesInput | Prisma.ResearchProjectScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ResearchProject"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ResearchProject"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"ResearchProject"> | string | null;
    searchQuery?: Prisma.StringNullableWithAggregatesFilter<"ResearchProject"> | string | null;
    workflow?: Prisma.EnumResearchWorkflowWithAggregatesFilter<"ResearchProject"> | $Enums.ResearchWorkflow;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ResearchProject"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ResearchProject"> | Date | string;
};
export type ResearchProjectCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    searchQuery?: string | null;
    workflow?: $Enums.ResearchWorkflow;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entities?: Prisma.EntityCreateNestedManyWithoutProjectInput;
};
export type ResearchProjectUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    searchQuery?: string | null;
    workflow?: $Enums.ResearchWorkflow;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    entities?: Prisma.EntityUncheckedCreateNestedManyWithoutProjectInput;
};
export type ResearchProjectUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    searchQuery?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workflow?: Prisma.EnumResearchWorkflowFieldUpdateOperationsInput | $Enums.ResearchWorkflow;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entities?: Prisma.EntityUpdateManyWithoutProjectNestedInput;
};
export type ResearchProjectUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    searchQuery?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workflow?: Prisma.EnumResearchWorkflowFieldUpdateOperationsInput | $Enums.ResearchWorkflow;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    entities?: Prisma.EntityUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ResearchProjectCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    searchQuery?: string | null;
    workflow?: $Enums.ResearchWorkflow;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResearchProjectUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    searchQuery?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workflow?: Prisma.EnumResearchWorkflowFieldUpdateOperationsInput | $Enums.ResearchWorkflow;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResearchProjectUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    searchQuery?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workflow?: Prisma.EnumResearchWorkflowFieldUpdateOperationsInput | $Enums.ResearchWorkflow;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResearchProjectCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    searchQuery?: Prisma.SortOrder;
    workflow?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResearchProjectMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    searchQuery?: Prisma.SortOrder;
    workflow?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResearchProjectMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    searchQuery?: Prisma.SortOrder;
    workflow?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ResearchProjectScalarRelationFilter = {
    is?: Prisma.ResearchProjectWhereInput;
    isNot?: Prisma.ResearchProjectWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumResearchWorkflowFieldUpdateOperationsInput = {
    set?: $Enums.ResearchWorkflow;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type ResearchProjectCreateNestedOneWithoutEntitiesInput = {
    create?: Prisma.XOR<Prisma.ResearchProjectCreateWithoutEntitiesInput, Prisma.ResearchProjectUncheckedCreateWithoutEntitiesInput>;
    connectOrCreate?: Prisma.ResearchProjectCreateOrConnectWithoutEntitiesInput;
    connect?: Prisma.ResearchProjectWhereUniqueInput;
};
export type ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput = {
    create?: Prisma.XOR<Prisma.ResearchProjectCreateWithoutEntitiesInput, Prisma.ResearchProjectUncheckedCreateWithoutEntitiesInput>;
    connectOrCreate?: Prisma.ResearchProjectCreateOrConnectWithoutEntitiesInput;
    upsert?: Prisma.ResearchProjectUpsertWithoutEntitiesInput;
    connect?: Prisma.ResearchProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ResearchProjectUpdateToOneWithWhereWithoutEntitiesInput, Prisma.ResearchProjectUpdateWithoutEntitiesInput>, Prisma.ResearchProjectUncheckedUpdateWithoutEntitiesInput>;
};
export type ResearchProjectCreateWithoutEntitiesInput = {
    id?: string;
    name: string;
    description?: string | null;
    searchQuery?: string | null;
    workflow?: $Enums.ResearchWorkflow;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResearchProjectUncheckedCreateWithoutEntitiesInput = {
    id?: string;
    name: string;
    description?: string | null;
    searchQuery?: string | null;
    workflow?: $Enums.ResearchWorkflow;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ResearchProjectCreateOrConnectWithoutEntitiesInput = {
    where: Prisma.ResearchProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ResearchProjectCreateWithoutEntitiesInput, Prisma.ResearchProjectUncheckedCreateWithoutEntitiesInput>;
};
export type ResearchProjectUpsertWithoutEntitiesInput = {
    update: Prisma.XOR<Prisma.ResearchProjectUpdateWithoutEntitiesInput, Prisma.ResearchProjectUncheckedUpdateWithoutEntitiesInput>;
    create: Prisma.XOR<Prisma.ResearchProjectCreateWithoutEntitiesInput, Prisma.ResearchProjectUncheckedCreateWithoutEntitiesInput>;
    where?: Prisma.ResearchProjectWhereInput;
};
export type ResearchProjectUpdateToOneWithWhereWithoutEntitiesInput = {
    where?: Prisma.ResearchProjectWhereInput;
    data: Prisma.XOR<Prisma.ResearchProjectUpdateWithoutEntitiesInput, Prisma.ResearchProjectUncheckedUpdateWithoutEntitiesInput>;
};
export type ResearchProjectUpdateWithoutEntitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    searchQuery?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workflow?: Prisma.EnumResearchWorkflowFieldUpdateOperationsInput | $Enums.ResearchWorkflow;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ResearchProjectUncheckedUpdateWithoutEntitiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    searchQuery?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    workflow?: Prisma.EnumResearchWorkflowFieldUpdateOperationsInput | $Enums.ResearchWorkflow;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type ResearchProjectCountOutputType
 */
export type ResearchProjectCountOutputType = {
    entities: number;
};
export type ResearchProjectCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entities?: boolean | ResearchProjectCountOutputTypeCountEntitiesArgs;
};
/**
 * ResearchProjectCountOutputType without action
 */
export type ResearchProjectCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProjectCountOutputType
     */
    select?: Prisma.ResearchProjectCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ResearchProjectCountOutputType without action
 */
export type ResearchProjectCountOutputTypeCountEntitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntityWhereInput;
};
export type ResearchProjectSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    searchQuery?: boolean;
    workflow?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    entities?: boolean | Prisma.ResearchProject$entitiesArgs<ExtArgs>;
    _count?: boolean | Prisma.ResearchProjectCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["researchProject"]>;
export type ResearchProjectSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    searchQuery?: boolean;
    workflow?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["researchProject"]>;
export type ResearchProjectSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    searchQuery?: boolean;
    workflow?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["researchProject"]>;
export type ResearchProjectSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    searchQuery?: boolean;
    workflow?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ResearchProjectOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "searchQuery" | "workflow" | "createdAt" | "updatedAt", ExtArgs["result"]["researchProject"]>;
export type ResearchProjectInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    entities?: boolean | Prisma.ResearchProject$entitiesArgs<ExtArgs>;
    _count?: boolean | Prisma.ResearchProjectCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ResearchProjectIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ResearchProjectIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ResearchProjectPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ResearchProject";
    objects: {
        entities: Prisma.$EntityPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        searchQuery: string | null;
        workflow: $Enums.ResearchWorkflow;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["researchProject"]>;
    composites: {};
};
export type ResearchProjectGetPayload<S extends boolean | null | undefined | ResearchProjectDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload, S>;
export type ResearchProjectCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ResearchProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ResearchProjectCountAggregateInputType | true;
};
export interface ResearchProjectDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ResearchProject'];
        meta: {
            name: 'ResearchProject';
        };
    };
    /**
     * Find zero or one ResearchProject that matches the filter.
     * @param {ResearchProjectFindUniqueArgs} args - Arguments to find a ResearchProject
     * @example
     * // Get one ResearchProject
     * const researchProject = await prisma.researchProject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResearchProjectFindUniqueArgs>(args: Prisma.SelectSubset<T, ResearchProjectFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ResearchProjectClient<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ResearchProject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResearchProjectFindUniqueOrThrowArgs} args - Arguments to find a ResearchProject
     * @example
     * // Get one ResearchProject
     * const researchProject = await prisma.researchProject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResearchProjectFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ResearchProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResearchProjectClient<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ResearchProject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectFindFirstArgs} args - Arguments to find a ResearchProject
     * @example
     * // Get one ResearchProject
     * const researchProject = await prisma.researchProject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResearchProjectFindFirstArgs>(args?: Prisma.SelectSubset<T, ResearchProjectFindFirstArgs<ExtArgs>>): Prisma.Prisma__ResearchProjectClient<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ResearchProject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectFindFirstOrThrowArgs} args - Arguments to find a ResearchProject
     * @example
     * // Get one ResearchProject
     * const researchProject = await prisma.researchProject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResearchProjectFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ResearchProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ResearchProjectClient<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ResearchProjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ResearchProjects
     * const researchProjects = await prisma.researchProject.findMany()
     *
     * // Get first 10 ResearchProjects
     * const researchProjects = await prisma.researchProject.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const researchProjectWithIdOnly = await prisma.researchProject.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ResearchProjectFindManyArgs>(args?: Prisma.SelectSubset<T, ResearchProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ResearchProject.
     * @param {ResearchProjectCreateArgs} args - Arguments to create a ResearchProject.
     * @example
     * // Create one ResearchProject
     * const ResearchProject = await prisma.researchProject.create({
     *   data: {
     *     // ... data to create a ResearchProject
     *   }
     * })
     *
     */
    create<T extends ResearchProjectCreateArgs>(args: Prisma.SelectSubset<T, ResearchProjectCreateArgs<ExtArgs>>): Prisma.Prisma__ResearchProjectClient<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ResearchProjects.
     * @param {ResearchProjectCreateManyArgs} args - Arguments to create many ResearchProjects.
     * @example
     * // Create many ResearchProjects
     * const researchProject = await prisma.researchProject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ResearchProjectCreateManyArgs>(args?: Prisma.SelectSubset<T, ResearchProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ResearchProjects and returns the data saved in the database.
     * @param {ResearchProjectCreateManyAndReturnArgs} args - Arguments to create many ResearchProjects.
     * @example
     * // Create many ResearchProjects
     * const researchProject = await prisma.researchProject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ResearchProjects and only return the `id`
     * const researchProjectWithIdOnly = await prisma.researchProject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ResearchProjectCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ResearchProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ResearchProject.
     * @param {ResearchProjectDeleteArgs} args - Arguments to delete one ResearchProject.
     * @example
     * // Delete one ResearchProject
     * const ResearchProject = await prisma.researchProject.delete({
     *   where: {
     *     // ... filter to delete one ResearchProject
     *   }
     * })
     *
     */
    delete<T extends ResearchProjectDeleteArgs>(args: Prisma.SelectSubset<T, ResearchProjectDeleteArgs<ExtArgs>>): Prisma.Prisma__ResearchProjectClient<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ResearchProject.
     * @param {ResearchProjectUpdateArgs} args - Arguments to update one ResearchProject.
     * @example
     * // Update one ResearchProject
     * const researchProject = await prisma.researchProject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ResearchProjectUpdateArgs>(args: Prisma.SelectSubset<T, ResearchProjectUpdateArgs<ExtArgs>>): Prisma.Prisma__ResearchProjectClient<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ResearchProjects.
     * @param {ResearchProjectDeleteManyArgs} args - Arguments to filter ResearchProjects to delete.
     * @example
     * // Delete a few ResearchProjects
     * const { count } = await prisma.researchProject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ResearchProjectDeleteManyArgs>(args?: Prisma.SelectSubset<T, ResearchProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ResearchProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ResearchProjects
     * const researchProject = await prisma.researchProject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ResearchProjectUpdateManyArgs>(args: Prisma.SelectSubset<T, ResearchProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ResearchProjects and returns the data updated in the database.
     * @param {ResearchProjectUpdateManyAndReturnArgs} args - Arguments to update many ResearchProjects.
     * @example
     * // Update many ResearchProjects
     * const researchProject = await prisma.researchProject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ResearchProjects and only return the `id`
     * const researchProjectWithIdOnly = await prisma.researchProject.updateManyAndReturn({
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
    updateManyAndReturn<T extends ResearchProjectUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ResearchProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ResearchProject.
     * @param {ResearchProjectUpsertArgs} args - Arguments to update or create a ResearchProject.
     * @example
     * // Update or create a ResearchProject
     * const researchProject = await prisma.researchProject.upsert({
     *   create: {
     *     // ... data to create a ResearchProject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ResearchProject we want to update
     *   }
     * })
     */
    upsert<T extends ResearchProjectUpsertArgs>(args: Prisma.SelectSubset<T, ResearchProjectUpsertArgs<ExtArgs>>): Prisma.Prisma__ResearchProjectClient<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ResearchProjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectCountArgs} args - Arguments to filter ResearchProjects to count.
     * @example
     * // Count the number of ResearchProjects
     * const count = await prisma.researchProject.count({
     *   where: {
     *     // ... the filter for the ResearchProjects we want to count
     *   }
     * })
    **/
    count<T extends ResearchProjectCountArgs>(args?: Prisma.Subset<T, ResearchProjectCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ResearchProjectCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ResearchProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ResearchProjectAggregateArgs>(args: Prisma.Subset<T, ResearchProjectAggregateArgs>): Prisma.PrismaPromise<GetResearchProjectAggregateType<T>>;
    /**
     * Group by ResearchProject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResearchProjectGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ResearchProjectGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ResearchProjectGroupByArgs['orderBy'];
    } : {
        orderBy?: ResearchProjectGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ResearchProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResearchProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ResearchProject model
     */
    readonly fields: ResearchProjectFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ResearchProject.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ResearchProjectClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    entities<T extends Prisma.ResearchProject$entitiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ResearchProject$entitiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the ResearchProject model
 */
export interface ResearchProjectFieldRefs {
    readonly id: Prisma.FieldRef<"ResearchProject", 'String'>;
    readonly name: Prisma.FieldRef<"ResearchProject", 'String'>;
    readonly description: Prisma.FieldRef<"ResearchProject", 'String'>;
    readonly searchQuery: Prisma.FieldRef<"ResearchProject", 'String'>;
    readonly workflow: Prisma.FieldRef<"ResearchProject", 'ResearchWorkflow'>;
    readonly createdAt: Prisma.FieldRef<"ResearchProject", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ResearchProject", 'DateTime'>;
}
/**
 * ResearchProject findUnique
 */
export type ResearchProjectFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchProjectInclude<ExtArgs> | null;
    /**
     * Filter, which ResearchProject to fetch.
     */
    where: Prisma.ResearchProjectWhereUniqueInput;
};
/**
 * ResearchProject findUniqueOrThrow
 */
export type ResearchProjectFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchProjectInclude<ExtArgs> | null;
    /**
     * Filter, which ResearchProject to fetch.
     */
    where: Prisma.ResearchProjectWhereUniqueInput;
};
/**
 * ResearchProject findFirst
 */
export type ResearchProjectFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchProjectInclude<ExtArgs> | null;
    /**
     * Filter, which ResearchProject to fetch.
     */
    where?: Prisma.ResearchProjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchProjects to fetch.
     */
    orderBy?: Prisma.ResearchProjectOrderByWithRelationInput | Prisma.ResearchProjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ResearchProjects.
     */
    cursor?: Prisma.ResearchProjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchProjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchProjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResearchProjects.
     */
    distinct?: Prisma.ResearchProjectScalarFieldEnum | Prisma.ResearchProjectScalarFieldEnum[];
};
/**
 * ResearchProject findFirstOrThrow
 */
export type ResearchProjectFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchProjectInclude<ExtArgs> | null;
    /**
     * Filter, which ResearchProject to fetch.
     */
    where?: Prisma.ResearchProjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchProjects to fetch.
     */
    orderBy?: Prisma.ResearchProjectOrderByWithRelationInput | Prisma.ResearchProjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ResearchProjects.
     */
    cursor?: Prisma.ResearchProjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchProjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchProjects.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ResearchProjects.
     */
    distinct?: Prisma.ResearchProjectScalarFieldEnum | Prisma.ResearchProjectScalarFieldEnum[];
};
/**
 * ResearchProject findMany
 */
export type ResearchProjectFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchProjectInclude<ExtArgs> | null;
    /**
     * Filter, which ResearchProjects to fetch.
     */
    where?: Prisma.ResearchProjectWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ResearchProjects to fetch.
     */
    orderBy?: Prisma.ResearchProjectOrderByWithRelationInput | Prisma.ResearchProjectOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ResearchProjects.
     */
    cursor?: Prisma.ResearchProjectWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ResearchProjects from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ResearchProjects.
     */
    skip?: number;
    distinct?: Prisma.ResearchProjectScalarFieldEnum | Prisma.ResearchProjectScalarFieldEnum[];
};
/**
 * ResearchProject create
 */
export type ResearchProjectCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchProjectInclude<ExtArgs> | null;
    /**
     * The data needed to create a ResearchProject.
     */
    data: Prisma.XOR<Prisma.ResearchProjectCreateInput, Prisma.ResearchProjectUncheckedCreateInput>;
};
/**
 * ResearchProject createMany
 */
export type ResearchProjectCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ResearchProjects.
     */
    data: Prisma.ResearchProjectCreateManyInput | Prisma.ResearchProjectCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ResearchProject createManyAndReturn
 */
export type ResearchProjectCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * The data used to create many ResearchProjects.
     */
    data: Prisma.ResearchProjectCreateManyInput | Prisma.ResearchProjectCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ResearchProject update
 */
export type ResearchProjectUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchProjectInclude<ExtArgs> | null;
    /**
     * The data needed to update a ResearchProject.
     */
    data: Prisma.XOR<Prisma.ResearchProjectUpdateInput, Prisma.ResearchProjectUncheckedUpdateInput>;
    /**
     * Choose, which ResearchProject to update.
     */
    where: Prisma.ResearchProjectWhereUniqueInput;
};
/**
 * ResearchProject updateMany
 */
export type ResearchProjectUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ResearchProjects.
     */
    data: Prisma.XOR<Prisma.ResearchProjectUpdateManyMutationInput, Prisma.ResearchProjectUncheckedUpdateManyInput>;
    /**
     * Filter which ResearchProjects to update
     */
    where?: Prisma.ResearchProjectWhereInput;
    /**
     * Limit how many ResearchProjects to update.
     */
    limit?: number;
};
/**
 * ResearchProject updateManyAndReturn
 */
export type ResearchProjectUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * The data used to update ResearchProjects.
     */
    data: Prisma.XOR<Prisma.ResearchProjectUpdateManyMutationInput, Prisma.ResearchProjectUncheckedUpdateManyInput>;
    /**
     * Filter which ResearchProjects to update
     */
    where?: Prisma.ResearchProjectWhereInput;
    /**
     * Limit how many ResearchProjects to update.
     */
    limit?: number;
};
/**
 * ResearchProject upsert
 */
export type ResearchProjectUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchProjectInclude<ExtArgs> | null;
    /**
     * The filter to search for the ResearchProject to update in case it exists.
     */
    where: Prisma.ResearchProjectWhereUniqueInput;
    /**
     * In case the ResearchProject found by the `where` argument doesn't exist, create a new ResearchProject with this data.
     */
    create: Prisma.XOR<Prisma.ResearchProjectCreateInput, Prisma.ResearchProjectUncheckedCreateInput>;
    /**
     * In case the ResearchProject was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ResearchProjectUpdateInput, Prisma.ResearchProjectUncheckedUpdateInput>;
};
/**
 * ResearchProject delete
 */
export type ResearchProjectDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchProjectInclude<ExtArgs> | null;
    /**
     * Filter which ResearchProject to delete.
     */
    where: Prisma.ResearchProjectWhereUniqueInput;
};
/**
 * ResearchProject deleteMany
 */
export type ResearchProjectDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ResearchProjects to delete
     */
    where?: Prisma.ResearchProjectWhereInput;
    /**
     * Limit how many ResearchProjects to delete.
     */
    limit?: number;
};
/**
 * ResearchProject.entities
 */
export type ResearchProject$entitiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.EntityWhereInput;
    orderBy?: Prisma.EntityOrderByWithRelationInput | Prisma.EntityOrderByWithRelationInput[];
    cursor?: Prisma.EntityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EntityScalarFieldEnum | Prisma.EntityScalarFieldEnum[];
};
/**
 * ResearchProject without action
 */
export type ResearchProjectDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchProject
     */
    select?: Prisma.ResearchProjectSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchProject
     */
    omit?: Prisma.ResearchProjectOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchProjectInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ResearchProject.d.ts.map