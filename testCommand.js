let c = 0;
let deuxMilleUn = (new Date('2001-01-01'))
db.users.find().forEach((user) => {
    user.movies.forEach((mov) => {
        if(mov.date > deuxMilleUn){
            ++c
        }
    })
})
db.users.aggregate([
    {$unwind: "$movies"},
    {$match: {'movies.date': {$gte: deuxMilleUn}}},
    {$count: 'totalCount'}
])