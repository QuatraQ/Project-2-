import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import { Layout } from './componets/layout'
import './styles/global.scss'
import { NewIdeaPage } from './pages/NewIdeaPage'
    
export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
          <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
          <Route path={routes.getAllIdeasRoute()} element={<NewIdeaPage />} />
          <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider> 
  )
}