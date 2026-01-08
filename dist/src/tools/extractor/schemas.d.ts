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
}>;
export type ComplianceData = z.infer<typeof ComplianceSchema>;
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
export declare const SCHEMA_TYPES: readonly ["pricing", "features", "company", "compliance", "integrations"];
export type SchemaType = typeof SCHEMA_TYPES[number];
export declare const SCHEMAS: Record<SchemaType, z.ZodSchema>;
export declare function getSchema(schemaType: SchemaType): z.ZodSchema;
export declare function validateExtraction<T>(schemaType: SchemaType, data: unknown): T;
export declare function getSchemaDescription(schemaType: SchemaType): string;
//# sourceMappingURL=schemas.d.ts.map