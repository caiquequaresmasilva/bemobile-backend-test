import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'livros'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('titulo')
      table.string('subtitulo').nullable()
      table.integer('autor_id').unsigned().references('autores.id').onDelete('CASCADE')
      table.decimal('preco')
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
