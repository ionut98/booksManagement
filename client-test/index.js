const axios = require('axios');

const config = {
	IP: 'localhost',
	Port: '30401'
};

const url = `http://${config.IP}:${config.Port}/`;

const displayBooks = (books) => {
	console.log('ISBN   Titlu   NrPagini   Tip   Descriere   Autori');
	console.log('---------------------------------------------------');

	books.forEach((book) => {
		let authors = '';
		book.Authors.forEach((author) => {
			authors += author.FirstName + '-' + author.LastName + ' ';
		});
		console.log(
			book.ISBN,
			'|',
			book.Title,
			'|',
			book.NrOfPages,
			'|',
			book.Type,
			'|',
			book.Description,
			'|',
			authors
		);
	});

	console.log('---------------------------------------------------');
};

const displayAuthors = (authors) => {
	console.log('ID Prenume Nume');
	console.log('----------------');

	authors.forEach((author) => {
		console.log(author.id, '|', author.FirstName, '|', author.LastName);
	});

	console.log('---------------------------------------------------');
};

const getBooks = async (url, keyword) => {
	const response = await axios.get(url + `books/filter-by-title?keyword=${keyword}`);
	const data = response.data;

	console.log('####################');
	console.log('ALL BOOKS: ');

	if (data['success']) {
		displayBooks(data['books']);
	} else {
		console.log('Eroare la primirea datelor!');
	}

	console.log('####################');
};

const getAuthors = async (url, keyword) => {
	const response = await axios.get(url + `authors/filter-by-name?keyword=${keyword}`);
	const data = response.data;

	console.log('####################');
	console.log('ALL AUTHORS: ');

	if (data['success']) {
		displayAuthors(data['authors']);
	} else {
		console.log('Eroare la primirea datelor!');
	}

	console.log('####################');
};

const addBook = async (url, newBook) => {
	const response = await axios.post(url + `books/add`, newBook);
	const data = response.data;

	console.log('####################');
	console.log('AFTER ADD_BOOKS: ');

	if (data['success']) {
		getBooks(url, '');
	} else {
		console.log('Eroare la adaugare carte!');
	}

	console.log('####################');
};

const addAuthor = async (url, newAuthor) => {
	const response = await axios.post(url + `authors/add`, newAuthor);
	const data = response.data;

	console.log('####################');
	console.log('AFTER ADD_AUTHORS: ');

	if (data['success']) {
		getAuthors(url, '');
	} else {
		console.log('Eroare la adaugare autor!');
	}

	console.log('####################');
};

const deleteBook = async (url, ISBN) => {
	const response = await axios.delete(url + `books/delete`, ISBN);
	const data = response.data;

	console.log('####################');
	console.log('AFTER DELETE_BOOKS: ');

	if (data['success']) {
		getBooks(url, '');
	} else {
		console.log('Eroare la stergere carte!');
	}

	console.log('####################');
};

const deleteAuthor = async (url, authorId) => {
	const response = await axios.delete(url + `authors/delete`, authorId);
	const data = response.data;

	console.log('####################');
	console.log('AFTER DELETE_AUTHORS: ');

	if (data['success']) {
		getAuthors(url, '');
	} else {
		console.log('Eroare la stergere autor!');
	}

	console.log('####################');
};

const updateBook = async (url, payload) => {
	const response = await axios.put(url + `books/update`, payload);
	const data = response.data;

	console.log(data);

	console.log('####################');
	console.log('AFTER UPDATE_BOOKS: ');

	if (data['success']) {
		getBooks(url, '');
	} else {
		console.log('Eroare la modificare carte!');
	}

	console.log('####################');
};

const updateAuthor = async (url, payload) => {
	const response = await axios.put(url + `authors/update`, payload);
	const data = response.data;

	console.log(data);

	console.log('####################');
	console.log('AFTER UPDATE_AUTHORS: ');

	if (data['success']) {
		getAuthors(url, '');
	} else {
		console.log('Eroare la modificare autor!');
	}

	console.log('####################');
};

// call methods

// GET_ALL Methods #############################

// getBooks(url, '');
// getAuthors(url, '');

// FILTER Methods ##############################

// getBooks(url, 'Mireasa');
// getAuthors(url, 'a1');

// ADD Methods #################################

// addBook(url, {
// 	book: {
// 		ISBN: 'ISBN6',
// 		Title: 'Cartea1',
// 		NrOfPages: '200',
// 		Type: 'Tip1',
// 		Description: 'Descriere1'
// 	},
// 	authors: [ 1, 2, 3 ]
// });
// addAuthor(url, {
// 	FirstName: 'Gigel',
// 	LastName: 'Ion'
// });

// DELETE Methods ###############################

// deleteBook(url, {
// 	data: {
// 		ISBN: 'ISBN4'
// 	}
// });
// deleteAuthor(url, {
// 	data: {
// 		id: '5'
// 	}
// });

// UPDATE METHODS ###############################

// updateBook(url, {
// 	ISBN: 'ISBN1',
// 	book: {
// 		Title: 'Cartea1',
// 		NrOfPages: '200',
// 		Type: 'Tip1',
// 		Description: 'Descriere1'
// 	},
// 	authors: [ 6, 7, 8 ]
// });
// updateAuthor(url, {
// 	id: '11',
// 	FirstName: 'a11',
// 	LastName: 'a11'
// });
