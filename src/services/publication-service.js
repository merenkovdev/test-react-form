const SERVER_REQUEST_DELAY = 1500;

export default class PublicationService {
	data = [
		{
			id: '134018f',
			title: 'Публикация 1',
			text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque quibusdam dignissimos ullam natus eligendi laborum similique exercitationem nam sequi ea nostrum quisquam quidem debitis facere, necessitatibus officia. Accusantium, commodi aliquam!',
		},
		{
			id: '3b29067',
			title: 'Публикация 2',
			text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est, error.',
		},
	];

	getData() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(this.data);
				// Если нужно обработать ошибку
				// reject('Ошибка при получении данных');
			}, SERVER_REQUEST_DELAY);
		});
	}
}