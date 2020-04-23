import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { editTeachDiary } from '../stores/actions/teachDiaryList';
import { State } from '../types/state';
import { setUser } from '../stores/actions/user';
import TeachDiaryScreen, { Props } from '../screens/TeachDiaryScreen';

interface OwnProps {
  navigation: NavigationStackProp;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { user } = state.rootReducer;
  const { teachDiaries } = state.rootReducer.teachDiaryList;

  const objectID = ownProps.navigation.getParam('objectID');
  const teachDiary = teachDiaries.find(d => d.objectID === objectID);
  return {
    user,
    teachDiary: teachDiary!,
  };
};

const mapDispatchToProps = {
  editTeachDiary,
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachDiaryScreen);
