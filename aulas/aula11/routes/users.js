var express = require('express');
const {gerarToker} = require("../middlewares/auth")
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  
  const { username, password } = req.body;

  //simular uma autenticação//

  if (username === 'jose@iesb.br' && password === 'abcd1234'){
    const payload = {
      email: username,
      nome: "Jose",
      perfil: "admin"
    }
    try{

      return res.json({token: gerarToker(payload)});

    }catch(err){
      return res.status(500).json({msg: err.message})
    }
  }
  return res.status(401).json({msg: "Credenciais invalidas" });
});

router.post("/renovar", verificarToken, function (req, res) {
     try {
       const payload = {
         iss: req.payload.iss,
         email: req.payload.email,
         nome: req.payload.nome,
         perfil: req.payload.perfil,
      };
       return res.json({ token: gerarToken(payload) });
   } catch (err) {
     return res.status(500).json({ msg: err.message });
   }
 });


module.exports = router;
