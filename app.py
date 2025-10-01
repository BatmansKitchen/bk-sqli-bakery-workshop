import json
from flask import Flask, render_template, request
import os
import sqlite3
from dotenv import dotenv_values

# Init Flask app
app = Flask(__name__, template_folder='templates', static_folder='static')

# NOT PART OF SQL CHALLENGES, YOU CAN IGNORE THIS
config = dotenv_values('.env')

# Change directory if in PythonAnywhere hosting
if not os.getcwd().endswith("BKSQLIChallenge"):
    try:
        os.chdir("BKSQLIChallenge")
    except:
        None

conn1 = sqlite3.connect('databases/challenge1.db', check_same_thread=False)
conn2 = sqlite3.connect('databases/challenge2.db', check_same_thread=False)
conn3 = sqlite3.connect('databases/challenge3.db', check_same_thread=False)
conn4 = sqlite3.connect('databases/challenge4.db', check_same_thread=False)
conn5 = sqlite3.connect('databases/challenge5.db', check_same_thread=False)

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/challenge1", methods = ['POST'])
def challenge1():
    search = request.form["search"]

    try:
        results = conn1.cursor().execute(
            "SELECT * FROM patients WHERE bread_name='" + search + "'"
        ).fetchall()
        return json.dumps(results)
    except sqlite3.Error as err:
        return json.dumps([['error:', str(err)]])

def has_numbers(s):
    return any(char.isdigit() for char in s)

@app.route("/challenge2", methods=["POST"])
def challenge2():
    query = request.form["search"]

    # I heard blacklists are secure...
    if ('or' in query) or ('OR' in query) or ('=' in query) or has_numbers(query):
        return json.dumps([["Hack detected!", "No flag for you..."]])

    try:
        results = conn2.cursor().execute(
            f"SELECT * FROM patients WHERE bread_name='{query}'"
        ).fetchall()
        return json.dumps(results)
    except sqlite3.Error as err:
        return json.dumps([['error:', str(err)]])

# daniel is cracked chall
@app.route("/challenge5", methods=["POST"])
def challenge3():
    query = request.form["search"]

    # TODO: block string concatenation
    if ('union' in query.lower()) or ('select' in query.lower()) or ('or' in query.lower()) or ('and' in query.lower()) or ('not' in query.lower()) or ('=' in query) or has_numbers(query):
        return json.dumps([["Hack detected!", "No flag for you..."]])

    try:
        results = conn5.cursor().execute(
            f"SELECT * FROM patients WHERE bread_name='{query}'"
        ).fetchall()
        return json.dumps(results)
    except sqlite3.Error as err:
        return json.dumps([['error:', str(err)]])

@app.route("/challenge3", methods=["POST"])
def challenge4():
    query = request.form["search"]

    try:
        results = conn3.cursor().execute(
            f"SELECT * FROM patients WHERE c1='{query}'"
        ).fetchall()
        return json.dumps(results)
    except sqlite3.Error as err:
        return (json.dumps([['error:',str(err)]]))

@app.route("/challenge4", methods=["POST"])
def challenge5():
    query = request.form["search"]

    # Wait.. what if I just don't show you output anymore :D 
    # The bakery is closed you can't hack me anymore.

    try:
        stmt = f"SELECT * FROM patients WHERE bread_name LIKE '{query}'"
        print(stmt)
        results = conn4.cursor().execute(
            stmt
        ).fetchall()

        # I found this cool random function that gives you garbage output!
        # If I ask it for a lot of bytes it takes some time though
        # I wonder if that's a problem somehow..
        # fake_results = conn5.cursor().execute(
        #     f"SELECT randomblob(10)"
        # ).fetchall()
        
        output = [('no output for you!',)]

        return json.dumps(output)
    except sqlite3.Error as err:
        return (json.dumps([['error:',str(err)]]))

@app.route("/submit", methods=["GET"])
def submit():
    flag = request.args.get('flag')
    if flag is None or len(flag) == 0:
        return json.dumps(False)
    for key in config:
        value = config[key]
        if flag == value:
            return json.dumps(key)
    return json.dumps(False)

if __name__ == '__main__':
    app.run(debug=False)
