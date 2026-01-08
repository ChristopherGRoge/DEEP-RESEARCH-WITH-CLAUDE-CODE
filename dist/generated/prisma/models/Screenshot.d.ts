import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Screenshot
 * Screenshot evidence captured during extraction
 */
export type ScreenshotModel = runtime.Types.Result.DefaultSelection<Prisma.$ScreenshotPayload>;
export type AggregateScreenshot = {
    _count: ScreenshotCountAggregateOutputType | null;
    _avg: ScreenshotAvgAggregateOutputType | null;
    _sum: ScreenshotSumAggregateOutputType | null;
    _min: ScreenshotMinAggregateOutputType | null;
    _max: ScreenshotMaxAggregateOutputType | null;
};
export type ScreenshotAvgAggregateOutputType = {
    width: number | null;
    height: number | null;
};
export type ScreenshotSumAggregateOutputType = {
    width: number | null;
    height: number | null;
};
export type ScreenshotMinAggregateOutputType = {
    id: string | null;
    filePath: string | null;
    url: string | null;
    fullPage: boolean | null;
    width: number | null;
    height: number | null;
    capturedAt: Date | null;
};
export type ScreenshotMaxAggregateOutputType = {
    id: string | null;
    filePath: string | null;
    url: string | null;
    fullPage: boolean | null;
    width: number | null;
    height: number | null;
    capturedAt: Date | null;
};
export type ScreenshotCountAggregateOutputType = {
    id: number;
    filePath: number;
    url: number;
    fullPage: number;
    width: number;
    height: number;
    capturedAt: number;
    _all: number;
};
export type ScreenshotAvgAggregateInputType = {
    width?: true;
    height?: true;
};
export type ScreenshotSumAggregateInputType = {
    width?: true;
    height?: true;
};
export type ScreenshotMinAggregateInputType = {
    id?: true;
    filePath?: true;
    url?: true;
    fullPage?: true;
    width?: true;
    height?: true;
    capturedAt?: true;
};
export type ScreenshotMaxAggregateInputType = {
    id?: true;
    filePath?: true;
    url?: true;
    fullPage?: true;
    width?: true;
    height?: true;
    capturedAt?: true;
};
export type ScreenshotCountAggregateInputType = {
    id?: true;
    filePath?: true;
    url?: true;
    fullPage?: true;
    width?: true;
    height?: true;
    capturedAt?: true;
    _all?: true;
};
export type ScreenshotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Screenshot to aggregate.
     */
    where?: Prisma.ScreenshotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: Prisma.ScreenshotOrderByWithRelationInput | Prisma.ScreenshotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ScreenshotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Screenshots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Screenshots
    **/
    _count?: true | ScreenshotCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ScreenshotAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ScreenshotSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ScreenshotMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ScreenshotMaxAggregateInputType;
};
export type GetScreenshotAggregateType<T extends ScreenshotAggregateArgs> = {
    [P in keyof T & keyof AggregateScreenshot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateScreenshot[P]> : Prisma.GetScalarType<T[P], AggregateScreenshot[P]>;
};
export type ScreenshotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ScreenshotWhereInput;
    orderBy?: Prisma.ScreenshotOrderByWithAggregationInput | Prisma.ScreenshotOrderByWithAggregationInput[];
    by: Prisma.ScreenshotScalarFieldEnum[] | Prisma.ScreenshotScalarFieldEnum;
    having?: Prisma.ScreenshotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ScreenshotCountAggregateInputType | true;
    _avg?: ScreenshotAvgAggregateInputType;
    _sum?: ScreenshotSumAggregateInputType;
    _min?: ScreenshotMinAggregateInputType;
    _max?: ScreenshotMaxAggregateInputType;
};
export type ScreenshotGroupByOutputType = {
    id: string;
    filePath: string;
    url: string;
    fullPage: boolean;
    width: number | null;
    height: number | null;
    capturedAt: Date;
    _count: ScreenshotCountAggregateOutputType | null;
    _avg: ScreenshotAvgAggregateOutputType | null;
    _sum: ScreenshotSumAggregateOutputType | null;
    _min: ScreenshotMinAggregateOutputType | null;
    _max: ScreenshotMaxAggregateOutputType | null;
};
type GetScreenshotGroupByPayload<T extends ScreenshotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ScreenshotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ScreenshotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ScreenshotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ScreenshotGroupByOutputType[P]>;
}>>;
export type ScreenshotWhereInput = {
    AND?: Prisma.ScreenshotWhereInput | Prisma.ScreenshotWhereInput[];
    OR?: Prisma.ScreenshotWhereInput[];
    NOT?: Prisma.ScreenshotWhereInput | Prisma.ScreenshotWhereInput[];
    id?: Prisma.StringFilter<"Screenshot"> | string;
    filePath?: Prisma.StringFilter<"Screenshot"> | string;
    url?: Prisma.StringFilter<"Screenshot"> | string;
    fullPage?: Prisma.BoolFilter<"Screenshot"> | boolean;
    width?: Prisma.IntNullableFilter<"Screenshot"> | number | null;
    height?: Prisma.IntNullableFilter<"Screenshot"> | number | null;
    capturedAt?: Prisma.DateTimeFilter<"Screenshot"> | Date | string;
    extractions?: Prisma.ExtractionListRelationFilter;
};
export type ScreenshotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    fullPage?: Prisma.SortOrder;
    width?: Prisma.SortOrderInput | Prisma.SortOrder;
    height?: Prisma.SortOrderInput | Prisma.SortOrder;
    capturedAt?: Prisma.SortOrder;
    extractions?: Prisma.ExtractionOrderByRelationAggregateInput;
};
export type ScreenshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ScreenshotWhereInput | Prisma.ScreenshotWhereInput[];
    OR?: Prisma.ScreenshotWhereInput[];
    NOT?: Prisma.ScreenshotWhereInput | Prisma.ScreenshotWhereInput[];
    filePath?: Prisma.StringFilter<"Screenshot"> | string;
    url?: Prisma.StringFilter<"Screenshot"> | string;
    fullPage?: Prisma.BoolFilter<"Screenshot"> | boolean;
    width?: Prisma.IntNullableFilter<"Screenshot"> | number | null;
    height?: Prisma.IntNullableFilter<"Screenshot"> | number | null;
    capturedAt?: Prisma.DateTimeFilter<"Screenshot"> | Date | string;
    extractions?: Prisma.ExtractionListRelationFilter;
}, "id">;
export type ScreenshotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    fullPage?: Prisma.SortOrder;
    width?: Prisma.SortOrderInput | Prisma.SortOrder;
    height?: Prisma.SortOrderInput | Prisma.SortOrder;
    capturedAt?: Prisma.SortOrder;
    _count?: Prisma.ScreenshotCountOrderByAggregateInput;
    _avg?: Prisma.ScreenshotAvgOrderByAggregateInput;
    _max?: Prisma.ScreenshotMaxOrderByAggregateInput;
    _min?: Prisma.ScreenshotMinOrderByAggregateInput;
    _sum?: Prisma.ScreenshotSumOrderByAggregateInput;
};
export type ScreenshotScalarWhereWithAggregatesInput = {
    AND?: Prisma.ScreenshotScalarWhereWithAggregatesInput | Prisma.ScreenshotScalarWhereWithAggregatesInput[];
    OR?: Prisma.ScreenshotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ScreenshotScalarWhereWithAggregatesInput | Prisma.ScreenshotScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Screenshot"> | string;
    filePath?: Prisma.StringWithAggregatesFilter<"Screenshot"> | string;
    url?: Prisma.StringWithAggregatesFilter<"Screenshot"> | string;
    fullPage?: Prisma.BoolWithAggregatesFilter<"Screenshot"> | boolean;
    width?: Prisma.IntNullableWithAggregatesFilter<"Screenshot"> | number | null;
    height?: Prisma.IntNullableWithAggregatesFilter<"Screenshot"> | number | null;
    capturedAt?: Prisma.DateTimeWithAggregatesFilter<"Screenshot"> | Date | string;
};
export type ScreenshotCreateInput = {
    id?: string;
    filePath: string;
    url: string;
    fullPage?: boolean;
    width?: number | null;
    height?: number | null;
    capturedAt?: Date | string;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutScreenshotInput;
};
export type ScreenshotUncheckedCreateInput = {
    id?: string;
    filePath: string;
    url: string;
    fullPage?: boolean;
    width?: number | null;
    height?: number | null;
    capturedAt?: Date | string;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutScreenshotInput;
};
export type ScreenshotUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    fullPage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    width?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    capturedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extractions?: Prisma.ExtractionUpdateManyWithoutScreenshotNestedInput;
};
export type ScreenshotUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    fullPage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    width?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    capturedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutScreenshotNestedInput;
};
export type ScreenshotCreateManyInput = {
    id?: string;
    filePath: string;
    url: string;
    fullPage?: boolean;
    width?: number | null;
    height?: number | null;
    capturedAt?: Date | string;
};
export type ScreenshotUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    fullPage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    width?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    capturedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ScreenshotUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    fullPage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    width?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    capturedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ScreenshotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    fullPage?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    capturedAt?: Prisma.SortOrder;
};
export type ScreenshotAvgOrderByAggregateInput = {
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
};
export type ScreenshotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    fullPage?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    capturedAt?: Prisma.SortOrder;
};
export type ScreenshotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    fullPage?: Prisma.SortOrder;
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
    capturedAt?: Prisma.SortOrder;
};
export type ScreenshotSumOrderByAggregateInput = {
    width?: Prisma.SortOrder;
    height?: Prisma.SortOrder;
};
export type ScreenshotNullableScalarRelationFilter = {
    is?: Prisma.ScreenshotWhereInput | null;
    isNot?: Prisma.ScreenshotWhereInput | null;
};
export type ScreenshotCreateNestedOneWithoutExtractionsInput = {
    create?: Prisma.XOR<Prisma.ScreenshotCreateWithoutExtractionsInput, Prisma.ScreenshotUncheckedCreateWithoutExtractionsInput>;
    connectOrCreate?: Prisma.ScreenshotCreateOrConnectWithoutExtractionsInput;
    connect?: Prisma.ScreenshotWhereUniqueInput;
};
export type ScreenshotUpdateOneWithoutExtractionsNestedInput = {
    create?: Prisma.XOR<Prisma.ScreenshotCreateWithoutExtractionsInput, Prisma.ScreenshotUncheckedCreateWithoutExtractionsInput>;
    connectOrCreate?: Prisma.ScreenshotCreateOrConnectWithoutExtractionsInput;
    upsert?: Prisma.ScreenshotUpsertWithoutExtractionsInput;
    disconnect?: Prisma.ScreenshotWhereInput | boolean;
    delete?: Prisma.ScreenshotWhereInput | boolean;
    connect?: Prisma.ScreenshotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ScreenshotUpdateToOneWithWhereWithoutExtractionsInput, Prisma.ScreenshotUpdateWithoutExtractionsInput>, Prisma.ScreenshotUncheckedUpdateWithoutExtractionsInput>;
};
export type ScreenshotCreateWithoutExtractionsInput = {
    id?: string;
    filePath: string;
    url: string;
    fullPage?: boolean;
    width?: number | null;
    height?: number | null;
    capturedAt?: Date | string;
};
export type ScreenshotUncheckedCreateWithoutExtractionsInput = {
    id?: string;
    filePath: string;
    url: string;
    fullPage?: boolean;
    width?: number | null;
    height?: number | null;
    capturedAt?: Date | string;
};
export type ScreenshotCreateOrConnectWithoutExtractionsInput = {
    where: Prisma.ScreenshotWhereUniqueInput;
    create: Prisma.XOR<Prisma.ScreenshotCreateWithoutExtractionsInput, Prisma.ScreenshotUncheckedCreateWithoutExtractionsInput>;
};
export type ScreenshotUpsertWithoutExtractionsInput = {
    update: Prisma.XOR<Prisma.ScreenshotUpdateWithoutExtractionsInput, Prisma.ScreenshotUncheckedUpdateWithoutExtractionsInput>;
    create: Prisma.XOR<Prisma.ScreenshotCreateWithoutExtractionsInput, Prisma.ScreenshotUncheckedCreateWithoutExtractionsInput>;
    where?: Prisma.ScreenshotWhereInput;
};
export type ScreenshotUpdateToOneWithWhereWithoutExtractionsInput = {
    where?: Prisma.ScreenshotWhereInput;
    data: Prisma.XOR<Prisma.ScreenshotUpdateWithoutExtractionsInput, Prisma.ScreenshotUncheckedUpdateWithoutExtractionsInput>;
};
export type ScreenshotUpdateWithoutExtractionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    fullPage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    width?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    capturedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ScreenshotUncheckedUpdateWithoutExtractionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    fullPage?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    width?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    height?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    capturedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type ScreenshotCountOutputType
 */
