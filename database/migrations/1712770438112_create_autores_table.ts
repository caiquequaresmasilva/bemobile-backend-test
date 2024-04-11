import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SchemaAutor extends BaseSchema {
  protected tableName = 'autores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').unique()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
