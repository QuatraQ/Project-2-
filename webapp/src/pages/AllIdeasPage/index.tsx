import { trpc } from '../../lib/trpc'
import { Link } from 'react-router-dom'
import { getViewIdeaRoute } from '../../lib/routes'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

  if (isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      <h1>All Ideas</h1>
      {data.ideas.map((idea) => (
        <div key={idea.nick}>
         <Link to={getViewIdeaRoute({ ideaNick: idea.nick })}>{idea.name}</Link>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  )
}
