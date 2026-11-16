import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import { ApolloProvider } from '@apollo/client/react'
import { StrictMode } from 'react'
import App from './App.tsx'
import { apolloClient } from './lib/graphql/apollo.ts'

const root = document.getElementById('root')

if (!root) {
	throw new Error('Nenhum #root encontrado')
}

createRoot(root).render(
	<StrictMode>
		<ApolloProvider client={apolloClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ApolloProvider>
	</StrictMode>
)
