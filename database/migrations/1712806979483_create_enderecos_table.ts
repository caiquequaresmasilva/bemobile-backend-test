import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cep_id').unsigned().references('ceps.id').onDelete('CASCADE')
      table.string('numero')
      table.string('complemento')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
