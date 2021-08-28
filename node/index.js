var express = require('express');
var router = express.Router();
const tls = require('tls');
const Newsletter = require('../Models/Newsletter')


tls.DEFAULT_MIN_VERSION = 'TLSv1';

router.post('/newsletter', async  (req, res, next) => {
  //console.log(req.body);
  const { emailNewsletter } = req.body
  //console.log(emailNewsletter);

  if(!emailNewsletter) {
    return res.status(400).json({ message: 'O campo email deve ser informado obrigatoriamente '})
  }
  const regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
  try {
    //const emailExistente = await Newsletter.findOne({ emailNewsletter })
    const { data } = await axios.get('https://c2rcbzh5tj.execute-api.us-east-2.amazonaws.com/items', { emailNewsletter })
    console.log(data);
    if(emailExistente) {
      return res.json({ message: 'Já existe um usuário cadastrado com esse email!'})
    }
    if(!regex.test(emailNewsletter)) {
      return res.json({ message: 'O e-mail informado é inválido!' })
    }
    console.log(emailNewsletter);
    //const usuarioNewsletterCriado = await Newsletter.create({ emailNewsletter })
    //return res.json({ emailNewsletter, id: usuarioNewsletterCriado.id  })
  }
  catch(err) {
    console.log(err)
    return res.status(500).json({ message: 'Não foi possível realizar o cadastro do usuário!' })
  }
})

module.exports = router;
