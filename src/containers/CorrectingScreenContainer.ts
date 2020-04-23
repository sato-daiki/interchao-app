import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { setUser } from '../stores/actions/user';
import CorrectingScreen, { Props } from '../screens/CorrectingScreen';
import { State } from '../types/state';
import { editTeachDiary } from '../stores/actions/teachDiaryList';

interface OwnProps {
  navigation: NavigationStackProp;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { user, profile } = state.rootReducer;
  const { teachDiaries } = state.rootReducer.teachDiaryList;

  const objectID = ownProps.navigation.getParam('objectID');
  const teachDiary = teachDiaries.find(d => d.objectID === objectID);
  return {
    user,
    currentProfile: profile,
    teachDiary: teachDiary!,
  };
};

const mapDispatchToProps = {
  setUser,
  editTeachDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(CorrectingScreen);
