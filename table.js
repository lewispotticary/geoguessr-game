import { leaderboardArray } from "./firebase.js";

export function sortScore (){
    console.log(leaderboardArray);
    console.log(leaderboardArray[0].Name);

    var table = document.getElementById("table");
        //or use :  var table = document.all.tableid;

    for(var x = table.rows.length - 1; x > 0; x--)
    {
        table.deleteRow(x);
    }

    for (let i = 0; i < leaderboardArray.length; i++) {

        // Get a reference to the table
        var tableRef = document.getElementById("table");

        // Insert a row at the end of the table
        var newRow = tableRef.insertRow(-1);

        // Insert a cell in the row at index 0
        var rankCell = newRow.insertCell(0);
        var nameCell = newRow.insertCell(1);
        var scoreCell = newRow.insertCell(2);

        // Append a text node to the cell
        var rankText = document.createTextNode(i + 1);
        rankCell.appendChild(rankText);
        var nameText = document.createTextNode(leaderboardArray[i].Name);
        nameCell.appendChild(nameText);
        var scoreText = document.createTextNode(leaderboardArray[i].highScore);
        scoreCell.appendChild(scoreText);
        
    }
}

//Create new array. Push only name and score. Then sort. 