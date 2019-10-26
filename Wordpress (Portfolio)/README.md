# Mini-WP (Para-Press)

## API Documentation

### List of Article Routes:

| Route        | HTTP   | Header(s) | Body                                                 | Description                             |
| ------------ | ------ | --------- | ---------------------------------------------------- | --------------------------------------- |
| /article     | GET    | `token`   | `none`                                               | Get All Articles From Logged User       |
| /article/:id | GET    | `token`   | `none`                                               | Get A Specific Article From Logged User |
| /article     | POST   | `token`   | title:String, content:String, featured_image: String | Create Article For Logged User          |
| /article/:id | PATCH  | `token`   | title:String, content:String, featured_image:String  | Update Article For Logged User          |
| /article/:id | DELETE | `token`   | `none`                                               | Delete Article For Logged User          |

### Get All Articles

| URL              | http://parapress-server.ricky-works.online/article           |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | GET                                                          |
| Params           | `none`                                                       |
| Headers          | `token: String`                                              |
| Data             | `none`                                                       |
| Success Response | `status:200`, Data: [<br />    {<br />        "_id": 1,<br />        "title": "My First Post",<br />        "content": "<p>Hello Guys!!!</p>",<br />        "author": "Ricky",<br />        "feature_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEQQQvymDvLDHtcKjoIR0NnqaXbxCpoFK4liAT3pksBHFF4gYa",<br />        "created_at": "Sat Oct 12 2019"<br />    }<br />] |
| Error Response   | `status:401`, Data : {<br />    "msg": "You Must Sign In First"<br />} |

### Get Specific Article

| URL              | http://parapress-server.ricky-works.online/article/:id       |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | GET                                                          |
| Params           | `id: String`                                                 |
| Headers          | `token: String`                                              |
| Data             | `none`                                                       |
| Success Response | `status:200`, Data: {<br />         "_id": 1, <br />        "title": "My First Post", <br />        "content": "<p>Hello Guys!!!</p>",<br />         "author": "Ricky",<br />         "feature_image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEQQQvymDvLDHtcKjoIR0NnqaXbxCpoFK4liAT3pksBHFF4gYa",<br />         "created_at": "Sat Oct 12 2019"<br />     } |
| Error Response   | `status:401`, Data : {<br />     "msg": "You Must Sign In First"<br /> } |
| Error Response 2 | `status404`, Data: {<br />    "msg": "Article Not Found"<br />} |

### Create New Article

| URL              | http://parapress-server.ricky-works.online/article           |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | POST                                                         |
| Params           | `none`                                                       |
| Headers          | `token: String`                                              |
| Data             | `title: String, content: String`                             |
| Success Response | `status:201`, Data: {<br />    "response": "Article Created Successfully"<br />} |
| Error Response   | `status:401`, Data : {<br />     "msg": "You Must Sign In First" <br />} |

### Update Specific Article

| URL              | http://parapress-server.ricky-works.online/article/:id       |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | PATCH                                                        |
| Params           | `id: String`                                                 |
| Headers          | `token: String`                                              |
| Data             | `title: String, content: String`                             |
| Success Response | `status:200`, Data: {<br />    "response": "Article Updated Successfully" <br />} |
| Error Response   | `status:401`, Data : {<br />    "msg": "You Must Sign In First"<br /> } |

### Delete Specific Article

| URL              | http://parapress-server.ricky-works.online/article/:id       |
| ---------------- | ------------------------------------------------------------ |
| HTTP (Method)    | DELETE                                                       |
| Params           | `id: String`                                                 |
| Headers          | `token: String`                                              |
| Data             | `none`                                                       |
| Success Response | `status:200`, Data: {<br />     "response": "Article Deleted Successfully"<br />} |
| Error Response   | `status:401`, Data : {<br />     "msg": "You Must Sign In First"<br />} |

### List Of User Routes:

| Route          | HTTP | Header(s) | Body                                                         | Description              |
| -------------- | ---- | --------- | ------------------------------------------------------------ | ------------------------ |
| /user/register | POST | `none`    | `username: String, email: String, password: String, profile_image: String` | Register New User        |
| /user/login    | POST | `none`    | `email: String, password:String`                             | Log In Old User          |
| /user/gsignin  | POST | `none`    | `token: String`                                              | Log In By Google Sign In |

### Register New User

| URL              | https://parapress-server.ricky-works.online/user/register    |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `username: string, email: String, password:string, profile_image: String` |
| Success Response | `status: 201` , Data: {<br />   "username": "Admin",<br />   "email": "admin@gmail.com"<br />   "password":"$2a$10$vT.0e3mTW3xqIJsdrR0QmedgHfCSsTOkFVDCmk392M6pl9B0l.QmO"<br />   "profile_image": "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"<br />} |
| Error Response   | `status:400` , Data: {<br />    "msg": "Incorrect Email / Password"<br />} |

### Login Old User

| URL              | https://parapress-server.ricky-works.online/user/login       |
| ---------------- | ------------------------------------------------------------ |
| Method           | `POST`                                                       |
| Params           | `none`                                                       |
| Headers          | `none`                                                       |
| Data             | `email: String, password:string`                             |
| Success Response | `status: 200` , Data: {<br />    "username": "Admin",<br />    "email": "[admin@gmail.com](mailto:admin@gmail.com)"<br />    "password":"$2a$10$vT.0e3mTW3xqIJsdrR0QmedgHfCSsTOkFVDCmk392M6pl9B0l.QmO"<br />   "profile_image": "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png" <br />} |
| Error Response   | `status:400` , Data: {<br />     "msg": "Incorrect Email / Password" <br />} |

### Google Sign In

| URL                | https://parapress-server.ricky-works.online/user/gsignin     |
| ------------------ | ------------------------------------------------------------ |
| Method             | `POST`                                                       |
| Params             | `none`                                                       |
| Headers            | `none`                                                       |
| Data               | `token: String`                                              |
| Success Response   | `status: 200` , Data: {<br />    "username": "Admin",<br />    "email": "[admin@gmail.com](mailto:admin@gmail.com)"<br />    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"<br />} |
| Success Response 2 | `status: 200` , Data: {<br />    "username": "Admin",<br />    "email": "[admin@gmail.com](mailto:admin@gmail.com)"<br />    "response":"User Not Found"<br />} |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ git clone https://github.com/AudrickOng/mini-wp.git
$ cd mini-wp
$ npm install
$ npm run dev
```

## Server Link

Access the website via http://parapress-server.ricky-works.online

## Client Link

Access the website via http://parapress.ricky-works.online
