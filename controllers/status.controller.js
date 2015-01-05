var mysql = require('mysql');

function genericQuery(type, query, params, cb) {
    var connection = mysql.createConnection({
        host: 'test.analoc.com',
        user: 'root',
        password: 'test2trust',
        database: 'gitmirror'
    });
    connection.connect();
    switch (type) {
        case 'insert':
        {
           var query =  connection.query('INSERT INTO code_status SET ?', params, function (err, result) {
               cb(err);
            });
            break;
        }
        case 'noninsert':
        {
            var query =  connection.query(query, function (err, rows, fields) {
                if (err) throw err;
                cb(rows);
            });
        }
    }
    console.log(query.sql);

    connection.end();
}

exports.listStatus = function (req, res, next) {
    var query = 'select * from code_status';
    genericQuery('noninsert', query, null, function (retval) {
        res.send(retval);
    });
}

exports.updateStatus = function (req, res, next) {
    var params = {
        developer_name: req.body.devName,
        repository: req.body.repo,
        branch: req.body.branchName,
        status: req.body.status,
        last_commit: req.body.lastCommit,
        last_commit_id: req.body.lastCommitId
    };

    var query = 'delete from code_status where developer_name = "' + params.developer_name + '" AND repository = "' + params.repository+'"';
    genericQuery('noninsert', query, null, function() {
        genericQuery('insert', null, params,  function (err) {
            if (err)
                res.sendStatus(500);
            else res.sendStatus(200);
        });
    })


}