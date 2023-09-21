import type { Database } from "$lib/supabase-types";
import type { Session, SupabaseClient } from "@supabase/supabase-js";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		supabase: SupabaseClient<Database>;
		getSession(): Promise<Session | null>;
	}
	interface PageData {
		session: Session | null;
	}
	// interface Platform {}
}
