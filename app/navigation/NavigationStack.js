import { createStackNavigator, createAppContainer } from 'react-navigation';

import Onboarder from 'app/screens/Onboarder';
import Home from 'app/screens/Home';

const RNApp = createStackNavigator(
    {
        Onboarder: {
            screen: Onboarder,
            navigationOptions: { header: null, gesturesEnabled: false }
        },
        Home: {
            screen: Home,
            navigationOptions: { header: null, gesturesEnabled: false }
        }
    },
    {
        initialRouteName: 'Onboarder'
    }
);

export default createAppContainer(RNApp);
