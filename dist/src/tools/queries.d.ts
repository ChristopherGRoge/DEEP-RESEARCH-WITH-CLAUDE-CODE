/**
 * Cross-Entity Queries
 *
 * Query and compare extracted data across multiple entities.
 * Works with any schema type - products, tools, concepts, etc.
 * Essential for competitive analysis and research synthesis.
 */
export interface GenericQueryInput {
    projectId: string;
    schemaType?: string;
    filters?: Record<string, any>;
    searchText?: string;
    sortBy?: string;
    limit?: number;
}
export interface GenericQueryResult {
    entityId: string;
    entityName: string;
    entityType: string | null;
    entityUrl: string | null;
    schemaType: string;
    data: any;
    extractedAt: Date;
    sourceUrl: string;
    matchedFields?: string[];
}
/**
 * Generic query across all extracted data
 *
 * This is the most flexible query - works with any schema type and any data structure.
 * Use this when you need to search across diverse research data.
 *
 * Examples:
 * - Search for "kubernetes" across all extractions
 * - Find all entities where data contains a specific value
 * - Filter by any field in the extracted data
 */
export declare function queryExtractions(input: GenericQueryInput): Promise<{
    results: GenericQueryResult[];
    summary: {
        totalResults: number;
        bySchemaType: Record<string, number>;
        byEntityType: Record<string, number>;
    };
}>;
/**
 * Get all unique values for a specific field across extractions
 * Useful for discovering what data exists
 */
export declare function getFieldValues(input: {
    projectId: string;
    schemaType: string;
    fieldPath: string;
}): Promise<{
    values: Array<{
        value: any;
        count: number;
        entities: string[];
    }>;
    totalEntities: number;
}>;
export interface PricingQueryInput {
    projectId: string;
    hasFreeTier?: boolean;
    hasEnterprise?: boolean;
    maxPrice?: number;
    minPrice?: number;
    sortBy?: 'price_asc' | 'price_desc' | 'name';
}
export interface ComplianceQueryInput {
    projectId: string;
    soc2?: boolean;
    fedRampStatus?: string;
    gdprCompliant?: boolean;
    hipaaCompliant?: boolean;
    hasCertification?: string;
}
export interface FeatureQueryInput {
    projectId: string;
    searchTerm?: string;
    category?: string;
}
export interface CompareEntitiesInput {
    entityIds: string[];
    schemaType: 'pricing' | 'features' | 'company' | 'compliance' | 'integrations';
}
export interface PricingResult {
    entityId: string;
    entityName: string;
    entityUrl: string | null;
    hasFreeTier: boolean;
    hasEnterprise: boolean;
    lowestPaidPrice: number | null;
    highestPrice: number | null;
    tierCount: number;
    tiers: Array<{
        name: string;
        price: number | null;
        billingCycle: string;
        pricePerUnit?: string;
    }>;
    extractedAt: Date;
    sourceUrl: string;
}
/**
 * Query pricing data across all entities in a project
 */
export declare function queryPricing(input: PricingQueryInput): Promise<{
    results: PricingResult[];
    summary: {
        totalWithPricing: number;
        withFreeTier: number;
        withEnterprise: number;
        priceRange: {
            min: number | null;
            max: number | null;
        };
    };
}>;
export interface ComplianceResult {
    entityId: string;
    entityName: string;
    entityUrl: string | null;
    soc2: boolean;
    fedRampStatus: string | null;
    gdprCompliant: boolean;
    hipaaCompliant: boolean;
    certifications: Array<{
        name: string;
        status: string;
    }>;
    securityFeatures: string[];
    extractedAt: Date;
    sourceUrl: string;
}
/**
 * Query compliance data across all entities in a project
 */
export declare function queryCompliance(input: ComplianceQueryInput): Promise<{
    results: ComplianceResult[];
    summary: {
        totalWithCompliance: number;
        withSoc2: number;
        withFedRamp: number;
        withGdpr: number;
        withHipaa: number;
        certificationCounts: Record<string, number>;
    };
}>;
export interface FeatureResult {
    entityId: string;
    entityName: string;
    entityUrl: string | null;
    highlights: string[];
    categories: Array<{
        name: string;
        featureCount: number;
        features: string[];
    }>;
    totalFeatures: number;
    extractedAt: Date;
    sourceUrl: string;
}
/**
 * Query features data across all entities in a project
 */
export declare function queryFeatures(input: FeatureQueryInput): Promise<{
    results: FeatureResult[];
    summary: {
        totalWithFeatures: number;
        averageFeatureCount: number;
        commonCategories: Array<{
            name: string;
            count: number;
        }>;
    };
}>;
export interface ComparisonResult {
    schemaType: string;
    entities: Array<{
        entityId: string;
        entityName: string;
        entityUrl: string | null;
        hasData: boolean;
        data: any;
        extractedAt: Date | null;
        sourceUrl: string | null;
    }>;
}
/**
 * Compare specific entities side-by-side for a given schema type
 */
export declare function compareEntities(input: CompareEntitiesInput): Promise<ComparisonResult>;
export interface IntegrationResult {
    entityId: string;
    entityName: string;
    entityUrl: string | null;
    totalCount: number;
    hasApi: boolean;
    hasWebhooks: boolean;
    hasSdk: boolean;
    sdkLanguages: string[];
    categories: Array<{
        name: string;
        integrations: string[];
    }>;
    extractedAt: Date;
    sourceUrl: string;
}
/**
 * Query integration data across all entities in a project
 */
export declare function queryIntegrations(input: {
    projectId: string;
    hasApi?: boolean;
    hasSdk?: boolean;
    searchTerm?: string;
}): Promise<{
    results: IntegrationResult[];
    summary: {
        totalWithIntegrations: number;
        withApi: number;
        withSdk: number;
        withWebhooks: number;
        averageIntegrationCount: number;
        commonIntegrations: Array<{
            name: string;
            count: number;
        }>;
    };
}>;
export interface CompanyResult {
    entityId: string;
    entityName: string;
    entityUrl: string | null;
    companyName: string;
    founded: string | null;
    headquarters: string | null;
    employeeCount: string | null;
    totalFunding: string | null;
    lastRound: string | null;
    extractedAt: Date;
    sourceUrl: string;
}
/**
 * Query company data across all entities in a project
 */
export declare function queryCompanies(input: {
    projectId: string;
    minFounding?: number;
    maxFounding?: number;
}): Promise<{
    results: CompanyResult[];
    summary: {
        totalWithCompanyInfo: number;
        withFunding: number;
        foundingYearRange: {
            earliest: number | null;
            latest: number | null;
        };
        headquarterLocations: Array<{
            location: string;
            count: number;
        }>;
    };
}>;
//# sourceMappingURL=queries.d.ts.map