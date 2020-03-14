import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { setProfile } from '../stores/actions/profile';
import CorrectingScreen from '../screens/CorrectingScreen';
import { State } from '../types/state';

interface OwnProps {
  navigation: NavigationStackProp;
}

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const { user } = state.rootReducer;
  const { teachDiaries } = state.rootReducer.teachDiaryList;

  const objectID = ownProps.navigation.getParam('objectID');
  const teachDiary = teachDiaries.find(d => d.objectID === objectID);
  return {
    user,
    teachDiary,
  };
};

const mapDispatchToProps = {
  setProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(CorrectingScreen);
