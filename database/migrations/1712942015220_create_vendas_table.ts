import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cliente_id').unsigned().references('clientes.id').onDelete('CASCADE')
      table.integer('livro_id').unsigned().references('livros.id')
      table.integer('quantidade')
      table.decimal('preco_unitario')
      table.decimal('preco_total')
      table.timestamp('data', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
