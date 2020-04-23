import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';
import { editDiary } from '../stores/actions/diaryList';
import { State } from '../types/state';
import ReviewScreen, { Props } from '../screens/ReviewScreen';

interface OwnProps {
  navigation: NavigationStackProp;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
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
  editDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScreen);
