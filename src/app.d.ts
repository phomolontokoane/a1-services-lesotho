// See https://svelte.dev/docs/kit/types#app.d.ts

import type { User } from '@supabase/supabase-js';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				id: number;
				name: string;
				phone_number: string;
			};
			admin_user?: User;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
