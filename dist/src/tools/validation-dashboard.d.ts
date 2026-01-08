interface ValidationDashboardOptions {
    projectId?: string;
    outputPath?: string;
    validatorName?: string;
}
/**
 * Generate static HTML validation dashboard for human-in-the-loop review
 */
export declare function generateValidationDashboard(options?: ValidationDashboardOptions): Promise<{
    outputPath: string;
    stats: {
        total: number;
        critical: number;
        high: number;
        medium: number;
        low: number;
        rejectedPendingReresearch: number;
    };
}>;
export {};
//# sourceMappingURL=validation-dashboard.d.ts.map