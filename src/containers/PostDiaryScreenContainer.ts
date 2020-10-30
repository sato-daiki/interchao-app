import { connect } from 'react-redux';
import { State } from '@/types/state';
import { setUser } from '@/stores/actions/user';
import { addDiary } from '@/stores/actions/diaryList';
import { setLocalStatus } from '@/stores/actions/localStatus';

import PostDiaryScreen, {
  Props,
} from '@/screens/PostDiaryScreen/PostDiaryScreen';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
    localStatus: state.rootReducer.localStatus,
  };
};

const mapDispatchToProps = {
  setUser,
  addDiary,
  setLocalStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDiaryScreen);
