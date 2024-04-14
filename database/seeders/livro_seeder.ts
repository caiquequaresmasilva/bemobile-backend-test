import Autor from '#models/autor'
import DadosLivro from '#models/dados_livro'
import Editora from '#models/editora'
import Idioma from '#models/idioma'
import Livro from '#models/livro'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

const DADOS_LIVROS = [
  {
    dimensoes: '22.8 x 15.6 x 3.2',
    publicacao: DateTime.fromFormat('25-03-2019', 'dd-MM-yyyy'),
  },
  {
    dimensoes: '23.0 x 16.0 x 3.0',
    publicacao: DateTime.fromFormat('20-09-2019', 'dd-MM-yyyy'),
  },
  {
    dimensoes: '23.0 x 15.8 x 3.8',
    publicacao: DateTime.fromFormat('20-09-2019', 'dd-MM-yyyy'),
  },
  {
    dimensoes: '23.0 x 16.0 x 2.6',
    publicacao: DateTime.fromFormat('11-11-2019', 'dd-MM-yyyy'),
  },
  {
    dimensoes: '22.8 x 16.0 x 4.0',
    publicacao: DateTime.fromFormat('25-03-2020', 'dd-MM-yyyy'),
  },
]
export default class LivroSeeder extends BaseSeeder {
  async run() {
    const check = await Autor.findBy({ nome: 'George R. R. Martin' })
    if (!check) {
      const autor = await Autor.create({
        nome: 'George R. R. Martin',
      })
      const editora = await Editora.create({
        nome: 'Suma',
      })
      const idioma = await Idioma.create({
        nome: 'Português',
      })

      const livros = await Livro.createMany([
        {
          autorId: autor.id,
          titulo: 'As Crônicas de Gelo e Fogo',
          subtitulo: 'A Guerra dos Tronos',
          preco: 76.16,
        },
        {
          autorId: autor.id,
          titulo: 'As Crônicas de Gelo e Fogo',
          subtitulo: 'A fúria dos reis',
          preco: 80.8,
        },
        {
          autorId: autor.id,
          titulo: 'As Crônicas de Gelo e Fogo',
          subtitulo: 'A tormenta de espadas',
          preco: 78.99,
        },
        {
          autorId: autor.id,
          titulo: 'As Crônicas de Gelo e Fogo',
          subtitulo: 'O Festim dos Corvos',
          preco: 35.9,
        },
        {
          autorId: autor.id,
          titulo: 'As Crônicas de Gelo e Fogo',
          subtitulo: 'A dança dos dragões',
          preco: 69.2,
        },
      ])

      await DadosLivro.createMany(
        livros.map(({ id }, index) => ({
          livroId: id,
          editoraId: editora.id,
          idiomaId: idioma.id,
          dimensoes: DADOS_LIVROS[index].dimensoes,
          publicacao: DADOS_LIVROS[index].publicacao,
        }))
      )
    }
  }
}
