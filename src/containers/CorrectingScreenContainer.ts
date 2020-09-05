import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { setUser } from '../stores/actions/user';
import CorrectingScreen, { Props } from '../screens/CorrectingScreen';
import { State } from '../types/state';
import { editTeachDiary } from '../stores/actions/teachDiaryList';
import { MainStackParamList } from '../navigations/MainNavigator';

interface OwnProps {
  route: RouteProp<MainStackParamList, 'ModalCorrecting'>;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { user, profile } = state.rootReducer;
  const { teachDiaries } = state.rootReducer.teachDiaryList;

  const objectID = ownProps.route.params?.objectID;
  const teachDiary = teachDiaries.find(d => d.objectID === objectID);
  return {
    user,
    currentProfile: profile,
    teachDiary,
  };
};

const mapDispatchToProps = {
  setUser,
  editTeachDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(CorrectingScreen);
