import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SchemaCliente extends BaseSchema {
  protected tableName = 'clientes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('email').unique()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
