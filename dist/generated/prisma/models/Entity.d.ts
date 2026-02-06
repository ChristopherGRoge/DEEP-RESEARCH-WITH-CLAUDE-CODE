import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Entity
 * An entity being researched (e.g., a tool, framework, product)
 */
export type EntityModel = runtime.Types.Result.DefaultSelection<Prisma.$EntityPayload>;
export type AggregateEntity = {
    _count: EntityCountAggregateOutputType | null;
    _avg: EntityAvgAggregateOutputType | null;
    _sum: EntitySumAggregateOutputType | null;
    _min: EntityMinAggregateOutputType | null;
    _max: EntityMaxAggregateOutputType | null;
};
export type EntityAvgAggregateOutputType = {
    githubStars: number | null;
    githubForks: number | null;
    githubWatchers: number | null;
    githubOpenIssues: number | null;
    githubContributors: number | null;
    buzzScore: number | null;
    buzzOverride: number | null;
};
export type EntitySumAggregateOutputType = {
    githubStars: number | null;
    githubForks: number | null;
    githubWatchers: number | null;
    githubOpenIssues: number | null;
    githubContributors: number | null;
    buzzScore: number | null;
    buzzOverride: number | null;
};
export type EntityMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    entityType: string | null;
    url: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    discoveryCategory: string | null;
    categoryId: string | null;
    domainId: string | null;
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean | null;
    githubUrl: string | null;
    githubOwner: string | null;
    githubRepo: string | null;
    githubStars: number | null;
    githubForks: number | null;
    githubWatchers: number | null;
    githubOpenIssues: number | null;
    githubContributors: number | null;
    githubLastCommit: Date | null;
    githubLastRelease: Date | null;
    githubLanguage: string | null;
    githubLicense: string | null;
    githubCreatedAt: Date | null;
    githubMetricsAt: Date | null;
    buzzScore: number | null;
    buzzCalculatedAt: Date | null;
    buzzOverride: number | null;
    buzzOverrideReason: string | null;
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
    discoveryCategory: string | null;
    categoryId: string | null;
    domainId: string | null;
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean | null;
    githubUrl: string | null;
    githubOwner: string | null;
    githubRepo: string | null;
    githubStars: number | null;
    githubForks: number | null;
    githubWatchers: number | null;
    githubOpenIssues: number | null;
    githubContributors: number | null;
    githubLastCommit: Date | null;
    githubLastRelease: Date | null;
    githubLanguage: string | null;
    githubLicense: string | null;
    githubCreatedAt: Date | null;
    githubMetricsAt: Date | null;
    buzzScore: number | null;
    buzzCalculatedAt: Date | null;
    buzzOverride: number | null;
    buzzOverrideReason: string | null;
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
    discoveryCategory: number;
    categoryId: number;
    domainId: number;
    logoUrl: number;
    logoPath: number;
    logoFormat: number;
    logoSvgContent: number;
    logoSourceUrl: number;
    logoFetchedAt: number;
    logoVerified: number;
    githubUrl: number;
    githubOwner: number;
    githubRepo: number;
    githubStars: number;
    githubForks: number;
    githubWatchers: number;
    githubOpenIssues: number;
    githubContributors: number;
    githubLastCommit: number;
    githubLastRelease: number;
    githubLanguage: number;
    githubLicense: number;
    githubCreatedAt: number;
    githubMetricsAt: number;
    buzzScore: number;
    buzzComponents: number;
    buzzCalculatedAt: number;
    buzzOverride: number;
    buzzOverrideReason: number;
    projectId: number;
    _all: number;
};
export type EntityAvgAggregateInputType = {
    githubStars?: true;
    githubForks?: true;
    githubWatchers?: true;
    githubOpenIssues?: true;
    githubContributors?: true;
    buzzScore?: true;
    buzzOverride?: true;
};
export type EntitySumAggregateInputType = {
    githubStars?: true;
    githubForks?: true;
    githubWatchers?: true;
    githubOpenIssues?: true;
    githubContributors?: true;
    buzzScore?: true;
    buzzOverride?: true;
};
export type EntityMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    entityType?: true;
    url?: true;
    createdAt?: true;
    updatedAt?: true;
    discoveryCategory?: true;
    categoryId?: true;
    domainId?: true;
    logoUrl?: true;
    logoPath?: true;
    logoFormat?: true;
    logoSvgContent?: true;
    logoSourceUrl?: true;
    logoFetchedAt?: true;
    logoVerified?: true;
    githubUrl?: true;
    githubOwner?: true;
    githubRepo?: true;
    githubStars?: true;
    githubForks?: true;
    githubWatchers?: true;
    githubOpenIssues?: true;
    githubContributors?: true;
    githubLastCommit?: true;
    githubLastRelease?: true;
    githubLanguage?: true;
    githubLicense?: true;
    githubCreatedAt?: true;
    githubMetricsAt?: true;
    buzzScore?: true;
    buzzCalculatedAt?: true;
    buzzOverride?: true;
    buzzOverrideReason?: true;
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
    discoveryCategory?: true;
    categoryId?: true;
    domainId?: true;
    logoUrl?: true;
    logoPath?: true;
    logoFormat?: true;
    logoSvgContent?: true;
    logoSourceUrl?: true;
    logoFetchedAt?: true;
    logoVerified?: true;
    githubUrl?: true;
    githubOwner?: true;
    githubRepo?: true;
    githubStars?: true;
    githubForks?: true;
    githubWatchers?: true;
    githubOpenIssues?: true;
    githubContributors?: true;
    githubLastCommit?: true;
    githubLastRelease?: true;
    githubLanguage?: true;
    githubLicense?: true;
    githubCreatedAt?: true;
    githubMetricsAt?: true;
    buzzScore?: true;
    buzzCalculatedAt?: true;
    buzzOverride?: true;
    buzzOverrideReason?: true;
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
    discoveryCategory?: true;
    categoryId?: true;
    domainId?: true;
    logoUrl?: true;
    logoPath?: true;
    logoFormat?: true;
    logoSvgContent?: true;
    logoSourceUrl?: true;
    logoFetchedAt?: true;
    logoVerified?: true;
    githubUrl?: true;
    githubOwner?: true;
    githubRepo?: true;
    githubStars?: true;
    githubForks?: true;
    githubWatchers?: true;
    githubOpenIssues?: true;
    githubContributors?: true;
    githubLastCommit?: true;
    githubLastRelease?: true;
    githubLanguage?: true;
    githubLicense?: true;
    githubCreatedAt?: true;
    githubMetricsAt?: true;
    buzzScore?: true;
    buzzComponents?: true;
    buzzCalculatedAt?: true;
    buzzOverride?: true;
    buzzOverrideReason?: true;
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
     * Select which fields to average
    **/
    _avg?: EntityAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: EntitySumAggregateInputType;
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
    _avg?: EntityAvgAggregateInputType;
    _sum?: EntitySumAggregateInputType;
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
    discoveryCategory: string | null;
    categoryId: string | null;
    domainId: string | null;
    logoUrl: string | null;
    logoPath: string | null;
    logoFormat: string | null;
    logoSvgContent: string | null;
    logoSourceUrl: string | null;
    logoFetchedAt: Date | null;
    logoVerified: boolean;
    githubUrl: string | null;
    githubOwner: string | null;
    githubRepo: string | null;
    githubStars: number | null;
    githubForks: number | null;
    githubWatchers: number | null;
    githubOpenIssues: number | null;
    githubContributors: number | null;
    githubLastCommit: Date | null;
    githubLastRelease: Date | null;
    githubLanguage: string | null;
    githubLicense: string | null;
    githubCreatedAt: Date | null;
    githubMetricsAt: Date | null;
    buzzScore: number | null;
    buzzComponents: runtime.JsonValue | null;
    buzzCalculatedAt: Date | null;
    buzzOverride: number | null;
    buzzOverrideReason: string | null;
    projectId: string;
    _count: EntityCountAggregateOutputType | null;
    _avg: EntityAvgAggregateOutputType | null;
    _sum: EntitySumAggregateOutputType | null;
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
    discoveryCategory?: Prisma.StringNullableFilter<"Entity"> | string | null;
    categoryId?: Prisma.StringNullableFilter<"Entity"> | string | null;
    domainId?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoPath?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFormat?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSvgContent?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSourceUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFetchedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    logoVerified?: Prisma.BoolFilter<"Entity"> | boolean;
    githubUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubOwner?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubRepo?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubStars?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubForks?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubWatchers?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubOpenIssues?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubContributors?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubLastCommit?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    githubLastRelease?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    githubLanguage?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubLicense?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubCreatedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    githubMetricsAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    buzzScore?: Prisma.FloatNullableFilter<"Entity"> | number | null;
    buzzComponents?: Prisma.JsonNullableFilter<"Entity">;
    buzzCalculatedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    buzzOverride?: Prisma.FloatNullableFilter<"Entity"> | number | null;
    buzzOverrideReason?: Prisma.StringNullableFilter<"Entity"> | string | null;
    projectId?: Prisma.StringFilter<"Entity"> | string;
    category?: Prisma.XOR<Prisma.DiscoveryCategoryNullableScalarRelationFilter, Prisma.DiscoveryCategoryWhereInput> | null;
    domain?: Prisma.XOR<Prisma.ResearchDomainNullableScalarRelationFilter, Prisma.ResearchDomainWhereInput> | null;
    project?: Prisma.XOR<Prisma.ResearchProjectScalarRelationFilter, Prisma.ResearchProjectWhereInput>;
    assertions?: Prisma.AssertionListRelationFilter;
    extractions?: Prisma.ExtractionListRelationFilter;
    researchSessions?: Prisma.ResearchSessionListRelationFilter;
    relationshipsFrom?: Prisma.EntityRelationshipListRelationFilter;
    relationshipsTo?: Prisma.EntityRelationshipListRelationFilter;
    positioning?: Prisma.XOR<Prisma.EntityPositioningNullableScalarRelationFilter, Prisma.EntityPositioningWhereInput> | null;
    forces?: Prisma.EntityForceListRelationFilter;
};
export type EntityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityType?: Prisma.SortOrderInput | Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    discoveryCategory?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    domainId?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoFormat?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoSvgContent?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoSourceUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoFetchedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoVerified?: Prisma.SortOrder;
    githubUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubOwner?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubRepo?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubStars?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubForks?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubWatchers?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubOpenIssues?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubContributors?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubLastCommit?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubLastRelease?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubLanguage?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubLicense?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubCreatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubMetricsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    buzzScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    buzzComponents?: Prisma.SortOrderInput | Prisma.SortOrder;
    buzzCalculatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    buzzOverride?: Prisma.SortOrderInput | Prisma.SortOrder;
    buzzOverrideReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    category?: Prisma.DiscoveryCategoryOrderByWithRelationInput;
    domain?: Prisma.ResearchDomainOrderByWithRelationInput;
    project?: Prisma.ResearchProjectOrderByWithRelationInput;
    assertions?: Prisma.AssertionOrderByRelationAggregateInput;
    extractions?: Prisma.ExtractionOrderByRelationAggregateInput;
    researchSessions?: Prisma.ResearchSessionOrderByRelationAggregateInput;
    relationshipsFrom?: Prisma.EntityRelationshipOrderByRelationAggregateInput;
    relationshipsTo?: Prisma.EntityRelationshipOrderByRelationAggregateInput;
    positioning?: Prisma.EntityPositioningOrderByWithRelationInput;
    forces?: Prisma.EntityForceOrderByRelationAggregateInput;
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
    discoveryCategory?: Prisma.StringNullableFilter<"Entity"> | string | null;
    categoryId?: Prisma.StringNullableFilter<"Entity"> | string | null;
    domainId?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoPath?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFormat?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSvgContent?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSourceUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFetchedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    logoVerified?: Prisma.BoolFilter<"Entity"> | boolean;
    githubUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubOwner?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubRepo?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubStars?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubForks?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubWatchers?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubOpenIssues?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubContributors?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubLastCommit?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    githubLastRelease?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    githubLanguage?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubLicense?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubCreatedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    githubMetricsAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    buzzScore?: Prisma.FloatNullableFilter<"Entity"> | number | null;
    buzzComponents?: Prisma.JsonNullableFilter<"Entity">;
    buzzCalculatedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    buzzOverride?: Prisma.FloatNullableFilter<"Entity"> | number | null;
    buzzOverrideReason?: Prisma.StringNullableFilter<"Entity"> | string | null;
    projectId?: Prisma.StringFilter<"Entity"> | string;
    category?: Prisma.XOR<Prisma.DiscoveryCategoryNullableScalarRelationFilter, Prisma.DiscoveryCategoryWhereInput> | null;
    domain?: Prisma.XOR<Prisma.ResearchDomainNullableScalarRelationFilter, Prisma.ResearchDomainWhereInput> | null;
    project?: Prisma.XOR<Prisma.ResearchProjectScalarRelationFilter, Prisma.ResearchProjectWhereInput>;
    assertions?: Prisma.AssertionListRelationFilter;
    extractions?: Prisma.ExtractionListRelationFilter;
    researchSessions?: Prisma.ResearchSessionListRelationFilter;
    relationshipsFrom?: Prisma.EntityRelationshipListRelationFilter;
    relationshipsTo?: Prisma.EntityRelationshipListRelationFilter;
    positioning?: Prisma.XOR<Prisma.EntityPositioningNullableScalarRelationFilter, Prisma.EntityPositioningWhereInput> | null;
    forces?: Prisma.EntityForceListRelationFilter;
}, "id" | "projectId_name">;
export type EntityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    entityType?: Prisma.SortOrderInput | Prisma.SortOrder;
    url?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    discoveryCategory?: Prisma.SortOrderInput | Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    domainId?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoPath?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoFormat?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoSvgContent?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoSourceUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoFetchedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    logoVerified?: Prisma.SortOrder;
    githubUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubOwner?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubRepo?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubStars?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubForks?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubWatchers?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubOpenIssues?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubContributors?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubLastCommit?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubLastRelease?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubLanguage?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubLicense?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubCreatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    githubMetricsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    buzzScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    buzzComponents?: Prisma.SortOrderInput | Prisma.SortOrder;
    buzzCalculatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    buzzOverride?: Prisma.SortOrderInput | Prisma.SortOrder;
    buzzOverrideReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    _count?: Prisma.EntityCountOrderByAggregateInput;
    _avg?: Prisma.EntityAvgOrderByAggregateInput;
    _max?: Prisma.EntityMaxOrderByAggregateInput;
    _min?: Prisma.EntityMinOrderByAggregateInput;
    _sum?: Prisma.EntitySumOrderByAggregateInput;
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
    discoveryCategory?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    categoryId?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    domainId?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoUrl?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoPath?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoFormat?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoSvgContent?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoSourceUrl?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    logoFetchedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Entity"> | Date | string | null;
    logoVerified?: Prisma.BoolWithAggregatesFilter<"Entity"> | boolean;
    githubUrl?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    githubOwner?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    githubRepo?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    githubStars?: Prisma.IntNullableWithAggregatesFilter<"Entity"> | number | null;
    githubForks?: Prisma.IntNullableWithAggregatesFilter<"Entity"> | number | null;
    githubWatchers?: Prisma.IntNullableWithAggregatesFilter<"Entity"> | number | null;
    githubOpenIssues?: Prisma.IntNullableWithAggregatesFilter<"Entity"> | number | null;
    githubContributors?: Prisma.IntNullableWithAggregatesFilter<"Entity"> | number | null;
    githubLastCommit?: Prisma.DateTimeNullableWithAggregatesFilter<"Entity"> | Date | string | null;
    githubLastRelease?: Prisma.DateTimeNullableWithAggregatesFilter<"Entity"> | Date | string | null;
    githubLanguage?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    githubLicense?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
    githubCreatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Entity"> | Date | string | null;
    githubMetricsAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Entity"> | Date | string | null;
    buzzScore?: Prisma.FloatNullableWithAggregatesFilter<"Entity"> | number | null;
    buzzComponents?: Prisma.JsonNullableWithAggregatesFilter<"Entity">;
    buzzCalculatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Entity"> | Date | string | null;
    buzzOverride?: Prisma.FloatNullableWithAggregatesFilter<"Entity"> | number | null;
    buzzOverrideReason?: Prisma.StringNullableWithAggregatesFilter<"Entity"> | string | null;
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
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    category?: Prisma.DiscoveryCategoryCreateNestedOneWithoutEntitiesInput;
    domain?: Prisma.ResearchDomainCreateNestedOneWithoutEntitiesInput;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningUncheckedCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput;
    domain?: Prisma.ResearchDomainUpdateOneWithoutEntitiesNestedInput;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
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
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type EntityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
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
    discoveryCategory?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    domainId?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    logoPath?: Prisma.SortOrder;
    logoFormat?: Prisma.SortOrder;
    logoSvgContent?: Prisma.SortOrder;
    logoSourceUrl?: Prisma.SortOrder;
    logoFetchedAt?: Prisma.SortOrder;
    logoVerified?: Prisma.SortOrder;
    githubUrl?: Prisma.SortOrder;
    githubOwner?: Prisma.SortOrder;
    githubRepo?: Prisma.SortOrder;
    githubStars?: Prisma.SortOrder;
    githubForks?: Prisma.SortOrder;
    githubWatchers?: Prisma.SortOrder;
    githubOpenIssues?: Prisma.SortOrder;
    githubContributors?: Prisma.SortOrder;
    githubLastCommit?: Prisma.SortOrder;
    githubLastRelease?: Prisma.SortOrder;
    githubLanguage?: Prisma.SortOrder;
    githubLicense?: Prisma.SortOrder;
    githubCreatedAt?: Prisma.SortOrder;
    githubMetricsAt?: Prisma.SortOrder;
    buzzScore?: Prisma.SortOrder;
    buzzComponents?: Prisma.SortOrder;
    buzzCalculatedAt?: Prisma.SortOrder;
    buzzOverride?: Prisma.SortOrder;
    buzzOverrideReason?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
};
export type EntityAvgOrderByAggregateInput = {
    githubStars?: Prisma.SortOrder;
    githubForks?: Prisma.SortOrder;
    githubWatchers?: Prisma.SortOrder;
    githubOpenIssues?: Prisma.SortOrder;
    githubContributors?: Prisma.SortOrder;
    buzzScore?: Prisma.SortOrder;
    buzzOverride?: Prisma.SortOrder;
};
export type EntityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    discoveryCategory?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    domainId?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    logoPath?: Prisma.SortOrder;
    logoFormat?: Prisma.SortOrder;
    logoSvgContent?: Prisma.SortOrder;
    logoSourceUrl?: Prisma.SortOrder;
    logoFetchedAt?: Prisma.SortOrder;
    logoVerified?: Prisma.SortOrder;
    githubUrl?: Prisma.SortOrder;
    githubOwner?: Prisma.SortOrder;
    githubRepo?: Prisma.SortOrder;
    githubStars?: Prisma.SortOrder;
    githubForks?: Prisma.SortOrder;
    githubWatchers?: Prisma.SortOrder;
    githubOpenIssues?: Prisma.SortOrder;
    githubContributors?: Prisma.SortOrder;
    githubLastCommit?: Prisma.SortOrder;
    githubLastRelease?: Prisma.SortOrder;
    githubLanguage?: Prisma.SortOrder;
    githubLicense?: Prisma.SortOrder;
    githubCreatedAt?: Prisma.SortOrder;
    githubMetricsAt?: Prisma.SortOrder;
    buzzScore?: Prisma.SortOrder;
    buzzCalculatedAt?: Prisma.SortOrder;
    buzzOverride?: Prisma.SortOrder;
    buzzOverrideReason?: Prisma.SortOrder;
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
    discoveryCategory?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    domainId?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    logoPath?: Prisma.SortOrder;
    logoFormat?: Prisma.SortOrder;
    logoSvgContent?: Prisma.SortOrder;
    logoSourceUrl?: Prisma.SortOrder;
    logoFetchedAt?: Prisma.SortOrder;
    logoVerified?: Prisma.SortOrder;
    githubUrl?: Prisma.SortOrder;
    githubOwner?: Prisma.SortOrder;
    githubRepo?: Prisma.SortOrder;
    githubStars?: Prisma.SortOrder;
    githubForks?: Prisma.SortOrder;
    githubWatchers?: Prisma.SortOrder;
    githubOpenIssues?: Prisma.SortOrder;
    githubContributors?: Prisma.SortOrder;
    githubLastCommit?: Prisma.SortOrder;
    githubLastRelease?: Prisma.SortOrder;
    githubLanguage?: Prisma.SortOrder;
    githubLicense?: Prisma.SortOrder;
    githubCreatedAt?: Prisma.SortOrder;
    githubMetricsAt?: Prisma.SortOrder;
    buzzScore?: Prisma.SortOrder;
    buzzCalculatedAt?: Prisma.SortOrder;
    buzzOverride?: Prisma.SortOrder;
    buzzOverrideReason?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
};
export type EntitySumOrderByAggregateInput = {
    githubStars?: Prisma.SortOrder;
    githubForks?: Prisma.SortOrder;
    githubWatchers?: Prisma.SortOrder;
    githubOpenIssues?: Prisma.SortOrder;
    githubContributors?: Prisma.SortOrder;
    buzzScore?: Prisma.SortOrder;
    buzzOverride?: Prisma.SortOrder;
};
export type EntityScalarRelationFilter = {
    is?: Prisma.EntityWhereInput;
    isNot?: Prisma.EntityWhereInput;
};
export type EntityNullableScalarRelationFilter = {
    is?: Prisma.EntityWhereInput | null;
    isNot?: Prisma.EntityWhereInput | null;
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
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
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
export type EntityCreateNestedOneWithoutResearchSessionsInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutResearchSessionsInput, Prisma.EntityUncheckedCreateWithoutResearchSessionsInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutResearchSessionsInput;
    connect?: Prisma.EntityWhereUniqueInput;
};
export type EntityUpdateOneRequiredWithoutResearchSessionsNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutResearchSessionsInput, Prisma.EntityUncheckedCreateWithoutResearchSessionsInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutResearchSessionsInput;
    upsert?: Prisma.EntityUpsertWithoutResearchSessionsInput;
    connect?: Prisma.EntityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EntityUpdateToOneWithWhereWithoutResearchSessionsInput, Prisma.EntityUpdateWithoutResearchSessionsInput>, Prisma.EntityUncheckedUpdateWithoutResearchSessionsInput>;
};
export type EntityCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutCategoryInput, Prisma.EntityUncheckedCreateWithoutCategoryInput> | Prisma.EntityCreateWithoutCategoryInput[] | Prisma.EntityUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutCategoryInput | Prisma.EntityCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.EntityCreateManyCategoryInputEnvelope;
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
};
export type EntityUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutCategoryInput, Prisma.EntityUncheckedCreateWithoutCategoryInput> | Prisma.EntityCreateWithoutCategoryInput[] | Prisma.EntityUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutCategoryInput | Prisma.EntityCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.EntityCreateManyCategoryInputEnvelope;
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
};
export type EntityUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutCategoryInput, Prisma.EntityUncheckedCreateWithoutCategoryInput> | Prisma.EntityCreateWithoutCategoryInput[] | Prisma.EntityUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutCategoryInput | Prisma.EntityCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.EntityUpsertWithWhereUniqueWithoutCategoryInput | Prisma.EntityUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.EntityCreateManyCategoryInputEnvelope;
    set?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    disconnect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    delete?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    update?: Prisma.EntityUpdateWithWhereUniqueWithoutCategoryInput | Prisma.EntityUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.EntityUpdateManyWithWhereWithoutCategoryInput | Prisma.EntityUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.EntityScalarWhereInput | Prisma.EntityScalarWhereInput[];
};
export type EntityUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutCategoryInput, Prisma.EntityUncheckedCreateWithoutCategoryInput> | Prisma.EntityCreateWithoutCategoryInput[] | Prisma.EntityUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutCategoryInput | Prisma.EntityCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.EntityUpsertWithWhereUniqueWithoutCategoryInput | Prisma.EntityUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.EntityCreateManyCategoryInputEnvelope;
    set?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    disconnect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    delete?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    update?: Prisma.EntityUpdateWithWhereUniqueWithoutCategoryInput | Prisma.EntityUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.EntityUpdateManyWithWhereWithoutCategoryInput | Prisma.EntityUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.EntityScalarWhereInput | Prisma.EntityScalarWhereInput[];
};
export type EntityCreateNestedManyWithoutDomainInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutDomainInput, Prisma.EntityUncheckedCreateWithoutDomainInput> | Prisma.EntityCreateWithoutDomainInput[] | Prisma.EntityUncheckedCreateWithoutDomainInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutDomainInput | Prisma.EntityCreateOrConnectWithoutDomainInput[];
    createMany?: Prisma.EntityCreateManyDomainInputEnvelope;
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
};
export type EntityUncheckedCreateNestedManyWithoutDomainInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutDomainInput, Prisma.EntityUncheckedCreateWithoutDomainInput> | Prisma.EntityCreateWithoutDomainInput[] | Prisma.EntityUncheckedCreateWithoutDomainInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutDomainInput | Prisma.EntityCreateOrConnectWithoutDomainInput[];
    createMany?: Prisma.EntityCreateManyDomainInputEnvelope;
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
};
export type EntityUpdateManyWithoutDomainNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutDomainInput, Prisma.EntityUncheckedCreateWithoutDomainInput> | Prisma.EntityCreateWithoutDomainInput[] | Prisma.EntityUncheckedCreateWithoutDomainInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutDomainInput | Prisma.EntityCreateOrConnectWithoutDomainInput[];
    upsert?: Prisma.EntityUpsertWithWhereUniqueWithoutDomainInput | Prisma.EntityUpsertWithWhereUniqueWithoutDomainInput[];
    createMany?: Prisma.EntityCreateManyDomainInputEnvelope;
    set?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    disconnect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    delete?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    update?: Prisma.EntityUpdateWithWhereUniqueWithoutDomainInput | Prisma.EntityUpdateWithWhereUniqueWithoutDomainInput[];
    updateMany?: Prisma.EntityUpdateManyWithWhereWithoutDomainInput | Prisma.EntityUpdateManyWithWhereWithoutDomainInput[];
    deleteMany?: Prisma.EntityScalarWhereInput | Prisma.EntityScalarWhereInput[];
};
export type EntityUncheckedUpdateManyWithoutDomainNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutDomainInput, Prisma.EntityUncheckedCreateWithoutDomainInput> | Prisma.EntityCreateWithoutDomainInput[] | Prisma.EntityUncheckedCreateWithoutDomainInput[];
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutDomainInput | Prisma.EntityCreateOrConnectWithoutDomainInput[];
    upsert?: Prisma.EntityUpsertWithWhereUniqueWithoutDomainInput | Prisma.EntityUpsertWithWhereUniqueWithoutDomainInput[];
    createMany?: Prisma.EntityCreateManyDomainInputEnvelope;
    set?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    disconnect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    delete?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    connect?: Prisma.EntityWhereUniqueInput | Prisma.EntityWhereUniqueInput[];
    update?: Prisma.EntityUpdateWithWhereUniqueWithoutDomainInput | Prisma.EntityUpdateWithWhereUniqueWithoutDomainInput[];
    updateMany?: Prisma.EntityUpdateManyWithWhereWithoutDomainInput | Prisma.EntityUpdateManyWithWhereWithoutDomainInput[];
    deleteMany?: Prisma.EntityScalarWhereInput | Prisma.EntityScalarWhereInput[];
};
export type EntityCreateNestedOneWithoutRelationshipsFromInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutRelationshipsFromInput, Prisma.EntityUncheckedCreateWithoutRelationshipsFromInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutRelationshipsFromInput;
    connect?: Prisma.EntityWhereUniqueInput;
};
export type EntityCreateNestedOneWithoutRelationshipsToInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutRelationshipsToInput, Prisma.EntityUncheckedCreateWithoutRelationshipsToInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutRelationshipsToInput;
    connect?: Prisma.EntityWhereUniqueInput;
};
export type EntityUpdateOneRequiredWithoutRelationshipsFromNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutRelationshipsFromInput, Prisma.EntityUncheckedCreateWithoutRelationshipsFromInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutRelationshipsFromInput;
    upsert?: Prisma.EntityUpsertWithoutRelationshipsFromInput;
    connect?: Prisma.EntityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EntityUpdateToOneWithWhereWithoutRelationshipsFromInput, Prisma.EntityUpdateWithoutRelationshipsFromInput>, Prisma.EntityUncheckedUpdateWithoutRelationshipsFromInput>;
};
export type EntityUpdateOneWithoutRelationshipsToNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutRelationshipsToInput, Prisma.EntityUncheckedCreateWithoutRelationshipsToInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutRelationshipsToInput;
    upsert?: Prisma.EntityUpsertWithoutRelationshipsToInput;
    disconnect?: Prisma.EntityWhereInput | boolean;
    delete?: Prisma.EntityWhereInput | boolean;
    connect?: Prisma.EntityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EntityUpdateToOneWithWhereWithoutRelationshipsToInput, Prisma.EntityUpdateWithoutRelationshipsToInput>, Prisma.EntityUncheckedUpdateWithoutRelationshipsToInput>;
};
export type EntityCreateNestedOneWithoutPositioningInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutPositioningInput, Prisma.EntityUncheckedCreateWithoutPositioningInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutPositioningInput;
    connect?: Prisma.EntityWhereUniqueInput;
};
export type EntityUpdateOneRequiredWithoutPositioningNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutPositioningInput, Prisma.EntityUncheckedCreateWithoutPositioningInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutPositioningInput;
    upsert?: Prisma.EntityUpsertWithoutPositioningInput;
    connect?: Prisma.EntityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EntityUpdateToOneWithWhereWithoutPositioningInput, Prisma.EntityUpdateWithoutPositioningInput>, Prisma.EntityUncheckedUpdateWithoutPositioningInput>;
};
export type EntityCreateNestedOneWithoutForcesInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutForcesInput, Prisma.EntityUncheckedCreateWithoutForcesInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutForcesInput;
    connect?: Prisma.EntityWhereUniqueInput;
};
export type EntityUpdateOneRequiredWithoutForcesNestedInput = {
    create?: Prisma.XOR<Prisma.EntityCreateWithoutForcesInput, Prisma.EntityUncheckedCreateWithoutForcesInput>;
    connectOrCreate?: Prisma.EntityCreateOrConnectWithoutForcesInput;
    upsert?: Prisma.EntityUpsertWithoutForcesInput;
    connect?: Prisma.EntityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EntityUpdateToOneWithWhereWithoutForcesInput, Prisma.EntityUpdateWithoutForcesInput>, Prisma.EntityUncheckedUpdateWithoutForcesInput>;
};
export type EntityCreateWithoutProjectInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    category?: Prisma.DiscoveryCategoryCreateNestedOneWithoutEntitiesInput;
    domain?: Prisma.ResearchDomainCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutProjectInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningUncheckedCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutProjectInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutProjectInput, Prisma.EntityUncheckedCreateWithoutProjectInput>;
};
export type EntityCreateManyProjectInputEnvelope = {
    data: Prisma.EntityCreateManyProjectInput | Prisma.EntityCreateManyProjectInput[];
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
    discoveryCategory?: Prisma.StringNullableFilter<"Entity"> | string | null;
    categoryId?: Prisma.StringNullableFilter<"Entity"> | string | null;
    domainId?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoPath?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFormat?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSvgContent?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoSourceUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    logoFetchedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    logoVerified?: Prisma.BoolFilter<"Entity"> | boolean;
    githubUrl?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubOwner?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubRepo?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubStars?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubForks?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubWatchers?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubOpenIssues?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubContributors?: Prisma.IntNullableFilter<"Entity"> | number | null;
    githubLastCommit?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    githubLastRelease?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    githubLanguage?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubLicense?: Prisma.StringNullableFilter<"Entity"> | string | null;
    githubCreatedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    githubMetricsAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    buzzScore?: Prisma.FloatNullableFilter<"Entity"> | number | null;
    buzzComponents?: Prisma.JsonNullableFilter<"Entity">;
    buzzCalculatedAt?: Prisma.DateTimeNullableFilter<"Entity"> | Date | string | null;
    buzzOverride?: Prisma.FloatNullableFilter<"Entity"> | number | null;
    buzzOverrideReason?: Prisma.StringNullableFilter<"Entity"> | string | null;
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
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    category?: Prisma.DiscoveryCategoryCreateNestedOneWithoutEntitiesInput;
    domain?: Prisma.ResearchDomainCreateNestedOneWithoutEntitiesInput;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutAssertionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningUncheckedCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceUncheckedCreateNestedManyWithoutEntityInput;
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
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput;
    domain?: Prisma.ResearchDomainUpdateOneWithoutEntitiesNestedInput;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutAssertionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityCreateWithoutExtractionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    category?: Prisma.DiscoveryCategoryCreateNestedOneWithoutEntitiesInput;
    domain?: Prisma.ResearchDomainCreateNestedOneWithoutEntitiesInput;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutExtractionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningUncheckedCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceUncheckedCreateNestedManyWithoutEntityInput;
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
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput;
    domain?: Prisma.ResearchDomainUpdateOneWithoutEntitiesNestedInput;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutExtractionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityCreateWithoutResearchSessionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    category?: Prisma.DiscoveryCategoryCreateNestedOneWithoutEntitiesInput;
    domain?: Prisma.ResearchDomainCreateNestedOneWithoutEntitiesInput;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutResearchSessionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningUncheckedCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutResearchSessionsInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutResearchSessionsInput, Prisma.EntityUncheckedCreateWithoutResearchSessionsInput>;
};
export type EntityUpsertWithoutResearchSessionsInput = {
    update: Prisma.XOR<Prisma.EntityUpdateWithoutResearchSessionsInput, Prisma.EntityUncheckedUpdateWithoutResearchSessionsInput>;
    create: Prisma.XOR<Prisma.EntityCreateWithoutResearchSessionsInput, Prisma.EntityUncheckedCreateWithoutResearchSessionsInput>;
    where?: Prisma.EntityWhereInput;
};
export type EntityUpdateToOneWithWhereWithoutResearchSessionsInput = {
    where?: Prisma.EntityWhereInput;
    data: Prisma.XOR<Prisma.EntityUpdateWithoutResearchSessionsInput, Prisma.EntityUncheckedUpdateWithoutResearchSessionsInput>;
};
export type EntityUpdateWithoutResearchSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput;
    domain?: Prisma.ResearchDomainUpdateOneWithoutEntitiesNestedInput;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutResearchSessionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    domain?: Prisma.ResearchDomainCreateNestedOneWithoutEntitiesInput;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutCategoryInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningUncheckedCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutCategoryInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutCategoryInput, Prisma.EntityUncheckedCreateWithoutCategoryInput>;
};
export type EntityCreateManyCategoryInputEnvelope = {
    data: Prisma.EntityCreateManyCategoryInput | Prisma.EntityCreateManyCategoryInput[];
};
export type EntityUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.EntityWhereUniqueInput;
    update: Prisma.XOR<Prisma.EntityUpdateWithoutCategoryInput, Prisma.EntityUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.EntityCreateWithoutCategoryInput, Prisma.EntityUncheckedCreateWithoutCategoryInput>;
};
export type EntityUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.EntityWhereUniqueInput;
    data: Prisma.XOR<Prisma.EntityUpdateWithoutCategoryInput, Prisma.EntityUncheckedUpdateWithoutCategoryInput>;
};
export type EntityUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.EntityScalarWhereInput;
    data: Prisma.XOR<Prisma.EntityUpdateManyMutationInput, Prisma.EntityUncheckedUpdateManyWithoutCategoryInput>;
};
export type EntityCreateWithoutDomainInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    category?: Prisma.DiscoveryCategoryCreateNestedOneWithoutEntitiesInput;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutDomainInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningUncheckedCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutDomainInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutDomainInput, Prisma.EntityUncheckedCreateWithoutDomainInput>;
};
export type EntityCreateManyDomainInputEnvelope = {
    data: Prisma.EntityCreateManyDomainInput | Prisma.EntityCreateManyDomainInput[];
};
export type EntityUpsertWithWhereUniqueWithoutDomainInput = {
    where: Prisma.EntityWhereUniqueInput;
    update: Prisma.XOR<Prisma.EntityUpdateWithoutDomainInput, Prisma.EntityUncheckedUpdateWithoutDomainInput>;
    create: Prisma.XOR<Prisma.EntityCreateWithoutDomainInput, Prisma.EntityUncheckedCreateWithoutDomainInput>;
};
export type EntityUpdateWithWhereUniqueWithoutDomainInput = {
    where: Prisma.EntityWhereUniqueInput;
    data: Prisma.XOR<Prisma.EntityUpdateWithoutDomainInput, Prisma.EntityUncheckedUpdateWithoutDomainInput>;
};
export type EntityUpdateManyWithWhereWithoutDomainInput = {
    where: Prisma.EntityScalarWhereInput;
    data: Prisma.XOR<Prisma.EntityUpdateManyMutationInput, Prisma.EntityUncheckedUpdateManyWithoutDomainInput>;
};
export type EntityCreateWithoutRelationshipsFromInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    category?: Prisma.DiscoveryCategoryCreateNestedOneWithoutEntitiesInput;
    domain?: Prisma.ResearchDomainCreateNestedOneWithoutEntitiesInput;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionCreateNestedManyWithoutEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutRelationshipsFromInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningUncheckedCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutRelationshipsFromInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutRelationshipsFromInput, Prisma.EntityUncheckedCreateWithoutRelationshipsFromInput>;
};
export type EntityCreateWithoutRelationshipsToInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    category?: Prisma.DiscoveryCategoryCreateNestedOneWithoutEntitiesInput;
    domain?: Prisma.ResearchDomainCreateNestedOneWithoutEntitiesInput;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipCreateNestedManyWithoutSourceEntityInput;
    positioning?: Prisma.EntityPositioningCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutRelationshipsToInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutSourceEntityInput;
    positioning?: Prisma.EntityPositioningUncheckedCreateNestedOneWithoutEntityInput;
    forces?: Prisma.EntityForceUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutRelationshipsToInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutRelationshipsToInput, Prisma.EntityUncheckedCreateWithoutRelationshipsToInput>;
};
export type EntityUpsertWithoutRelationshipsFromInput = {
    update: Prisma.XOR<Prisma.EntityUpdateWithoutRelationshipsFromInput, Prisma.EntityUncheckedUpdateWithoutRelationshipsFromInput>;
    create: Prisma.XOR<Prisma.EntityCreateWithoutRelationshipsFromInput, Prisma.EntityUncheckedCreateWithoutRelationshipsFromInput>;
    where?: Prisma.EntityWhereInput;
};
export type EntityUpdateToOneWithWhereWithoutRelationshipsFromInput = {
    where?: Prisma.EntityWhereInput;
    data: Prisma.XOR<Prisma.EntityUpdateWithoutRelationshipsFromInput, Prisma.EntityUncheckedUpdateWithoutRelationshipsFromInput>;
};
export type EntityUpdateWithoutRelationshipsFromInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput;
    domain?: Prisma.ResearchDomainUpdateOneWithoutEntitiesNestedInput;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUpdateManyWithoutEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutRelationshipsFromInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityUpsertWithoutRelationshipsToInput = {
    update: Prisma.XOR<Prisma.EntityUpdateWithoutRelationshipsToInput, Prisma.EntityUncheckedUpdateWithoutRelationshipsToInput>;
    create: Prisma.XOR<Prisma.EntityCreateWithoutRelationshipsToInput, Prisma.EntityUncheckedCreateWithoutRelationshipsToInput>;
    where?: Prisma.EntityWhereInput;
};
export type EntityUpdateToOneWithWhereWithoutRelationshipsToInput = {
    where?: Prisma.EntityWhereInput;
    data: Prisma.XOR<Prisma.EntityUpdateWithoutRelationshipsToInput, Prisma.EntityUncheckedUpdateWithoutRelationshipsToInput>;
};
export type EntityUpdateWithoutRelationshipsToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput;
    domain?: Prisma.ResearchDomainUpdateOneWithoutEntitiesNestedInput;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUpdateManyWithoutSourceEntityNestedInput;
    positioning?: Prisma.EntityPositioningUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutRelationshipsToInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutSourceEntityNestedInput;
    positioning?: Prisma.EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityCreateWithoutPositioningInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    category?: Prisma.DiscoveryCategoryCreateNestedOneWithoutEntitiesInput;
    domain?: Prisma.ResearchDomainCreateNestedOneWithoutEntitiesInput;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipCreateNestedManyWithoutTargetEntityInput;
    forces?: Prisma.EntityForceCreateNestedManyWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutPositioningInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutTargetEntityInput;
    forces?: Prisma.EntityForceUncheckedCreateNestedManyWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutPositioningInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutPositioningInput, Prisma.EntityUncheckedCreateWithoutPositioningInput>;
};
export type EntityUpsertWithoutPositioningInput = {
    update: Prisma.XOR<Prisma.EntityUpdateWithoutPositioningInput, Prisma.EntityUncheckedUpdateWithoutPositioningInput>;
    create: Prisma.XOR<Prisma.EntityCreateWithoutPositioningInput, Prisma.EntityUncheckedCreateWithoutPositioningInput>;
    where?: Prisma.EntityWhereInput;
};
export type EntityUpdateToOneWithWhereWithoutPositioningInput = {
    where?: Prisma.EntityWhereInput;
    data: Prisma.XOR<Prisma.EntityUpdateWithoutPositioningInput, Prisma.EntityUncheckedUpdateWithoutPositioningInput>;
};
export type EntityUpdateWithoutPositioningInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput;
    domain?: Prisma.ResearchDomainUpdateOneWithoutEntitiesNestedInput;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUpdateManyWithoutTargetEntityNestedInput;
    forces?: Prisma.EntityForceUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutPositioningInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutTargetEntityNestedInput;
    forces?: Prisma.EntityForceUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityCreateWithoutForcesInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    category?: Prisma.DiscoveryCategoryCreateNestedOneWithoutEntitiesInput;
    domain?: Prisma.ResearchDomainCreateNestedOneWithoutEntitiesInput;
    project: Prisma.ResearchProjectCreateNestedOneWithoutEntitiesInput;
    assertions?: Prisma.AssertionCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningCreateNestedOneWithoutEntityInput;
};
export type EntityUncheckedCreateWithoutForcesInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
    assertions?: Prisma.AssertionUncheckedCreateNestedManyWithoutEntityInput;
    extractions?: Prisma.ExtractionUncheckedCreateNestedManyWithoutEntityInput;
    researchSessions?: Prisma.ResearchSessionUncheckedCreateNestedManyWithoutEntityInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutSourceEntityInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedCreateNestedManyWithoutTargetEntityInput;
    positioning?: Prisma.EntityPositioningUncheckedCreateNestedOneWithoutEntityInput;
};
export type EntityCreateOrConnectWithoutForcesInput = {
    where: Prisma.EntityWhereUniqueInput;
    create: Prisma.XOR<Prisma.EntityCreateWithoutForcesInput, Prisma.EntityUncheckedCreateWithoutForcesInput>;
};
export type EntityUpsertWithoutForcesInput = {
    update: Prisma.XOR<Prisma.EntityUpdateWithoutForcesInput, Prisma.EntityUncheckedUpdateWithoutForcesInput>;
    create: Prisma.XOR<Prisma.EntityCreateWithoutForcesInput, Prisma.EntityUncheckedCreateWithoutForcesInput>;
    where?: Prisma.EntityWhereInput;
};
export type EntityUpdateToOneWithWhereWithoutForcesInput = {
    where?: Prisma.EntityWhereInput;
    data: Prisma.XOR<Prisma.EntityUpdateWithoutForcesInput, Prisma.EntityUncheckedUpdateWithoutForcesInput>;
};
export type EntityUpdateWithoutForcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput;
    domain?: Prisma.ResearchDomainUpdateOneWithoutEntitiesNestedInput;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUpdateOneWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutForcesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput;
};
export type EntityCreateManyProjectInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
};
export type EntityUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput;
    domain?: Prisma.ResearchDomainUpdateOneWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateManyWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type EntityCreateManyCategoryInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    domainId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
};
export type EntityUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domain?: Prisma.ResearchDomainUpdateOneWithoutEntitiesNestedInput;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    domainId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type EntityCreateManyDomainInput = {
    id?: string;
    name: string;
    description?: string | null;
    entityType?: string | null;
    url?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    discoveryCategory?: string | null;
    categoryId?: string | null;
    logoUrl?: string | null;
    logoPath?: string | null;
    logoFormat?: string | null;
    logoSvgContent?: string | null;
    logoSourceUrl?: string | null;
    logoFetchedAt?: Date | string | null;
    logoVerified?: boolean;
    githubUrl?: string | null;
    githubOwner?: string | null;
    githubRepo?: string | null;
    githubStars?: number | null;
    githubForks?: number | null;
    githubWatchers?: number | null;
    githubOpenIssues?: number | null;
    githubContributors?: number | null;
    githubLastCommit?: Date | string | null;
    githubLastRelease?: Date | string | null;
    githubLanguage?: string | null;
    githubLicense?: string | null;
    githubCreatedAt?: Date | string | null;
    githubMetricsAt?: Date | string | null;
    buzzScore?: number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Date | string | null;
    buzzOverride?: number | null;
    buzzOverrideReason?: string | null;
    projectId: string;
};
export type EntityUpdateWithoutDomainInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.DiscoveryCategoryUpdateOneWithoutEntitiesNestedInput;
    project?: Prisma.ResearchProjectUpdateOneRequiredWithoutEntitiesNestedInput;
    assertions?: Prisma.AssertionUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateWithoutDomainInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    assertions?: Prisma.AssertionUncheckedUpdateManyWithoutEntityNestedInput;
    extractions?: Prisma.ExtractionUncheckedUpdateManyWithoutEntityNestedInput;
    researchSessions?: Prisma.ResearchSessionUncheckedUpdateManyWithoutEntityNestedInput;
    relationshipsFrom?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutSourceEntityNestedInput;
    relationshipsTo?: Prisma.EntityRelationshipUncheckedUpdateManyWithoutTargetEntityNestedInput;
    positioning?: Prisma.EntityPositioningUncheckedUpdateOneWithoutEntityNestedInput;
    forces?: Prisma.EntityForceUncheckedUpdateManyWithoutEntityNestedInput;
};
export type EntityUncheckedUpdateManyWithoutDomainInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    entityType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    url?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discoveryCategory?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoPath?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFormat?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSvgContent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoSourceUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    logoFetchedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    logoVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    githubUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubOwner?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubRepo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubStars?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubForks?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubWatchers?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubOpenIssues?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubContributors?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    githubLastCommit?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLastRelease?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubLanguage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubLicense?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    githubCreatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    githubMetricsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzComponents?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    buzzCalculatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    buzzOverride?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    buzzOverrideReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
};
/**
 * Count Type EntityCountOutputType
 */
