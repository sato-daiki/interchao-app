import { connect } from 'react-redux';
import PostDiaryScreen, {
  Props,
} from '@/screens/PostDiaryScreen/PostDiaryScreen';
import { State } from '../types/state';
import { setUser } from '../stores/actions/user';
import { addDiary } from '../stores/actions/diaryList';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
  };
};

const mapDispatchToProps = {
  setUser,
  addDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDiaryScreen);
