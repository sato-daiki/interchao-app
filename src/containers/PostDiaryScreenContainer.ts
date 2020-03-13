import { connect } from 'react-redux';
import { State } from '../types/state';
import { setPoints } from '../stores/actions/user';
import { addDiary } from '../stores/actions/diaryList';
import { addDraftDiary } from '../stores/actions/draftDiaryList';
import PostDiaryScreen from '../screens/PostDiaryScreen';

const mapStateToProps = (state: State) => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
  };
};

const mapDispatchToProps = {
  setPoints,
  addDiary,
  addDraftDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDiaryScreen);
