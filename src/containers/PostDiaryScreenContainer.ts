import { connect } from 'react-redux';
import { State } from '../types/state';
import { setPoints } from '../stores/actions/user';
import { addDiary, setDiaryTotalNum } from '../stores/actions/diaryList';
import PostDiaryScreen from '../screens/PostDiaryScreen';

const mapStateToProps = (state: State) => {
  return {
    user: state.rootReducer.user,
    profile: state.rootReducer.profile,
    diaryTotalNum: state.rootReducer.diaryList.diaryTotalNum,
  };
};

const mapDispatchToProps = {
  setPoints,
  addDiary,
  setDiaryTotalNum,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDiaryScreen);
