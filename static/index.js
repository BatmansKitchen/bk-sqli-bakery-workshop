'use strict';

(function() {
  window.addEventListener('load', init);

  let challenge = "1";

  const descriptions = {
    '1': `Today we are robbing the Batman's Kitchen bakery. <br>
    Your goal is to find the secret Gluten-Free Bread recipe in this database.<br><br>
    Try typing in 'Whole Wheat Bread' to see what happens.<br>
    Everything else results in a blank result... or weird behavior if you input the right thing.<br>
    Let's get this bread!`,

    '2': `Oh no! The Batman's Kitchen bakery patched the vulnerability!<br>
    They implemented a filter that seems to block certain queries...<br><br>
    Your next goal is to bypass this filter, and find the new secret bread!<br>
    Let's get this bread!<br>`,

    '3': `Great job! After your exploits, the Batman's Kitchen bakery hired some new security folks.<br>
    They strengthened their filter, and made it much more restrictive...<br><br>
    They claim it's not bypassable, but we all know that's not true.<br>
    Can you defeat this filter?<br>`,

    '4': `<img src="static/img/challenge_4.png" />`,

    '5': `Wow. Four hacks in a row. The Batman's Kitchen bakery has decided to stop giving you output.<br> Please go hack another website now. It's over.<br>`,
  }

  function updateTitleAndDesc(event) {
    if (event !== undefined && event !== null) {
      event.preventDefault();
    }

    challenge = document.getElementById("challenge").value;

    // Change values for Challenge Title and Description
    document.getElementById("challengetitle").textContent = "Challenge " + challenge;
    document.getElementById('challengedesc').innerHTML = descriptions[challenge];
  }

  function init() {
    localStorage.setItem(
      'score',
      JSON.stringify({
        'Challenge_1': false,
        'Challenge_2': false,
        'Challenge_3': false,
        'Challenge_4': false,
        'Challenge_5': false,
      })
    );

    updateTitleAndDesc();
    document.getElementById("challenge").addEventListener("change", updateTitleAndDesc);

    document.getElementById("search_form").addEventListener("submit", function(event) {
      event.preventDefault();

      let search = document.getElementById('search').value;

      switch (challenge) {
        case ("1"):
          challenge1(search);
          break;
        case ("2"):
          challenge2(search);
          break;
        case ("3"):
          challenge3(search);
          break;
        case ("4"):
          challenge4(search);
          break;
        case ("5"):
          challenge5(search);
          break;
        default:
          break;
      }

    });

    document.getElementById('flagForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const flag = document.getElementById('submitFlag').value;
      fetch('/submit?flag=' + flag)
        .then(x => x.json())
        .then(result => {
          if (result !== false) {
            let currentScore = JSON.parse(localStorage.getItem('score'));
            currentScore[result] = true;
            localStorage.setItem('score', JSON.stringify(currentScore));
            alert('Correct!');
          } else {
            alert('Incorrect!');
          }
        });
    });

    document.getElementById('checkProgress').onclick = (event) => {
      event.preventDefault();
      let currentScore = JSON.parse(localStorage.getItem('score'));
      let display = '';
      for (const level in currentScore) {
        display += `${level.replace('_', ' ')}: ${currentScore[level] ? 'Solved' : 'Not Solved'}\n`;
      }
      alert(display);
    };
  }


  async function challenge1(search) {
    let params = new FormData();
    params.append("search", search);

    fetch("/challenge1", {method: "POST", body: params})
      .then(statusCheck)
      .then(resp => resp.text())
      .then(function(resp) {
        console.log(resp);
        if (document.getElementById("output_field").childNodes.length > 0) {
          document.getElementById("output_field").innerHTML = "";
        }

        document.getElementById('output_field').appendChild(tableCreator(resp));
      })
      .catch(resp => document.getElementById("output_field").textContent = resp);
  }


  async function challenge2(search) {
    let params = new FormData();
    params.append("search", search);

    fetch('/challenge2', {method: 'POST', body:params})
      .then(statusCheck)
      .then(resp => resp.text())
      .then(resp => {
        console.log(resp);
        if (document.getElementById('output_field').childNodes.length > 0) {
          document.getElementById('output_field').innerHTML = '';
        }
        document.getElementById('output_field').appendChild(tableCreator(resp));
      })
      .catch(resp => { document.getElementById('output_field').textContent = resp; })
  }

  async function challenge3(search) {
    let params = new FormData();
    params.append("search", search);

    fetch('/challenge3', {method: 'POST', body:params})
      .then(statusCheck)
      .then(resp => resp.text())
      .then(resp => {
        console.log(resp);
        if (document.getElementById('output_field').childNodes.length > 0) {
          document.getElementById('output_field').innerHTML = '';
        }
        document.getElementById('output_field').appendChild(tableCreator(resp));
      })
      .catch(resp => { document.getElementById('output_field').textContent = resp; })
  }

  async function challenge4(search) {
    let params = new FormData();
    params.append("search", search);

    fetch('/challenge4', {method: 'POST', body:params})
      .then(statusCheck)
      .then(resp => resp.text())
      .then(resp => {
        console.log(resp);
        if (document.getElementById('output_field').childNodes.length > 0) {
          document.getElementById('output_field').innerHTML = '';
        }
        document.getElementById('output_field').appendChild(tableCreator(resp));
      })
      .catch(resp => { document.getElementById('output_field').textContent = resp; })
  }

  async function challenge5(search) {
    let params = new FormData();
    params.append("search", search);

    fetch('/challenge5', {method: 'POST', body:params})
      .then(statusCheck)
      .then(resp => resp.text())
      .then(resp => {
        console.log(resp);
        if (document.getElementById('output_field').childNodes.length > 0) {
          document.getElementById('output_field').innerHTML = '';
        }
        document.getElementById('output_field').appendChild(tableCreator(resp));
      })
      .catch(resp => { document.getElementById('output_field').textContent = resp; })
  }

  let tableCreator = (function(resp) {
    let table = document.createElement("table");

    table.setAttribute("id", "sql_table");

    let result = JSON.parse(resp);

    for (let i = 0; i < result.length; i++) {
      let row = document.createElement("tr");

      for (let j = 0; j < result[i].length; j++) {
        let cell = document.createElement("td");
        cell.textContent = result[i][j];
        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    if (result.length === 0) {
      table.innerHTML = "";
    }

    return table;
  });


  async function statusCheck(resp) {
    if (!resp.ok) {
      throw new Error(await resp.text());
    }
    return resp;
  }
})();