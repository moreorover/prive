import type { UserRole } from '$lib/server/authorization';
import type { Database } from '$lib/supabase-types';
import type { Session, SupabaseClient } from '@supabase/supabase-js';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			getRoles(): Promise<UserRole[]>;
			getUserRolesWithPermissions(user_id: string): Promise<UserRole[]>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
}

export {};
