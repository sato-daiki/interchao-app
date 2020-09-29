import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { editDiary } from '../stores/actions/diaryList';
import RecordScreen, { Props } from '../screens/RecordScreen';
import { State } from '../types/state';
import { ModalRecordStackParamList } from '../navigations/ModalNavigator';

interface OwnProps {
  route: RouteProp<ModalRecordStackParamList, 'Record'>;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { diaries } = state.rootReducer.diaryList;
  const objectID = ownProps.route.params?.objectID;
  const diary = diaries.find(d => d.objectID === objectID);

  const { profile } = state.rootReducer;
  return {
    diary,
    profile,
  };
};

const mapDispatchToProps = {
  editDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordScreen);
