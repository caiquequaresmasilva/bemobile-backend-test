import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ceps'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('logradouro')
      table.integer('bairro_id').unsigned().references('bairros.id').onDelete('CASCADE')
      table.integer('cidade_id').unsigned().references('cidades.id').onDelete('CASCADE')
      table.integer('uf_id').unsigned().references('ufs.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
