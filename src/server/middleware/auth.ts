/**
 * Authentication middleware for validation server
 * Checks for claude login credentials first, then falls back to ANTHROPIC_API_KEY
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export type AuthMethod = 'claude_login' | 'api_key' | 'none';

export interface AuthStatus {
  method: AuthMethod;
  valid: boolean;
  details?: string;
}

/**
 * Check for claude login credentials in ~/.claude/
 */
function checkClaudeLogin(): { valid: boolean; details?: string } {
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
  } catch (error) {
    return { valid: false };
  }
}

/**
 * Check for ANTHROPIC_API_KEY environment variable
 */
function checkApiKey(): { valid: boolean; details?: string } {
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
export function getAuthStatus(): AuthStatus {
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
export function requireAuth(): AuthStatus {
  const status = getAuthStatus();
  if (!status.valid) {
    throw new Error(status.details || 'Authentication required');
  }
  return status;
}
