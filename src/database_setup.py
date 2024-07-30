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

    # Create matches table
    c.execute('''CREATE TABLE IF NOT EXISTS matches (
                    id INTEGER PRIMARY KEY,
                    match_id INTEGER NOT NULL,
                    scouter1 INTEGER,
                    scouter2 INTEGER,
                    scouter3 INTEGER,
                    scouter4 INTEGER,
                    scouter5 INTEGER,
                    scouter6 INTEGER)''')

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

    for match in matches:
        if 'qm' in match['comp_level']:  # Only consider qualification matches
            scouters = random.sample(normal_scout_ids, 6)
            c.execute(
                'INSERT INTO matches (match_id, scouter1, scouter2, scouter3, scouter4, scouter5, scouter6) VALUES (?, ?, ?, ?, ?, ?, ?)',
                (match['match_number'], *scouters))

    conn.commit()
    conn.close()


if __name__ == '__main__':
    setup_database()