export type EntityCountOutputType = {
    assertions: number;
    extractions: number;
    researchSessions: number;
    relationshipsFrom: number;
    relationshipsTo: number;
    forces: number;
};
export type EntityCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    assertions?: boolean | EntityCountOutputTypeCountAssertionsArgs;
    extractions?: boolean | EntityCountOutputTypeCountExtractionsArgs;
    researchSessions?: boolean | EntityCountOutputTypeCountResearchSessionsArgs;
    relationshipsFrom?: boolean | EntityCountOutputTypeCountRelationshipsFromArgs;
    relationshipsTo?: boolean | EntityCountOutputTypeCountRelationshipsToArgs;
    forces?: boolean | EntityCountOutputTypeCountForcesArgs;
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
/**
 * EntityCountOutputType without action
 */
export type EntityCountOutputTypeCountResearchSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ResearchSessionWhereInput;
};
/**
 * EntityCountOutputType without action
 */
export type EntityCountOutputTypeCountRelationshipsFromArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntityRelationshipWhereInput;
};
/**
 * EntityCountOutputType without action
 */
export type EntityCountOutputTypeCountRelationshipsToArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntityRelationshipWhereInput;
};
/**
 * EntityCountOutputType without action
 */
export type EntityCountOutputTypeCountForcesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EntityForceWhereInput;
};
export type EntitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    entityType?: boolean;
    url?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    discoveryCategory?: boolean;
    categoryId?: boolean;
    domainId?: boolean;
    logoUrl?: boolean;
    logoPath?: boolean;
    logoFormat?: boolean;
    logoSvgContent?: boolean;
    logoSourceUrl?: boolean;
    logoFetchedAt?: boolean;
    logoVerified?: boolean;
    githubUrl?: boolean;
    githubOwner?: boolean;
    githubRepo?: boolean;
    githubStars?: boolean;
    githubForks?: boolean;
    githubWatchers?: boolean;
    githubOpenIssues?: boolean;
    githubContributors?: boolean;
    githubLastCommit?: boolean;
    githubLastRelease?: boolean;
    githubLanguage?: boolean;
    githubLicense?: boolean;
    githubCreatedAt?: boolean;
    githubMetricsAt?: boolean;
    buzzScore?: boolean;
    buzzComponents?: boolean;
    buzzCalculatedAt?: boolean;
    buzzOverride?: boolean;
    buzzOverrideReason?: boolean;
    projectId?: boolean;
    category?: boolean | Prisma.Entity$categoryArgs<ExtArgs>;
    domain?: boolean | Prisma.Entity$domainArgs<ExtArgs>;
    project?: boolean | Prisma.ResearchProjectDefaultArgs<ExtArgs>;
    assertions?: boolean | Prisma.Entity$assertionsArgs<ExtArgs>;
    extractions?: boolean | Prisma.Entity$extractionsArgs<ExtArgs>;
    researchSessions?: boolean | Prisma.Entity$researchSessionsArgs<ExtArgs>;
    relationshipsFrom?: boolean | Prisma.Entity$relationshipsFromArgs<ExtArgs>;
    relationshipsTo?: boolean | Prisma.Entity$relationshipsToArgs<ExtArgs>;
    positioning?: boolean | Prisma.Entity$positioningArgs<ExtArgs>;
    forces?: boolean | Prisma.Entity$forcesArgs<ExtArgs>;
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
    discoveryCategory?: boolean;
    categoryId?: boolean;
    domainId?: boolean;
    logoUrl?: boolean;
    logoPath?: boolean;
    logoFormat?: boolean;
    logoSvgContent?: boolean;
    logoSourceUrl?: boolean;
    logoFetchedAt?: boolean;
    logoVerified?: boolean;
    githubUrl?: boolean;
    githubOwner?: boolean;
    githubRepo?: boolean;
    githubStars?: boolean;
    githubForks?: boolean;
    githubWatchers?: boolean;
    githubOpenIssues?: boolean;
    githubContributors?: boolean;
    githubLastCommit?: boolean;
    githubLastRelease?: boolean;
    githubLanguage?: boolean;
    githubLicense?: boolean;
    githubCreatedAt?: boolean;
    githubMetricsAt?: boolean;
    buzzScore?: boolean;
    buzzComponents?: boolean;
    buzzCalculatedAt?: boolean;
    buzzOverride?: boolean;
    buzzOverrideReason?: boolean;
    projectId?: boolean;
    category?: boolean | Prisma.Entity$categoryArgs<ExtArgs>;
    domain?: boolean | Prisma.Entity$domainArgs<ExtArgs>;
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
    discoveryCategory?: boolean;
    categoryId?: boolean;
    domainId?: boolean;
    logoUrl?: boolean;
    logoPath?: boolean;
    logoFormat?: boolean;
    logoSvgContent?: boolean;
    logoSourceUrl?: boolean;
    logoFetchedAt?: boolean;
    logoVerified?: boolean;
    githubUrl?: boolean;
    githubOwner?: boolean;
    githubRepo?: boolean;
    githubStars?: boolean;
    githubForks?: boolean;
    githubWatchers?: boolean;
    githubOpenIssues?: boolean;
    githubContributors?: boolean;
    githubLastCommit?: boolean;
    githubLastRelease?: boolean;
    githubLanguage?: boolean;
    githubLicense?: boolean;
    githubCreatedAt?: boolean;
    githubMetricsAt?: boolean;
    buzzScore?: boolean;
    buzzComponents?: boolean;
    buzzCalculatedAt?: boolean;
    buzzOverride?: boolean;
    buzzOverrideReason?: boolean;
    projectId?: boolean;
    category?: boolean | Prisma.Entity$categoryArgs<ExtArgs>;
    domain?: boolean | Prisma.Entity$domainArgs<ExtArgs>;
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
    discoveryCategory?: boolean;
    categoryId?: boolean;
    domainId?: boolean;
    logoUrl?: boolean;
    logoPath?: boolean;
    logoFormat?: boolean;
    logoSvgContent?: boolean;
    logoSourceUrl?: boolean;
    logoFetchedAt?: boolean;
    logoVerified?: boolean;
    githubUrl?: boolean;
    githubOwner?: boolean;
    githubRepo?: boolean;
    githubStars?: boolean;
    githubForks?: boolean;
    githubWatchers?: boolean;
    githubOpenIssues?: boolean;
    githubContributors?: boolean;
    githubLastCommit?: boolean;
    githubLastRelease?: boolean;
    githubLanguage?: boolean;
    githubLicense?: boolean;
    githubCreatedAt?: boolean;
    githubMetricsAt?: boolean;
    buzzScore?: boolean;
    buzzComponents?: boolean;
    buzzCalculatedAt?: boolean;
    buzzOverride?: boolean;
    buzzOverrideReason?: boolean;
    projectId?: boolean;
};
export type EntityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "entityType" | "url" | "createdAt" | "updatedAt" | "discoveryCategory" | "categoryId" | "domainId" | "logoUrl" | "logoPath" | "logoFormat" | "logoSvgContent" | "logoSourceUrl" | "logoFetchedAt" | "logoVerified" | "githubUrl" | "githubOwner" | "githubRepo" | "githubStars" | "githubForks" | "githubWatchers" | "githubOpenIssues" | "githubContributors" | "githubLastCommit" | "githubLastRelease" | "githubLanguage" | "githubLicense" | "githubCreatedAt" | "githubMetricsAt" | "buzzScore" | "buzzComponents" | "buzzCalculatedAt" | "buzzOverride" | "buzzOverrideReason" | "projectId", ExtArgs["result"]["entity"]>;
export type EntityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.Entity$categoryArgs<ExtArgs>;
    domain?: boolean | Prisma.Entity$domainArgs<ExtArgs>;
    project?: boolean | Prisma.ResearchProjectDefaultArgs<ExtArgs>;
    assertions?: boolean | Prisma.Entity$assertionsArgs<ExtArgs>;
    extractions?: boolean | Prisma.Entity$extractionsArgs<ExtArgs>;
    researchSessions?: boolean | Prisma.Entity$researchSessionsArgs<ExtArgs>;
    relationshipsFrom?: boolean | Prisma.Entity$relationshipsFromArgs<ExtArgs>;
    relationshipsTo?: boolean | Prisma.Entity$relationshipsToArgs<ExtArgs>;
    positioning?: boolean | Prisma.Entity$positioningArgs<ExtArgs>;
    forces?: boolean | Prisma.Entity$forcesArgs<ExtArgs>;
    _count?: boolean | Prisma.EntityCountOutputTypeDefaultArgs<ExtArgs>;
};
export type EntityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.Entity$categoryArgs<ExtArgs>;
    domain?: boolean | Prisma.Entity$domainArgs<ExtArgs>;
    project?: boolean | Prisma.ResearchProjectDefaultArgs<ExtArgs>;
};
export type EntityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    category?: boolean | Prisma.Entity$categoryArgs<ExtArgs>;
    domain?: boolean | Prisma.Entity$domainArgs<ExtArgs>;
    project?: boolean | Prisma.ResearchProjectDefaultArgs<ExtArgs>;
};
export type $EntityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Entity";
    objects: {
        category: Prisma.$DiscoveryCategoryPayload<ExtArgs> | null;
        domain: Prisma.$ResearchDomainPayload<ExtArgs> | null;
        project: Prisma.$ResearchProjectPayload<ExtArgs>;
        assertions: Prisma.$AssertionPayload<ExtArgs>[];
        extractions: Prisma.$ExtractionPayload<ExtArgs>[];
        researchSessions: Prisma.$ResearchSessionPayload<ExtArgs>[];
        relationshipsFrom: Prisma.$EntityRelationshipPayload<ExtArgs>[];
        relationshipsTo: Prisma.$EntityRelationshipPayload<ExtArgs>[];
        positioning: Prisma.$EntityPositioningPayload<ExtArgs> | null;
        forces: Prisma.$EntityForcePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        entityType: string | null;
        url: string | null;
        createdAt: Date;
        updatedAt: Date;
        discoveryCategory: string | null;
        categoryId: string | null;
        domainId: string | null;
        logoUrl: string | null;
        logoPath: string | null;
        logoFormat: string | null;
        logoSvgContent: string | null;
        logoSourceUrl: string | null;
        logoFetchedAt: Date | null;
        logoVerified: boolean;
        githubUrl: string | null;
        githubOwner: string | null;
        githubRepo: string | null;
        githubStars: number | null;
        githubForks: number | null;
        githubWatchers: number | null;
        githubOpenIssues: number | null;
        githubContributors: number | null;
        githubLastCommit: Date | null;
        githubLastRelease: Date | null;
        githubLanguage: string | null;
        githubLicense: string | null;
        githubCreatedAt: Date | null;
        githubMetricsAt: Date | null;
        buzzScore: number | null;
        buzzComponents: runtime.JsonValue | null;
        buzzCalculatedAt: Date | null;
        buzzOverride: number | null;
        buzzOverrideReason: string | null;
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
    category<T extends Prisma.Entity$categoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$categoryArgs<ExtArgs>>): Prisma.Prisma__DiscoveryCategoryClient<runtime.Types.Result.GetResult<Prisma.$DiscoveryCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    domain<T extends Prisma.Entity$domainArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$domainArgs<ExtArgs>>): Prisma.Prisma__ResearchDomainClient<runtime.Types.Result.GetResult<Prisma.$ResearchDomainPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    project<T extends Prisma.ResearchProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ResearchProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ResearchProjectClient<runtime.Types.Result.GetResult<Prisma.$ResearchProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assertions<T extends Prisma.Entity$assertionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$assertionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssertionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    extractions<T extends Prisma.Entity$extractionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$extractionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    researchSessions<T extends Prisma.Entity$researchSessionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$researchSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ResearchSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    relationshipsFrom<T extends Prisma.Entity$relationshipsFromArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$relationshipsFromArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityRelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    relationshipsTo<T extends Prisma.Entity$relationshipsToArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$relationshipsToArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityRelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    positioning<T extends Prisma.Entity$positioningArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$positioningArgs<ExtArgs>>): Prisma.Prisma__EntityPositioningClient<runtime.Types.Result.GetResult<Prisma.$EntityPositioningPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    forces<T extends Prisma.Entity$forcesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Entity$forcesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EntityForcePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
    readonly discoveryCategory: Prisma.FieldRef<"Entity", 'String'>;
    readonly categoryId: Prisma.FieldRef<"Entity", 'String'>;
    readonly domainId: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoUrl: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoPath: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoFormat: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoSvgContent: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoSourceUrl: Prisma.FieldRef<"Entity", 'String'>;
    readonly logoFetchedAt: Prisma.FieldRef<"Entity", 'DateTime'>;
    readonly logoVerified: Prisma.FieldRef<"Entity", 'Boolean'>;
    readonly githubUrl: Prisma.FieldRef<"Entity", 'String'>;
    readonly githubOwner: Prisma.FieldRef<"Entity", 'String'>;
    readonly githubRepo: Prisma.FieldRef<"Entity", 'String'>;
    readonly githubStars: Prisma.FieldRef<"Entity", 'Int'>;
    readonly githubForks: Prisma.FieldRef<"Entity", 'Int'>;
    readonly githubWatchers: Prisma.FieldRef<"Entity", 'Int'>;
    readonly githubOpenIssues: Prisma.FieldRef<"Entity", 'Int'>;
    readonly githubContributors: Prisma.FieldRef<"Entity", 'Int'>;
    readonly githubLastCommit: Prisma.FieldRef<"Entity", 'DateTime'>;
    readonly githubLastRelease: Prisma.FieldRef<"Entity", 'DateTime'>;
    readonly githubLanguage: Prisma.FieldRef<"Entity", 'String'>;
    readonly githubLicense: Prisma.FieldRef<"Entity", 'String'>;
    readonly githubCreatedAt: Prisma.FieldRef<"Entity", 'DateTime'>;
    readonly githubMetricsAt: Prisma.FieldRef<"Entity", 'DateTime'>;
    readonly buzzScore: Prisma.FieldRef<"Entity", 'Float'>;
    readonly buzzComponents: Prisma.FieldRef<"Entity", 'Json'>;
    readonly buzzCalculatedAt: Prisma.FieldRef<"Entity", 'DateTime'>;
    readonly buzzOverride: Prisma.FieldRef<"Entity", 'Float'>;
    readonly buzzOverrideReason: Prisma.FieldRef<"Entity", 'String'>;
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
 * Entity.category
 */
