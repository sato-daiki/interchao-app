import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { setPoints, setUser } from '../stores/actions/user';
import CorrectingScreen from '../screens/CorrectingScreen';
import { State } from '../types/state';
import { editTeachDiary } from '../stores/actions/teachDiaryList';

interface OwnProps {
  navigation: NavigationStackProp;
}

const mapStateToProps = (state: State, ownProps: OwnProps) => {
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
  setPoints,
  setUser,
  editTeachDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(CorrectingScreen);
