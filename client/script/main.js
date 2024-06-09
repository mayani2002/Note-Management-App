function main() {

    const mainPage = `
 <nav class="navbar">
        <div>
            <a id="openForm" href="#">+ New note</a>
        </div>
        <button class="logout">Logout</a>
    </nav>
    <form id="addNoteform">
        <label for="noteName">Note Name:</label>
        <input type="text" id="noteName" name="noteName"><br><br>

        <label for="noteDescription">Note Description:</label><br>
        <textarea id="noteDescription" name="noteDescription" rows="4" cols="50"></textarea><br><br>
        <div id="closeAddNodeForm" style="position: absolute; top: 10px; right: 10px; padding: 10px; cursor: pointer;">x
        </div>

        <label for="noteTag">Note Tag:</label>
        <input type="text" id="noteTag" name="noteTag"><br><br>

        <input type="submit" value="Submit">'
    </form>
    <div id="cardList">
        <!-- Cards will be dynamically added here -->
    </div>

`;
    $('body').append(mainPage);
    
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();

    } const user_id = getCookie("id");
    async function createNote(url = "http://localhost:3001/note/add", data) {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            body: JSON.stringify(data)
        });
        return response.json();
    }
    async function getAllNotes(url = `http://localhost:3001/note/getall/${user_id}`) {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            redirect: "follow",
        });
        return response.json();
    }
    getAllNotes(`http://localhost:3001/note/getall/${user_id}`).then(res => {
        console.log(res);
        var cardList = $('#cardList');
        var notes = res.notes;
        notes = notes.reverse();
        $.each(notes, function (index, note) {
            var cardHtml = `
                    <div class="card">
                        <h3 class="note-name">${note.title}</h3>
                        <p class="note-text">Note: ${note.content}</p>
                        <div class="note-tag-box">
                            <p class="note-tag">${note.tag}</p>
                        </div>
                        <p class="note-time"> ${new Date(note.createdAt).toLocaleString()}</p>
                    </div>
                `;
            cardList.append(cardHtml);
        });
    });

    function createCard(noteName, noteTag, timeOfCreation) {
        var card = '<div class="card">' +
            '<h3 class="note-name">' + noteName + '</h3>' +
            '<div class="note-tag-box">' +
            '<p>Note Tag: ' + noteTag + '</p>' +
            '</div>'
        '<p>Time of Creation: ' + timeOfCreation + '</p>' +
            '</div>';

        $('#cardList').append(card);
    }

    $('.logout').click(function () {
        // Delete the username cookie
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log(document.cookie);

        window.location.reload();
    });

    $('#openForm').click(function () {
        $('#addNoteform').show();
    });
    $("#closeAddNodeForm").click(function () {
        $('#addNoteform').hide();
    })
    $('#addNoteform').submit(function (event) {
        event.preventDefault();
        var data = {
            title: $('#noteName').val(),
            content: $('#noteDescription').val(),
            tag: $('#noteTag').val(),
            user_id: getCookie("id"),
            time_of_creation: new Date().toLocaleString()
        };
        console.log(data);
        if (data.note_name === "" || data.note_description === "" || data.note_tag === "") {
            alert("Please fill in all fields");
            return;
        }
        createNote(`http://localhost:3001/note/add`, data).then(res => {
            console.log(res);
            if (res.message === "success") {
                window.location.reload();
            } else {
                alert("Some error occured!")
            }
        });
    });


}