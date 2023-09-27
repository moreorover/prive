import type { Database } from "$lib/supabase-types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

declare global {
	/// <reference types="stripe-event-types" />
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
			getRoles(): Promise<Database.Enums.app_role | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
}

export {};
