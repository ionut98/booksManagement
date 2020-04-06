import requests


class AuthorsService:

    def __init__(self, url):
        self.__url = url

    def add_author(self, new_author):
        data = {
            "FirstName": new_author.first_name,
            "LastName": new_author.last_name
        }
        print(data)
        response = requests.post(
            self.__url + 'add', json=data)
        return response.json()

    def delete_author(self, author_id):
        data = {
            "id": author_id,
        }
        print(data)
        response = requests.delete(
            self.__url + 'delete', json=data)
        return response.json()

    def update_author(self, author_id, author):
        data = {
            "id": author_id,
            "FirstName": author.first_name,
            "LastName": author.last_name,
        }
        print(data)
        response = requests.put(
            self.__url + 'update', json=data)
        return response.json()

    def get_authors(self, keyword):
        response = requests.get(
            self.__url + 'filter-by-name?keyword={keyword}'.format(keyword=keyword))
        parsed_response = response.json()
        authors = parsed_response["authors"]

        authors_string = "\nID   Prenume   Nume\n"
        authors_string += "------------------\n"
        for author in authors:
            authors_string += "[" + str(author["id"]) + "] " + author["FirstName"] + " " + author["LastName"] + "\n"
        authors_string += "------------------\n"

        return authors_string
