import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import MyDiaryScreen, { Props } from '../screens/MyDiaryScreen';
import { State } from '../types/state';
import { deleteDiary, editDiary } from '../stores/actions/diaryList';
import { setUser } from '../stores/actions/user';
import { setLocalStatus } from '../stores/actions/localStatus';

import { MyDiaryTabStackParamList } from '../navigations/MyDiaryTabNavigator';

interface OwnProps {
  route: RouteProp<MyDiaryTabStackParamList, 'MyDiary'>;
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
  deleteDiary,
  editDiary,
  setUser,
  setLocalStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDiaryScreen);
