class Book:

    def __init__(self, isbn, title, nr_of_pages, type, description):
        self.isbn = isbn
        self.title = title
        self.nr_of_pages = nr_of_pages
        self.type = type
        self.description = description

    @property
    def isbn(self):
        return self.__isbn

    @property
    def title(self):
        return self.__title

    @property
    def nr_of_pages(self):
        return self.__nr_of_pages

    @property
    def type(self):
        return self.__type

    @property
    def description(self):
        return self.__description

    @isbn.setter
    def isbn(self, isbn):
        self.__isbn = isbn

    @title.setter
    def title(self, title):
        self.__title = title

    @type.setter
    def type(self, type):
        self.__type = type

    @nr_of_pages.setter
    def nr_of_pages(self, nr_of_pages):
        self.__nr_of_pages = nr_of_pages

    @description.setter
    def description(self, description):
        self.__description = description

    def __repr__(self):
        return "{" + "isbn:{isbn}, title:{title}, nrOfPages:{nrOfPages}, type:{type}, description:{description}".format(
            isbn=self.isbn, title=self.title, type=self.type, nrOfPages=self.nr_of_pages,
            description=self.description) + "}"
