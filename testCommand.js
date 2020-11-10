db.users.aggregate([
    {$match: {name: 'Jayson Brad'}},
    {$unwind: "$movies"},
    {$sort: {'movies.date': -1}},
    {$limit: 3},
]).pretty()

db.users.aggregate([
    {$unwind: "$movies"},
    {$sort: {"user.gender": "F"}},
]).pretty()

db.users.find({'gender': "F"}).forEach((feme) => {
    feme.movies.forEach((movie) => {
        print(movie);
    })
})