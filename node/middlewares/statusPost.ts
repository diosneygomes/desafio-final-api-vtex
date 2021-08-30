import { json } from 'co-body'
import axios from 'axios'

export async function statusPost(ctx: Context, next: () => Promise<any>)
{
  try
  {
    const body = await json(ctx.req)
    console.log(body)
    const result = await ctx.clients.oms.order('1157832481851-01')
    console.log(result)
    const teste = await ctx.clients.masterdata.searchDocuments(
      { dataEntity: 'CL', where: `document=${result.clientProfileData.document}`, fields: ['email'], pagination: { pageSize: 1, page: 1 } }
    );
    console.log(teste)
    const emailCliente = teste
    // inicia iintegração com AWS
    if(!emailCliente) {
      return 'O campo email deve ser informado obrigatoriamente !'
    }
    //const regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
    try {
      //const emailExistente = await Newsletter.findOne({ emailNewsletter })
      const { data } = await axios.get(`https://c2rcbzh5tj.execute-api.us-east-2.amazonaws.com/items/$emailCliente`)
      console.log(data);
      if(data) {
        return 'Já existe um usuário cadastrado com esse email!'
        //Atualiza campo tipoCliente
      } else {
        return 'Primeiro Pedido'
        //Insere cadastro na AWS
      }
      //if(!regex.test(emailCliente)) {
      //  return 'O e-mail informado é inválido!'
     //}
      console.log(emailCliente);
      //const usuarioNewsletterCriado = await axios.put({ emailNewsletter })
    }
    catch(err) {
      console.log(err)
      return 'Não foi possível realizar o cadastro do usuário!'
    }
    // final integração com aws


    ctx.body = 'OK'
    ctx.status = 200
    ctx.set('Cache-Control', 'no-cache no-store')
    await next()
  }
  catch (error)
  {
    console.log(error)
    ctx.status = 200
    ctx.set('Cache-Control', 'no-cache no-store')
    await next()
  }
}
