// Retreive data from the database
function getData() {
    //var select ='SELECT * FROM notes ';
    //var courseName = coursename.concat(' ');
    //var ordering = 'ORDER BY rating DESC';
    var queryResult = db.Execute('SELECT * FROM notes ORDER BY rating DESC');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

function getDataCourse(coursename) {
    //var select ='SELECT * FROM notes Where courseName =';
    //var courseName = coursename.concat(' ');
    //var ordering = 'ORDER BY rating DESC';
    var queryResult = db.Execute('SELECT * FROM notes WHERE courseName='+coursename+' ORDER BY rating DESC');
    var rows = JSON.parse(queryResult);
    if (rows.length > 0 && typeof rows[0].Error != 'undefined') {
        return '{"status":"noTable"}';
    }
    return queryResult;
}

// this creates the table for the notes
function createTable() {
    var result = {};

    var queryResult = db.Execute('SELECT TOP 1 * FROM sampleTable');
    var row = JSON.parse(queryResult);

    if (row.length > 0 && typeof row[0].Error != 'undefined') {
        db.Execute('CREATE TABLE notes(id INTEGER PRIMARY KEY IDENTITY(1,1), name nvarchar(50), rating int, dateTaken date, dateUploaded date, courseName nvarchar(50), uploader nvarchar(50), fileType nvarchar(50));');
        result = '{"status":"tableCreated"}';
    } else
        result = '{"status":"tableExist"}';

    return JSON.stringify(result);
}

// this inserts sample data for the notes
function insert() {
    if (args.Get("value").length > 50)
        return '{"result":"error"}';
    else {
        db.Execute('INSERT INTO notes VALUES(test1, 12, June 30, 1991,June 30, 1991,CS245,@currentUser,pdf)');
        return getData();
    }
}
