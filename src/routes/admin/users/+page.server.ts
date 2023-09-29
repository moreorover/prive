import type { PageServerLoad, PageServerLoadEvent } from "./$types";

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const { data: allUsers, error: allUsersError } = await event.locals.supabase
		.from("profiles")
		.select("*");

	if (allUsersError) {
		console.error(`Got error when trying to fetch profiles -> ${allUsersError}`);
	}

	console.log({ allUsers });

	return {
		allUsers
	};
};
