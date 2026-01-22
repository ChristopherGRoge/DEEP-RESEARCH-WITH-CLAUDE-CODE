/**
 * Extraction Schemas - Zod definitions for structured data extraction
 *
 * These schemas define what data we extract from web pages.
 * Each schema is designed to capture the most valuable, queryable information.
 */
import { z } from 'zod';
export declare const PricingTierSchema: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodNullable<z.ZodNumber>;
    billingCycle: z.ZodEnum<["monthly", "annual", "one-time", "usage-based"]>;
    pricePerUnit: z.ZodOptional<z.ZodString>;
    features: z.ZodArray<z.ZodString, "many">;
    limits: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    features: string[];
    price: number | null;
    billingCycle: "monthly" | "annual" | "one-time" | "usage-based";
    pricePerUnit?: string | undefined;
    limits?: Record<string, string | number> | undefined;
}, {
    name: string;
    features: string[];
    price: number | null;
    billingCycle: "monthly" | "annual" | "one-time" | "usage-based";
    pricePerUnit?: string | undefined;
    limits?: Record<string, string | number> | undefined;
}>;
export declare const PricingSchema: z.ZodObject<{
    tiers: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        price: z.ZodNullable<z.ZodNumber>;
        billingCycle: z.ZodEnum<["monthly", "annual", "one-time", "usage-based"]>;
        pricePerUnit: z.ZodOptional<z.ZodString>;
        features: z.ZodArray<z.ZodString, "many">;
        limits: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        features: string[];
        price: number | null;
        billingCycle: "monthly" | "annual" | "one-time" | "usage-based";
        pricePerUnit?: string | undefined;
        limits?: Record<string, string | number> | undefined;
    }, {
        name: string;
        features: string[];
        price: number | null;
        billingCycle: "monthly" | "annual" | "one-time" | "usage-based";
        pricePerUnit?: string | undefined;
        limits?: Record<string, string | number> | undefined;
    }>, "many">;
    currency: z.ZodDefault<z.ZodString>;
    billingCycles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    hasFreeTier: z.ZodBoolean;
    hasEnterprise: z.ZodBoolean;
    lastUpdated: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    tiers: {
        name: string;
        features: string[];
        price: number | null;
        billingCycle: "monthly" | "annual" | "one-time" | "usage-based";
        pricePerUnit?: string | undefined;
        limits?: Record<string, string | number> | undefined;
    }[];
    currency: string;
    billingCycles: string[];
    hasFreeTier: boolean;
    hasEnterprise: boolean;
    lastUpdated?: string | undefined;
}, {
    tiers: {
        name: string;
        features: string[];
        price: number | null;
        billingCycle: "monthly" | "annual" | "one-time" | "usage-based";
        pricePerUnit?: string | undefined;
        limits?: Record<string, string | number> | undefined;
    }[];
    hasFreeTier: boolean;
    hasEnterprise: boolean;
    currency?: string | undefined;
    billingCycles?: string[] | undefined;
    lastUpdated?: string | undefined;
}>;
export type PricingData = z.infer<typeof PricingSchema>;
export declare const FeatureSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    availability: z.ZodOptional<z.ZodString>;
    isNew: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | undefined;
    availability?: string | undefined;
    isNew?: boolean | undefined;
}, {
    name: string;
    description?: string | undefined;
    availability?: string | undefined;
    isNew?: boolean | undefined;
}>;
export declare const FeatureCategorySchema: z.ZodObject<{
    name: z.ZodString;
    features: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        availability: z.ZodOptional<z.ZodString>;
        isNew: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description?: string | undefined;
        availability?: string | undefined;
        isNew?: boolean | undefined;
    }, {
        name: string;
        description?: string | undefined;
        availability?: string | undefined;
        isNew?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    features: {
        name: string;
        description?: string | undefined;
        availability?: string | undefined;
        isNew?: boolean | undefined;
    }[];
}, {
    name: string;
    features: {
        name: string;
        description?: string | undefined;
        availability?: string | undefined;
        isNew?: boolean | undefined;
    }[];
}>;
export declare const FeaturesSchema: z.ZodObject<{
    categories: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        features: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            availability: z.ZodOptional<z.ZodString>;
            isNew: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description?: string | undefined;
            availability?: string | undefined;
            isNew?: boolean | undefined;
        }, {
            name: string;
            description?: string | undefined;
            availability?: string | undefined;
            isNew?: boolean | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        features: {
            name: string;
            description?: string | undefined;
            availability?: string | undefined;
            isNew?: boolean | undefined;
        }[];
    }, {
        name: string;
        features: {
            name: string;
            description?: string | undefined;
            availability?: string | undefined;
            isNew?: boolean | undefined;
        }[];
    }>, "many">;
    highlights: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    categories: {
        name: string;
        features: {
            name: string;
            description?: string | undefined;
            availability?: string | undefined;
            isNew?: boolean | undefined;
        }[];
    }[];
    highlights: string[];
}, {
    categories: {
        name: string;
        features: {
            name: string;
            description?: string | undefined;
            availability?: string | undefined;
            isNew?: boolean | undefined;
        }[];
    }[];
    highlights: string[];
}>;
export type FeaturesData = z.infer<typeof FeaturesSchema>;
export declare const FundingInfoSchema: z.ZodObject<{
    totalRaised: z.ZodOptional<z.ZodString>;
    lastRound: z.ZodOptional<z.ZodString>;
    lastRoundAmount: z.ZodOptional<z.ZodString>;
    lastRoundDate: z.ZodOptional<z.ZodString>;
    investors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    totalRaised?: string | undefined;
    lastRound?: string | undefined;
    lastRoundAmount?: string | undefined;
    lastRoundDate?: string | undefined;
    investors?: string[] | undefined;
}, {
    totalRaised?: string | undefined;
    lastRound?: string | undefined;
    lastRoundAmount?: string | undefined;
    lastRoundDate?: string | undefined;
    investors?: string[] | undefined;
}>;
export declare const PersonSchema: z.ZodObject<{
    name: z.ZodString;
    role: z.ZodString;
    linkedIn: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    role: string;
    linkedIn?: string | undefined;
}, {
    name: string;
    role: string;
    linkedIn?: string | undefined;
}>;
export declare const CompanySchema: z.ZodObject<{
    name: z.ZodString;
    legalName: z.ZodOptional<z.ZodString>;
    founded: z.ZodOptional<z.ZodString>;
    headquarters: z.ZodOptional<z.ZodString>;
    employeeCount: z.ZodOptional<z.ZodString>;
    funding: z.ZodOptional<z.ZodObject<{
        totalRaised: z.ZodOptional<z.ZodString>;
        lastRound: z.ZodOptional<z.ZodString>;
        lastRoundAmount: z.ZodOptional<z.ZodString>;
        lastRoundDate: z.ZodOptional<z.ZodString>;
        investors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        totalRaised?: string | undefined;
        lastRound?: string | undefined;
        lastRoundAmount?: string | undefined;
        lastRoundDate?: string | undefined;
        investors?: string[] | undefined;
    }, {
        totalRaised?: string | undefined;
        lastRound?: string | undefined;
        lastRoundAmount?: string | undefined;
        lastRoundDate?: string | undefined;
        investors?: string[] | undefined;
    }>>;
    leadership: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        role: z.ZodString;
        linkedIn: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        role: string;
        linkedIn?: string | undefined;
    }, {
        name: string;
        role: string;
        linkedIn?: string | undefined;
    }>, "many">>;
    socialLinks: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    legalName?: string | undefined;
    founded?: string | undefined;
    headquarters?: string | undefined;
    employeeCount?: string | undefined;
    funding?: {
        totalRaised?: string | undefined;
        lastRound?: string | undefined;
        lastRoundAmount?: string | undefined;
        lastRoundDate?: string | undefined;
        investors?: string[] | undefined;
    } | undefined;
    leadership?: {
        name: string;
        role: string;
        linkedIn?: string | undefined;
    }[] | undefined;
    socialLinks?: Record<string, string> | undefined;
}, {
    name: string;
    legalName?: string | undefined;
    founded?: string | undefined;
    headquarters?: string | undefined;
    employeeCount?: string | undefined;
    funding?: {
        totalRaised?: string | undefined;
        lastRound?: string | undefined;
        lastRoundAmount?: string | undefined;
        lastRoundDate?: string | undefined;
        investors?: string[] | undefined;
    } | undefined;
    leadership?: {
        name: string;
        role: string;
        linkedIn?: string | undefined;
    }[] | undefined;
    socialLinks?: Record<string, string> | undefined;
}>;
export type CompanyData = z.infer<typeof CompanySchema>;
export declare const CertificationSchema: z.ZodObject<{
    name: z.ZodString;
    status: z.ZodEnum<["certified", "in_progress", "planned", "unknown"]>;
    validUntil: z.ZodOptional<z.ZodString>;
    documentUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: "unknown" | "certified" | "in_progress" | "planned";
    validUntil?: string | undefined;
    documentUrl?: string | undefined;
}, {
    name: string;
    status: "unknown" | "certified" | "in_progress" | "planned";
    validUntil?: string | undefined;
    documentUrl?: string | undefined;
}>;
/**
 * Federal Compliance Pathway - captures how an entity can achieve
 * federal compliance, including inherited authorization through
 * cloud providers.
 */
