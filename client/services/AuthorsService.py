import requests


class AuthorsService:

    def __init__(self, url):
        self.__url = url

    def add_author(self, new_author):
        data = {
            "FirstName": new_author.first_name,
            "LastName": new_author.last_name
        }
        response = requests.post(
            self.__url + 'add', json=data)

        parsed_response = response.json()

        result_string = "\n------------------"

        if parsed_response["success"]:
            result_string += "\nOperatie realizata!\n"

        else:
            result_string += "\nOperatie esuata!\n"

        result_string += "------------------\n"
        return result_string

    def delete_author(self, author_id):
        data = {
            "id": author_id,
        }
        response = requests.delete(
            self.__url + 'delete', json=data)

        parsed_response = response.json()

        result_string = "\n------------------"

        if parsed_response["success"] and parsed_response["deleted"]:
            result_string += "\nOperatie realizata!\n"

        elif parsed_response["success"] and parsed_response["deleted"] is False:
            result_string += "\nNimic de sters!\n"

        else:
            result_string += "\nOperatie esuata!\n"

        result_string += "------------------\n"
        return result_string

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

        if len(authors) == 0:
            authors_string += "Fara rezultate \n"

        for author in authors:
            authors_string += "[" + str(author["id"]) + "] " + author["FirstName"] + " " + author["LastName"] + "\n"
        authors_string += "------------------\n"

        return authors_string
