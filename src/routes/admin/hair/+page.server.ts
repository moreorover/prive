import { error } from '@sveltejs/kit';

export const load = async (event) => {
	async function getHair() {
		const { error: hairError, data: hair } = await event.locals.supabase
			.from('hair')
			.select('*, orders(*)')
			.eq('orders.completed', 'true');

		if (hairError) {
			console.log(hairError);
			error(500, 'Error fetching order. Please try again later.');
		}
		if (!hair) {
			error(404, 'Contact not found.');
		}

		console.log({ hair });

		return hair;
	}

	return {
		hair: await getHair()
	};
};
