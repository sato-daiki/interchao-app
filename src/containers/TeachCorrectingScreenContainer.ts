import { connect } from 'react-redux';
import { Platform } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { setUser } from '../stores/actions/user';
import CorrectingIOSScreen, { PropsIOS } from '../screens/CorrectingIOSScreen';
import CorrectingAndroidScreen, {
  PropsAndroid,
} from '../screens/CorrectingAndroidScreen';
import { State } from '../types/state';
import { editTeachDiary } from '../stores/actions/teachDiaryList';

interface OwnProps {
  navigation: NavigationStackProp;
}

const mapStateToProps = (
  state: State,
  ownProps: OwnProps
): PropsIOS | PropsAndroid => {
  const { user, profile } = state.rootReducer;
  const { teachDiaries } = state.rootReducer.teachDiaryList;

  const objectID = ownProps.navigation.getParam('objectID');
  const teachDiary = teachDiaries.find(d => d.objectID === objectID);
  return {
    user,
    currentProfile: profile,
    teachDiary: teachDiary!,
    caller: 'Teach',
  };
};

const mapDispatchToProps = {
  setUser,
  editTeachDiary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Platform.OS === 'ios' ? CorrectingIOSScreen : CorrectingAndroidScreen);
