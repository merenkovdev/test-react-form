const SERVER_REQUEST_DELAY = 1500;

export default class PublicationService {
	data = [
		{
			id: 1,
			title: 'Публикация 1',
			description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quibusdam dignissimos ullam natus eligendi laborum similique exercitationem nam sequi ea nostrum quisquam quidem debitis facere, necessitatibus officia. Accusantium, commodi aliquam!',
		},
		{
			id: 2,
			title: 'Публикация 2',
			description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est, error.',
		},
	];

	getData() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(this.data);
			}, SERVER_REQUEST_DELAY);
		});
	}
}