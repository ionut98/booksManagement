from services.BooksService import BooksService
from services.AuthorsService import AuthorsService

from models.Author import Author
from models.Book import Book


class Console:
    # host = "192.168.62.221"  # munca
    host = "192.168.0.157"  # acasa
    port = "30401"

    authors_service = AuthorsService("http://{host}:{port}/authors/".format(host=host, port=port))
    books_service = BooksService("http://{host}:{port}/books/".format(host=host, port=port))

    def run(self):

        main_options = {
            'autori': self.show_authors_options,
            'carti': self.show_books_options
        }

        while True:
            print("-->Autori \n-->Carti \n-->Exit\n")
            main_option = input("Optiunea dumneavoastra este:  ")
            if main_option.lower() == "exit":
                break
            elif main_option.lower() not in main_options:
                print("\nOptiune invalida!\n")
            else:
                main_options[main_option.lower()]()

    @staticmethod
    def validate_book_inputs(authors):
        book_title = input("Introduceti titlul cartii: ")
        if len(book_title) == 0:
            print('\nTitlul cartii trebuie sa fie nevid!\n')
            return None

        book_nr_of_pages = input("Introduceti nr de pagini al cartii: ")
        try:
            book_nr_of_pages = int(book_nr_of_pages)
            if book_nr_of_pages < 0:
                print('\nIntroduceti un nr valid de pagini!\n')
                return None
        except ValueError:
            print('\nIntroduceti un nr valid de pagini!\n')
            return None

        book_type = input("Introduceti tipul cartii: ")
        book_description = input("Introduceti descrierea cartii: ")
        book_authors = input("Introduceti id-urile autorilor cartii: (separate prin virgula): ")

        try:
            book_authors = book_authors.split(",")

            non_existent_authors = ""
            for author_id in book_authors:
                if int(author_id) not in [author['id'] for author in authors]:
                    non_existent_authors += author_id + ' '

            if non_existent_authors != "":
                print("\nId-urile: {ids}nu exista".format(ids=non_existent_authors))
                print("Va rugam sa adaugati, mai intai, autorul/autorii inexistent(i)!\n")
                return None

        except ValueError:
            print('\nValorile introduse sunt eronate!\n')
            return None

        validated_inputs = {
            "book_title": book_title,
            "book_nr_of_pages": book_nr_of_pages,
            "book_authors": book_authors,
            "book_type": book_type,
            "book_description": book_description
        }

        return validated_inputs

    @staticmethod
    def print_books(books):
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

        print(books_string)

    def show_authors_options(self):
        authors_options = {
            'afiseaza': self.show_all_authors,
            'adauga': self.add_authors,
            'modifica': self.update_authors,
            'sterge': self.delete_authors,
            'filtreaza': self.filter_authors
        }
        while True:
            print("-->Afiseaza\n-->Adauga\n-->Modifica\n-->Sterge\n-->Filtreaza\n-->Revenire\n")
            authors_option = input("Optiunea dumneavoastra este: ")

            if authors_option == "revenire":
                break
            elif authors_option.lower() in authors_options:
                authors_options[authors_option.lower()]()
            else:
                print("Optiune invalida, alegeti dintre cele existente!\n")

    def show_books_options(self):
        books_options = {
            'afiseaza': self.show_all_books,
            'adauga': self.add_books,
            'modifica': self.update_books,
            'sterge': self.delete_books,
            'filtreaza': self.filter_books
        }
        while True:
            print("-->Afiseaza\n-->Adauga\n-->Modifica\n-->Sterge\n-->Filtreaza\n-->Revenire\n")
            books_option = input("Optiunea dumneavoastra este: ")

            if books_option == "revenire":
                break
            elif books_option.lower() in books_options:
                books_options[books_option.lower()]()
            else:
                print("Optiune invalida, alegeti dintre cele existente!\n")

    def show_all_authors(self):
        authors = self.authors_service.get_authors("")

        authors_string = "\nID   Prenume   Nume\n"
        authors_string += "------------------\n"

        if len(authors) == 0:
            authors_string += "Fara rezultate \n"

        for author in authors:
            authors_string += "[" + str(author["id"]) + "] " + author["FirstName"] + " " + author["LastName"] + "\n"
        authors_string += "------------------\n"

        print(authors_string)

    def show_all_books(self):
        books = self.books_service.get_books("")
        self.print_books(books)

    def filter_authors(self):
        keyword = input("\n Filtrati dupa nume: ")
        authors = self.authors_service.get_authors(keyword)

        authors_string = "\nID   Prenume   Nume\n"
        authors_string += "------------------\n"

        if len(authors) == 0:
            authors_string += "Fara rezultate \n"

        for author in authors:
            authors_string += "[" + str(author["id"]) + "] " + author["FirstName"] + " " + author["LastName"] + "\n"
        authors_string += "------------------\n"

        print(authors_string)

    def filter_books(self):
        keyword = input("\n Filtrati dupa titlu: ")
        books = self.books_service.get_books(keyword)
        self.print_books(books)

    def delete_authors(self):
        self.show_all_authors()
        id_author = input("Introduceti id-ul autorului de sters: ")
        result = self.authors_service.delete_author(id_author)

        result_string = "\n------------------"

        if result["success"] and result["deleted"]:
            result_string += "\nOperatie realizata!\n"

        elif result["success"] and result["deleted"] is False:
            result_string += "\nNimic de sters!\n"
        else:
            result_string += "\nOperatie esuata!\n"

        result_string += "------------------\n"
        print(result_string)
        self.show_all_authors()

    def delete_books(self):
        self.show_all_books()
        isbn_book = input("Introduceti ISBN-ul cartii de sters: ")
        result = self.books_service.delete_book(isbn_book)

        result_string = "\n------------------"

        if result["success"] and result["deletedBook"]:
            result_string += "\nOperatie realizata!\n"

        if result["success"] and result["deletedBook"] is False:
            result_string += "\nNimic de sters!\n"

        result_string += "------------------\n"
        print(result_string)
        self.show_all_books()

    def add_authors(self):
        self.show_all_authors()
        author_first_name = input("Introduceti prenumele autorului: ")
        author_last_name = input("Introduceti numele autorului: ")

        if len(author_last_name) == 0 or len(author_first_name) == 0:
            print("\nNumele si prenumele trebuie sa fie nevide!\n")
            return

        result = self.authors_service.add_author(Author(author_first_name, author_last_name))

        result_string = "\n------------------"

        if result["success"]:
            result_string += "\nOperatie realizata!\n"

        else:
            result_string += "\nOperatie esuata!\n"

        result_string += "------------------\n"
        print(result_string)
        self.show_all_authors()

    def add_books(self):
        books = self.books_service.get_books("")
        print('\nLista Carti: ')
        self.show_all_books()

        authors = self.authors_service.get_authors("")
        print('\nLista Autori: ')
        self.show_all_authors()

        book_isbn = input("Introduceti ISBN-ul cartii: ")
        if book_isbn in [book['ISBN'] for book in books]:
            print('\nISBN deja existent!\n')
            return

        # extracted this method because of the similarity between add_books and update_books
        validated_inputs = self.validate_book_inputs(authors)
        if validated_inputs is None:
            return

        result = self.books_service.add_book(
            Book(
                book_isbn,
                validated_inputs['book_title'],
                validated_inputs['book_nr_of_pages'],
                validated_inputs['book_type'],
                validated_inputs['book_description']
            ),
            validated_inputs['book_authors']
        )

        if result['success'] is False:
            print('\nEroare -->', result['type'])
            return

        if result['success']:
            print('\nOperatie efectuata cu succes!')

        self.show_all_books()

    def update_books(self):
        authors = self.authors_service.get_authors("")
        print('\nLista Autori: ')
        self.show_all_authors()

        books = self.books_service.get_books("")
        print('\nLista Carti: ')
        self.show_all_books()

        book_isbn = input("Introduceti ISBN-ul cartii: ")
        if book_isbn not in [book['ISBN'] for book in books]:
            print('\nISBN inexistent!\n')
            return

        validated_inputs = self.validate_book_inputs(authors)
        if validated_inputs is None:
            return

        result = self.books_service.update_book(
            Book(
                book_isbn,
                validated_inputs['book_title'],
                validated_inputs['book_nr_of_pages'],
                validated_inputs['book_type'],
                validated_inputs['book_description']
            ),
            validated_inputs['book_authors']
        )

        if result['success'] is False:
            print('\nOperatie esuata')
            return

        if result['success']:
            print('\nOperatie efectuata cu succes!')

        self.show_all_books()

    def update_authors(self):
        self.show_all_authors()
        author_id = input("Introduceti id-ul autorului: ")
        authors = self.authors_service.get_authors("")

        # validare existenta id autor
        try:
            if int(author_id) not in [author['id'] for author in authors]:
                print('\nId autor inexistent!\n')
                return
        except ValueError:
            print('\nId-ul introdus este invalid\n')
            return

        author_first_name = input("Introduceti prenumele autorului: ")
        author_last_name = input("Introduceti numele autorului: ")

        if len(author_last_name) == 0 or len(author_first_name) == 0:
            print("\nNumele si prenumele trebuie sa fie nevide!\n")
            return

        result = self.authors_service.update_author(author_id, Author(author_first_name, author_last_name))
        result_string = "\n------------------"

        if result["success"] and result["updated"]:
            result_string += "\nOperatie realizata!\n"
        else:
            result_string += "\nOperatie esuata!\n"

        result_string += "------------------\n"
        print(result_string)
        self.show_all_authors()
