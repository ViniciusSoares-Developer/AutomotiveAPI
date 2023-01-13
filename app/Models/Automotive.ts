import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Automotive extends BaseModel {
  public static selfAssignPrimaryKey: boolean = false

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'used' })
  public used: boolean

  @column({ columnName: 'model' })
  public model: string

  @column({ columnName: 'price' })
  public price: number

  @column({ columnName: 'stock' })
  public stock: number

  @column({ columnName: 'details' })
  public details: object

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async assignUuid(automotive: Automotive) {
    automotive.id = uuid()
  }
}
