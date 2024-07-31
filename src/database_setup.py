import sqlite3
import random
import requests

TBA_API_KEY = 'DGOg0BIAQjm8EO3EkO50txFeLxpklBtotoW9qnHxUzoeecJIlRzOz8CsgNjZ4fyO'
EVENT_KEY = '2024isde2'


def generate_user_id():
    return random.randint(100000, 999999)


def setup_database():
    conn = sqlite3.connect('frc_scouting.db')
    c = conn.cursor()

    # Create users table
    c.execute('''CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    username TEXT NOT NULL,
                    password TEXT NOT NULL,
                    role TEXT NOT NULL)''')

    # Create matches table with team numbers
    c.execute('''CREATE TABLE IF NOT EXISTS matches (
                    id INTEGER PRIMARY KEY,
                    match_id INTEGER NOT NULL,
                    scouter1 INTEGER,
                    team1 INTEGER,
                    scouter2 INTEGER,
                    team2 INTEGER,
                    scouter3 INTEGER,
                    team3 INTEGER,
                    scouter4 INTEGER,
                    team4 INTEGER,
                    scouter5 INTEGER,
                    team5 INTEGER,
                    scouter6 INTEGER,
                    team6 INTEGER)''')

    # Insert sample users
    users = [
        (generate_user_id(), 'admin1', 'password123', 'ADMIN'),
        (generate_user_id(), 'superscout1', 'password123', 'Super Scouter'),
        (generate_user_id(), 'pitscout1', 'password123', 'Pit Scouter'),
    ]

    for i in range(1, 13):
        users.append((generate_user_id(), f'normalscout{i}', 'password123', 'Normal Scouter'))

    c.executemany('INSERT INTO users (user_id, username, password, role) VALUES (?, ?, ?, ?)', users)

    # Fetch matches data from TBA and insert into the matches table
    headers = {'X-TBA-Auth-Key': TBA_API_KEY}
    response = requests.get(f'https://www.thebluealliance.com/api/v3/event/{EVENT_KEY}/matches', headers=headers)
    matches = response.json()

    normal_scout_ids = [user[0] for user in users if user[3] == 'Normal Scouter']

    # Filter and sort qualification matches by match number
    qualification_matches = [match for match in matches if match['comp_level'] == 'qm']
    qualification_matches.sort(key=lambda x: x['match_number'])

    for match in qualification_matches[:60]:  # Limit to the first 60 matches
        scouters = random.sample(normal_scout_ids, 6)
        teams = [int(team_key[3:]) for team_key in match['alliances']['red']['team_keys']] + \
                [int(team_key[3:]) for team_key in match['alliances']['blue']['team_keys']]
        if len(teams) == 6:  # Ensure there are exactly 6 teams
            c.execute(
                'INSERT INTO matches (match_id, scouter1, team1, scouter2, team2, scouter3, team3, scouter4, team4, scouter5, team5, scouter6, team6) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                (match['match_number'], scouters[0], teams[0], scouters[1], teams[1], scouters[2], teams[2], scouters[3], teams[3], scouters[4], teams[4], scouters[5], teams[5]))

    conn.commit()
    conn.close()


if __name__ == '__main__':
    setup_database()
