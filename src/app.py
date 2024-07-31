from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
import requests, random

app = Flask(__name__)
CORS(app)
TBA_API_KEY = 'DGOg0BIAQjm8EO3EkO50txFeLxpklBtotoW9qnHxUzoeecJIlRzOz8CsgNjZ4fyO'
EVENT_KEY = '2024isde2'

def generate_user_id():
    return random.randint(100000, 999999)

def query_db(query, args=(), one=False):
    con = sqlite3.connect('frc_scouting.db')
    cur = con.cursor()
    cur.execute(query, args)
    rv = cur.fetchall()
    con.close()
    return (rv[0] if rv else None) if one else rv


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    user = query_db('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], one=True)
    if user:
        return jsonify({'status': 'success', 'user': {'username': user[2], 'role': user[4], 'user_id': user[1]}})
    return jsonify({'status': 'failure', 'message': 'Invalid credentials'}), 401


@app.route('/matches', methods=['GET'])
def get_matches():
    conn = sqlite3.connect('frc_scouting.db')
    c = conn.cursor()
    c.execute('SELECT * FROM matches')
    matches = c.fetchall()
    conn.close()

    match_list = []
    for match in matches:
        match_list.append({
            'id': match[0],
            'match_id': match[1],
            'scouter1': match[2],
            'team1': match[3],
            'scouter2': match[4],
            'team2': match[5],
            'scouter3': match[6],
            'team3': match[7],
            'scouter4': match[8],
            'team4': match[9],
            'scouter5': match[10],
            'team5': match[11],
            'scouter6': match[12],
            'team6': match[13]
        })

    return jsonify({'status': 'success', 'matches': match_list})


@app.route('/assign_scouts', methods=['POST'])
def assign_scouts():
    data = request.json
    match_id = data['match_id']
    scouters = data['scouters']
    teams = data['teams']

    if len(scouters) != 6 or len(teams) != 6:
        return jsonify({'status': 'failure', 'message': 'Exactly 6 scouters and 6 teams are required'}), 400

    conn = sqlite3.connect('frc_scouting.db')
    c = conn.cursor()
    c.execute(
        'INSERT INTO matches (match_id, scouter1, team1, scouter2, team2, scouter3, team3, scouter4, team4, scouter5, team5, scouter6, team6) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        (match_id, scouters[0], teams[0], scouters[1], teams[1], scouters[2], teams[2], scouters[3], teams[3], scouters[4], teams[4], scouters[5], teams[5]))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'Scouters assigned successfully'})

@app.route('/matches_assignments', methods=['GET'])
def get_match_assignments():
    user_id = request.args.get('user_id')
    conn = sqlite3.connect('frc_scouting.db')
    c = conn.cursor()
    if user_id:
        c.execute(
            'SELECT * FROM matches WHERE scouter1 = ? OR scouter2 = ? OR scouter3 = ? OR scouter4 = ? OR scouter5 = ? OR scouter6 = ?',
            (user_id, user_id, user_id, user_id, user_id, user_id))
    else:
        c.execute('SELECT * FROM matches')
    matches = c.fetchall()
    conn.close()

    match_list = []
    for match in matches:
        scouter_index = [match[2], match[4], match[6], match[8], match[10], match[12]].index(int(user_id))
        team_number = match[3 + scouter_index * 2]
        match_list.append({
            'match_id': match[1],
            'scouter': user_id,
            'team_number': team_number,
            'alliance': 'Red' if scouter_index < 3 else 'Blue'
        })

    return jsonify({'status': 'success', 'matches': match_list})

@app.route('/manual_assign', methods=['POST'])
def manual_assign():
    data = request.json
    matches = data['matches']

    conn = sqlite3.connect('frc_scouting.db')
    c = conn.cursor()
    for match in matches:
        c.execute(
            'UPDATE matches SET scouter1 = ?, scouter2 = ?, scouter3 = ?, scouter4 = ?, scouter5 = ?, scouter6 = ? WHERE match_id = ?',
            (match['scouter1'], match['scouter2'], match['scouter3'], match['scouter4'], match['scouter5'], match['scouter6'], match['match_id']))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'Scouters updated successfully'})


@app.route('/user_matches', methods=['GET'])
def get_user_matches():
    user_id = request.args.get('user_id')
    conn = sqlite3.connect('frc_scouting.db')
    c = conn.cursor()
    c.execute(
        'SELECT * FROM matches WHERE scouter1 = ? OR scouter2 = ? OR scouter3 = ? OR scouter4 = ? OR scouter5 = ? OR scouter6 = ?',
        (user_id, user_id, user_id, user_id, user_id, user_id))
    matches = c.fetchall()
    conn.close()

    match_list = []
    for match in matches:
        alliance = 'Red' if user_id in (match[2], match[3], match[4]) else 'Blue'
        robot = match.index(user_id) - 1
        match_list.append({
            'match_id': match[1],
            'alliance': alliance,
            'robot': robot
        })

    return jsonify({'status': 'success', 'matches': match_list})


@app.route('/users', methods=['GET'])
def get_users():
    users = query_db('SELECT user_id, username, role FROM users')
    return jsonify({'status': 'success', 'users': [{'user_id': user[0], 'username': user[1], 'role': user[2]} for user in users]})


@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    user_id = generate_user_id()
    username = data['username']
    password = data['password']
    role = data['role']

    conn = sqlite3.connect('frc_scouting.db')
    c = conn.cursor()
    c.execute('INSERT INTO users (user_id, username, password, role) VALUES (?, ?, ?, ?)', (user_id, username, password, role))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'User added successfully'})


@app.route('/delete_user', methods=['POST'])
def delete_user():
    data = request.json
    user_id = data['user_id']

    conn = sqlite3.connect('frc_scouting.db')
    c = conn.cursor()
    c.execute('DELETE FROM users WHERE user_id = ?', (user_id,))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'User deleted successfully'})


@app.route('/update_user', methods=['POST'])
def update_user():
    data = request.json
    user_id = data['user_id']
    role = data['role']

    conn = sqlite3.connect('frc_scouting.db')
    c = conn.cursor()
    c.execute('UPDATE users SET role = ? WHERE user_id = ?', (role, user_id))
    conn.commit()
    conn.close()

    return jsonify({'status': 'success', 'message': 'User role updated successfully'})
if __name__ == '__main__':
    app.run(debug=True)
