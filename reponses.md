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



### Question 16
Modifier la collection movies en ajoutant à chaque film un champ year contenant l’année et en supprimant cette information du titre.
Ne nombreuses méthodes peuvent répondre à ce besoin ; privilégier au maximum les approches exploitant les fonctionnalités de MongoDB
(il est par exemple déconseillé, pour des raisons évidentes de performances, de demander l’intégralité des films à la base de données,
de les stocker dans une liste javascript, puis d’itérer sur cette liste pour calculer les nouvelles valeurs de champs et mettre à jour les éléments, toujours en javascript).

```
db.movies.find().limit(10).forEach( function(myDoc) {
 let dataYear = /\((\d*)\)/.exec(myDoc.title);
 db.movies.update({"title": myDoc.title}, {$set: { year: dataYear[1] }});
 db.movies.update({"title": myDoc.title},{title: {$split: [myDoc.title, dataYear] } } ) } );
```