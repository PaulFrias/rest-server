
const { Router } = require('express');  
const { check }  = require('express-validator');
const { login }  = require('../controllers/auth')
const { validarCampos } = require('../middleware/validar-campos')



const router = Router();


router.post('/login', [
    check('correo', 'el correo no es valido').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos
], login );




module.exports = router;