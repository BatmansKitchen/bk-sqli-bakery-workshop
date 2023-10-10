import json
from flask import Flask, render_template, request
import os
import sqlite3

# Init Flask app
app = Flask(__name__, template_folder='templates', static_folder='static')

# Change directory if in PythonAnywhere hosting
if not os.getcwd().endswith("BKSQLIChallenge"):
    try:
        os.chdir("BKSQLIChallenge")
    except:
        None


conn1 = sqlite3.connect('databases/challenge1.db', check_same_thread=False)
conn2 = sqlite3.connect('databases/challenge2.db', check_same_thread=False)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/challenge1", methods = ['POST'])
def challenge1():
    search = request.form["search"]

    results = conn1.cursor().execute(
        "SELECT * FROM challenge WHERE bread_name='" + search + "'"
    ).fetchall()
    return json.dumps(results)

def has_numbers(s):
    return any(char.isdigit() for char in s)

@app.route("/challenge2", methods=["POST"])
def challenge2():
    query = request.form["search"]

    # I heard blacklists are secure...
    if ('union' in query.lower()) or ('select' in query.lower()) or ('or' in query.lower()) or ('and' in query.lower()) or ('not' in query.lower()) or ('=' in query) or has_numbers(query):
        return json.dumps([["Hack detected!", "No flag for you..."]])

    results = conn2.cursor().execute(
        f"SELECT * FROM challenge WHERE bread_name='{query}'"
    ).fetchall()
    return json.dumps(results)

if __name__ == '__main__':
    app.run(debug=False)
