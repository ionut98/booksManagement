class Author:

    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    @property
    def first_name(self):
        return self.__first_name

    @property
    def last_name(self):
        return self.__last_name

    @first_name.setter
    def first_name(self, first_name):
        self.__first_name = first_name

    @last_name.setter
    def last_name(self, last_name):
        self.__last_name = last_name

    def __repr__(self):
        return "{" + "firstName:{firstName}, lastName:{lastName}".format(firstName=self.first_name,
                                                                         lastName=self.last_name) + "}"