export type ScreenshotCountOutputType = {
    extractions: number;
};
export type ScreenshotCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extractions?: boolean | ScreenshotCountOutputTypeCountExtractionsArgs;
};
/**
 * ScreenshotCountOutputType without action
 */
export type ScreenshotCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScreenshotCountOutputType
     */
    select?: Prisma.ScreenshotCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * ScreenshotCountOutputType without action
 */
export type ScreenshotCountOutputTypeCountExtractionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExtractionWhereInput;
};
export type ScreenshotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    filePath?: boolean;
    url?: boolean;
    fullPage?: boolean;
    width?: boolean;
    height?: boolean;
    capturedAt?: boolean;
    extractions?: boolean | Prisma.Screenshot$extractionsArgs<ExtArgs>;
    _count?: boolean | Prisma.ScreenshotCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["screenshot"]>;
export type ScreenshotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    filePath?: boolean;
    url?: boolean;
    fullPage?: boolean;
    width?: boolean;
    height?: boolean;
    capturedAt?: boolean;
}, ExtArgs["result"]["screenshot"]>;
export type ScreenshotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    filePath?: boolean;
    url?: boolean;
    fullPage?: boolean;
    width?: boolean;
    height?: boolean;
    capturedAt?: boolean;
}, ExtArgs["result"]["screenshot"]>;
export type ScreenshotSelectScalar = {
    id?: boolean;
    filePath?: boolean;
    url?: boolean;
    fullPage?: boolean;
    width?: boolean;
    height?: boolean;
    capturedAt?: boolean;
};
export type ScreenshotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "filePath" | "url" | "fullPage" | "width" | "height" | "capturedAt", ExtArgs["result"]["screenshot"]>;
export type ScreenshotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    extractions?: boolean | Prisma.Screenshot$extractionsArgs<ExtArgs>;
    _count?: boolean | Prisma.ScreenshotCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ScreenshotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ScreenshotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ScreenshotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Screenshot";
    objects: {
        extractions: Prisma.$ExtractionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        filePath: string;
        url: string;
        fullPage: boolean;
        width: number | null;
        height: number | null;
        capturedAt: Date;
    }, ExtArgs["result"]["screenshot"]>;
    composites: {};
};
export type ScreenshotGetPayload<S extends boolean | null | undefined | ScreenshotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload, S>;
export type ScreenshotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ScreenshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ScreenshotCountAggregateInputType | true;
};
export interface ScreenshotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Screenshot'];
        meta: {
            name: 'Screenshot';
        };
    };
    /**
     * Find zero or one Screenshot that matches the filter.
     * @param {ScreenshotFindUniqueArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScreenshotFindUniqueArgs>(args: Prisma.SelectSubset<T, ScreenshotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ScreenshotClient<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Screenshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScreenshotFindUniqueOrThrowArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScreenshotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ScreenshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ScreenshotClient<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Screenshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotFindFirstArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScreenshotFindFirstArgs>(args?: Prisma.SelectSubset<T, ScreenshotFindFirstArgs<ExtArgs>>): Prisma.Prisma__ScreenshotClient<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Screenshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotFindFirstOrThrowArgs} args - Arguments to find a Screenshot
     * @example
     * // Get one Screenshot
     * const screenshot = await prisma.screenshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScreenshotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ScreenshotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ScreenshotClient<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Screenshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Screenshots
     * const screenshots = await prisma.screenshot.findMany()
     *
     * // Get first 10 Screenshots
     * const screenshots = await prisma.screenshot.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const screenshotWithIdOnly = await prisma.screenshot.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ScreenshotFindManyArgs>(args?: Prisma.SelectSubset<T, ScreenshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Screenshot.
     * @param {ScreenshotCreateArgs} args - Arguments to create a Screenshot.
     * @example
     * // Create one Screenshot
     * const Screenshot = await prisma.screenshot.create({
     *   data: {
     *     // ... data to create a Screenshot
     *   }
     * })
     *
     */
    create<T extends ScreenshotCreateArgs>(args: Prisma.SelectSubset<T, ScreenshotCreateArgs<ExtArgs>>): Prisma.Prisma__ScreenshotClient<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Screenshots.
     * @param {ScreenshotCreateManyArgs} args - Arguments to create many Screenshots.
     * @example
     * // Create many Screenshots
     * const screenshot = await prisma.screenshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ScreenshotCreateManyArgs>(args?: Prisma.SelectSubset<T, ScreenshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Screenshots and returns the data saved in the database.
     * @param {ScreenshotCreateManyAndReturnArgs} args - Arguments to create many Screenshots.
     * @example
     * // Create many Screenshots
     * const screenshot = await prisma.screenshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Screenshots and only return the `id`
     * const screenshotWithIdOnly = await prisma.screenshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ScreenshotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ScreenshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Screenshot.
     * @param {ScreenshotDeleteArgs} args - Arguments to delete one Screenshot.
     * @example
     * // Delete one Screenshot
     * const Screenshot = await prisma.screenshot.delete({
     *   where: {
     *     // ... filter to delete one Screenshot
     *   }
     * })
     *
     */
    delete<T extends ScreenshotDeleteArgs>(args: Prisma.SelectSubset<T, ScreenshotDeleteArgs<ExtArgs>>): Prisma.Prisma__ScreenshotClient<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Screenshot.
     * @param {ScreenshotUpdateArgs} args - Arguments to update one Screenshot.
     * @example
     * // Update one Screenshot
     * const screenshot = await prisma.screenshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ScreenshotUpdateArgs>(args: Prisma.SelectSubset<T, ScreenshotUpdateArgs<ExtArgs>>): Prisma.Prisma__ScreenshotClient<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Screenshots.
     * @param {ScreenshotDeleteManyArgs} args - Arguments to filter Screenshots to delete.
     * @example
     * // Delete a few Screenshots
     * const { count } = await prisma.screenshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ScreenshotDeleteManyArgs>(args?: Prisma.SelectSubset<T, ScreenshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Screenshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Screenshots
     * const screenshot = await prisma.screenshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ScreenshotUpdateManyArgs>(args: Prisma.SelectSubset<T, ScreenshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Screenshots and returns the data updated in the database.
     * @param {ScreenshotUpdateManyAndReturnArgs} args - Arguments to update many Screenshots.
     * @example
     * // Update many Screenshots
     * const screenshot = await prisma.screenshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Screenshots and only return the `id`
     * const screenshotWithIdOnly = await prisma.screenshot.updateManyAndReturn({
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
    updateManyAndReturn<T extends ScreenshotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ScreenshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Screenshot.
     * @param {ScreenshotUpsertArgs} args - Arguments to update or create a Screenshot.
     * @example
     * // Update or create a Screenshot
     * const screenshot = await prisma.screenshot.upsert({
     *   create: {
     *     // ... data to create a Screenshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Screenshot we want to update
     *   }
     * })
     */
    upsert<T extends ScreenshotUpsertArgs>(args: Prisma.SelectSubset<T, ScreenshotUpsertArgs<ExtArgs>>): Prisma.Prisma__ScreenshotClient<runtime.Types.Result.GetResult<Prisma.$ScreenshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Screenshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotCountArgs} args - Arguments to filter Screenshots to count.
     * @example
     * // Count the number of Screenshots
     * const count = await prisma.screenshot.count({
     *   where: {
     *     // ... the filter for the Screenshots we want to count
     *   }
     * })
    **/
    count<T extends ScreenshotCountArgs>(args?: Prisma.Subset<T, ScreenshotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ScreenshotCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Screenshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ScreenshotAggregateArgs>(args: Prisma.Subset<T, ScreenshotAggregateArgs>): Prisma.PrismaPromise<GetScreenshotAggregateType<T>>;
    /**
     * Group by Screenshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScreenshotGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ScreenshotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ScreenshotGroupByArgs['orderBy'];
    } : {
        orderBy?: ScreenshotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ScreenshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScreenshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Screenshot model
     */
    readonly fields: ScreenshotFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Screenshot.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ScreenshotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    extractions<T extends Prisma.Screenshot$extractionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Screenshot$extractionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Screenshot model
 */
export interface ScreenshotFieldRefs {
    readonly id: Prisma.FieldRef<"Screenshot", 'String'>;
    readonly filePath: Prisma.FieldRef<"Screenshot", 'String'>;
    readonly url: Prisma.FieldRef<"Screenshot", 'String'>;
    readonly fullPage: Prisma.FieldRef<"Screenshot", 'Boolean'>;
    readonly width: Prisma.FieldRef<"Screenshot", 'Int'>;
    readonly height: Prisma.FieldRef<"Screenshot", 'Int'>;
    readonly capturedAt: Prisma.FieldRef<"Screenshot", 'DateTime'>;
}
/**
 * Screenshot findUnique
 */
export type ScreenshotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ScreenshotInclude<ExtArgs> | null;
    /**
     * Filter, which Screenshot to fetch.
     */
    where: Prisma.ScreenshotWhereUniqueInput;
};
/**
 * Screenshot findUniqueOrThrow
 */
export type ScreenshotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ScreenshotInclude<ExtArgs> | null;
    /**
     * Filter, which Screenshot to fetch.
     */
    where: Prisma.ScreenshotWhereUniqueInput;
};
/**
 * Screenshot findFirst
 */
export type ScreenshotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ScreenshotInclude<ExtArgs> | null;
    /**
     * Filter, which Screenshot to fetch.
     */
    where?: Prisma.ScreenshotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: Prisma.ScreenshotOrderByWithRelationInput | Prisma.ScreenshotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Screenshots.
     */
    cursor?: Prisma.ScreenshotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Screenshots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Screenshots.
     */
    distinct?: Prisma.ScreenshotScalarFieldEnum | Prisma.ScreenshotScalarFieldEnum[];
};
/**
 * Screenshot findFirstOrThrow
 */
export type ScreenshotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ScreenshotInclude<ExtArgs> | null;
    /**
     * Filter, which Screenshot to fetch.
     */
    where?: Prisma.ScreenshotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: Prisma.ScreenshotOrderByWithRelationInput | Prisma.ScreenshotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Screenshots.
     */
    cursor?: Prisma.ScreenshotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Screenshots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Screenshots.
     */
    distinct?: Prisma.ScreenshotScalarFieldEnum | Prisma.ScreenshotScalarFieldEnum[];
};
/**
 * Screenshot findMany
 */
export type ScreenshotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ScreenshotInclude<ExtArgs> | null;
    /**
     * Filter, which Screenshots to fetch.
     */
    where?: Prisma.ScreenshotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Screenshots to fetch.
     */
    orderBy?: Prisma.ScreenshotOrderByWithRelationInput | Prisma.ScreenshotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Screenshots.
     */
    cursor?: Prisma.ScreenshotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Screenshots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Screenshots.
     */
    skip?: number;
    distinct?: Prisma.ScreenshotScalarFieldEnum | Prisma.ScreenshotScalarFieldEnum[];
};
/**
 * Screenshot create
 */
