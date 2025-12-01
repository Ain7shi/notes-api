const express = require('express');
const{
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    getNotesByCategory,
    togglePinNote,
    toggleArchiveNote,
    getCategories,
    searchNotes
} = require('../controllers/notesController');

const {validateNote, validateUUID}=require('../middleware/validation');

const router=express.Router();

/**
 * @swagger
 * tags:
 * name:Notes
 * description:Notes management endpoints
 */

//da special routes (should come before parameterized routes)
router.get('/search', searchNotes);
router.get('/categories',getCategories);
router.get('/category/:category', getNotesByCategory);

//da main CRUD routes
router.route('/')
    .get(getAllNotes)
    .post(validateNote, createNote);

router.route('/:id')
    .get(validateUUID, getNoteById)
    .put(validateUUID, validateNote, updateNote)
    .delete(validateUUID, deleteNote);

//da special action routes
router.patch('/:id/pin', validateUUID, togglePinNote);
router.patch('/:id/archive', validateUUID, toggleArchiveNote);

module.exports=router;