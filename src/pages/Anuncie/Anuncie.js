import Button from "components/Button/Button";
import Header from "components/Header/Header";
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form'
import styles from './Anuncie.module.scss'


export default function Anuncie() {           //aqui o categorias é nome dado no reducer
  const categorias = useSelector(state => state.categorias.map(({nome, id}) => ({nome, id})))
  //console.log(categorias)

  const { register, handleSubmit } = useForm()

  function cadastrar(parametro) {
    console.log('Parametro:', parametro);
  }

  console.log(register('novoInput'))

  return (
    <div className={styles.container}>
      <Header
        titulo='Anuncie aqui!'
        descricao='Anuncie seu produto aqui!'
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <input {...register('nome')} placeholder="Nome do produto" alt="nome do produto" />
        <input {...register('descricao')}placeholder="Descrição do produto" alt="descrição do produto" />
        <input {...register('imagem')}placeholder="URL da imagem do produto" alt="URL da imagem do produto" />
        <select {...register('categoria')}>
          <option value='' disabled>Selecione a Categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <input {...register('preco')} type='number' placeholder='Preço do produto' />
        <Button type='submit'>
          Cadastrar produto
        </Button>
      </form>
    </div>
  )
}