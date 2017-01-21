exports.DATABASE_URL  =	process.env.DATABASE_URL ||
                        global.DATABASE_URL ||
                        (process.env.NODE_ENV === "production" ?
                          "mongodb://artist-rating:artist@ds139448.mlab.com:39448/artist-rating" :
                          "mongodb://localhost/");

exports.PORT = process.env.PORT || 8080;

