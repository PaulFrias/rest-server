
const { Router } = require('express');  
const { check } = require('express-validator');


const { validarCampos } = require('../middleware/validar-campos')
const { esRoleValido,
        emailExiste,
        existeUsuarioId } = require('../helpers/db-validators')


const { 
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosDelete, 
    usuariosPatch} = require('../controllers/users');  

const { validarJWT } = require('../middleware/validar-jwt');
const { validarRoleAdmin, tieneRoles } = require('../middleware/validar-roles');


const router = Router();


router.get('/',  usuariosGet);

router.post('/',[
    check('nombre',   'el nombre es obligatorio').not().isEmpty(), 
    check('password', 'el password es obligatorio y debe conener minimo 6 caracteres').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom( emailExiste),
    //check('rol',      'el rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    //validarRoleAdmin,
    tieneRoles('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);




module.exports = router;