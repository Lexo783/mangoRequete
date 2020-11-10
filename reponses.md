# Reponses Groupe 3

## Florent Debuchy, Houssam Laghzil, Maxence Lavenu

### Question 1

Combien y a-t-il d’utilisateurs dans la base de données ?
```
db.users.count()
```

### Question 2

Combien y a-t-il de films dans la base de données ?
```
db.movies.count()
```

### Question 3

Quelle est l’occupation de Clifford Johnathan ? *Ecrivez une requêtes dont la réponse affiche uniquement son nom et son occupation.*
```
db.users.find(
    {name: 'Clifford Johnathan' },
    {name: 1, occupation: 1 }
    )
```

### Question 4

Combien d’utilisateurs ont entre 18 et 30 ans (inclus) ?
```
db.users.find({ age: {$gte: 18, $lte: 30}}).count()
```

### Question 5

(optionnelle) Combien d’utilisateurs sont artistes (artist) ou scientifiques (scientist) ?
```
db.users.count({occupation: {$in: ["artist", "scientist"]}})
```

### Question 6

Quelles sont les dix femmes auteurs (writer) les plus âgées ?
```
db.users.find({occupation: "writer", gender: "F"},{"name": 1,"gender": 1, "age" : 1}).sort({ age : -1}).limit(10)
```

### Question 7

Quelles sont toutes les occupations présentes dans la base de données ?
```
db.users.distinct('occupation')
```

### Question 11
Pour tous les utilisateurs qui ont pour occupation "programmer", changer cette occupation en "developer".
```
db.users.updateMany({occupation: programmer}, {$set: {occupation: developper}})
```

### Question 12
Combien de films sont sortis dans les années quatre-vingt? (l’année de sortie est indiquée entre parenthèses à la fin du titre de chaque film)
```
db.movies.find({title: {$regex: /(198[0-9])/}})
```

### Question 13
Combien y a-t-il de films d’horreur?
```
db.movies.find({genres: {$regex: /horror/i}})
```
### Question 14
Combien de films sont sortis entre 1984 et 1992?
```
db.movies.find({ $or: [ { title: { $regex: /(198[4-9])/i } }, { title: { $regex: /(199[0-2])/i } } ] }).count();
```
### Question 15
Combien de films ont pour type à la fois "Musical" et "Romance"?
```
db.movies.find({ $and: [ { genres: { $regex: /Musical/i } }, { genres: { $regex: /Romance/i } } ] }).count()
```

### Question 16

Modifier la collection movies en ajoutant à chaque film un champ year contenant l’année et en supprimant cette information du titre.
Ne nombreuses méthodes peuvent répondre à ce besoin ; privilégier au maximum les approches exploitant les fonctionnalités de MongoDB
(il est par exemple déconseillé, pour des raisons évidentes de performances, de demander l’intégralité des films à la base de données,
de les stocker dans une liste javascript, puis d’itérer sur cette liste pour calculer les nouvelles valeurs de champs et mettre à jour les éléments, toujours en javascript).
```
db.movies.find().forEach((myDoc)=>{
   db.movies.updateOne(myDoc,{$set:{year: parseInt(myDoc.title.split('(').pop().split(')')[0]),title: myDoc.title.split('(')[0].slice(0,-1)}})
   })
```
ou
```
db.movies.find().forEach((myDoc)=>{
    myDoc.year = parseInt(myDoc.title.substr(-5,4));
    myDoc.title = myDoc.title.substr(0,myDoc.title.length -7);
    db.movies.save(myDoc);
})
```

### Question 17

Modifier la collection movies en replaçant pour chaque film la valeur du champ genres par un tableau de chaines de caractères.
```
db.movies.find().forEach( (myDoc)=>{
    db.movies.updateOne(myDoc,{$set: {genres: myDoc.genres.split('|')}});
})
```

### Question 18

Modifier la collection users en remplaçant pour chaque utilisateur le champ timestamp par un nouveau champ date, de type Date.
Le champ timestamp est exprimé en secondes depuis l’epoch Unix, c’est-à-dire le 1er janvier 1970.
En javascript, les instances de Date sont crées en utilisant le nombre de millisecondes depuis l’epoch Unix.
```
db.users.find().forEach((myDoc) => {
    newMovies = []
    myDoc.movies.forEach((movie) => {
        newMovies.push({movieid: movie.movieid, rating: movie.rating, Date: new Date(movie.timestamp * 1000)})
    })
    db.users.updateOne(myDoc, {$set: {movies: newMovies}})
})
```
ou 
```
db.users.find().forEach((user) => {
       user.movies.forEach(rating => {
           rating.date = new Date(rating.timestamp*1000);
       })
       db.users.save(user);
   })
```
ou
```
db.users.updateMany({},{$mul: {'movies.$[].timestamp': 1000}})
```

### Question 19
Combien d’utilisateurs ont noté le film qui a pour id 1196 (Star Wars: Episode V - The Empire Strikes Back (1980)) ?
```
db.users.find({'movies.movieId' : 1196}).count()
```

### Question 20

Combien d’utilisateurs ont noté tous les films de la première trilogie Star Wars (id 260, 1196, 1210) ?
```
db.users.find({'movies.movieId' : {$all: [260, 1196, 1210] }}).count()
```

### Question 21
Combien d’utilisateurs ont notés exactement 48 films ?
```
db.users.find({'movies' : {$size: 48 }}).count()
```

### Question 22
Pour chaque utilisateur, créer un champ num_ratings qui indique le nombre de films qu’il a notés.
```
db.users.find().forEach((myDoc)=>{
db.users.updateOne(myDoc,{$set:{num_rating:myDoc.movies.length}})
})
```
ou
```
db.users.aggregate([
    {"$addFields": {"num_ratings": {$size: "$movies"}}},
    {$out: "users"}
])
```

### Question 23
Combien d’utilisateurs ont noté plus de 90 films ?
```
db.users.find({num_ratings: {$gte:90}}).count()
```

### Question 24
Question 24. (optionnelle) Combien de notes ont été soumises après le 1er janvier 2001 ?
```
let c = 0;
let deuxMilleUn = (new Date('2001-01-01'))
db.users.find().forEach((user) => {
    user.movies.forEach((mov) => {
        if(mov.date > deuxMilleUn){
            ++c
        }
    })
})
```
ou
```
db.users.aggregate([
    {$unwind: "$movies"},
    {$match: {'movies.date': {$gte: deuxMilleUn}}},
    {$count: 'totalCount'}
])
```

### Question 25
Quels sont les trois derniers films notés par Jayson Brad ?
```

```