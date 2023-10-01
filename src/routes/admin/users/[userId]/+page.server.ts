import type { PageServerLoad, PageServerLoadEvent } from "../$types.js";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	return { userId: event.params.userId };
};
