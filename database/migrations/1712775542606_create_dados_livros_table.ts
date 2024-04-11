import { BaseSchema } from '@adonisjs/lucid/schema'

export default class SchemaDadosLivros extends BaseSchema {
  protected tableName = 'dados_livros'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('livro_id').unsigned().references('livros.id').onDelete('CASCADE')
      table.integer('editora_id').unsigned().references('editoras.id').onDelete('CASCADE')
      table.integer('idioma_id').unsigned().references('idiomas.id').onDelete('CASCADE')
      table.string('dimensoes')
      table.date('publicacao')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
