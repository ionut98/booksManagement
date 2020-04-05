from services.BooksService import BooksService
from services.AuthorsService import AuthorsService


class Console:
    authors_service = AuthorsService("http://localhost:30401/authors/")
    books_service = BooksService("http://localhost:30401/books/")

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
                print("Optiune invalida!")
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
                print("Optiune invalida, alegeti dintre cele doua!")

    def show_books_options(self):
        books_options = {
            'afiseaza': self.show_all_books,
            'add': self.add_books,
            'update': self.update_books,
            'delete': self.delete_books,
            'filter': self.filter_books
        }
        while True:
            print("-->Afiseaza\n-->Adauga\n-->Modifica\n-->Sterge\n-->Filtreaza\n-->Revenire\n")
            books_option = input("Optiunea dumneavoastra este: ")

            if books_option == "revenire":
                break
            elif books_option.lower() in books_options:
                books_options[books_option.lower()]()
            else:
                print("Optiune invalida, alegeti dintre cele doua!")

    def show_all_authors(self):
        print(self.authors_service.get_authors(""))

    def show_all_books(self):
        print(self.books_service.get_books(""))

    def add_books(self):
        pass

    def update_books(self):
        pass

    def delete_books(self):
        pass

    def filter_books(self):
        pass

    def add_authors(self):
        pass

    def update_authors(self):
        pass

    def delete_authors(self):
        pass

    def filter_authors(self):
        pass
