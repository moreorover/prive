import type { UserRolesPermissions } from "$lib/server/authorization";
import type { Database } from "$lib/supabase-types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

declare global {
	/// <reference types="stripe-event-types" />
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			getRoles(user_id: string): Promise<UserRolesPermissions | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
}

export {};
