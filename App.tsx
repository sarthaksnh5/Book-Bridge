import RootStack from './navigation/RootStack';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <RootStack />
    </PaperProvider>
  );
};

export default App;