export type Entity$categoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoveryCategory
     */
    select?: Prisma.DiscoveryCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the DiscoveryCategory
     */
    omit?: Prisma.DiscoveryCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscoveryCategoryInclude<ExtArgs> | null;
    where?: Prisma.DiscoveryCategoryWhereInput;
};
/**
 * Entity.domain
 */
export type Entity$domainArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchDomain
     */
    select?: Prisma.ResearchDomainSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchDomain
     */
    omit?: Prisma.ResearchDomainOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchDomainInclude<ExtArgs> | null;
    where?: Prisma.ResearchDomainWhereInput;
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
 * Entity.researchSessions
 */
export type Entity$researchSessionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResearchSession
     */
    select?: Prisma.ResearchSessionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ResearchSession
     */
    omit?: Prisma.ResearchSessionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ResearchSessionInclude<ExtArgs> | null;
    where?: Prisma.ResearchSessionWhereInput;
    orderBy?: Prisma.ResearchSessionOrderByWithRelationInput | Prisma.ResearchSessionOrderByWithRelationInput[];
    cursor?: Prisma.ResearchSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ResearchSessionScalarFieldEnum | Prisma.ResearchSessionScalarFieldEnum[];
};
/**
 * Entity.relationshipsFrom
 */
export type Entity$relationshipsFromArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityRelationship
     */
    select?: Prisma.EntityRelationshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityRelationship
     */
    omit?: Prisma.EntityRelationshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityRelationshipInclude<ExtArgs> | null;
    where?: Prisma.EntityRelationshipWhereInput;
    orderBy?: Prisma.EntityRelationshipOrderByWithRelationInput | Prisma.EntityRelationshipOrderByWithRelationInput[];
    cursor?: Prisma.EntityRelationshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EntityRelationshipScalarFieldEnum | Prisma.EntityRelationshipScalarFieldEnum[];
};
/**
 * Entity.relationshipsTo
 */
export type Entity$relationshipsToArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntityRelationship
     */
    select?: Prisma.EntityRelationshipSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EntityRelationship
     */
    omit?: Prisma.EntityRelationshipOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EntityRelationshipInclude<ExtArgs> | null;
    where?: Prisma.EntityRelationshipWhereInput;
    orderBy?: Prisma.EntityRelationshipOrderByWithRelationInput | Prisma.EntityRelationshipOrderByWithRelationInput[];
    cursor?: Prisma.EntityRelationshipWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EntityRelationshipScalarFieldEnum | Prisma.EntityRelationshipScalarFieldEnum[];
};
/**
 * Entity.positioning
 */
export type Entity$positioningArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.EntityPositioningWhereInput;
};
/**
 * Entity.forces
 */
export type Entity$forcesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.EntityForceWhereInput;
    orderBy?: Prisma.EntityForceOrderByWithRelationInput | Prisma.EntityForceOrderByWithRelationInput[];
    cursor?: Prisma.EntityForceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EntityForceScalarFieldEnum | Prisma.EntityForceScalarFieldEnum[];
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