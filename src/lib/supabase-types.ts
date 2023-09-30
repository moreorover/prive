export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			billing_customers: {
				Row: {
					email: string;
					id: string;
					metadata: Json | null;
					user_id: string;
				};
				Insert: {
					email: string;
					id: string;
					metadata?: Json | null;
					user_id: string;
				};
				Update: {
					email?: string;
					id?: string;
					metadata?: Json | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "billing_customers_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			billing_products: {
				Row: {
					active: boolean;
					description: string;
					id: string;
					metadata: Json | null;
					name: string;
				};
				Insert: {
					active: boolean;
					description: string;
					id: string;
					metadata?: Json | null;
					name: string;
				};
				Update: {
					active?: boolean;
					description?: string;
					id?: string;
					metadata?: Json | null;
					name?: string;
				};
				Relationships: [];
			};
			billing_subscriptions: {
				Row: {
					cancel_at_period_end: boolean | null;
					created: string;
					current_period_end: string;
					current_period_start: string;
					customer_id: string;
					id: string;
					metadata: Json | null;
					product_id: string;
					status: Database["public"]["Enums"]["subscription_status"];
					trial_end: string | null;
					trial_start: string | null;
					user_id: string;
				};
				Insert: {
					cancel_at_period_end?: boolean | null;
					created: string;
					current_period_end: string;
					current_period_start: string;
					customer_id: string;
					id: string;
					metadata?: Json | null;
					product_id: string;
					status: Database["public"]["Enums"]["subscription_status"];
					trial_end?: string | null;
					trial_start?: string | null;
					user_id: string;
				};
				Update: {
					cancel_at_period_end?: boolean | null;
					created?: string;
					current_period_end?: string;
					current_period_start?: string;
					customer_id?: string;
					id?: string;
					metadata?: Json | null;
					product_id?: string;
					status?: Database["public"]["Enums"]["subscription_status"];
					trial_end?: string | null;
					trial_start?: string | null;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "billing_subscriptions_customer_id_fkey";
						columns: ["customer_id"];
						referencedRelation: "billing_customers";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "billing_subscriptions_product_id_fkey";
						columns: ["product_id"];
						referencedRelation: "billing_products";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "billing_subscriptions_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			contacts: {
				Row: {
					created_at: string;
					created_by: string;
					deleted_by: string | null;
					id: string;
					name: string | null;
					phone: string | null;
					updated_at: string;
					updated_by: string | null;
				};
				Insert: {
					created_at?: string;
					created_by: string;
					deleted_by?: string | null;
					id?: string;
					name?: string | null;
					phone?: string | null;
					updated_at?: string;
					updated_by?: string | null;
				};
				Update: {
					created_at?: string;
					created_by?: string;
					deleted_by?: string | null;
					id?: string;
					name?: string | null;
					phone?: string | null;
					updated_at?: string;
					updated_by?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "contacts_created_by_fkey";
						columns: ["created_by"];
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "contacts_deleted_by_fkey";
						columns: ["deleted_by"];
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "contacts_updated_by_fkey";
						columns: ["updated_by"];
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
			profiles: {
				Row: {
					created_at: string;
					full_name: string | null;
					id: string;
					instagram: string | null;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					full_name?: string | null;
					id: string;
					instagram?: string | null;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					full_name?: string | null;
					id?: string;
					instagram?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "profiles_id_fkey";
						columns: ["id"];
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			role_permissions: {
				Row: {
					id: number;
					permission: Database["public"]["Enums"]["app_permission"];
					role: Database["public"]["Enums"]["app_role"];
				};
				Insert: {
					id?: number;
					permission: Database["public"]["Enums"]["app_permission"];
					role: Database["public"]["Enums"]["app_role"];
				};
				Update: {
					id?: number;
					permission?: Database["public"]["Enums"]["app_permission"];
					role?: Database["public"]["Enums"]["app_role"];
				};
				Relationships: [];
			};
			stock: {
				Row: {
					code: string | null;
					colour: string | null;
					created_at: string;
					created_by: string | null;
					description: string | null;
					id: string;
					length_cm: number;
					purchased_at: string | null;
					updated_at: string;
					updated_by: string | null;
					weight_expected_grams: number;
					weight_received_grams: number;
				};
				Insert: {
					code?: string | null;
					colour?: string | null;
					created_at?: string;
					created_by?: string | null;
					description?: string | null;
					id?: string;
					length_cm?: number;
					purchased_at?: string | null;
					updated_at?: string;
					updated_by?: string | null;
					weight_expected_grams?: number;
					weight_received_grams?: number;
				};
				Update: {
					code?: string | null;
					colour?: string | null;
					created_at?: string;
					created_by?: string | null;
					description?: string | null;
					id?: string;
					length_cm?: number;
					purchased_at?: string | null;
					updated_at?: string;
					updated_by?: string | null;
					weight_expected_grams?: number;
					weight_received_grams?: number;
				};
				Relationships: [
					{
						foreignKeyName: "stock_created_by_fkey";
						columns: ["created_by"];
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "stock_updated_by_fkey";
						columns: ["updated_by"];
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
			user_roles: {
				Row: {
					role: Database["public"]["Enums"]["app_role"];
					user_id: string;
				};
				Insert: {
					role: Database["public"]["Enums"]["app_role"];
					user_id: string;
				};
				Update: {
					role?: Database["public"]["Enums"]["app_role"];
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "user_roles_user_id_fkey";
						columns: ["user_id"];
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			authorize: {
				Args: {
					requested_permission: Database["public"]["Enums"]["app_permission"];
					user_id: string;
				};
				Returns: boolean;
			};
			get_roles: {
				Args: Record<PropertyKey, never>;
				Returns: string[];
			};
		};
		Enums: {
			app_permission:
				| "contacts.create"
				| "contacts.update"
				| "contacts.delete"
				| "profiles.view"
				| "profiles.update"
				| "user.roles.view"
				| "user.roles.create"
				| "user.roles.delete"
				| "role.permissions.view"
				| "role.permissions.create"
				| "role.permissions.delete";
			app_role: "admin" | "moderator" | "user";
			subscription_status:
				| "trialing"
				| "active"
				| "canceled"
				| "incomplete"
				| "incomplete_expired"
				| "past_due"
				| "unpaid"
				| "paused";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null;
					avif_autodetection: boolean | null;
					created_at: string | null;
					file_size_limit: number | null;
					id: string;
					name: string;
					owner: string | null;
					public: boolean | null;
					updated_at: string | null;
				};
				Insert: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id: string;
					name: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Update: {
					allowed_mime_types?: string[] | null;
					avif_autodetection?: boolean | null;
					created_at?: string | null;
					file_size_limit?: number | null;
					id?: string;
					name?: string;
					owner?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "buckets_owner_fkey";
						columns: ["owner"];
						referencedRelation: "users";
						referencedColumns: ["id"];
					}
				];
			};
			migrations: {
				Row: {
					executed_at: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Insert: {
					executed_at?: string | null;
					hash: string;
					id: number;
					name: string;
				};
				Update: {
					executed_at?: string | null;
					hash?: string;
					id?: number;
					name?: string;
				};
				Relationships: [];
			};
			objects: {
				Row: {
					bucket_id: string | null;
					created_at: string | null;
					id: string;
					last_accessed_at: string | null;
					metadata: Json | null;
					name: string | null;
					owner: string | null;
					path_tokens: string[] | null;
					updated_at: string | null;
					version: string | null;
				};
				Insert: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Update: {
					bucket_id?: string | null;
					created_at?: string | null;
					id?: string;
					last_accessed_at?: string | null;
					metadata?: Json | null;
					name?: string | null;
					owner?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "objects_bucketId_fkey";
						columns: ["bucket_id"];
						referencedRelation: "buckets";
						referencedColumns: ["id"];
					}
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			can_insert_object: {
				Args: {
					bucketid: string;
					name: string;
					owner: string;
					metadata: Json;
				};
				Returns: undefined;
			};
			extension: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			filename: {
				Args: {
					name: string;
				};
				Returns: string;
			};
			foldername: {
				Args: {
					name: string;
				};
				Returns: unknown;
			};
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>;
				Returns: {
					size: number;
					bucket_id: string;
				}[];
			};
			search: {
				Args: {
					prefix: string;
					bucketname: string;
					limits?: number;
					levels?: number;
					offsets?: number;
					search?: string;
					sortcolumn?: string;
					sortorder?: string;
				};
				Returns: {
					name: string;
					id: string;
					updated_at: string;
					created_at: string;
					last_accessed_at: string;
					metadata: Json;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
