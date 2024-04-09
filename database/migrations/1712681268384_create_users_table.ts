import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UserSchema extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id', { primaryKey: true })
      table.string('email')
      table.string('password')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
