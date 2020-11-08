import { connect } from 'react-redux';
import PostDraftDiaryScreen, {
  Props,
} from '@/screens/PostDraftDiaryScreen/PostDraftDiaryScreen';
import { State } from '@/types/state';
import { setUser } from '@/stores/actions/user';
import { editDiary } from '@/stores/actions/diaryList';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
  };
};

const mapDispatchToProps = {
  setUser,
  editDiary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDraftDiaryScreen);