export type ScreenshotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ScreenshotInclude<ExtArgs> | null;
    /**
     * The data needed to create a Screenshot.
     */
    data: Prisma.XOR<Prisma.ScreenshotCreateInput, Prisma.ScreenshotUncheckedCreateInput>;
};
/**
 * Screenshot createMany
 */
export type ScreenshotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Screenshots.
     */
    data: Prisma.ScreenshotCreateManyInput | Prisma.ScreenshotCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Screenshot createManyAndReturn
 */
export type ScreenshotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * The data used to create many Screenshots.
     */
    data: Prisma.ScreenshotCreateManyInput | Prisma.ScreenshotCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Screenshot update
 */
export type ScreenshotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ScreenshotInclude<ExtArgs> | null;
    /**
     * The data needed to update a Screenshot.
     */
    data: Prisma.XOR<Prisma.ScreenshotUpdateInput, Prisma.ScreenshotUncheckedUpdateInput>;
    /**
     * Choose, which Screenshot to update.
     */
    where: Prisma.ScreenshotWhereUniqueInput;
};
/**
 * Screenshot updateMany
 */
export type ScreenshotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Screenshots.
     */
    data: Prisma.XOR<Prisma.ScreenshotUpdateManyMutationInput, Prisma.ScreenshotUncheckedUpdateManyInput>;
    /**
     * Filter which Screenshots to update
     */
    where?: Prisma.ScreenshotWhereInput;
    /**
     * Limit how many Screenshots to update.
     */
    limit?: number;
};
/**
 * Screenshot updateManyAndReturn
 */
