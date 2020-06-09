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
        response = requests.delete(
            self.__url + 'delete', json=data)

        parsed_response = response.json()

        result_string = "\n------------------"

        if parsed_response["success"] and parsed_response["deletedBook"]:
            result_string += "\nOperatie realizata!\n"

        if parsed_response["success"] and parsed_response["deletedBook"] is False:
            result_string += "\nNimic de sters!\n"

        result_string += "------------------\n"
        return result_string

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

        parsed_response = response.json()
        books = parsed_response["books"]

        books_string = "\nISBN   Titlu   NrPagini   Tip   Descriere   Autori\n"
        books_string += "---------------------------------------------------\n"

        if len(books) == 0:
            books_string += "Fara rezultate \n"

        for book in books:
            books_string += "[" + str(book["ISBN"]) + "] | " + book["Title"] + " | " + str(book["NrOfPages"]) + " | " + \
                            book["Type"] + " | " + book["Description"] + " | "
            for author in book["Authors"]:
                books_string += author["FirstName"] + "-" + author["LastName"] + " "
            books_string += "\n"
        books_string += "---------------------------------------------------\n"
        return books_string
