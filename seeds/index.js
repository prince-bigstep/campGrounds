const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random()*array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '608e4ed96934221abb077677',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum commodi eius ea quia et quam iusto tempore rem exercitationem. Soluta facilis nihil non consequuntur enim earum quas quo, cum nisi!',
            price,
            geometry: {
                "type":"Point",
                "coordinates":[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dckhnoaax/image/upload/v1620379394/YelpCamp/mwxntaesadf1ncgwbwdc.jpg',
                    filename: 'YelpCamp/ejwmghokowezv4x4mhas'
                  },
                {
                    url: 'https://res.cloudinary.com/dckhnoaax/image/upload/v1620193900/YelpCamp/x70werqasa5dubo4lmjo.jpg',
                    filename: 'YelpCamp/x70werqasa5dubo4lmjo'
                  },
                
              ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});