export type ScreenshotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * The data used to update Screenshots.
     */
    data: Prisma.XOR<Prisma.ScreenshotUpdateManyMutationInput, Prisma.ScreenshotUncheckedUpdateManyInput>;
    /**
     * Filter which Screenshots to update
     */
    where?: Prisma.ScreenshotWhereInput;
    /**
     * Limit how many Screenshots to update.
     */
    limit?: number;
};
/**
 * Screenshot upsert
 */
export type ScreenshotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ScreenshotInclude<ExtArgs> | null;
    /**
     * The filter to search for the Screenshot to update in case it exists.
     */
    where: Prisma.ScreenshotWhereUniqueInput;
    /**
     * In case the Screenshot found by the `where` argument doesn't exist, create a new Screenshot with this data.
     */
    create: Prisma.XOR<Prisma.ScreenshotCreateInput, Prisma.ScreenshotUncheckedCreateInput>;
    /**
     * In case the Screenshot was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ScreenshotUpdateInput, Prisma.ScreenshotUncheckedUpdateInput>;
};
/**
 * Screenshot delete
 */
export type ScreenshotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ScreenshotInclude<ExtArgs> | null;
    /**
     * Filter which Screenshot to delete.
     */
    where: Prisma.ScreenshotWhereUniqueInput;
};
/**
 * Screenshot deleteMany
 */
export type ScreenshotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Screenshots to delete
     */
    where?: Prisma.ScreenshotWhereInput;
    /**
     * Limit how many Screenshots to delete.
     */
    limit?: number;
};
/**
 * Screenshot.extractions
 */
export type Screenshot$extractionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Screenshot without action
 */
export type ScreenshotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Screenshot
     */
    select?: Prisma.ScreenshotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Screenshot
     */
    omit?: Prisma.ScreenshotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ScreenshotInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Screenshot.d.ts.map