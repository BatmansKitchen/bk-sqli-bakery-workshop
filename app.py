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

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/challenge1", methods = ['POST'])
def challenge1():
    search = request.form["search"]

    results = conn1.cursor().execute(
        "SELECT * FROM challenge WHERE search='" + search + "'"
    ).fetchall()

    return json.dumps(results)

if __name__ == '__main__':
    app.run(debug=False)
