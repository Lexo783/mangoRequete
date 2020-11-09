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
    { name: 1, occupation: 1 }
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

```

### Question 6

Quelles sont les dix femmes auteurs (writer) les plus âgées ?
```
db.users.find({occupation: "writer", gender: "F"},{"name": 1,"gender": 1, "age" : 1}).sort({ age : -1}).limit(10)
```

### Question 7

Quelles sont toutes les occupations présentes dans la base de données ?

```
db.users.find({},{_id: 0, occupation: 1})
```
