var gift = require('gift');
var _ = require('lodash');
var Client = require('node-rest-client').Client;
var async = require('async');

var developerName = 'bend';

var repos = [
    {
        name: 'bolt',
        path: '/Users/bend/Documents/Analoc/bolt'
    },
    {
        name: 'Lilu',
        path: '/Users/bend/Documents/Analoc/AnalocMobileApp'
    }
];

_.each(repos, function (repo) {
    var repoDir = require('../vendor/simple-git')(repo.path);
    var repoDir2 = gift(repo.path);
    var status, branchName, lastCommit, lastCommitId;
    async.waterfall([
        function(cb) {
            repoDir.status(function (err, _status) {
                status = JSON.stringify(_status);
                cb();
            });
        },
        function(cb) {
            repoDir2.branch(function (err, b) {
                branchName = b.name;
                lastCommit = b.commit.message;
                lastCommitId = b.commit.id;
                cb();

            });
        },
        function(cb) {
            submitStatus(branchName, repo.name, lastCommit, lastCommitId, status);
        }
    ], function(err) {

    });





});

function submitStatus(branchName, repo, lastCommit, lastCommitId, status) {
    // set content-type header and data as json in args parameter
    var args = {
        data: {
            devName: developerName,
            branchName: branchName,
            repo: repo,
            lastCommit: lastCommit,
            lastCommitId: lastCommitId,
            status: status
        },
        headers:{"Content-Type": "application/json"}
    };
    var client = new Client();

    client.post("http://test.analoc.com:81/status/update", args, function(data,response) {
        console.log(response.statusCode);
    });
}

