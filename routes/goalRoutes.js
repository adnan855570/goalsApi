const express = require('express');
const router = express.Router();
const {getGoals , setGoals , updateGoals , deleteGoals} = require('../controllers/goalController.js');
const {protect} = require('../middleware/authMiddleware');





// this saves us two line of code because we are using the same route
router.route('/').get(protect , getGoals).post(protect , setGoals);
// this also saves us two line of code
router.route('/:id').put(protect , updateGoals).delete(protect , deleteGoals);
// GET request
// router.get('/' , 'getGoals');

// POST request
// router.post('/' , 'setGoals');

// PUT request
// router.put('/:id' , 'updateGoals');

// DELETE request
// router.delete('/:id' , 'deleteGoals');

module.exports = router;