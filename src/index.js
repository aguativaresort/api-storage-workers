export default {
	async fetch(request, env) {

		const url = new URL(request.url)
		const objectName = url.pathname.slice(1)

		switch (request.method) {
			case 'GET':
				const options = {
					prefix: objectName
				}
				const list = await env.R2.list(options);

				const result = list.objects.map(item => {
					return "https://files.gestao-individual.aguativaconnection.com.br/" + item.key
				})
				if (list === null) {
					return new Response('Object Not Found', { status: 404 });
				}

				return new Response(JSON.stringify(result), {
					headers: {
						'content-type': 'application/json; charset=UTF-8',
					}
				})

			default:
				return new Response('Method Not Allowed', {
					status: 405,
					headers: {
						Allow: 'PUT, GET, DELETE',
					},
				});
		}
	},
};