export declare const FederalPathwaySchema: z.ZodObject<{
    pathway: z.ZodEnum<["direct_fedramp", "inherited_aws", "inherited_azure", "inherited_gcp", "air_gapped", "private_link", "on_premise", "hybrid"]>;
    status: z.ZodEnum<["available", "in_progress", "planned", "unavailable", "unknown"]>;
    provider: z.ZodOptional<z.ZodString>;
    authLevel: z.ZodOptional<z.ZodString>;
    regions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "unknown" | "in_progress" | "planned" | "available" | "unavailable";
    pathway: "direct_fedramp" | "inherited_aws" | "inherited_azure" | "inherited_gcp" | "air_gapped" | "private_link" | "on_premise" | "hybrid";
    provider?: string | undefined;
    authLevel?: string | undefined;
    regions?: string[] | undefined;
    notes?: string | undefined;
}, {
    status: "unknown" | "in_progress" | "planned" | "available" | "unavailable";
    pathway: "direct_fedramp" | "inherited_aws" | "inherited_azure" | "inherited_gcp" | "air_gapped" | "private_link" | "on_premise" | "hybrid";
    provider?: string | undefined;
    authLevel?: string | undefined;
    regions?: string[] | undefined;
    notes?: string | undefined;
}>;
export declare const ComplianceSchema: z.ZodObject<{
    certifications: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        status: z.ZodEnum<["certified", "in_progress", "planned", "unknown"]>;
        validUntil: z.ZodOptional<z.ZodString>;
        documentUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        status: "unknown" | "certified" | "in_progress" | "planned";
        validUntil?: string | undefined;
        documentUrl?: string | undefined;
    }, {
        name: string;
        status: "unknown" | "certified" | "in_progress" | "planned";
        validUntil?: string | undefined;
        documentUrl?: string | undefined;
    }>, "many">;
    securityFeatures: z.ZodArray<z.ZodString, "many">;
    dataResidency: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    gdprCompliant: z.ZodOptional<z.ZodBoolean>;
    hipaaCompliant: z.ZodOptional<z.ZodBoolean>;
    soc2: z.ZodOptional<z.ZodBoolean>;
    fedRampStatus: z.ZodOptional<z.ZodString>;
    federalPathways: z.ZodOptional<z.ZodArray<z.ZodObject<{
        pathway: z.ZodEnum<["direct_fedramp", "inherited_aws", "inherited_azure", "inherited_gcp", "air_gapped", "private_link", "on_premise", "hybrid"]>;
        status: z.ZodEnum<["available", "in_progress", "planned", "unavailable", "unknown"]>;
        provider: z.ZodOptional<z.ZodString>;
        authLevel: z.ZodOptional<z.ZodString>;
        regions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        notes: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "unknown" | "in_progress" | "planned" | "available" | "unavailable";
        pathway: "direct_fedramp" | "inherited_aws" | "inherited_azure" | "inherited_gcp" | "air_gapped" | "private_link" | "on_premise" | "hybrid";
        provider?: string | undefined;
        authLevel?: string | undefined;
        regions?: string[] | undefined;
        notes?: string | undefined;
    }, {
        status: "unknown" | "in_progress" | "planned" | "available" | "unavailable";
        pathway: "direct_fedramp" | "inherited_aws" | "inherited_azure" | "inherited_gcp" | "air_gapped" | "private_link" | "on_premise" | "hybrid";
        provider?: string | undefined;
        authLevel?: string | undefined;
        regions?: string[] | undefined;
        notes?: string | undefined;
    }>, "many">>;
    federalViabilityScore: z.ZodOptional<z.ZodNumber>;
    federalViabilityLevel: z.ZodOptional<z.ZodEnum<["GREEN", "YELLOW", "ORANGE", "RED"]>>;
    federalViabilityNotes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    certifications: {
        name: string;
        status: "unknown" | "certified" | "in_progress" | "planned";
        validUntil?: string | undefined;
        documentUrl?: string | undefined;
    }[];
    securityFeatures: string[];
    dataResidency?: string[] | undefined;
    gdprCompliant?: boolean | undefined;
    hipaaCompliant?: boolean | undefined;
    soc2?: boolean | undefined;
    fedRampStatus?: string | undefined;
    federalPathways?: {
        status: "unknown" | "in_progress" | "planned" | "available" | "unavailable";
        pathway: "direct_fedramp" | "inherited_aws" | "inherited_azure" | "inherited_gcp" | "air_gapped" | "private_link" | "on_premise" | "hybrid";
        provider?: string | undefined;
        authLevel?: string | undefined;
        regions?: string[] | undefined;
        notes?: string | undefined;
    }[] | undefined;
    federalViabilityScore?: number | undefined;
    federalViabilityLevel?: "GREEN" | "YELLOW" | "ORANGE" | "RED" | undefined;
    federalViabilityNotes?: string | undefined;
}, {
    certifications: {
        name: string;
        status: "unknown" | "certified" | "in_progress" | "planned";
        validUntil?: string | undefined;
        documentUrl?: string | undefined;
    }[];
    securityFeatures: string[];
    dataResidency?: string[] | undefined;
    gdprCompliant?: boolean | undefined;
    hipaaCompliant?: boolean | undefined;
    soc2?: boolean | undefined;
    fedRampStatus?: string | undefined;
    federalPathways?: {
        status: "unknown" | "in_progress" | "planned" | "available" | "unavailable";
        pathway: "direct_fedramp" | "inherited_aws" | "inherited_azure" | "inherited_gcp" | "air_gapped" | "private_link" | "on_premise" | "hybrid";
        provider?: string | undefined;
        authLevel?: string | undefined;
        regions?: string[] | undefined;
        notes?: string | undefined;
    }[] | undefined;
    federalViabilityScore?: number | undefined;
    federalViabilityLevel?: "GREEN" | "YELLOW" | "ORANGE" | "RED" | undefined;
    federalViabilityNotes?: string | undefined;
}>;
export type ComplianceData = z.infer<typeof ComplianceSchema>;
export type FederalPathwayData = z.infer<typeof FederalPathwaySchema>;
export declare const IntegrationSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<["native", "plugin", "api", "webhook"]>;
    docsUrl: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "native" | "plugin" | "api" | "webhook";
    docsUrl?: string | undefined;
}, {
    name: string;
    type: "native" | "plugin" | "api" | "webhook";
    docsUrl?: string | undefined;
}>;
export declare const IntegrationCategorySchema: z.ZodObject<{
    name: z.ZodString;
    integrations: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodEnum<["native", "plugin", "api", "webhook"]>;
        docsUrl: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "native" | "plugin" | "api" | "webhook";
        docsUrl?: string | undefined;
    }, {
        name: string;
        type: "native" | "plugin" | "api" | "webhook";
        docsUrl?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    integrations: {
        name: string;
        type: "native" | "plugin" | "api" | "webhook";
        docsUrl?: string | undefined;
    }[];
}, {
    name: string;
    integrations: {
        name: string;
        type: "native" | "plugin" | "api" | "webhook";
        docsUrl?: string | undefined;
    }[];
}>;
export declare const IntegrationsSchema: z.ZodObject<{
    categories: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        integrations: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            type: z.ZodEnum<["native", "plugin", "api", "webhook"]>;
            docsUrl: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: "native" | "plugin" | "api" | "webhook";
            docsUrl?: string | undefined;
        }, {
            name: string;
            type: "native" | "plugin" | "api" | "webhook";
            docsUrl?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        integrations: {
            name: string;
            type: "native" | "plugin" | "api" | "webhook";
            docsUrl?: string | undefined;
        }[];
    }, {
        name: string;
        integrations: {
            name: string;
            type: "native" | "plugin" | "api" | "webhook";
            docsUrl?: string | undefined;
        }[];
    }>, "many">;
    totalCount: z.ZodNumber;
    hasApi: z.ZodBoolean;
    apiDocUrl: z.ZodOptional<z.ZodString>;
    hasWebhooks: z.ZodBoolean;
    hasSdk: z.ZodBoolean;
    sdkLanguages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    categories: {
        name: string;
        integrations: {
            name: string;
            type: "native" | "plugin" | "api" | "webhook";
            docsUrl?: string | undefined;
        }[];
    }[];
    totalCount: number;
    hasApi: boolean;
    hasWebhooks: boolean;
    hasSdk: boolean;
    apiDocUrl?: string | undefined;
    sdkLanguages?: string[] | undefined;
}, {
    categories: {
        name: string;
        integrations: {
            name: string;
            type: "native" | "plugin" | "api" | "webhook";
            docsUrl?: string | undefined;
        }[];
    }[];
    totalCount: number;
    hasApi: boolean;
    hasWebhooks: boolean;
    hasSdk: boolean;
    apiDocUrl?: string | undefined;
    sdkLanguages?: string[] | undefined;
}>;
export type IntegrationsData = z.infer<typeof IntegrationsSchema>;
/**
 * Captures features with competitive differentiation context.
 * This schema goes beyond basic feature listing to identify
 * what makes an entity UNIQUE vs competitors.
 */
