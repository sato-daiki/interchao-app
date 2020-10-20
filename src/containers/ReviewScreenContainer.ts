import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { editDiary } from '../stores/actions/diaryList';
import { setLocalStatus } from '../stores/actions/localStatus';

import { State } from '../types/state';
import ReviewScreen, { Props } from '../screens/ReviewScreen';
import { ModalReviewStackParamList } from '../navigations/ModalNavigator';

interface OwnProps {
  route: RouteProp<ModalReviewStackParamList, 'Review'>;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { diaries } = state.rootReducer.diaryList;
  const { profile, user, localStatus } = state.rootReducer;
  const objectID = ownProps.route.params?.objectID;
  const diary = diaries.find(d => d.objectID === objectID);
  return {
    diary,
    profile,
    user,
    localStatus,
  };
};

const mapDispatchToProps = {
  editDiary,
  setLocalStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScreen);
