import requests

response = requests.get('https://ajax.test-danit.com/api/swapi/films')
films = response.json()

for film in films:
    title = film['name']
    episode_id = film['episodeId']
    director = film['director']
    producer = film['producer']
    release_date = film['releaseDate']
    characters = []
    for character_url in film['characters']:
        character_response = requests.get(character_url)
        character_data = character_response.json()
        characters.append(character_data['name'])

    print(f"Title: {title}")
    print(f"Episode ID: {episode_id}")
    print(f"Director: {director}")
    print(f"Producer: {producer}")
    print(f"Release Date: {release_date}")
    print("Characters:")
    for character in characters:
        print(character)
    print("-----------------------------------")
