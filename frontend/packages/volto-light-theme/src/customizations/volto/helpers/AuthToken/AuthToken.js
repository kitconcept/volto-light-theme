/**
 * OVERRIDE: AuthToken.js
 * REASON: Removing '__ac' cookie to avoid login-logout flicker issues
 * DATE: 2026-01-06
 * DEVELOPER: @Tishasoumya-02
 */

import { getAuthToken, persistAuthToken } from '../../../../helpers/AuthToken';

export { getAuthToken, persistAuthToken };
