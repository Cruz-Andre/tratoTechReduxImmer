import Button from "components/Button/Button";
import Header from "components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form'
import styles from './Anuncie.module.scss'
import { cadastrarItem } from "store/reducers/itensSlice";


export default function Anuncie() {
  const dispatch = useDispatch()
                                                //aqui o categorias é nome dado no reducer
  const categorias = useSelector(state => state.categorias.map(({nome, id}) => ({nome, id})))
  //console.log(categorias)

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoria: ''
    }
  })
  //console.log(register('novoInput'))

  const {errors} = formState
  //console.log('Erros:', errors)
  //console.log('Nome do Erro:', errors.nome)
  
  function cadastrar(data) {
    //console.log('Data:', data);
    dispatch(cadastrarItem(data))
  }

  return (
    <div className={styles.container}>
      <Header
        titulo='Anuncie aqui!'
        descricao='Anuncie seu produto aqui!'
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <input 
          className={errors.nome ? styles.inputErro : ''} 
          {...register('nome', {required: 'O campo nome é obrigatório!'})} 
          placeholder="Nome do produto" 
          alt="nome do produto"
        />
        {errors.nome && <span className={styles.mensagemErro}> {errors.nome.message} </span>}

        <input 
          className={errors.descricao ? styles.inputErro : ''} 
          {...register('descricao', {required: 'O campo descrição é obrigatório!'})}
          placeholder="Descrição do produto" 
          alt="descrição do produto" 
        />
        {errors.descricao && <span className={styles.mensagemErro}> {errors.descricao.message} </span>}

        <input 
          className={errors.imagem ? styles.inputErro : ''} 
          {...register('imagem', {required: 'O campo da URL é obrigatório!'})}
          placeholder="URL da imagem do produto" 
          alt="URL da imagem do produto" 
        />
        {errors.imagem && <span className={styles.mensagemErro}> {errors.imagem.message} </span>}

        <select 
          className={errors.categoria ? styles.inputErro : ''} 
          {...register('categoria', {required: 'O campo categoria é obrigatório!'})}
        >
          <option value='' disabled>Selecione a Categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {errors.categoria && <span className={styles.mensagemErro}> {errors.categoria.message} </span>}

        <input 
          className={errors.preco ? styles.inputErro : ''} 
          {...register('preco', {required: 'O campo preço é obrigatório!'})} 
          type='number' 
          placeholder='Preço do produto' 
        />
        {errors.preco && <span className={styles.mensagemErro}> {errors.preco.message} </span>}
        <Button type='submit'>
          Cadastrar produto
        </Button>
      </form>
    </div>
  )
}