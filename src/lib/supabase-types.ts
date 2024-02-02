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
			clients: {
				Row: {
					abbreviation: string;
					created_at: string;
					created_by: string;
					email: string;
					id: string;
					instagram: string;
					name: string;
					phone: string;
					updated_at: string | null;
					updated_by: string | null;
				};
				Insert: {
					abbreviation?: string;
					created_at?: string;
					created_by: string;
					email?: string;
					id?: string;
					instagram?: string;
					name: string;
					phone: string;
					updated_at?: string | null;
					updated_by?: string | null;
				};
				Update: {
					abbreviation?: string;
					created_at?: string;
					created_by?: string;
					email?: string;
					id?: string;
					instagram?: string;
					name?: string;
					phone?: string;
					updated_at?: string | null;
					updated_by?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'clients_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'clients_updated_by_fkey';
						columns: ['updated_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};
			hair: {
				Row: {
					created_at: string;
					created_by: string;
					deleted: boolean;
					deleted_at: string | null;
					deleted_by: string | null;
					description: string;
					id: number;
					length: number;
					purchase_price: number;
					title: string;
					upc: string;
					updated_at: string | null;
					updated_by: string | null;
					weight_in_stock: number;
					weight_purchased: number;
				};
				Insert: {
					created_at?: string;
					created_by: string;
					deleted?: boolean;
					deleted_at?: string | null;
					deleted_by?: string | null;
					description?: string;
					id?: number;
					length?: number;
					purchase_price?: number;
					title?: string;
					upc?: string;
					updated_at?: string | null;
					updated_by?: string | null;
					weight_in_stock: number;
					weight_purchased: number;
				};
				Update: {
					created_at?: string;
					created_by?: string;
					deleted?: boolean;
					deleted_at?: string | null;
					deleted_by?: string | null;
					description?: string;
					id?: number;
					length?: number;
					purchase_price?: number;
					title?: string;
					upc?: string;
					updated_at?: string | null;
					updated_by?: string | null;
					weight_in_stock?: number;
					weight_purchased?: number;
				};
				Relationships: [
					{
						foreignKeyName: 'hair_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'hair_deleted_by_fkey';
						columns: ['deleted_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'hair_updated_by_fkey';
						columns: ['updated_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};
			order_hair: {
				Row: {
					client_id: string | null;
					created_at: string;
					created_by: string;
					deleted_at: string | null;
					deleted_by: string | null;
					hair_id: number | null;
					id: string;
					order_id: string | null;
					price: number | null;
					updated_at: string | null;
					updated_by: string | null;
					weight: number | null;
				};
				Insert: {
					client_id?: string | null;
					created_at?: string;
					created_by: string;
					deleted_at?: string | null;
					deleted_by?: string | null;
					hair_id?: number | null;
					id?: string;
					order_id?: string | null;
					price?: number | null;
					updated_at?: string | null;
					updated_by?: string | null;
					weight?: number | null;
				};
				Update: {
					client_id?: string | null;
					created_at?: string;
					created_by?: string;
					deleted_at?: string | null;
					deleted_by?: string | null;
					hair_id?: number | null;
					id?: string;
					order_id?: string | null;
					price?: number | null;
					updated_at?: string | null;
					updated_by?: string | null;
					weight?: number | null;
				};
				Relationships: [
					{
						foreignKeyName: 'order_hair_client_id_fkey';
						columns: ['client_id'];
						isOneToOne: false;
						referencedRelation: 'clients';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_hair_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_hair_deleted_by_fkey';
						columns: ['deleted_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_hair_hair_id_fkey';
						columns: ['hair_id'];
						isOneToOne: false;
						referencedRelation: 'hair';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_hair_order_id_fkey';
						columns: ['order_id'];
						isOneToOne: false;
						referencedRelation: 'orders';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_hair_updated_by_fkey';
						columns: ['updated_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};
			order_products: {
				Row: {
					client_id: string | null;
					created_at: string;
					created_by: string;
					deleted_at: string | null;
					deleted_by: string | null;
					id: string;
					order_id: string | null;
					product_id: string | null;
					quantity: number | null;
					unit_price: number | null;
					updated_at: string | null;
					updated_by: string | null;
				};
				Insert: {
					client_id?: string | null;
					created_at?: string;
					created_by: string;
					deleted_at?: string | null;
					deleted_by?: string | null;
					id?: string;
					order_id?: string | null;
					product_id?: string | null;
					quantity?: number | null;
					unit_price?: number | null;
					updated_at?: string | null;
					updated_by?: string | null;
				};
				Update: {
					client_id?: string | null;
					created_at?: string;
					created_by?: string;
					deleted_at?: string | null;
					deleted_by?: string | null;
					id?: string;
					order_id?: string | null;
					product_id?: string | null;
					quantity?: number | null;
					unit_price?: number | null;
					updated_at?: string | null;
					updated_by?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'order_products_client_id_fkey';
						columns: ['client_id'];
						isOneToOne: false;
						referencedRelation: 'clients';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_products_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_products_deleted_by_fkey';
						columns: ['deleted_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_products_order_id_fkey';
						columns: ['order_id'];
						isOneToOne: false;
						referencedRelation: 'orders';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_products_product_id_fkey';
						columns: ['product_id'];
						isOneToOne: false;
						referencedRelation: 'products';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'order_products_updated_by_fkey';
						columns: ['updated_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};
			orders: {
				Row: {
					client_id: string | null;
					created_at: string;
					created_by: string;
					deleted_at: string | null;
					deleted_by: string | null;
					id: string;
					order_status: Database['public']['Enums']['order_status'];
					order_type: Database['public']['Enums']['order_type'];
					ordered_at: string;
					total: number | null;
					updated_at: string | null;
					updated_by: string | null;
				};
				Insert: {
					client_id?: string | null;
					created_at?: string;
					created_by: string;
					deleted_at?: string | null;
					deleted_by?: string | null;
					id?: string;
					order_status: Database['public']['Enums']['order_status'];
					order_type: Database['public']['Enums']['order_type'];
					ordered_at?: string;
					total?: number | null;
					updated_at?: string | null;
					updated_by?: string | null;
				};
				Update: {
					client_id?: string | null;
					created_at?: string;
					created_by?: string;
					deleted_at?: string | null;
					deleted_by?: string | null;
					id?: string;
					order_status?: Database['public']['Enums']['order_status'];
					order_type?: Database['public']['Enums']['order_type'];
					ordered_at?: string;
					total?: number | null;
					updated_at?: string | null;
					updated_by?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'orders_client_id_fkey';
						columns: ['client_id'];
						isOneToOne: false;
						referencedRelation: 'clients';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'orders_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'orders_deleted_by_fkey';
						columns: ['deleted_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'orders_updated_by_fkey';
						columns: ['updated_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};
			products: {
				Row: {
					created_at: string;
					created_by: string;
					deleted_at: string | null;
					deleted_by: string | null;
					description: string;
					id: string;
					rrp: number;
					supplier_id: string | null;
					title: string;
					units_in_stock: number;
					upc: string;
					updated_at: string | null;
					updated_by: string | null;
				};
				Insert: {
					created_at?: string;
					created_by: string;
					deleted_at?: string | null;
					deleted_by?: string | null;
					description?: string;
					id?: string;
					rrp?: number;
					supplier_id?: string | null;
					title: string;
					units_in_stock?: number;
					upc?: string;
					updated_at?: string | null;
					updated_by?: string | null;
				};
				Update: {
					created_at?: string;
					created_by?: string;
					deleted_at?: string | null;
					deleted_by?: string | null;
					description?: string;
					id?: string;
					rrp?: number;
					supplier_id?: string | null;
					title?: string;
					units_in_stock?: number;
					upc?: string;
					updated_at?: string | null;
					updated_by?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'products_created_by_fkey';
						columns: ['created_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'products_deleted_by_fkey';
						columns: ['deleted_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'products_supplier_id_fkey';
						columns: ['supplier_id'];
						isOneToOne: false;
						referencedRelation: 'clients';
						referencedColumns: ['id'];
					},
					{
						foreignKeyName: 'products_updated_by_fkey';
						columns: ['updated_by'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
					}
				];
			};
			profiles: {
				Row: {
					created_at: string;
					full_name: string | null;
					id: string;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string;
					full_name?: string | null;
					id: string;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string;
					full_name?: string | null;
					id?: string;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'profiles_id_fkey';
						columns: ['id'];
						isOneToOne: true;
						referencedRelation: 'users';
						referencedColumns: ['id'];
					}
				];
			};
			user_roles: {
				Row: {
					description: string | null;
					name: string;
				};
				Insert: {
					description?: string | null;
					name: string;
				};
				Update: {
					description?: string | null;
					name?: string;
				};
				Relationships: [];
			};
			user_roles_mapping: {
				Row: {
					role_name: string;
					user_id: string;
				};
				Insert: {
					role_name: string;
					user_id: string;
				};
				Update: {
					role_name?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'user_roles_mapping_role_name_fkey';
						columns: ['role_name'];
						isOneToOne: false;
						referencedRelation: 'user_roles';
						referencedColumns: ['name'];
					},
					{
						foreignKeyName: 'user_roles_mapping_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'profiles';
						referencedColumns: ['id'];
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
					target_role_name: string;
					user_id: string;
				};
				Returns: boolean;
			};
		};
		Enums: {
			order_status: 'pending' | 'completed' | 'cancelled';
			order_type: 'purchase' | 'sale';
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
					owner_id: string | null;
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
					owner_id?: string | null;
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
					owner_id?: string | null;
					public?: boolean | null;
					updated_at?: string | null;
				};
				Relationships: [];
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
					owner_id: string | null;
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
					owner_id?: string | null;
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
					owner_id?: string | null;
					path_tokens?: string[] | null;
					updated_at?: string | null;
					version?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: 'objects_bucketId_fkey';
						columns: ['bucket_id'];
						isOneToOne: false;
						referencedRelation: 'buckets';
						referencedColumns: ['id'];
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

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
	  }
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
			Database['public']['Views'])
	? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
			Row: infer R;
	  }
		? R
		: never
	: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
	  }
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Insert: infer I;
	  }
		? I
		: never
	: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
	  }
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
	? Database['public']['Tables'][PublicTableNameOrOptions] extends {
			Update: infer U;
	  }
		? U
		: never
	: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
	? Database['public']['Enums'][PublicEnumNameOrOptions]
	: never;
