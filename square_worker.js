onmessage = (e) => {
	console.log('Получено сообщение', e.data);
	const sq = e.data * e.data;
	console.log('Возвращаем квадрат переданного значения', sq);
	postMessage(sq);
}