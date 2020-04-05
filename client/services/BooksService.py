import requests


class BooksService:

    def __init__(self, url):
        self.__url = url

    def add_book(self, new_book, new_book_authors_ids_list):
        data = {
            "book": {
                "ISBN": new_book.isbn,
                "Title": new_book.title,
                "NrOfPages": new_book.nr_of_pages,
                "Type": new_book.type,
                "Description": new_book.description
            },
            "authors": new_book_authors_ids_list
        }
        print(data)
        response = requests.post(
            self.__url + 'add', json=data)
        return response.json()

    def delete_book(self, ISBN):
        data = {
            "ISBN": ISBN
        }
        print(data)
        response = requests.delete(
            self.__url + 'delete', json=data)
        return response.json()

    def update_book(self, ISBN, book, new_book_authors_ids_list):
        data = {
            "ISBN": ISBN,
            "book": book,
            "authors": new_book_authors_ids_list
        }
        print(data)
        response = requests.put(
            self.__url + 'update', json=data)
        return response.json()

    def get_books(self, keyword):
        response = requests.get(
             self.__url + 'filter-by-title?keyword={keyword}'.format(keyword=keyword))
        return response.json()
