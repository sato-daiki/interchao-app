import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import MyDiaryScreen from '../screens/MyDiaryScreen';
import { deleteDiary, editDiary } from '../stores/actions/diaryList';

interface OwnProps {
  navigation: NavigationStackProp;
}

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const { diaries } = state.rootReducer.diaryList;
  const { profile } = state.rootReducer;

  const objectID = ownProps.navigation.getParam('objectID');
  const diary = diaries.find(d => d.objectID === objectID);
  return {
    diary,
    profile,
  };
};

const mapDispatchToProps = {
  deleteDiary,
  editDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDiaryScreen);
