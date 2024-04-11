import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dados_clientes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cliente_id').unsigned().references('clientes.id').onDelete('CASCADE')
      table.integer('endereco_id').unsigned().references('enderecos.id').onDelete('CASCADE')
      table.string('cpf').unique()
      table.string('telefone')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
