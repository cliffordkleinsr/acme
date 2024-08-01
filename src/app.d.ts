// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { User, Session } from "lucia"
declare global {
	interface Window {
		Datamap: {
		  new (options: any): Datamap;
		};
	  }
	declare class Datamap {
		constructor(options: any);
		// Add any other methods or properties you use
	}
	declare const d3: any;
	declare const topojson: any;
	namespace App {
		// interface Error {}
		interface Locals {
			user: User | null
			session: Session | null
		}
		interface PageData {
			flash?: { type: 'success' | 'error' | 'warning'; message: string }
		}
		
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
