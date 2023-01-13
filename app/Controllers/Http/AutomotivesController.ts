import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Iautomotive } from 'App/Interfaces/IAutomotiveDetails'
import Automotive from 'App/Models/Automotive'

export default class AutomotivesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { offset = 0, limit = 10 } = request.only(['offset', 'limit'])
      const automotives = await Automotive.query().limit(limit).offset(offset)

      const send: { previous?: string; next: string; automotives: Array<Automotive> } = {
        previous: undefined,
        next: `http://127.0.0.1:3333/automotive?offset=${Number(offset) + 5}&limit=${
          Number(limit) + 5
        }`,
        automotives: automotives,
      }

      if (offset > 0) {
        send.previous = `http://127.0.0.1:3333/automotive?offset=${Number(offset) - 5}&limit=${
          Number(limit) - 5
        }`
      }

      response.send(send)
    } catch (err) {
      response.send({ error: 'Fail to conect database' })
    }
  }

  // public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const data: Iautomotive = request.only(['used', 'model', 'price', 'stock', 'details'])

      await Automotive.create({
        used: data.used,
        model: data.model,
        price: data.price,
        stock: data.stock,
        details: data.details,
      })
    } catch (err) {
      response.send({ error: 'Fail to store automotive' })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const automotive = await Automotive.findByOrFail('id', params.id)
      response.send(automotive)
    } catch (err) {
      response.send({ error: 'Not find this automotive' })
    }
  }

  // public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const data: Iautomotive = request.only(['used', 'model', 'price', 'stock', 'details'])
      const automotive = await Automotive.findByOrFail('id', params.id)

      await automotive
        .merge({
          used: data.used,
          model: data.model,
          price: data.price,
          stock: data.stock,
          details: data.details,
        })
        .save()
      response.status(200)
    } catch (err) {
      response.send({ error: 'Fail to update automotive' })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const automotive = await Automotive.findByOrFail('id', params.id)
      automotive.delete()
      response.status(200)
    } catch (err) {
      response.send({ error: 'Fail to delete' })
    }
  }
}
