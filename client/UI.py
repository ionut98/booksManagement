from services.BooksService import BooksService
from services.AuthorsService import AuthorsService

from models.Author import Author
from models.Book import Book


class Console:
    host = "192.168.0.220"
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
                print("Optiune invalida!\n")
            main_options[main_option.lower()]()

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
        print(self.authors_service.get_authors(""))

    def show_all_books(self):
        print(self.books_service.get_books(""))

    def filter_authors(self):
        keyword = input("\n Filtrati dupa nume: ")
        print(self.authors_service.get_authors(keyword))

    def filter_books(self):
        keyword = input("\n Filtrati dupa titlu: ")
        print(self.books_service.get_books(keyword))

    def delete_authors(self):
        print(self.authors_service.get_authors(""))
        idAuthor = input("Introduceti id-ul autorului de sters: ")
        print(self.authors_service.delete_author(idAuthor))
        print(self.authors_service.get_authors(""))

    def delete_books(self):
        print(self.books_service.get_books(""))
        ISBNBook = input("Introduceti ISBN-ul cartii de sters: ")
        print(self.books_service.delete_book(ISBNBook))
        print(self.books_service.get_books(""))

    def add_authors(self):
        print(self.authors_service.get_authors(""))
        authorFirstName = input("Introduceti prenumele autorului: ")
        authorLastName = input("Introduceti numele autorului: ")

        if len(authorLastName) == 0 or len(authorFirstName) == 0:
            print("\nNumele si prenumele trebuie sa fie nevide!\n")
            return

        print(self.authors_service.add_author(Author(authorFirstName, authorLastName)))
        print(self.authors_service.get_authors(""))

    def add_books(self):

        # data = {
        #             "book": {
        #                 "ISBN": new_book.isbn,
        #                 "Title": new_book.title,
        #                 "NrOfPages": new_book.nr_of_pages,
        #                 "Type": new_book.type,
        #                 "Description": new_book.description
        #             },
        #             "authors": new_book_authors_ids_list
        #         }
        print(self.authors_service.get_authors(""))
        bookISBN = input("Introduceti ISBN-ul cartii: ")
        bookTitle = input("Introduceti titlul cartii: ")
        bookNrOfPages = input("Introduceti nr de pagini al cartii: ")
        bookType = input("Introduceti tipul cartii: ")
        bookDescription = input("Introduceti descrierea cartii: ")
        bookAuthors = input("Introduceti id-urile autorilor cartii: ")

        if len(authorLastName) == 0 or len(authorFirstName) == 0:
            print("\nNumele si prenumele trebuie sa fie nevide!\n")
            return

        print(self.authors_service.add_author(Author(authorFirstName, authorLastName)))
        print(self.authors_service.get_authors(""))


    def update_books(self):
        pass

    def update_authors(self):
        pass
