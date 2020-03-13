import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import TeachDiaryScreen from '../screens/TeachDiaryScreen';
import { editTeachDiary } from '../stores/actions/teachDiaryList';

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
  editTeachDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachDiaryScreen);
