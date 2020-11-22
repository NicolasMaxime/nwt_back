use components

db.getCollection('users').insertMany([
    {
        "login" : "Maxime",
        "password" : "11b754da0e1156e4d49fef25a10e3bf6262bbe1229df223f",
        "salt" : "OM9qBDw5YXzSqnKSWWuFBtQ4HMtXbQ42",
        "firstname": "maxime",
        "lastname": "nicolas",
        "email": "maxime1.nicolas@gmail.com"
    },
    {
        "login" : "test",
        "password" : "e82b14049558c1b3a1fdf2d2b0f8c7137be4eb7ec777a13a",
        "salt" : "ZoeVpdfBmg5nWnHa2OF6sAt8FBU894ey",
        "firstname": "Robin",
        "lastname": "Bois",
        "email": "robinD.bois@gmail.com"
    }
])
