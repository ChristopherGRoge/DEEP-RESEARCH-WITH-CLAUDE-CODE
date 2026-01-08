/**
 * Authentication middleware for validation server
 * Checks for claude login credentials first, then falls back to ANTHROPIC_API_KEY
 */
export type AuthMethod = 'claude_login' | 'api_key' | 'none';
export interface AuthStatus {
    method: AuthMethod;
    valid: boolean;
    details?: string;
}
/**
 * Get the current authentication status
 * Priority: claude login > ANTHROPIC_API_KEY > none
 */
export declare function getAuthStatus(): AuthStatus;
/**
 * Verify that authentication is available
 * Throws if no valid auth method is found
 */
export declare function requireAuth(): AuthStatus;
//# sourceMappingURL=auth.d.ts.map