export declare const DifferentiatingFeatureSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    evidenceSource: z.ZodOptional<z.ZodString>;
    comparedTo: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    evidenceSource?: string | undefined;
    comparedTo?: string[] | undefined;
}, {
    name: string;
    description: string;
    evidenceSource?: string | undefined;
    comparedTo?: string[] | undefined;
}>;
export declare const LaggingFeatureSchema: z.ZodObject<{
    name: z.ZodString;
    reason: z.ZodString;
    competitors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    reason: string;
    competitors?: string[] | undefined;
}, {
    name: string;
    reason: string;
    competitors?: string[] | undefined;
}>;
export declare const MissingFeatureSchema: z.ZodObject<{
    name: z.ZodString;
    competitors: z.ZodArray<z.ZodString, "many">;
    importance: z.ZodOptional<z.ZodEnum<["critical", "important", "nice-to-have"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    competitors: string[];
    importance?: "critical" | "important" | "nice-to-have" | undefined;
}, {
    name: string;
    competitors: string[];
    importance?: "critical" | "important" | "nice-to-have" | undefined;
}>;
export declare const DifferentiatorsSchema: z.ZodObject<{
    uniqueFeatures: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        evidenceSource: z.ZodOptional<z.ZodString>;
        comparedTo: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        evidenceSource?: string | undefined;
        comparedTo?: string[] | undefined;
    }, {
        name: string;
        description: string;
        evidenceSource?: string | undefined;
        comparedTo?: string[] | undefined;
    }>, "many">;
    leadingFeatures: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        evidenceSource: z.ZodOptional<z.ZodString>;
        comparedTo: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description: string;
        evidenceSource?: string | undefined;
        comparedTo?: string[] | undefined;
    }, {
        name: string;
        description: string;
        evidenceSource?: string | undefined;
        comparedTo?: string[] | undefined;
    }>, "many">;
    tableStakes: z.ZodArray<z.ZodString, "many">;
    laggingFeatures: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        reason: z.ZodString;
        competitors: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        reason: string;
        competitors?: string[] | undefined;
    }, {
        name: string;
        reason: string;
        competitors?: string[] | undefined;
    }>, "many">>;
    missingFeatures: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        competitors: z.ZodArray<z.ZodString, "many">;
        importance: z.ZodOptional<z.ZodEnum<["critical", "important", "nice-to-have"]>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        competitors: string[];
        importance?: "critical" | "important" | "nice-to-have" | undefined;
    }, {
        name: string;
        competitors: string[];
        importance?: "critical" | "important" | "nice-to-have" | undefined;
    }>, "many">>;
    primaryCompetitors: z.ZodArray<z.ZodString, "many">;
    differentiationSummary: z.ZodString;
}, "strip", z.ZodTypeAny, {
    uniqueFeatures: {
        name: string;
        description: string;
        evidenceSource?: string | undefined;
        comparedTo?: string[] | undefined;
    }[];
    leadingFeatures: {
        name: string;
        description: string;
        evidenceSource?: string | undefined;
        comparedTo?: string[] | undefined;
    }[];
    tableStakes: string[];
    primaryCompetitors: string[];
    differentiationSummary: string;
    laggingFeatures?: {
        name: string;
        reason: string;
        competitors?: string[] | undefined;
    }[] | undefined;
    missingFeatures?: {
        name: string;
        competitors: string[];
        importance?: "critical" | "important" | "nice-to-have" | undefined;
    }[] | undefined;
}, {
    uniqueFeatures: {
        name: string;
        description: string;
        evidenceSource?: string | undefined;
        comparedTo?: string[] | undefined;
    }[];
    leadingFeatures: {
        name: string;
        description: string;
        evidenceSource?: string | undefined;
        comparedTo?: string[] | undefined;
    }[];
    tableStakes: string[];
    primaryCompetitors: string[];
    differentiationSummary: string;
    laggingFeatures?: {
        name: string;
        reason: string;
        competitors?: string[] | undefined;
    }[] | undefined;
    missingFeatures?: {
        name: string;
        competitors: string[];
        importance?: "critical" | "important" | "nice-to-have" | undefined;
    }[] | undefined;
}>;
export type DifferentiatorsData = z.infer<typeof DifferentiatorsSchema>;
export declare const SCHEMA_TYPES: readonly ["pricing", "features", "company", "compliance", "integrations", "differentiators"];
export type SchemaType = typeof SCHEMA_TYPES[number];
export declare const SCHEMAS: Record<SchemaType, z.ZodSchema>;
export declare function getSchema(schemaType: SchemaType): z.ZodSchema;
export declare function validateExtraction<T>(schemaType: SchemaType, data: unknown): T;
export declare function getSchemaDescription(schemaType: SchemaType): string;
//# sourceMappingURL=schemas.d.ts.map