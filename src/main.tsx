import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from './App/Store.ts';
import { Provider } from 'react-redux'

const queryClient = new QueryClient({
  defaultOptions:{
      queries:{
          refetchOnWindowFocus:false
      }
  }
})


ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
      <Provider store={store}>
         <App />
      </Provider>
  </QueryClientProvider>
);