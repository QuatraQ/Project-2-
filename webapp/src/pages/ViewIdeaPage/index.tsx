import { useParams } from 'react-router-dom'
import { trpc } from '../../lib/trpc'
import css from './index.module.scss'
import { Segment } from '../../componets/segment'

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as { ideaNick: string }

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({
    ideaNick,
  })

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  if (!data.idea) {
    return <span>idea not found</span>
  }

  return (
    <Segment title={data.idea.name} description={data.idea.description}>
      <div className={css.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </Segment>
  )
}
