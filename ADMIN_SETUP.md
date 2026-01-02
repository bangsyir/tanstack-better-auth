# Admin Role Setup Guide

This guide explains how to set up and manage admin users in your application.

## Admin Page

The admin page is located at `/admin` and can only be accessed by users with the `admin` role.

### Access Control

- Non-authenticated users are redirected to `/login`
- Authenticated users without admin role are redirected to `/`
- Only users with `role = 'admin'` can access the admin dashboard

## Setting a User as Admin

### Method 1: Using the Set Admin Script (Recommended)

First, ensure you have `tsx` installed:

```bash
pnpm add -D tsx
```

Then run the script with a user's email:

```bash
pnpm tsx scripts/set-admin.ts <user-email>
```

Example:

```bash
pnpm tsx scripts/set-admin.ts admin@example.com
```

### Method 2: Manual Database Update

Alternatively, you can directly update the database:

```bash
pnpm drizzle-kit studio
```

Then navigate to the `user` table and set the `role` field to `admin` for the desired user.

### Method 3: Using SQL

If you have direct database access:

```sql
UPDATE user SET role = 'admin' WHERE email = 'admin@example.com';
```

## Database Schema

The `user` table includes a `role` field (already migrated):

```sql
ALTER TABLE `user` ADD `role` text;
```

Available roles:

- `admin` - Full administrative access
- `null` or empty - Regular user

## Testing Admin Access

1. Create a user via Google login at `/login`
2. Set the user as admin using the script:
   ```bash
   pnpm tsx scripts/set-admin.ts your-email@example.com
   ```
3. Logout and login again
4. Navigate to `/admin` - you should see the admin dashboard

## Removing Admin Role

To remove admin role from a user, update the database:

```bash
pnpm drizzle-kit studio
```

Or use SQL:

```sql
UPDATE user SET role = NULL WHERE email = 'admin@example.com';
```

## Better-Auth Admin Plugin

The application uses the `admin` plugin from better-auth, which provides:

- Role-based access control
- User management capabilities
- Admin utility functions

The plugin is already configured in `src/utils/auth.ts`:

```typescript
import { admin } from 'better-auth/plugins'

export const auth = betterAuth({
  // ... other config
  plugins: [tanstackStartCookies(), admin()],
})
```

## Files Involved

- `src/routes/admin.tsx` - Admin page with role-based access control
- `src/db/schema.ts` - Database schema with role field
- `src/utils/auth.ts` - Better-auth configuration with admin plugin
- `scripts/set-admin.ts` - Script to set admin role via CLI
- `migrations/0001_warm_baron_strucker.sql` - Database migration for admin features

Example:

```bash
pnpm tsx scripts/set-admin.ts admin@example.com
```

### Manual Database Update

Alternatively, you can directly update the database:

```bash
pnpm drizzle-kit studio
```

Then navigate to the `user` table and set the `role` field to `admin` for the desired user.

## Database Schema

The `user` table includes a `role` field (already migrated):

```sql
ALTER TABLE `user` ADD `role` text;
```

Available roles:

- `admin` - Full administrative access
- `null` or empty - Regular user

## Testing Admin Access

1. Create a user via Google login
2. Set the user as admin using the script
3. Logout and login again
4. Navigate to `/admin` - you should see the admin dashboard

## Better-Auth Admin Plugin

The application uses the `admin` plugin from better-auth, which provides:

- Role-based access control
- User management capabilities
- Admin utility functions

The plugin is already configured in `src/utils/auth.ts`:

```typescript
import { admin } from 'better-auth/plugins'

export const auth = betterAuth({
  // ... other config
  plugins: [tanstackStartCookies(), admin()],
})
```
