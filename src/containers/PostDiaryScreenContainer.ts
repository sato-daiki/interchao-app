import { connect } from 'react-redux';
import { State } from '@/types/state';
import { setUser } from '@/stores/actions/user';
import { addDiary } from '@/stores/actions/diaryList';

// @ts-ignore
import PostDiaryScreen from '@/screens/PostDiaryScreen/PostDiaryScreen';
import { Props } from '@/screens/PostDiaryScreen/interfaces';

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
