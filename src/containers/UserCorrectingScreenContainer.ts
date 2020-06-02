import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { setUser } from '../stores/actions/user';
import CorrectingIOSScreen, { PropsIOS } from '../screens/CorrectingIOSScreen';
import CorrectingAndroidScreen, {
  PropsAndroid,
} from '../screens/CorrectingAndroidScreen';
import { State } from '../types/state';

interface OwnProps {
  navigation: NavigationStackProp;
}

const mapStateToProps = (
  state: State,
  ownProps: OwnProps
): PropsIOS | PropsAndroid => {
  const { user, profile } = state.rootReducer;
  const teachDiary = ownProps.navigation.getParam('teachDiary');

  return {
    user,
    currentProfile: profile,
    teachDiary,
    caller: 'User',
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Platform.OS === 'ios' ? CorrectingIOSScreen : CorrectingAndroidScreen);
