"use strict";
/**
 * Authentication middleware for validation server
 * Checks for claude login credentials first, then falls back to ANTHROPIC_API_KEY
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthStatus = getAuthStatus;
exports.requireAuth = requireAuth;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
/**
 * Check for claude login credentials in ~/.claude/
 */
function checkClaudeLogin() {
    try {
        const claudeDir = path.join(os.homedir(), '.claude');
        // Check for credentials file (with dot prefix)
        const credentialsPath = path.join(claudeDir, '.credentials.json');
        if (fs.existsSync(credentialsPath)) {
            const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
            if (credentials.accessToken || credentials.refreshToken || credentials.claudeAiOauth) {
                return {
                    valid: true,
                    details: 'Found claude login credentials'
                };
            }
        }
        // Also check without dot (older versions)
        const altCredentialsPath = path.join(claudeDir, 'credentials.json');
        if (fs.existsSync(altCredentialsPath)) {
            const credentials = JSON.parse(fs.readFileSync(altCredentialsPath, 'utf-8'));
            if (credentials.accessToken || credentials.refreshToken) {
                return {
                    valid: true,
                    details: 'Found claude login credentials'
                };
            }
        }
        // Check for settings with API key
        const settingsPath = path.join(claudeDir, 'settings.json');
        if (fs.existsSync(settingsPath)) {
            const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
            if (settings.apiKey) {
                return {
                    valid: true,
                    details: 'Found API key in claude settings'
                };
            }
        }
        return { valid: false };
    }
    catch (error) {
        return { valid: false };
    }
}
/**
 * Check for ANTHROPIC_API_KEY environment variable
 */
function checkApiKey() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey && apiKey.length > 0) {
        // Mask the key for display
        const masked = apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4);
        return {
            valid: true,
            details: `Using ANTHROPIC_API_KEY (${masked})`
        };
    }
    return { valid: false };
}
/**
 * Get the current authentication status
 * Priority: claude login > ANTHROPIC_API_KEY > none
 */
function getAuthStatus() {
    // Priority 1: Check for claude login
    const claudeLogin = checkClaudeLogin();
    if (claudeLogin.valid) {
        return {
            method: 'claude_login',
            valid: true,
            details: claudeLogin.details,
        };
    }
    // Priority 2: Check for API key in environment
    const apiKey = checkApiKey();
    if (apiKey.valid) {
        return {
            method: 'api_key',
            valid: true,
            details: apiKey.details,
        };
    }
    // No authentication found
    return {
        method: 'none',
        valid: false,
        details: 'No authentication configured. Run `claude login` or set ANTHROPIC_API_KEY in .env',
    };
}
/**
 * Verify that authentication is available
 * Throws if no valid auth method is found
 */
function requireAuth() {
    const status = getAuthStatus();
    if (!status.valid) {
        throw new Error(status.details || 'Authentication required');
    }
    return status;
}
//# sourceMappingURL=auth.js.map