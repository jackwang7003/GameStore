const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(`
        select * from videoGames;`);
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
async function createVideoGame(body) {
    // LOGIC GOES HERE
    try {
        const { rows: [videoGame] } = await client.query(`
            INSERT INTO videoGames(name, description, price, "inStock", "isPopular", "imageUrl")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [body.name, body.description, body.price, body.inStock, body.isPopular, body.imageUrl]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
    // LOGIC GOES HERE
    try {
        const { rows: [videoGame] } = await client.query(`
            PUT INTO videoGames(name, description, price, "inStock", "isPopular", "imageUrl")
            VALUES($2, $3, $4, $5, $6, $7)
            WHERE id = $1;
            `, [id, fields.name, fields.description, fields.price, fields.inStock, fields.isPopular, fields.imageUrl]);
            return videoGame;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
    // LOGIC GOES HERE
    try {
        const { rows: [videoGame] } = await client.query(`
            DELETE FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}