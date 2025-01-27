const pool = require('../db');

// get all books
const getAllBooks = async (req, res) => {
    const { title, authorId, page = 1, limit = 10 } = req.query;

    // page limit offset
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    let query = `
        SELECT books.*, authors.name AS author_name
        FROM books
        LEFT JOIN authors ON books.author_id = authors.id
    `;
    let values = [];
    let paramIndex = 1;

    // filter by title
    if (title) {
        query += ` WHERE books.title ILIKE $${paramIndex}`;
        values.push(`%${title}%`);
        paramIndex++;
    }

    // filter by authorId
    if (authorId) {
        if (values.length > 0) {
            query += ` AND books.author_id = $${paramIndex}`;
        } else {
            query += ` WHERE books.author_id = $${paramIndex}`;
        }
        values.push(parseInt(authorId, 10));  // authorId
        paramIndex++;
    }

    // pagination
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    values.push(parseInt(limit, 10), offset); // limit and offset

    // Log query and values
    console.log('Query:', query);
    console.log('Values:', values);

    try {
        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get book by id
const getBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `
            SELECT books.*, authors.name AS author_name
            FROM books
            LEFT JOIN authors ON books.author_id = authors.id
            WHERE books.id = $1
        `;
        const values = [id];

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// create book
const createBook = async (req, res) => {
    const { title, summary, isbn, authorId } = req.body;

    // Ensure req.user is defined and has a role property
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        // Check if author exists
        const authorResult = await pool.query('SELECT * FROM authors WHERE id = $1', [authorId]);
        if (authorResult.rows.length === 0) {
            return res.status(400).json({ message: 'Author not found' });
        }

        const result = await pool.query(
            'INSERT INTO books (title, summary, isbn, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, summary, isbn, authorId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error creating book', error: err.message });
    }
};

// update book by id
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, summary, isbn, authorId } = req.body;

    try {
        const authorResult = await pool.query('SELECT * FROM authors WHERE id = $1', [authorId]);
        if (authorResult.rows.length === 0) {
            return res.status(400).json({ message: 'Author not found' });
        }

        const result = await pool.query(
            'UPDATE books SET title = $1, summary = $2, isbn = $3, author_id = $4 WHERE id = $5 RETURNING *',
            [title, summary, isbn, authorId, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error updating book', error: err.message });
    }
};

// update book
const patchBook = async (req, res) => {
    const { id } = req.params;
    const { title, summary, isbn, authorId } = req.body;

    try {
        const fields = [];
        const values = [];
        let paramIndex = 1;

        if (title) {
            fields.push(`title = $${paramIndex}`);
            values.push(title);
            paramIndex++;
        }
        if (summary) {
            fields.push(`summary = $${paramIndex}`);
            values.push(summary);
            paramIndex++;
        }
        if (isbn) {
            fields.push(`isbn = $${paramIndex}`);
            values.push(isbn);
            paramIndex++;
        }
        if (authorId) {
            const authorResult = await pool.query('SELECT * FROM authors WHERE id = $1', [authorId]);
            if (authorResult.rows.length === 0) {
                return res.status(400).json({ message: 'Author not found' });
            }
            fields.push(`author_id = $${paramIndex}`);
            values.push(authorId);
            paramIndex++;
        }

        if (fields.length === 0) {
            return res.status(400).json({ message: 'Nothing to update' });
        }

        values.push(id);
        const query = `UPDATE books SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error updating book', error: err.message });
    }
};

// delete book by id
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, patchBook, deleteBook };
