# Lonedb #

## Introduction ##
This is a simple database management library that is built ontop of localStorage with similar syntax **BSON** syntax.
I was motivated with the need to store database collections on localStorage and also be able to perform a couple of operations like: 
- Find
- Insert
- Update
- Delete

Later in the future I hope to add more functionalities to this project, things like **Aggregation** and integrating awesome features like **RxJs**.

On instanciation of the class **Collection** a new **Collection** is created with the provided name if the collection doesn't exist already, else it will fetch the stored data and keep it ready for manipulation.

## ##
## ##

## Features ##
<details>
    <summary>Query</summary>
    <span>This is a bson containing the parameters to be used to search through the collection</span>
</details>
<details>
    <summary>Document (Doc)</summary>
    <span>This is a bson containing the data to be stored or updated</span>
    <span>This is a single data point(Like row in relational database)</span>
</details>
<details>
    <summary>Collection</summary>
    <span>This a group of documents(Like the Table in relational database)</span>
</details>
## ##
## ##

## Functions ##
<details>
    <summary>Find</summary>
    <span>
        <p>Call find(query: [])</p>
        <p>Returns a list of documents that matches the query</p>
    </span>
</details>
<details>
    <summary>FindOne</summary>
    <span>
        <p>Call findOne(query: any)</p>
        <p>Returns either undefined or the first document that matches the query</p>
    </span>
</details>
<details>
    <summary>Insert</summary>
    <span>
        <p>Call insert(doc: [])</p>
        <p>Returns the saved list documents, with the _id</p>
    </span>
</details>
<details>
    <summary>InsertOne</summary>
    <span>
        <p>Call insertOne(doc: any)</p>
        <p>Returns the saved document, with the _id</p>
    </span>
</details>
<details>
    <summary>Update</summary>
    <span>
        <p>Call update(query: any, doc: any)</p>
        <p>Update all documents that matches the query</p>
        <p>Returns the status of the operation and the number of affected documents</p>
    </span>
</details>
<details>
    <summary>UpdateOne</summary>
    <span>
        <p>Call updateOne(query: any, doc: any)</p>
        <p>Update the first document that match the query</p>
        <p>Returns the status of the operation and the number of affected documents which is 1</p>
    </span>
</details>
<details>
    <summary>Delete</summary>
    <span>
        <p>Call delete(query: any)</p>
        <p>Delete all documents that matches the query</p>
        <p>Returns the status of the operation and the number of affected documents</p>
    </span>
</details>
<details>
    <summary>DeleteOne</summary>
    <span>
        <p>Call deleteOne(doc: any)</p>
        <p>Delete the first document that match the query</p>
        <p>Returns the status of the operation and the number of affected documents which is 1</p>
    </span>
</details>
<details>
    <summary>Drop</summary>
    <span>
        <p>Call drop(name: string)</p>
        <p>Delete the entire collection</p>
    </span>
</details>