const fs = require('fs');

const fastify = require('fastify')({ logger: true });

require('dotenv').config();

const { PORT } = process.env;

fastify.register(require('fastify-cors'), {});

fastify.get('/', async (request, reply) => {
	fs.readFile('./users.json', 'utf8', (err, data) => {
		if (err) {
			console.log('File read failed:', err);
			return;
		}

		if (request.query.term) {
			const result = JSON.parse(data).filter((elem) => elem.name.toLowerCase().search(request.query.term.toLowerCase()) !== -1);
			reply.send(JSON.stringify(result));
		}
		else {
			reply.send(data);
		}

	})
});

const start = async () => {
	fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err, address) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(`Server listening at ${address}`);
	});
};

start();
