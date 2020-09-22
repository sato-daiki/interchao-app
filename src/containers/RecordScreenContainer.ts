import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { setUser } from '../stores/actions/user';
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

  const { user, profile } = state.rootReducer;

  return {
    diary,
    user,
    profile,
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordScreen);
