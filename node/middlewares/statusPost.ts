 import { json } from 'co-body'
// import { UserInputError } from '@vtex/api'

export async function statusPost(ctx: Context, next: () => Promise<any>) {
 const body = await (json(ctx.req))
console.log(body);
  // if (!body?.code) {
  //   throw new UserInputError('Please suply the code')
  // }

  // const { code } = body

  // const res = await ctx.clients.status.getStatus(code).catch((reason) => {
  //   return reason?.response?.data
  // })

  ctx.set('Cache-Control', 'no-cache no-store')
  ctx.body = "ok"
  ctx.status = 200

  await next()
}
