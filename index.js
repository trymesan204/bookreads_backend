const express = require("express")
const app = express()
const config = require("./config")
const {port} = config
const cors = require("cors")

const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "BOOKS"
});
db.connect( (err) => {
    if (err) throw err;
    console.log("Database connection successful");
});

app.use(cors());

app.get("/db", (req, res) => {
    const sql = "CREATE DATABASE BOOKS;"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Database created");
    })
})

app.get("/table", (req, res) => {
    const sql = "CREATE TABLE book_list(id int AUTO_INCREMENT PRIMARY KEY, book_name VARCHAR(50), category VARCHAR(20), author VARCHAR(50), rating int);"
    db.query (sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Table created");
    })
})

app.get("/insert", (req, res) => {
    const sql = "INSERT INTO book_list (book_name, category, author, rating) VALUES ?";
    const values = [
        ["Steve Jobs", "Biography", "Walter Issacson", "4"],
        ["Sapiens", "Non Fiction", "Yuval Noah Harari", "3"],
        ["Titan", "Biography", "Ron Chernow", "4"],
        ["Thinking Fast and Slow", "Non Fiction", "Daniel Kahneman", "4"],
        ["1984", "Fiction", "George Orwell", "5"],
        ["Animal Farm", "Fiction", "George Orwell", "5"],
        ["The Trial", "Fiction", "Franz Kafka", "5"],
        ["Jiwan Kada ki Ful", "Autobiography", "Jhamak Ghimire", "3"]
    ];

    db.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        res.send("Values inserted");
    });
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM book_list;"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
});

app.get("/category", (req, res) => {
    const sql = "SELECT DISTINCT category FROM book_list;"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get("/author", (req, res) => {
    const sql = "SELECT DISTINCT author FROM book_list;"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get("/category/:type", (req, res) => {
    console.log(req.params.type);
    const sql = `SELECT * FROM book_list WHERE category='${req.params.type}';`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.get("/author/:name", (req, res) => {
    console.log(req.params.type);
    const sql = `SELECT * FROM book_list WHERE author='${req.params.name}';`
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    })
})

app.listen( port, () => {
    console.log(`Server running in port ${port}`)
});
