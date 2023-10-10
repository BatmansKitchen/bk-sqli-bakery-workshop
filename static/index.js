'use strict';

(function() {
  window.addEventListener('load', init);

  let challenge = "1";

  function init() {
    document.getElementById("challenge").addEventListener("change", function(event) {
      event.preventDefault();

      challenge = document.getElementById("challenge").value;

      // Change values for Challenge Title and Description
      document.getElementById("challengetitle").textContent = "Challenge " + challenge;

    });

    document.getElementById("search_form").addEventListener("submit", function(event) {
      event.preventDefault();

      search = document.getElementById('search').value;

      switch (challenge) {
        case ("1"):
          challenge1(search);

        case ("2"):
          challenge2(search);

        case ("3"):
          challenge3(search);

        case ("4"):
          challenge4(search);

        case ("5"):
          challenge5(search);
      }

    });
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


  }

  async function challenge3(search) {
    let params = new FormData();
    params.append("search", search);


  }

  async function challenge4(search) {
    let params = new FormData();
    params.append("search", search);


  }

  async function challenge5(search) {
    let params = new FormData();
    params.append("search", search);


  }


  let tableCreator = (function(resp) {
    let table = document.createElement("table");

    table.setAttribute("id", "sql_table");
    let header = document.createElement("tr");

    let header0 = document.createElement("td");
    header0.textContent = "Search";
    let header1 = document.createElement("td");
    header1.textContent = "Answer";

    header.appendChild(header0);

    header.appendChild(header1);

    table.appendChild(header);

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