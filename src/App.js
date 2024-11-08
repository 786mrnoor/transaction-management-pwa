import { RouterProvider } from 'react-router-dom';
import OnlineContextProvider from './ContextProvider/OnlineContextProvider.js';
import LoaderContextProvider from './ContextProvider/LoaderContextProvider.js';
import UserContextProvider from './ContextProvider/UserContextProvider.js';
import router from './router.js';
import CategoryContextProvider from './ContextProvider/CategoryContextProvider.js';

function App() {
  return (
    <OnlineContextProvider>
      <LoaderContextProvider>
        <UserContextProvider>
          <CategoryContextProvider>
            <RouterProvider router={router} />
          </CategoryContextProvider>
        </UserContextProvider>
      </LoaderContextProvider>
    </OnlineContextProvider>
  );
}

export default App;
