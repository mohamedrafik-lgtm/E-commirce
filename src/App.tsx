import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes'
import '@yaireo/tagify/dist/tagify.css';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  
  const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
      <RouterProvider router={router} />
      <Toaster/>
    </main>
    </ThemeProvider>
    
    </>
  )
}

export default App
